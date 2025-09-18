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
  FiChevronRight,
  FiUser, // Import FiUser for Profile
  FiArrowLeftCircle
} from 'react-icons/fi';

const SellerSidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const topItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome className="h-5 w-5" /> },
    { id: 'inventory', label: t('sellerDashboard.sidebar.inventory') || 'My Inventory', icon: <FiPackage className="h-5 w-5" /> },
    { id: 'add', label: t('sellerDashboard.sidebar.addVehicle') || 'Add Vehicle', icon: <FiPlus className="h-5 w-5" /> },
    { id: 'buy', label: t('sellerDashboard.sidebar.buyCar') || 'Buy Cars', icon: <FiShoppingCart className="h-5 w-5" /> },
    // { id: 'auctions', label: t('sellerDashboard.sidebar.myAuctions') || 'My Auctions', icon: <FiBarChart2 className="h-5 w-5" /> },
    // { id: 'sales', label: t('sellerDashboard.sidebar.sales') || 'Sales & Transactions', icon: <FiDollarSign className="h-5 w-5" /> },
    { id: 'messages', label: t('sellerDashboard.sidebar.messages') || 'Messages', icon: <FiMessageSquare className="h-5 w-5" /> }
  ];

  // Add Profile to bottom items
  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="h-5 w-5" /> },
    { id: 'settings', label: t('sellerDashboard.sidebar.settings') || 'Settings', icon: <FiSettings className="h-5 w-5" /> },
    { id: 'logout', label: t('logout') || 'Logout', icon: <FiLogOut className="h-5 w-5" /> }
  ];

  const handleItemClick = (itemId) => {
    switch (itemId) {
      case 'logout':
        // In a real app, you would call your logout function from context
        // logout();
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
    <div className={`h-full flex flex-col transition-all duration-300 ${sidebarOpen ? 'p-4' : 'p-2'}`}>
      {/* Main Container with Modern Rounded Design - Keeping Original Colors */}
      <div className="bg-[#3b396d] text-white rounded-2xl shadow-lg h-full flex flex-col">
        {/* Top Section - Main Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-2">
            {topItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center transition-all duration-200 rounded-xl ${
                  activeTab === item.id
                    ? 'bg-white bg-opacity-20 text-white' // Keep original active style
                    : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10' // Keep original hover style
                } ${sidebarOpen ? 'px-4 py-3' : 'justify-center h-12 mx-auto'}`} // Center icon when collapsed, add margin
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
                className={`w-full flex items-center transition-all duration-200 rounded-xl ${
                  activeTab === item.id
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
              title={sidebarOpen ? ('Collapse') : (t('sidebar.expand') || 'Expand')}
            >
              <span className="flex-shrink-0">
                {sidebarOpen ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
              </span>
              {sidebarOpen && (
                <span className="ml-3 text-sm font-medium">
                  Close
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