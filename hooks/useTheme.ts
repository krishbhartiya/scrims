'use client';

import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const stored = localStorage.getItem('gamewave_theme') as Theme;
    if (stored) {
      setTheme(stored);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save theme to localStorage and update document
    if (isLoaded) {
      localStorage.setItem('gamewave_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update CSS variables based on theme
      if (theme === 'light') {
        document.documentElement.style.setProperty('--background', '#F0F0F0');
        document.documentElement.style.setProperty('--foreground', '#0E0E10');
      } else {
        document.documentElement.style.setProperty('--background', '#0E0E10');
        document.documentElement.style.setProperty('--foreground', '#FFFFFF');
      }
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLoaded,
  };
};
