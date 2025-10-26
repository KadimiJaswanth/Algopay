import React, { useState } from "react";
import usePayments from "@/hooks/usePayments";
import PaymentDetails from "@/components/ui/PaymentDetails";
import PaymentCard from "@/components/ui/PaymentCard";

export default function PaymentsList() {
  const { data, isLoading, error, refetch } = usePayments();
  const [selected, setSelected] = useState<string | null>(null);

  if (isLoading) return <div className="p-6">Loading payments…</div>;
  if (error) return <div className="p-6 text-rose-600">Error: {error.message}</div>;

  const payments = data ?? [];

  const selectedPayment = payments.find((p) => p.id === selected) || null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="rounded bg-slate-100 px-3 py-1 text-sm">Refresh</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {payments.map((p) => (
          <div key={p.id} onClick={() => setSelected(p.id)}>
            <PaymentCard id={p.id} title={p.description || "Payment"} amount={p.amount} currency={p.currency} date={p.createdAt} status={p.status} onView={() => setSelected(p.id)} />
          </div>
        ))}
      </div>

      {selectedPayment && (
        <div className="mt-6">
          <PaymentDetails payment={selectedPayment} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}
