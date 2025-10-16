import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

type Props = {
  title: string;
  value: React.ReactNode;
  data: { value: number }[];
};

export default function MiniChartCard({ title, value, data }: Props) {
  return (
    <div className="p-3 rounded-lg border bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#ecfdf5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
