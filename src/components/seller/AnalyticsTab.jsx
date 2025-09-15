// src/components/seller/AnalyticsTab.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FiBarChart2, FiDollarSign, FiCheck, FiDownload, FiAward } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Helper functions for data processing
const calculateStats = (cars) => {
  const totalRevenue = cars.reduce((sum, car) => sum + car.price, 0);
  const vehiclesSold = cars.length;
  const avgSellingPrice = vehiclesSold > 0 ? Math.round(totalRevenue / vehiclesSold) : 0;
  
  // Mock sell-through rate (assuming 62.5% of inventory sold)
  const sellThroughRate = '62.5%';
  
  return {
    totalRevenue,
    vehiclesSold,
    sellThroughRate,
    avgSellingPrice
  };
};

const generateRevenueData = (cars) => {
  // Group cars by month (using registration date)
  const monthlyData = {};
  
  cars.forEach(car => {
    const date = new Date(car.registrationDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!monthlyData[key]) {
      monthlyData[key] = { grossSales: 0, netEarnings: 0 };
    }
    
    // Assume 10% platform fees
    const gross = car.price;
    const net = gross * 0.9;
    
    monthlyData[key].grossSales += gross;
    monthlyData[key].netEarnings += net;
  });
  
  const labels = Object.keys(monthlyData);
  const grossSales = labels.map(label => monthlyData[label].grossSales);
  const netEarnings = labels.map(label => monthlyData[label].netEarnings);
  
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
        label: 'Net Earnings (€)',
        data: netEarnings,
        backgroundColor: 'rgba(42, 40, 90, 0.7)',
        borderColor: 'rgba(42, 40, 90, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const generateTopModelsData = (cars) => {
  // Count models
  const modelCount = {};
  
  cars.forEach(car => {
    const model = `${car.make} ${car.model}`;
    modelCount[model] = (modelCount[model] || 0) + 1;
  });
  
  // Sort by count and take top 5
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

const generateFinancialSummary = (cars) => {
  // Group by month for financial summary
  const monthlySummary = {};
  
  cars.forEach(car => {
    const date = new Date(car.registrationDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const period = `${month} ${year}`;
    
    if (!monthlySummary[period]) {
      monthlySummary[period] = { grossSales: 0, fees: 0, netEarnings: 0 };
    }
    
    const gross = car.price;
    const fees = gross * 0.1;
    const net = gross * 0.9;
    
    monthlySummary[period].grossSales += gross;
    monthlySummary[period].fees += fees;
    monthlySummary[period].netEarnings += net;
  });
  
  // Convert to array format
  const summary = Object.entries(monthlySummary).map(([period, data]) => ({
    period,
    ...data
  }));
  
  return summary;
};

const calculateYTDTotals = (summary) => {
  return summary.reduce(
    (totals, row) => {
      totals.grossSales += row.grossSales;
      totals.fees += row.fees;
      totals.netEarnings += row.netEarnings;
      return totals;
    },
    { grossSales: 0, fees: 0, netEarnings: 0 }
  );
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
    avgSellingPrice: 0
  });
  const [revenueChartData, setRevenueChartData] = useState({ labels: [], datasets: [] });
  const [topModelsChartData, setTopModelsChartData] = useState({ labels: [], datasets: [] });
  const [financialSummary, setFinancialSummary] = useState([]);
  const [ytdTotals, setYtdTotals] = useState({ grossSales: 0, fees: 0, netEarnings: 0 });

  useEffect(() => {
    // Load data from mock cars
    const cars = loadMockCarsData();
    
    // Calculate statistics
    const calculatedStats = calculateStats(cars);
    setStats(calculatedStats);
    
    // Generate chart data
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
    
    // Generate financial summary
    const summary = generateFinancialSummary(cars);
    setFinancialSummary(summary);
    
    // Calculate YTD totals
    const totals = calculateYTDTotals(summary);
    setYtdTotals(totals);
  }, [t, language]);

  const revenueChartOptions = getChartOptions(t, 'sellerDashboard.analytics.revenueChartTitle', true);
  const topModelsChartOptions = doughnutOptions(t, 'sellerDashboard.analytics.topModelsChartTitle');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">{t('sellerDashboard.sidebar.analytics') || 'Analytics & Reports'}</h2>
        <button
          onClick={() => alert(t('sellerDashboard.downloadReport') || 'Downloading report...')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
        >
          <FiDownload className="-ml-1 mr-2 h-5 w-5" />
          {t('downloadReport') || 'Download Report'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
              <FiDollarSign className="h-6 w-6 text-[#3b396d]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('sellerDashboard.stats.totalRevenue') || 'Total Revenue'}</p>
              <p className="text-xl font-bold text-gray-900">€{stats.totalRevenue.toLocaleString('de-DE')}</p>
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
              <p className="text-xl font-bold text-gray-900">{stats.vehiclesSold}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
              <FiBarChart2 className="h-6 w-6 text-[#3b396d]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('sellerDashboard.stats.sellThroughRate') || 'Sell-Through Rate'}</p>
              <p className="text-xl font-bold text-gray-900">{stats.sellThroughRate}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-[#3b396d]/10 rounded-lg mr-4">
              <FiAward className="h-6 w-6 text-[#3b396d]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('sellerDashboard.stats.avgSellingPrice') || 'Avg. Selling Price'}</p>
              <p className="text-xl font-bold text-gray-900">€{stats.avgSellingPrice.toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t('sellerDashboard.analytics.revenueTitle') || 'Revenue Overview'}</h3>
          <div className="h-80">
            {revenueChartData.labels.length > 0 ? (
              <Bar data={revenueChartData} options={revenueChartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">{t('loading') || 'Loading chart...'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Models Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t('sellerDashboard.analytics.topModels') || 'Top Selling Models'}</h3>
          <div className="h-80">
            {topModelsChartData.labels.length > 0 ? (
              <Doughnut data={topModelsChartData} options={topModelsChartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">{t('loading') || 'Loading chart...'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Financial Summary Table */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{t('sellerDashboard.analytics.financialSummary') || 'Financial Summary'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.period') || 'Period'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.grosssales') || 'Gross Sales'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.fees') || 'Platform Fees'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.analytics.netearnings') || 'Net Earnings'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialSummary.map((row, index) => (
                <tr key={index} className={index === financialSummary.length - 1 ? 'bg-gray-50 font-semibold' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{row.grossSales.toLocaleString('de-DE')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{row.fees.toLocaleString('de-DE')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b396d]">€{row.netEarnings.toLocaleString('de-DE')}</td>
                </tr>
              ))}
              {/* YTD Total Row */}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t('sellerDashboard.analytics.ytdTotal') || 'YTD Total'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{ytdTotals.grossSales.toLocaleString('de-DE')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{ytdTotals.fees.toLocaleString('de-DE')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b396d]">€{ytdTotals.netEarnings.toLocaleString('de-DE')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;