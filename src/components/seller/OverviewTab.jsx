// src/components/seller/OverviewTab.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StatsCard from './components/StatsCard';

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

   
    </div>
  );
};

export default OverviewTab;