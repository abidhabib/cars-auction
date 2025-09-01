// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile/Profile';
import AppLayout from './components/layout/AppLayout';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // if (showSplash) {
  //   return <SplashScreen onSplashComplete={() => setShowSplash(false)} />;
  // }

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="App min-h-screen">
            <Routes>
              {/* Public Routes - No Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Public Routes - With Layout */}
              <Route path="/home" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />
              <Route path="/" element={<Navigate to="/home" replace />} />
              
              {/* Protected Routes - With Layout */}
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