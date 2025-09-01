// src/components/common/Header.jsx
import React, { useState, useEffect, useRef, use } from 'react';
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
  FiTag,
  FiHome,
  FiInfo,
  FiPhone,
  FiHelpCircle
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { t, language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();
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
const navigate=useNavigate();
  const buyMenuItems = [
    { name: t('header.buyMenu.browseInventory'), icon: <FiShoppingCart className="text-orange-500" />, href: '/buy/inventory' },
    { name: t('header.buyMenu.directBuy'), icon: <FiTag className="text-orange-500" />, href: '/buy/direct' },
    { name: t('header.buyMenu.auctions'), icon: <FiTag className="text-orange-500" />, href: '/buy/auctions' }
  ];

  const sellMenuItems = [
    { name: t('header.sellMenu.sellYourCar'), icon: <FiTag className="text-orange-500" />, href: '/sell/car' },
    { name: t('header.sellMenu.pricingGuide'), icon: <FiTag className="text-orange-500" />, href: '/sell/pricing' },
    { name: t('header.sellMenu.evaApp'), icon: <FiTag className="text-orange-500" />, href: '/sell/eva-app' }
  ];

  const mainMenuItems = [
    { name: t('header.mainMenu.home'), icon: <FiHome className="text-orange-500" />, href: '/home' },
    { name: t('header.mainMenu.buyCars'), icon: <FiShoppingCart className="text-orange-500" />, href: '/buy', hasDropdown: true },
    { name: t('header.mainMenu.sellCars'), icon: <FiTag className="text-orange-500" />, href: '/sell', hasDropdown: true },
    { name: t('header.mainMenu.aboutUs'), icon: <FiInfo className="text-orange-500" />, href: '/about' },
    { name: t('header.mainMenu.contact'), icon: <FiPhone className="text-orange-500" />, href: '/contact' },
    { name: t('header.mainMenu.help'), icon: <FiHelpCircle className="text-orange-500" />, href: '/help' }
  ];

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header 
        className='fixed w-full z-[100] transition-all duration-300 bg-white shadow-sm py-3'
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/home">
                <img src="/logo.svg" alt="CarNetwork" className="h-8 md:h-10" />
              </a>
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
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                >
                  {t('header.mainMenu.buyCars')}
                  <FiChevronDown className={`ml-1 transition-transform ${buyDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {buyDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {buyMenuItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <span className="mr-3">{item.icon}</span>
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
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                >
                  {t('header.mainMenu.sellCars')}
                  <FiChevronDown className={`ml-1 transition-transform ${sellDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {sellDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {sellMenuItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Static Menu Items */}
              {mainMenuItems
                .filter(item => !item.hasDropdown)
                .map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
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
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <FiGlobe className="mr-1 text-orange-500" />
                  {getLanguageName(language)}
                  <FiChevronDown className={`ml-1 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {supportedLanguages.map((langCode) => (
                        <button
                          key={langCode}
                          onClick={() => {
                            setLanguage(langCode);
                            setLanguageDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === langCode 
                              ? 'text-orange-600 bg-orange-50' 
                              : 'text-gray-700 hover:bg-orange-50'
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
                    onClick={() => {
                      setUserDropdownOpen(!userDropdownOpen);
                      setLanguageDropdownOpen(false);
                    }}
                    className="flex items-center text-sm text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <FiUser className="mr-1 text-orange-500" />
                    <span className="truncate max-w-[120px]">{user.name}</span>
                    <FiChevronDown className={`ml-1 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                          {t('header.userMenu.dashboard')}
                        </a>
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                          {t('header.userMenu.profile')}
                        </a>
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                        >
                          <FiLogOut className="mr-2 text-orange-500" />
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
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    onClick={() => navigate('/login')}
                  >
                    {t('navigation.login')}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => navigate('/register')}
                  >
                    {t('navigation.signup')}
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 rounded-md text-orange-600 focus:outline-none transition-colors"
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
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="h-8 w-auto">
                <img src="./logo.svg" alt="CarNetwork" className="h-8" />
              </div>
              <button 
                className="p-2 rounded-md text-gray-700 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <div className="space-y-2">
                {mainMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.hasDropdown ? (
                      <>
                        <button 
                          onClick={() => {
                            if (item.name === t('header.mainMenu.buyCars')) {
                              setBuyDropdownOpen(!buyDropdownOpen);
                              setSellDropdownOpen(false);
                            } else {
                              setSellDropdownOpen(!sellDropdownOpen);
                              setBuyDropdownOpen(false);
                            }
                          }}
                          className="flex justify-between items-center w-full py-2 px-4 rounded-xl font-semibold text-gray-900 hover:bg-orange-50"
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                          </div>
                          <FiChevronDown className={`transition-transform ${
                            (item.name === t('header.mainMenu.buyCars') && buyDropdownOpen) || 
                            (item.name === t('header.mainMenu.sellCars') && sellDropdownOpen) 
                              ? 'rotate-180' 
                              : ''
                          }`} />
                        </button>
                        
                        {item.name === t('header.mainMenu.buyCars') && buyDropdownOpen && (
                          <div className="pl-12 mt-1 space-y-1">
                            {buyMenuItems.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="mr-3">{subItem.icon}</span>
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                        
                        {item.name === t('header.mainMenu.sellCars') && sellDropdownOpen && (
                          <div className="pl-12 mt-1 space-y-1">
                            {sellMenuItems.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="mr-3">{subItem.icon}</span>
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="flex items-center py-2 px-4 rounded-xl font-semibold text-gray-900 hover:bg-orange-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-3 mt-3 border-t border-gray-200">
                {/* Language Selector Mobile */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-gray-900">{t('header.language')}</span>
                    <div className="flex space-x-2">
                      {supportedLanguages.map((langCode) => (
                        <button
                          key={langCode}
                          onClick={() => {
                            setLanguage(langCode);
                          }}
                          className={`px-4 py-2 text-base rounded-full text-sm ${
                            language === langCode 
                              ? 'bg-orange-500 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
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
                    <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                      <FiUser className="text-orange-500 text-xl mr-3" />
                      <div className="truncate">
                        <p className="font-semibold text-gray-900">{t('header.welcome')}</p>
                        <p className="text-gray-700 truncate">{user.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-lg flex items-center justify-center"
                    >
                      <FiLogOut className="mr-2" />
                      {t('logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 py-2"
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('navigation.login')}
                    </Button>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2"
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('navigation.signup')}
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
