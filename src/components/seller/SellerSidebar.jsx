// src/components/seller/SellerSidebar.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiBarChart2, 
  FiDollarSign, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut,
  FiShoppingCart, // For Buy Cars
  FiTag // For Sell Cars (replaces Plus)
} from 'react-icons/fi';

const SellerSidebar = ({ activeTab, setActiveTab }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Top navigation items (without Analytics)
  const topItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome className="h-6 w-6" /> },
    { id: 'inventory', label: t('sellerDashboard.sidebar.inventory') || 'My Inventory', icon: <FiPackage className="h-6 w-6" /> },
    { id: 'buy', label: t('sellerDashboard.sidebar.buyCar') || 'Buy Cars', icon: <FiShoppingCart className="h-6 w-6" /> }, // Moved to 3rd position
    { id: 'auctions', label: t('sellerDashboard.sidebar.myAuctions') || 'My Auctions', icon: <FiBarChart2 className="h-6 w-6" /> },
    { id: 'sales', label: t('sellerDashboard.sidebar.sales') || 'Sales & Transactions', icon: <FiDollarSign className="h-6 w-6" /> },
    { id: 'messages', label: t('sellerDashboard.sidebar.messages') || 'Messages', icon: <FiMessageSquare className="h-6 w-6" /> }
    // Analytics icon removed
  ];

  // Bottom navigation items
  const bottomItems = [
    { id: 'settings', label: t('sellerDashboard.sidebar.settings') || 'Settings', icon: <FiSettings className="h-6 w-6" /> },
    { id: 'logout', label: t('logout') || 'Logout', icon: <FiLogOut className="h-6 w-6" /> }
  ];

  const handleItemClick = (itemId) => {
    // Special handling for navigation items
    switch (itemId) {
      case 'buy-car':
        navigate('/buy');
        return;
      case 'settings':
        navigate('/seller/settings');
        return;
      case 'logout':
        alert(t('sellerDashboard.logoutAlert') || 'Logging out...');
        // Implement actual logout
        // logout();
        // navigate('/');
        return;
      default:
        // Default tab switching
        setActiveTab(itemId);
        return;
    }
  };

  return (
    <div className="w-18 h-full bg-[#3b396d] text-white flex flex-col"> {/* Increased width from w-16 to w-20 */}
      {/* Top Section - Main Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto"> {/* Increased padding */}
        <div className="space-y-3 px-3"> {/* Increased spacing and padding */}
          {topItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-white bg-opacity-20 text-white shadow-inner' // Active state with shadow
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10' // Default/hover state
              }`}
              title={item.label} // Tooltip for icon-only view
              aria-label={item.label}
            >
              <span className="flex-shrink-0">{item.icon}</span> {/* Larger icons */}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Section - Settings & Logout */}
      <div className="p-3 border-t border-[#2a285a]"> {/* Increased padding */}
        <div className="space-y-3"> {/* Increased spacing */}
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-white bg-opacity-20 text-white shadow-inner' // Active state
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10' // Default/hover state
              }`}
              title={item.label} // Tooltip for icon-only view
              aria-label={item.label}
            >
              <span className="flex-shrink-0">{item.icon}</span> {/* Larger icons */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar;