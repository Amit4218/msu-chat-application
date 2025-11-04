import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  setCurrentUser as saveMockUser,
  clearCurrentUser,
} from "../mock";
import { loginUser, logoutUser, registerUser } from "../api/authRequests";

const AuthContext = createContext();

// Uncomment when the mock.js file is deleted
/*
export const getCurrentUser = () => {
  const stored = localStorage.getItem("user");
  if (stored) {
    return stored;
  }
  return null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem("user", user);
};

export const clearCurrentUser = () => {
  localStorage.removeItem("user");
};
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
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

  const login = async (email, password) => {
    if (!email.endsWith("@msu.edu.in")) {
      throw new Error("Please use your college email address (@msu.edu.in)");
    }

    const user = await loginUser(email, password);

    setCurrentUser(user);
    saveMockUser(user);
    return user;
  };

  const register = async (userData) => {
    if (!userData.email.endsWith("@msu.edu.in")) {
      throw new Error("Please use your college email address (@msu.edu.in)");
    }

    const message = await registerUser(userData);

    return message;
  };

  const logout = async () => {
    await logoutUser();

    setCurrentUser(null);
    localStorage.removeItem("token");
    clearCurrentUser();
    return;
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    saveMockUser(updatedUser);
  };

  const verifyOtp = async (otp) => {
    const user = await verifyOtp(otp);

    setCurrentUser(user);
    saveMockUser(user);
    return user;
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    loading,
    verifyOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
