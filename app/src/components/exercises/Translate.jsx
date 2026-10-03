import Kobe from '../Kobe.jsx';
import TileBuilder from './TileBuilder.jsx';
import { speak } from '../../lib/speech.js';
import { useCourse } from '../../lib/courses.js';

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
        <span className="prompt-text" lang={target ? course.tts : "en"} dir={target && course.rtl ? "rtl" : undefined}>{ex.prompt}</span>
      </div>
    </div>
  );
}

export default function Translate({ ex, onChange, disabled, mood }) {
  const course = useCourse();
  const toTarget = ex.from !== 't';
  return (
    <div className="ex">
      <h2 className="ex-title">Write this in {toTarget ? course.name : 'English'}</h2>
      <PromptBubble ex={ex} mood={mood} />
      <TileBuilder tiles={ex.tiles} onChange={onChange} disabled={disabled} joiner={ex.joiner}
        lang={toTarget ? course.tts : 'en'} rtl={toTarget && course.rtl} />
    </div>
  );
}
