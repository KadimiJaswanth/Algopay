import React from "react";

export const StyledBlock007: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-white p-5 shadow-md">
    <h4 className="text-lg font-semibold text-amber-700">Quick Stats</h4>
    <div className="mt-3 flex gap-3">
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">Active</div>
        <div className="mt-1 text-xl font-semibold">78</div>
      </div>
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">Errors</div>
        <div className="mt-1 text-xl font-semibold text-rose-600">2</div>
      </div>
    </div>
  </div>
);

export default StyledBlock007;
