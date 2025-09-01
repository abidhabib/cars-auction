// src/pages/Dashboard.jsx
import React from 'react';
import { FiUsers, FiDollarSign, FiClock, FiBarChart2, FiTruck, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useDashboardStats } from '../hooks/useApi';
import AppLayout from '../components/layout/AppLayout';

const Dashboard = () => {
  const { t } = useLanguage();
  const { data: dashboardData, loading, error } = useDashboardStats();

  // Loading state
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          </div>
        </div>
    );
  }

  // Error state
  if (error) {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading dashboard data
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Use mock data from the hook
  const stats = dashboardData?.stats || [];
  const recentAuctions = dashboardData?.recentAuctions || [];
  const upcomingDeliveries = dashboardData?.upcomingDeliveries || [];

  // Helper function to render icons
  const renderIcon = (iconName, className) => {
    switch (iconName) {
      case 'clock': return <FiClock className={className} />;
      case 'dollar': return <FiDollarSign className={className} />;
      case 'users': return <FiUsers className={className} />;
      case 'chart': return <FiBarChart2 className={className} />;
      default: return <FiBarChart2 className={className} />;
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {t('dashboard.subtitle')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white overflow-hidden shadow-sm rounded-xl p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {renderIcon(stat.icon, "h-6 w-6 text-orange-500")}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900">
                            {typeof stat.value === 'number' && stat.name.includes('Sales') 
                              ? formatCurrency(stat.value)
                              : typeof stat.value === 'number' && stat.name.includes('Bid')
                              ? formatCurrency(stat.value)
                              : stat.value}
                          </p>
                          <p
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === 'increase'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {stat.change}
                          </p>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Active Auctions */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">{t('dashboard.activeAuctions')}</h2>
                <button className="text-sm font-medium text-orange-600 hover:text-orange-500">
                  {t('dashboard.viewAll')}
                </button>
              </div>
              <div className="space-y-6">
                {recentAuctions.map((auction) => (
                  <div key={auction.id} className="flex items-center space-x-4">
                    <img
                      src={auction.image}
                      alt={auction.carName}
                      className="h-16 w-24 object-cover rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {auction.carName} ({auction.year})
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('dashboard.currentBid')}: {formatCurrency(auction.currentBid)}
                      </p>
                      <div className="flex items-center mt-1">
                        <FiClock className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{auction.timeLeft}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <FiUsers className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{auction.bidders} {t('dashboard.bidders')}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                      {t('dashboard.bidNow')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deliveries */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">{t('dashboard.upcomingDeliveries')}</h2>
                <button className="text-sm font-medium text-orange-600 hover:text-orange-500">
                  {t('dashboard.viewAll')}
                </button>
              </div>
              <div className="space-y-6">
                {upcomingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center space-x-4">
                    <img
                      src={delivery.image}
                      alt={delivery.carName}
                      className="h-16 w-24 object-cover rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {delivery.carName}
                      </p>
                      <div className="flex items-center mt-1">
                        <FiCalendar className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{delivery.deliveryDate}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <FiTruck className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{delivery.status}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{delivery.location}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                      {t('dashboard.track')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;