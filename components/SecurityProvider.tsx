"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityContextType {
  sessionTimeout: number;
  lastActivity: Date;
  isSessionExpired: boolean;
  extendSession: () => void;
  logSecurityEvent: (event: string, details?: any) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const { logout } = useAuth();
  const [lastActivity, setLastActivity] = useState(new Date());
  const [sessionTimeout] = useState(30 * 60 * 1000); // 30 minutes
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const extendSession = () => {
    setLastActivity(new Date());
    setIsSessionExpired(false);
  };

  const logSecurityEvent = (event: string, details?: any) => {
    console.log('Security Event:', {
      event,
      details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ip: 'client-side' // Would be populated by backend
    });
  };

  useEffect(() => {
    const checkSession = () => {
      const now = new Date();
      const timeSinceLastActivity = now.getTime() - lastActivity.getTime();
      
      if (timeSinceLastActivity > sessionTimeout) {
        setIsSessionExpired(true);
        logSecurityEvent('SESSION_EXPIRED');
        logout();
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivity, sessionTimeout, logout]);

  useEffect(() => {
    const handleActivity = () => {
      if (!isSessionExpired) {
        extendSession();
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [isSessionExpired]);

  const value = {
    sessionTimeout,
    lastActivity,
    isSessionExpired,
    extendSession,
    logSecurityEvent
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}