import React, { useState, useCallback } from 'react';
import ReceiveQR from './ReceiveQR';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

type Props = {
  address: string;
};

export default function ReceiveQRWrapper({ address }: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const doCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({ title: 'Address copied', description: 'The receive address was copied to your clipboard.' });
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      toast({ title: 'Copy failed', description: 'Could not copy to clipboard. Please copy manually.' });
    }
  }, [address, toast]);

  return (
    <div className="flex flex-col items-start gap-3">
      <ReceiveQR address={address} />
      <div className="flex gap-2">
        <Button onClick={doCopy} variant={copied ? 'secondary' : 'default'}>
          {copied ? 'Copied' : 'Copy address'}
        </Button>
      </div>
    </div>
  );
}
