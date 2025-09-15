// src/components/seller/SellerSidebar.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
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
  FiChevronRight
} from 'react-icons/fi';

const SellerSidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const topItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome className="h-5 w-5" /> },
    { id: 'inventory', label: t('sellerDashboard.sidebar.inventory') || 'My Inventory', icon: <FiPackage className="h-5 w-5" /> },
    { id: 'add', label: t('sellerDashboard.sidebar.addVehicle') || 'Add Vehicle', icon: <FiPlus className="h-5 w-5" /> },
    { id: 'buy', label: t('sellerDashboard.sidebar.buyCar') || 'Buy Cars', icon: <FiShoppingCart className="h-5 w-5" /> },
    { id: 'auctions', label: t('sellerDashboard.sidebar.myAuctions') || 'My Auctions', icon: <FiBarChart2 className="h-5 w-5" /> },
    { id: 'sales', label: t('sellerDashboard.sidebar.sales') || 'Sales & Transactions', icon: <FiDollarSign className="h-5 w-5" /> },
    { id: 'messages', label: t('sellerDashboard.sidebar.messages') || 'Messages', icon: <FiMessageSquare className="h-5 w-5" /> }
  ];

  const bottomItems = [
    { id: 'settings', label: t('sellerDashboard.sidebar.settings') || 'Settings', icon: <FiSettings className="h-5 w-5" /> },
    { id: 'logout', label: t('logout') || 'Logout', icon: <FiLogOut className="h-5 w-5" /> }
  ];

  const handleItemClick = (itemId) => {
    switch (itemId) {
      case 'logout':
        alert(t('sellerDashboard.logoutAlert') || 'Logging out...');
        return;
      default:
        setActiveTab(itemId);
        return;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`h-full bg-[#3b396d] text-white flex flex-col transition-all duration-300`}>
      {/* Top Section - Main Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-3">
          {topItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
              } ${sidebarOpen ? 'px-4 py-3' : 'justify-center h-12'}`}
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

      {/* Bottom Section */}
      <div className="p-3 border-t border-[#2a285a]">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
              } ${sidebarOpen ? 'px-4 py-3' : 'justify-center h-12'}`}
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
            className={`w-full flex items-center rounded-lg transition-all duration-200 text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 ${
              sidebarOpen ? 'px-4 py-3' : 'justify-center h-12'
            }`}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            <span className="flex-shrink-0">
              {sidebarOpen ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
            </span>
            {sidebarOpen && (
              <span className="ml-3 text-sm font-medium">
                Collapse
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar;