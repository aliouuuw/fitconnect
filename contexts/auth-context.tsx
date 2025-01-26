"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { loginAction, logoutAction } from '@/actions/auth';

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, currentUser }: { children: React.ReactNode, currentUser: User | null }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const user = currentUser;

  useEffect(() => {
    const initAuth = async () => {
      setIsLoaded(true);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await loginAction(email, password);
  };

  const logout = async () => {
    await logoutAction();
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}