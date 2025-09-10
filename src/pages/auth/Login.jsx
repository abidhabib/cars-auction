// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiMail, FiLock, FiEye, FiEyeOff,  } from 'react-icons/fi'; // Added icons
import api from '../../services/api';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general submit error
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('auth.login.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.login.errors.invalidEmail');
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = t('auth.login.errors.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.login.errors.passwordTooShort');
    }
    
   
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // --- Demo User Logic ---
      // Check for predefined demo credentials
      const demoUsers = {
        'seller@example.com': { 
          id: 'demo_seller_123', 
          name: 'Demo Seller', 
          email: 'seller@example.com', 
          company: 'Demo Auto Traders GmbH'
        },
        'buyer@example.com': { 
          id: 'demo_buyer_456', 
          name: 'Demo Buyer', 
          email: 'buyer@example.com', 
          company: 'Demo Fleet Solutions Ltd.'
        }
      };

      // Check if it's a demo user
      if (demoUsers[formData.email]) {
        const demoUser = demoUsers[formData.email];
        
        // Verify password (in a real app, this would be done server-side)
        if (formData.password === 'password123') {
          // Login with the demo user data
          login(demoUser, formData.rememberMe);
          
         
            navigate('/sellerDashboard');
          
        } 
      } else {
        // --- Regular Login Logic (for non-demo users) ---
        // Use the new API service - automatically uses mock data
        const response = await api.auth.login({
          email: formData.email,
          password: formData.password,
          userType: formData.userType // Send user type to backend
        });
        
        // Login with the response data
        const loggedInUser = response.user || response;
        login(loggedInUser, formData.rememberMe);
        
      
          navigate('/sellerDashboard');
        
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        submit: error.message || t('auth.login.errors.invalidCredentials')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      {/* Ensure Outfit font is applied */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="w-full max-w-md">
          {/* 3. Minimal Design: Reduced rounding */}
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10"> {/* Reduced shadow and rounding */}
            <div className="text-center mb-8">
              {/* 1. Primary Colors: Theme color for icon background */}
              <div className="mx-auto h-16 w-16 rounded-full bg-logo-dark-blue flex items-center justify-center mb-4">
                <FiLock className="h-8 w-8 text-white" />
              </div>
              {/* 3. Typography & 4. Minimal Design: Reduced weight */}
              <h2 className="text-3xl font-semibold text-gray-900"> {/* Reduced weight */}
                {t('auth.login.title')}
              </h2>
              <p className="mt-2 text-gray-600">
                {t('auth.login.subtitle')}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
            

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    // 1. Primary Colors: Theme color for focus ring/border
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-logo-dark-blue focus:border-logo-dark-blue sm:text-sm ${
                      isLoading ? 'bg-gray-100' : 'bg-white'
                    }`}
                    placeholder={t('auth.login.email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    // 1. Primary Colors: Theme color for focus ring/border
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-logo-dark-blue focus:border-logo-dark-blue sm:text-sm ${
                      isLoading ? 'bg-gray-100' : 'bg-white'
                    }`}
                    placeholder={t('auth.login.password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* 1. Primary Colors: Theme color for checkbox */}
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-logo-dark-blue focus:ring-logo-dark-blue border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    {t('auth.login.rememberMe')}
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  disabled={isLoading}
                  // 1. Primary Colors: Theme color for link
                  className="text-sm font-medium text-logo-dark-blue hover:text-[#2a285a] disabled:opacity-50" // Consider using theme hover color if defined
                >
                  {t('auth.login.forgotPassword')}
                </button>
              </div>

              {/* Submit Button - Using the updated Button component */}
              <div>
                <Button
                  variant="primary" // Uses theme primary color
                  size="md"
                  type="submit"
                  disabled={isLoading}
                  className="w-full" // Make button full width
                  // The Button component handles loading state internally if needed,
                  // or you can manage it like this:
                  // loading={isLoading} // If your Button component supports a loading prop
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('common.loading')}
                    </span>
                  ) : (
                    t('auth.login.signIn')
                  )}
                </Button>
              </div>

              {/* Test Credentials Info */}
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      {t('auth.login.testCredentials')}
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p><strong>{t('common.email')}:</strong> seller@example.com / buyer@example.com</p>
                      <p><strong>{t('common.password')}:</strong> password123</p>
                      <p><strong>{t('auth.login.userType')}:</strong> {t('auth.login.seller')} / {t('auth.login.buyer')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {errors.submit}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('auth.login.noAccount')}{' '}
                <Link
                  to="/register"
                  // 1. Primary Colors: Theme color for link
                  className="font-medium text-logo-dark-blue hover:text-[#2a285a]"
                >
                  {t('auth.login.createAccount')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;