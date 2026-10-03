// Speech: the device's built-in voices, or "studio" voices streamed from the
// API server (cloud text-to-speech with male and female options).
const config = { lang: 'es-ES', voiceURI: null, rate: 1, pitch: 1 };
export const STUDIO = 'studio:';
let audio = null;

export function setSpeechConfig(next) {
  Object.assign(config, next);
}

export function voicesFor(lang) {
  if (!('speechSynthesis' in window)) return [];
  const base = lang.split('-')[0].toLowerCase();
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.replace('_', '-').toLowerCase().split('-')[0] === base)
    .sort((a, b) => Number(b.lang === lang) - Number(a.lang === lang) || a.name.localeCompare(b.name));
}

export function onVoicesChanged(cb) {
  if (!('speechSynthesis' in window)) return () => {};
  window.speechSynthesis.addEventListener('voiceschanged', cb);
  return () => window.speechSynthesis.removeEventListener('voiceschanged', cb);
}

function stop() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (audio) { audio.pause(); audio = null; }
}

function speakDevice(text, { lang, voiceURI, rate, pitch, slow }) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  const voices = voicesFor(lang);
  const voice = voices.find((v) => v.voiceURI === voiceURI) || voices[0];
  u.lang = voice?.lang || lang;
  try {
    if (voice) u.voice = voice;
  } catch { /* fall back to the default voice for this language */ }
  u.rate = (slow ? 0.6 : 0.95) * rate;
  u.pitch = pitch;
  window.speechSynthesis.speak(u);
}

export function speak(text, opts = {}) {
  if (!text) return;
  const o = { slow: false, lang: config.lang, voiceURI: config.voiceURI, rate: config.rate, pitch: config.pitch, ...opts };
  stop();
  if (o.voiceURI?.startsWith(STUDIO)) {
    const rate = Math.max(0.5, Math.min(1.5, (o.slow ? 0.65 : 1) * o.rate));
    const qs = new URLSearchParams({ voice: o.voiceURI.slice(STUDIO.length), text, rate: rate.toFixed(2) });
    audio = new Audio(`api/tts?${qs}`);
    // If the server can't be reached, fall back to a device voice.
    audio.play().catch(() => speakDevice(text, { ...o, voiceURI: null }));
    return;
  }
  speakDevice(text, o);
}
