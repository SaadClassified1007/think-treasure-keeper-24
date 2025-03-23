
import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background animate-fade-in">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 animate-slide-in">
        {children}
      </main>
    </div>
  );
};
