import type { Payment } from "@/../shared/payments";

export function paymentsToCsv(payments: Payment[]): string {
  const headers = ["id", "amount", "currency", "status", "createdAt", "description"];
  const rows = payments.map((p) => [
    p.id,
    (p.amount / 100).toFixed(2),
    p.currency,
    p.status,
    new Date(p.createdAt).toISOString(),
    (p.description || "").replace(/\n/g, " ").replace(/\r/g, " "),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.map(escapeCell).join(","))].join("\n");
  return csv;
}

function escapeCell(v: unknown) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
