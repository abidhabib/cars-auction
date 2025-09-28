// src/components/seller/SellerSidebar.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext'; // For logout
import { 
  FiHome, 
  FiPackage, 
  FiBarChart2, 
  FiDollarSign, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut,
  FiShoppingCart,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiUser
} from 'react-icons/fi';

const SellerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useLanguage();
  const { logout } = useAuth(); // Assuming you have a logout function in AuthContext
  const location = useLocation();
  const navigate = useNavigate();

  // Map sidebar items to routes
  const topItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome className="h-5 w-5" />, path: '/Dashboard' },
    { id: 'inventory', label: t('sellerDashboard.sidebar.inventory') || 'My Inventory', icon: <FiPackage className="h-5 w-5" />, path: '/Dashboard/inventory' },
    { id: 'add', label: t('sellerDashboard.sidebar.addVehicle') || 'Add Vehicle', icon: <FiPlus className="h-5 w-5" />, path: '/Dashboard/add' },
    { id: 'buy', label: t('sellerDashboard.sidebar.buyCar') || 'Buy Cars', icon: <FiShoppingCart className="h-5 w-5" />, path: '/Dashboard/buy' },
    { id: 'messages', label: t('sellerDashboard.sidebar.messages') || 'Messages', icon: <FiMessageSquare className="h-5 w-5" />, path: '/Dashboard/messages' }
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="h-5 w-5" />, path: '/Dashboard/profile' },
    { id: 'settings', label: t('sellerDashboard.sidebar.settings') || 'Settings', icon: <FiSettings className="h-5 w-5" />, path: '/Dashboard/settings' },
    { id: 'logout', label: t('logout') || 'Logout', icon: <FiLogOut className="h-5 w-5" /> }
  ];

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      if (window.confirm(t('sellerDashboard.logoutConfirm') || 'Are you sure you want to log out?')) {
        logout();
        // AuthProvider should handle redirect to /login
      }
      return;
    }

    // Navigate to the route
    navigate(item.path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper: Check if current path matches item path (exact match)
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${sidebarOpen ? 'p-4' : 'p-2'}`}>
      <div className="bg-[#3b396d] text-white rounded-2xl shadow-lg h-full flex flex-col">
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-2">
            {topItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center transition-all duration-200 rounded-xl ${
                  isActive(item.path)
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
                } ${sidebarOpen ? 'px-4 py-3' : 'justify-center h-12 mx-auto'}`}
                title={sidebarOpen ? '' : item.label}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-3 border-t border-[#2a285a]">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center transition-all duration-200 rounded-xl ${
                  item.path && isActive(item.path)
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
                } ${sidebarOpen ? 'px-4 py-3' : 'justify-center h-12 mx-auto'}`}
                title={sidebarOpen ? '' : item.label}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
            
            {/* Collapse/Expand Button */}
            <button
              onClick={toggleSidebar}
              className={`w-full flex items-center transition-all duration-200 rounded-xl text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 ${
                sidebarOpen ? 'px-4 py-3' : 'justify-center h-12 mx-auto'
              }`}
              title={sidebarOpen ? (t('sidebar.collapse') || 'Collapse') : (t('sidebar.expand') || 'Expand')}
            >
              <span className="flex-shrink-0">
                {sidebarOpen ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
              </span>
              {sidebarOpen && (
                <span className="ml-3 text-sm font-medium">
                  {t('sidebar.collapse') || 'Close'}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar; 