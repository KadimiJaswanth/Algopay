// Commit 009 - small date utilities

export function formatDateISO(d: Date) {
  return d.toISOString();
}

export function formatDateLocal(d: Date) {
  return d.toLocaleString();
}

export function daysBetween(a: Date, b: Date) {
  const ms = Math.abs(a.getTime() - b.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function addDays(d: Date, days: number) {
  const t = new Date(d);
  t.setDate(t.getDate() + days);
  return t;
}
