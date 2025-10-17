import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWallet } from "@/context/WalletContext";
import { shortenAddress } from "@/utils/formatters";
import { formatAlgo } from "@/utils/formatters";
import { useUI } from "@/context/UIContext";
import BalancePopover from "@/components/BalancePopover";
import { useCallback } from "react";

// Small test helper exported for e2e/unit tests to pick stable test ids
export const getNavBarTestIds = () => ({
  connectPera: 'nav-connect-pera',
  connectMyAlgo: 'nav-connect-myalgo',
  connectMock: 'nav-connect-mock',
  disconnect: 'nav-disconnect',
  balance: 'nav-balance',
});

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
  const { address, provider, connectPera, connectMyAlgo, enableMock, disconnect, isConnecting, balance } = useWallet();
  const { toggleSidebar, openMobileSidebar } = useUI();

  const ids = getNavBarTestIds();

  const handleKeyPress = useCallback((e: React.KeyboardEvent, fn: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openMobileSidebar()} aria-label="Open menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
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
          {/* Desktop collapse toggle */}
          <button className="hidden md:inline p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => toggleSidebar()} aria-label="Toggle sidebar">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 18h16"/></svg>
          </button>
          {address ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs text-muted-foreground" aria-hidden>{provider?.toUpperCase()}</span>
                <div data-testid={ids.balance} aria-label={`Balance ${balance != null ? formatAlgo(balance) : 'unknown'}`}>
                  <BalancePopover />
                </div>
              </div>
              <Button variant="secondary" className="font-mono" aria-label={`Account ${address}`}>{shortenAddress(address, 6)}</Button>
              <Button
                variant="ghost"
                onClick={() => disconnect()}
                onKeyDown={(e) => handleKeyPress(e, () => disconnect())}
                aria-label="Disconnect wallet"
                data-testid={ids.disconnect}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button data-testid={ids.connectPera} onClick={connectPera} disabled={isConnecting} onKeyDown={(e) => handleKeyPress(e, connectPera)} aria-label="Connect with Pera">Connect Pera</Button>
              <Button data-testid={ids.connectMyAlgo} variant="secondary" onClick={connectMyAlgo} disabled={isConnecting} onKeyDown={(e) => handleKeyPress(e, connectMyAlgo)} aria-label="Connect with MyAlgo">MyAlgo</Button>
              <Button data-testid={ids.connectMock} variant="ghost" onClick={enableMock} onKeyDown={(e) => handleKeyPress(e, enableMock)} aria-label="Enable mock wallet">Mock</Button>
            </div>
          )}
          <NavLink to="/scanner" className="hidden sm:inline p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open scanner">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="3" y="15" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /></svg>
          </NavLink>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
