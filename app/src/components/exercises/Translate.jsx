import Kobe from '../Kobe.jsx';
import TileBuilder from './TileBuilder.jsx';
import { speak } from '../../lib/speech.js';

export function PromptBubble({ ex, mood }) {
  return (
    <div className="speech-row">
      <Kobe mood={mood} size={110} />
      <div className="bubble bubble-left">
        {ex.from === 'es' && (
          <button className="speaker-mini" onClick={() => speak(ex.prompt)} aria-label="Listen">🔊</button>
        )}
        <span className="prompt-text">{ex.prompt}</span>
      </div>
    </div>
  );
}

export default function Translate({ ex, onChange, disabled, mood }) {
  return (
    <div className="ex">
      <h2 className="ex-title">Write this in {ex.from === 'es' ? 'English' : 'Spanish'}</h2>
      <PromptBubble ex={ex} mood={mood} />
      <TileBuilder tiles={ex.tiles} onChange={onChange} disabled={disabled} />
    </div>
  );
}
