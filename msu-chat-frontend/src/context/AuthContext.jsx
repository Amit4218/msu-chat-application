import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser as saveMockUser, clearCurrentUser } from '../mock';
import { mockUsers } from '../mock';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would call backend API
    // For now, validate email domain and set mock user
    if (!email.endsWith('@msu.edu.in')) {
      throw new Error('Please use your college email address (@msu.edu.in)');
    }

    const mockUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
      type: 'student',
      semester: '6th Semester',
      phone: '+1234567890',
      bio: 'New to the platform!',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };

    setCurrentUser(mockUser);
    saveMockUser(mockUser);
    return mockUser;
  };

  const register = (userData) => {
    // Mock registration - validate college email
    if (!userData.email.endsWith('@msu.edu.in')) {
      throw new Error("Please use your college email address (@msu.edu.in)");
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      bio: userData.bio || 'New to the platform!'
    };

    setCurrentUser(newUser);
    saveMockUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    clearCurrentUser();
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    saveMockUser(updatedUser);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};