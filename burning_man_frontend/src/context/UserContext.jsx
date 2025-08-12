import React, { createContext, useContext, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useUser
 * Hook to access current user and role switching.
 */
export const UserContext = createContext({
  user: null,
  // PUBLIC_INTERFACE
  setRole: (_role) => {},
});

// PUBLIC_INTERFACE
export const useUser = () => {
  /** Access the current user context */
  return useContext(UserContext);
};

// PUBLIC_INTERFACE
export function UserProvider({ children }) {
  /**
   * A lightweight user provider.
   * This is a placeholder for future auth integration.
   */
  const [user, setUser] = useState({
    id: 'placeholder-user',
    name: 'Sparkle Pony',
    role: 'burner', // 'burner' | 'admin'
  });

  const value = useMemo(() => ({
    user,
    setRole: (role) => setUser((u) => ({ ...u, role })),
  }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
