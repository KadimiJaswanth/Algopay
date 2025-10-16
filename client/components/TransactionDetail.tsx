import React from 'react';
import { Txn } from '@/utils/mockData';
import { formatAlgo } from '@/utils/formatters';

type Props = {
  txn: Txn | null;
  onClose: () => void;
  onRepeat?: (txn: Txn) => void;
};

export default function TransactionDetail({ txn, onClose, onRepeat }: Props) {
  if (!txn) return null;

  return (
    <div className="fixed right-4 top-20 w-96 bg-white dark:bg-gray-900 border rounded shadow-lg p-4 z-40">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transaction {txn.id}</h3>
        <button onClick={onClose} className="text-sm text-muted-foreground">Close</button>
      </div>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div><strong>Type:</strong> {txn.type}</div>
        <div><strong>Amount:</strong> {formatAlgo(txn.amount)}</div>
        <div><strong>Counterparty:</strong> {txn.counterparty}</div>
        <div><strong>Date:</strong> {new Date(txn.timestamp).toLocaleString()}</div>
      </div>
      <div className="mt-4 flex gap-2">
        {onRepeat && <button onClick={() => onRepeat(txn)} className="btn btn-primary">Repeat</button>}
        <button onClick={onClose} className="btn btn-ghost">Close</button>
      </div>
    </div>
  );
}
