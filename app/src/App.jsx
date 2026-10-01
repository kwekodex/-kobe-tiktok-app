import { useEffect, useState } from 'react';
import { useStore } from './lib/store.jsx';
import { setSoundEnabled } from './lib/sound.js';
import { findLesson } from './data/course.js';
import { buildLessonSession, buildPracticeSession } from './lib/exercises.js';
import Onboarding from './components/Onboarding.jsx';
import Nav from './components/Nav.jsx';
import TopBar from './components/TopBar.jsx';
import Path from './components/Path.jsx';
import SidePanel from './components/SidePanel.jsx';
import Lesson from './components/Lesson.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Profile from './components/Profile.jsx';
import Shop from './components/Shop.jsx';
import Practice from './components/Practice.jsx';

export default function App() {
  const { state } = useStore();
  const [tab, setTab] = useState('learn');
  const [session, setSession] = useState(null); // { lessonId?, exercises, practice }

  useEffect(() => setSoundEnabled(state.sound), [state.sound]);

  if (!state.user) return <Onboarding />;

  const startLesson = (lessonId) => {
    setSession({ lessonId, exercises: buildLessonSession(findLesson(lessonId)), practice: false });
  };
  const startPractice = () => {
    const exercises = buildPracticeSession(Object.keys(state.completed), state.weak);
    if (exercises) setSession({ exercises, practice: true });
  };

  if (session) {
    return <Lesson key={session.exercises[0].key + session.lessonId} session={session} onExit={() => setSession(null)} />;
  }

  return (
    <div className="shell">
      <Nav tab={tab} setTab={setTab} />
      <main className="main">
        <TopBar />
        <div className="content">
          {tab === 'learn' && <Path onStart={startLesson} />}
          {tab === 'practice' && <Practice onStart={startPractice} />}
          {tab === 'leagues' && <Leaderboard />}
          {tab === 'shop' && <Shop />}
          {tab === 'profile' && <Profile />}
        </div>
      </main>
      <SidePanel setTab={setTab} />
    </div>
  );
}
