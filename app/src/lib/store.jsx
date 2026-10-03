// App state: progress, XP, streak, hearts, gems. Persisted to localStorage
// and synced to the API server when it is reachable.
import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { todayKey, daysBetween, weekKey } from './dates.js';
import { api } from './api.js';

const STORAGE_KEY = 'kobelingo:v1';
export const MAX_HEARTS = 5;
export const HEART_REFILL_MS = 30 * 60 * 1000;
export const HEART_REFILL_COST = 350;

const initial = {
  user: null, // { id, name, avatar, joinedAt, online }
  dailyGoal: 20,
  totalXp: 0,
  weekXp: 0,
  weekKey: weekKey(),
  xpByDay: {}, // { 'YYYY-MM-DD': xp }
  streak: 0,
  longestStreak: 0,
  lastActiveDay: null,
  streakFreezes: 0,
  hearts: MAX_HEARTS,
  heartsUpdatedAt: Date.now(),
  gems: 500,
  course: null, // language code being learned
  completed: {}, // { [course]: { [lessonId]: times completed } }
  weak: {}, // { [course]: exercise keys answered wrong recently }
  voices: {}, // { [course]: voiceURI }
  speechRate: 1,
  speechPitch: 1,
  lessonsDone: 0,
  perfectLessons: 0,
  sound: true,
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const saved = { ...initial, ...JSON.parse(raw) };
    // Migrate single-course (Spanish only) saves.
    if (Array.isArray(saved.weak)) saved.weak = { es: saved.weak };
    if (Object.keys(saved.completed).some((k) => /^u\d+l\d+$/.test(k))) saved.completed = { es: saved.completed };
    if (saved.user && !saved.course) saved.course = 'es';
    return saved;
  } catch {
    return initial;
  }
}

// Bring time-based values up to date (hearts regen, streak loss, new week).
function refresh(s, now = Date.now()) {
  let next = s;
  if (next.hearts < MAX_HEARTS) {
    const gained = Math.floor((now - next.heartsUpdatedAt) / HEART_REFILL_MS);
    if (gained > 0) {
      const hearts = Math.min(MAX_HEARTS, next.hearts + gained);
      next = { ...next, hearts, heartsUpdatedAt: hearts === MAX_HEARTS ? now : next.heartsUpdatedAt + gained * HEART_REFILL_MS };
    }
  }
  if (next.lastActiveDay && next.streak > 0) {
    const gap = daysBetween(next.lastActiveDay, todayKey());
    if (gap > 1) {
      const missed = gap - 1;
      if (next.streakFreezes >= missed) {
        // Freezes cover the missed days; streak survives.
        const d = new Date();
        d.setDate(d.getDate() - 1);
        next = { ...next, streakFreezes: next.streakFreezes - missed, lastActiveDay: todayKey(d) };
      } else {
        next = { ...next, streak: 0 };
      }
    }
  }
  const wk = weekKey();
  if (next.weekKey !== wk) next = { ...next, weekKey: wk, weekXp: 0 };
  return next;
}

function reducer(state, action) {
  const s = refresh(state);
  switch (action.type) {
    case 'tick':
      return s;
    case 'signup':
      return { ...s, user: action.user, dailyGoal: action.dailyGoal, course: action.course };
    case 'setUser':
      return { ...s, user: { ...s.user, ...action.user } };
    case 'loseHeart':
      if (s.hearts <= 0) return s;
      return { ...s, hearts: s.hearts - 1, heartsUpdatedAt: s.hearts === MAX_HEARTS ? Date.now() : s.heartsUpdatedAt };
    case 'gainHeart':
      return { ...s, hearts: Math.min(MAX_HEARTS, s.hearts + 1) };
    case 'refillHearts':
      if (s.gems < HEART_REFILL_COST) return s;
      return { ...s, hearts: MAX_HEARTS, gems: s.gems - HEART_REFILL_COST, heartsUpdatedAt: Date.now() };
    case 'buyFreeze':
      if (s.gems < 200 || s.streakFreezes >= 2) return s;
      return { ...s, gems: s.gems - 200, streakFreezes: s.streakFreezes + 1 };
    case 'markWeak': {
      const list = [action.key, ...(s.weak[s.course] || []).filter((k) => k !== action.key)].slice(0, 40);
      return { ...s, weak: { ...s.weak, [s.course]: list } };
    }
    case 'markStrong':
      return { ...s, weak: { ...s.weak, [s.course]: (s.weak[s.course] || []).filter((k) => k !== action.key) } };
    case 'setCourse':
      return { ...s, course: action.course };
    case 'setVoice':
      return { ...s, voices: { ...s.voices, [action.course]: action.voiceURI } };
    case 'setRate':
      return { ...s, speechRate: action.rate };
    case 'setPitch':
      return { ...s, speechPitch: action.pitch };
    case 'finishSession': {
      const { xp, lessonId, perfect } = action;
      const today = todayKey();
      let { streak, lastActiveDay } = s;
      if (lastActiveDay !== today) {
        streak = lastActiveDay && daysBetween(lastActiveDay, today) === 1 ? streak + 1 : 1;
        lastActiveDay = today;
      }
      const mine = s.completed[s.course] || {};
      const completed = lessonId ? { ...s.completed, [s.course]: { ...mine, [lessonId]: (mine[lessonId] || 0) + 1 } } : s.completed;
      return {
        ...s,
        totalXp: s.totalXp + xp,
        weekXp: s.weekXp + xp,
        xpByDay: { ...s.xpByDay, [today]: (s.xpByDay[today] || 0) + xp },
        streak,
        longestStreak: Math.max(s.longestStreak, streak),
        lastActiveDay,
        completed,
        gems: s.gems + (perfect ? 10 : 5),
        lessonsDone: s.lessonsDone + 1,
        perfectLessons: s.perfectLessons + (perfect ? 1 : 0),
      };
    }
    case 'setGoal':
      return { ...s, dailyGoal: action.goal };
    case 'toggleSound':
      return { ...s, sound: !s.sound };
    case 'reset':
      return { ...initial, heartsUpdatedAt: Date.now() };
    default:
      return s;
  }
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => refresh(load()));
  const syncTimer = useRef();

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
    if (!state.user) return;
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(async () => {
      const { user, ...rest } = state;
      const ok = await api.saveState(user.id, rest);
      if (!ok && !user.online) return;
      if (!!ok !== !!user.online) dispatch({ type: 'setUser', user: { online: !!ok } });
    }, 800);
  }, [state]);

  // Re-evaluate hearts/streak every minute.
  useEffect(() => {
    const t = setInterval(() => dispatch({ type: 'tick' }), 60000);
    return () => clearInterval(t);
  }, []);

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);

export function todayXp(state) {
  return state.xpByDay[todayKey()] || 0;
}

// Progress for the course currently being learned.
export const courseCompleted = (state) => state.completed[state.course] || {};
export const courseWeak = (state) => state.weak[state.course] || [];
