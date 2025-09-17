// src/components/seller/AnalyticsTab.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import { FiBarChart2, FiDollarSign, FiCheck, FiDownload, FiAward, FiHeart, FiShoppingCart, FiUsers, FiInfo } from 'react-icons/fi';
import NewsLatter from './NewsLatter';
import { Bar } from 'react-chartjs-2';

// Helper functions for data processing
const calculateStats = (cars) => {
  const totalRevenue = cars.reduce((sum, car) => sum + car.price, 0);
  const vehiclesSold = cars.length;
  const avgSellingPrice = vehiclesSold > 0 ? Math.round(totalRevenue / vehiclesSold) : 0;
  
  // Mock data for new stats
  const myAuctions = Math.floor(Math.random() * 15) + 3;
  const favourites = Math.floor(Math.random() * 25) + 5;
  const totalPlatformAuctions = Math.floor(Math.random() * 200) + 150;
  const sellThroughRate = '62.5%';
  
  return {
    totalRevenue,
    vehiclesSold,
    sellThroughRate,
    avgSellingPrice,
    myAuctions,
    favourites,
    totalPlatformAuctions
  };
};

const generateRevenueData = (cars) => {
  const monthlyData = {};
  
  cars.forEach(car => {
    const date = new Date(car.registrationDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!monthlyData[key]) {
      monthlyData[key] = { grossSales: 0, grossBought: 0 };
    }
    
    const grossSales = car.price;
    const grossBought = grossSales * (0.5 + Math.random());
    
    monthlyData[key].grossSales += grossSales;
    monthlyData[key].grossBought += grossBought;
  });
  
  const labels = Object.keys(monthlyData);
  const grossSales = labels.map(label => Math.round(monthlyData[label].grossSales));
  const grossBought = labels.map(label => Math.round(monthlyData[label].grossBought));
  
  return {
    labels,
    datasets: [
      {
        label: 'Gross Sales (€)',
        data: grossSales,
        backgroundColor: 'rgba(59, 57, 109, 0.7)',
        borderColor: 'rgba(59, 57, 109, 1)',
        borderWidth: 1,
      },
      {
        label: 'Gross Bought (€)',
        data: grossBought,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const generateTopModelsData = (cars) => {
  const modelCount = {};
  
  cars.forEach(car => {
    const model = `${car.make} ${car.model}`;
    modelCount[model] = (modelCount[model] || 0) + 1;
  });
  
  const sortedModels = Object.entries(modelCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const labels = sortedModels.map(([model]) => model);
  const data = sortedModels.map(([, count]) => count);
  
  return {
    labels,
    datasets: [
      {
        label: 'Units Sold',
        data,
        backgroundColor: [
          'rgba(59, 57, 109, 0.8)',
          'rgba(42, 40, 90, 0.8)',
          'rgba(248, 249, 255, 0.8)',
          'rgba(59, 57, 109, 0.5)',
          'rgba(42, 40, 90, 0.5)',
        ],
        borderColor: [
          'rgba(59, 57, 109, 1)',
          'rgba(42, 40, 90, 1)',
          'rgba(248, 249, 255, 1)',
          'rgba(59, 57, 109, 1)',
          'rgba(42, 40, 90, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

// Chart Options
const getChartOptions = (t, chartTitleKey, currency = false) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#333',
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: t(chartTitleKey) || 'Chart Title',
      font: {
        size: 16,
        weight: 'bold',
      },
      color: '#333',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
              label += ': ';
          }
          if (context.parsed.y !== null) {
              if (currency) {
                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
              } else {
                 label += context.parsed.y;
              }
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#666',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
    y: {
      ticks: {
        color: '#666',
        callback: function(value) {
            if (currency) {
                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
            }
            return value;
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
});

const doughnutOptions = (t, chartTitleKey) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#333',
        font: {
          size: 12,
        },
        usePointStyle: true,
        padding: 20,
      },
    },
    title: {
      display: true,
      text: t(chartTitleKey) || 'Chart Title',
      font: {
        size: 16,
        weight: 'bold',
      },
      color: '#333',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${value} units (${percentage}%)`;
        }
      }
    }
  },
  cutout: '60%',
});

const AnalyticsTab = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    vehiclesSold: 0,
    sellThroughRate: '0%',
    avgSellingPrice: 0,
    myAuctions: 0,
    favourites: 0,
    totalPlatformAuctions: 0
  });
  const [revenueChartData, setRevenueChartData] = useState({ labels: [], datasets: [] });
  const [topModelsChartData, setTopModelsChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const cars = loadMockCarsData();
    const calculatedStats = calculateStats(cars);
    setStats(calculatedStats);
    
    const revenueData = generateRevenueData(cars);
    const topModelsData = generateTopModelsData(cars);
    
    setRevenueChartData({
      labels: revenueData.labels.map(label => t(`months.${label.split(' ')[0].toLowerCase()}`) || label),
      datasets: revenueData.datasets.map(ds => ({
        ...ds,
        label: t(`sellerDashboard.analytics.${ds.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`) || ds.label
      }))
    });
    
    setTopModelsChartData({
      labels: topModelsData.labels,
      datasets: topModelsData.datasets.map(ds => ({
        ...ds,
        label: t(`sellerDashboard.analytics.${ds.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`) || ds.label
      }))
    });
  }, [t, language]);

  const revenueChartOptions = getChartOptions(t, 'sellerDashboard.analytics.revenueChartTitle', true);
  const topModelsChartOptions = doughnutOptions(t, 'sellerDashboard.analytics.topModelsChartTitle');

  const handleFavouritesClick = () => {
    alert(t('sellerDashboard.goToFavourites') || 'Navigating to Favourites page...');
  };

  const handlePlatformAuctionsClick = () => {
    alert(t('sellerDashboard.viewAllAuctions') || 'Navigating to All Auctions page...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiBarChart2 className="mr-2 h-6 w-6" />
          {t('sellerDashboard.sidebar.analytics') || 'Analytics & Reports'}
        </h2>
        <button
          onClick={() => alert(t('sellerDashboard.downloadReport') || 'Downloading comprehensive report...')}
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#3b396d] to-[#2a285a] hover:from-[#2a285a] hover:to-[#1e1c47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] transition-all duration-200 transform hover:scale-105"
        >
          <FiDownload className="-ml-1 mr-2 h-5 w-5" />
          {t('downloadReport') || 'Download Report'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-[#3b396d]/10 rounded-xl mr-4">
              <FiDollarSign className="h-6 w-6 text-[#3b396d]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('sellerDashboard.stats.totalRevenue') || 'Total Revenue'}</p>
              <p className="text-xl font-bold text-gray-900">€{stats.totalRevenue.toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl mr-4">
              <FiShoppingCart className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('sellerDashboard.stats.myAuctions') || 'My Auctions'}</p>
              <p className="text-xl font-bold text-gray-900">{stats.myAuctions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center cursor-pointer" onClick={handleFavouritesClick}>
            <div className="p-3 bg-red-100 rounded-xl mr-4">
              <FiHeart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('sellerDashboard.stats.favourites') || 'Favourites'}</p>
              <p className="text-xl font-bold text-gray-900">{stats.favourites}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center cursor-pointer" onClick={handlePlatformAuctionsClick}>
            <div className="p-3 bg-blue-100 rounded-xl mr-4">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('sellerDashboard.stats.totalAuctions') || 'Total Auctions'}</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalPlatformAuctions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl mr-4">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('sellerDashboard.stats.vehiclesSold') || 'Vehicles Sold'}</p>
              <p className="text-xl font-bold text-gray-900">{stats.vehiclesSold}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white px-5 py-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl mr-4">
              <FiAward className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('sellerDashboard.stats.avgSellingPrice') || 'Avg. Selling Price'}</p>
              <p className="text-xl font-bold text-gray-900">€{stats.avgSellingPrice.toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* === COMPANY PROFILE & NEWS SECTION === */}
      <div className="pt-2">
        <div className="border-t border-gray-200 pt-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FiInfo className="mr-3 h-5 w-5 text-[#3b396d]" />
            { 'Company Profile & Latest News'}
          </h2>
          <p className="text-gray-600 mt-1">
            { 'Manage your business information and stay updated with platform news.'}
          </p>
        </div>
        
        <NewsLatter />
      </div>
    </div>
  );
};

export default AnalyticsTab;