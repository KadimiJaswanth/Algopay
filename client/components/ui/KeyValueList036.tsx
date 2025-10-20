import React from 'react';
import { useEffect, useState } from 'react';

/**
 * KeyValueList036
 * List of key/value pairs for details
 * Auto-generated for iterative feature commit batch.
 * - Uses hooks for interactivity
 * - Tailwind-friendly classes for styling
 * - Accessible attributes where applicable
 */

type Props = {
  className?: string;
};

export default function KeyValueList036({ className = '' }: Props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // Demo: auto-hide after a short delay to simulate transient UI
    const t = setTimeout(() => setVisible(false), 3360);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className={"rounded-md border p-4 shadow-sm bg-white dark:bg-slate-800 " + className} role="region" aria-label={"List of key/value pairs for details"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">KeyValueList Demo</h3>
          <p className="text-sm text-muted-foreground">This component demonstrates list of key/value pairs for details and is safe to use as a stub during development.</p>
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
      <div className="mt-3 text-xs text-muted-foreground">Generated component index: {36}</div>
    </div>
  );
}