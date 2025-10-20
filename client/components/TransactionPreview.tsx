import React from 'react';
import { Card } from '@/components/ui/card';
import { formatAlgo } from '@/utils/formatters';

type TransactionPreviewProps = {
  to: string;
  amount: number;
  note?: string;
  fee?: number; // in microalgos
};

export default function TransactionPreview({ to, amount, note, fee }: TransactionPreviewProps) {
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Review transaction</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">To</div>
          <div className="break-all">{to}</div>

          <div className="text-muted-foreground">Amount</div>
          <div>{formatAlgo(amount)}</div>

          <div className="text-muted-foreground">Estimated fee</div>
          <div>{fee ? `${(fee / 1_000_000).toFixed(6)} ALGO` : 'Auto'}</div>

          {note && (
            <>
              <div className="text-muted-foreground">Note</div>
              <div className="break-all">{note}</div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
