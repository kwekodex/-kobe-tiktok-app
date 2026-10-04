import { useState } from 'react';
import { useStore, courseCompleted } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import VoiceSettings from './VoiceSettings.jsx';
import Avatar, { AVATARS, avatarInfo } from './Avatar.jsx';
import { todayKey } from '../lib/dates.js';
import { DailyGoal } from './SidePanel.jsx';
import { canRomanize } from '../lib/romanize.js';

const ACHIEVEMENTS = [
  { id: 'first', icon: '🐣', name: 'First steps', test: (s) => s.lessonsDone >= 1, desc: 'Complete a lesson' },
  { id: 'streak3', icon: '🔥', name: 'Warming up', test: (s) => s.longestStreak >= 3, desc: 'Reach a 3 day streak' },
  { id: 'perfect', icon: '💯', name: 'Good dog', test: (s) => s.perfectLessons >= 1, desc: 'Finish a lesson with no mistakes' },
  { id: 'xp100', icon: '⚡', name: 'Zoomies', test: (s) => s.totalXp >= 100, desc: 'Earn 100 XP' },
  { id: 'unit1', icon: '🐑', name: 'Herder', test: (s, c) => c.allLessons.filter((l) => l.unitId === 'u1').every((l) => courseCompleted(s)[l.id]), desc: 'Finish Unit 1' },
  { id: 'all', icon: '🏆', name: 'Top dog', test: (s, c) => c.allLessons.every((l) => courseCompleted(s)[l.id]), desc: 'Finish a whole course' },
  { id: 'polyglot', icon: '🌍', name: 'Globetrotter', test: (s) => Object.values(s.completed).filter((c) => Object.keys(c).length).length >= 3, desc: 'Complete lessons in 3 languages' },
];

export default function Profile() {
  const { state, dispatch } = useStore();
  const course = useCourse();
  const [confirmReset, setConfirmReset] = useState(false);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { label: d.toLocaleDateString(undefined, { weekday: 'narrow' }), xp: state.xpByDay[todayKey(d)] || 0 };
  });
  const maxXp = Math.max(state.dailyGoal, ...days.map((d) => d.xp));

  return (
    <div className="page">
      <div className="profile-head">
        <span className="profile-avatar"><Avatar id={state.user.avatar} size={84} full animate /></span>
        <div>
          <h1>{state.user.name}</h1>
          <p className="muted">Joined {new Date(state.user.joinedAt).toLocaleDateString()} · {state.user.online ? 'Synced ☁️' : 'Saved on this device'}</p>
        </div>
      </div>

      <h2>Statistics</h2>
      <div className="stat-grid">
        <div className="stat-card"><strong>🔥 {state.streak}</strong><span>Day streak</span></div>
        <div className="stat-card"><strong>⚡ {state.totalXp}</strong><span>Total XP</span></div>
        <div className="stat-card"><strong>📚 {Object.keys(courseCompleted(state)).length}/{course.allLessons.length}</strong><span>{course.name} lessons</span></div>
        <div className="stat-card"><strong>🏅 {state.longestStreak}</strong><span>Longest streak</span></div>
      </div>

      <h2>This week</h2>
      <div className="week-chart" role="img" aria-label="XP earned per day this week">
        {days.map((d, i) => (
          <div key={i} className="week-col">
            <span className="week-val">{d.xp || ''}</span>
            <div className="week-bar" style={{ height: `${(d.xp / maxXp) * 100}%` }} />
            <span className="week-day">{d.label}</span>
          </div>
        ))}
      </div>

      <h2>Achievements</h2>
      <div className="ach-grid">
        {ACHIEVEMENTS.map((a) => {
          const got = a.test(state, course);
          return (
            <div key={a.id} className={`ach ${got ? 'got' : ''}`}>
              <span className="ach-icon">{a.icon}</span>
              <div><strong>{a.name}</strong><span className="muted">{a.desc}</span></div>
            </div>
          );
        })}
      </div>

      <h2>Your buddy</h2>
      <p className="muted">You're {avatarInfo(state.user.avatar).name} the {avatarInfo(state.user.avatar).animal}. Tap another animal to switch.</p>
      <div className="buddy-grid profile-buddies" role="radiogroup" aria-label="Choose your avatar">
        {AVATARS.map((a) => (
          <button
            type="button"
            key={a.id}
            role="radio"
            aria-checked={state.user.avatar === a.id}
            className={`buddy ${state.user.avatar === a.id ? 'on' : ''}`}
            onClick={() => dispatch({ type: 'setUser', user: { avatar: a.id } })}
          >
            <Avatar id={a.id} size={54} full animate={state.user.avatar === a.id} />
            <span>{a.name}</span>
          </button>
        ))}
      </div>

      <h2>Voice</h2>
      <VoiceSettings />

      <h2>Settings</h2>
      <div className="mobile-only"><DailyGoal /></div>
      <div className="settings">
        <label>Daily goal
          <select className="input" value={state.dailyGoal} onChange={(e) => dispatch({ type: 'setGoal', goal: Number(e.target.value) })}>
            {[10, 20, 30, 50].map((g) => <option key={g} value={g}>{g} XP</option>)}
          </select>
        </label>
        <label className="check"><input type="checkbox" checked={state.sound} onChange={() => dispatch({ type: 'toggleSound' })} /> Sound effects</label>
        {canRomanize(course.code) && (
          <label className="check"><input type="checkbox" checked={state.showReading} onChange={() => dispatch({ type: 'toggleReading' })} /> Show pronunciation in English letters</label>
        )}
        {confirmReset ? (
          <div className="reset-confirm">
            <span>Erase all progress in every language on this device?</span>
            <button className="btn btn-danger" onClick={() => dispatch({ type: 'reset' })}>Erase</button>
            <button className="btn btn-link" onClick={() => setConfirmReset(false)}>Cancel</button>
          </div>
        ) : (
          <button className="btn btn-link danger" onClick={() => setConfirmReset(true)}>Reset progress</button>
        )}
      </div>
    </div>
  );
}
