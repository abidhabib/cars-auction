// src/components/sellerDashboard/overviewDetails/AmountToReceiveDetail.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { CarImageSlider } from '../../seller/BuyCarsTab'; // Assuming you can import the memoized slider
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
  FiCreditCard, // Icon for Amount to Receive
  FiTrendingUp, // Icon for growth/receiving
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AmountToReceiveDetail = ({ cars: initialCars }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [soldVehicles, setSoldVehicles] = useState([]); // Stores the vehicles identified as 'sold'
  const [filteredVehicles, setFilteredVehicles] = useState([]); // Stores the vehicles after applying filters
  const [allMakes, setAllMakes] = useState([]); // Store unique makes from the sold vehicles
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10; // Adjust as needed for row layout

  // Filter states
  const [filters, setFilters] = useState({
    make: '', // Filter by car make
    status: '', // Filter by specific status ('delivered', 'closed', 'sold')
    sortBy: 'date-sold-newest', // 'date-sold-newest', 'date-sold-oldest', 'amount-high', 'amount-low'
  });

  useEffect(() => {
    // If cars are passed from parent (OverviewTab), use them
    if (initialCars && Array.isArray(initialCars) && initialCars.length > 0) {
      setCars(initialCars);
      // Filter the initial cars to get only the 'sold' vehicles
      // Based on mock data interpretation: 'delivered' or 'closed' often implies 'sold'
      const sales = initialCars.filter(car => car.status === 'delivered' || car.status === 'closed');
      setSoldVehicles(sales);
      setLoading(false);
    } else {
      // If no initial cars are passed, you might want to load them here,
      // but typically OverviewTab will pass them.
      // For now, just set loading to false if no cars are provided.
      setCars([]);
      setSoldVehicles([]);
      setLoading(false);
    }
  }, [initialCars]); // Depend on initialCars

  // Extract unique makes after soldVehicles are loaded
  useEffect(() => {
    if (soldVehicles.length > 0) {
      const makes = [...new Set(soldVehicles.map(car => car.vehicleIdentification.make))];
      setAllMakes(makes);
    } else {
        setAllMakes([]); // Clear makes if no sales
    }
  }, [soldVehicles]); // Depend only on soldVehicles

  // Apply filters and sorting whenever `soldVehicles`, `filters`, or `language` changes
  // Using useMemo for potentially expensive calculations
  const { memoizedFilteredVehicles, totalAmountToReceive } = useMemo(() => {
    let result = [...soldVehicles]; // Start with the full list of sold vehicles

    // Filter by Make
    if (filters.make) {
      result = result.filter(car => car.vehicleIdentification.make.toLowerCase().includes(filters.make.toLowerCase()));
    }

    // Filter by Status
    if (filters.status) {
      result = result.filter(car => car.status === filters.status);
    }

    // Apply Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-sold-newest':
          // Sort by sale date (assuming 'delivered' or 'closed' status has a completion date)
          // Use saleProcess.delivery.expectedAt or auctionEnds as a proxy if needed
          const dateA = new Date(a.saleProcess?.delivery?.expectedAt || a.auctionEnds || '1970-01-01');
          const dateB = new Date(b.saleProcess?.delivery?.expectedAt || b.auctionEnds || '1970-01-01');
          return dateB - dateA; // Newer dates first
        case 'date-sold-oldest':
          const dateAOld = new Date(a.saleProcess?.delivery?.expectedAt || a.auctionEnds || '1970-01-01');
          const dateBOld = new Date(b.saleProcess?.delivery?.expectedAt || b.auctionEnds || '1970-01-01');
          return dateAOld - dateBOld; // Older dates first
        case 'amount-high':
          // Sort by the amount to receive (e.g., car price or highest bid)
          return (b.price || b.highestBid || 0) - (a.price || a.highestBid || 0);
        case 'amount-low':
          return (a.price || a.highestBid || 0) - (b.price || b.highestBid || 0);
        default:
          return 0; // No sorting
      }
    });

    // Calculate the total amount to receive for the *filtered* list
    // This assumes the amount to receive is the car's price or highest bid for 'delivered'/'closed'
    // If invoices are involved, it might be invoices.final.total for paid 'final' invoices or pending ones
    const totalAmount = result.reduce((sum, car) => {
      // Check if the final invoice exists and its status
      if (car.invoices?.final) {
         if (car.invoices.final.status === 'paid') {
            // Amount received/paid
            return sum + (car.invoices.final.total || car.invoices.final.amount || 0);
         } else if (car.invoices.final.status === 'pending') {
            // Amount still to be paid out by buyer/platform
            return sum + (car.invoices.final.total || car.invoices.final.amount || 0);
         }
         // If status is something else (e.g., 'draft'), maybe don't count?
         // For "Amount to Receive", we usually care about pending/paid.
         return sum; // Default if status unclear
      }
      // If no final invoice, but the car is 'delivered' or 'closed', the amount to receive might be the bid/price
      // This logic depends on your business rules for "Amount to Receive"
      if (car.status === 'delivered' || car.status === 'closed') {
         return sum + (car.highestBid || car.price || 0);
      }
      // If 'awarded', perhaps the amount is not yet finalized.
      // Adjust this logic based on what "Amount to Receive" precisely means in your context.
      return sum;
    }, 0);

    return { memoizedFilteredVehicles: result, totalAmountToReceive: totalAmount };
  }, [soldVehicles, filters, language]); // Depend on soldVehicles, filters, and language

  // Update filteredVehicles state and reset page when memoized value changes
  useEffect(() => {
    setFilteredVehicles(memoizedFilteredVehicles);
    setCurrentPage(1); // Reset to first page when filters change
  }, [memoizedFilteredVehicles]); // Depend on the memoized value

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      make: '',
      status: '',
      sortBy: 'date-sold-newest',
    });
    setCurrentPage(1); // Reset to first page
  };

  // Handle viewing a vehicle detail (placeholder)
  const handleViewVehicle = (vehicleId) => {
    // Example navigation to a specific vehicle detail page
    // navigate(`/Dashboard/vehicles/${vehicleId}`);
    alert(`Navigating to vehicle detail for car ID: ${vehicleId}`);
  };

  // Handle initiating payout or viewing payout details (placeholder)
  const handleViewPayoutDetails = (vehicleId, amount) => {
    // Example payout initiation or detail view
    alert(`Viewing payout details for €${amount?.toLocaleString('de-DE')} (Car ID: ${vehicleId})`);
    // This might open a modal or redirect to a payout summary page
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">{t('common.loading') || 'Loading...'}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
        <FiTrendingUp className="mr-2 h-5 w-5 text-green-600" />
        {t('sellerDashboard.blocks.amountToReceive') || 'Amount to Receive (Sold Cars)'}
      </h3>
      {/* <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.amountToReceiveDesc')}</p>
      <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.amountToReceiveOutstanding')}</p> */}

      {/* Total Amount to Receive Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg shadow border border-green-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-base font-medium text-green-800 flex items-center">
              <FiTrendingUp className="mr-2 h-4 w-4" />
              {t('sellerDashboard.amountToReceive.totalOutstanding') || 'Total Amount Still to be Paid Out'}
            </h4>
            <p className="text-xs text-green-600 mt-1">
              {t('sellerDashboard.amountToReceive.outstandingDescription') || 'This is the sum of all amounts still to be received for vehicles you have sold.'}
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <p className="text-2xl font-bold text-green-900">
              €{totalAmountToReceive.toLocaleString('de-DE')}
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section - Horizontal Layout */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.make') || 'Make'}</label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className="block w-full md:w-auto px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
              >
                <option value="">{t('sellerDashboard.filter.allMakes') || 'All Makes'}</option>
                {allMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.status') || 'Sale Status'}</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="block w-full md:w-auto px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
              >
                <option value="">{t('sellerDashboard.filter.allStatus') || 'All Statuses'}</option>
                <option value="delivered">{t('sellerDashboard.status.delivered') || 'Delivered'}</option>
                <option value="closed">{t('sellerDashboard.status.closed') || 'Closed'}</option>
                {/* Add 'sold' if it's a distinct status */}
                {/* <option value="sold">{t('sellerDashboard.status.sold') || 'Sold'}</option> */}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.sortBy') || 'Sort By'}</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="block w-full md:w-auto px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
              >
                <option value="date-sold-newest">{t('sellerDashboard.sort.dateSoldNewest') || 'Sale Date: Newest'}</option>
                <option value="date-sold-oldest">{t('sellerDashboard.sort.dateSoldOldest') || 'Sale Date: Oldest'}</option>
                <option value="amount-high">{t('sellerDashboard.sort.amountHigh') || 'Amount: High to Low'}</option>
                <option value="amount-low">{t('sellerDashboard.sort.amountLow') || 'Amount: Low to High'}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 font-medium border border-red-300 rounded hover:bg-red-50 transition-colors duration-200"
            >
              {t('sellerDashboard.clearAll') || 'Clear All'}
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {/* {(Object.values(filters).some(val => val !== '' && val !== 'date-sold-newest')) && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {t('sellerDashboard.activeFilters') || 'Active Filters'} ({Object.values(filters).filter(val => val !== '' && val !== 'date-sold-newest').length})
            </span>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              {t('sellerDashboard.clearAll') || 'Clear All'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.make && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filters.make') || 'Make'}: {filters.make}
                <button
                  onClick={() => handleFilterChange('make', '')}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {filters.status && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.status.' + filters.status) || filters.status}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {filters.sortBy !== 'date-sold-newest' && ( // Don't show 'date-sold-newest' as it's the default
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filters.sortBy') || 'Sort By'}: {t('sellerDashboard.sort.' + filters.sortBy) || filters.sortBy}
                <button
                  onClick={() => handleFilterChange('sortBy', 'date-sold-newest')}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* Results Count */}
      <div className="mb-2 text-sm text-gray-500">
        {filteredVehicles.length} {t('sellerDashboard.amountToReceive.resultsFound') || 'sold vehicles found'}
      </div>

      {/* Sold Vehicles List/Table - Responsive Row-Based Layout */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Table Header (Hidden on small screens for simplicity, adjust if needed) */}
        <div className="hidden md:grid md:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-3">{t('sellerDashboard.amountToReceive.car') || 'Car'}</div>
          <div className="col-span-2">{t('sellerDashboard.amountToReceive.details') || 'Details'}</div>
          <div className="col-span-2">{t('sellerDashboard.amountToReceive.status') || 'Status'}</div>
          <div className="col-span-2">{t('sellerDashboard.amountToReceive.payout') || 'Payout'}</div>
          <div className="col-span-3">{t('sellerDashboard.amountToReceive.actions') || 'Actions'}</div>
        </div>

        {/* Sold Vehicles Rows */}
        <div className="divide-y divide-gray-200">
          {currentVehicles.length > 0 ? (
            currentVehicles.map((car) => {
              // Determine the amount to receive for this specific car
              let amountToReceive = 0;
              let payoutStatus = '';

              if (car.invoices?.final) {
                amountToReceive = car.invoices.final.total || car.invoices.final.amount || 0;
                payoutStatus = car.invoices.final.status; // e.g., 'paid', 'pending'
              } else if (car.status === 'delivered' || car.status === 'closed') {
                // If no final invoice yet, but delivered/closed, amount to receive is likely the bid/price
                amountToReceive = car.highestBid || car.price || 0;
                payoutStatus = 'awaiting_invoice'; // Or just 'pending'
              }
              // If status is 'awarded', the logic might be different (not yet sold?)

              return (
                <div key={car.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  {/* Mobile-first stacked layout */}
                  <div className="md:hidden space-y-3">
                    {/* Car Info */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                        {/* Simple image tag or placeholder if CarImageSlider isn't suitable */}
                        {car.image ? (
                          <img src={car.image} alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          <FiDollarSign className="inline mr-1 h-3 w-3" />
                          <span className="font-medium">€{(car.highestBid || car.price)?.toLocaleString('de-DE')}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
                        </p>
                        <p className="text-xs text-gray-500 flex items-start mt-1">
                          <FiMapPin className="inline mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span className="truncate">{car.location}</span>
                        </p>
                        {car.stockId && (
                          <p className="text-xs text-gray-500 mt-1">
                            <FiInfo className="inline mr-1 h-3 w-3" />
                            {t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Details, Status, Payout */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium text-gray-700">{t('sellerDashboard.amountToReceive.status') || 'Status'}:</span>
                        <div className="mt-1">
                          {car.status === 'delivered' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                            </span>
                          )}
                          {car.status === 'closed' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <FiCheck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.closed') || 'Closed'}
                            </span>
                          )}
                        </div>
                        {(car.status === 'delivered' || car.status === 'closed') && car.saleProcess?.delivery?.expectedAt && (
                          <p className="text-gray-500 mt-1 flex items-start">
                            <FiCalendar className="inline mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span>{t('sellerDashboard.amountToReceive.soldOn') || 'Sold on'}: {new Date(car.saleProcess.delivery.expectedAt).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">{t('sellerDashboard.amountToReceive.payout') || 'Payout'}:</span>
                        <p className="text-gray-500 mt-1 truncate">
                          <FiCreditCard className="inline mr-1 h-3.5 w-3.5" />
                          {t('sellerDashboard.amountToReceive.amountToReceive') || 'Amount to Receive'}: <span className="font-medium text-green-700">€{amountToReceive.toLocaleString('de-DE')}</span>
                        </p>
                        <p className="text-gray-500 mt-1 truncate">
                          <FiInfo className="inline mr-1 h-3.5 w-3.5" />
                          {t('sellerDashboard.amountToReceive.payoutStatus') || 'Payout Status'}: {
                            payoutStatus === 'paid' ? (
                              <span className="text-green-600">{t('sellerDashboard.amountToReceive.statusa.paid') || 'Paid'}</span>
                            ) : payoutStatus === 'pending' ? (
                              <span className="text-yellow-600">{t('sellerDashboard.amountToReceive.statusa.pending') || 'Pending'}</span>
                            ) : payoutStatus === 'awaiting_invoice' ? (
                              <span className="text-blue-600">{t('sellerDashboard.amountToReceive.statusa.awaitingInvoice') || 'Awaiting Invoice'}</span>
                            ) : (
                              payoutStatus
                            )
                          }
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleViewVehicle(car.id)}
                        className="px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] flex items-center justify-center flex-1 min-w-[100px]"
                      >
                        <FiEye className="mr-1 h-3.5 w-3.5" />
                        {t('sellerDashboard.viewVehicleDetails') || 'View Details'}
                      </button>
                      {/* Example: View Payout Details Button */}
                      <button
                        onClick={() => handleViewPayoutDetails(car.id, amountToReceive)}
                        className="px-3 py-1.5 text-xs font-medium text-center bg-green-600 text-white rounded-lg hover:bg-green-700 border border-green-700 flex items-center justify-center flex-1 min-w-[100px]"
                      >
                        <FiTrendingUp className="mr-1 h-3.5 w-3.5" />
                        {t('sellerDashboard.amountToReceive.viewPayout') || 'View Payout'}
                      </button>
                    </div>
                  </div>

                  {/* Desktop grid layout */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 items-start">
                    {/* Car Info */}
                    <div className="col-span-3 flex items-start">
                      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                        {/* Simple image tag or placeholder */}
                        {car.image ? (
                          <img src={car.image} alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <FiDollarSign className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span className="font-medium">€{(car.highestBid || car.price)?.toLocaleString('de-DE')}</span>
                        </p>
                        <p className="text-xs text-gray-500">
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
                        <FiMapPin className="mr-1 h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{car.location}</span>
                      </p>
                      {car.stockId && (
                        <p className="mt-1">
                          <FiInfo className="inline mr-1 h-3.5 w-3.5" />
                          {t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}
                        </p>
                      )}
                      {(car.status === 'delivered' || car.status === 'closed') && car.saleProcess?.delivery?.expectedAt && (
                        <p className="mt-1 flex items-start">
                          <FiCalendar className="mr-1 h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                          <span>{t('sellerDashboard.amountToReceive.soldOn') || 'Sold on'}: {new Date(car.saleProcess.delivery.expectedAt).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 text-xs">
                      {car.status === 'delivered' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                        </span>
                      )}
                      {car.status === 'closed' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <FiCheck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.closed') || 'Closed'}
                        </span>
                      )}
                    </div>

                    {/* Payout */}
                    <div className="col-span-2 text-xs text-gray-500">
                      <p className="truncate flex items-center">
                        <FiCreditCard className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                        <span>{t('sellerDashboard.amountToReceive.amountToReceive') || 'Amount to Receive'}: <span className="font-medium text-green-700">€{amountToReceive.toLocaleString('de-DE')}</span></span>
                      </p>
                      <p className="mt-1 truncate flex items-center">
                        <FiInfo className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                        <span>
                          {t('sellerDashboard.amountToReceive.payoutStatus') || 'Payout Status'}: {
                            payoutStatus === 'paid' ? (
                              <span className="text-green-600">{t('sellerDashboard.amountToReceive.statusa.paid') || 'Paid'}</span>
                            ) : payoutStatus === 'pending' ? (
                              <span className="text-yellow-600">{t('sellerDashboard.amountToReceive.statusa.pending') || 'Pending'}</span>
                            ) : payoutStatus === 'awaiting_invoice' ? (
                              <span className="text-blue-600">{t('sellerDashboard.amountToReceive.statusa.awaitingInvoice') || 'Awaiting Invoice'}</span>
                            ) : (
                              payoutStatus
                            )
                          }
                        </span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewVehicle(car.id)}
                        className="px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] flex items-center justify-center flex-1 min-w-[100px]"
                      >
                        <FiEye className="mr-1 h-3.5 w-3.5" />
                        {t('sellerDashboard.viewVehicleDetails') || 'View Details'}
                      </button>
                      {/* Example: View Payout Details Button */}
                      <button
                        onClick={() => handleViewPayoutDetails(car.id, amountToReceive)}
                        className="px-3 py-1.5 text-xs font-medium text-center bg-green-600 text-white rounded-lg hover:bg-green-700 border border-green-700 flex items-center justify-center flex-1 min-w-[100px]"
                      >
                        <FiTrendingUp className="mr-1 h-3.5 w-3.5" />
                        {t('sellerDashboard.amountToReceive.viewPayout') || 'View Payout'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-500">
               <FiTrendingUp className="mx-auto h-12 w-12 text-gray-400" />
               <h3 className="mt-2 text-sm font-medium text-gray-900">{t('sellerDashboard.noResults') || 'No sold vehicles found'}</h3>
               <p className="mt-1 text-sm text-gray-500">
                 {t('sellerDashboard.amountToReceive.noSalesDescription') || 'You have not sold any vehicles yet, or all payouts are processed.'}
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
              className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors min-w-[36px] ${
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
              className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
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

export default AmountToReceiveDetail;