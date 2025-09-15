// src/components/seller/SellerHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { 
  FiBell, 
  FiX, 
  FiChevronLeft, 
  FiUser, 
  FiLogOut,
  FiMessageSquare,
  FiHeadphones,
  FiMenu,
  FiGlobe
} from 'react-icons/fi';
import SearchBar from './SearchBar'; 

const SellerHeader = ({ 
  setChatOpen,
  searchTerm,
  setSearchTerm,
  setActiveTab, // This is important for switching tabs
  onCarSelect 
}) => {
  const { t, language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [agentChatOpen, setAgentChatOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  
  const dropdownRefs = {
    notifications: useRef(null),
    user: useRef(null),
    agent: useRef(null),
    language: useRef(null)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (key === 'notifications') setNotificationsOpen(false);
          if (key === 'user') setUserDropdownOpen(false);
          if (key === 'agent') setAgentChatOpen(false);
          if (key === 'language') setLanguageDropdownOpen(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getBasePath = () => {
    const pathParts = location.pathname.split('/').filter(p => p);
    if (supportedLanguages.includes(pathParts[0])) {
      return `/${pathParts[0]}`;
    }
    return ''; 
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <div className="flex items-center mr-6">
                <button 
                  onClick={() => navigate('/')} // Navigate to home
                  className="flex items-center focus:outline-none"
                  aria-label={t('navigation.home') || "Go to home page"}
                >
                  {/* Replace with your actual logo path */}
                  <img 
                    src="/logo.svg" 
                    alt={t('navigation.logoAlt') || "CarNetwork Logo"} 
                    className="h-8 w-auto"
                  />
                </button>
              </div>
              
              <div className="hidden md:block w-96 lg:w-[36rem] xl:w-[42rem]">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onSearch={setSearchTerm} 
                  onCarSelect={onCarSelect} 
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block" ref={dropdownRefs.language}>
                <button 
                  onClick={() => {
                    setLanguageDropdownOpen(!languageDropdownOpen);
                    setNotificationsOpen(false);
                    setUserDropdownOpen(false);
                    setAgentChatOpen(false);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-[#3b396d] transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2"
                  aria-haspopup="true"
                  aria-expanded={languageDropdownOpen}
                  aria-label={t('navigation.changeLanguage') || "Change language"}
                >
                  <FiGlobe className="mr-1 text-[#3b396d]" />
                  <span className="hidden md:inline">{getLanguageName(language)}</span>
                  <FiChevronLeft className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    languageDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {languageDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1">
                    {supportedLanguages.map((langCode) => (
                      <button
                        key={langCode}
                        onClick={() => {
                          setLanguage(langCode);
                          setLanguageDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === langCode 
                            ? 'text-[#3b396d] bg-[#f8f9ff] font-medium' 
                            : 'text-gray-700 hover:bg-[#f8f9ff]'
                        }`}
                      >
                        {getLanguageName(langCode)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative" ref={dropdownRefs.notifications}>
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUserDropdownOpen(false);
                    setAgentChatOpen(false);
                    setLanguageDropdownOpen(false);
                  }}
                  className="p-2 text-gray-500 hover:text-[#3b396d] rounded-full hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2"
                  aria-haspopup="true"
                  aria-expanded={notificationsOpen}
                  aria-label={t('navigation.notifications') || "Notifications"}
                >
                  <FiBell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                </button>
                
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">{t('notifications.title') || 'Notifications'}</h3>
                        <button 
                          onClick={() => setNotificationsOpen(false)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                          aria-label={t('common.close') || "Close"}
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f9ff]">
                          <p className="font-medium text-[#3b396d]">{t('notifications.newBid', { car: 'BMW X5 (STK2023-001)' }) || 'New bid on your BMW X5 (STK2023-001)'}</p>
                          <p className="text-gray-500 text-xs mt-1">{t('notifications.timeAgo', { time: '2 hours' }) || '2 hours ago'}</p>
                        </a>
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f9ff] bg-[#f8f9ff]">
                          <p className="font-medium text-[#3b396d]">{t('notifications.carSold', { car: 'Audi A6 (STK2023-002)' }) || 'Your Audi A6 (STK2023-002) has been sold!'}</p>
                          <p className="text-gray-500 text-xs mt-1">{t('notifications.timeAgo', { time: '1 day' }) || '1 day ago'}</p>
                        </a>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200 text-center">
                        <a href="#" className="text-sm font-medium text-[#3b396d] hover:text-[#2a285a]">
                          {t('notifications.viewAll') || 'View all'}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={dropdownRefs.agent}>
                <button
                  onClick={() => {
                    setAgentChatOpen(!agentChatOpen);
                     setNotificationsOpen(false);
                     setUserDropdownOpen(false);
                     setLanguageDropdownOpen(false);
                  }}
                  className="p-2 text-gray-500 hover:text-[#3b396d] rounded-full hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2"
                  aria-haspopup="true"
                  aria-expanded={agentChatOpen}
                  aria-label={t('support.chatWithAgent') || "Chat with agent"}
                >
                  <FiHeadphones className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white animate-pulse"></span>
                </button>
                
                {agentChatOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">{t('support.agentChat') || 'Chat with Agent'}</h3>
                        <button 
                          onClick={() => setAgentChatOpen(false)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                          aria-label={t('common.close') || "Close"}
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-4 text-center">
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#3b396d] flex items-center justify-center text-white">
                            <FiHeadphones className="h-6 w-6" />
                          </div>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          {t('support.availableAgents') || 'Available Agents'}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          {t('support.chatDescription') || 'Connect with our support team for immediate assistance.'}
                        </p>
                        <button
                          onClick={() => {
                            const basePath = getBasePath();
                            navigate(`${basePath}/contact`);
                            setAgentChatOpen(false);
                          }}
                          className="w-full px-4 py-2 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                        >
                          {t('support.startChat') || 'Start Chat'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setChatOpen(true);
                  setNotificationsOpen(false);
                  setUserDropdownOpen(false);
                  setAgentChatOpen(false);
                  setLanguageDropdownOpen(false);
                }}
                className="p-2 text-gray-500 hover:text-[#3b396d] rounded-full hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2"
                aria-label={t('navigation.messages') || "Messages"}
              >
                <FiMessageSquare className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-400 ring-2 ring-white"></span>
              </button>

              <div className="relative" ref={dropdownRefs.user}>
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    // Close other dropdowns
                    setNotificationsOpen(false);
                    setAgentChatOpen(false);
                    setLanguageDropdownOpen(false);
                  }}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                  aria-label={t('profile.viewProfile') || "View profile"}
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#3b396d] flex items-center justify-center text-white overflow-hidden">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={t('profile.avatarAlt') || "User avatar"} 
                        className="w-full h-full object-cover"
                      />
                    ) : user?.name ? (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    ) : (
                      <FiUser className="w-4 h-4" />
                    )}
                  </div>
                </button>
                
                {/* Profile Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.name || t('profile.user') || 'User'}
                      </p>
                      {user?.email && (
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>

                    {/* Profile Link - Changed to use setActiveTab instead of navigate */}
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false); // Close dropdown
                        setActiveTab('profile'); // Switch to profile tab
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] transition-colors"
                    >
                      <FiUser className="mr-2 h-4 w-4 text-[#3b396d]" />
                      {t('header.userMenu.profile') || 'Profile'}
                    </button>

                  

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-1"></div>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false); // Close dropdown first
                        handleLogout(); // Then handle logout
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] transition-colors focus:outline-none"
                    >
                      <FiLogOut className="mr-2 h-4 w-4 text-[#3b396d]" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 rounded-md text-[#3b396d] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? t('navigation.closeMenu') || "Close menu" : t('navigation.openMenu') || "Open menu"}
              >
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to push content below fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default SellerHeader;