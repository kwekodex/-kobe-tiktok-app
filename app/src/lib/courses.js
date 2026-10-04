// Builds a playable course by pairing the shared curriculum with one
// language's translations. Language files are code-split and loaded on demand.
import { createContext, useContext } from 'react';
import { curriculum } from '../data/curriculum.js';
import { languages, findLanguage, findNative, ENGLISH } from '../data/languages.js';

const loaders = import.meta.glob('../data/lang/*.js');
const codeOf = (path) => path.match(/lang\/(.+)\.js$/)[1];
const available = new Set(Object.keys(loaders).map(codeOf));

export const courseList = languages.map((l) => ({ ...l, available: available.has(l.code) }));

const split = (data, lessonId) => (data?.[lessonId] || []).map((x) => x.split('|').map((t) => t.trim()));

// `nativeCode` is the learner's own language. Every course translates the same
// curriculum, so meanings can come from any other course (English by default).
// In the result, `t` is the language being learned and `en` is the learner's language.
export async function loadCourse(code, nativeCode = 'en') {
  const lang = findLanguage(code);
  const loader = loaders[`../data/lang/${code}.js`];
  if (!lang || !loader) throw new Error(`No course for ${code}`);
  const nativeLoader = nativeCode !== 'en' && nativeCode !== code ? loaders[`../data/lang/${nativeCode}.js`] : null;
  const [data, nativeData] = await Promise.all([loader().then((m) => m.default), nativeLoader?.().then((m) => m.default)]);
  const native = nativeData ? findNative(nativeCode) : ENGLISH;
  const units = curriculum.map((u) => ({
    ...u,
    lessons: u.lessons.map((l) => {
      const [w = [], s = []] = split(data, l.id);
      const [nw = [], ns = []] = split(nativeData, l.id);
      const mine = (x, own) => (nativeData && own ? { en: own, enAlt: [] } : {});
      return {
        ...l,
        words: l.words.map((x, i) => ({ ...x, ...mine(x, nw[i]), id: `${l.id}w${i}`, t: w[i] })).filter((x) => x.t),
        sentences: l.sentences.map((x, i) => ({ ...x, ...mine(x, ns[i]), id: `${l.id}s${i}`, t: s[i] })).filter((x) => x.t),
      };
    }),
  }));
  const allLessons = units.flatMap((u, ui) =>
    u.lessons.map((l, li) => ({ ...l, unitId: u.id, unitIndex: ui, lessonIndex: li, color: u.color })),
  );
  return { ...lang, from: native, nativeRequested: nativeCode, units, allLessons, findLesson: (id) => allLessons.find((l) => l.id === id) };
}

export const CourseContext = createContext(null);
export const useCourse = () => useContext(CourseContext);
