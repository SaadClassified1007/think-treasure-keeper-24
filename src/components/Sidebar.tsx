
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon, Home, FileText, BookOpen, Upload, Brain, FolderKanban, Tag } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        }`
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-border bg-sidebar p-4 flex flex-col animate-fade-in">
      <div className="mb-8 px-4 py-2">
        <div className="flex items-center gap-2">
          <Brain className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">NOTEIT</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Your AI-powered knowledge system</p>
      </div>
      
      <nav className="space-y-1 flex-1">
        <NavItem to="/dashboard" icon={Home} label="Dashboard" />
        <NavItem to="/notes" icon={FileText} label="Notes" />
        <NavItem to="/flashcards" icon={BookOpen} label="Flashcards" />
        <NavItem to="/categories" icon={Tag} label="Categories" />
        <NavItem to="/collections" icon={FolderKanban} label="Collections" />
        <NavItem to="/upload" icon={Upload} label="Upload" />
      </nav>
      
      <div className="mt-auto flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Theme
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
};
