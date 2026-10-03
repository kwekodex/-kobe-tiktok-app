import { useStore } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import Flag from './Flag.jsx';
import Avatar from './Avatar.jsx';

export default function TopBar({ onPickCourse }) {
  const { state } = useStore();
  const course = useCourse();
  return (
    <header className="topbar">
      <button className="stat stat-flag" title={`Learning ${course.name}. Change language`} onClick={onPickCourse}><Flag lang={course} /></button>
      <span className={`stat ${state.streak ? 'stat-streak' : 'stat-off'}`} title="Day streak">🔥 {state.streak}</span>
      <span className="stat stat-gems" title="Gems">💎 {state.gems}</span>
      <span className="stat stat-hearts" title="Hearts">❤️ {state.hearts}</span>
      <span className="topbar-avatar" title={state.user.name}><Avatar id={state.user.avatar} size={34} /></span>
    </header>
  );
}
