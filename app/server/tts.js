// Studio voices: cloud text-to-speech with several male and female voices
// per language. Configure ONE provider with environment variables:
//
//   GOOGLE_TTS_KEY=...                      Google Cloud Text-to-Speech API key
//   AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=eastus   Azure AI Speech
//   TTS_PROVIDER=mock                       fake voices for local testing
//
// Audio is cached on disk, so each sentence is only synthesized once per voice.
import { createHash } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARS = 200;

function pickProvider() {
  if (process.env.TTS_PROVIDER === 'mock') return mock;
  if (process.env.GOOGLE_TTS_KEY) return google;
  if (process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION) return azure;
  return null;
}

const gender = (g) => {
  const v = String(g || '').toLowerCase();
  return v.startsWith('f') ? 'female' : v.startsWith('m') ? 'male' : 'neutral';
};

// Matches "vi", "vi-VN", "zh-HK" etc. against a provider locale.
const sameLang = (locale, lang) => {
  const a = locale.toLowerCase();
  const b = lang.toLowerCase();
  return a === b || a.split('-')[0] === b.split('-')[0];
};

// Prefer the exact locale, best quality first, and keep a mix of genders.
function curate(voices, lang, limit = 6) {
  const quality = (v) => (/neural|wavenet|studio|chirp/i.test(v.id) ? 0 : 1);
  const sorted = voices
    .filter((v) => sameLang(v.locale, lang))
    .sort((a, b) => Number(b.locale.toLowerCase() === lang.toLowerCase()) - Number(a.locale.toLowerCase() === lang.toLowerCase()) || quality(a) - quality(b));
  const female = sorted.filter((v) => v.gender === 'female');
  const male = sorted.filter((v) => v.gender === 'male');
  const other = sorted.filter((v) => v.gender === 'neutral');
  const out = [];
  while (out.length < limit && (female.length || male.length || other.length)) {
    for (const list of [female, male, other]) if (list.length && out.length < limit) out.push(list.shift());
  }
  return out;
}

const google = {
  name: 'google',
  async list() {
    const res = await fetch(`https://texttospeech.googleapis.com/v1/voices?key=${process.env.GOOGLE_TTS_KEY}`);
    if (!res.ok) throw new Error(`Google voices ${res.status}`);
    const { voices = [] } = await res.json();
    return voices.flatMap((v) =>
      v.languageCodes.map((locale) => ({ id: v.name, locale, gender: gender(v.ssmlGender), label: v.name.split('-').slice(2).join(' ') })),
    );
  },
  async synth(text, voice, rate) {
    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { name: voice.id, languageCode: voice.locale },
        audioConfig: { audioEncoding: 'MP3', speakingRate: rate },
      }),
    });
    if (!res.ok) throw new Error(`Google synth ${res.status}`);
    return Buffer.from((await res.json()).audioContent, 'base64');
  },
};

const azure = {
  name: 'azure',
  base: () => `https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices`,
  async list() {
    const res = await fetch(`${this.base()}/voices/list`, { headers: { 'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY } });
    if (!res.ok) throw new Error(`Azure voices ${res.status}`);
    return (await res.json()).map((v) => ({ id: v.ShortName, locale: v.Locale, gender: gender(v.Gender), label: v.LocalName || v.DisplayName }));
  },
  async synth(text, voice, rate) {
    const esc = text.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);
    const pct = Math.round((rate - 1) * 100);
    const ssml = `<speak version="1.0" xml:lang="${voice.locale}"><voice name="${voice.id}"><prosody rate="${pct}%">${esc}</prosody></voice></speak>`;
    const res = await fetch(`${this.base()}/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'kobelingo',
      },
      body: ssml,
    });
    if (!res.ok) throw new Error(`Azure synth ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  },
};

// Local testing only: three fake voices and a short beep.
const mock = {
  name: 'mock',
  async list() {
    return ['female', 'male', 'female'].flatMap((g, i) =>
      ['vi-VN', 'es-ES', 'fr-FR', 'ja-JP'].map((locale) => ({ id: `mock-${locale}-${i}`, locale, gender: g, label: ['Mai', 'Minh', 'Lan'][i] })),
    );
  },
  async synth() {
    const rate = 8000;
    const n = rate / 4;
    const buf = Buffer.alloc(44 + n);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + n, 4); buf.write('WAVEfmt ', 8);
    buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
    buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate, 28); buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
    buf.write('data', 36); buf.writeUInt32LE(n, 40);
    for (let i = 0; i < n; i++) buf[44 + i] = 128 + Math.round(40 * Math.sin((i / rate) * 2 * Math.PI * 440));
    return buf;
  },
};

export function createTts(dataDir) {
  const provider = pickProvider();
  const cacheDir = join(dataDir, 'tts');
  mkdirSync(cacheDir, { recursive: true });
  let catalog = null;
  let catalogAt = 0;

  async function allVoices() {
    if (!catalog || Date.now() - catalogAt > 24 * 3600 * 1000) {
      catalog = await provider.list();
      catalogAt = Date.now();
    }
    return catalog;
  }

  return {
    enabled: !!provider,
    provider: provider?.name || null,
    async voices(lang) {
      if (!provider) return [];
      return curate(await allVoices(), lang).map(({ id, locale, gender: g, label }) => ({ id, locale, gender: g, label }));
    },
    async audio(text, voiceId, rate) {
      if (!provider) throw Object.assign(new Error('Studio voices are not configured'), { status: 503 });
      const clean = String(text || '').trim().slice(0, MAX_CHARS);
      if (!clean) throw Object.assign(new Error('text required'), { status: 400 });
      const voice = (await allVoices()).find((v) => v.id === voiceId);
      if (!voice) throw Object.assign(new Error('unknown voice'), { status: 404 });
      const r = Math.min(1.5, Math.max(0.5, Number(rate) || 1));
      const key = createHash('sha1').update(`${provider.name}|${voice.id}|${r}|${clean}`).digest('hex');
      const ext = provider === mock ? 'wav' : 'mp3';
      const file = join(cacheDir, `${key}.${ext}`);
      if (!existsSync(file)) writeFileSync(file, await provider.synth(clean, voice, r));
      return { data: readFileSync(file), type: ext === 'wav' ? 'audio/wav' : 'audio/mpeg' };
    },
  };
}
