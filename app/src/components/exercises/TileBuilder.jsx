// Shared word-bank UI used by translate and listen exercises.
import { useEffect, useState } from 'react';
import { sfx } from '../../lib/sound.js';

export default function TileBuilder({ tiles, onChange, disabled }) {
  const [chosen, setChosen] = useState([]);

  useEffect(() => {
    onChange(chosen.map((id) => tiles[id].text).join(' '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen]);

  const add = (id) => { if (!disabled) { sfx.tap(); setChosen((c) => [...c, id]); } };
  const remove = (id) => { if (!disabled) { sfx.tap(); setChosen((c) => c.filter((x) => x !== id)); } };

  return (
    <div className="tiles">
      <div className="answer-line">
        {chosen.map((id) => (
          <button key={id} className="tile" onClick={() => remove(id)} disabled={disabled}>{tiles[id].text}</button>
        ))}
      </div>
      <div className="bank">
        {tiles.map((t) => (
          <span key={t.id} className="tile-slot">
            {chosen.includes(t.id) ? (
              <span className="tile tile-ghost">{t.text}</span>
            ) : (
              <button className="tile" onClick={() => add(t.id)} disabled={disabled}>{t.text}</button>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
