
import React from 'react';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

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
      <main className="flex-1 overflow-auto p-6 animate-slide-in">
        <div className="flex justify-end mb-4 gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
};
