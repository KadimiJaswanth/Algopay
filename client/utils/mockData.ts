export type Txn = {
  id: string;
  type: "in" | "out";
  amount: number; // in ALGO
  counterparty: string;
  timestamp: number;
};

const addrs = [
  "EJ3ZQZ...Q2K9",
  "T9S8W1...P5LM",
  "K1A2B3...C4D5",
  "ALGOX1...9Z8Y",
  "WALLET...MOCK",
];

export function generateMockTxns(count = 18): Txn[] {
  const now = Date.now();
  const out: Txn[] = [];
  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.5 ? "in" : "out";
    const amount = Number((Math.random() * 5 + 0.01).toFixed(4));
    out.push({
      id: `TX-${Math.random().toString(36).slice(2, 10)}`,
      type,
      amount,
      counterparty: addrs[Math.floor(Math.random() * addrs.length)],
      timestamp: now - i * 36e5,
    });
  }
  return out;
}

export function aggregateTotals(txns: Txn[]) {
  return txns.reduce(
    (acc, t) => {
      if (t.type === "in") acc.inflow += t.amount;
      else acc.outflow += t.amount;
      return acc;
    },
    { inflow: 0, outflow: 0 },
  );
}
