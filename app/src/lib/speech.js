// Text-to-speech using the device's built-in voices.
const config = { lang: 'es-ES', voiceURI: null, rate: 1 };

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

export function speak(text, { slow = false, lang = config.lang, voiceURI = config.voiceURI, rate = config.rate } = {}) {
  if (!('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = voicesFor(lang);
  const voice = voices.find((v) => v.voiceURI === voiceURI) || voices[0];
  u.lang = voice?.lang || lang;
  try {
    if (voice) u.voice = voice;
  } catch { /* fall back to the default voice for this language */ }
  u.rate = (slow ? 0.6 : 0.95) * rate;
  window.speechSynthesis.speak(u);
}
