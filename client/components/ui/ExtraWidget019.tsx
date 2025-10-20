import React from 'react';
import clsx from 'clsx';

/* ExtraWidget019
   Auto-generated UI widget for incremental commits.
   Purpose: Demonstrate a small reusable component with modern React hooks and Tailwind usage.
*/

type Props = {
  title?: string;
  subtitle?: string;
};

export default function ExtraWidget019({ title = 'ExtraWidget019 Title', subtitle = 'A small auto-generated widget' }: Props) {
  // local state for demonstration — shows interactivity
  const [count, setCount] = React.useState(0);

  return (
    <div className={clsx('rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-800')}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1 text-white text-sm hover:bg-indigo-500 focus:outline-none"
          >
            Click
          </button>
          <span className="text-sm">{count}</span>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        This small component demonstrates state, styling, and accessibility patterns used across the app.
      </div>
    </div>
  );
}
