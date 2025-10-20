import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { decodeFromCanvas } from '@/utils/zxing';

type CameraScannerProps = {
  onResult?: (text: string) => void;
  onScan?: (text: string) => void; // alternate name used by tests
  onError?: (err: Error) => void;
};

export default function CameraScanner({ onResult, onScan, onError }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scanning, setScanning] = useState(false);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    // BrowserQRCodeReader constructor in some @zxing versions accepts 0 or 1 arg.
    // We don't need to instantiate with the second options parameter here since
    // we decode from canvas frames using our helper `decodeFromCanvas`.
    try {
      // Attempt safe construction with no args where required
      // keep the instance in case future APIs use it
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      readerRef.current = new BrowserQRCodeReader();
    } catch (e) {
      // ignore constructor mismatch; decodeFromCanvas handles decoding
      readerRef.current = null;
    }
    let mounted = true;

    async function start() {
      try {
        setScanning(true);
        const constraints = { video: { facingMode: 'environment' } } as MediaStreamConstraints;
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!mounted) return;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const tick = async () => {
          if (!mounted) return;
          try {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (video && canvas) {
              const w = video.videoWidth || 320;
              const h = video.videoHeight || 240;
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext('2d');
              if (ctx) ctx.drawImage(video, 0, 0, w, h);
              // try decode from canvas
              const text = await decodeFromCanvas(canvas);
              if (text) {
                // support both prop names
                onResult?.(text);
                onScan?.(text);
                return; // stop after first result
              }
            }
          } catch (err: any) {
            // don't spam errors; pass upstream
            onError?.(err);
          }
          setTimeout(tick, 250);
        };

        tick();
      } catch (err: any) {
        setScanning(false);
        onError?.(err);
      }
    }

    start();

    return () => {
      mounted = false;
      setScanning(false);
      try {
        // stop any active tracks
        const vid = videoRef.current;
        const stream = vid?.srcObject as MediaStream | null;
        stream?.getTracks().forEach((t) => t.stop());
      } catch (e) {
        // ignore
      }
    };
  }, [onResult, onError]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <video ref={videoRef} className="w-full max-h-[60vh] bg-black" playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} aria-hidden />
      <div className="text-sm text-muted-foreground">{scanning ? 'Scanning...' : 'Camera stopped'}</div>
    </div>
  );
}
