// "New words" card at the start of a lesson: see, hear and read each word before the quiz.
import { useEffect } from 'react';
import Kobe from '../Kobe.jsx';
import Reading from '../Reading.jsx';
import { speak } from '../../lib/speech.js';
import { useCourse } from '../../lib/courses.js';

export default function Intro({ ex }) {
  const course = useCourse();
  useEffect(() => {
    const t = setTimeout(() => speak(ex.words[0].t), 400);
    return () => clearTimeout(t);
  }, [ex]);
  return (
    <div className="ex">
      <h2 className="ex-title">New words</h2>
      <div className="speech-row">
        <Kobe mood="happy" size={90} />
        <div className="bubble bubble-left">Here's what they mean. Tap a card to hear it!</div>
      </div>
      <div className="intro-list">
        {ex.words.map((w) => (
          <button key={w.id} className="intro-card" onClick={() => speak(w.t)}>
            <span className="intro-emoji" aria-hidden="true">{w.emoji}</span>
            <span className="intro-word">
              <strong lang={course.tts} dir={course.rtl ? 'rtl' : undefined}>{w.t}</strong>
              <Reading text={w.t} />
            </span>
            <span className="intro-en">{w.en}</span>
            <span className="intro-play" aria-hidden="true">🔊</span>
          </button>
        ))}
      </div>
    </div>
  );
}
