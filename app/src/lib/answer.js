// Answer checking: case, punctuation and (optionally) accent insensitive.
// Works across scripts, including languages written without spaces.

const PUNCT = /[¿?¡!.,;:"“”«»„—–。、，！？：；「」『』・…،؛؟।॥፣።፧]/g;

export function stripAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}

export function normalize(s, { accents = true } = {}) {
  let out = s.toLowerCase().replace(PUNCT, ' ').replace(/\s+/g, ' ').trim();
  if (!accents) out = stripAccents(out);
  return out;
}

const segmenters = {};
// Splits text into words. Languages written without spaces use the browser's segmenter.
// `keep` lists words (like Kobe's name) that must stay whole.
export function tokenize(s, { lang, nospace = false, keep = [] } = {}) {
  const text = normalize(s);
  if (nospace && typeof Intl !== 'undefined' && Intl.Segmenter) {
    segmenters[lang] ??= new Intl.Segmenter(lang, { granularity: 'word' });
    const segment = (part) => [...segmenters[lang].segment(part)].filter((x) => x.isWordLike).map((x) => x.segment);
    const names = keep.filter(Boolean);
    if (!names.length) return segment(text);
    const pattern = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
    return text.split(pattern).flatMap((part) => (names.includes(part) ? [part] : segment(part)));
  }
  return text.split(' ').filter(Boolean);
}

const squash = (s) => s.replace(/\s/g, '');

// Returns { correct, typo } where typo means only accents were wrong.
export function checkAnswer(given, accepted) {
  const g = normalize(given);
  if (accepted.some((a) => normalize(a) === g || squash(normalize(a)) === squash(g))) return { correct: true, typo: false };
  const ga = squash(normalize(given, { accents: false }));
  if (accepted.some((a) => squash(normalize(a, { accents: false })) === ga)) return { correct: true, typo: true };
  return { correct: false, typo: false };
}
