// src/pages/auth/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiGlobe } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = t('auth.login.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.login.errors.invalidEmail');
    }
    
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

      if (demoUsers[formData.email]) {
        const demoUser = demoUsers[formData.email];
        
        if (formData.password === 'password123') {
          login(demoUser, formData.rememberMe);
          navigate('/sellerDashboard');
        } 
      } else {
        const response = await api.auth.login({
          email: formData.email,
          password: formData.password,
        });
        
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
    <div className="min-h-screen flex font-sans">
      {/* LANGUAGE DROPDOWN - FIXED AND MINIMAL */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-white/10 "
          >
            <FiGlobe className="mr-2" />
            <span className="hidden sm:inline">{getLanguageName(language)}</span>
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {languageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-10 z-50 border border-gray-200 overflow-hidden">
              <div className="py-1">
                {supportedLanguages.map((langCode) => (
                  <button
                    key={langCode}
                    type="button"
                    onClick={() => {
                      setLanguage(langCode);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                      language === langCode 
                        ? 'text-blue-600 bg-blue-50 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 ${language === langCode ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                      {getLanguageName(langCode)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LEFT SIDE - HERO CONTENT */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://trade.carcollect.com/_next/static/media/masking_tool_login_desktop.b0215844.jpg')" 
          }}
        />
        
        {/* Dark Overlay */}
        
        {/* Logo */}
<div className="absolute top-6 left-6 z-10">
          <img 
            src="/logoLight.svg" 
            alt="Company Logo" 
            className="h-10 w-auto cursor-pointer"
                  onClick={() => navigate('/home')}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-1 flex flex-col justify-center items-start p-12 text-white">
          <div className="max-w-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-3 text-sm font-semibold uppercase tracking-wider text-blue-300">
                {t('hero.tagline') || "The future of car trading"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('hero.title') || "Europe's largest wholesale platform for used cars"}
            </h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <div className="mr-2 text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">{t('hero.benefit1') || 'Competitive Pricing'}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">{t('hero.benefit2') || 'Wide Selection'}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">{t('hero.benefit3') || 'Expert Support'}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/features')}
                className="px-5 py-2.5 text-sm font-semibold bg-transparent border border-white text-white hover:bg-white/10"
              >
                {t('hero.explore') || 'Explore'}
              </Button>
              <Button
                              variant="outline"

                size="md"
                onClick={() => navigate('/how-it-works')}
                className="px-5 py-2.5 text-sm font-semibold bg-transparent border border-white text-white hover:bg-white/10"
              >
                {t('hero.howItWorks') || 'How it works'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            {/* Mobile Logo */}
           {/* Mobile Logo */}
<div className="flex justify-center mb-6 md:hidden">
  <img 
    src="/logo.svg" 
    alt="Company Logo" 
    className="h-12 w-auto cursor-pointer"
    onClick={() => navigate('/home')}
  />
</div>

            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('auth.login.title') || 'Welcome back!'}
              </h2>
              <p className="text-gray-600">
                {t('auth.login.subtitle') || 'Enter your details below to log in.'}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.email') || 'E-mail address'}
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
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      isLoading ? 'bg-gray-100' : 'bg-white'
                    }`}
                    placeholder={t('auth.login.email') || 'E-mail address'}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.password') || 'Password'}
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
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      isLoading ? 'bg-gray-100' : 'bg-white'
                    }`}
                    placeholder={t('auth.login.password') || 'Password'}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    {t('auth.login.rememberMe') || 'Remember me'}
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  disabled={isLoading}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {t('auth.login.forgotPassword') || 'Forgot password?'}
                </button>
              </div>

              <div>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {'Signing in...'}
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {t('auth.login.noAccount') || "Don't have an account?"}{' '}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {'Register now'}
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-8 text-center text-xs text-gray-500">
              <div className="flex justify-center space-x-6">
                <Link to="/contact?tab=contact" className="hover:text-gray-700">
                  { 'Support'}
                </Link>
                <Link to="/about" className="hover:text-gray-700">
                  {'About us'}
                </Link>
                <Link to="/privacy" className="hover:text-gray-700">
                  {'Privacy'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;