import React from 'react';
import { NavLink } from 'react-router-dom';

const items: { to: string; label: string; icon: () => JSX.Element }[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18"></path></svg>
    ),
  },
  { to: '/send', label: 'Send', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>) },
  { to: '/receive', label: 'Receive', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 10l5-5 5 5"/></svg>) },
  { to: '/transactions', label: 'Transactions', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>) },
  { to: '/analytics', label: 'Analytics', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M11 3v18M20 9v6M2 15v3"/></svg>) },
  { to: '/settings', label: 'Settings', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.27 18.7l.06-.06A1.65 1.65 0 0 0 2.66 16.8 1.65 1.65 0 0 0 2 16V13a2 2 0 1 1 4 0v.09c.07.53.48.98 1 1.51.52.53 1 .35 1.82.33h.12c.82.02 1.3.2 1.82-.33.52-.53.93-.98 1-1.51V13a2 2 0 1 1 4 0v3c0 .35-.07.69-.2 1.01z"/></svg>) },
];

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 border-r hidden md:block bg-white dark:bg-gray-900 h-screen sticky top-16">
      <div className="space-y-4">
        <div className="font-bold text-lg">Navigation</div>
        <nav className="flex flex-col gap-1 text-sm">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
              <span className="text-muted-foreground">{it.icon()}</span>
              <span>{it.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
