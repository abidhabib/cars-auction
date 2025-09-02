// src/components/common/Header.jsx (Fixed Version)
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
  FiHome,
  FiInfo,
  FiPhone,
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
      // Check if click is on a dropdown toggle button
      const isDropdownToggle = event.target.closest('[data-dropdown-toggle]');
      
      if (isDropdownToggle) {
        return; // Don't close dropdowns if clicking toggle buttons
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
    { name: t('header.buyMenu.browseInventory'), icon: <FiShoppingCart className="text-[#3b396d]" />, href: '/buy/inventory' },
    { name: t('header.buyMenu.directBuy'), icon: <FiTag className="text-[#3b396d]" />, href: '/buy/direct' },
    { name: t('header.buyMenu.auctions'), icon: <FiTag className="text-[#3b396d]" />, href: '/buy/auctions' }
  ];

  const sellMenuItems = [
    { name: t('header.sellMenu.sellYourCar'), icon: <FiTag className="text-[#3b396d]" />, href: '/sell/car' },
    { name: t('header.sellMenu.pricingGuide'), icon: <FiTag className="text-[#3b396d]" />, href: '/sell/pricing' },
    { name: t('header.sellMenu.evaApp'), icon: <FiTag className="text-[#3b396d]" />, href: '/sell/eva-app' }
  ];

  const mainMenuItems = [
    { name: t('header.mainMenu.buyCars'), icon: <FiShoppingCart className="text-[#3b396d]" />, href: '/buy', hasDropdown: true, key: 'buy' },
    { name: t('header.mainMenu.sellCars'), icon: <FiTag className="text-[#3b396d]" />, href: '/sell', hasDropdown: true, key: 'sell' },
    { name: t('header.mainMenu.aboutUs'), icon: <FiInfo className="text-[#3b396d]" />, href: '/about' },
    { name: t('header.mainMenu.contact'), icon: <FiPhone className="text-[#3b396d]" />, href: '/contact' },
  ];

  // Check if current route is active
  const isActiveRoute = (href) => {
    if (href === '/home') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname.startsWith(href);
  };

  // Toggle mobile dropdowns with event stop propagation
  const toggleMobileDropdown = (dropdownKey, e) => {
    e?.stopPropagation(); // Prevent event from bubbling up
    setMobileDropdownStates(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  // Toggle desktop dropdowns with event stop propagation
  const toggleDesktopDropdown = (dropdownKey, e) => {
    e?.stopPropagation(); // Prevent event from bubbling up
    
    // Close the other dropdown
    const otherKey = dropdownKey === 'buy' ? 'sell' : 'buy';
    setDesktopDropdownStates(prev => ({
      ...prev,
      [otherKey]: false,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  // Handle navigation for menu items
  const handleNavigation = (path, e) => {
    e?.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
    setDesktopDropdownStates({ buy: false, sell: false });
  };

  // Handle sub-menu navigation
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
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 bg-white py-3 ${scrolled ? 'shadow-md' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/home')}
                className="flex items-center focus:outline-none"
              >
                <img src="/logo.svg" alt="CarNetwork" className="h-8 md:h-9" />
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
                        className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                          isActiveRoute(item.href) 
                            ? 'text-[#3b396d]' 
                            : 'text-gray-600 hover:text-[#3b396d]'
                        }`}
                      >
                        {item.name}
                        <FiChevronDown className={`ml-1 transition-transform ${
                          desktopDropdownStates[item.key] ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {desktopDropdownStates[item.key] && (
                        <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-1">
                            {item.key === 'buy' ? (
                              buyMenuItems.map((subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={(e) => handleSubNavigation(subItem.href, 'buy', e)}
                                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] transition-colors w-full text-left"
                                >
                                  <span className="mr-3">{subItem.icon}</span>
                                  {subItem.name}
                                </button>
                              ))
                            ) : (
                              sellMenuItems.map((subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={(e) => handleSubNavigation(subItem.href, 'sell', e)}
                                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] transition-colors w-full text-left"
                                >
                                  <span className="mr-3">{subItem.icon}</span>
                                  {subItem.name}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={(e) => handleNavigation(item.href, e)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        isActiveRoute(item.href) 
                          ? 'text-[#3b396d]' 
                          : 'text-gray-600 hover:text-[#3b396d]'
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
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-[#3b396d] transition-colors"
                >
                  <FiGlobe className="mr-1 text-[#3b396d]" />
                  <span className="hidden md:inline">{getLanguageName(language)}</span>
                  <FiChevronDown className={`ml-1 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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
                              ? 'text-[#3b396d] bg-[#f8f9ff]' 
                              : 'text-gray-700 hover:bg-[#f8f9ff]'
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
                    className="flex items-center text-sm text-gray-600 hover:text-[#3b396d] transition-colors"
                  >
                    <FiUser className="mr-1 text-[#3b396d]" />
                    <span className="truncate max-w-[100px] hidden lg:inline">{user.name}</span>
                    <FiChevronDown className={`ml-1 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d]"
                        >
                          {t('header.userMenu.dashboard')}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/profile');
                            setUserDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d]"
                        >
                          {t('header.userMenu.profile')}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            logout();
                            setUserDropdownOpen(false);
                            navigate('/');
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d]"
                        >
                          <FiLogOut className="mr-2 text-[#3b396d]" />
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
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#3b396d] transition-colors"
                  >
                    {t('navigation.login')}
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#3b396d] rounded-lg hover:bg-[#2a285a] transition-colors"
                  >
                    {t('navigation.signup')}
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 rounded-md text-[#3b396d] hover:bg-gray-100 focus:outline-none transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
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
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="h-8 w-auto">
                <button 
                  onClick={() => navigate('/home')}
                  className="focus:outline-none"
                >
                  <img src="/logo.svg" alt="CarNetwork" className="h-8" />
                </button>
              </div>
              <button 
                className="p-2 rounded-md text-gray-700 hover:text-[#3b396d]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <div className="space-y-1">
                {mainMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.hasDropdown ? (
                      <>
                        <button 
                          data-dropdown-toggle="true"
                          onClick={(e) => toggleMobileDropdown(item.key, e)}
                          className="flex justify-between items-center w-full py-3 px-4 rounded-lg font-medium text-gray-900 hover:bg-[#f8f9ff]"
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                          </div>
                          <FiChevronDown className={`transition-transform ${
                            mobileDropdownStates[item.key] ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {mobileDropdownStates[item.key] && (
                          <div className="pl-12 mt-1 space-y-1">
                            {item.key === 'buy' ? (
                              buyMenuItems.map((subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubNavigation(subItem.href, 'buy', e);
                                  }}
                                  className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] font-medium w-full text-left"
                                >
                                  <span className="mr-3">{subItem.icon}</span>
                                  {subItem.name}
                                </button>
                              ))
                            ) : (
                              sellMenuItems.map((subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubNavigation(subItem.href, 'sell', e);
                                  }}
                                  className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] font-medium w-full text-left"
                                >
                                  <span className="mr-3">{subItem.icon}</span>
                                  {subItem.name}
                                </button>
                              ))
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={(e) => handleNavigation(item.href, e)}
                        className={`flex items-center py-3 px-4 rounded-lg font-medium transition-colors w-full text-left ${
                          isActiveRoute(item.href)
                            ? 'text-[#3b396d] bg-[#f8f9ff]'
                            : 'text-gray-900 hover:bg-[#f8f9ff]'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                {/* Language Selector Mobile */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900">{t('header.language')}</span>
                    <div className="flex space-x-2">
                      {supportedLanguages.map((langCode) => (
                        <button
                          key={langCode}
                          onClick={() => {
                            setLanguage(langCode);
                          }}
                          className={`px-3 py-1.5 text-xs rounded-full ${
                            language === langCode 
                              ? 'bg-[#3b396d] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-[#f8f9ff]'
                          }`}
                        >
                          {langCode.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-[#f8f9ff] rounded-lg" onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}>
                      <FiUser className="text-[#3b396d] text-xl mr-3" />
                      <div className="truncate">
                        <p className="font-medium text-gray-900">{t('header.welcome')}</p>
                        <p className="text-gray-700 truncate text-sm">{user.name}</p>
                      </div>
                    </div>
                    <button
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-[#3b396d] rounded-lg hover:bg-[#2a285a] transition-colors"
                      onClick={() => {
                        logout();
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FiLogOut className="mr-2" />
                      {t('logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <button 
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('navigation.login')}
                    </button>
                    <button 
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-[#3b396d] rounded-lg hover:bg-[#2a285a] transition-colors"
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('navigation.signup')}
                    </button>
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