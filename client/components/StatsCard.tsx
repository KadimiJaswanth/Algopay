import React from 'react';
import { Card, CardContent } from './ui/card';

type Props = {
  title: string;
  value: React.ReactNode;
  description?: string;
};

export default function StatsCard({ title, value, description }: Props) {
  return (
    <Card>
      <div className="text-sm text-muted-foreground">{title}</div>
      <CardContent>
        <div className="text-lg font-semibold">{value}</div>
        {description ? <div className="text-xs text-muted-foreground mt-2">{description}</div> : null}
      </CardContent>
    </Card>
  );
}
