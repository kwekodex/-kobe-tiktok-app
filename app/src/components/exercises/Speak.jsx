import { useEffect, useRef, useState } from 'react';
import Kobe from '../Kobe.jsx';
import { speak } from '../../lib/speech.js';
import { normalize } from '../../lib/answer.js';
import { sfx } from '../../lib/sound.js';
import { useCourse } from '../../lib/courses.js';

const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

// Share of the expected words the learner said (accent-insensitive).
function score(expected, heard, course) {
  if (course.nospace) {
    // Compare characters for languages written without spaces.
    const want = [...normalize(expected).replace(/\s/g, '')];
    const got = normalize(heard).replace(/\s/g, '');
    return want.filter((ch) => got.includes(ch)).length / want.length;
  }
  const want = normalize(expected, { accents: false }).split(' ');
  const got = new Set(normalize(heard, { accents: false }).split(' '));
  return want.filter((w) => got.has(w)).length / want.length;
}

export default function Speak({ ex, onComplete }) {
  const course = useCourse();
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [message, setMessage] = useState(null);
  const [passed, setPassed] = useState(false);
  const recRef = useRef(null);

  useEffect(() => () => recRef.current?.abort(), []);

  function start() {
    if (!Recognition || listening) return;
    const rec = new Recognition();
    recRef.current = rec;
    rec.lang = course.tts;
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    let finalText = '';
    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0].transcript).join(' ');
      setHeard(text);
      finalText = text;
    };
    rec.onerror = (e) => {
      setMessage(e.error === 'not-allowed' || e.error === 'service-not-allowed'
        ? 'Microphone access is blocked. Allow it in your browser, or tap "Can\'t speak now".'
        : "Kobe couldn't hear you. Try again!");
    };
    rec.onend = () => {
      setListening(false);
      if (!finalText) return;
      if (score(ex.answer, finalText, course) >= 0.7) {
        setPassed(true);
        setMessage(null);
        onComplete();
      } else {
        sfx.wrong();
        setMessage('Not quite. Listen again and give it another go!');
      }
    };
    setHeard('');
    setMessage(null);
    setListening(true);
    rec.start();
  }

  return (
    <div className="ex">
      <h2 className="ex-title">Speak this sentence</h2>
      <div className="speech-row">
        <Kobe mood={passed ? 'happy' : listening ? 'think' : 'idle'} size={110} />
        <div className="bubble bubble-left">
          <button className="speaker-mini" onClick={() => speak(ex.prompt)} aria-label="Listen">🔊</button>
          <span className="prompt-text" lang={course.tts} dir={course.rtl ? "rtl" : undefined}>{ex.prompt}</span>
        </div>
      </div>
      <button className={`mic ${listening ? 'live' : ''}`} onClick={start} disabled={passed}>
        🎤 {listening ? 'Listening…' : passed ? 'Great!' : 'Tap to speak'}
      </button>
      {heard && <p className="heard">Kobe heard: “{heard}”</p>}
      {message && <p className="heard warn">{message}</p>}
    </div>
  );
}

export const speechRecognitionSupported = () => !!Recognition;
