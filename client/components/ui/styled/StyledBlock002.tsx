import React from "react";

export const StyledBlock002: React.FC<{ title?: string; desc?: string }> = ({ title = "Insights", desc = "At-a-glance insights" }) => {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
      <header className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
        <div className="text-sm text-slate-400">Updated 1h ago</div>
      </header>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Visitors</div>
          <div className="mt-1 text-lg font-semibold">1.2k</div>
        </div>
        <div className="rounded bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Sales</div>
          <div className="mt-1 text-lg font-semibold">320</div>
        </div>
        <div className="rounded bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Conversion</div>
          <div className="mt-1 text-lg font-semibold">2.8%</div>
        </div>
      </div>
    </article>
  );
};

export default StyledBlock002;
