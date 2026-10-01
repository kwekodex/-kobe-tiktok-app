import { useStore } from '../lib/store.jsx';
import Kobe from './Kobe.jsx';

export default function Practice({ onStart }) {
  const { state } = useStore();
  const unlocked = Object.keys(state.completed).length > 0;
  return (
    <div className="page center">
      <Kobe mood={unlocked ? 'think' : 'sleep'} size={160} />
      <h1>Practice hub</h1>
      {unlocked ? (
        <>
          <p className="muted">
            Review what you've learned. Kobe picks the words you've missed most.
            {state.weak.length > 0 && ` ${state.weak.length} item${state.weak.length > 1 ? 's' : ''} to review.`}
          </p>
          <p className="muted">Practice doesn't cost hearts and earns you one back!</p>
          <button className="btn btn-primary" onClick={onStart}>Start practice +10 XP</button>
        </>
      ) : (
        <p className="muted">Finish your first lesson to unlock practice.</p>
      )}
    </div>
  );
}
