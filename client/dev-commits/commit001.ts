// Commit 001 - utility functions
// This file intentionally contains a small set of helper functions
// to act as a demonstrative commit. Each file added in this flow
// should be >=30 lines to match user request for commit size.

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function sumArray(nums: number[]): number {
  return nums.reduce((s, n) => s + n, 0);
}

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return sumArray(nums) / nums.length;
}

export const PI = 3.141592653589793;

// Simple demonstration of typed map
export function mapToStrings(items: Array<number | string>) : string[] {
  return items.map((v) => String(v));
}
