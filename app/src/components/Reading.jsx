// Pronunciation guide in Latin letters under words written in another script.
import { useStore } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import { romanize } from '../lib/romanize.js';

export default function Reading({ text, className = '' }) {
  const { state } = useStore();
  const course = useCourse();
  if (!state.showReading) return null;
  const r = romanize(text, course.code);
  if (!r) return null;
  return <span className={`reading ${className}`} lang={`${course.code}-Latn`}>{r}</span>;
}
