import { expect, test } from 'vitest';
import { decodeFromCanvas } from '@/utils/zxing';

test('decodeFromCanvas returns null for blank canvas', async () => {
  // create a blank canvas
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const result = await decodeFromCanvas(canvas as HTMLCanvasElement);
  expect(result).toBeNull();
});
