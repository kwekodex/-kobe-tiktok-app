import { useStore } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import LanguageGrid from './LanguageGrid.jsx';
import VoiceSettings from './VoiceSettings.jsx';

export default function Courses({ onPicked }) {
  const { state, dispatch } = useStore();
  const course = useCourse();
  return (
    <div className="page">
      <h1>Languages</h1>
      <p className="muted">You're learning {course.name} from {course.from.name}. Pick any language. Your progress in each one is kept. Change the language you speak in Profile → Settings.</p>
      <VoiceSettings />
      <h2>All languages</h2>
      <LanguageGrid
        selected={state.course}
        exclude={state.native}
        progressFor={(code) => Object.keys(state.completed[code] || {}).length}
        onPick={(code) => { dispatch({ type: 'setCourse', course: code }); onPicked(); }}
      />
    </div>
  );
}
