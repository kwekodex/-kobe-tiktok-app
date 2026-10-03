import { useEffect, useState } from 'react';
import { sfx } from '../../lib/sound.js';
import { speak } from '../../lib/speech.js';
import { useCourse } from '../../lib/courses.js';

export default function Match({ ex, onComplete }) {
  const course = useCourse();
  const [sel, setSel] = useState(null); // { side, id }
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);

  useEffect(() => {
    if (matched.length === ex.left.length) {
      const t = setTimeout(onComplete, 450);
      return () => clearTimeout(t);
    }
  }, [matched, ex.left.length, onComplete]);

  function choose(side, item) {
    if (matched.includes(item.id)) return;
    if (side === 'right') speak(item.label);
    if (!sel || sel.side === side) { sfx.tap(); setSel({ side, id: item.id }); return; }
    if (sel.id === item.id) {
      sfx.correct();
      setMatched((m) => [...m, item.id]);
    } else {
      sfx.wrong();
      setWrong([sel, { side, id: item.id }]);
      setTimeout(() => setWrong(null), 500);
    }
    setSel(null);
  }

  const cls = (side, id) => {
    if (matched.includes(id)) return 'match-btn done';
    if (wrong?.some((w) => w.side === side && w.id === id)) return 'match-btn bad';
    if (sel?.side === side && sel.id === id) return 'match-btn on';
    return 'match-btn';
  };

  return (
    <div className="ex">
      <h2 className="ex-title">Tap the matching pairs</h2>
      <div className="match-grid">
        <div className="match-col">
          {ex.left.map((it) => <button key={it.id} className={cls('left', it.id)} onClick={() => choose('left', it)}>{it.label}</button>)}
        </div>
        <div className="match-col">
          {ex.right.map((it) => <button key={it.id} lang={course.tts} dir={course.rtl ? 'rtl' : undefined} className={cls('right', it.id)} onClick={() => choose('right', it)}>{it.label}</button>)}
        </div>
      </div>
    </div>
  );
}
