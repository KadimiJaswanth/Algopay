import { BrowserQRCodeReader, NotFoundException } from '@zxing/library';

const reader = new BrowserQRCodeReader();

export async function decodeFromCanvas(canvas: HTMLCanvasElement): Promise<string | null> {
  try {
    // try the common canvas API
    if (typeof (reader as any).decodeFromCanvasElement === 'function') {
      const res = await (reader as any).decodeFromCanvasElement(canvas);
      return res?.getText?.() ?? null;
    }

    // fallback: convert canvas to data URL and try decodeFromImage
    const dataUrl = canvas.toDataURL('image/png');
    if (typeof (reader as any).decodeFromImage === 'function') {
      const res = await (reader as any).decodeFromImage(undefined, dataUrl as any);
      return res?.getText?.() ?? null;
    }

    // last resort: attempt decodeFromCanvas (older API)
    if (typeof (reader as any).decodeFromCanvas === 'function') {
      const res = await (reader as any).decodeFromCanvas(canvas as any);
      return res?.getText?.() ?? null;
    }

    return null;
  } catch (err: any) {
    if (err && err.name === 'NotFoundException') return null;
    throw err;
  }
}

export default { decodeFromCanvas };
