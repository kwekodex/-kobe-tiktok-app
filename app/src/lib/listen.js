// Small wrapper around the browser's speech recognition (Chrome, Edge, Safari).
import { useEffect, useRef, useState } from 'react';

const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

export const canRecognize = () => import.meta.env.VITE_SPEAK !== 'off' && !!Recognition;

// Returns { start, stop, listening, heard, error }. `onDone(text)` runs with the
// final transcript when the learner stops talking.
//
// Safari on iPhone often never fires `end` and can ignore stop(), so the hook
// finishes on its own: shortly after speech goes quiet, soon after the learner
// taps stop, or after a time limit — whichever comes first.
const QUIET_MS = 1600; // pause after the last words heard
const FINAL_MS = 400; // after the engine marks the words final
const STOP_MS = 800; // after tapping stop, wait this long for the last words
const MAX_MS = 12000; // never listen longer than this

export function useRecognizer(lang, onDone) {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [error, setError] = useState(null);
  const session = useRef(null); // { rec, finish }
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => () => session.current?.finish(null, true), []);

  function start() {
    if (!Recognition || session.current) return;
    const rec = new Recognition();
    rec.lang = lang;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let text = '';
    let finished = false;
    let quiet;
    let stopTimer;
    const finish = (err, silent = false) => {
      if (finished) return;
      finished = true;
      clearTimeout(quiet);
      clearTimeout(stopTimer);
      clearTimeout(maxTimer);
      session.current = null;
      try { rec.abort(); } catch { /* already stopped */ }
      if (silent) return; // unmounting
      setListening(false);
      if (text.trim()) doneRef.current?.(text);
      else setError(err || 'silent');
    };
    rec.onresult = (e) => {
      const results = Array.from(e.results);
      text = results.map((r) => r[0].transcript).join(' ');
      setHeard(text);
      clearTimeout(quiet);
      quiet = setTimeout(() => finish(), results.every((r) => r.isFinal) ? FINAL_MS : QUIET_MS);
    };
    rec.onerror = (e) => {
      if (e.error === 'aborted') return;
      finish(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'blocked' : e.error === 'no-speech' ? 'silent' : 'failed');
    };
    rec.onend = () => finish();
    const maxTimer = setTimeout(() => finish(), MAX_MS);
    const stop = () => {
      try { rec.stop(); } catch { /* not started */ }
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => finish(), STOP_MS);
    };
    session.current = { rec, finish, stop };
    setHeard('');
    setError(null);
    setListening(true);
    try { rec.start(); } catch { finish('failed'); }
  }

  const stop = () => session.current?.stop();
  return { start, stop, listening, heard, error };
}

export const MIC_ERRORS = {
  blocked: 'Microphone access is blocked. Allow the mic for this site in your browser settings.',
  silent: "Kobe didn't hear anything. Tap the mic, then read the sentence out loud straight away. On iPhone, Dictation must be on (Settings → General → Keyboard → Enable Dictation).",
  failed: "Kobe couldn't hear you. Check your connection and try again.",
};

// Why speaking isn't available, in words for the learner.
export const noMicReason = () =>
  import.meta.env.VITE_SPEAK === 'off'
    ? 'Speaking is switched off in this preview. Open the installed KobeLingo app to practise speaking.'
    : "This browser can't listen to your voice. Open KobeLingo in Chrome, Edge or Safari to practise speaking.";
