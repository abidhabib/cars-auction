// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile/Profile';
import AppLayout from './components/layout/AppLayout';
import AboutPage from './pages/AboutPage/AboutPage';
import SupportPage from './pages/SupportPage/SupportPage';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop /> {/* Add this line */}
          <div className="App min-h-screen">
            <Routes>
              {/* Your existing routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/home" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />
              <Route path="/about" element={
                <AppLayout>
                  <AboutPage />
                </AppLayout>
              } />
              <Route path="/contact" element={
                <AppLayout>
                  <SupportPage />
                </AppLayout>
              } />
              <Route path="/" element={<Navigate to="/home" replace />} />
              
              <Route path="/dashboard" element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              } />
              <Route path="/profile" element={
                <AppLayout>
                  <Profile />
                </AppLayout>
              } />
              <Route path="/buy/*" element={
                <AppLayout>
                  <div className="min-h-screen pt-16">
                    Buy Section
                  </div>
                </AppLayout>
              } />
              <Route path="/sell/*" element={
                <AppLayout>
                  <div className="min-h-screen pt-16">
                    Sell Section
                  </div>
                </AppLayout>
              } />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;