// Commit 003 - small helpers for promises and delays

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, attempts = 3, backoff = 200): Promise<T> {
  let lastErr: any;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      await delay(backoff * (i + 1));
    }
  }
  throw lastErr;
}

export async function timeout<T>(fn: Promise<T>, ms: number): Promise<T> {
  const t = delay(ms).then(() => Promise.reject(new Error('timeout')));
  return await Promise.race([fn, t]) as T;
}

export function safeJsonParse<T = any>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch (e) {
    return null;
  }
}
