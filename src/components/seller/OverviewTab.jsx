import  { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  FiBarChart2,
  FiDollarSign,
  FiCheck,
  FiDownload,
  FiAward,
  FiHeart,
  FiShoppingCart,
  FiUsers,
  FiInfo,
} from 'react-icons/fi';
import NewsLatter from './NewsLatter';

const OverviewTab = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    vehiclesSold: 0,
    sellThroughRate: '0%',
    avgSellingPrice: 0,
    myAuctions: 0,
    favourites: 0,
    totalPlatformAuctions: 0,
  });

  // Stats calculation
  const calculateStats = (cars) => {
    const totalRevenue = cars.reduce((sum, car) => sum + car.price, 0);
    const vehiclesSold = cars.length;
    const avgSellingPrice = vehiclesSold > 0 ? Math.round(totalRevenue / vehiclesSold) : 0;
    return {
      totalRevenue,
      vehiclesSold,
      avgSellingPrice,
      myAuctions: Math.floor(Math.random() * 15) + 3,
      favourites: Math.floor(Math.random() * 25) + 5,
      totalPlatformAuctions: Math.floor(Math.random() * 200) + 150,
    };
  };

  // Chart options
  const getChartOptions = (title, currency = false) => ({
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#333', font: { size: 12 } } },
      title: { display: true, text: title, font: { size: 16, weight: 'bold' }, color: '#333' },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += currency
                ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed.y)
                : context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: { ticks: { color: '#666' }, grid: { color: 'rgba(0,0,0,0.05)' } },
      y: {
        ticks: {
          color: '#666',
          callback: (value) =>
            currency
              ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
              : value,
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
    },
    interaction: { mode: 'index', intersect: false },
  });

  // Load data on mount
  useEffect(() => {
    const cars = loadMockCarsData();
    setStats(calculateStats(cars));
  }, [language]);

  const handleFavouritesClick = () =>
    alert(t('sellerDashboard.goToFavourites') || 'Navigating to Favourites...');

  const handlePlatformAuctionsClick = () =>
    alert(t('sellerDashboard.viewAllAuctions') || 'Navigating to All Auctions...');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiBarChart2 className="mr-2 h-6 w-6" />
          {t('sellerDashboard.sidebar.analytics') || 'Analytics & Reports'}
        </h2>
        <button
          onClick={() => alert(t('sellerDashboard.downloadReport') || 'Downloading report...')}
          className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white rounded-md shadow-sm bg-gradient-to-r from-[#3b396d] to-[#2a285a] hover:from-[#2a285a] hover:to-[#1e1c47] focus:outline-none focus:ring-2 focus:ring-[#3b396d] transition-transform hover:scale-105"
        >
          <FiDownload className="-ml-1 mr-2 h-5 w-5" />
          {t('downloadReport') || 'Download Report'}
        </button>
      </div>

      {/* Stats Cards — Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            icon: <FiDollarSign className="h-6 w-6 text-[#3b396d]" />,
            bg: 'bg-[#3b396d]/10',
            label: t('sellerDashboard.stats.totalRevenue') || 'Total Revenue',
            value: `€${stats.totalRevenue.toLocaleString('de-DE')}`,
          },
          {
            icon: <FiShoppingCart className="h-6 w-6 text-orange-600" />,
            bg: 'bg-orange-100',
            label: t('sellerDashboard.stats.myAuctions') || 'My Auctions',
            value: stats.myAuctions,
          },
          {
            icon: <FiHeart className="h-6 w-6 text-red-600" />,
            bg: 'bg-red-100',
            label: t('sellerDashboard.stats.favourites') || 'Favourites',
            value: stats.favourites,
            onClick: handleFavouritesClick,
          },
          {
            icon: <FiUsers className="h-6 w-6 text-blue-600" />,
            bg: 'bg-blue-100',
            label: t('sellerDashboard.stats.totalAuctions') || 'Total Auctions',
            value: stats.totalPlatformAuctions,
            onClick: handlePlatformAuctionsClick,
          },
          {
            icon: <FiCheck className="h-6 w-6 text-green-600" />,
            bg: 'bg-green-100',
            label: t('sellerDashboard.stats.vehiclesSold') || 'Vehicles Sold',
            value: stats.vehiclesSold,
          },
          {
            icon: <FiAward className="h-6 w-6 text-purple-600" />,
            bg: 'bg-purple-100',
            label: t('sellerDashboard.stats.avgSellingPrice') || 'Avg. Selling Price',
            value: `€${stats.avgSellingPrice.toLocaleString('de-DE')}`,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${
              item.onClick ? 'cursor-pointer' : ''
            }`}
            onClick={item.onClick}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-xl mr-4 ${item.bg}`}>{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Company Profile & News */}
      <div className="pt-2">
        <div className="border-t border-gray-200 pt-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FiInfo className="mr-3 h-5 w-5 text-[#3b396d]" />
            {t('sellerDashboard.companyProfile') || 'Company Profile & Latest News'}
          </h2>
          <p className="text-gray-600 mt-1">
            {t('sellerDashboard.manageProfile') || 'Manage your business information and stay updated with platform news.'}
          </p>
        </div>
        <NewsLatter />
      </div>
    </div>
  );
};

export default OverviewTab;