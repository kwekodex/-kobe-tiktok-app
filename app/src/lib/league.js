// Deterministic practice-buddy "bots" so the league has competitors even
// with few real users. Shared by server and offline client.
import { weekKey } from './dates.js';

const NAMES = ['Mia', 'Leo', 'Sofía', 'Noah', 'Lucía', 'Kai', 'Valentina', 'Mateo', 'Ava', 'Diego',
  'Zoe', 'Hugo', 'Isla', 'Tomás', 'Ruby', 'Bruno', 'Elena', 'Finn', 'Camila', 'Oscar'];
const AVATARS = ['cat', 'fox', 'panda', 'koala', 'bunny', 'penguin', 'lion', 'frog', 'bear', 'hamster'];

function hash(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

export function leagueBots(now = new Date(), count = 14) {
  const wk = weekKey(now);
  const weekStart = new Date(`${wk}T00:00:00`);
  const progress = Math.min(1, Math.max(0.05, (now - weekStart) / (7 * 86400000)));
  return Array.from({ length: count }, (_, i) => {
    const h = hash(`${wk}:${i}`);
    return {
      id: `bot-${i}`,
      name: NAMES[h % NAMES.length],
      avatar: AVATARS[(h >>> 5) % AVATARS.length],
      weekXp: Math.round(((h % 400) + 20) * progress),
      bot: true,
    };
  });
}
