
import { useState, useEffect } from 'react';
import { Theme, setTheme, getSystemTheme } from '@/lib/utils';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    return storedTheme || getSystemTheme();
  });

  useEffect(() => {
    const handleChange = () => {
      setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    // Initialize theme
    setTheme(theme);

    // Listen for changes in classList
    const observer = new MutationObserver(handleChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return { theme, toggleTheme };
}
