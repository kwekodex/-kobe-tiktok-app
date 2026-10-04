import { useState } from 'react';
import Kobe from '../Kobe.jsx';
import SpokenWords from '../SpokenWords.jsx';
import Reading from '../Reading.jsx';
import { speak } from '../../lib/speech.js';
import { sfx } from '../../lib/sound.js';
import { useCourse } from '../../lib/courses.js';
import { canRecognize, useRecognizer, MIC_ERRORS } from '../../lib/listen.js';
import { grade, PASS } from '../../lib/pronounce.js';

export default function Speak({ ex, onComplete }) {
  const course = useCourse();
  const [result, setResult] = useState(null);
  const passed = result && result.score >= PASS;
  const mic = useRecognizer(course.tts, (text) => {
    const r = grade(ex.answer, text, course);
    setResult(r);
    if (r.score >= PASS) onComplete();
    else sfx.wrong();
  });

  return (
    <div className="ex">
      <h2 className="ex-title">Speak this sentence</h2>
      <div className="speech-row">
        <Kobe mood={passed ? 'happy' : mic.listening ? 'think' : 'idle'} size={110} />
        <div className="bubble bubble-left">
          <button className="speaker-mini" onClick={() => speak(ex.prompt)} aria-label="Listen">🔊</button>
          <span className="prompt-stack">
            <SpokenWords text={ex.prompt} result={result} course={course} />
            <Reading text={ex.prompt} />
          </span>
        </div>
      </div>
      <button className={`mic ${mic.listening ? 'live' : ''}`} onClick={mic.listening ? mic.stop : mic.start} disabled={passed}>
        🎤 {mic.listening ? 'Listening… tap to stop' : passed ? 'Great!' : result ? 'Try again' : 'Tap to speak'}
      </button>
      {mic.heard && <p className="heard">Kobe heard: “{mic.heard}”</p>}
      {result && !passed && !mic.listening && <p className="heard warn">Not quite. Listen again and say the red words!</p>}
      {mic.error && <p className="heard warn">{mic.error === 'blocked' ? `${MIC_ERRORS.blocked} Or tap "Can't speak now".` : MIC_ERRORS[mic.error]}</p>}
    </div>
  );
}

