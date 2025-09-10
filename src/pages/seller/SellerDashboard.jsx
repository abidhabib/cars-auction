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
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const handleAddVehicle = () => {
    navigate('/seller/addvehicle')
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
      <SellerSidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content area - fixed flex container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerHeader
          activeTab={activeTab}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setChatOpen={setChatOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;