// Commit 007 - mock API client (fetch wrapper)

export async function apiGet<T = any>(url: string): Promise<T> {
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  return res.json();
}

export async function apiPost<T = any>(url: string, body: any): Promise<T> {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
  return res.json();
}

export function bindApi(base: string) {
  return {
    get: (p: string) => apiGet(`${base}${p}`),
    post: (p: string, b: any) => apiPost(`${base}${p}`, b),
  };
}

export const demoApi = bindApi('/api');
