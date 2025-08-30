// src/components/common/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiGlobe, 
  FiUser, 
  FiLogOut,
  FiShoppingCart,
  FiTag
} from 'react-icons/fi';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const dropdownRefs = {
    buy: useRef(null),
    sell: useRef(null),
    language: useRef(null),
    user: useRef(null)
  };

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
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (key === 'buy') setBuyDropdownOpen(false);
          if (key === 'sell') setSellDropdownOpen(false);
          if (key === 'language') setLanguageDropdownOpen(false);
          if (key === 'user') setUserDropdownOpen(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SIMPLIFIED LANGUAGE TOGGLE (LIKE YOUR WORKING VERSION)
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
  ];

  const buyMenuItems = [
    { name: 'Browse Inventory', icon: <FiShoppingCart />, href: '#' },
    { name: 'Direct Buy', icon: <FiTag />, href: '#' },
    { name: 'Auctions', icon: <FiTag />, href: '#' }
  ];

  const sellMenuItems = [
    { name: 'Sell Your Car', icon: <FiTag />, href: '#' },
    { name: 'Pricing Guide', icon: <FiTag />, href: '#' },
    { name: 'EVA App', icon: <FiTag />, href: '#' }
  ];

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white backdrop-blur-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img src="./logo.png" alt="CarNetwork" width={120} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-1">
              {/* Buy Cars Dropdown */}
              <div className="relative" ref={dropdownRefs.buy}>
                <button 
                  onClick={() => {
                    setBuyDropdownOpen(!buyDropdownOpen);
                    setSellDropdownOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {t('buyCars')}
                  <FiChevronDown className={`ml-1 transition-transform ${buyDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {buyDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {buyMenuItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          <span className="mr-3 text-gray-400">{item.icon}</span>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sell Cars Dropdown */}
              <div className="relative" ref={dropdownRefs.sell}>
                <button 
                  onClick={() => {
                    setSellDropdownOpen(!sellDropdownOpen);
                    setBuyDropdownOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {t('sellCars')}
                  <FiChevronDown className={`ml-1 transition-transform ${sellDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {sellDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {sellMenuItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          <span className="mr-3 text-gray-400">{item.icon}</span>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Language Dropdown */}
              <div className="relative hidden sm:block" ref={dropdownRefs.language}>
                <button 
                  onClick={() => {
                    setLanguageDropdownOpen(!languageDropdownOpen);
                    setUserDropdownOpen(false);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiGlobe className="mr-1" />
                  {language === 'en' ? 'EN' : 'DE'}
                  <FiChevronDown className={`ml-1 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === lang.code 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {lang.name}
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
                    onClick={() => {
                      setUserDropdownOpen(!userDropdownOpen);
                      setLanguageDropdownOpen(false);
                    }}
                    className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <FiUser className="mr-1" />
                    {user.name}
                    <FiChevronDown className={`ml-1 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Dashboard
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Profile
                        </a>
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FiLogOut className="mr-2" />
                          {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.hash = '/login'}
                  >
                    {t('login')}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => window.location.hash = '/register'}
                  >
                    {t('register')}
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="h-8 w-auto">
                <img src="./logo.png" alt="CarNetwork" width={100} />
              </div>
              <button 
                className="p-2 rounded-md text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-1">
              {/* Buy Cars Mobile */}
              <div className="mb-2">
                <button 
                  onClick={() => setBuyDropdownOpen(!buyDropdownOpen)}
                  className="flex justify-between items-center w-full py-3 px-4 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  {t('buyCars')}
                  <FiChevronDown className={`transition-transform ${buyDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {buyDropdownOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {buyMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-2 text-gray-400">{item.icon}</span>
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Sell Cars Mobile */}
              <div className="mb-2">
                <button 
                  onClick={() => setSellDropdownOpen(!sellDropdownOpen)}
                  className="flex justify-between items-center w-full py-3 px-4 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  {t('sellCars')}
                  <FiChevronDown className={`transition-transform ${sellDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {sellDropdownOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {sellMenuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-2 text-gray-400">{item.icon}</span>
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                {/* Language Selector Mobile */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Language</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setLanguage('en');
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-1 text-xs rounded-full ${
                          language === 'en' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('de');
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-1 text-xs rounded-full ${
                          language === 'de' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        DE
                      </button>
                    </div>
                  </div>
                </div>
                
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">Welcome, {user.name}</p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <FiLogOut className="mr-1" />
                        {t('logout')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        window.location.hash = '/login';
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('login')}
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        window.location.hash = '/register';
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('register')}
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;