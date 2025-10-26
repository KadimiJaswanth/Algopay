import React, { useState } from "react";

type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export interface RecurringPaymentData {
  id?: string;
  amount: number; // cents
  currency?: string;
  startDate: string; // iso
  frequency: Frequency;
  occurrences?: number | null; // null for indefinite
  description?: string;
}

const empty: RecurringPaymentData = {
  amount: 0,
  currency: "USD",
  startDate: new Date().toISOString().slice(0, 10),
  frequency: "monthly",
  occurrences: 12,
  description: "",
};

export const RecurringPaymentForm: React.FC<{
  initial?: Partial<RecurringPaymentData>;
  onSave?: (data: RecurringPaymentData) => Promise<void> | void;
}> = ({ initial = {}, onSave }) => {
  const [data, setData] = useState<RecurringPaymentData>({ ...empty, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof RecurringPaymentData>(k: K, v: RecurringPaymentData[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function validate(d: RecurringPaymentData) {
    if (!d.amount || d.amount <= 0) return "Amount must be greater than zero";
    if (!d.startDate) return "Start date is required";
    if (!d.frequency) return "Frequency is required";
    return null;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const v = validate(data);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (onSave) await onSave(data);
      else {
        // fallback: post to /api/payments/recurring
        await fetch("/api/payments/recurring", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
    } catch (err: any) {
      setError(err?.message || "Failed to save recurring payment");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-md border p-4 bg-white">
      <h4 className="text-lg font-semibold">Create Recurring Payment</h4>
      {error && <div className="rounded bg-rose-50 p-2 text-rose-700">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (cents)</label>
        <input
          type="number"
          value={data.amount}
          onChange={(e) => setField("amount", Number(e.target.value))}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Start date</label>
        <input
          type="date"
          value={data.startDate}
          onChange={(e) => setField("startDate", e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Frequency</label>
        <select
          value={data.frequency}
          onChange={(e) => setField("frequency", e.target.value as Frequency)}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Occurrences</label>
        <input
          type="number"
          min={0}
          value={data.occurrences ?? ""}
          onChange={(e) => setField("occurrences", e.target.value === "" ? null : Number(e.target.value))}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        <p className="mt-1 text-xs text-slate-400">Leave empty for indefinite</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => setField("description", e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setData({ ...empty })}
          className="rounded bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default RecurringPaymentForm;
