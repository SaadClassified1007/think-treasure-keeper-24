
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogOut, Menu, Search, User, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage on logout
    navigate('/signin');
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background animate-fade-in">
      {/* Mobile sidebar */}
      {isMobile && (
        <div 
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div 
            className={`absolute left-0 top-0 bottom-0 w-64 transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-2"
              >
                <Menu size={20} />
              </Button>
            )}
            <h1 className="text-xl font-bold tracking-tight">NOTEIT</h1>
          </div>
          
          <div className="relative w-full max-w-md mx-4 hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search notes, flashcards, and categories..." 
              className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 border border-border text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              title="Profile"
            >
              <User size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        
        {/* Mobile search bar */}
        {isMobile && (
          <div className="p-4 border-b border-border">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 border border-border text-sm"
              />
            </div>
          </div>
        )}
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 animate-slide-in">
          {children}
        </main>
      </div>
    </div>
  );
};
