export async function svgToDataUrl(svg: string): Promise<string> {
  // Create a blob and return object URL for download
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  return URL.createObjectURL(blob);
}

export function svgStringToPngDataUrl(svgString: string, width = 512, height = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svg);
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw the SVG image
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        const png = canvas.toDataURL('image/png');
        resolve(png);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}
