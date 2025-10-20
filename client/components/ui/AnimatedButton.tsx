import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

// AnimatedButton: small reusable button with subtle scale and shadow animation.
// Includes a built-in loading toggle to demonstrate state-driven animation.
export default function AnimatedButton({ children, onClick, className = '', disabled }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  // Click handler wraps the provided onClick and toggles a quick loading state
  // to show how actions can provide immediate feedback to users.
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    try {
      setIsLoading(true);
      // call consumer handler if provided
      await Promise.resolve(onClick?.(e));
    } finally {
      // keep loading for at least 300ms for a smooth UX
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <button
      aria-busy={isLoading}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {/* scale on active for tactile feel; shadow while idle */}
      <span className={`${isLoading ? 'animate-pulse' : 'shadow-sm'}`}>{children}</span>
      {/* simple loading dot */}
      {isLoading && (
        <svg className="h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
