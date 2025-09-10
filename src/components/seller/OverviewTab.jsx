// src/components/seller/OverviewTab.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StatsCard from './components/StatsCard';
import VehicleCard from './components/VehicleCard';
import ChatListItem from './components/ChatListItem';
import { FiPackage,FiBarChart2,FiCheck,FiDollarSign  } from 'react-icons/fi';

// Dummy data for demo
const demoUserData = {
    stats: {
      totalListings: 24,
      activeAuctions: 8,
      vehiclesSold: 15,
      totalRevenue: 425000
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
      auctionType: 'public'
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
      auctionType: 'private'
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

const OverviewTab = ({ handleViewVehicle, handleOpenChat, setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('sellerDashboard.stats.totalListings') || 'Total Listings'}
          value={demoUserData.stats.totalListings}
          icon={<FiPackage className="h-6 w-6 text-[#3b396d]" />}
          bgColor="bg-[#3b396d]/10"
        />
        <StatsCard
          title={t('sellerDashboard.stats.activeAuctions') || 'Active Auctions'}
          value={demoUserData.stats.activeAuctions}
          icon={<FiBarChart2 className="h-6 w-6 text-[#3b396d]" />}
          bgColor="bg-[#3b396d]/10"
        />
        <StatsCard
          title={t('sellerDashboard.stats.vehiclesSold') || 'Vehicles Sold'}
          value={demoUserData.stats.vehiclesSold}
          icon={<FiCheck className="h-6 w-6 text-[#3b396d]" />}
          bgColor="bg-[#3b396d]/10"
        />
        <StatsCard
          title={t('sellerDashboard.stats.totalRevenue') || 'Total Revenue'}
          value={`€${demoUserData.stats.totalRevenue.toLocaleString()}`}
          icon={<FiDollarSign className="h-6 w-6 text-[#3b396d]" />}
          bgColor="bg-[#3b396d]/10"
        />
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
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onClick={() => handleViewVehicle(vehicle)}
                t={t} // Pass t for translations inside VehicleCard
              />
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
              <ChatListItem
                key={chat.id}
                chat={chat}
                onClick={() => handleOpenChat(chat)}
                t={t} // Pass t for translations inside ChatListItem
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;