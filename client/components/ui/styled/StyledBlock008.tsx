import React from "react";

export const StyledBlock008: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-white p-5 shadow-lg">
    <h4 className="text-lg font-semibold text-purple-700">User Growth</h4>
    <div className="mt-3 text-sm text-slate-500">Monthly new users and growth percentage</div>
    <div className="mt-4 flex items-center gap-4">
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">This month</div>
        <div className="mt-1 text-xl font-semibold">420</div>
      </div>
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">Growth</div>
        <div className="mt-1 text-xl font-semibold">+12%</div>
      </div>
    </div>
  </div>
);

export default StyledBlock008;
