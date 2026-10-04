import { useStore, courseCompleted, courseWeak } from '../lib/store.jsx';
import { canRecognize, noMicReason } from '../lib/listen.js';
import Kobe from './Kobe.jsx';

export default function Practice({ onStart, onSpeak }) {
  const { state } = useStore();
  const unlocked = Object.keys(courseCompleted(state)).length > 0;
  const weak = courseWeak(state);
  const micOk = canRecognize();
  return (
    <div className="page center">
      <Kobe mood={unlocked ? 'think' : 'happy'} size={150} />
      <h1>Practice hub</h1>
      <p className="muted">Practice doesn't cost hearts, and mixed review earns you one back!</p>
      <div className="practice-cards">
        <button className="practice-card" onClick={onSpeak}>
          <span className="pc-icon" aria-hidden="true">🎤</span>
          <div>
            <strong>Speaking practice</strong>
            <span>
              {micOk
                ? `Read ${unlocked ? 'sentences you have learned' : 'your first sentences'} out loud. Kobe shows which words he understood.`
                : noMicReason()}
            </span>
          </div>
          <span className="pc-xp">+15 XP</span>
        </button>
        <button className="practice-card" onClick={onStart} disabled={!unlocked}>
          <span className="pc-icon" aria-hidden="true">🧠</span>
          <div>
            <strong>Mixed review</strong>
            <span>
              {unlocked
                ? `Kobe picks the words you've missed most.${weak.length ? ` ${weak.length} item${weak.length > 1 ? 's' : ''} to review.` : ''}`
                : 'Finish your first lesson to unlock review.'}
            </span>
          </div>
          <span className="pc-xp">+10 XP</span>
        </button>
      </div>
    </div>
  );
}
