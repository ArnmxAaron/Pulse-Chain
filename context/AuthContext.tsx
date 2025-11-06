import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loginAdmin } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => Promise<{ success: boolean; message?: string; }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false, message: 'invalid' }),
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem('pulsechain_admin_auth');
    if (session) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<{ success: boolean; message?: string; }> => {
    setLoading(true);
    const result = await loginAdmin(password);
    if (result.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pulsechain_admin_auth', 'true');
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
    return result;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pulsechain_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};