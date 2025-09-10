import React, { useState } from 'react';
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
          ? 'bg-[#3b396d] text-white'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      } ${!isOpen ? 'justify-center' : ''}`}
      title={!isOpen ? item.label : ''}
      aria-label={!isOpen ? item.label : undefined}
    >
      <span className={`${isOpen ? 'mr-3' : ''}`}>{item.icon}</span>
      {isOpen && <span>{item.label}</span>}
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
    // Implement actual logout logic here
    // logout();
    // navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 bg-white shadow-md md:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {isOpen ? <FiChevronLeft className="h-6 w-6" /> : <FiChevronRight className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-16 inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-0'
        }`}
      >
   

        <div className="flex-1 overflow-y-auto">
          <nav className="py-4 space-y-1">
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

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 ${
              !isOpen ? 'justify-center' : ''
            }`}
            title={!isOpen ? (t('logout') || 'Logout') : ''}
            aria-label={!isOpen ? (t('logout') || 'Logout') : undefined}
          >
            <FiLogOut className={`${isOpen ? 'mr-3 h-5 w-5' : 'h-5 w-5'}`} />
            {isOpen && <span>{t('logout') || 'Logout'}</span>}
          </button>
        </div>
      </div>

     
      {/* Mobile Overlay */}
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