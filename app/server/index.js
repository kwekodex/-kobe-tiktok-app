import express from 'express';
import { randomUUID } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';
import { curriculum } from '../src/data/curriculum.js';
import { languages } from '../src/data/languages.js';
import { leagueBots } from '../src/lib/league.js';
import { weekKey } from '../src/lib/dates.js';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json({ limit: '200kb' }));

const publicUser = (u) => ({ id: u.id, name: u.name, avatar: u.avatar, joinedAt: u.joinedAt });

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/courses', (_req, res) => res.json({ languages, curriculum }));

app.post('/api/users', (req, res) => {
  const name = String(req.body?.name || '').trim().slice(0, 30);
  if (!name) return res.status(400).json({ error: 'name required' });
  const user = db.putUser({
    id: randomUUID(),
    name,
    avatar: String(req.body?.avatar || '🐶').slice(0, 8),
    joinedAt: new Date().toISOString(),
    state: {},
  });
  res.status(201).json(publicUser(user));
});

app.get('/api/users/:id', (req, res) => {
  const user = db.getUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json({ ...publicUser(user), state: user.state });
});

app.put('/api/users/:id/state', (req, res) => {
  const user = db.getUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  const state = req.body?.state;
  if (!state || typeof state !== 'object') return res.status(400).json({ error: 'state required' });
  db.putUser({ ...user, state, updatedAt: new Date().toISOString() });
  res.json({ ok: true });
});

app.get('/api/leaderboard', (req, res) => {
  const wk = weekKey();
  const humans = db.allUsers().map((u) => ({
    ...publicUser(u),
    weekXp: u.state?.weekKey === wk ? u.state.weekXp || 0 : 0,
    you: u.id === req.query.userId,
  }));
  const board = [...humans, ...leagueBots(new Date(), Math.max(0, 15 - humans.length))]
    .sort((a, b) => b.weekXp - a.weekXp)
    .slice(0, 30);
  res.json({ league: 'Puppy League', weekKey: wk, entries: board });
});

// In production, serve the built client.
if (process.env.NODE_ENV === 'production') {
  const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(join(dist, 'index.html')));
}

app.listen(PORT, () => console.log(`KobeLingo API on http://localhost:${PORT}`));
