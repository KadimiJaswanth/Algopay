import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { formatAlgo, shortenAddress } from "@/utils/formatters";
import { aggregateTotals } from "@/utils/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import QuickAction from "@/components/QuickAction";
import StatsCard from "@/components/StatsCard";

const COLORS = ["#10b981", "#06b6d4"]; // emerald, cyan

export default function Dashboard() {
  const { address, balance, txns, refresh, enableMock } = useWallet();
  const totals = aggregateTotals(txns);
  const series = txns
    .slice(0, 10)
    .reverse()
    .map((t, i) => ({ name: new Date(t.timestamp).toLocaleDateString(), value: t.type === "in" ? t.amount : -t.amount }));

  return (
    <div className="container max-w-7xl mx-auto py-10">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Wallet Overview</CardTitle>
            <button onClick={refresh} className="text-sm text-primary">Refresh</button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <StatsCard title="Address" value={<span className="font-mono">{shortenAddress(address ?? 'Not connected', 8)}</span>} description={address ? 'Connected address' : 'Not connected'} />
              <StatsCard title="Balance" value={<span className="text-2xl font-semibold">{formatAlgo(balance)}</span>} description="Current ALGO balance" />
              <StatsCard title="Transactions" value={<span className="text-2xl font-semibold">{txns.length}</span>} description={`Last ${Math.min(txns.length, 18)} transactions`} />
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
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
              <div className="h-60">
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
