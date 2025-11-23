import React from "react";

export const StyledBlock004: React.FC<{ title?: string }> = ({ title = "Quick Actions" }) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100">
      <h4 className="text-md font-semibold text-slate-900">{title}</h4>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">Create</button>
        <button className="rounded-md bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200">Import</button>
        <button className="rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700">Export</button>
        <button className="rounded-md bg-amber-50 px-3 py-2 text-amber-700 hover:bg-amber-100">Settings</button>
      </div>
    </div>
  );
};

export default StyledBlock004;
