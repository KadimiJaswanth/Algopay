import React from "react";

export const StyledBlock009: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-white p-5 shadow-lg">
    <h4 className="text-lg font-semibold text-pink-700">Marketing</h4>
    <p className="mt-2 text-sm text-slate-500">Top performing channels and campaigns</p>
    <div className="mt-4 flex gap-3">
      <div className="rounded bg-white p-3 shadow-sm">Email: <strong>23%</strong></div>
      <div className="rounded bg-white p-3 shadow-sm">Social: <strong>17%</strong></div>
    </div>
  </div>
);

export default StyledBlock009;
