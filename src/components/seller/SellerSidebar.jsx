import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiPackage,
  FiBarChart2,
  FiDollarSign,
  FiMessageSquare,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const SidebarItem = ({ item, isActive, isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-[#3b396d] text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      } ${!isOpen ? 'justify-center' : ''}`}
      title={!isOpen ? item.label : ''}
      aria-label={!isOpen ? item.label : undefined}
    >
      <span className={`${isOpen ? 'mr-3' : ''} flex-shrink-0`}>{item.icon}</span>
      {isOpen && <span className="truncate">{item.label}</span>}
    </button>
  );
};

const SellerSidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome /> },
    { id: 'inventory', label: t('sellerDashboard.sidebar.inventory') || 'My Inventory', icon: <FiPackage /> },
    { id: 'auctions', label: t('sellerDashboard.sidebar.myAuctions') || 'My Auctions', icon: <FiBarChart2 /> },
    { id: 'sales', label: t('sellerDashboard.sidebar.sales') || 'Sales & Transactions', icon: <FiDollarSign /> },
    { id: 'messages', label: t('sellerDashboard.sidebar.messages') || 'Messages', icon: <FiMessageSquare /> },
    { id: 'analytics', label: t('sellerDashboard.sidebar.analytics') || 'Analytics', icon: <FiPieChart /> },
    { id: 'settings', label: t('sellerDashboard.sidebar.settings') || 'Settings', icon: <FiSettings /> }
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    alert(t('sellerDashboard.logoutAlert') || 'Logging out...');
  };

  return (
    <>
      {/* Sidebar - Fixed positioning and responsive behavior */}
      <div
        className={`fixed top-16 inset-y-0 left-0 z-40 bg-white shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200 ${
          isOpen 
            ? 'w-64 translate-x-0' 
            : 'w-20 -translate-x-full md:-translate-x-0'  // Completely hide on mobile when collapsed
        } flex flex-col md:static md:translate-x-0 md:inset-0`}
      >
        {/* Top Section */}
        <div className={`flex items-center h-14 px-4 border-b border-gray-200 ${!isOpen ? 'justify-center' : 'justify-center'}`}>
          {isOpen ? (
            <div className="flex items-center">
              <img
                className="h-6 w-auto"
                src="/icon.svg"
                alt="Car Network Logo"
              />
              <span className="ml-2 text-xl font-bold text-[#3b396d] truncate">Managment</span>
            </div>
          ) : (
            <div className="flex items-center justify-center   rounded-lg">
            <img src="./icon.svg" alt="" width={30} />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                isOpen={isOpen}
                onClick={() => handleItemClick(item.id)}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 ${
              !isOpen ? 'justify-center' : ''
            } mb-3`}
            title={!isOpen ? (t('logout') || 'Logout') : ''}
            aria-label={!isOpen ? (t('logout') || 'Logout') : undefined}
          >
            <FiLogOut className={`${isOpen ? 'mr-3 h-5 w-5' : 'h-5 w-5'}`} />
            {isOpen && <span>{t('logout') || 'Logout'}</span>}
          </button>
        </div>
      </div>

      {/* Toggle Button - Fixed positioning */}
      <button
        type="button"
        onClick={toggleSidebar}
        className={`fixed bottom-4 z-50 flex items-center justify-center p-2.5 text-gray-600 bg-white hover:bg-gray-100 rounded-lg shadow-lg transition-all duration-200 group border border-gray-200 ${
          isOpen 
            ? 'left-64 md:left-64' 
            : 'left-6 md:left-6'
        }`}
        aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        <div className="relative">
          {isOpen ? (
            <FiChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          ) : (
            <FiChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          )}
        </div>
      </button>

      {/* Mobile Overlay - Only show on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default SellerSidebar;