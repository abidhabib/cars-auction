import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  FiBarChart2,
  FiShoppingCart,
  FiDollarSign,
  FiHeart,
  FiCheck,
  FiDownload,
  FiAward,
  FiUsers,
  FiInfo,
  FiFileText,
  FiList,
  FiTag,
  FiPackage,
  FiCreditCard,
  FiArrowDown,
  FiArrowUp,
  FiChevronLeft, // Add back button icon
} from 'react-icons/fi';
// Import the new detail components
import MyAuctionsDetail from '../../components/seller/overviewDetails/MyAuctionsDetail';
import MyBidsDetail from '../../components/seller/overviewDetails/MyBidsDetail';
import MyFavoritesDetail from '../../components/seller/overviewDetails/MyFavoritesDetail';
import OrderHistoryDetail from '../../components//seller/overviewDetails/OrderHistoryDetail';
import AmountToPayDetail from '../../components/seller/overviewDetails/AmountToPayDetail';
import AmountToReceiveDetail from '../../components/seller/overviewDetails/AmountToReceiveDetail';
// Import React Router hooks
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Import NewsLatter
import NewsLatter from './NewsLatter';

const OverviewTab = () => {
  const { t, language } = useLanguage();
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // The useParams hook is typically used in routes with parameters like /overview/:detailId
  // For this case, we'll use the location pathname directly to determine the active detail view.

  useEffect(() => {
    const data = loadMockCarsData();
    setCars(data);
  }, [language]);

  // Calculate summary data for the main overview cards
  const dashboardData = {
    myAuctions: cars.length,
    myBids: 10, // Requires separate data
    myFavorites: 3, // Requires separate data
    orderHistory: cars.filter(car => car.status === 'delivered' || car.status === 'closed').length,
    amountToPay: cars.filter(car =>
      (car.status === 'awarded' || car.status === 'delivered') &&
      (!car.invoices?.final || car.invoices?.final?.status === 'pending')
    ).reduce((sum, car) => {
      if (car.invoices?.final?.status === 'pending') return sum + (car.invoices.final.total || car.highestBid || car.price || 0);
      if (car.status === 'awarded' && !car.invoices?.final) return sum + (car.highestBid || car.price || 0);
      return sum;
    }, 0),
    amountToReceive: cars.filter(car => car.status === 'delivered' || car.status === 'closed').reduce((sum, car) => {
      if (car.invoices?.final) return sum + (car.invoices.final.total || car.highestBid || car.price || 0);
      return sum + (car.highestBid || car.price || 0);
    }, 0),
  };

  const handleBlockClick = (blockKey) => {
    // Navigate to the specific detail route
    navigate(`/Dashboard/overview/${blockKey}`); // Adjust the base path if needed
  };

  const handleBackToOverview = () => {
    // Navigate back to the main overview route
    navigate('/Dashboard'); // Adjust the base path if needed
  };

  // Determine the active detail view based on the current route
  const activeDetail = location.pathname.split('/').pop(); // Gets the last part of the URL

  const isDetailViewActive = [
    'my-auctions',
    'my-bids',
    'my-favorites',
    'order-history',
    'amount-to-pay',
    'amount-to-receive'
  ].includes(activeDetail);

  // Render the detail view if a matching route is active, otherwise render the overview cards
  if (isDetailViewActive) {
    return (
      <div className="space-y-4">
        {/* Back Button */}
        <button
          onClick={handleBackToOverview}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#3b396d] rounded-md border border-[#3b396d] hover:bg-[#3b396d] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
        >
          <FiChevronLeft className="mr-1 h-4 w-4" />
          {t('sellerDashboard.backToOverview') || 'Back to Overview'}
        </button>

        {/* Render the selected detail component based on the route */}
        {activeDetail === 'my-auctions' && <MyAuctionsDetail cars={cars} />}
        {activeDetail === 'my-bids' && <MyBidsDetail cars={cars} />}
        {activeDetail === 'my-favorites' && <MyFavoritesDetail cars={cars} />}
        {activeDetail === 'order-history' && <OrderHistoryDetail cars={cars} />}
        {activeDetail === 'amount-to-pay' && <AmountToPayDetail cars={cars} />}
        {activeDetail === 'amount-to-receive' && <AmountToReceiveDetail cars={cars} />}
      </div>
    );
  }

  // Render the main overview cards and potentially the NewsLatter
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

      {/* Dashboard Blocks - Horizontal (flex) on large screens, vertical (stacked) on small - Smaller and Visually Appealing */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        {/* Block 1: My Auctions */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg shadow-sm border border-orange-200 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between flex-1 min-w-[150px] group" onClick={() => handleBlockClick('my-auctions')}>
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors duration-300">
              <FiShoppingCart className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">{t('sellerDashboard.blocks.myAuctions') || 'My Auctions'}</h3>
              <p className="text-lg font-bold text-gray-900">{dashboardData.myAuctions}</p>
            </div>
          </div>
        </div>

        {/* Block 2: My Bids */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between flex-1 min-w-[150px] group" onClick={() => handleBlockClick('my-bids')}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-300">
              <FiList className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">{t('sellerDashboard.blocks.myBids') || 'My Bids'}</h3>
              <p className="text-lg font-bold text-gray-900">{dashboardData.myBids}</p>
            </div>
          </div>
        </div>

        {/* Block 3: My Favorites */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg shadow-sm border border-red-200 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between flex-1 min-w-[150px] group" onClick={() => handleBlockClick('my-favorites')}>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg mr-3 group-hover:bg-red-200 transition-colors duration-300">
              <FiHeart className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">{t('sellerDashboard.blocks.myFavorites') || 'My Favorites'}</h3>
              <p className="text-lg font-bold text-gray-900">{dashboardData.myFavorites}</p>
            </div>
          </div>
        </div>

        {/* Block 4: Order History */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-sm border border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between flex-1 min-w-[150px] group" onClick={() => handleBlockClick('order-history')}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors duration-300">
              <FiPackage className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">{t('sellerDashboard.blocks.orderHistory') || 'Order History'}</h3>
              <p className="text-lg font-bold text-gray-900">{dashboardData.orderHistory}</p>
            </div>
          </div>
        </div>

        {/* Block 5: Amount to Pay */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-sm border border-purple-200 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between flex-1 min-w-[150px] group" onClick={() => handleBlockClick('amount-to-pay')}>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors duration-300">
              <FiCreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">{t('sellerDashboard.blocks.amountToPay') || 'Amount to Pay'}</h3>
              <p className="text-lg font-bold text-gray-900">€{dashboardData.amountToPay.toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>

        {/* Block 6: Amount to Receive */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg shadow-sm border border-teal-200 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between flex-1 min-w-[150px] group" onClick={() => handleBlockClick('amount-to-receive')}>
          <div className="flex items-center">
            <div className="p-2 bg-teal-100 rounded-lg mr-3 group-hover:bg-teal-200 transition-colors duration-300">
              <FiArrowUp className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">{t('sellerDashboard.blocks.amountToReceive') || 'Amount to Receive'}</h3>
              <p className="text-lg font-bold text-gray-900">€{dashboardData.amountToReceive.toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile & News - Only show if no detail view is active */}
      {!isDetailViewActive && (
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
      )}
    </div>
  );
};

export default OverviewTab;