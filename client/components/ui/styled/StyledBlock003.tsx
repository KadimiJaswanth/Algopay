import React from "react";

export const StyledBlock003: React.FC = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-white p-5 shadow-lg">
      <h4 className="text-lg font-semibold text-rose-700">Notifications</h4>
      <ul className="mt-3 space-y-2">
        <li className="flex items-start gap-3 rounded bg-white p-3">
          <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">N</div>
          <div>
            <div className="text-sm font-medium text-slate-900">New feature released</div>
            <div className="text-xs text-slate-400">2 hours ago</div>
          </div>
        </li>
        <li className="flex items-start gap-3 rounded bg-white p-3">
          <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">A</div>
          <div>
            <div className="text-sm font-medium text-slate-900">Account alert</div>
            <div className="text-xs text-slate-400">1 day ago</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StyledBlock003;
