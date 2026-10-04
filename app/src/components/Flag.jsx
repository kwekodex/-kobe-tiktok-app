// Flag emoji where one fits the language, otherwise a two-letter badge.
export default function Flag({ lang, size = 'md' }) {
  return lang.flag
    ? <span className={`flag flag-${size}`} aria-hidden="true">{lang.flag}</span>
    : <span className={`flag flag-${size} flag-badge`} aria-hidden="true">{lang.code.slice(0, 2).toUpperCase()}</span>;
}
