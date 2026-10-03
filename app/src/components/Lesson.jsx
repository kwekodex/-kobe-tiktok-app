import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStore, HEART_REFILL_COST } from '../lib/store.jsx';
import { checkAnswer } from '../lib/answer.js';
import { sfx } from '../lib/sound.js';
import { pick } from '../lib/random.js';
import { findLesson } from '../data/course.js';
import Kobe from './Kobe.jsx';
import Select from './exercises/Select.jsx';
import Translate from './exercises/Translate.jsx';
import Listen from './exercises/Listen.jsx';
import TypeIt from './exercises/TypeIt.jsx';
import Match from './exercises/Match.jsx';
import Speak from './exercises/Speak.jsx';

const PRAISE = ['Nice!', 'Great job!', 'Excellent!', 'Correct!', 'Awesome!', 'Bonzer!'];
const COMBO_LINES = { 3: '3 in a row! Woof!', 5: '5 in a row! You are on fire!', 8: '8 in a row! Legendary!' };

export default function Lesson({ session, onExit }) {
  const { state, dispatch } = useStore();
  const lesson = session.lessonId ? findLesson(session.lessonId) : null;
  const total = session.exercises.length;

  const [queue, setQueue] = useState(session.exercises);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('answer'); // answer | correct | wrong
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboMsg, setComboMsg] = useState(null);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const ex = queue[idx];
  const outOfHearts = !session.practice && state.hearts <= 0 && status !== 'correct' && !done;

  const result = useMemo(() => {
    if (!done) return null;
    const perfect = mistakes === 0;
    const base = session.practice ? 10 : state.completed[session.lessonId] ? 5 : 10;
    return { xp: base + (perfect ? 5 : 0), perfect, accuracy: Math.round((total / (total + mistakes)) * 100) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  useEffect(() => {
    if (!result) return;
    sfx.complete();
    dispatch({ type: 'finishSession', xp: result.xp, lessonId: session.lessonId, perfect: result.perfect });
    if (session.practice) dispatch({ type: 'gainHeart' });
  }, [result, dispatch, session]);

  const autoChecked = ex && (ex.type === 'match' || ex.type === 'speak');
  const canCheck = status === 'answer' && !autoChecked && value.trim().length > 0;

  const check = useCallback(() => {
    if (!canCheck) return;
    let correct, typo = false;
    if (ex.type === 'select') correct = value === ex.answer;
    else ({ correct, typo } = checkAnswer(value, ex.accepted));

    if (correct) {
      sfx.correct();
      setStatus('correct');
      setCorrectCount((c) => c + 1);
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setComboMsg(COMBO_LINES[nextCombo] || null);
      setFeedback({ title: typo ? 'Watch your accents!' : pick(PRAISE), detail: typo ? ex.answer : null });
      dispatch({ type: 'markStrong', key: ex.key });
    } else {
      sfx.wrong();
      setStatus('wrong');
      setMistakes((m) => m + 1);
      setCombo(0);
      setComboMsg(null);
      setFeedback({ title: 'Correct solution:', detail: ex.answer });
      dispatch({ type: 'markWeak', key: ex.key });
      if (!session.practice) dispatch({ type: 'loseHeart' });
      setQueue((q) => [...q, { ...ex, retry: true }]); // try it again at the end
    }
  }, [canCheck, ex, value, combo, dispatch, session.practice]);

  const next = useCallback(() => {
    if (status === 'answer') return;
    if (idx + 1 >= queue.length) { setDone(true); return; }
    setIdx((i) => i + 1);
    setValue('');
    setStatus('answer');
    setFeedback(null);
  }, [status, idx, queue.length]);

  // "Can't speak now": skip this and any later speaking exercises, no penalty.
  const skipSpeaking = () => {
    const later = queue.slice(idx + 1).filter((q) => q.type === 'speak').length;
    setQueue((q) => [...q.slice(0, idx + 1), ...q.slice(idx + 1).filter((x) => x.type !== 'speak')]);
    setStatus('correct');
    setCorrectCount((c) => c + 1 + later);
    setFeedback({ title: "No problem! We'll skip speaking for now." });
  };

  const matchDone = useCallback(() => {
    sfx.correct();
    setStatus('correct');
    setCorrectCount((c) => c + 1);
    setFeedback({ title: pick(PRAISE) });
  }, []);

  // Keyboard: Enter to check/continue, number keys for multiple choice.
  useEffect(() => {
    const onKey = (e) => {
      if (done || confirmQuit || outOfHearts) return;
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        if (status === 'answer') check(); else next();
      }
      if (ex?.type === 'select' && status === 'answer' && /^[1-9]$/.test(e.key)) {
        const o = ex.options[Number(e.key) - 1];
        if (o) setValue(o.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, check, next, done, confirmQuit, outOfHearts, ex]);

  if (done && result) {
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    return (
      <div className="lesson complete">
        <Kobe mood="cheer" size={200} />
        <h1 className="complete-title">{session.practice ? 'Practice complete!' : 'Lesson complete!'}</h1>
        {result.perfect && <p className="muted">Perfect lesson! Kobe is doing zoomies.</p>}
        <div className="result-tiles">
          <div className="result-tile xp"><span>Total XP</span><strong>⚡ {result.xp}</strong></div>
          <div className="result-tile acc"><span>{result.accuracy >= 90 ? 'Amazing' : 'Good'}</span><strong>🎯 {result.accuracy}%</strong></div>
          <div className="result-tile time"><span>Time</span><strong>⏱️ {Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</strong></div>
        </div>
        <button className="btn btn-primary btn-wide" autoFocus onClick={onExit}>Continue</button>
      </div>
    );
  }

  const kobeMood = status === 'correct' ? 'happy' : status === 'wrong' ? 'sad' : 'idle';
  const progress = Math.min(1, correctCount / total);
  const props = { ex, value, onChange: setValue, disabled: status !== 'answer', mood: kobeMood, onSubmit: () => (status === 'answer' ? check() : next()) };

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button className="icon-btn" onClick={() => setConfirmQuit(true)} aria-label="Quit">✕</button>
        <div className="progress"><div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          {comboMsg && <span className="combo" key={combo}>{comboMsg}</span>}
        </div>
        <span className="stat stat-hearts">{session.practice ? '♾️' : `❤️ ${state.hearts}`}</span>
      </div>

      <div className="lesson-body">
        {lesson && <div className="lesson-label">{lesson.title}{ex.retry ? ' · previous mistake' : ''}</div>}
        {ex.type === 'select' && <Select key={idx} {...props} />}
        {ex.type === 'tiles' && <Translate key={idx} {...props} />}
        {ex.type === 'listen' && <Listen key={idx} {...props} />}
        {ex.type === 'type' && <TypeIt key={idx} {...props} />}
        {ex.type === 'match' && <Match key={idx} ex={ex} onComplete={matchDone} />}
        {ex.type === 'speak' && <Speak key={idx} ex={ex} onComplete={matchDone} />}
      </div>

      <footer className={`lesson-foot ${status}`}>
        <div className="foot-inner">
          {feedback ? (
            <div className="feedback">
              <span className="feedback-icon">{status === 'correct' ? '✔' : '✖'}</span>
              <div>
                <strong>{feedback.title}</strong>
                {feedback.detail && <div>{feedback.detail}</div>}
              </div>
            </div>
          ) : ex.type === 'speak' ? (
            <button className="btn btn-ghost" onClick={skipSpeaking}>Can't speak now</button>
          ) : (
            <button className="btn btn-ghost" disabled={ex.type === 'match'} onClick={() => {
              setStatus('wrong'); setMistakes((m) => m + 1); setCombo(0);
              setFeedback({ title: 'Correct solution:', detail: ex.answer });
              dispatch({ type: 'markWeak', key: ex.key });
              setQueue((q) => [...q, { ...ex, retry: true }]);
            }}>Skip</button>
          )}
          {status === 'answer' ? (
            <button className="btn btn-primary" disabled={!canCheck} onClick={check}>Check</button>
          ) : (
            <button className={`btn ${status === 'correct' ? 'btn-success' : 'btn-danger'}`} autoFocus onClick={next}>Continue</button>
          )}
        </div>
      </footer>

      {confirmQuit && (
        <div className="modal-back">
          <div className="modal">
            <Kobe mood="sad" size={120} />
            <h2>Wait, don't go! You'll lose your progress if you quit now.</h2>
            <button className="btn btn-primary btn-wide" onClick={() => setConfirmQuit(false)}>Keep learning</button>
            <button className="btn btn-link" onClick={onExit}>End session</button>
          </div>
        </div>
      )}

      {outOfHearts && (
        <div className="modal-back">
          <div className="modal">
            <Kobe mood="sleep" size={120} />
            <h2>You ran out of hearts!</h2>
            <p className="muted">Hearts refill over time, or you can refill now with gems.</p>
            <button className="btn btn-primary btn-wide" disabled={state.gems < HEART_REFILL_COST} onClick={() => dispatch({ type: 'refillHearts' })}>
              Refill for 💎 {HEART_REFILL_COST}
            </button>
            <button className="btn btn-link" onClick={onExit}>No thanks</button>
          </div>
        </div>
      )}
    </div>
  );
}
