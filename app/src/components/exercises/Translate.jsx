import Kobe from '../Kobe.jsx';
import TileBuilder from './TileBuilder.jsx';
import { speak } from '../../lib/speech.js';
import { useCourse } from '../../lib/courses.js';
import Reading from '../Reading.jsx';

export function PromptBubble({ ex, mood }) {
  const course = useCourse();
  const target = ex.from === 't';
  return (
    <div className="speech-row">
      <Kobe mood={mood} size={110} />
      <div className="bubble bubble-left">
        {target && (
          <button className="speaker-mini" onClick={() => speak(ex.prompt)} aria-label="Listen">🔊</button>
        )}
        <span className="prompt-stack">
          <span className="prompt-text" lang={target ? course.tts : course.from.tts} dir={(target ? course.rtl : course.from.rtl) ? "rtl" : undefined}>{ex.prompt}</span>
          {target && <Reading text={ex.prompt} />}
        </span>
      </div>
    </div>
  );
}

export default function Translate({ ex, onChange, disabled, mood }) {
  const course = useCourse();
  const toTarget = ex.from !== 't';
  return (
    <div className="ex">
      <h2 className="ex-title">Write this in {toTarget ? course.name : course.from.name}</h2>
      <PromptBubble ex={ex} mood={mood} />
      <TileBuilder tiles={ex.tiles} onChange={onChange} disabled={disabled} joiner={ex.joiner}
        lang={toTarget ? course.tts : course.from.tts} rtl={toTarget ? course.rtl : course.from.rtl} target={toTarget} />
    </div>
  );
}
