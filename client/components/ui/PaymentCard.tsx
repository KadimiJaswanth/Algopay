import React from "react";

export interface PaymentProps {
  id: string;
  title: string;
  amount: number; // in micro-units or cents depending on app conventions
  currency?: string;
  date?: string; // ISO date string
  status?: "pending" | "completed" | "failed" | "refunded";
  onRetry?: (id: string) => void;
  onView?: (id: string) => void;
}

function formatCurrency(amount: number, currency = "USD") {
  try {
    // assume amount is in minor-units (e.g., cents)
    const major = amount / 100;
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(major);
  } catch (e) {
    return `${currency} ${amount / 100}`;
  }
}

export const PaymentCard: React.FC<PaymentProps> = ({
  id,
  title,
  amount,
  currency = "USD",
  date,
  status = "pending",
  onRetry,
  onView,
}) => {
  const statusColor =
    status === "completed" ? "text-green-600" : status === "failed" ? "text-red-600" : "text-yellow-600";

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{date ? new Date(date).toLocaleString() : "—"}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-slate-900">{formatCurrency(amount, currency)}</div>
          <div className={`mt-1 text-sm ${statusColor}`}>{status}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onView && onView(id)}
          className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 hover:bg-slate-200"
        >
          View
        </button>
        {status === "failed" && (
          <button
            type="button"
            onClick={() => onRetry && onRetry(id)}
            className="rounded-md bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 hover:bg-rose-100"
          >
            Retry
          </button>
        )}
        <div className="ml-auto text-xs text-slate-400">ID: {id}</div>
      </div>
    </div>
  );
};

export default PaymentCard;
