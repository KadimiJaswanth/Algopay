import React from "react";

export const StyledBlock005: React.FC = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-tr from-emerald-50 to-white p-5 shadow-lg">
      <h4 className="text-lg font-semibold text-emerald-700">Revenue</h4>
      <div className="mt-3 flex items-center gap-4">
        <div className="rounded bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500">Today</div>
          <div className="mt-1 text-xl font-semibold">$1,234</div>
        </div>
        <div className="rounded bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500">This month</div>
          <div className="mt-1 text-xl font-semibold">$24,512</div>
        </div>
      </div>
    </div>
  );
};

export default StyledBlock005;
