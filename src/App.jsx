// src/App.jsx
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import AppLayout from './components/layout/AppLayout';
import SellerDashboard from './pages/seller/SellerDashboard';
import NewsletterPage from './pages/NewsletterPage/NewsletterPage';

// Lazy-loaded public pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const SupportPage = React.lazy(() => import('./pages/SupportPage/SupportPage'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

// Seller dashboard tab components (imported directly for clarity during setup)
import OverviewTab from './components/seller/OverviewTab';
import InventoryTab from './components/seller/InventoryTab';
import AddCarListing from './components/seller/AddCarListing';
import MessagesTab from './components/seller/MessagesTab';
import AnalyticsTab from './components/seller/AnalyticsTab';
import BuyCarsTab from './components/seller/BuyCarsTab';
import Profile from './pages/profile/Profile';
import { FiSettings } from 'react-icons/fi';
import VehicleDetailPage from './components/seller/VehicleDetailPage';
import EditCarListingWrapper from './components/seller/EditCarListingWrapper';
// --- Settings Page Component ---
const SettingsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="text-center py-12">
      <FiSettings className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        {t('sellerDashboard.sidebar.settings') || 'Settings'}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {t('sellerDashboard.comingSoonDesc') || 'This section is under development.'}
      </p>
    </div>
  );
};
const SellerDashboardLayout = () => {
  return (
    <SellerProtectedRoute>
      <SellerDashboard /> {/* This will now act as layout */}
    </SellerProtectedRoute>
  );
};
// --- Helper: Scroll to top on route change ---
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// --- Fallback while loading ---
const LoadingFallback = () => <SplashScreen />;

// --- Redirect logged-in users away from auth pages ---
const ProtectedAuthRoutes = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      console.log("User is logged in, redirecting from auth page to dashboard...");
      navigate('/Dashboard', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return children;
};

// --- Protect routes that require authentication ---
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingFallback />;
  if (!user) {
    console.log("User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// --- Protect seller-specific routes ---
const SellerProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    console.log("User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// --- Main App ---
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
    <Router>
      <ScrollToTop />
      <LanguageProvider>
        <AuthProvider>
          <ProtectedAuthRoutes>
            <div className="App min-h-screen">
              <React.Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Public Pages with AppLayout */}
                  <Route
                    path="/home"
                    element={
                      <AppLayout>
                        <Home />
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
                    path="/faq"
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

                  {/* Seller Protected Newsletter (optional) */}
                  <Route
                    path="/seller/newsletter"
                    element={
                      <SellerProtectedRoute>
                        <AppLayout>
                          <NewsletterPage />
                        </AppLayout>
                      </SellerProtectedRoute>
                    }
                  />

                  {/* Seller Dashboard - Nested Routes */}
           <Route path="/Dashboard" element={<SellerDashboardLayout />}>
  <Route index element={<OverviewTab />} />
  <Route path="inventory" element={<InventoryTab />} />
  <Route path="inventory/:id" element={<VehicleDetailPage />} /> {/* 👈 ADD THIS */}
    <Route path="inventory/:id/edit" element={<EditCarListingWrapper />} /> {/* 👈 NEW */}

  <Route path="add" element={<AddCarListing />} />
  <Route path="messages" element={<MessagesTab />} />
  <Route path="analytics" element={<AnalyticsTab />} />
  <Route path="buy" element={<BuyCarsTab />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<SettingsPage />} />
  <Route path="*" element={<Navigate to="/Dashboard" replace />} />
</Route>
                  {/* Root redirect */}
                  <Route path="/" element={<Navigate to="/home" replace />} />

                  {/* Catch-all: redirect unknown routes */}
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </React.Suspense>
            </div>
          </ProtectedAuthRoutes>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;