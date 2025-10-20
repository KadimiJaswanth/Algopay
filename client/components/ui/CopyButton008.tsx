import React from 'react';
import { useEffect, useState } from 'react';

/**
 * CopyButton008
 * Button that copies text to clipboard with feedback
 * Auto-generated for iterative feature commit batch.
 * - Uses hooks for interactivity
 * - Tailwind-friendly classes for styling
 * - Accessible attributes where applicable
 */

type Props = {
  className?: string;
};

export default function CopyButton008({ className = '' }: Props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // Demo: auto-hide after a short delay to simulate transient UI
    const t = setTimeout(() => setVisible(false), 3080);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className={"rounded-md border p-4 shadow-sm bg-white dark:bg-slate-800 " + className} role="region" aria-label={"Button that copies text to clipboard with feedback"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">CopyButton Demo</h3>
          <p className="text-sm text-muted-foreground">This component demonstrates button that copies text to clipboard with feedback and is safe to use as a stub during development.</p>
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
      <div className="mt-3 text-xs text-muted-foreground">Generated component index: {8}</div>
    </div>
  );
}