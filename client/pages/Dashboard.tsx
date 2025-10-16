import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { formatAlgo, shortenAddress } from "@/utils/formatters";
import { aggregateTotals } from "@/utils/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import QuickAction from "@/components/QuickAction";
import QuickActionLarge from "@/components/QuickActionLarge";
import StatsCard from "@/components/StatsCard";
import DashboardWidgets from "@/components/DashboardWidgets";
import RecentTransactions from "@/components/RecentTransactions";
import TransactionDetail from "@/components/TransactionDetail";
import { useState } from 'react';

const COLORS = ["#10b981", "#06b6d4"]; // emerald, cyan

export default function Dashboard() {
  const { address, balance, txns, refresh, enableMock, sendMockTxn } = useWallet();
  const [selected, setSelected] = useState<null | typeof txns[0]>(null);
  const totals = aggregateTotals(txns);
  const series = txns
    .slice(0, 10)
    .reverse()
    .map((t, i) => ({ name: new Date(t.timestamp).toLocaleDateString(), value: t.type === "in" ? t.amount : -t.amount }));

  return (
    <div className="container max-w-7xl mx-auto py-10">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="items-center">
            <CardTitle>Wallet Overview</CardTitle>
            <div>
              <button onClick={refresh} className="text-sm text-primary">Refresh</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <DashboardWidgets balance={balance} txnsCount={txns.length} />
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie dataKey="value" data={[{ name: "Inflow", value: totals.inflow }, { name: "Outflow", value: totals.outflow }]} innerRadius={45} outerRadius={70} paddingAngle={4}>
                      {[0, 1].map((i) => (
                        <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${(v as number).toFixed(4)} ALGO`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-60 md:col-span-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={series}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip formatter={(v: number) => `${Number(v).toFixed(4)} ALGO`} />
                    <Line type="monotone" dataKey="value" stroke="#10b981" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <RecentTransactions txns={txns} onSelect={(t) => setSelected(t)} max={8} />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <QuickActionLarge title="Enable Mock Wallet" description="Start with a seeded mock address and balance" onClick={() => enableMock()} />
                    <QuickActionLarge title="Refresh Balance" description="Pull latest balance from network" onClick={() => refresh()} />
                    <QuickActionLarge title="Go to Send" description="Create a new payment" onClick={() => (window.location.href = '/send')} />
                  </CardContent>
                </Card>
              </div>
            </div>

            {selected && (
              <TransactionDetail
                txn={selected}
                onClose={() => setSelected(null)}
                onRepeat={async (t) => {
                  await sendMockTxn(t.counterparty, t.amount);
                  setSelected(null);
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <QuickAction title="Enable Mock Wallet" description="Start with a seeded mock address and balance" onClick={() => enableMock()} />
            <QuickAction title="Refresh Balance" description="Pull latest balance from network" onClick={() => refresh()} />
            <QuickAction title="Go to Send" description="Create a new payment" onClick={() => (window.location.href = '/send')} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
