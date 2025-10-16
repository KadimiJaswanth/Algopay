import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: (cls = "w-5 h-5") => (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z"/></svg>) },
  { to: "/send", label: "Send", icon: (cls = "w-5 h-5") => (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2l4 8-4-2-4 2 4-8z"/></svg>) },
  { to: "/receive", label: "Receive", icon: (cls = "w-5 h-5") => (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2"/></svg>) },
  { to: "/transactions", label: "Transactions", icon: (cls = "w-5 h-5") => (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"/></svg>) },
  { to: "/settings", label: "Settings", icon: (cls = "w-5 h-5") => (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M12 8v8M8 12h8"/></svg>) },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, closeMobileSidebar } = useUI();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <aside className={`flex flex-col h-full bg-background border-r ${sidebarCollapsed ? 'w-16' : 'w-56'} transition-width`} aria-label="Primary navigation">
      <div className="p-3 flex items-center justify-between">
        {!sidebarCollapsed && <div className="font-bold">AlgoPay</div>}
        <button aria-label="Toggle sidebar" onClick={() => toggleSidebar()} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1" role="navigation">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) => `flex items-center gap-3 rounded p-2 hover:bg-muted ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
            onClick={() => closeMobileSidebar()}
          >
            <div className="flex-shrink-0">{n.icon('w-5 h-5')}</div>
            {!sidebarCollapsed && <span className="text-sm">{n.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Mobile overlay handling */}
      {isMounted && mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => closeMobileSidebar()} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-background p-4">
            <div className="font-bold mb-4">AlgoPay</div>
            <div className="space-y-2">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} onClick={() => closeMobileSidebar()} className={({ isActive }) => `flex items-center gap-3 p-2 rounded ${isActive ? 'bg-primary/10 text-primary' : ''}`}>
                  {n.icon('w-5 h-5')}
                  <span>{n.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUI } from '@/context/UIContext';

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
  const { sidebarCollapsed, mobileSidebarOpen, closeMobileSidebar } = useUI();

  // Animate width changes on desktop by toggling class and using transition
  const desktopClass = sidebarCollapsed ? 'w-20' : 'w-64';

  // Close on Escape when mobile sidebar is open (improves accessibility)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileSidebarOpen) closeMobileSidebar();
    }
    if (mobileSidebarOpen) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return;
  }, [mobileSidebarOpen, closeMobileSidebar]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        role="navigation"
        aria-label="Main navigation"
        className={`${desktopClass} p-4 border-r hidden md:block bg-white dark:bg-gray-900 h-screen sticky top-16 transition-all duration-200`}
      >
        <div className="space-y-4">
          <div className="font-bold text-lg">Navigation</div>
          <nav className="flex flex-col gap-1 text-sm" aria-hidden={mobileSidebarOpen}>
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <span className="text-muted-foreground" aria-hidden>{it.icon()}</span>
                {!sidebarCollapsed && <span>{it.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile slide-over with smooth transition */}
      <div className={`md:hidden fixed inset-0 z-50 pointer-events-${mobileSidebarOpen ? 'auto' : 'none'}`} aria-hidden={!mobileSidebarOpen}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMobileSidebar}
        />
        <div className={`absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-4 transform transition-transform duration-200 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="font-bold text-lg mb-4">Navigation</div>
          <nav className="flex flex-col gap-2">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => closeMobileSidebar()}
                className={({ isActive }) => `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <div className="flex items-center gap-3">{it.icon()} <span>{it.label}</span></div>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
