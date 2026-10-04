import { speak } from '../../lib/speech.js';
import { sfx } from '../../lib/sound.js';
import { useCourse } from '../../lib/courses.js';
import Reading from '../Reading.jsx';

export default function Select({ ex, value, onChange, disabled }) {
  const course = useCourse();
  return (
    <div className="ex">
      <h2 className="ex-title">Which one of these is “<span lang={course.from.tts}>{ex.prompt}</span>”?</h2>
      <div className="select-grid">
        {ex.options.map((o, i) => (
          <button
            key={o.id}
            className={`card-option ${value === o.id ? 'on' : ''}`}
            disabled={disabled}
            onClick={() => { sfx.tap(); speak(o.label); onChange(o.id); }}
          >
            <span className="card-emoji">{o.emoji}</span>
            <span className="card-label" lang={course.tts} dir={course.rtl ? "rtl" : undefined}>{o.label}</span>
            <Reading text={o.label} />
            {disabled && <span className="card-meaning" lang={course.from.tts} dir={course.from.rtl ? 'rtl' : undefined}>= {o.en}</span>}
            <span className="kbd">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
