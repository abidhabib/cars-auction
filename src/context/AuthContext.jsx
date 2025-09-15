// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Keeps track of initial auth check
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // Wrap setUser in useCallback to prevent unnecessary re-renders if passed down
  const updateUser = useCallback((newUserData) => {
    setUser(newUserData);
    // Update stored user data if logged in
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(newUserData));
    }
  }, []);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      // Simulate potential async check (e.g., validating token with backend)
      // await new Promise(resolve => setTimeout(resolve, 500)); 

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const userData = localStorage.getItem('user') || sessionStorage.getItem('user');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      }
      // Ensure loading is set to false after check
      setLoading(false);
    };

    checkAuth();
  }, []); // Run only once on mount

  const login = async (userData, rememberMe = false) => {
    try {
      // Simulate API call
      // const response = await fetch('/api/login', { ... });
      // const { token, user: fetchedUserData } = await response.json();
      const token = 'demo-token'; // Replace with real token from API response
      const userDataToStore = userData; // Or use fetchedUserData if from API

      // Store user data and token
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDataToStore));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userDataToStore));
      }

      // Set user state *before* navigation
      setUser(userDataToStore);

      // --- Improved Navigation Logic ---
      // Determine redirect target
      let redirectTo = '/Dashboard'; // Default redirect for sellers

      // Check if the user came from a specific page
      const from = location.state?.from?.pathname;
      // Prevent redirecting back to auth pages or undefined paths
      if (from && from !== '/login' && from !== '/register') {
        redirectTo = from;
      }

      console.log(`Login successful, navigating to: ${redirectTo}`);
      // Use navigate with replace to prevent back button to login
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error('Login error:', error);
      // Clear state on login failure if anything was set
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
      throw error; // Re-throw to handle in the calling component (e.g., Login.jsx)
    }
  };

  const logout = () => {
    // Clear user data and token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Set user state to null *before* navigation
    setUser(null);

    console.log("Logout successful, navigating to login");
    // Navigate to login
    navigate('/login', { replace: true }); // Use replace to prevent back button issues
  };

  const value = {
    user,
    login,
    logout,
    loading,
    updateUser // Expose updateUser function
  };

  // Render children only after the initial loading check is complete
  // This prevents protected routes from briefly flashing or incorrectly redirecting
  // before the user's auth status is known.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};