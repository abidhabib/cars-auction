// src/components/common/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiGlobe, 
  FiUser, 
  FiLogOut,
  FiShoppingCart,
  FiTag,
  FiInfo,
  FiPhone,
  FiHome,
  FiSearch,
  FiSettings
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { t, language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdownStates, setMobileDropdownStates] = useState({
    buy: false,
    sell: false
  });
  const [desktopDropdownStates, setDesktopDropdownStates] = useState({
    buy: false,
    sell: false
  });
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const dropdownRefs = {
    buy: useRef(null),
    sell: useRef(null),
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
          if (key === 'buy') {
            setDesktopDropdownStates(prev => ({ ...prev, buy: false }));
            setMobileDropdownStates(prev => ({ ...prev, buy: false }));
          }
          if (key === 'sell') {
            setDesktopDropdownStates(prev => ({ ...prev, sell: false }));
            setMobileDropdownStates(prev => ({ ...prev, sell: false }));
          }
          if (key === 'language') setLanguageDropdownOpen(false);
          if (key === 'user') setUserDropdownOpen(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buyMenuItems = [
    // 1. Use theme color for icons
    { name: t('header.buyMenu.browseInventory'), icon: <FiShoppingCart className="text-logo-dark-blue" />, href: '/buy/inventory' },
    { name: t('header.buyMenu.directBuy'), icon: <FiTag className="text-logo-dark-blue" />, href: '/buy/direct' }
  ];

  const sellMenuItems = [
    // 1. Use theme color for icons
    { name: t('header.sellMenu.sellYourCar'), icon: <FiTag className="text-logo-dark-blue" />, href: '/sell/car' },
    { name: t('header.sellMenu.pricingGuide'), icon: <FiTag className="text-logo-dark-blue" />, href: '/sell/pricing' }
  ];

  const mainMenuItems = [
    // 1. Use theme color for icons
    { name: t('header.mainMenu.buyCars'), icon: <FiShoppingCart className="text-logo-dark-blue" />, href: '/buy', hasDropdown: true, key: 'buy' },
    { name: t('header.mainMenu.sellCars'), icon: <FiTag className="text-logo-dark-blue" />, href: '/sell', hasDropdown: true, key: 'sell' },
    { name: t('header.mainMenu.aboutUs'), icon: <FiInfo className="text-logo-dark-blue" />, href: '/about' },
    { name: t('header.mainMenu.contact'), icon: <FiPhone className="text-logo-dark-blue" />, href: '/contact' },
  ];

  const mobileMenuItems = [
    { name: 'Home', icon: <FiHome className="text-white" />, href: '/home' },
    { name: t('header.mainMenu.buyCars'), icon: <FiShoppingCart className="text-white" />, href: '/buy', hasDropdown: true, key: 'buy' },
    { name: t('header.mainMenu.sellCars'), icon: <FiTag className="text-white" />, href: '/sell', hasDropdown: true, key: 'sell' },
    { name: t('header.mainMenu.aboutUs'), icon: <FiInfo className="text-white" />, href: '/about' },
    { name: t('header.mainMenu.contact'), icon: <FiPhone className="text-white" />, href: '/contact' },
    { name: 'Search', icon: <FiSearch className="text-white" />, href: '/search' },
  ];

  const isActiveRoute = (href) => {
    if (href === '/home') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname.startsWith(href);
  };

  const toggleMobileDropdown = (dropdownKey, e) => {
    e?.stopPropagation();
    setMobileDropdownStates(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const toggleDesktopDropdown = (dropdownKey, e) => {
    e?.stopPropagation();
    const otherKey = dropdownKey === 'buy' ? 'sell' : 'buy';
    setDesktopDropdownStates(prev => ({
      ...prev,
      [otherKey]: false,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const handleNavigation = (path, e) => {
    e?.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
    setDesktopDropdownStates({ buy: false, sell: false });
  };

  const handleSubNavigation = (path, dropdownKey, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    navigate(path);
    setMobileMenuOpen(false);
    setDesktopDropdownStates(prev => ({ ...prev, [dropdownKey]: false }));
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
      {/* 2. Use theme color for background */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 shadow bg-logo-dark-blue py-3 ${scrolled ? 'shadow-md shadow-white' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/home')}
                className="flex items-center focus:outline-none"
              >
                {/* 3. CONFIRMED: Use logoLight.svg (white logo) on the dark blue header background */}
                <img src="/logoLight.svg" alt="CarNetwork Logo" className="h-8" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-1">
              {mainMenuItems.map((item, index) => (
                <div key={index} className="relative" ref={item.hasDropdown ? dropdownRefs[item.key] : null}>
                  {item.hasDropdown ? (
                    <>
                      <button 
                        data-dropdown-toggle="true"
                        onClick={(e) => toggleDesktopDropdown(item.key, e)}
                        // 2. Use theme colors for hover/active states
                        className={`flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                          isActiveRoute(item.href) 
                            ? 'text-white bg-background-deep-blue' // Use darker blue for active state contrast
                            : 'text-indigo-100 hover:text-white hover:bg-background-deep-blue/50' // Use theme color for hover
                        }`}
                      >
                        {item.name}
                        <FiChevronDown className={`ml-1 transition-transform ${
                          desktopDropdownStates[item.key] ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {desktopDropdownStates[item.key] && (
                        <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-20 z-50 border border-gray-200">
                          <div className="py-1">
                            {(item.key === 'buy' ? buyMenuItems : sellMenuItems).map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={(e) => handleSubNavigation(subItem.href, item.key, e)}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                              >
                                <span className="mr-3">{subItem.icon}</span>
                                {subItem.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={(e) => handleNavigation(item.href, e)}
                      // 2. Use theme colors for hover/active states
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                        isActiveRoute(item.href) 
                          ? 'text-white bg-background-deep-blue' // Use darker blue for active state contrast
                          : 'text-indigo-100 hover:text-white hover:bg-background-deep-blue/50' // Use theme color for hover
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>

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
                  // 2. Use theme colors for hover
                  className="flex items-center px-3 py-2 text-sm text-indigo-100 hover:text-white hover:bg-background-deep-blue/50 transition-colors rounded-lg"
                >
                  <FiGlobe className="mr-1 text-white" />
                  <span className="hidden md:inline">{getLanguageName(language)}</span>
                  <FiChevronDown className={`ml-1 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
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
                          // 1. Use theme color for active language
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
                    // 2. Use theme colors for hover
                    className="flex items-center text-sm text-indigo-100 hover:text-white  transition-colors rounded-lg "
                  >
                    <div className="w-8 h-8 rounded-full bg-background-deep-blue flex items-center justify-center text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : <FiUser className="w-4 h-4" />}
                    </div>
                    <span className="truncate max-w-[100px] ml-2 hidden lg:inline">{user.name}</span>
                    <FiChevronDown className={`ml-1 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
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
                            navigate('/dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiSettings className="mr-2 text-gray-500" />
                          {t('header.userMenu.dashboard')}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/profile');
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiUser className="mr-2 text-gray-500" />
                          {t('header.userMenu.profile')}
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
                          {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button 
                    onClick={() => navigate('/login')}
                    // 2. Use theme colors for hover
                    className="px-4 py-2 text-sm font-medium text-indigo-100 hover:text-white hover:bg-background-deep-blue/50 transition-colors rounded-lg"
                  >
                    {t('navigation.login')}
                  </button>
                  {/* 2. Use theme colors for primary signup button */}
                  <button 
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 text-sm font-medium text-white bg-background-deep-blue rounded-lg hover:bg-[#100f25] transition-colors" // Slightly darker hover for deep blue
                  >
                    {t('navigation.signup')}
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
        </div>

        {/* Mobile Menu - Full Width Sidebar with #3b396d background */}
        {/* 2. Use theme color for background */}
        <div 
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-logo-dark-blue z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-5 border-b border-background-deep-blue">
              <div className="flex items-center">
                {/* 3. CONFIRMED: Use logoLight.svg (white logo) on the dark blue mobile menu background */}
                <img src="/logoLight.svg" alt="CarNetwork Logo" className="h-8" />
              </div>
              <button 
                className="p-2 rounded-md text-white hover:bg-background-deep-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 p-5">
              <nav className="space-y-2">
                {mobileMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.hasDropdown ? (
                      <div className="mb-2">
                        <button 
                          onClick={(e) => toggleMobileDropdown(item.key, e)}
                          className="flex items-center justify-between w-full p-3 text-left text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                          </div>
                          <FiChevronDown className={`transition-transform ${mobileDropdownStates[item.key] ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {mobileDropdownStates[item.key] && (
                          <div className="ml-8 mt-1 space-y-1">
                            {(item.key === 'buy' ? buyMenuItems : sellMenuItems).map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={(e) => handleSubNavigation(subItem.href, item.key, e)}
                                className="flex items-center w-full p-2 text-left text-indigo-100 hover:text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                              >
                                <span className="mr-3 opacity-70">{subItem.icon}</span>
                                {subItem.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleNavigation(item.href, e)}
                        className="flex items-center w-full p-3 text-left text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </button>
                    )}
                  </div>
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
                        navigate('/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full p-3 text-left text-white hover:bg-background-deep-blue rounded-lg transition-colors"
                    >
                      <FiSettings className="mr-3" />
                      {t('header.userMenu.dashboard')}
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
                      {t('logout')}
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
                      {t('navigation.login')}
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                      className="p-3 text-center text-white bg-background-deep-blue rounded-lg hover:bg-[#100f25] transition-colors" // Slightly darker hover
                    >
                      {t('navigation.signup')}
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
                            : 'text-white bg-background-deep-blue hover:bg-[#100f25]' // Slightly darker hover
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