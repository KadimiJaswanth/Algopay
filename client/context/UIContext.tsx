import React, { createContext, useContext, useState } from 'react';

type UIState = {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
};

const UICTX = createContext<UIState | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((s) => !s);
  const openMobileSidebar = () => setMobileSidebarOpen(true);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <UICTX.Provider value={{ sidebarCollapsed, mobileSidebarOpen, toggleSidebar, openMobileSidebar, closeMobileSidebar }}>
      {children}
    </UICTX.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UICTX);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
