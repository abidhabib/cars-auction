// src/components/seller/SellerHeader.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiBell,  FiX } from 'react-icons/fi';

// Dummy data for demo
const demoNotifications = [
    { id: 'not_001', type: 'bid', message: 'New bid of €45,000 on your BMW X5 (STK2023-001)', time: new Date(Date.now() - 30 * 60 * 1000), read: false },
    { id: 'not_002', type: 'sale', message: 'Your Audi A6 (STK2023-002) has been sold!', time: new Date(Date.now() - 1 * 60 * 60 * 1000), read: false },
    { id: 'not_003', type: 'message', message: 'New message from Luxury Motors Ltd. regarding STK2023-002', time: new Date(Date.now() - 2 * 60 * 60 * 1000), read: true }
];



const SellerHeader = ({ activeTab, selectedVehicle, setSelectedVehicle, selectedChat, setSelectedChat, setChatOpen }) => {
  const { t } = useLanguage();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Determine the title based on the active tab and context
  const getTitle = () => {
    if (activeTab === 'overview') return t('sellerDashboard.sidebar.overview') || 'Overview';
    if (activeTab === 'inventory') {
        if (selectedVehicle) {
            return `${selectedVehicle.make} ${selectedVehicle.model}`;
        }
        return t('sellerDashboard.sidebar.inventory') || 'My Inventory';
    }
    if (activeTab === 'messages') {
        if (selectedChat) {
            return selectedChat.buyer.name;
        }
        return t('sellerDashboard.sidebar.messages') || 'Messages';
    }
    if (activeTab === 'analytics') return t('sellerDashboard.sidebar.analytics') || 'Analytics';
    if (activeTab === 'settings') return t('sellerDashboard.sidebar.settings') || 'Settings';
    return t('sellerDashboard.sidebar.overview') || 'Overview'; // Default fallback
  };

  const handleBackToList = () => {
    if (activeTab === 'inventory' && selectedVehicle) {
        setSelectedVehicle(null);
    } else if (activeTab === 'messages' && selectedChat) {
        setSelectedChat(null);
        setChatOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm z-30">
      <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            {getTitle()}
          </h1>
          {(selectedVehicle || selectedChat) && (
            <button
              onClick={handleBackToList}
              className="ml-4 text-sm font-medium text-[#3b396d] hover:text-[#2a285a]"
            >
              {t('back') || 'Back to List'}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative"
            >
              <FiBell className="h-6 w-6" />
              {demoNotifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              )}
            </button>
            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">{t('notifications') || 'Notifications'}</h3>
                    <button onClick={() => setNotificationsOpen(false)} className="text-gray-400 hover:text-gray-500">
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {demoNotifications.map((notification) => (
                      <a
                        key={notification.id}
                        href="#"
                        className={`block px-4 py-3 text-sm hover:bg-gray-50 ${
                          !notification.read ? 'bg-[#f8f9ff]' : ''
                        }`}
                      >
                        <p className={`font-medium ${notification.read ? 'text-gray-900' : 'text-[#3b396d]'}`}>
                          {notification.message}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {notification.time.toLocaleDateString()} {notification.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </a>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 text-center">
                    <a href="#" className="text-sm font-medium text-[#3b396d] hover:text-[#2a285a]">
                      {t('viewAll') || 'View all'}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;