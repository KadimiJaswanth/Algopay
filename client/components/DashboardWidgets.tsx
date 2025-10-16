import React from 'react';
import MiniChartCard from './MiniChartCard';

type Props = {
  balance: number | null;
  txnsCount: number;
};

function makeData(seed = 5) {
  return Array.from({ length: 12 }).map((_, i) => ({ value: Math.max(0, Math.sin((i + seed) / 3) * 5 + Math.random() * 2 + 1) }));
}

export default function DashboardWidgets({ balance, txnsCount }: Props) {
  const balances = makeData(balance ? Math.floor(balance % 10) : 3);
  const txns = makeData(txnsCount ? txnsCount % 6 : 2);
  const revenue = makeData(4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MiniChartCard title="Balance" value={`${balance ?? 0} ALGO`} data={balances} />
      <MiniChartCard title="Transactions" value={`${txnsCount}`} data={txns} />
      <MiniChartCard title="Activity" value="Live" data={revenue} />
    </div>
  );
}
