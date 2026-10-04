import { PromptBubble } from './Translate.jsx';
import { useCourse } from '../../lib/courses.js';

export default function TypeIt({ ex, value, onChange, disabled, mood, onSubmit }) {
  const { from: native } = useCourse();
  return (
    <div className="ex">
      <h2 className="ex-title">Type this in {native.name}</h2>
      <PromptBubble ex={ex} mood={mood} />
      <textarea
        className="type-box"
        autoFocus
        value={value}
        disabled={disabled}
        placeholder={`Type in ${native.name}`}
        lang={native.tts}
        dir={native.rtl ? 'rtl' : undefined}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(); } }}
      />
    </div>
  );
}
