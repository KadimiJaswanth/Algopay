import React from 'react';
import { Txn } from '@/utils/mockData';
import { formatAlgo } from '@/utils/formatters';

type Props = {
  txns: Txn[];
  onSelect: (txn: Txn) => void;
  max?: number;
};

export default function RecentTransactions({ txns, onSelect, max = 8 }: Props) {
  const list = txns.slice(0, max);

  return (
    <div className="space-y-2">
      {list.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          className="w-full flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.type === 'in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {t.type === 'in' ? '+' : '-'}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">{formatAlgo(t.amount)}</div>
              <div className="text-xs text-muted-foreground">{new Date(t.timestamp).toLocaleString()}</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{t.counterparty}</div>
        </button>
      ))}
      {txns.length > max && (
        <div className="text-center text-sm mt-2 text-muted-foreground">Showing {max} of {txns.length} transactions</div>
      )}
    </div>
  );
}
