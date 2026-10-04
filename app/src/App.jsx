import { useEffect, useState } from 'react';
import { useStore, courseCompleted, courseWeak } from './lib/store.jsx';
import { setSoundEnabled } from './lib/sound.js';
import { setSpeechConfig } from './lib/speech.js';
import { loadCourse, CourseContext } from './lib/courses.js';
import { buildLessonSession, buildPracticeSession, buildSpeakSession } from './lib/exercises.js';
import Onboarding from './components/Onboarding.jsx';
import Nav from './components/Nav.jsx';
import TopBar from './components/TopBar.jsx';
import Path from './components/Path.jsx';
import SidePanel from './components/SidePanel.jsx';
import Lesson from './components/Lesson.jsx';
import SpeakPractice from './components/SpeakPractice.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Profile from './components/Profile.jsx';
import Shop from './components/Shop.jsx';
import Practice from './components/Practice.jsx';
import Courses from './components/Courses.jsx';
import Kobe from './components/Kobe.jsx';

export default function App() {
  const { state } = useStore();
  const [tab, setTab] = useState('learn');
  const [session, setSession] = useState(null); // { lessonId?, exercises, practice } or { speak: sentences }
  const [course, setCourse] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => setSoundEnabled(state.sound), [state.sound]);

  useEffect(() => {
    if (!state.course) return;
    let alive = true;
    setLoadError(null);
    loadCourse(state.course, state.native)
      .then((c) => alive && setCourse(c))
      .catch((e) => alive && setLoadError(e.message));
    return () => { alive = false; };
  }, [state.course, state.native]);

  useEffect(() => {
    if (course) setSpeechConfig({ lang: course.tts, voiceURI: state.voices[course.code] || null, rate: state.speechRate, pitch: state.speechPitch });
  }, [course, state.voices, state.speechRate, state.speechPitch]);

  if (!state.user || !state.course) return <Onboarding />;

  if (!course || course.code !== state.course || course.nativeRequested !== state.native) {
    return (
      <div className="loading">
        <Kobe mood={loadError ? 'sad' : 'think'} size={140} />
        <p className="muted">{loadError ? `Couldn't load this course (${loadError}).` : 'Fetching your course…'}</p>
      </div>
    );
  }

  const startLesson = (lessonId) => {
    setSession({ lessonId, exercises: buildLessonSession(course, course.findLesson(lessonId)), practice: false });
  };
  const startPractice = () => {
    const exercises = buildPracticeSession(course, Object.keys(courseCompleted(state)), courseWeak(state));
    if (exercises) setSession({ exercises, practice: true });
  };
  const startSpeaking = () => {
    setSession({ speak: buildSpeakSession(course, Object.keys(courseCompleted(state)), courseWeak(state)), key: Date.now() });
  };

  return (
    <CourseContext.Provider value={course}>
      {session?.speak ? (
        <SpeakPractice key={session.key} sentences={session.speak} onExit={() => setSession(null)} />
      ) : session ? (
        <Lesson key={session.exercises[0].key + session.lessonId} session={session} onExit={() => setSession(null)} />
      ) : (
        <div className="shell">
          <Nav tab={tab} setTab={setTab} />
          <main className="main">
            <TopBar onPickCourse={() => setTab('courses')} />
            <div className="content">
              {tab === 'learn' && <Path onStart={startLesson} />}
              {tab === 'practice' && <Practice onStart={startPractice} onSpeak={startSpeaking} />}
              {tab === 'courses' && <Courses onPicked={() => setTab('learn')} />}
              {tab === 'leagues' && <Leaderboard />}
              {tab === 'shop' && <Shop />}
              {tab === 'profile' && <Profile />}
            </div>
          </main>
          <SidePanel setTab={setTab} />
        </div>
      )}
    </CourseContext.Provider>
  );
}
