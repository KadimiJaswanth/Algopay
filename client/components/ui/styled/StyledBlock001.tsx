import React from "react";

export const StyledBlock001: React.FC<{ title?: string; subtitle?: string }> = ({ title = "Feature One", subtitle = "A modern styled card" }) => {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-sky-50 to-white p-6 shadow-xl ring-1 ring-slate-100">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700">
          ✨
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-white p-3 shadow-sm">
          <p className="text-xs text-slate-500">Key metric</p>
          <div className="mt-1 text-xl font-medium text-slate-900">42%</div>
        </div>
        <div className="rounded-md bg-white p-3 shadow-sm">
          <p className="text-xs text-slate-500">Change</p>
          <div className="mt-1 text-xl font-medium text-slate-900">+7%</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button className="rounded bg-sky-600 px-3 py-1 text-sm font-medium text-white hover:bg-sky-700">Action</button>
        <button className="rounded bg-transparent px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50">More</button>
      </div>
    </section>
  );
};

export default StyledBlock001;
