// src/components/seller/SellerSidebar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome,
  FiPackage,
  FiMessageSquare,
  FiLogOut,
  FiShoppingCart,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

const SellerSidebar = ({ sidebarOpen: externalSidebarOpen, setSidebarOpen }) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const sidebarOpen = isMobile ? externalSidebarOpen : externalSidebarOpen;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [inventoryExpanded, setInventoryExpanded] = useState(() =>
    location.pathname.startsWith('/Dashboard/inventory')
  );

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
      if (isMobile && setSidebarOpen) setSidebarOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isInventoryActive = location.pathname.startsWith('/Dashboard/inventory');

  return (
    <div className="h-full flex flex-col transition-all duration-300 ease-in-out">
      <div className="h-full bg-[#3b396d] text-white rounded-2xl shadow-lg flex flex-col">
        <nav className="flex-1 py-6 overflow-y-auto px-2">
          <div className="space-y-1">
            {topItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  aria-expanded={item.hasSubmenu ? inventoryExpanded : undefined}
                  aria-controls={item.hasSubmenu ? "inventory-submenu" : undefined}
                  className={`w-full flex items-center transition-all duration-200 rounded-xl group 
                    ${(isInventoryActive && item.id === 'inventory') || isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    } ${sidebarOpen ? 'px-4 py-3 justify-between' : 'justify-center w-10 h-10 mx-auto'}`}
                >
                  <span className="flex items-center">
                    <span className="flex-shrink-0">{item.icon}</span>
                    {(sidebarOpen || !isMobile) && (
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    )}
                  </span>
                  {(sidebarOpen || isMobile) && item.hasSubmenu && (
                    <span className="text-white/80 group-hover:text-white">
                      {inventoryExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
                    </span>
                  )}
                </button>
                {/* Only render submenu if it should be visible */}
                {item.hasSubmenu && inventoryExpanded && (
                  <div id="inventory-submenu" className="mt-1 space-y-1">
                    {item.submenu.map((sub, index) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          navigate(sub.path);
                          if (isMobile && setSidebarOpen) setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors 
                          ${isActive(sub.path)
                            ? "bg-white/20 text-white"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                          } ${isMobile?"justify-center":""}`}
                      >
                        <span className="flex-shrink-0">
                          {index === 0 ? <FiPackage className="h-4 w-4" /> : <FiShoppingCart className="h-4 w-4" />}
                        </span>
                        {/* Show label on desktop OR when sidebar is open on mobile */}
                        {(sidebarOpen || !isMobile) && <span className="ml-3">{sub.label}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="pt-3 mt-auto border-t border-gray-600/50 px-3">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center transition-all duration-200 rounded-xl ${
                  item.path && isActive(item.path)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                } ${sidebarOpen ? 'px-4 py-3' : 'justify-center w-10 h-10 mx-auto'}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {(sidebarOpen || !isMobile) && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}

            {!isMobile && (
              <button
                onClick={() => setSidebarOpen?.(!externalSidebarOpen)}
                className={`w-full flex items-center transition-all duration-200 rounded-xl text-white/80 hover:text-white hover:bg-white/10 ${
                  sidebarOpen ? 'px-4 py-3' : 'justify-center w-10 h-10 mx-auto'
                }`}
              >
                <span className="flex-shrink-0">
                  {sidebarOpen ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
                </span>
                {sidebarOpen && <span className="ml-3 text-sm font-medium">Close</span>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar;