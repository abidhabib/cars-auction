// src/pages/seller/SellerDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import OverviewTab from '../../components/seller/OverviewTab';
import InventoryTab from '../../components/seller/InventoryTab';
import MessagesTab from '../../components/seller/MessagesTab';
import AnalyticsTab from '../../components/seller/AnalyticsTab';
import { FiSettings } from 'react-icons/fi';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const handleAddVehicle = () => {
    navigate('/seller/addvehicle');
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
        return <OverviewTab handleViewVehicle={handleViewVehicle} handleOpenChat={handleOpenChat} setActiveTab={setActiveTab} />;
      case 'inventory':
        return <InventoryTab
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          handleAddVehicle={handleAddVehicle}
          handleViewVehicle={handleViewVehicle}
        />;
      case 'messages':
        return <MessagesTab
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setChatOpen={setChatOpen}
          chatOpen={chatOpen}
        />;
      case 'analytics':
        return <AnalyticsTab />;
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
      <div className="fixed top-0 left-0 right-0 z-50">
        <SellerHeader
          activeTab={activeTab}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setChatOpen={setChatOpen}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Fixed Sidebar - Below Header */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-40">
        <SellerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Main Content Area - Properly spaced to avoid overlap */}
      <div className="flex-1 ml-16 mt-16"> {/* ml-16 for sidebar width, mt-16 for header height */}
        <main className="p-4 sm:p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;