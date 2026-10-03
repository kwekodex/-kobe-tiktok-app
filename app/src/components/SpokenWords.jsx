// A sentence with each word marked green (said) or red (missed) after an attempt.
export default function SpokenWords({ text, result, course }) {
  const dir = course.rtl ? 'rtl' : undefined;
  if (!result) return <span className="prompt-text" lang={course.tts} dir={dir}>{text}</span>;
  return (
    <span className={`prompt-text spoken ${course.nospace ? 'tight' : ''}`} lang={course.tts} dir={dir}>
      {result.words.map((w, i) => (
        <span key={i} className={w.punct ? '' : w.ok ? 'sw-ok' : 'sw-miss'}>{w.text}</span>
      ))}
    </span>
  );
}
