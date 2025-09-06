// src/components/seller/AnalyticsTab.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
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
  ArcElement, // For Pie/Doughnut charts
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FiBarChart2, FiDollarSign, FiCheck, FiDownload,FiAward  } from 'react-icons/fi';

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

// --- Demo Data ---
// In a real app, this would come from props or an API call
const demoRevenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Last 6 months
  datasets: [
    {
      label: 'Gross Sales (€)',
      data: [120000, 95000, 150000, 110000, 135000, 160000], // Demo values
      backgroundColor: 'rgba(59, 57, 109, 0.7)', // Your primary color with opacity
      borderColor: 'rgba(59, 57, 109, 1)',
      borderWidth: 1,
    },
    {
      label: 'Net Earnings (€)',
      data: [108000, 85500, 135000, 99000, 121500, 144000], // Gross - assumed 10% fees
      backgroundColor: 'rgba(42, 40, 90, 0.7)', // Your secondary color with opacity
      borderColor: 'rgba(42, 40, 90, 1)',
      borderWidth: 1,
    },
  ],
};

const demoTopModelsData = {
  labels: ['BMW X5', 'Audi A6', 'Mercedes GLE', 'VW Golf GTI', 'Ford Mustang'],
  datasets: [
    {
      label: 'Units Sold',
      data: [15, 12, 10, 8, 5], // Demo values
      backgroundColor: [
        'rgba(59, 57, 109, 0.8)',
        'rgba(42, 40, 90, 0.8)',
        'rgba(248, 249, 255, 0.8)', // Light background color
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

const demoUserData = {
  stats: {
    totalRevenue: 425000,
    vehiclesSold: 15,
    sellThroughRate: '62.5%',
    avgSellingPrice: 28333,
  },
};

const demoFinancialSummary = [
  { period: 'January 2024', grossSales: 120000, fees: 12000, netEarnings: 108000 },
  { period: 'February 2024', grossSales: 95000, fees: 9500, netEarnings: 85500 },
  { period: 'March 2024', grossSales: 150000, fees: 15000, netEarnings: 135000 },
  { period: 'April 2024', grossSales: 110000, fees: 11000, netEarnings: 99000 },
  { period: 'May 2024', grossSales: 135000, fees: 13500, netEarnings: 121500 },
  { period: 'June 2024', grossSales: 160000, fees: 16000, netEarnings: 144000 },
  // YTD Total would be calculated
];

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

// --- Chart Options ---
// Define common options to ensure consistency and use translations
const getChartOptions = (t, chartTitleKey, currency = false) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        // Use your brand colors for legend text if needed
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
      position: 'right', // Position legend to the right for doughnut
      labels: {
        color: '#333',
        font: {
          size: 12,
        },
        // Use point style for better visuals with doughnut
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
          // Calculate percentage
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${value} units (${percentage}%)`;
        }
      }
    }
  },
  cutout: '60%', // Make it a doughnut, not a pie
});

// --- Component ---
const AnalyticsTab = () => {
  const { t, language } = useLanguage(); // Get translation function and current language
  const [revenueChartData, setRevenueChartData] = useState({ labels: [], datasets: [] });
  const [topModelsChartData, setTopModelsChartData] = useState({ labels: [], datasets: [] });
  const [financialSummary, setFinancialSummary] = useState([]);
  const [ytdTotals, setYtdTotals] = useState({ grossSales: 0, fees: 0, netEarnings: 0 });

  // Initialize chart data when component mounts or language changes
  useEffect(() => {
    // Set Revenue Chart Data
    setRevenueChartData({
      labels: demoRevenueData.labels.map(label => t(`months.${label.toLowerCase()}`) || label), // Translate month names if keys exist
      datasets: demoRevenueData.datasets.map(ds => ({
        ...ds,
        label: t(`sellerDashboard.analytics.${ds.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`) || ds.label // Attempt translation
      }))
    });

    // Set Top Models Chart Data
    setTopModelsChartData({
      labels: demoTopModelsData.labels,
      datasets: demoTopModelsData.datasets.map(ds => ({
        ...ds,
        label: t(`sellerDashboard.analytics.${ds.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`) || ds.label
      }))
    });

    // Set Financial Summary and calculate YTD
    setFinancialSummary(demoFinancialSummary);
    const totals = calculateYTDTotals(demoFinancialSummary);
    setYtdTotals(totals);

  }, [t, language]); // Re-run if language changes

  // Chart Options using translations
  const revenueChartOptions = getChartOptions(t, 'sellerDashboard.analytics.revenueChartTitle', true); // true for currency
  const topModelsChartOptions = doughnutOptions(t, 'sellerDashboard.analytics.topModelsChartTitle');
  // The financial summary table doesn't use Chart.js, so no options needed for it.

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
              <p className="text-xl font-bold text-gray-900">€{demoUserData.stats.totalRevenue.toLocaleString('de-DE')}</p> {/* Format currency */}
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
              <FiBarChart2 className="h-6 w-6 text-[#3b396d]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('sellerDashboard.stats.sellThroughRate') || 'Sell-Through Rate'}</p>
              <p className="text-xl font-bold text-gray-900">{demoUserData.stats.sellThroughRate}</p>
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
              <p className="text-xl font-bold text-gray-900">€{demoUserData.stats.avgSellingPrice.toLocaleString('de-DE')}</p> {/* Format currency */}
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
            {revenueChartData.labels.length > 0 ? ( // Check if data is loaded
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
            {topModelsChartData.labels.length > 0 ? ( // Check if data is loaded
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
          {/* Download button is already above, but you could have one here too if needed */}
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
              {financialSummary.map((row, index) => (
                <tr key={index} className={index === financialSummary.length - 1 ? 'bg-gray-50 font-semibold' : ''}> {/* Highlight last row (YTD) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{row.grossSales.toLocaleString('de-DE')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{row.fees.toLocaleString('de-DE')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b396d]">€{row.netEarnings.toLocaleString('de-DE')}</td>
                </tr>
              ))}
              {/* Explicit YTD Total Row */}
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