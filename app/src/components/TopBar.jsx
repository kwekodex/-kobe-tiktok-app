import { useStore, MAX_HEARTS } from '../lib/store.jsx';
import { course } from '../data/course.js';

export default function TopBar() {
  const { state } = useStore();
  return (
    <header className="topbar">
      <span className="stat" title={course.title}>{course.flag}</span>
      <span className={`stat ${state.streak ? 'stat-streak' : 'stat-off'}`} title="Day streak">🔥 {state.streak}</span>
      <span className="stat stat-gems" title="Gems">💎 {state.gems}</span>
      <span className="stat stat-hearts" title="Hearts">❤️ {state.hearts}{state.hearts === MAX_HEARTS ? '' : ''}</span>
    </header>
  );
}
