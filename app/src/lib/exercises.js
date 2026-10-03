// Builds a lesson session (a queue of exercises) from course content.
import { allLessons } from '../data/course.js';
import { tokenize } from './answer.js';
import { shuffle, sample, pick } from './random.js';

const canListen = () =>
  import.meta.env.VITE_SPEAK !== 'off' &&
  typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

const sentenceKey = (s) => `s:${s.es}`;
const wordKey = (w) => `w:${w.es}`;

function distractorTiles(answerTokens, pool, n) {
  const used = new Set(answerTokens);
  const candidates = [...new Set(pool.flatMap(tokenize))].filter((t) => !used.has(t));
  return sample(candidates, n);
}

function tilesExercise(sentence, from, pool, type = 'tiles') {
  const to = from === 'es' ? 'en' : 'es';
  const answerTokens = tokenize(sentence[to]);
  const extra = distractorTiles(answerTokens, pool.map((s) => s[to]), Math.min(4, Math.max(2, 7 - answerTokens.length)));
  return {
    type,
    key: sentenceKey(sentence),
    from,
    prompt: sentence[from],
    answer: sentence[to],
    accepted: [sentence[to], ...(sentence[`${to}Alt`] || [])],
    tiles: shuffle([...answerTokens, ...extra]).map((text, id) => ({ id, text })),
  };
}

function selectExercise(word, pool) {
  const others = sample(pool.filter((w) => w.es !== word.es && w.emoji), 2);
  return {
    type: 'select',
    key: wordKey(word),
    prompt: word.en,
    answer: word.es,
    options: shuffle([word, ...others]).map((w) => ({ id: w.es, label: w.es, emoji: w.emoji })),
  };
}

function matchExercise(words) {
  return {
    type: 'match',
    key: `m:${words.map((w) => w.es).join('|')}`,
    left: shuffle(words.map((w) => ({ id: w.es, label: w.en }))),
    right: shuffle(words.map((w) => ({ id: w.es, label: w.es }))),
  };
}

function typeExercise(sentence, from) {
  const to = from === 'es' ? 'en' : 'es';
  return {
    type: 'type',
    key: sentenceKey(sentence),
    from,
    prompt: sentence[from],
    answer: sentence[to],
    accepted: [sentence[to], ...(sentence[`${to}Alt`] || [])],
  };
}

function speakExercise(sentence) {
  return { type: 'speak', key: sentenceKey(sentence), prompt: sentence.es, answer: sentence.es };
}

function listenExercise(sentence, pool) {
  const ex = tilesExercise(sentence, 'en', pool, 'listen');
  return { ...ex, audio: sentence.es, prompt: sentence.es };
}

function unitPool(lesson) {
  const sameUnit = allLessons.filter((l) => l.unitId === lesson.unitId);
  return {
    words: sameUnit.flatMap((l) => l.words),
    sentences: sameUnit.flatMap((l) => l.sentences),
  };
}

export function buildLessonSession(lesson) {
  const pool = unitPool(lesson);
  const words = shuffle(lesson.words);
  const sents = shuffle(lesson.sentences);
  const s = (i) => sents[i % sents.length];

  return [
    selectExercise(words[0], pool.words),
    selectExercise(words[1], pool.words),
    tilesExercise(s(0), 'es', pool.sentences),
    listenExercise(s(1), pool.sentences),
    matchExercise(words.slice(0, 5)),
    tilesExercise(s(2), 'en', pool.sentences),
    selectExercise(words[2], pool.words),
    canListen() ? speakExercise(s(3)) : tilesExercise(s(3), 'es', pool.sentences),
    listenExercise(s(4), pool.sentences),
    typeExercise(pick(sents), 'es'),
  ];
}

// Practice: weighted toward items the learner got wrong before.
export function buildPracticeSession(completedLessonIds, weakKeys) {
  const lessons = allLessons.filter((l) => completedLessonIds.includes(l.id));
  if (!lessons.length) return null;
  const words = lessons.flatMap((l) => l.words);
  const sents = lessons.flatMap((l) => l.sentences);
  const weakSents = sents.filter((s) => weakKeys.includes(sentenceKey(s)));
  const weakWords = words.filter((w) => weakKeys.includes(wordKey(w)));
  const chooseSent = () => (weakSents.length && Math.random() < 0.6 ? pick(weakSents) : pick(sents));
  const chooseWord = () => (weakWords.length && Math.random() < 0.6 ? pick(weakWords) : pick(words));

  return [
    selectExercise(chooseWord(), words),
    tilesExercise(chooseSent(), 'es', sents),
    listenExercise(chooseSent(), sents),
    matchExercise(sample(words, 5)),
    tilesExercise(chooseSent(), 'en', sents),
    selectExercise(chooseWord(), words),
    typeExercise(chooseSent(), 'es'),
    listenExercise(chooseSent(), sents),
  ];
}
