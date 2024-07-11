// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  isLoading:boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children } :any ) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
      });
  const [isLoading, setIsLoading] = useState(false);


  const login = async (username: string, password: string) => {
    setIsLoading(true)
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
        setIsLoading(false)
        setIsAuthenticated(true);
        toast.success("Login Successfuly")
    } else {
      setIsLoading(false)
      toast.error('Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
