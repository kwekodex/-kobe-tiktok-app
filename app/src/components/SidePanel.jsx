import { useStore, todayXp } from '../lib/store.jsx';
import Kobe from './Kobe.jsx';
import Avatar, { avatarInfo } from './Avatar.jsx';

export function DailyGoal() {
  const { state } = useStore();
  const xp = todayXp(state);
  const pct = Math.min(1, xp / state.dailyGoal);
  return (
    <div className="panel">
      <h3>Daily goal</h3>
      <div className="goal-row">
        <Kobe mood={pct >= 1 ? 'happy' : 'idle'} size={56} />
        <div className="goal-meter">
          <div className="progress small"><div className="progress-fill gold" style={{ width: `${pct * 100}%` }} /></div>
          <span className="muted">{xp} / {state.dailyGoal} XP</span>
        </div>
      </div>
    </div>
  );
}

export default function SidePanel({ setTab }) {
  const { state } = useStore();
  return (
    <aside className="side">
      <div className="panel me-card">
        <Avatar id={state.user.avatar} size={60} full animate />
        <div>
          <strong>{state.user.name}</strong>
          <span className="muted">as {avatarInfo(state.user.avatar).name} · {state.totalXp} XP</span>
        </div>
      </div>
      <DailyGoal />
      <div className="panel">
        <h3>Puppy League</h3>
        <p className="muted">You've earned {state.weekXp} XP this week.</p>
        <button className="btn btn-secondary btn-wide" onClick={() => setTab('leagues')}>View league</button>
      </div>
      <div className="panel">
        <h3>Streak</h3>
        <p className="muted">
          {state.streak ? `🔥 ${state.streak} day streak. Keep it up!` : 'Complete a lesson to start a streak.'}
          {state.streakFreezes > 0 && ` 🧊 ${state.streakFreezes} freeze${state.streakFreezes > 1 ? 's' : ''} equipped.`}
        </p>
      </div>
    </aside>
  );
}
