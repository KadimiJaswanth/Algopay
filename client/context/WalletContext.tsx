import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "sonner";
import { getAccountInfo } from "@/utils/algosdk";
import { generateMockTxns, type Txn } from "@/utils/mockData";
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";

export type WalletProvider = "pera" | "myalgo" | "mock";

export interface WalletState {
  address: string | null;
  provider: WalletProvider | null;
  balance: number | null; // in ALGO
  isConnecting: boolean;
  txns: Txn[];
}

interface WalletContextValue extends WalletState {
  connectPera: () => Promise<void>;
  connectMyAlgo: () => Promise<void>;
  disconnect: () => void;
  enableMock: () => void;
  refresh: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

const STORAGE_KEY = "algopay.wallet";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>({
    address: null,
    provider: null,
    balance: null,
    isConnecting: false,
    txns: generateMockTxns(),
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as WalletState;
      setState((s) => ({ ...s, ...parsed }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ address: state.address, provider: state.provider, balance: state.balance, isConnecting: false, txns: state.txns }),
    );
  }, [state.address, state.provider, state.balance, state.txns]);

  const disconnect = useCallback(() => {
    setState({ address: null, provider: null, balance: null, isConnecting: false, txns: generateMockTxns() });
    toast.success("Disconnected");
  }, []);

  const refresh = useCallback(async () => {
    if (!state.address) return;
    try {
      const info = await getAccountInfo(state.address);
      setState((s) => ({ ...s, balance: info.balance }));
    } catch (e) {
      console.error(e);
      toast.error("Failed to refresh balance");
    }
  }, [state.address]);

  const connectPera = useCallback(async () => {
    try {
      setState((s) => ({ ...s, isConnecting: true }));
      const pera = new PeraWalletConnect({ shouldShowSignTxnToast: false });
      const accounts = await pera.connect();
      if (accounts.length > 0) {
        const address = accounts[0];
        const info = await getAccountInfo(address);
        setState({ address, provider: "pera", balance: info.balance, isConnecting: false, txns: generateMockTxns() });
        toast.success("Pera connected");
        pera.connector?.on("disconnect", disconnect);
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to connect Pera");
      setState((s) => ({ ...s, isConnecting: false }));
    }
  }, [disconnect]);

  const connectMyAlgo = useCallback(async () => {
    try {
      setState((s) => ({ ...s, isConnecting: true }));
      const myalgo = new MyAlgoConnect();
      const accounts = await myalgo.connect();
      if (accounts.length > 0) {
        const address = accounts[0].address;
        const info = await getAccountInfo(address);
        setState({ address, provider: "myalgo", balance: info.balance, isConnecting: false, txns: generateMockTxns() });
        toast.success("MyAlgo connected");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to connect MyAlgo");
      setState((s) => ({ ...s, isConnecting: false }));
    }
  }, []);

  const enableMock = useCallback(() => {
    setState({ address: "MOCK-ADDRESS-ALGO-PAY", provider: "mock", balance: Number((Math.random() * 50 + 10).toFixed(4)), isConnecting: false, txns: generateMockTxns() });
    toast("Mock wallet enabled");
  }, []);

  const value = useMemo<WalletContextValue>(() => ({ ...state, connectPera, connectMyAlgo, disconnect, enableMock, refresh }), [state, connectPera, connectMyAlgo, disconnect, enableMock, refresh]);

  return <WalletContext.Provider value={value}>{children}<Toaster /></WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
