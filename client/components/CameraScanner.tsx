import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { decodeFromCanvas } from '@/utils/zxing';

interface CameraScannerProps {
  onScan: (value: string) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<any>(null);
  const pollRef = useRef<number | null>(null);
  const { toast } = useToast();

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [permission, setPermission] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const enumDevices = async () => {
      try {
        const list = await navigator.mediaDevices.enumerateDevices();
        if (!mounted) return;
        const cams = list.filter((d) => d.kind === 'videoinput');
        setDevices(cams);
        if (cams.length && !selectedDeviceId) setSelectedDeviceId(cams[0].deviceId);
      } catch (e) {
        console.warn('enumerateDevices failed', e);
      }
    };
    enumDevices();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  const stopStream = () => {
    setScanning(false);
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (detectorRef.current) {
      detectorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startScanning = async () => {
    setError(null);
    if (!selectedDeviceId) {
      setError('No camera device selected');
      return;
    }

    try {
      setPermission('prompt');
      const s = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: selectedDeviceId } } });
      streamRef.current = s;
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
      setPermission('granted');
      setScanning(true);

      // Use BarcodeDetector when available for reliable decoding
      if ((window as any).BarcodeDetector) {
        try {
          const Detector = (window as any).BarcodeDetector;
          detectorRef.current = new Detector({ formats: ['qr_code'] });
          pollRef.current = window.setInterval(async () => {
            try {
              if (!videoRef.current) return;
              const results = await detectorRef.current.detect(videoRef.current);
              if (results && results.length) {
                const r = results[0];
                const raw = r.rawValue || r.displayValue || (r.raw && r.raw); 
                if (raw) {
                  onScan(String(raw));
                }
              }
            } catch (err) {
              // detection may fail intermittently
            }
          }, 500);
          return;
        } catch (err) {
          console.warn('BarcodeDetector failed', err);
        }
      }

      // Fallback: if BarcodeDetector not available, capture frames to a canvas and use ZXing to decode
      try {
        const canvas = document.createElement('canvas');
        pollRef.current = window.setInterval(async () => {
          try {
            if (!videoRef.current) return;
            const video = videoRef.current;
            canvas.width = video.videoWidth || 320;
            canvas.height = video.videoHeight || 240;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const decoded = await decodeFromCanvas(canvas);
            if (decoded) {
              onScan(String(decoded));
            }
          } catch (err) {
            // ignore frame decode errors
          }
        }, 600);
        toast({ title: 'Camera started', description: 'Camera started. Using fallback JS decoder.' });
      } catch (err) {
        toast({ title: 'Camera started', description: 'Camera started. If decoding is not available in your browser, use the simulate button.' });
      }
    } catch (err: any) {
      console.error(err);
      setPermission('denied');
      setError(err?.message ?? 'Camera permission denied or not available');
    }
  };

  const handleDeviceChange = (id: string) => {
    setSelectedDeviceId(id);
    // if currently scanning, restart with new device
    if (scanning) {
      stopStream();
      setTimeout(() => startScanning(), 200);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm">Camera</label>
        <select
          aria-label="Select camera"
          value={selectedDeviceId ?? ''}
          onChange={(e) => handleDeviceChange(e.target.value)}
          className="rounded border px-2 py-1"
        >
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${d.deviceId.slice(-4)}`}</option>
          ))}
        </select>
        <Button onClick={() => (scanning ? stopStream() : startScanning())}>{scanning ? 'Stop' : 'Start'}</Button>
      </div>

      {error && <div role="alert" className="text-sm text-destructive">{error}</div>}

      <div className="w-full rounded-md overflow-hidden bg-black/5">
        <video ref={videoRef} className="w-full h-auto" playsInline muted />
      </div>

      <div className="text-xs text-muted-foreground">
        Permission: {permission} · Scanning: {String(scanning)}
      </div>
    </div>
  );
};

export default CameraScanner;
