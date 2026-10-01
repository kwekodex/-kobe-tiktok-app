import { PromptBubble } from './Translate.jsx';

export default function TypeIt({ ex, value, onChange, disabled, mood, onSubmit }) {
  return (
    <div className="ex">
      <h2 className="ex-title">Type this in {ex.from === 'es' ? 'English' : 'Spanish'}</h2>
      <PromptBubble ex={ex} mood={mood} />
      <textarea
        className="type-box"
        autoFocus
        value={value}
        disabled={disabled}
        placeholder={`Type in ${ex.from === 'es' ? 'English' : 'Spanish'}`}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(); } }}
      />
    </div>
  );
}
