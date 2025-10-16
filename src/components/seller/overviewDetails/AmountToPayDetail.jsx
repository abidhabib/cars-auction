// src/components/sellerDashboard/overviewDetails/AmountToPayDetail.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
// Assuming CarImageSlider or a simple image component is available
// import { CarImageSlider } from '../../seller/BuyCarsTab';
import {
  FiDollarSign,
  FiMapPin,
  FiClock,
  FiEye,
  FiAward,
  FiInfo,
  FiBarChart2,
  FiTag,
  FiUsers,
  FiCheck,
  FiX,
  FiPackage,
  FiTruck,
  FiCalendar,
  FiTool,
  FiSettings,
  FiCamera,
  FiImage,
  FiZoomIn,
  FiCheckCircle,
  FiStar,
  FiUser,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiList,
  FiFileText,
  FiDownload,
  FiEdit2,
  FiFile,
  FiPaperclip,
  FiCreditCard,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AmountToPayDetail = ({ cars: initialCars }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [allMakes, setAllMakes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const auctionsPerPage = 10;

  const [filters, setFilters] = useState({
    make: '',
    status: '',
    sortBy: 'deadline-soonest',
  });

  useEffect(() => {
    if (initialCars && Array.isArray(initialCars) && initialCars.length > 0) {
      setCars(initialCars);
      const wins = initialCars.filter(car => car.status === 'awarded' || car.status === 'delivered');
      setWonAuctions(wins);
      setLoading(false);
    } else {
      setCars([]);
      setWonAuctions([]);
      setLoading(false);
    }
  }, [initialCars]);

  useEffect(() => {
    if (wonAuctions.length > 0) {
      const makes = [...new Set(wonAuctions.map(car => car.vehicleIdentification.make))];
      setAllMakes(makes);
    } else {
      setAllMakes([]);
    }
  }, [wonAuctions]);

  const { memoizedFilteredAuctions, totalUnpaidAmount } = useMemo(() => {
    let result = [...wonAuctions];

    if (filters.make) {
      result = result.filter(car => car.vehicleIdentification.make.toLowerCase().includes(filters.make.toLowerCase()));
    }

    if (filters.status) {
      result = result.filter(car => car.status === filters.status);
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'deadline-soonest':
          const deadlineA = new Date(a.saleProcess?.paymentDeadline || a.auctionEnds || '2999-12-31');
          const deadlineB = new Date(b.saleProcess?.paymentDeadline || b.auctionEnds || '2999-12-31');
          return deadlineA - deadlineB;
        case 'deadline-latest':
          const deadlineALate = new Date(a.saleProcess?.paymentDeadline || a.auctionEnds || '1970-01-01');
          const deadlineBLate = new Date(b.saleProcess?.paymentDeadline || b.auctionEnds || '1970-01-01');
          return deadlineBLate - deadlineALate;
        case 'amount-high':
          return (b.price || b.highestBid || 0) - (a.price || a.highestBid || 0);
        case 'amount-low':
          return (a.price || a.highestBid || 0) - (b.price || b.highestBid || 0);
        default:
          return 0;
      }
    });

    const totalAmount = result.reduce((sum, car) => {
      if (car.invoices?.final && car.invoices.final.status !== 'paid') {
         return sum + (car.invoices.final.total || car.invoices.final.amount || 0);
      }
      if (car.status === 'awarded') {
         return sum + (car.highestBid || car.price || 0);
      }
      return sum;
    }, 0);

    return { memoizedFilteredAuctions: result, totalUnpaidAmount: totalAmount };
  }, [wonAuctions, filters, language]);

  useEffect(() => {
    setFilteredAuctions(memoizedFilteredAuctions);
    setCurrentPage(1);
  }, [memoizedFilteredAuctions]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      make: '',
      status: '',
      sortBy: 'deadline-soonest',
    });
    setCurrentPage(1);
  };

  const handleViewAuction = (auctionId) => {
    alert(`Navigating to auction detail for car ID: ${auctionId}`);
  };

  const handleMakePayment = (auctionId, amount) => {
    alert(`Initiating payment of €${amount?.toLocaleString('de-DE')} for car ID: ${auctionId}`);
  };

  const totalPages = Math.ceil(filteredAuctions.length / auctionsPerPage);
  const indexOfLastAuction = currentPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = filteredAuctions.slice(indexOfFirstAuction, indexOfLastAuction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">{t('common.loading') || 'Loading...'}</div>;
  }

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center">
          <FiCreditCard className="mr-3 h-6 w-6 text-purple-600" />
          {t('sellerDashboard.blocks.amountToPay') || 'Amount to Pay (Won Auctions)'}
        </h3>
        {/* <p className="text-sm text-gray-600">
          {t('sellerDashboard.blocks.amountToPayDesc') || 'Overview of won auctions.'}{' '}
          {t('sellerDashboard.blocks.amountToPayUnpaid') || 'Show the total amount still unpaid, but already won.'}
        </p> */}
      </div>

      {/* Outstanding Amount Banner */}
      <div className="mb-6 p-5 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-md border border-purple-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start">
            <FiAlertCircle className="h-5 w-5 text-purple-700 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-base font-semibold text-purple-900">
                {t('sellerDashboard.amountToPaye.totalUnpaid') || 'Total Amount Still Unpaid'}
              </h4>
              <p className="text-xs text-purple-700 mt-1">
                {t('sellerDashboard.amountToPaye.outstandingDescription') || 'This is the sum of all unpaid amounts for auctions you have won.'}
              </p>
            </div>
          </div>
          <div className="mt-3 md:mt-0">
            <p className="text-3xl font-bold text-purple-900 text-right">
              €{totalUnpaidAmount.toLocaleString('de-DE')}
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section - Responsive */}
      <div className="bg-white p-5 rounded-xl shadow border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
            {/* Make Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{t('sellerDashboard.filter.make') || 'Make'}</label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">{t('sellerDashboard.filter.allMakes') || 'All Makes'}</option>
                {allMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{t('sellerDashboard.filter.status') || 'Status'}</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">{t('sellerDashboard.filter.allStatus') || 'All Statuses'}</option>
                <option value="awarded">{t('sellerDashboard.status.awarded') || 'Awarded'}</option>
                <option value="delivered">{t('sellerDashboard.status.delivered') || 'Delivered'}</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{t('sellerDashboard.filter.sortBy') || 'Sort By'}</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="deadline-soonest">{t('sellerDashboard.sort.deadlineSoonest') || 'Payment Deadline: Soonest'}</option>
                <option value="deadline-latest">{t('sellerDashboard.sort.deadlineLatest') || 'Payment Deadline: Latest'}</option>
                <option value="amount-high">{t('sellerDashboard.sort.amountHigh') || 'Amount: High to Low'}</option>
                <option value="amount-low">{t('sellerDashboard.sort.amountLow') || 'Amount: Low to High'}</option>
              </select>
            </div>
          </div>

          {/* Clear All Button */}
          <div className="flex items-center justify-end lg:justify-center">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm  text-red-500 font-medium hover:text-red-700 transition-colors duration-200 shadow-sm"
            >
              {t('sellerDashboard.clearAll') || 'Clear All'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-3 text-sm text-gray-500">
        {filteredAuctions.length} {t('sellerDashboard.resultsFound') || 'won auctions found'}
      </div>

      {/* Auctions List/Table - Responsive Row-Based Layout */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {/* Responsive Table Header (Hidden on small screens) */}
        <div className="hidden lg:grid lg:grid-cols-12 bg-gray-50 border-b border-gray-200 px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-3">{t('sellerDashboard.amountToPaye.car') || 'Car'}</div>
          <div className="col-span-2">{t('sellerDashboard.amountToPaye.details') || 'Details'}</div>
          <div className="col-span-2">{t('sellerDashboard.amountToPaye.status') || 'Status'}</div>
          <div className="col-span-2">{t('sellerDashboard.amountToPaye.payment') || 'Payment'}</div>
          <div className="col-span-3">{t('sellerDashboard.amountToPaye.actions') || 'Actions'}</div>
        </div>

        {/* Auction Rows */}
        <div className="divide-y divide-gray-200">
          {currentAuctions.length > 0 ? (
            currentAuctions.map((car) => {
              let amountOwed = 0;
              let isUnpaid = false;
              let paymentStatus = '';

              if (car.invoices?.final) {
                if (car.invoices.final.status !== 'paid') {
                  amountOwed = car.invoices.final.total || car.invoices.final.amount || 0;
                  isUnpaid = true;
                  paymentStatus = car.invoices.final.status;
                } else {
                  paymentStatus = 'paid';
                }
              } else if (car.status === 'awarded') {
                amountOwed = car.highestBid || car.price || 0;
                isUnpaid = true;
                paymentStatus = 'awaiting_invoice';
              }

              return (
                <div key={car.id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
                  {/* Mobile/Tablet Layout (Stacked) - Shown below 'lg' */}
                  <div className="lg:hidden space-y-4">
                    {/* Car Info */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                        {car.image ? (
                          <img src={car.image} alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                            <FiImage className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium">€{(car.highestBid || car.price)?.toLocaleString('de-DE')}</span>
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
                        </p>
                        <p className="text-xs text-gray-500 flex items-start mt-1">
                          <FiMapPin className="mr-1 h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{car.location}</span>
                        </p>
                        {car.stockId && (
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiInfo className="mr-1 h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Details, Status, Buyer Sections */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {/* Status */}
                      <div className="sm:col-span-1">
                        <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.amountToPaye.status') || 'Status'}:</span>
                        <div>
                          {car.status === 'awarded' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FiAward className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.awarded') || 'Awarded'}
                            </span>
                          )}
                          {car.status === 'delivered' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                            </span>
                          )}
                        </div>
                        {(car.status === 'awarded' || car.status === 'delivered') && car.saleProcess?.paymentDeadline && (
                          <p className="text-gray-500 mt-1 flex items-start">
                            <FiCalendar className="mr-1 h-3.5 w-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>{t('sellerDashboard.amountToPaye.paymentDeadline') || 'Payment Due'}: {new Date(car.saleProcess.paymentDeadline).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>

                      {/* Details (Location, Stock ID, Delivered Date) */}
                      <div className="sm:col-span-1">
                        <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.amountToPaye.details') || 'Details'}:</span>
                        <p className="text-gray-500 truncate flex items-start">
                          <FiMapPin className="mr-1 h-3.5 w-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{car.location}</span>
                        </p>
                        {car.stockId && (
                          <p className="text-gray-500 mt-1 truncate flex items-center">
                            <FiInfo className="mr-1 h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                          </p>
                        )}
                        {(car.status === 'awarded' || car.status === 'delivered') && car.saleProcess?.paymentDeadline && (
                          <p className="text-gray-500 mt-1 flex items-start">
                            <FiCalendar className="mr-1 h-3.5 w-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>{new Date(car.saleProcess.paymentDeadline).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>

                      {/* Payment */}
                      <div className="sm:col-span-1">
                        <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.amountToPaye.payment') || 'Payment'}:</span>
                        <p className="text-gray-500 truncate flex items-center">
                          <FiCreditCard className="mr-1 h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                          <span>{t('sellerDashboard.amountToPaye.amountOwed') || 'Amount Owed'}: <span className="font-medium text-purple-700">€{amountOwed.toLocaleString('de-DE')}</span></span>
                        </p>
                        <p className="text-gray-500 mt-1 truncate flex items-center">
                          <FiInfo className="mr-1 h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                          <span>
                            {t('sellerDashboard.amountToPaye.paymentStatus') || 'Payment Status'}: {
                              paymentStatus === 'paid' ? (
                                <span className="text-green-600">{t('sellerDashboard.amountToPaye.statusa.paid') || 'Paid'}</span>
                              ) : paymentStatus === 'pending' ? (
                                <span className="text-yellow-600">{t('sellerDashboard.amountToPaye.statusa.pending') || 'Pending'}</span>
                              ) : paymentStatus === 'awaiting_invoice' ? (
                                <span className="text-blue-600">{t('sellerDashboard.amountToPaye.statusa.awaitingInvoice') || 'Awaiting Invoice'}</span>
                              ) : (
                                paymentStatus
                              )
                            }
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleViewAuction(car.id)}
                        className="px-4 py-2 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] shadow-sm flex items-center justify-center flex-1 min-w-[120px]"
                      >
                        <FiEye className="mr-1 h-4 w-4" />
                        {t('sellerDashboard.viewAuctionDetails') || 'View Details'}
                      </button>
                      {isUnpaid && amountOwed > 0 && (
                        <button
                          onClick={() => handleMakePayment(car.id, amountOwed)}
                          className="px-4 py-2 text-xs font-medium text-center bg-purple-600 text-white rounded-lg hover:bg-purple-700 border border-purple-700 shadow-sm flex items-center justify-center flex-1 min-w-[120px]"
                        >
                          <FiCreditCard className="mr-1 h-4 w-4" />
                          {t('sellerDashboard.amountToPaye.makePayment') || 'Make Payment'} (€{amountOwed.toLocaleString('de-DE')})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout (Grid) - Visible from 'lg' upwards */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-5 items-start">
                    {/* Car Info */}
                    <div className="col-span-3 flex items-start">
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        {car.image ? (
                          <img src={car.image} alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                            <FiImage className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <FiDollarSign className="mr-1 h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium">€{(car.highestBid || car.price)?.toLocaleString('de-DE')}</span>
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {car.fuelType} • {car.transmission}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="col-span-2 text-xs text-gray-500">
                      <p className="flex items-start">
                        <FiMapPin className="mr-1.5 h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{car.location}</span>
                      </p>
                      {car.stockId && (
                        <p className="mt-2 flex items-center">
                          <FiInfo className="mr-1.5 h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                        </p>
                      )}
                      {(car.status === 'awarded' || car.status === 'delivered') && car.saleProcess?.paymentDeadline && (
                        <p className="mt-2 flex items-start">
                          <FiCalendar className="mr-1.5 h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span>{t('sellerDashboard.amountToPaye.paymentDeadline') || 'Payment Due'}: {new Date(car.saleProcess.paymentDeadline).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 text-xs">
                      {car.status === 'awarded' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <FiAward className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.awarded') || 'Awarded'}
                        </span>
                      )}
                      {car.status === 'delivered' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                        </span>
                      )}
                    </div>

                    {/* Payment */}
                    <div className="col-span-2 text-xs text-gray-500">
                      <p className="truncate flex items-center">
                        <FiCreditCard className="mr-1.5 h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span>{t('sellerDashboard.amountToPaye.amountOwed') || 'Amount Owed'}: <span className="font-medium text-purple-700">€{amountOwed.toLocaleString('de-DE')}</span></span>
                      </p>
                      <p className="mt-2 truncate flex items-center">
                        <FiInfo className="mr-1.5 h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span>
                          {t('sellerDashboard.amountToPaye.paymentStatus') || 'Payment Status'}: {
                            paymentStatus === 'paid' ? (
                              <span className="text-green-600">{t('sellerDashboard.amountToPaye.statusa.paid') || 'Paid'}</span>
                            ) : paymentStatus === 'pending' ? (
                              <span className="text-yellow-600">{t('sellerDashboard.amountToPaye.statusa.pending') || 'Pending'}</span>
                            ) : paymentStatus === 'awaiting_invoice' ? (
                              <span className="text-blue-600">{t('sellerDashboard.amountToPaye.statusa.awaitingInvoice') || 'Awaiting Invoice'}</span>
                            ) : (
                              paymentStatus
                            )
                          }
                        </span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewAuction(car.id)}
                        className="px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] shadow-sm flex items-center justify-center flex-1 min-w-[100px]"
                      >
                        <FiEye className="mr-1 h-3.5 w-3.5" />
                        {t('sellerDashboard.viewAuctionDetails') || 'View Details'}
                      </button>
                      {isUnpaid && amountOwed > 0 && (
                        <button
                          onClick={() => handleMakePayment(car.id, amountOwed)}
                          className="px-3 py-1.5 text-xs font-medium text-center bg-purple-600 text-white rounded-lg hover:bg-purple-700 border border-purple-700 shadow-sm flex items-center justify-center flex-1 min-w-[100px]"
                        >
                          <FiCreditCard className="mr-1 h-3.5 w-3.5" />
                          {t('sellerDashboard.amountToPaye.makePayment') || 'Make Payment'} (€{amountOwed.toLocaleString('de-DE')})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500">
               <FiCreditCard className="mx-auto h-12 w-12 text-gray-400" />
               <h3 className="mt-2 text-sm font-medium text-gray-900">{t('sellerDashboard.noResults') || 'No won auctions found'}</h3>
               <p className="mt-1 text-sm text-gray-500">
                 {t('sellerDashboard.amountToPaye.noAuctionsDescription') || 'You have not won any auctions yet, or all payments are settled.'}
               </p>
               <button
                 onClick={clearAllFilters}
                 className="mt-4 px-4 py-2 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] shadow-sm"
               >
                 {t('sellerDashboard.resetFilters') || 'Reset Filters'}
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex items-center space-x-0.5 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const showPage =
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
              const showEllipsisBefore = pageNum === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter = pageNum === currentPage + 2 && currentPage < totalPages - 2;

              if (showPage) {
                return (
                  <button
                    key={i}
                    onClick={() => paginate(pageNum)}
                    className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors min-w-[36px] ${
                      currentPage === pageNum
                        ? 'bg-[#3b396d] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={i} className="px-2 py-1.5 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AmountToPayDetail;