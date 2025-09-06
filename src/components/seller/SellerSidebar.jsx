// src/components/seller/SellerSidebar.jsx
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
  FiX as FiCloseMenu,
  FiMenu
} from 'react-icons/fi';

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
    if (window.innerWidth < 768) { // MD breakpoint
        toggleSidebar();
    }
  };

  const handleLogout = () => {
    alert(t('sellerDashboard.logoutAlert') || 'Logging out...');
    // Implement actual logout logic here
    // logout();
    // navigate('/login');
  };

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 bg-white shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiCloseMenu className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              className="h-6 w-auto"
              src="/icon.svg" // Make sure you have this or use a placeholder
              alt="Car Network Logo"
            />
            <span className="ml-2 text-xl font-bold text-[#3b396d]">Seller Hub</span>
          </div>
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <FiCloseMenu className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === item.id
                    ? 'bg-[#3b396d] text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            {t('logout') || 'Logout'}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SellerSidebar;