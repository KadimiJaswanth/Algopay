import React from "react";

export const StyledBlock012: React.FC = () => (
  <div className="rounded-2xl bg-gradient-to-br from-lime-50 to-white p-5 shadow-md">
    <h4 className="text-lg font-semibold text-lime-700">Inventory</h4>
    <div className="mt-3 grid grid-cols-2 gap-3">
      <div className="rounded bg-white p-3 shadow-sm">In stock: <strong>124</strong></div>
      <div className="rounded bg-white p-3 shadow-sm">Low stock: <strong>8</strong></div>
    </div>
  </div>
);

export default StyledBlock012;
