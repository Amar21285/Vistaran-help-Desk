import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User, Role, LoginStatus, UserStatus } from '../types';
import { USERS } from '../constants';
import { logUserAction } from '../utils/auditLogger';

interface AuthContextType {
  user: User | null;
  realUser: User | null;
  login: (email: string, password?: string) => LoginStatus;
  logout: () => void;
  updateUser: (updatedUserData: Partial<User> & { id: string }) => void;
  startImpersonation: (userId: string) => void;
  stopImpersonation: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [realUser, setRealUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const savedUserId = localStorage.getItem('vistaran-helpdesk-userId');
      const impersonatedUserId = localStorage.getItem('vistaran-helpdesk-impersonatedUserId');

      if (savedUserId) {
        const loggedInUser = USERS.find(u => u.id === savedUserId);
        if (loggedInUser) {
          setRealUser(loggedInUser);
          if (impersonatedUserId && loggedInUser.role === Role.ADMIN) {
            const targetUser = USERS.find(u => u.id === impersonatedUserId);
            setUser(targetUser || loggedInUser);
          } else {
            setUser(loggedInUser);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
    }
  }, []);

  const login = useCallback((email: string, password?: string): LoginStatus => {
    const foundUser = USERS.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return LoginStatus.INVALID_CREDENTIALS;
    }
    
    if (foundUser.status !== UserStatus.ACTIVE) {
      return LoginStatus.USER_INACTIVE;
    }
    
    setUser(foundUser);
    setRealUser(foundUser);
    localStorage.setItem('vistaran-helpdesk-userId', foundUser.id);
    localStorage.removeItem('vistaran-helpdesk-impersonatedUserId');
    logUserAction(foundUser, 'Logged in.');
    return LoginStatus.SUCCESS;
  }, []);

  const logout = useCallback(() => {
    if (user) {
      logUserAction(user, 'Logged out.');
    }
    setUser(null);
    setRealUser(null);
    localStorage.removeItem('vistaran-helpdesk-userId');
    localStorage.removeItem('vistaran-helpdesk-impersonatedUserId');
  }, [user]);

  const updateUser = useCallback((updatedUserData: Partial<User> & { id: string }) => {
    const isForRealUser = realUser?.id === updatedUserData.id;
    const isForCurrentUser = user?.id === updatedUserData.id;

    if (isForCurrentUser) {
      setUser(currentUser => {
        if (!currentUser) return null;
        return { ...currentUser, ...updatedUserData };
      });
    }

    if (isForRealUser) {
      setRealUser(currentRealUser => {
        if (!currentRealUser) return null;
        return { ...currentRealUser, ...updatedUserData };
      });
    }
  }, [user, realUser]);

  const startImpersonation = useCallback((userId: string) => {
    if (realUser?.role !== Role.ADMIN) {
      console.error("Only admins can impersonate users.");
      return;
    }
    const targetUser = USERS.find(u => u.id === userId);
    if (targetUser) {
      setUser(targetUser);
      localStorage.setItem('vistaran-helpdesk-impersonatedUserId', userId);
      logUserAction(realUser, `Started impersonating user: ${targetUser.name} (ID: ${userId})`);
    } else {
      console.error("User to impersonate not found.");
    }
  }, [realUser]);

  const stopImpersonation = useCallback(() => {
    if (realUser) {
      logUserAction(realUser, 'Stopped user impersonation.');
    }
    setUser(realUser);
    localStorage.removeItem('vistaran-helpdesk-impersonatedUserId');
  }, [realUser]);

  return (
    <AuthContext.Provider value={{ user, realUser, login, logout, updateUser, startImpersonation, stopImpersonation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};