import { useEffect } from 'react';
import TileBuilder from './TileBuilder.jsx';
import { speak } from '../../lib/speech.js';

export default function Listen({ ex, onChange, disabled }) {
  useEffect(() => {
    const t = setTimeout(() => speak(ex.audio), 350);
    return () => clearTimeout(t);
  }, [ex.audio]);

  return (
    <div className="ex">
      <h2 className="ex-title">Tap what you hear</h2>
      <div className="listen-buttons">
        <button className="speaker big" onClick={() => speak(ex.audio)} aria-label="Play">🔊</button>
        <button className="speaker small" onClick={() => speak(ex.audio, 'es-ES', 0.55)} aria-label="Play slowly">🐢</button>
      </div>
      <TileBuilder tiles={ex.tiles} onChange={onChange} disabled={disabled} />
    </div>
  );
}
