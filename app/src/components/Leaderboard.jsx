import { useEffect, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { api } from '../lib/api.js';
import { leagueBots } from '../lib/league.js';
import Avatar from './Avatar.jsx';

export default function Leaderboard() {
  const { state } = useStore();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    let alive = true;
    api.leaderboard(state.user.id).then((res) => {
      if (!alive) return;
      if (res) return setBoard(res.entries);
      const me = { ...state.user, weekXp: state.weekXp, you: true };
      setBoard([me, ...leagueBots()].sort((a, b) => b.weekXp - a.weekXp));
    });
    return () => { alive = false; };
  }, [state.user, state.weekXp]);

  return (
    <div className="page">
      <div className="league-head">
        <div className="league-badge">🐾</div>
        <h1>Puppy League</h1>
        <p className="muted">Top 5 advance to the next league. Resets every Monday.</p>
      </div>
      {!board ? <p className="muted center">Loading…</p> : (
        <ol className="board">
          {board.map((e, i) => (
            <li key={e.id} className={`${e.you ? 'you' : ''} ${i < 5 ? 'promo' : ''}`}>
              <span className="rank">{i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span>
              <span className="avatar"><Avatar id={e.you ? state.user.avatar : e.avatar} size={40} /></span>
              <span className="name">{e.name}{e.you ? ' (you)' : ''}</span>
              <span className="xp">{e.weekXp} XP</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
