// Shared word-bank UI used by translate and listen exercises.
import { useEffect, useState } from 'react';
import { sfx } from '../../lib/sound.js';
import { speak } from '../../lib/speech.js';
import Reading from '../Reading.jsx';
import { useStore } from '../../lib/store.jsx';
import { useCourse } from '../../lib/courses.js';
import { canRomanize } from '../../lib/romanize.js';

// `target` marks tiles in the language being learned: they show a reading and say the word when tapped.
export default function TileBuilder({ tiles, onChange, disabled, joiner = ' ', lang, rtl, target = false }) {
  const [chosen, setChosen] = useState([]);
  const { state } = useStore();
  const course = useCourse();
  const withReading = target && state.showReading && canRomanize(course.code);

  useEffect(() => {
    onChange(chosen.map((id) => tiles[id].text).join(joiner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen]);

  const add = (id) => {
    if (disabled) return;
    if (target) speak(tiles[id].text); else sfx.tap();
    setChosen((c) => [...c, id]);
  };
  const face = (t) => (withReading ? <><span>{t.text}</span><Reading text={t.text} /></> : t.text);
  const remove = (id) => { if (!disabled) { sfx.tap(); setChosen((c) => c.filter((x) => x !== id)); } };

  return (
    <div className="tiles" lang={lang}>
      <div className="answer-line" dir={rtl ? "rtl" : undefined}>
        {chosen.map((id) => (
          <button key={id} className="tile" onClick={() => remove(id)} disabled={disabled}>{face(tiles[id])}</button>
        ))}
      </div>
      <div className="bank" dir={rtl ? "rtl" : undefined}>
        {tiles.map((t) => (
          <span key={t.id} className="tile-slot">
            {chosen.includes(t.id) ? (
              <span className="tile tile-ghost">{face(t)}</span>
            ) : (
              <button className="tile" onClick={() => add(t.id)} disabled={disabled}>{face(t)}</button>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
