// Commit 008 - small crypto demo (not secure, demo only)

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function fromHex(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('invalid hex');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return out;
}

export function randomBytes(len = 16): Uint8Array {
  const arr = new Uint8Array(len);
  if (typeof crypto !== 'undefined' && (crypto as any).getRandomValues) {
    (crypto as any).getRandomValues(arr);
  } else {
    // fallback - not secure
    for (let i = 0; i < len; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return arr;
}
