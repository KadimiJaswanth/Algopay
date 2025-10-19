import React from 'react';
import { useNavigate } from 'react-router-dom';
import CameraScanner from '@/components/CameraScanner';
import { Card } from '@/components/ui/card';

export default function ScannerPage() {
  const navigate = useNavigate();

  const handleResult = (text: string) => {
    // navigate to send page with scanned address as prefill
    navigate('/send', { state: { scanned: text } });
  };

  const handleError = (err: Error) => {
    // fallback: show an alert and keep scanning
    // lightweight UX for now
    // eslint-disable-next-line no-console
    console.error('Scanner error', err);
  };

  return (
    <div className="p-6">
      <Card>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Scan QR</h2>
          <p className="text-sm text-muted-foreground mb-4">Point your camera at a QR code containing an Algorand address or payment payload.</p>
          <CameraScanner onResult={handleResult} onError={handleError} />
        </div>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QrScannerPlaceholder from '@/components/QrScannerPlaceholder';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Scanner: React.FC = () => {
  const [scanned, setScanned] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSimulate = (payload: string) => {
    setScanned(payload);
    toast({ title: 'Simulated scan', description: `Scanned: ${payload}` });
    // Optionally navigate to Send with prefilled address
    setTimeout(() => navigate('/send', { state: { scannedAddress: payload } }), 700);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Use your camera to scan a recipient QR. (Placeholder for now.)</p>
          <div className="max-w-md mx-auto">
            <QrScannerPlaceholder onSimulateScan={handleSimulate} />
            {scanned && (
              <div className="mt-4 text-sm font-mono break-all">Scanned payload: {scanned}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scanner;
