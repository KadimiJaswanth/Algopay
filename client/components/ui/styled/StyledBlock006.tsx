import React from "react";

export const StyledBlock006: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-5 shadow-lg">
    <h4 className="text-lg font-semibold text-indigo-700">Activity</h4>
    <p className="mt-2 text-sm text-slate-500">Recent activity stream with compact cards</p>
    <ul className="mt-3 space-y-2">
      <li className="flex items-center gap-3 rounded bg-white p-3 shadow-sm">
        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">A</div>
        <div>
          <div className="text-sm font-medium text-slate-900">User signed in</div>
          <div className="text-xs text-slate-400">5 minutes ago</div>
        </div>
      </li>
    </ul>
  </div>
);

export default StyledBlock006;
