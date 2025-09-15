// src/pages/seller/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import OverviewTab from '../../components/seller/OverviewTab';
import InventoryTab from '../../components/seller/InventoryTab';
import MessagesTab from '../../components/seller/MessagesTab';
import AnalyticsTab from '../../components/seller/AnalyticsTab';
import BuyCarsTab from '../../components/seller/BuyCarsTab';
import { FiSettings } from 'react-icons/fi';
import AddCarListing from '../../components/seller/AddCarListing'

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Set active tab based on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['overview', 'inventory','add', 'messages', 'analytics', 'buy'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [setActiveTab]);

  // Update URL hash when active tab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  const handleAddVehicle = () => {
    navigate('addvehicle');
  };

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveTab('inventory');
    setSidebarOpen(false);
  };

  const handleOpenChat = (chat) => {
    setSelectedChat(chat);
    setActiveTab('messages');
    setChatOpen(true);
    setSidebarOpen(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab 
          handleViewVehicle={handleViewVehicle} 
          handleOpenChat={handleOpenChat} 
          setActiveTab={setActiveTab} 
        />;
      case 'inventory':
        return <InventoryTab
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          handleAddVehicle={handleAddVehicle}
          handleViewVehicle={handleViewVehicle}
        />;
        
      case 'add':
        return <AddCarListing />;
      case 'messages':
        return <MessagesTab
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setChatOpen={setChatOpen}
          chatOpen={chatOpen}
        />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'buy':
        return <BuyCarsTab 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
        />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <FiSettings className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">{t('sellerDashboard.sidebar.settings') || 'Settings'}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {t('sellerDashboard.comingSoonDesc') || 'This section is under development.'}
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <FiSettings className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">{t('sellerDashboard.comingSoon') || 'Coming Soon'}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {t('sellerDashboard.comingSoonDesc') || 'This section is under development.'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Header - Always on top */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md">
        <SellerHeader
          activeTab={activeTab}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setChatOpen={setChatOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
        />
      </header>

      {/* Fixed Sidebar - Below Header */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-40 overflow-y-auto">
        <SellerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </aside>

      {/* Main Content Area - Properly spaced to avoid overlap */}
      <main className={`flex-1 pt-16 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto ${
        activeTab === 'buy' ? 'ml-0' : 'ml-64'
      }`}>
        <div className="py-8  max-w-7xl mx-auto">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;