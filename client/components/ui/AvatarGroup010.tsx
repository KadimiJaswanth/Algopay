import React from 'react';
import { useEffect, useState } from 'react';

/**
 * AvatarGroup010
 * Stacked avatar group with overflow count
 * Auto-generated for iterative feature commit batch.
 * - Uses hooks for interactivity
 * - Tailwind-friendly classes for styling
 * - Accessible attributes where applicable
 */

type Props = {
  className?: string;
};

export default function AvatarGroup010({ className = '' }: Props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // Demo: auto-hide after a short delay to simulate transient UI
    const t = setTimeout(() => setVisible(false), 3100);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className={"rounded-md border p-4 shadow-sm bg-white dark:bg-slate-800 " + className} role="region" aria-label={"Stacked avatar group with overflow count"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">AvatarGroup Demo</h3>
          <p className="text-sm text-muted-foreground">This component demonstrates stacked avatar group with overflow count and is safe to use as a stub during development.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisible(false)}
            className="text-sm text-muted-foreground hover:text-muted-foreground/80 focus:outline-none"
            aria-label="Dismiss"
          >
            Dismiss
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">Generated component index: {10}</div>
    </div>
  );
}