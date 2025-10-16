import React from 'react';
import { formatAlgo } from '@/utils/formatters';

type Props = {
  amount: number;
};

// Simple mock fee calculation: base fee + percentage (for demo purposes)
export default function FeeEstimate({ amount }: Props) {
  const base = 0.001; // base fee in ALGO
  const percent = 0.005; // 0.5%
  const fee = Number((base + amount * percent).toFixed(6));
  const total = Number((amount + fee).toFixed(6));
  return (
    <div className="text-xs text-muted-foreground mt-2">
      <div>Estimated fee: {formatAlgo(fee)} ALGO</div>
      <div>Total: {formatAlgo(total)} ALGO</div>
    </div>
  );
}
