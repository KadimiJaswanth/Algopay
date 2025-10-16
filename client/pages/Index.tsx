import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { formatAlgo, shortenAddress } from "@/utils/formatters";
import QRCode from "react-qr-code";
import { NavLink } from "react-router-dom";

export default function Index() {
  const { address, balance, provider, connectPera, connectMyAlgo, enableMock } = useWallet();

  useEffect(() => {
    // no-op: keep for future side effects
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-emerald-50 to-cyan-50 dark:from-neutral-900 dark:to-neutral-950">
      <section className="container max-w-7xl mx-auto pt-16 pb-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-background/60 backdrop-blur">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Live on Algorand TestNet
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            A decentralized payment & wallet dashboard for Algorand
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-prose">
            Connect Pera or MyAlgo. View real-time ALGO balance, send/receive instantly, generate & scan payment QR codes, and explore your transaction analytics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={connectPera}>Connect Pera</Button>
            <Button variant="secondary" onClick={connectMyAlgo}>Connect MyAlgo</Button>
            <Button variant="ghost" onClick={enableMock}>Try Mock Mode</Button>
          </div>
          {address && (
            <div className="mt-6 rounded-xl border bg-background p-4 shadow-sm">
              <div className="text-xs text-muted-foreground">Connected</div>
              <div className="mt-1 font-mono text-lg">{shortenAddress(address, 8)} <span className="ml-2 text-xs text-muted-foreground">{provider?.toUpperCase()}</span></div>
              <div className="mt-2 text-2xl font-semibold">{formatAlgo(balance)}</div>
              <div className="mt-3">
                <NavLink to="/dashboard" className="text-primary hover:underline">Open Dashboard →</NavLink>
              </div>
            </div>
          )}
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li>• View balance & address</li>
            <li>• Send ALGO with AlgoSDK</li>
            <li>• Generate & scan QR codes</li>
            <li>• Transactions & analytics</li>
            <li>• Dark/Light themes</li>
            <li>• Frontend-only with optional mock</li>
          </ul>
        </div>
        <div>
          <div className="relative rounded-2xl border bg-background p-6 shadow-xl">
            <div className="absolute -top-10 -right-10 size-40 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 blur-3xl rounded-full" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border p-4">
                <div className="text-xs text-muted-foreground">Receive</div>
                <div className="mt-2 flex items-center justify-center bg-muted rounded-lg p-4">
                  <QRCode value={address ?? "https://algopay.app/your-address"} size={120} />
                </div>
                <div className="mt-3 text-sm text-muted-foreground">Show this QR to receive ALGO</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-xs text-muted-foreground">Quick Actions</div>
                <div className="mt-3 grid gap-2">
                  <NavLink to="/send" className="rounded-md px-3 py-2 bg-primary text-primary-foreground text-sm text-center">Send Payment</NavLink>
                  <NavLink to="/receive" className="rounded-md px-3 py-2 bg-secondary text-secondary-foreground text-sm text-center">Receive</NavLink>
                  <NavLink to="/transactions" className="rounded-md px-3 py-2 border text-sm text-center">Transactions</NavLink>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Fees</div>
                <div className="text-lg font-semibold">~0.001 ALGO</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Network</div>
                <div className="text-lg font-semibold">TestNet</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Speed</div>
                <div className="text-lg font-semibold">~4s</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
