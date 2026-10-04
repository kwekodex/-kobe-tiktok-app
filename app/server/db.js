// Minimal JSON-file database. Swap for Postgres/Supabase when you scale up.
import { mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DATA_DIR = process.env.DATA_DIR || join(dirname(fileURLToPath(import.meta.url)), 'data');
const FILE = join(DATA_DIR, 'db.json');

mkdirSync(DATA_DIR, { recursive: true });

let data = { users: {} };
try {
  data = JSON.parse(readFileSync(FILE, 'utf8'));
} catch { /* first run */ }

let pending;
function persist() {
  clearTimeout(pending);
  pending = setTimeout(() => {
    const tmp = `${FILE}.tmp`;
    writeFileSync(tmp, JSON.stringify(data, null, 2));
    renameSync(tmp, FILE);
  }, 200);
}

export const db = {
  getUser: (id) => data.users[id] || null,
  allUsers: () => Object.values(data.users),
  putUser(user) {
    data.users[user.id] = user;
    persist();
    return user;
  },
};
