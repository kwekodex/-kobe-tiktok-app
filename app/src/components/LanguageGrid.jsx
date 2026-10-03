import { useMemo, useState } from 'react';
import { courseList } from '../lib/courses.js';
import Flag from './Flag.jsx';

// Searchable grid of all courses. Used in onboarding and on the Languages tab.
export default function LanguageGrid({ selected, onPick, progressFor }) {
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? courseList.filter((l) => l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q)) : courseList;
  }, [query]);

  return (
    <div className="lang-picker">
      <input
        id="lang-search"
        className="input"
        type="search"
        placeholder={`Search ${courseList.length} languages`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="lang-grid">
        {list.map((l) => {
          const done = progressFor?.(l.code) || 0;
          return (
            <button
              key={l.code}
              className={`lang-card ${selected === l.code ? 'on' : ''}`}
              disabled={!l.available}
              onClick={() => onPick(l.code)}
            >
              <Flag lang={l} size="lg" />
              <span className="lang-name">{l.name}</span>
              <span className="lang-native" dir={l.rtl ? 'rtl' : undefined}>{l.native}</span>
              <span className="lang-tags">
                {!l.available && <span className="tag">Coming soon</span>}
                {l.available && l.beta && <span className="tag">Beta</span>}
                {done > 0 && <span className="tag tag-progress">{done} done</span>}
              </span>
            </button>
          );
        })}
        {!list.length && <p className="muted">No language matches “{query}”.</p>}
      </div>
    </div>
  );
}
