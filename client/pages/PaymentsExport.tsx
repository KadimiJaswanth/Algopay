import React from "react";
import usePayments from "@/hooks/usePayments";
import { paymentsToCsv, downloadCsv } from "@/utils/paymentsUtils";
import PaymentFilter from "@/components/ui/PaymentFilter";

export default function PaymentsExport() {
  const { data: payments = [], isLoading } = usePayments();
  const [filtered, setFiltered] = React.useState(payments);

  React.useEffect(() => {
    setFiltered(payments || []);
  }, [payments]);

  function onFilterChange(filters: { query?: string; status?: string }) {
    const q = (filters.query || "").toLowerCase();
    const s = filters.status;
    const result = (payments || []).filter((p) => {
      const matchesQuery = !q || p.id.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
      const matchesStatus = !s || p.status === s;
      return matchesQuery && matchesStatus;
    });
    setFiltered(result);
  }

  function handleExport() {
    const csv = paymentsToCsv(filtered || []);
    downloadCsv(`algopay-payments-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Export payments</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <PaymentFilter onChange={onFilterChange} />
        </div>
        <div className="md:col-span-2">
          <div className="mb-4">
            <button onClick={handleExport} disabled={isLoading} className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
              Export {filtered?.length ?? 0} payments
            </button>
          </div>
          <div className="rounded border bg-white p-4">
            <p className="text-sm text-slate-500">Preview (first 10)</p>
            <ul className="mt-3 space-y-2">
              {(filtered || []).slice(0, 10).map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded px-3 py-2 hover:bg-slate-50">
                  <div>
                    <div className="text-sm font-medium">{p.description || 'Payment'}</div>
                    <div className="text-xs text-slate-400">{p.id} • {p.currency} {(p.amount/100).toFixed(2)}</div>
                  </div>
                  <div className="text-xs text-slate-500">{p.status}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
