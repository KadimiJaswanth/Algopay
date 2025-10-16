import React from 'react';
import { Button } from './ui/button';

interface QrScannerPlaceholderProps {
  onSimulateScan?: (value: string) => void;
}

export const QrScannerPlaceholder: React.FC<QrScannerPlaceholderProps> = ({ onSimulateScan }) => {
  const sampleAddress = 'ALGO-MOCK-SCAN-ADDRESS-XYZ';

  return (
    <div className="p-4 border rounded-md text-center">
      <div className="mb-4 text-sm text-muted-foreground">Scanner placeholder (webcam integration can be added later)</div>
      <div className="mb-4">
        <div className="inline-block bg-black/5 p-8 rounded-md">
          <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect width="160" height="160" fill="#f8fafc" />
            <g stroke="#94a3b8" strokeWidth="2" fill="none">
              <rect x="6" y="6" width="40" height="40" rx="4" />
              <rect x="114" y="6" width="40" height="40" rx="4" />
              <rect x="6" y="114" width="40" height="40" rx="4" />
              <rect x="114" y="114" width="40" height="40" rx="4" />
            </g>
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm">Can't access camera in this environment?</div>
        <div className="text-xs text-muted-foreground">Use the simulate button to inject a scanned payload.</div>
        <div className="mt-3">
          <Button onClick={() => onSimulateScan?.(sampleAddress)}>Simulate scan</Button>
        </div>
      </div>
    </div>
  );
};

export default QrScannerPlaceholder;
