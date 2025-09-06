// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate // Import useNavigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import AppLayout from './components/layout/AppLayout';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddCarListing from './components/seller/AddCarListing';

// Lazy load all pages and components
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const SupportPage = React.lazy(() => import('./pages/SupportPage/SupportPage'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

// --- Helper Component for Scroll ---
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// --- Helper Component: Redirect Logged-in Users from Auth Pages ---
const ProtectedAuthRoutes = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      console.log("User is logged in, redirecting from auth page to dashboard...");
      navigate('/dashboard', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return children;
};

// --- Helper Component: Protect Routes for Logged-in Users Only ---
// This component ensures only authenticated users can access certain routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Access user and loading state
  const location = useLocation(); // Get current location for redirect

  // Show a loading state while checking auth status
  if (loading) {
    return <LoadingFallback />;
  }

  // If user is not logged in, redirect to login page
  // Pass the attempted URL as state so user can be redirected back after login
  if (!user) {
    console.log("User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in, render the requested content
  return children;
};

// --- Loading Fallback Component ---
// 1. Design Guidelines: Use theme color for background
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-logo-dark-blue font-sans">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
);

// --- Main App Component ---
function App() {
  const [showSplash, setShowSplash] = useState(true);

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
          <ProtectedAuthRoutes> {/* Handles redirect FROM auth pages if logged in */}
            <div className="App min-h-screen">
              <React.Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Authentication routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Public routes with AppLayout */}
                  <Route
                    path="/home"
                    element={
                      <AppLayout>
                        <Home />
                      </AppLayout>
                    }
                  />
                  <Route
                    path="/sellerDashboard"
                    element={
                      <AppLayout>
                        <SellerDashboard />
                      </AppLayout>
                    }
                  />
                  <Route
                    path="/seller/addvehicle"
                    element={
                      <AppLayout>
                        <AddCarListing />
                      </AppLayout>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <AppLayout>
                        <AboutPage />
                      </AppLayout>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <AppLayout>
                        <SupportPage />
                      </AppLayout>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <AppLayout>
                        <TermsOfService />
                      </AppLayout>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <AppLayout>
                        <PrivacyPolicy />
                      </AppLayout>
                    }
                  />
                  <Route path="/" element={<Navigate to="/home" replace />} />

                  {/* Protected routes with AppLayout */}
                  {/* These will be checked by ProtectedRoute for authentication */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute> {/* Protects the Dashboard route */}
                        <AppLayout>
                          <Dashboard />
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute> {/* Protects the Profile route */}
                        <AppLayout>
                          <Profile />
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/buy/*"
                    element={
                      <ProtectedRoute> {/* Protects the Buy section */}
                        <AppLayout>
                          <div className="min-h-screen pt-16">Buy Section</div>
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sell/*"
                    element={
                      <ProtectedRoute> {/* Protects the Sell section */}
                        <AppLayout>
                          <div className="min-h-screen pt-16">Sell Section</div>
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </React.Suspense>
            </div>
          </ProtectedAuthRoutes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;