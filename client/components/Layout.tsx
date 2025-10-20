import React from 'react';
import Sidebar from '@/components/Sidebar';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen md:flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="md:w-60 hidden md:block">
        <Sidebar />
      </aside>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
