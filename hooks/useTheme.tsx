import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ColorTheme = 'default' | 'emerald' | 'crimson' | 'royal' | 'sunset';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  resetTheme: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');

  const applyTheme = useCallback((themeToApply: Theme, colorThemeToApply: ColorTheme) => {
    let currentTheme: 'light' | 'dark';
    
    // Determine the light/dark theme
    if (themeToApply === 'system') {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      currentTheme = themeToApply;
    }

    // Apply classes and attributes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(currentTheme);
    document.documentElement.setAttribute('data-theme', colorThemeToApply);
    
    setResolvedTheme(currentTheme);
  }, []);

  // Effect to load and apply theme on initial mount
  useEffect(() => {
    try {
        const savedTheme = localStorage.getItem('vistaran-helpdesk-theme') as Theme | null;
        const savedColorTheme = localStorage.getItem('vistaran-helpdesk-color-theme') as ColorTheme | null;
        const initialTheme = savedTheme || 'system';
        const initialColorTheme = savedColorTheme || 'default';
        
        setThemeState(initialTheme);
        setColorThemeState(initialColorTheme);
        applyTheme(initialTheme, initialColorTheme);
    } catch (error) {
        console.error("Failed to load theme from localStorage", error);
        applyTheme('system', 'default'); // Fallback to system default
    }
  }, [applyTheme]);

  // Effect to listen for OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system', colorTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, colorTheme, applyTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
        localStorage.setItem('vistaran-helpdesk-theme', newTheme);
    } catch (error) {
        console.error("Failed to save theme to localStorage", error);
    }
    applyTheme(newTheme, colorTheme);
  };
  
  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme);
     try {
        localStorage.setItem('vistaran-helpdesk-color-theme', newColorTheme);
    } catch (error) {
        console.error("Failed to save color theme to localStorage", error);
    }
    applyTheme(theme, newColorTheme);
  }

  const resetTheme = useCallback(() => {
    setTheme('system');
    setColorTheme('default');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, resetTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};