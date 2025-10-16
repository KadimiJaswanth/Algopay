import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWallet } from "@/context/WalletContext";
import { shortenAddress } from "@/utils/formatters";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/send", label: "Send" },
  { to: "/receive", label: "Receive" },
  { to: "/transactions", label: "Transactions" },
  { to: "/analytics", label: "Analytics" },
  { to: "/settings", label: "Settings" },
];

export function NavBar() {
  const { address, provider, connectPera, connectMyAlgo, enableMock, disconnect, isConnecting } = useWallet();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="font-extrabold text-xl tracking-tight">
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">AlgoPay</span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {address ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-muted-foreground">{provider?.toUpperCase()}</span>
              <Button variant="secondary" className="font-mono">{shortenAddress(address, 6)}</Button>
              <Button variant="ghost" onClick={disconnect}>Disconnect</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={connectPera} disabled={isConnecting}>Connect Pera</Button>
              <Button variant="secondary" onClick={connectMyAlgo} disabled={isConnecting}>MyAlgo</Button>
              <Button variant="ghost" onClick={enableMock}>Mock</Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
