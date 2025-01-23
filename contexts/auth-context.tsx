"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;  // Add this line
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: 'coach' | 'client') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);  // Add this line
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      toast({
        title: "Login Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
      return false;
    }

    setUser(foundUser);
    localStorage.setItem('user', JSON.stringify(foundUser));
    document.cookie = `user=${JSON.stringify(foundUser)}; path=/`;
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  };

  const register = async (email: string, password: string, name: string, role: 'coach' | 'client') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
      role,
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout, register }}> 
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