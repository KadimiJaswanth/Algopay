export function formatAlgo(amount: number | null | undefined, opts?: { maximumFractionDigits?: number }) {
  if (amount == null || Number.isNaN(amount)) return "0 ALGO";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: opts?.maximumFractionDigits ?? 6,
  });
  return `${formatter.format(amount)} ALGO`;
}

export function shortenAddress(addr?: string | null, size = 4) {
  if (!addr) return "";
  if (addr.length <= size * 2) return addr;
  return `${addr.slice(0, size)}…${addr.slice(-size)}`;
}
