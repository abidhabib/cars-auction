// src/components/seller/SellerSidebar.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
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
  FiUser,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

const SellerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // State to control inventory submenu
  const [inventoryExpanded, setInventoryExpanded] = useState(() => {
    return location.pathname.startsWith('/Dashboard/inventory');
  });

  const topItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome className="h-5 w-5" />, path: '/Dashboard' },
    {
      id: 'inventory',
      label: t('sellerDashboard.sidebar.inventory') || 'My Inventory',
      icon: <FiPackage className="h-5 w-5" />,
      hasSubmenu: true,
      submenu: [
        { id: 'all', label: t('sellerDashboard.sidebar.allInventory') || 'All Inventory', path: '/Dashboard/inventory' },
        { id: 'biddings', label: t('sellerDashboard.sidebar.runningAuctions') || 'Running Auctions', path: '/Dashboard/inventory/award' }
      ]
    },
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
      }
      return;
    }

    if (item.hasSubmenu) {
      setInventoryExpanded(!inventoryExpanded);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isInventoryActive = location.pathname.startsWith('/Dashboard/inventory');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${sidebarOpen ? 'p-4' : 'p-2'}`}>
      <div className="bg-[#3b396d] text-white rounded-2xl shadow-lg h-full flex flex-col">
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-2">
            {topItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between transition-all duration-200 rounded-xl ${
                    (isInventoryActive && item.id === 'inventory') || isActive(item.path)
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
                  } ${sidebarOpen ? 'px-4 py-3' : 'justify-center h-12 mx-auto'}`}
                  title={sidebarOpen ? '' : item.label}
                >
                  <span className="flex items-center">
                    <span className="flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                  </span>
                  {sidebarOpen && item.hasSubmenu && (
                    <span>{inventoryExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}</span>
                  )}
                </button>

                {/* Submenu */}
                {item.hasSubmenu && inventoryExpanded && sidebarOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => navigate(sub.path)}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          isActive(sub.path)
                            ? 'bg-white bg-opacity-20 text-white'
                            : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
              </button>
            ))}

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