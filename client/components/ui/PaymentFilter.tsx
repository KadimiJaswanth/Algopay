import React, { useState } from "react";

export interface PaymentFilterProps {
  onChange?: (filters: { query?: string; status?: string }) => void;
}

export const PaymentFilter: React.FC<PaymentFilterProps> = ({ onChange }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("");

  function apply() {
    onChange?.({ query: query.trim() || undefined, status: status || undefined });
  }

  function reset() {
    setQuery("");
    setStatus("");
    onChange?.({});
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border bg-white p-3">
      <div>
        <label className="block text-xs font-medium text-slate-600">Search</label>
        <input
          className="mt-1 w-full rounded border px-2 py-1"
          placeholder="Search by id, description, or title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600">Status</label>
        <select className="mt-1 w-full rounded border px-2 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={apply} className="rounded bg-sky-600 px-3 py-1 text-white hover:bg-sky-700">Apply</button>
        <button type="button" onClick={reset} className="rounded bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200">Reset</button>
      </div>
    </div>
  );
};

export default PaymentFilter;
