// Answer checking: case, punctuation and (optionally) accent insensitive.

export function stripAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function normalize(s, { accents = true } = {}) {
  let out = s.toLowerCase().replace(/[¿?¡!.,;:"“”]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!accents) out = stripAccents(out);
  return out;
}

export function tokenize(s) {
  return normalize(s).split(' ').filter(Boolean);
}

// Returns { correct, typo } where typo means only accents were wrong.
export function checkAnswer(given, accepted) {
  const g = normalize(given);
  if (accepted.some((a) => normalize(a) === g)) return { correct: true, typo: false };
  const ga = normalize(given, { accents: false });
  if (accepted.some((a) => normalize(a, { accents: false }) === ga)) return { correct: true, typo: true };
  return { correct: false, typo: false };
}
