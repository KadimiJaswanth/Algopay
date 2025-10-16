import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { formatAlgo, shortenAddress } from "@/utils/formatters";
import { aggregateTotals } from "@/utils/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ["#10b981", "#06b6d4"]; // emerald, cyan

export default function Dashboard() {
  const { address, balance, txns, refresh } = useWallet();
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
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground">Address</div>
                <div className="font-mono text-lg">{shortenAddress(address ?? "Not connected", 8)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Balance</div>
                <div className="text-2xl font-semibold">{formatAlgo(balance)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Txns (last {txns.length})</div>
                <div className="text-2xl font-semibold">{txns.length}</div>
              </div>
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
            <CardTitle>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>• Connect your wallet (Pera/MyAlgo) to fetch your real balance.</p>
            <p>• Use mock mode to explore if you don’t have TestNet funds.</p>
            <p>• Head to Send/Receive to try payments and QR codes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
