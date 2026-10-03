// Small wrapper around the browser's speech recognition (Chrome, Edge, Safari).
import { useEffect, useRef, useState } from 'react';

const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

export const canRecognize = () => import.meta.env.VITE_SPEAK !== 'off' && !!Recognition;

// Returns { start, stop, listening, heard, error }. `onDone(text)` runs with the
// final transcript when the learner stops talking.
export function useRecognizer(lang, onDone) {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [error, setError] = useState(null);
  const recRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => () => recRef.current?.abort(), []);

  function start() {
    if (!Recognition || listening) return;
    const rec = new Recognition();
    recRef.current = rec;
    rec.lang = lang;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let text = '';
    rec.onresult = (e) => {
      text = Array.from(e.results).map((r) => r[0].transcript).join(' ');
      setHeard(text);
    };
    rec.onerror = (e) => {
      setError(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'blocked' : e.error === 'no-speech' ? 'silent' : 'failed');
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
      if (text) doneRef.current?.(text);
    };
    setHeard('');
    setError(null);
    setListening(true);
    try { rec.start(); } catch { setListening(false); setError('failed'); }
  }

  const stop = () => recRef.current?.stop();
  return { start, stop, listening, heard, error };
}

export const MIC_ERRORS = {
  blocked: 'Microphone access is blocked. Allow the mic for this site in your browser settings.',
  silent: "Kobe didn't hear anything. Tap the mic and read the sentence out loud.",
  failed: "Kobe couldn't hear you. Check your connection and try again.",
};

// Why speaking isn't available, in words for the learner.
export const noMicReason = () =>
  import.meta.env.VITE_SPEAK === 'off'
    ? 'Speaking is switched off in this preview. Open the installed KobeLingo app to practise speaking.'
    : "This browser can't listen to your voice. Open KobeLingo in Chrome, Edge or Safari to practise speaking.";
