import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load initial simulated user from localStorage if present
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('freshfind_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Failed to parse freshfind_user from localStorage', e);
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'
  const [toastMessage, setToastMessage] = useState(null);

  // Open modal with specific initial tab ('signin' or 'signup')
  const openAuthModal = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (userData) => {
    const user = {
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Market Friend'),
      email: userData.email || 'shopper@freshfind.local',
      role: 'Community Patron',
      joinedAt: new Date().toLocaleDateString([], { month: 'short', year: 'numeric' }),
      ...userData,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem('freshfind_user', JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
    showToast(`Welcome back, ${user.name}!`);
  };

  const signup = (userData) => {
    const user = {
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Market Friend'),
      email: userData.email || 'shopper@freshfind.local',
      role: 'Harvest Member',
      joinedAt: new Date().toLocaleDateString([], { month: 'short', year: 'numeric' }),
      ...userData,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem('freshfind_user', JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
    showToast('Welcome to FreshFind! (Guest Session Mode Active)');
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('freshfind_user');
    } catch (e) {
      console.error('Error removing user from localStorage', e);
    }
    showToast('Signed out of guest session.');
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4500);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthModalOpen,
        authModalMode,
        toastMessage,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        signup,
        logout,
        showToast,
        setToastMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
