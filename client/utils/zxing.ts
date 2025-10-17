import { BrowserQRCodeReader, NotFoundException } from '@zxing/library';

const reader = new BrowserQRCodeReader();

export async function decodeFromCanvas(canvas: HTMLCanvasElement): Promise<string | null> {
  try {
    // use ZXing to decode from canvas data
    const result = await reader.decodeFromCanvasElement(canvas);
    return result?.getText() ?? null;
  } catch (err: any) {
    if (err instanceof NotFoundException) return null;
    throw err;
  }
}

export default { decodeFromCanvas };
