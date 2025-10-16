import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "sonner";
import { getAccountInfo } from "@/utils/algosdk";
import { generateMockTxns, type Txn } from "@/utils/mockData";
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";

export type WalletProvider = "pera" | "myalgo" | "mock";
export type Network = "mainnet" | "testnet";
export type TxnStatus = "pending" | "confirmed" | "failed";

export interface WalletState {
  address: string | null;
  provider: WalletProvider | null;
  balance: number | null; // in ALGO
  isConnecting: boolean;
  txns: Txn[];
  network?: Network;
}

interface WalletContextValue extends WalletState {
  connectPera: () => Promise<void>;
  connectMyAlgo: () => Promise<void>;
  disconnect: () => void;
  enableMock: () => void;
  refresh: () => Promise<void>;
  sendMockTxn: (to: string, amount: number) => Promise<Txn>;
  topUpMock: (amount: number) => Promise<Txn>;
  switchNetwork: (network: Network) => void;
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
    network: "testnet",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as WalletState;
      setState((s) => ({ ...s, ...parsed }));
    }
  }, []);

  useEffect(() => {
    // Persist minimal wallet info plus recent txns and selected network
    const payload = {
      address: state.address,
      provider: state.provider,
      balance: state.balance,
      network: state.network,
      // persist only last 25 txns to avoid huge localStorage entries
      txns: state.txns.slice(0, 25),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [state.address, state.provider, state.balance, state.txns, state.network]);

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
    setState({
      address: "MOCK-ADDRESS-ALGO-PAY",
      provider: "mock",
      balance: Number((Math.random() * 50 + 10).toFixed(4)),
      isConnecting: false,
      txns: generateMockTxns(),
      network: "testnet",
    });
    toast("Mock wallet enabled");
  }, []);

  const sendMockTxn = useCallback(async (to: string, amount: number) => {
    // Basic validation
    if (!to || amount <= 0) {
      toast.error("Invalid recipient or amount");
      throw new Error("Invalid recipient or amount");
    }
    // Simulate network latency and optimistic pending state
    const pending: Txn = {
      id: `TX-${Math.random().toString(36).slice(2, 10)}`,
      type: 'out',
      amount,
      counterparty: to,
      timestamp: Date.now(),
    };
    setState((s) => ({ ...s, txns: [pending, ...s.txns] }));
    toast("Transaction submitted", { duration: 2000 });
    // Simulate confirmation after delay
    await new Promise((r) => setTimeout(r, 900));
    setState((s) => ({ ...s, txns: s.txns.map((t) => (t.id === pending.id ? pending : t)), balance: s.balance != null ? Number((s.balance - amount).toFixed(6)) : s.balance }));
    toast.success("Mock transaction confirmed");
    return pending;
  }, []);

  const topUpMock = useCallback(async (amount: number) => {
    if (amount <= 0) {
      toast.error("Invalid amount");
      throw new Error("Invalid amount");
    }
    const incoming: Txn = {
      id: `TX-${Math.random().toString(36).slice(2, 10)}`,
      type: 'in',
      amount,
      counterparty: 'FAUCET',
      timestamp: Date.now(),
    };
    setState((s) => ({ ...s, txns: [incoming, ...s.txns], balance: s.balance != null ? Number((s.balance + amount).toFixed(6)) : amount }));
    toast.success(`Received ${amount} ALGO (mock)`);
    return incoming;
  }, []);

  const switchNetwork = useCallback((network: Network) => {
    setState((s) => ({ ...s, network }));
    toast(`Switched to ${network}`);
  }, []);

  const value = useMemo<WalletContextValue>(() => ({ ...state, connectPera, connectMyAlgo, disconnect, enableMock, refresh, sendMockTxn, topUpMock, switchNetwork }), [state, connectPera, connectMyAlgo, disconnect, enableMock, refresh, sendMockTxn, topUpMock, switchNetwork]);

  return <WalletContext.Provider value={value}>{children}<Toaster /></WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
