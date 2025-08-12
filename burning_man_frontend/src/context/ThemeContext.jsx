import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useTheme
 * Hook to access theme and toggle function from ThemeContext.
 */
export const ThemeContext = createContext({
  theme: 'light',
  // PUBLIC_INTERFACE
  toggle: () => {},
});

// PUBLIC_INTERFACE
export const useTheme = () => {
  /** Access the current theme context */
  return useContext(ThemeContext);
};

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides current theme and toggling functionality to the component tree. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
