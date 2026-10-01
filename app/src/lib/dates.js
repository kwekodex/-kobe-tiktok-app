export const todayKey = (d = new Date()) => d.toLocaleDateString('en-CA'); // YYYY-MM-DD local

export function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

// ISO-ish week key, Monday start.
export function weekKey(d = new Date()) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  return todayKey(x);
}
