
import React from 'react';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut, Search, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background animate-fade-in">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border h-16 flex items-center justify-between px-6 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight">NOTEIT</h1>
          </div>
          
          <div className="relative w-full max-w-md mx-4">
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
        <main className="flex-1 overflow-auto p-6 animate-slide-in">
          {children}
        </main>
      </div>
    </div>
  );
};
