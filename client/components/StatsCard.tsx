import React from 'react';

type Props = {
  title: string;
  value: React.ReactNode;
  description?: string;
};

export default function StatsCard({ title, value, description }: Props) {
  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-gray-800">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
      {description ? <div className="text-xs text-muted-foreground mt-2">{description}</div> : null}
    </div>
  );
}
