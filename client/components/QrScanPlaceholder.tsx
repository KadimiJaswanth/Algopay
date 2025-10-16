import React from 'react';

type Props = {
  onScan?: (value: string) => void;
};

export default function QrScanPlaceholder({ onScan }: Props) {
  return (
    <div className="p-4 border rounded text-center">
      <div className="text-sm text-muted-foreground">QR Scanner (placeholder)</div>
      <div className="mt-2 text-xs">This is a placeholder for a native/web QR scanner. You can paste an address instead.</div>
      <div className="mt-3">
        <button className="px-3 py-1 rounded bg-gray-100" onClick={() => onScan?.('PASTED-FROM-QR-EXAMPLE')}>Simulate scan</button>
      </div>
    </div>
  );
}
