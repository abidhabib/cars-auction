// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: validate token with backend
      setUser({ id: 1, name: 'Dealer Name' });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // TODO: call API
    const userData = { id: 1, name: 'Dealer Name', ...credentials };
    setUser(userData);
    localStorage.setItem('authToken', 'fake-token');
    return userData;
  };

  const register = async (userData) => {
    // TODO: call API
    const newUser = { id: Date.now(), ...userData };
    setUser(newUser);
    localStorage.setItem('authToken', 'fake-token');
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
