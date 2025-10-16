import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/send', label: 'Send' },
  { to: '/receive', label: 'Receive' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-60 p-4 border-r hidden md:block">
      <div className="space-y-3">
        <div className="font-bold text-lg">Menu</div>
        <nav className="flex flex-col gap-2 text-sm">
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {it.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
