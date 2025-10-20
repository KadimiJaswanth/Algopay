// Commit 006 - small in-memory key-value store (for demo)

export class SimpleStore {
  private map = new Map<string, string>();

  set(key: string, value: string) {
    this.map.set(key, value);
  }

  get(key: string): string | undefined {
    return this.map.get(key);
  }

  delete(key: string) {
    this.map.delete(key);
  }

  keys(): string[] {
    return Array.from(this.map.keys());
  }

  clear() {
    this.map.clear();
  }
}

export function createDemoStore() {
  const s = new SimpleStore();
  s.set('hello', 'world');
  return s;
}
