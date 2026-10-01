// Thin API client. Every call fails soft so the app keeps working offline.
async function req(path, opts = {}) {
  const res = await fetch(`api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

const soft = (p) => p.catch(() => null);

export const api = {
  createUser: (name, avatar) => soft(req('/users', { method: 'POST', body: { name, avatar } })),
  getUser: (id) => soft(req(`/users/${id}`)),
  saveState: (id, state) => soft(req(`/users/${id}/state`, { method: 'PUT', body: { state } })),
  leaderboard: (id) => soft(req(`/leaderboard?userId=${encodeURIComponent(id)}`)),
};
