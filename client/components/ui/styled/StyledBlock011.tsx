import React from "react";

export const StyledBlock011: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-white p-5 shadow-lg">
    <h4 className="text-lg font-semibold text-cyan-700">Customer Feedback</h4>
    <p className="mt-2 text-sm text-slate-500">Recent reviews and sentiment</p>
    <div className="mt-3 space-y-2">
      <div className="rounded bg-white p-3 shadow-sm">
        <div className="text-sm font-medium">Great product!</div>
        <div className="text-xs text-slate-400">by user123 • 2d</div>
      </div>
    </div>
  </div>
);

export default StyledBlock011;
