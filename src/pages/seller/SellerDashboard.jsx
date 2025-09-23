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
import Profile from '../profile/Profile';
import { FiSettings } from 'react-icons/fi';
import AddCarListing from '../../components/seller/AddCarListing';
// --- Import new components ---
import FavoritesTab from '../../components/seller/FavoritesTab'; // Make sure this path is correct
import BidsTab from '../../components/seller/BidsTab';         // Make sure this path is correct

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [carSelectedFromSearch, setCarSelectedFromSearch] = useState(null); 

  // Set active tab based on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    // Include new tabs in the check
    if (hash && ['overview', 'inventory','add', 'messages', 'analytics', 'buy', 'profile', 'favorites', 'bids'].includes(hash)) {
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

  const handleCarSelectFromSearch = (car) => {
    setCarSelectedFromSearch(car);
    if (activeTab !== 'buy') {
        setActiveTab('buy');
    }
  };

  const handleBackToListFromSearch = () => {
    setCarSelectedFromSearch(null);
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
          externalSelectedCar={carSelectedFromSearch}
          onBackToList={handleBackToListFromSearch}
        />;
      // --- New Cases for Favorites and Bids ---
      case 'favorites':
        return <FavoritesTab 
          onViewCar={(carId) => {
            // Example: Navigate to BuyCarsTab and view the specific car
            // You might need to adjust this based on how BuyCarsTab handles external car selection
            // For now, we'll just switch tabs
            setActiveTab('buy');
            // Logic to select the car in BuyCarsTab would go here if needed
          }}
          onPlaceBid={(carId) => {
            // Example: Navigate to BuyCarsTab and open bid modal for this car
            setActiveTab('buy');
            // Logic to trigger bid modal for the car would go here if needed
          }}
          onRemoveFavorite={(carId) => {
            console.log("Removed favorite car:", carId);
            // Optional: Show a notification or update UI
          }}
        />;
      case 'bids':
        return <BidsTab 
          onViewCar={(carId) => {
            setActiveTab('buy');
          }}
          onPlaceBid={(carId) => {
            // This will be "Update Bid"
            setActiveTab('buy');
          }}
          onRemoveBid={(carId) => {
            console.log("Removed bid for car:", carId);
            // Optional: Show a notification or update UI
          }}
        />;
      // --- End New Cases ---
      case 'profile':
        return <Profile />;
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
    <div className="flex h-screen bg-transparent">
      {/* Fixed Header - Always on top */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md">
        <SellerHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setChatOpen={setChatOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
          onCarSelect={handleCarSelectFromSearch} 
        />
      </header>

      {/* Fixed Sidebar - Below Header */}
      <aside 
        className={`fixed top-16 h-[calc(100vh-4rem)] bg-transparent  z-40 overflow-y-auto transition-all duration-300 ease-in-out`}
        style={{
          width: sidebarOpen ? '16rem' : '5rem',
          left: 0
        }}
      >
        <SellerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </aside>

      {/* Main Content Area - Properly spaced to avoid overlap */}
      <main className={`flex-1 pt-16 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out ${
        activeTab === 'buy' ? 'ml-0' : ''
      }`} style={{
        marginLeft: sidebarOpen ? '16rem' : '5rem'
      }}>
        <div className="py-8 max-w-8xl px-16  mx-auto">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;