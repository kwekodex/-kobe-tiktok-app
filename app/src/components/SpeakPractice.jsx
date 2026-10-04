import { useEffect, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import { speak } from '../lib/speech.js';
import { sfx } from '../lib/sound.js';
import { canRecognize, useRecognizer, MIC_ERRORS, noMicReason } from '../lib/listen.js';
import { grade, verdict, PASS } from '../lib/pronounce.js';
import Kobe from './Kobe.jsx';
import Avatar from './Avatar.jsx';
import SpokenWords from './SpokenWords.jsx';
import Reading from './Reading.jsx';

// Read sentences out loud; Kobe marks each word you said right or missed.
export default function SpeakPractice({ sentences, onExit }) {
  const { state, dispatch } = useStore();
  const course = useCourse();
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [best, setBest] = useState([]); // best score per sentence
  const [tries, setTries] = useState(0);
  const [done, setDone] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const s = sentences[idx];

  const mic = useRecognizer(course.tts, (text) => {
    const r = grade(s.t, text, course);
    setResult(r);
    setTries((t) => t + 1);
    setBest((b) => { const n = [...b]; n[idx] = Math.max(n[idx] || 0, r.score); return n; });
    if (r.score >= PASS) sfx.correct(); else sfx.wrong();
  });

  // Read each new sentence aloud first so the learner hears how it sounds.
  useEffect(() => { if (s && !done) speak(s.t); }, [s, done]);

  const passed = result && result.score >= PASS;
  const scores = sentences.map((_, i) => best[i] || 0);
  const avg = Math.round((scores.reduce((a, b) => a + b, 0) / sentences.length) * 100);
  const passedCount = scores.filter((x) => x >= PASS).length;

  function next() {
    dispatch({ type: (best[idx] || 0) >= PASS ? 'markStrong' : 'markWeak', key: s.id });
    if (idx + 1 >= sentences.length) {
      sfx.complete();
      dispatch({ type: 'finishSession', xp: 5 + passedCount * 2, perfect: scores.every((x) => x >= 0.95) });
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setResult(null);
    setTries(0);
  }

  if (!canRecognize()) {
    return (
      <div className="lesson complete">
        <Kobe mood="sad" size={150} />
        <h1>Speaking isn't available here</h1>
        <p className="muted">{noMicReason()}</p>
        <button className="btn btn-primary btn-wide" onClick={onExit}>Back</button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="lesson complete">
        <div className="celebrate">
          <Kobe mood="cheer" size={170} />
          <Avatar id={state.user.avatar} size={140} full mood="cheer" className="celebrate-buddy" />
        </div>
        <h1 className="complete-title">Speaking practice complete!</h1>
        <p className="muted">You read {passedCount} of {sentences.length} sentences clearly.</p>
        <div className="result-tiles">
          <div className="result-tile xp"><span>Total XP</span><strong>⚡ {5 + passedCount * 2}</strong></div>
          <div className="result-tile acc"><span>Clarity</span><strong>🗣️ {avg}%</strong></div>
          <div className="result-tile time"><span>Sentences</span><strong>🎤 {sentences.length}</strong></div>
        </div>
        <button className="btn btn-primary btn-wide" autoFocus onClick={onExit}>Continue</button>
      </div>
    );
  }

  const v = result && verdict(result.score);
  const kobeMood = mic.listening ? 'think' : v ? v.mood : 'idle';
  const progress = (idx + (passed ? 1 : 0)) / sentences.length;

  return (
    <div className="lesson speak-practice">
      <div className="lesson-top">
        <button className="icon-btn" onClick={() => setConfirmQuit(true)} aria-label="Quit">✕</button>
        <div className="progress"><div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          <span className="progress-buddy" style={{ left: `${progress * 100}%` }} aria-hidden="true">
            <Avatar id={state.user.avatar} size={34} mood={passed ? 'happy' : result ? 'sad' : undefined} />
          </span>
        </div>
        <span className="stat">{idx + 1}/{sentences.length}</span>
      </div>

      <div className="lesson-body">
        <div className="lesson-label">Speaking practice</div>
        <div className="ex">
          <h2 className="ex-title">Read this out loud</h2>
          <div className="speech-row">
            <Kobe mood={kobeMood} size={120} />
            <div className="bubble bubble-left speak-bubble">
              <div className="speak-sentence">
                <SpokenWords text={s.t} result={result} course={course} />
                <Reading text={s.t} />
              </div>
              <div className="speak-meaning muted" lang={course.from.tts} dir={course.from.rtl ? 'rtl' : undefined}>“{s.en}”</div>
              <div className="speak-play">
                <button className="chip" onClick={() => speak(s.t)}>🔊 Play</button>
                <button className="chip" onClick={() => speak(s.t, { slow: true })}>🐢 Slow</button>
              </div>
            </div>
          </div>

          <button
            className={`mic mic-big ${mic.listening ? 'live' : ''}`}
            onClick={mic.listening ? mic.stop : mic.start}
            aria-label={mic.listening ? 'Stop listening' : 'Start speaking'}
          >
            <span className="mic-icon" aria-hidden="true">🎤</span>
            {mic.listening ? 'Listening… tap to stop' : result ? 'Try again' : 'Tap and read aloud'}
          </button>
          {mic.listening && <div className="mic-wave" aria-hidden="true"><i /><i /><i /><i /><i /></div>}
          {mic.heard && <p className="heard">Kobe heard: “{mic.heard}”</p>}
          {mic.error && <p className="heard warn">{MIC_ERRORS[mic.error]}</p>}
        </div>
      </div>

      <footer className={`lesson-foot ${result ? (passed ? 'correct' : 'wrong') : 'answer'}`}>
        <div className="foot-inner">
          {v ? (
            <div className="feedback">
              <span className="feedback-buddy">
                <Avatar id={state.user.avatar} size={60} full mood={passed ? 'happy' : 'sad'} />
                <span className="feedback-badge pct">{Math.round(result.score * 100)}%</span>
              </span>
              <div>
                <strong>{v.title}</strong>
                {!passed && tries >= 3 && <div>Tough one! You can move on and come back later.</div>}
              </div>
            </div>
          ) : (
            <button className="btn btn-ghost" onClick={next}>Skip</button>
          )}
          {result && (
            <button className={`btn ${passed ? 'btn-success' : 'btn-danger'}`} onClick={next}>
              {passed ? 'Continue' : 'Move on'}
            </button>
          )}
        </div>
      </footer>

      {confirmQuit && (
        <div className="modal-back">
          <div className="modal">
            <Kobe mood="sad" size={120} />
            <h2>Leave speaking practice? Your progress here won't be saved.</h2>
            <button className="btn btn-primary btn-wide" onClick={() => setConfirmQuit(false)}>Keep practising</button>
            <button className="btn btn-link" onClick={onExit}>End session</button>
          </div>
        </div>
      )}
    </div>
  );
}
