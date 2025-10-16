import React from 'react';

type Props = {
  title: string;
  description?: string;
  onClick?: () => void;
};

export default function QuickAction({ title, description, onClick }: Props) {
  return (
    <button onClick={onClick} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
      <div className="font-medium">{title}</div>
      {description ? <div className="text-xs text-muted-foreground mt-1">{description}</div> : null}
    </button>
  );
}
