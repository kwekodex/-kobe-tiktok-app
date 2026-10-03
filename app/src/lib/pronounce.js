// Grades a spoken attempt against the sentence the learner was reading.
// Returns each word of the sentence marked ok / missed, plus an overall score.
import { normalize, tokenize } from './answer.js';

// Speech engines often spell the mascot's name in Latin letters.
const NAME = /\b(kobe|kobi|koby|coby|cobi|kobey)\b/;

export function grade(expected, heard, course) {
  const said = normalize(heard || '', { accents: false });
  const saidName = NAME.test(said);
  let words;
  if (course.nospace) {
    // Languages written without spaces: a word counts if its characters were heard.
    const got = said.replace(/\s/g, '');
    words = tokenize(expected, { lang: course.tts, nospace: true, keep: [course.kobe] }).map((text) => {
      const key = normalize(text, { accents: false });
      const ok = got.includes(key) || [...key].every((ch) => got.includes(ch)) || (text === course.kobe && saidName);
      return { text, ok };
    });
  } else {
    const bag = {};
    for (const w of said.split(' ').filter(Boolean)) bag[w] = (bag[w] || 0) + 1;
    words = expected.split(/\s+/).filter(Boolean).map((text) => {
      const key = normalize(text, { accents: false });
      if (!key) return { text, ok: true, punct: true };
      // Count each heard word once, so repeats must be said twice.
      if (bag[key] > 0) { bag[key] -= 1; return { text, ok: true }; }
      // Accept a run-together word ("dont" for "don't", "l'eau" → "l eau").
      const squashed = key.replace(/\s/g, '');
      if (key.includes(' ') && said.replace(/\s/g, '').includes(squashed)) return { text, ok: true };
      return { text, ok: false };
    });
  }
  const real = words.filter((w) => !w.punct);
  // If the only miss is the dog's name and the engine heard "Kobe", forgive it.
  const misses = real.filter((w) => !w.ok);
  if (misses.length === 1 && saidName && /^(k|c|к|ק|κ|ك|ק)/i.test(normalize(misses[0].text))) misses[0].ok = true;
  return { words, score: real.length ? real.filter((w) => w.ok).length / real.length : 0 };
}

export const PASS = 0.7;

export function verdict(score) {
  if (score >= 0.95) return { title: 'Perfect pronunciation!', mood: 'cheer' };
  if (score >= 0.85) return { title: 'Excellent!', mood: 'happy' };
  if (score >= PASS) return { title: 'Great job!', mood: 'happy' };
  if (score >= 0.4) return { title: 'Almost! Try the red words again.', mood: 'think' };
  return { title: "Kobe didn't catch that. Listen and try again!", mood: 'sad' };
}
