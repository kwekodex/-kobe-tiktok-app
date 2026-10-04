// Builds a lesson session (a queue of exercises) for any language course.
// Sentence/word fields: `t` is the target language, `en` is English.
import { tokenize } from './answer.js';
import { shuffle, sample, pick } from './random.js';
import { canRecognize as canListen } from './listen.js';

function makeBuilder(course) {
  const tok = (text, side) => (side === 't' ? tokenize(text, { lang: course.tts, nospace: course.nospace, keep: [course.kobe] }) : tokenize(text));
  const joiner = (side) => (side === 't' && course.nospace ? '' : ' ');

  function tilesExercise(sentence, from, pool, type = 'tiles') {
    const to = from === 't' ? 'en' : 't';
    const answerTokens = tok(sentence[to], to);
    const used = new Set(answerTokens);
    const candidates = [...new Set(pool.flatMap((s) => tok(s[to], to)))].filter((x) => !used.has(x));
    const extra = sample(candidates, Math.min(4, Math.max(2, 7 - answerTokens.length)));
    return {
      type,
      key: sentence.id,
      from,
      prompt: sentence[from],
      answer: sentence[to],
      accepted: to === 'en' ? [sentence.en, ...(sentence.enAlt || [])] : [sentence.t],
      joiner: joiner(to),
      tiles: shuffle([...answerTokens, ...extra]).map((text, id) => ({ id, text })),
    };
  }

  const select = (word, pool) => ({
    type: 'select',
    key: word.id,
    prompt: word.en,
    answer: word.id,
    answerText: word.t,
    options: shuffle([word, ...sample(pool.filter((w) => w.id !== word.id && w.emoji), 2)]).map((w) => ({ id: w.id, label: w.t, emoji: w.emoji })),
  });

  const match = (words) => ({
    type: 'match',
    key: `m:${words.map((w) => w.id).join('|')}`,
    left: shuffle(words.map((w) => ({ id: w.id, label: w.en }))),
    right: shuffle(words.map((w) => ({ id: w.id, label: w.t }))),
  });

  const type = (sentence) => ({
    type: 'type', key: sentence.id, from: 't', prompt: sentence.t, answer: sentence.en, accepted: [sentence.en, ...(sentence.enAlt || [])],
  });

  const speakEx = (sentence) => ({ type: 'speak', key: sentence.id, prompt: sentence.t, answer: sentence.t });

  const listen = (sentence, pool) => ({ ...tilesExercise(sentence, 'en', pool, 'listen'), audio: sentence.t, prompt: sentence.t });

  return { tilesExercise, select, match, type, speakEx, listen };
}

export function buildLessonSession(course, lesson) {
  const b = makeBuilder(course);
  const unit = course.allLessons.filter((l) => l.unitId === lesson.unitId);
  const poolW = unit.flatMap((l) => l.words);
  const poolS = unit.flatMap((l) => l.sentences);
  const words = shuffle(lesson.words);
  const sents = shuffle(lesson.sentences);
  const w = (i) => words[i % words.length];
  const s = (i) => sents[i % sents.length];

  return [
    { type: 'intro', key: `intro:${lesson.id}`, words: lesson.words },
    b.select(w(0), poolW),
    b.select(w(1), poolW),
    b.tilesExercise(s(0), 't', poolS),
    b.listen(s(1), poolS),
    b.match(words.slice(0, 5)),
    b.tilesExercise(s(2), 'en', poolS),
    b.select(w(2), poolW),
    canListen() ? b.speakEx(s(3)) : b.tilesExercise(s(3), 't', poolS),
    b.listen(s(4), poolS),
    b.type(pick(sents)),
  ];
}

// Practice: weighted toward items the learner got wrong before.
export function buildPracticeSession(course, completedLessonIds, weakKeys) {
  const b = makeBuilder(course);
  const lessons = course.allLessons.filter((l) => completedLessonIds.includes(l.id));
  if (!lessons.length) return null;
  const words = lessons.flatMap((l) => l.words);
  const sents = lessons.flatMap((l) => l.sentences);
  const weakS = sents.filter((x) => weakKeys.includes(x.id));
  const weakW = words.filter((x) => weakKeys.includes(x.id));
  const chooseS = () => (weakS.length && Math.random() < 0.6 ? pick(weakS) : pick(sents));
  const chooseW = () => (weakW.length && Math.random() < 0.6 ? pick(weakW) : pick(words));

  return [
    b.select(chooseW(), words),
    b.tilesExercise(chooseS(), 't', sents),
    b.listen(chooseS(), sents),
    b.match(sample(words, Math.min(5, words.length))),
    b.tilesExercise(chooseS(), 'en', sents),
    b.select(chooseW(), words),
    b.type(chooseS()),
    b.listen(chooseS(), sents),
  ];
}

// Sentences to read aloud: weak ones first, then others from finished lessons.
// Before any lesson is finished, it uses the first lesson.
export function buildSpeakSession(course, completedLessonIds, weakKeys, count = 5) {
  let lessons = course.allLessons.filter((l) => completedLessonIds.includes(l.id));
  if (!lessons.length) lessons = course.allLessons.slice(0, 1);
  const sents = lessons.flatMap((l) => l.sentences);
  const weak = shuffle(sents.filter((x) => weakKeys.includes(x.id)));
  const rest = shuffle(sents.filter((x) => !weakKeys.includes(x.id)));
  return [...weak.slice(0, 2), ...rest].slice(0, count);
}
