// src/pages/seller/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  FiHome,
  FiPlus,
  FiPackage,
  FiBarChart2,
  FiUsers,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiEdit,
  FiEye,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiCheck,
  FiX,
  FiLink,
  FiCopy,
  FiFilter,
  FiMenu,
  FiX as FiCloseMenu
} from 'react-icons/fi';

const SellerDashboard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // State for UI elements
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [auctionFilter, setAuctionFilter] = useState('all'); // all, active, ended

  // Demo Data
  const demoUserData = {
    id: 'seller_123',
    companyName: 'Premium Auto Traders GmbH',
    email: 'contact@premium-autos.de',
    phone: '+49 30 12345678',
    address: 'Hauptstrasse 123, 10115 Berlin, Germany',
    verified: true,
    avatar: 'https://via.placeholder.com/100x100/3b396d/FFFFFF?text=PT', // Placeholder with your color
    stats: {
      totalListings: 24,
      activeAuctions: 8,
      vehiclesSold: 15,
      totalRevenue: 425000,
      avgSellingPrice: 28333,
      sellThroughRate: '62.5%'
    }
  };

  const demoVehicles = [
    {
      id: 'veh_001',
      stockNumber: 'STK2023-001',
      make: 'BMW',
      model: 'X5',
      year: 2022,
      mileage: 25000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      color: 'Black',
      condition: 'Excellent',
      mainImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=500&q=80',
      status: 'active',
      currentBid: 45000,
      reservePrice: 40000,
      buyItNowPrice: 52000,
      auctionEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      location: 'Berlin, DE',
      auctionType: 'public',
      auctionLink: `https://${language}.carnetwork.com/auction/veh_001`,
      bids: [
        { bidder: 'buyer_abc', amount: 42000, time: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { bidder: 'buyer_xyz', amount: 45000, time: new Date(Date.now() - 30 * 60 * 1000) }
      ]
    },
    {
      id: 'veh_002',
      stockNumber: 'STK2023-002',
      make: 'Audi',
      model: 'A6',
      year: 2021,
      mileage: 32000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'White',
      condition: 'Good',
      mainImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80',
      status: 'sold',
      finalSalePrice: 38500,
      soldDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      buyer: {
        id: 'buyer_def',
        name: 'Luxury Motors Ltd.',
        email: 'sales@luxurymotors.co.uk',
        phone: '+44 20 7123 4567',
        location: 'London, UK'
      },
      location: 'Hamburg, DE',
      auctionType: 'private',
      auctionLink: `https://${language}.carnetwork.com/auction/veh_002/private/xyz123`
    },
    {
      id: 'veh_003',
      stockNumber: 'STK2023-003',
      make: 'Mercedes-Benz',
      model: 'GLE',
      year: 2023,
      mileage: 5000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      color: 'Silver',
      condition: 'Like New',
      mainImage: 'https://images.unsplash.com/photo-1558981000-f5f2a3c4b4e4?auto=format&fit=crop&w=500&q=80',
      status: 'draft',
      askingPrice: 65000,
      location: 'Munich, DE',
      auctionType: 'public'
    }
  ];

  const demoChats = [
    {
      id: 'chat_001',
      vehicleId: 'veh_001',
      vehicleStock: 'STK2023-001',
      vehicleMakeModel: 'BMW X5',
      buyer: {
        id: 'buyer_abc',
        name: 'European Fleet Solutions',
        avatar: 'https://via.placeholder.com/40x40/2a285a/FFFFFF?text=EFS'
      },
      lastMessage: 'Hi, interested in the BMW. Is it still available for inspection?',
      unread: 2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messages: [
        { id: 'msg_001', sender: 'buyer', text: 'Hi, interested in the BMW. Is it still available for inspection?', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { id: 'msg_002', sender: 'seller', text: 'Yes, absolutely! Please let me know a convenient time.', timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000) },
        { id: 'msg_003', sender: 'buyer', text: 'How about tomorrow morning 10 AM?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 'chat_002',
      vehicleId: 'veh_002',
      vehicleStock: 'STK2023-002',
      vehicleMakeModel: 'Audi A6',
      buyer: {
        id: 'buyer_def',
        name: 'Luxury Motors Ltd.',
        avatar: 'https://via.placeholder.com/40x40/3b396d/FFFFFF?text=LM'
      },
      lastMessage: 'Congratulations on the sale!',
      unread: 0,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      messages: [
        { id: 'msg_004', sender: 'buyer', text: 'Congratulations on the sale!', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
      ]
    }
  ];

  const demoNotifications = [
    { id: 'not_001', type: 'bid', message: 'New bid of €45,000 on your BMW X5 (STK2023-001)', time: new Date(Date.now() - 30 * 60 * 1000), read: false },
    { id: 'not_002', type: 'sale', message: 'Your Audi A6 (STK2023-002) has been sold!', time: new Date(Date.now() - 1 * 60 * 60 * 1000), read: false },
    { id: 'not_003', type: 'message', message: 'New message from Luxury Motors Ltd. regarding STK2023-002', time: new Date(Date.now() - 2 * 60 * 60 * 1000), read: true }
  ];

  // Filter vehicles based on auction status
  const filteredVehicles = demoVehicles.filter(vehicle => {
    if (auctionFilter === 'all') return true;
    if (auctionFilter === 'active') return vehicle.status === 'active';
    if (auctionFilter === 'ended') return vehicle.status === 'sold';
    return true;
  });

  // Filter chats
  const filteredChats = demoChats.filter(chat => {
    if (selectedVehicle) {
      return chat.vehicleId === selectedVehicle.id;
    }
    return true;
  });

  // Handle navigation
  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Handle adding a new vehicle
  const handleAddVehicle = () => {
    alert(t('sellerDashboard.addVehicleAlert') || 'Redirecting to Add Vehicle form...');
    // navigate('/seller/add-vehicle'); // Uncomment when you have the add vehicle page
  };

  // Handle viewing vehicle details
  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveTab('inventory'); // Switch to inventory tab to show details
    setSidebarOpen(false);
  };

  // Handle opening chat
  const handleOpenChat = (chat) => {
    setSelectedChat(chat);
    setChatOpen(true);
    setSidebarOpen(false);
  };

  // Handle sending a message in chat
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const updatedChats = demoChats.map(chat => {
        if (chat.id === selectedChat.id) {
          const newMsg = {
            id: `msg_${Date.now()}`,
            sender: 'seller',
            text: newMessage,
            timestamp: new Date()
          };
          return {
            ...chat,
            messages: [...chat.messages, newMsg],
            lastMessage: newMessage,
            timestamp: new Date()
          };
        }
        return chat;
      });
      // In a real app, you'd update state or call an API
      console.log("Sending message:", newMessage, "to chat:", selectedChat.id);
      console.log("Updated chats would be:", updatedChats);
      setNewMessage('');
    }
  };

  // Copy auction link to clipboard
  const copyAuctionLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert(t('sellerDashboard.linkCopied') || 'Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert(t('sellerDashboard.linkCopyFailed') || 'Failed to copy link.');
    });
  };

  // Sidebar Navigation Items
  const sidebarItems = [
    { id: 'overview', label: t('sellerDashboard.sidebar.overview') || 'Overview', icon: <FiHome /> },
    { id: 'inventory', label: t('sellerDashboard.sidebar.inventory') || 'My Inventory', icon: <FiPackage /> },
    { id: 'auctions', label: t('sellerDashboard.sidebar.myAuctions') || 'My Auctions', icon: <FiBarChart2 /> },
    { id: 'sales', label: t('sellerDashboard.sidebar.sales') || 'Sales & Transactions', icon: <FiDollarSign /> },
    { id: 'messages', label: t('sellerDashboard.sidebar.messages') || 'Messages', icon: <FiMessageSquare /> },
    { id: 'analytics', label: t('sellerDashboard.sidebar.analytics') || 'Analytics', icon: <FiBarChart2 /> },
    { id: 'settings', label: t('sellerDashboard.sidebar.settings') || 'Settings', icon: <FiSettings /> }
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
                    <FiPackage className="h-6 w-6 text-[#3b396d]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('sellerDashboard.stats.totalListings') || 'Total Listings'}</p>
                    <p className="text-xl font-bold text-gray-900">{demoUserData.stats.totalListings}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
                    <FiBarChart2 className="h-6 w-6 text-[#3b396d]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('sellerDashboard.stats.activeAuctions') || 'Active Auctions'}</p>
                    <p className="text-xl font-bold text-gray-900">{demoUserData.stats.activeAuctions}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
                    <FiCheck className="h-6 w-6 text-[#3b396d]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('sellerDashboard.stats.vehiclesSold') || 'Vehicles Sold'}</p>
                    <p className="text-xl font-bold text-gray-900">{demoUserData.stats.vehiclesSold}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
                    <FiDollarSign className="h-6 w-6 text-[#3b396d]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('sellerDashboard.stats.totalRevenue') || 'Total Revenue'}</p>
                    <p className="text-xl font-bold text-gray-900">€{demoUserData.stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Vehicles */}
              <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{t('sellerDashboard.overview.recentVehicles') || 'Recent Vehicles'}</h3>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="text-sm text-[#3b396d] hover:text-[#2a285a] font-medium"
                  >
                    {t('viewAll') || 'View All'}
                  </button>
                </div>
                <div className="space-y-4">
                  {demoVehicles.slice(0, 3).map(vehicle => (
                    <div key={vehicle.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => handleViewVehicle(vehicle)}>
                      <img src={vehicle.mainImage} alt={`${vehicle.make} ${vehicle.model}`} className="h-12 w-16 object-cover rounded mr-4" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{vehicle.make} {vehicle.model}</p>
                        <p className="text-xs text-gray-500 truncate">{vehicle.stockNumber} • {vehicle.year}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {vehicle.status === 'sold' ? `€${vehicle.finalSalePrice?.toLocaleString()}` : `€${vehicle.currentBid?.toLocaleString() || vehicle.askingPrice?.toLocaleString()}`}
                        </p>
                        <p className={`text-xs ${vehicle.status === 'active' ? 'text-green-600' : vehicle.status === 'sold' ? 'text-blue-600' : 'text-gray-500'}`}>
                          {vehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
                           vehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
                           (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{t('sellerDashboard.overview.recentMessages') || 'Recent Messages'}</h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-sm text-[#3b396d] hover:text-[#2a285a] font-medium"
                  >
                    {t('viewAll') || 'View All'}
                  </button>
                </div>
                <div className="space-y-4">
                  {demoChats.slice(0, 3).map(chat => (
                    <div key={chat.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => handleOpenChat(chat)}>
                      <img src={chat.buyer.avatar} alt={chat.buyer.name} className="h-10 w-10 rounded-full mr-3" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.buyer.name}</p>
                          {chat.unread > 0 && (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{chat.vehicleMakeModel} ({chat.vehicleStock})</p>
                        <p className="text-xs text-gray-700 truncate mt-1">{chat.lastMessage}</p>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedVehicle ? (
                  <>{t('sellerDashboard.inventory.vehicleDetails') || 'Vehicle Details'}: {selectedVehicle.make} {selectedVehicle.model}
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="ml-4 text-sm font-medium text-[#3b396d] hover:text-[#2a285a]"
                  >
                    {t('back') || 'Back to List'}
                  </button>
                  </>
                ) : (
                  t('sellerDashboard.sidebar.inventory') || 'My Inventory'
                )}
              </h2>
              {!selectedVehicle && (
                <button
                  onClick={handleAddVehicle}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  {t('sellerDashboard.inventory.addVehicle') || 'Add Vehicle'}
                </button>
              )}
            </div>

            {selectedVehicle ? (
              // Vehicle Detail View
              <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                      <img src={selectedVehicle.mainImage} alt={`${selectedVehicle.make} ${selectedVehicle.model}`} className="w-full h-auto rounded-lg object-cover" />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h3>
                          <p className="text-gray-600">{selectedVehicle.stockNumber}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedVehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                            selectedVehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedVehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
                             selectedVehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
                             (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
                          </span>
                          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                            <FiEdit className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.mileage') || 'Mileage'}</p>
                          <p className="font-medium">{selectedVehicle.mileage?.toLocaleString()} km</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.fuelType') || 'Fuel Type'}</p>
                          <p className="font-medium">{selectedVehicle.fuelType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.transmission') || 'Transmission'}</p>
                          <p className="font-medium">{selectedVehicle.transmission}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.color') || 'Color'}</p>
                          <p className="font-medium">{selectedVehicle.color}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.condition') || 'Condition'}</p>
                          <p className="font-medium">{selectedVehicle.condition}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.location') || 'Location'}</p>
                          <p className="font-medium">{selectedVehicle.location}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {selectedVehicle.status === 'active' && (
                          <>
                            <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                              <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.currentBid') || 'Current Bid'}</p>
                              <p className="text-2xl font-bold text-[#3b396d]">€{selectedVehicle.currentBid?.toLocaleString()}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t('sellerDashboard.inventory.reservePrice') || 'Reserve'}: €{selectedVehicle.reservePrice?.toLocaleString()}
                              </p>
                            </div>
                            <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                              <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.auctionEnds') || 'Auction Ends'}</p>
                              <p className="text-lg font-bold text-gray-900">
                                {selectedVehicle.auctionEnds?.toLocaleDateString()} <br />
                                <span className="text-sm font-normal">{selectedVehicle.auctionEnds?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </p>
                            </div>
                            <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                              <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.bids') || 'Bids'}</p>
                              <p className="text-2xl font-bold text-gray-900">{selectedVehicle.bids?.length || 0}</p>
                              <button
                                onClick={() => {
                                  alert(t('sellerDashboard.viewBidHistoryAlert') || 'Opening bid history...');
                                  // navigate(`/seller/auction/${selectedVehicle.id}/bids`); // Uncomment when you have the bids page
                                }}
                                className="text-xs text-[#3b396d] hover:text-[#2a285a] font-medium mt-1"
                              >
                                {t('viewDetails') || 'View Details'}
                              </button>
                            </div>
                          </>
                        )}
                        {selectedVehicle.status === 'sold' && (
                          <>
                            <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                              <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.finalSalePrice') || 'Final Sale Price'}</p>
                              <p className="text-2xl font-bold text-[#3b396d]">€{selectedVehicle.finalSalePrice?.toLocaleString()}</p>
                            </div>
                            <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                              <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.soldTo') || 'Sold To'}</p>
                              <p className="font-medium text-gray-900">{selectedVehicle.buyer?.name}</p>
                              <p className="text-xs text-gray-500">{selectedVehicle.soldDate?.toLocaleDateString()}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {selectedVehicle.auctionType === 'private' && (
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start">
                            <FiLink className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">{t('sellerDashboard.inventory.privateAuction') || 'Private Auction Link'}</p>
                              <p className="text-xs text-yellow-700 mt-1 break-all">{selectedVehicle.auctionLink}</p>
                              <button
                                onClick={() => copyAuctionLink(selectedVehicle.auctionLink)}
                                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                              >
                                <FiCopy className="mr-1 h-3 w-3" />
                                {t('copyLink') || 'Copy Link'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Vehicle List View
              <>
                {/* Filters */}
                <div className="bg-white rounded-lg shadow border border-gray-100 p-4 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder={t('sellerDashboard.inventory.searchPlaceholder') || "Search vehicles..."}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={auctionFilter}
                        onChange={(e) => setAuctionFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] sm:text-sm rounded-md"
                      >
                        <option value="all">{t('sellerDashboard.filters.all') || 'All Vehicles'}</option>
                        <option value="active">{t('sellerDashboard.filters.active') || 'Active'}</option>
                        <option value="ended">{t('sellerDashboard.filters.sold') || 'Sold'}</option>
                        <option value="draft">{t('sellerDashboard.filters.draft') || 'Draft'}</option>
                      </select>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]">
                        <FiFilter className="mr-1 h-4 w-4" />
                        {t('filters') || 'Filters'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vehicle Grid/Table */}
                <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.vehicle') || 'Vehicle'}</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.details') || 'Details'}</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.status') || 'Status'}</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.price') || 'Price'}</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.actions') || 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVehicles.map((vehicle) => (
                          <tr key={vehicle.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-16">
                                  <img className="h-12 w-16 object-cover rounded" src={vehicle.mainImage} alt={`${vehicle.make} ${vehicle.model}`} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                                  <div className="text-sm text-gray-500">{vehicle.stockNumber}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{vehicle.year}</div>
                              <div className="text-sm text-gray-500">{vehicle.mileage?.toLocaleString()} km • {vehicle.fuelType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                                vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {vehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
                                 vehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
                                 (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
                              </span>
                              {vehicle.auctionType === 'private' && (
                                <div className="mt-1 flex items-center text-xs text-yellow-600">
                                  <FiLink className="mr-1 h-3 w-3" />
                                  {t('sellerDashboard.inventory.private') || 'Private'}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {vehicle.status === 'sold' ? (
                                <>€{vehicle.finalSalePrice?.toLocaleString()}</>
                              ) : vehicle.status === 'active' ? (
                                <>€{vehicle.currentBid?.toLocaleString()} <span className="text-gray-500 text-xs">(€{vehicle.reservePrice?.toLocaleString()} reserve)</span></>
                              ) : (
                                <>€{vehicle.askingPrice?.toLocaleString()}</>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewVehicle(vehicle)}
                                className="text-[#3b396d] hover:text-[#2a285a] mr-3"
                              >
                                <FiEye className="h-5 w-5" />
                              </button>
                              <button className="text-gray-500 hover:text-gray-700">
                                <FiEdit className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 'messages':
        return (
          <div className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedChat ? (
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="mr-3 text-gray-500 hover:text-gray-700 lg:hidden"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <img src={selectedChat.buyer.avatar} alt={selectedChat.buyer.name} className="h-8 w-8 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">{selectedChat.buyer.name}</p>
                      <p className="text-xs text-gray-500">{selectedChat.vehicleMakeModel} ({selectedChat.vehicleStock})</p>
                    </div>
                  </div>
                ) : (
                  t('sellerDashboard.sidebar.messages') || 'Messages'
                )}
              </h3>
              {selectedChat && (
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-gray-500 hover:text-gray-700 lg:hidden"
                >
                  <FiCloseMenu className="h-6 w-6" />
                </button>
              )}
            </div>

            {selectedChat ? (
              // Individual Chat View
              <div className="flex-1 flex flex-col h-full">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                            message.sender === 'seller'
                              ? 'bg-[#3b396d] text-white rounded-br-none'
                              : 'bg-white border border-gray-200 rounded-bl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'seller' ? 'text-white/70' : 'text-gray-500'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t('sellerDashboard.messages.typeMessage') || "Type a message..."}
                      className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`px-4 py-2 rounded-r-lg ${
                        newMessage.trim()
                          ? 'bg-[#3b396d] text-white hover:bg-[#2a285a]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FiSend className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Chat List View
              <div className="flex-1 flex flex-col md:flex-row h-full">
                {/* Chat List (Sidebar on larger screens) */}
                <div className={`border-r border-gray-200 md:w-1/3 lg:w-1/4 ${chatOpen ? 'hidden md:block' : 'block'}`}>
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-md font-medium text-gray-900">{t('sellerDashboard.messages.conversations') || 'Conversations'}</h4>
                  </div>
                  <div className="overflow-y-auto h-[calc(100vh-200px)]">
                    {filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => {
                          setSelectedChat(chat);
                          setChatOpen(true);
                        }}
                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                          selectedChat?.id === chat.id ? 'bg-[#f8f9ff]' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <img src={chat.buyer.avatar} alt={chat.buyer.name} className="h-10 w-10 rounded-full mr-3" />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{chat.buyer.name}</p>
                              {chat.unread > 0 && (
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b396d] text-white text-xs">
                                  {chat.unread}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{chat.vehicleMakeModel} ({chat.vehicleStock})</p>
                            <p className="text-xs text-gray-700 truncate mt-1">{chat.lastMessage}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500">
                            {chat.timestamp.toLocaleDateString()} {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Empty State / Instructions for Chat Area */}
                <div className={`flex-1 flex-col items-center justify-center p-8 text-center hidden md:flex ${chatOpen ? 'hidden' : 'flex'}`}>
                  <FiMessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{t('sellerDashboard.messages.selectConversation') || 'Select a conversation'}</h3>
                  <p className="text-gray-500 max-w-md">
                    {t('sellerDashboard.messages.selectConversationDesc') || 'Choose a conversation from the list to start chatting.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('sellerDashboard.sidebar.analytics') || 'Analytics & Reports'}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('sellerDashboard.analytics.revenueTitle') || 'Revenue Overview'}</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">{t('sellerDashboard.analytics.chartPlaceholder') || 'Revenue Chart Placeholder'}</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#3b396d]">€{demoUserData.stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{t('sellerDashboard.analytics.totalRevenue') || 'Total Revenue'}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{demoUserData.stats.vehiclesSold}</p>
                    <p className="text-xs text-gray-500">{t('sellerDashboard.analytics.vehiclesSold') || 'Vehicles Sold'}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{demoUserData.stats.sellThroughRate}</p>
                    <p className="text-xs text-gray-500">{t('sellerDashboard.analytics.sellThroughRate') || 'Sell-Through Rate'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('sellerDashboard.analytics.topModels') || 'Top Selling Models'}</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">{t('sellerDashboard.analytics.chartPlaceholder') || 'Top Models Chart Placeholder'}</p>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">BMW X5</span>
                    <span className="text-sm text-gray-500">5 {t('sellerDashboard.analytics.units') || 'units'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Audi A6</span>
                    <span className="text-sm text-gray-500">4 {t('sellerDashboard.analytics.units') || 'units'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Mercedes GLE</span>
                    <span className="text-sm text-gray-500">3 {t('sellerDashboard.analytics.units') || 'units'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('sellerDashboard.analytics.financialSummary') || 'Financial Summary'}</h3>
                <button className="text-sm text-[#3b396d] hover:text-[#2a285a] font-medium">
                  {t('downloadReport') || 'Download Report'}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.period') || 'Period'}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.grossSales') || 'Gross Sales'}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.fees') || 'Platform Fees'}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.netEarnings') || 'Net Earnings'}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">January 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€120,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€12,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b396d]">€108,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">February 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€95,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€9,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b396d]">€85,500</td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t('sellerDashboard.analytics.ytdTotal') || 'YTD Total'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€215,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€21,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b396d]">€193,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Mobile sidebar toggle button */}
        <button
          type="button"
          className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 bg-white shadow-md md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiCloseMenu className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/icon.svg" // Make sure you have this or use a placeholder
                alt="Car Network Logo"
              />
              <span className="ml-2 text-xl font-bold text-[#3b396d]">Seller Hub</span>
            </div>
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <FiCloseMenu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                    setSelectedVehicle(null); // Reset vehicle detail view when switching tabs
                    setSelectedChat(null);   // Reset chat detail view when switching tabs
                    setChatOpen(false);      // Close chat drawer on mobile
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    activeTab === item.id
                      ? 'bg-[#3b396d] text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                alert(t('sellerDashboard.logoutAlert') || 'Logging out...');
                // Implement actual logout logic here
                // logout();
                // navigate('/login');
              }}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <FiLogOut className="mr-3 h-5 w-5" />
              {t('logout') || 'Logout'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="bg-white shadow-sm z-30">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold text-gray-900">
                  {activeTab === 'overview' && (t('sellerDashboard.sidebar.overview') || 'Overview')}
                  {activeTab === 'inventory' && (selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model}` : (t('sellerDashboard.sidebar.inventory') || 'My Inventory'))}
                  {activeTab === 'messages' && (selectedChat ? selectedChat.buyer.name : (t('sellerDashboard.sidebar.messages') || 'Messages'))}
                  {activeTab === 'analytics' && (t('sellerDashboard.sidebar.analytics') || 'Analytics')}
                  {activeTab === 'settings' && (t('sellerDashboard.sidebar.settings') || 'Settings')}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                  >
                    <FiBell className="h-6 w-6" />
                    {demoNotifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                    )}
                  </button>
                  {notificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <h3 className="text-sm font-medium text-gray-900">{t('notifications') || 'Notifications'}</h3>
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

                {/* User Profile */}
                <div className="relative">
                  <button className="flex items-center text-sm rounded-full focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={demoUserData.avatar}
                      alt={demoUserData.companyName}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">{demoUserData.companyName}</span>
                    <FiChevronDown className="ml-1 h-4 w-4 text-gray-500 hidden md:inline" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderContent()}
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default SellerDashboard;