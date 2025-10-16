import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent } from './ui/card';

type Props = {
  title: string;
  value: React.ReactNode;
  data: { value: number }[];
};

export default function MiniChartCard({ title, value, data }: Props) {
  return (
    <Card>
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
      <CardContent />
    </Card>
  );
}
