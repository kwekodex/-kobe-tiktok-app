// Builds a playable course by pairing the shared curriculum with one
// language's translations. Language files are code-split and loaded on demand.
import { createContext, useContext } from 'react';
import { curriculum } from '../data/curriculum.js';
import { languages, findLanguage } from '../data/languages.js';

const loaders = import.meta.glob('../data/lang/*.js');
const codeOf = (path) => path.match(/lang\/(.+)\.js$/)[1];
const available = new Set(Object.keys(loaders).map(codeOf));

export const courseList = languages.map((l) => ({ ...l, available: available.has(l.code) }));

export async function loadCourse(code) {
  const lang = findLanguage(code);
  const loader = loaders[`../data/lang/${code}.js`];
  if (!lang || !loader) throw new Error(`No course for ${code}`);
  const data = (await loader()).default;
  const units = curriculum.map((u) => ({
    ...u,
    lessons: u.lessons.map((l) => {
      const [w = [], s = []] = (data[l.id] || []).map((x) => x.split('|').map((t) => t.trim()));
      return {
        ...l,
        words: l.words.map((x, i) => ({ ...x, id: `${l.id}w${i}`, t: w[i] })).filter((x) => x.t),
        sentences: l.sentences.map((x, i) => ({ ...x, id: `${l.id}s${i}`, t: s[i] })).filter((x) => x.t),
      };
    }),
  }));
  const allLessons = units.flatMap((u, ui) =>
    u.lessons.map((l, li) => ({ ...l, unitId: u.id, unitIndex: ui, lessonIndex: li, color: u.color })),
  );
  return { ...lang, units, allLessons, findLesson: (id) => allLessons.find((l) => l.id === id) };
}

export const CourseContext = createContext(null);
export const useCourse = () => useContext(CourseContext);
