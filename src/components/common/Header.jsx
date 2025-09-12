// src/components/common/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FiMenu, 
  FiX, 
  FiGlobe, 
  FiUser, 
  FiLogOut,
  FiShoppingCart,
  FiTag,
  FiSearch,
  FiSettings
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { t, language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRefs = {
    language: useRef(null),
    user: useRef(null)
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownToggle = event.target.closest('[data-dropdown-toggle]');
      
      if (isDropdownToggle) {
        return;
      }

      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (key === 'language') setLanguageDropdownOpen(false);
          if (key === 'user') setUserDropdownOpen(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainMenuItems = [
    { name: t('header.mainMenu.buyCars') || 'Buy Cars', icon: <FiShoppingCart className="text-logo-dark-blue" />, href: '/buy' },
    { name: t('header.mainMenu.sellCars') || 'Sell Cars', icon: <FiTag className="text-logo-dark-blue" />, href: '/sellerDashboard' }
  ];

  const mobileMenuItems = [
    { name: t('header.mainMenu.buyCars') || 'Buy Cars', icon: <FiShoppingCart className="text-white" />, href: '/buy' },
    { name: t('header.mainMenu.sellCars') || 'Sell Cars', icon: <FiTag className="text-white" />, href: '/sell' },
    { name: 'Search', icon: <FiSearch className="text-white" />, href: '/search' }
  ];

  const isActiveRoute = (href) => {
    return location.pathname.startsWith(href);
  };

  const handleNavigation = (path, e) => {
    e?.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 shadow bg-logo-dark-blue py-4  ${scrolled ? 'shadow-md shadow-white' : ''}`}
      >
     

        <div className=" mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center focus:outline-none"
              >
                <img src="/logoLight.svg" alt="CarNetwork Logo" className="h-8" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4 flex-1 max-w-2xl mx-8">
              <nav className="flex lg:items-center lg:space-x-1">
                {mainMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActiveRoute(item.href) 
                        ? 'text-white bg-background-deep-blue'
                        : 'text-indigo-100 hover:text-white hover:bg-background-deep-blue/50'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Desktop Search Bar */}
              <form onSubmit={handleSearch} className="flex-1 ml-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('header.searchPlaceholder') || "Search cars..."}
                    className="w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-logo-dark-blue"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiSearch className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Language Dropdown */}
              <div className="relative hidden sm:block" ref={dropdownRefs.language}>
                <button 
                  data-dropdown-toggle="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguageDropdownOpen(!languageDropdownOpen);
                    setUserDropdownOpen(false);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-indigo-100 hover:text-white hover:bg-background-deep-blue/50 transition-colors rounded-lg"
                >
                  <FiGlobe className="mr-1 text-white" />
                  <span className="hidden md:inline">{getLanguageName(language)}</span>
                </button>
                
                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-20 z-50 border border-gray-200">
                    <div className="py-1">
                      {supportedLanguages.map((langCode) => (
                        <button
                          key={langCode}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLanguage(langCode);
                            setLanguageDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === langCode 
                              ? 'text-logo-dark-blue bg-gray-100' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {getLanguageName(langCode)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Dropdown */}
              {user ? (
                <div className="hidden md:block relative" ref={dropdownRefs.user}>
                  <button 
                    data-dropdown-toggle="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdownOpen(!userDropdownOpen);
                      setLanguageDropdownOpen(false);
                    }}
                    className="flex items-center text-sm text-indigo-100 hover:text-white transition-colors rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-background-deep-blue flex items-center justify-center text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : <FiUser className="w-4 h-4" />}
                    </div>
                    <span className="truncate max-w-[100px] ml-2 hidden lg:inline">{user.name}</span>
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-20 z-50 border border-gray-200">
                      <div className="py-1" onClick={(e) => {
                        setUserDropdownOpen(false);
                      }}>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/sellerDashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiSettings className="mr-2 text-gray-500" />
                          {t('header.userMenu.dashboard') || 'Dashboard'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            logout();
                            navigate('/');
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiLogOut className="mr-2 text-gray-500" />
                          {t('logout') || 'Logout'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium text-indigo-100 hover:text-white hover:bg-background-deep-blue/50 transition-colors rounded-lg"
                  >
                    {t('navigation.login') || 'Login'}
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 text-sm font-medium text-white bg-background-deep-blue rounded-lg hover:bg-[#100f25] transition-colors"
                  >
                    {t('navigation.signup') || 'Sign Up'}
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 rounded-md text-indigo-100 hover:text-white hover:bg-background-deep-blue/50 focus:outline-none transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - shown below nav on mobile */}
          <div className="mt-3 lg:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.searchPlaceholder') || "Search cars..."}
                  className="w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-logo-dark-blue"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiSearch className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu - Full Width Sidebar */}
        <div 
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-logo-dark-blue z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-5 border-b border-background-deep-blue">
              <div className="flex items-center">
                <img src="/logoLight.svg" alt="CarNetwork Logo" className="h-8" />
              </div>
              <button 
                className="p-2 rounded-md text-white hover:bg-background-deep-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="p-5 border-b border-background-deep-blue">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('header.searchPlaceholder') || "Search cars..."}
                    className="w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-logo-dark-blue"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiSearch className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 p-5">
              <nav className="space-y-2">
                {mobileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className="flex items-center w-full p-3 text-left text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* User section in mobile menu */}
              <div className="mt-8 pt-6 border-t border-background-deep-blue">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center p-3 text-white cursor-pointer" onClick={() => {
                        navigate('/profile');
                        setMobileMenuOpen(false);
                      }}>
                      <div className="w-10 h-10 rounded-full bg-background-deep-blue flex items-center justify-center text-white mr-3">
                        {user.name ? user.name.charAt(0).toUpperCase() : <FiUser className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-indigo-100">{user.email}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigate('/sellerDashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full p-3 text-left text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                    >
                      <FiSettings className="mr-3" />
                      {t('header.userMenu.dashboard') || 'Dashboard'}
                    </button>
                    
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                        navigate('/');
                      }}
                      className="flex items-center w-full p-3 text-left text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                    >
                      <FiLogOut className="mr-3" />
                      {t('logout') || 'Logout'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="p-3 text-center text-white border border-white rounded-lg hover:bg-white hover:text-logo-dark-blue transition-colors"
                    >
                      {t('navigation.login') || 'Login'}
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                      className="p-3 text-center text-white bg-background-deep-blue rounded-lg hover:bg-[#100f25] transition-colors"
                    >
                      {t('navigation.signup') || 'Sign Up'}
                    </button>
                  </div>
                )}
                
                {/* Language selector in mobile menu */}
                <div className="mt-6">
                  <p className="text-indigo-100 text-sm mb-2">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {supportedLanguages.map((langCode) => (
                      <button
                        key={langCode}
                        onClick={() => {
                          setLanguage(langCode);
                        }}
                        className={`p-2 text-center rounded-lg text-sm ${
                          language === langCode 
                            ? 'bg-white text-logo-dark-blue' 
                            : 'text-white bg-background-deep-blue hover:bg-[#100f25]'
                        }`}
                      >
                        {getLanguageName(langCode)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;