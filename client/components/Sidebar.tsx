import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUI } from '@/context/UIContext';

const ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18"/></svg>) },
  { to: '/send', label: 'Send', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>) },
  { to: '/receive', label: 'Receive', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 10l5-5 5 5"/></svg>) },
  { to: '/scanner', label: 'Scan', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="3" y="15" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /></svg>) },
  { to: '/transactions', label: 'Transactions', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>) },
  { to: '/analytics', label: 'Analytics', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M11 3v18M20 9v6M2 15v3"/></svg>) },
  { to: '/settings', label: 'Settings', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>) },
];

export default function Sidebar() {
  const { sidebarCollapsed, mobileSidebarOpen, closeMobileSidebar } = useUI();
  const location = useLocation();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileSidebarOpen) closeMobileSidebar();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileSidebarOpen, closeMobileSidebar]);

  useEffect(() => {
    if (mobileSidebarOpen) closeMobileSidebar();
  }, [location.pathname]);

  return (
    <aside role="navigation" aria-label="Primary" className={`${sidebarCollapsed ? 'w-20' : 'w-64'} p-4 border-r hidden md:block bg-background h-screen sticky top-16`}>
      <div className="mb-4 font-semibold">AlgoPay</div>
      <div ref={listRef} role="list" aria-label="Main navigation" className="flex flex-col gap-1">
        {ITEMS.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => closeMobileSidebar()}
          >
            <span aria-hidden className="flex-shrink-0">{it.icon()}</span>
            {!sidebarCollapsed && <span>{it.label}</span>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
