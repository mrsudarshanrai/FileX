import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '@/app/theme/colors';
import { ThemeMode } from '@/app/theme/colorsType';

const STORAGE_KEY = 'FileX:theme-mode';
const DEFAULT_MODE: ThemeMode = 'dark';
const availableThemes = Object.keys(themes) as ThemeMode[];

type AppThemeContextType = {
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  availableThemes: ThemeMode[];
};

const AppThemeContext = createContext<AppThemeContextType>({
  mode: DEFAULT_MODE,
  setTheme: () => {},
  availableThemes,
});

const isThemeMode = (value: string | null): value is ThemeMode =>
  value !== null && Object.prototype.hasOwnProperty.call(themes, value);

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_MODE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isThemeMode(stored)) setMode(stored);
  }, []);

  const setTheme = (next: ThemeMode) => {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <AppThemeContext.Provider value={{ mode, setTheme, availableThemes }}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};

const useAppTheme = () => useContext(AppThemeContext);

export { AppThemeProvider, useAppTheme };
