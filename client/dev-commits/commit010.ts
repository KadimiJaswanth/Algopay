// Commit 010 - feature-flag helper demo

export type Flags = Record<string, boolean>;

export class FeatureFlags {
  private flags: Flags = {};

  constructor(initial: Flags = {}) {
    this.flags = { ...initial };
  }

  isEnabled(name: string) {
    return !!this.flags[name];
  }

  set(name: string, value: boolean) {
    this.flags[name] = value;
  }

  toggle(name: string) {
    this.set(name, !this.isEnabled(name));
  }
}
