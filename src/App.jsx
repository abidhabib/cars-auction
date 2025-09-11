// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './components/common/SplashScreen';
import AppLayout from './components/layout/AppLayout';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddCarListing from './components/seller/AddCarListing';
import EditCarListing from './components/seller/EditCarListing'; // Add this import

// Lazy load all pages and components
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
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
      // Redirect based on user role
        navigate('/sellerDashboard', { replace: true });
     
    }
  }, [user, location.pathname, navigate]);

  return children;
};

// --- Helper Component: Protect Routes for Logged-in Users Only ---
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading state while checking auth status
  if (loading) {
    return <LoadingFallback />;
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    console.log("User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in, render the requested content
  return children;
};

// --- Helper Component: Protect Seller Routes ---
const SellerProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading state while checking auth status
  if (loading) {
    return <LoadingFallback />;
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    console.log("User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

    return children;  

};

// --- Loading Fallback Component ---
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
        <Router>
          <ScrollToTop />
    <LanguageProvider>
        <AuthProvider>
          <ProtectedAuthRoutes>
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
                  <Route path="/" element={<Navigate to="/home" replace />} />

                 
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <AppLayout>
                          <Profile />
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/buy/*"
                    element={
                      <ProtectedRoute>
                        <AppLayout>
                          <div className="min-h-screen pt-16">Buy Section</div>
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Seller-specific protected routes */}
                  <Route
                    path="/sellerDashboard"
                    element={
                      <SellerProtectedRoute>
                        <AppLayout>
                          <SellerDashboard />
                        </AppLayout>
                      </SellerProtectedRoute>
                    }
                  />
                  <Route
                    path="/sell/*"
                    element={
                      <SellerProtectedRoute>
                        <AppLayout>
                          <div className="min-h-screen pt-16">Sell Section</div>
                        </AppLayout>
                      </SellerProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/addvehicle"
                    element={
                      <SellerProtectedRoute>
                        <AppLayout>
                          <AddCarListing />
                        </AppLayout>
                      </SellerProtectedRoute>
                    }
                  />
                  {/* Add this route for editing vehicles */}
                  <Route
                    path="/seller/edit-vehicle/:id"
                    element={
                      <SellerProtectedRoute>
                        <AppLayout>
                          <EditCarListing />
                        </AppLayout>
                      </SellerProtectedRoute>
                    }
                  />

                  {/* Catch-all route */}
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