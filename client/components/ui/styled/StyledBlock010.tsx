import React from "react";

export const StyledBlock010: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-5 shadow-lg">
    <h4 className="text-lg font-semibold text-slate-900">System Health</h4>
    <div className="mt-3 grid grid-cols-2 gap-3">
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">CPU</div>
        <div className="mt-1 text-lg font-medium">34%</div>
      </div>
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">Memory</div>
        <div className="mt-1 text-lg font-medium">65%</div>
      </div>
    </div>
  </div>
);

export default StyledBlock010;
