import React from "react";
import type { Payment } from "@/../shared/payments";

export const PaymentDetails: React.FC<{ payment: Payment; onClose?: () => void }> = ({ payment, onClose }) => {
  return (
    <div className="rounded border bg-white p-4 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Payment details</h3>
          <p className="mt-1 text-sm text-slate-500">ID: {payment.id}</p>
        </div>
        <div className="text-right text-sm text-slate-500">{new Date(payment.createdAt).toLocaleString()}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <div className="text-xs text-slate-500">Amount</div>
          <div className="text-base font-medium">{(payment.amount / 100).toFixed(2)} {payment.currency}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Status</div>
          <div className={`text-sm ${payment.status === 'completed' ? 'text-green-600' : payment.status === 'failed' ? 'text-rose-600' : 'text-yellow-600'}`}>{payment.status}</div>
        </div>
      </div>

      {payment.description && (
        <div className="mt-4">
          <div className="text-xs text-slate-500">Description</div>
          <div className="mt-1 text-sm text-slate-700">{payment.description}</div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button onClick={onClose} className="rounded bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200">Close</button>
      </div>
    </div>
  );
};

export default PaymentDetails;
