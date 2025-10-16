import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { Button } from './ui/button';
import { copyToClipboard } from '@/utils/clipboardCopy';
import { useToast } from '@/hooks/use-toast';

interface ReceiveQRProps {
  address: string;
}

export const ReceiveQR: React.FC<ReceiveQRProps> = ({ address }) => {
  const { toast } = useToast();
  const copyBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleCopy = async () => {
    const ok = await copyToClipboard(address);
    if (ok) {
      toast({ title: 'Address copied', description: 'Wallet address copied to clipboard.' });
      copyBtnRef.current?.focus();
    } else {
      toast({ title: 'Copy failed', description: 'Could not copy address to clipboard.' });
    }
  };

  const handleShare = async () => {
    const uri = `algo:${address}`;
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: 'Algorand address', text: uri });
        toast({ title: 'Shared', description: 'Share dialog opened.' });
        return;
      } catch (e) {
        // fallthrough to copy
      }
    }
    const ok = await copyToClipboard(uri);
    if (ok) {
      toast({ title: 'Share copied', description: 'URI copied to clipboard.' });
    } else {
      toast({ title: 'Share failed', description: 'Could not share or copy URI.' });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center" role="region" aria-label="Receive address QR">
      <div className="bg-white p-4 rounded-md shadow-sm inline-block transform transition-transform duration-150 hover:scale-[1.02] focus-within:scale-[1.02]" tabIndex={-1}>
        <QRCode value={address} size={160} />
      </div>
      <div className="mt-4 space-y-2">
        <div className="font-mono text-sm break-all" aria-live="polite">{address}</div>
        <div className="flex gap-2 justify-center">
          <Button ref={copyBtnRef as any} onClick={handleCopy} size="sm" aria-label="Copy address">Copy address</Button>
          <Button onClick={handleShare} variant="secondary" size="sm" aria-label="Share address">Share</Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveQR;
