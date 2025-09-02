// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import AppLayout from './components/layout/AppLayout';

// Lazy load all pages and components
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const SupportPage = React.lazy(() => import('./pages/SupportPage/SupportPage'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy')); // Removed .jsx extension

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-[#3b396d]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="App min-h-screen">
            <React.Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Authentication routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Main routes with AppLayout */}
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
                <Route path="/terms" element={
                  <AppLayout>
                    <TermsOfService />
                  </AppLayout>
                } />
                <Route path="/privacy" element={
                  <AppLayout>
                    <PrivacyPolicy />
                  </AppLayout>
                } />
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* Protected routes with AppLayout */}
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
            </React.Suspense>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;