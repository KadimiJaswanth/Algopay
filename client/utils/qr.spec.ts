import { describe, it, expect } from 'vitest';
import { svgStringToPngDataUrl } from './qr';

describe('qr utils', () => {
  it('converts a simple SVG string to a PNG data url', async () => {
    // small 16x16 SVG
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='16' height='16' fill='#fff'/><circle cx='8' cy='8' r='6' fill='#000'/></svg>`;
    const dataUrl = await svgStringToPngDataUrl(svg, 64, 64);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png')).toBe(true);
  }, 5000);
});
