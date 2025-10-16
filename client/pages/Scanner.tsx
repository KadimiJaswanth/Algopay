import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QrScannerPlaceholder from '@/components/QrScannerPlaceholder';
import CameraScanner from '@/components/CameraScanner';
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

  const handleRealScan = (payload: string) => {
    setScanned(payload);
    toast({ title: 'Scan detected', description: payload });
    setTimeout(() => navigate('/send', { state: { scannedAddress: payload } }), 600);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Use your camera to scan a recipient QR.</p>
          <div className="max-w-md mx-auto space-y-4">
            <CameraScanner onScan={handleRealScan} />
            <div className="text-center">Or use the placeholder below to simulate a scan</div>
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
