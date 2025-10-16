import React, { useState } from 'react';
import { formatAlgo } from '@/utils/formatters';
import { useWallet } from '@/context/WalletContext';

export default function BalancePopover() {
  const { balance, refresh } = useWallet();
  const [open, setOpen] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(balance ?? '0'));
      // lightweight feedback
      alert('Balance copied to clipboard');
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((s) => !s)}
        className="text-sm font-medium px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {formatAlgo(balance, { maximumFractionDigits: 4 })}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-40">
          <div className="p-2 text-sm">
            <button onClick={copy} className="w-full text-left py-2 px-2 hover:bg-gray-50 dark:hover:bg-gray-700">Copy balance</button>
            <button
              onClick={() => {
                refresh();
                setOpen(false);
              }}
              className="w-full text-left py-2 px-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Refresh balance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
