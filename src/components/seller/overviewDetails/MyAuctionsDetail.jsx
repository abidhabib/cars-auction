// src/components/sellerDashboard/overviewDetails/MyAuctionsDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { loadMockCarsData } from '../../../mock/data/mockCarsData';
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
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';

const MyAuctionsDetail = ({ cars: initialCars }) => {
  const { t, language } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setfilteredCars] = useState([]);
  const [allMakes, setAllMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8; // Adjust as needed

  // filter states
  const [filter, setfilter] = useState({
    status: '', // e.g., 'active', 'awarded', 'delivered', 'closed', 'on-route'
    make: '',
    model: '',
    mileageFrom: '',
    mileageTo: '',
    sortBy: 'newest', // 'newest', 'oldest', 'mileage-low', 'mileage-high'
  });

  useEffect(() => {
    // If cars are passed from parent (OverviewTab), use them
    // Otherwise, load mock data (useful if this component is rendered standalone)
    if (initialCars && Array.isArray(initialCars) && initialCars.length > 0) {
      setCars(initialCars);
      setfilteredCars(initialCars); // Initially show all passed cars
      setLoading(false);
    } else {
      const mockCars = loadMockCarsData();
      setCars(mockCars);
      setfilteredCars(mockCars);
      setLoading(false);
    }
  }, [initialCars]);

  // Extract unique makes and models after cars are loaded
  useEffect(() => {
    if (cars.length > 0) {
      const makes = [...new Set(cars.map(car => car.vehicleIdentification.make))];
      setAllMakes(makes);

      // Pre-calculate all models (though filtering them later is more efficient)
      // const models = [...new Set(cars.flatMap(car => car.vehicleIdentification.model))];
      // setAllModels(models);
    }
  }, [cars]);

  // Extract unique models based on the selected make
  useEffect(() => {
    if (cars.length > 0 && filter.make) {
      const models = [...new Set(cars.filter(car => car.vehicleIdentification.make === filter.make).map(car => car.vehicleIdentification.model))];
      setAllModels(models);
    } else {
      // If no make is selected, clear the model options
      setAllModels([]);
    }
  }, [filter.make, cars]);

  // Apply filter and sorting whenever `cars`, `filter`, or `language` changes
  useEffect(() => {
    let result = [...cars]; // Start with the full list

    // Apply Status filter
    if (filter.status) {
      result = result.filter(car => car.status === filter.status);
    }

    // Apply Make filter
    if (filter.make) {
      result = result.filter(car => car.vehicleIdentification.make.toLowerCase().includes(filter.make.toLowerCase()));
    }

    // Apply Model filter (dependent on Make)
    if (filter.model) {
      result = result.filter(car => car.vehicleIdentification.model.toLowerCase().includes(filter.model.toLowerCase()));
    }

    // Apply Mileage filter
    if (filter.mileageFrom) {
      const fromKm = parseInt(filter.mileageFrom, 10);
      result = result.filter(car => parseInt(car.vehicleIdentification.mileage, 10) >= fromKm);
    }
    if (filter.mileageTo) {
      const toKm = parseInt(filter.mileageTo, 10);
      result = result.filter(car => parseInt(car.vehicleIdentification.mileage, 10) <= toKm);
    }

    // Apply Sorting
    result.sort((a, b) => {
      switch (filter.sortBy) {
        case 'newest':
          // Assuming auction start date or creation date could be used
          // Using auctionEnds as a proxy for "newest" if available, or a mock creation date
          const dateA = new Date(a.auctionTiming?.startDate || a.auctionEnds || '1970-01-01');
          const dateB = new Date(b.auctionTiming?.startDate || b.auctionEnds || '1970-01-01');
          return dateB - dateA; // Newer dates first
        case 'oldest':
          const dateAOld = new Date(a.auctionTiming?.startDate || a.auctionEnds || '1970-01-01');
          const dateBOld = new Date(b.auctionTiming?.startDate || b.auctionEnds || '1970-01-01');
          return dateAOld - dateBOld; // Older dates first
        case 'mileage-low':
          return parseInt(a.vehicleIdentification.mileage, 10) - parseInt(b.vehicleIdentification.mileage, 10);
        case 'mileage-high':
          return parseInt(b.vehicleIdentification.mileage, 10) - parseInt(a.vehicleIdentification.mileage, 10);
        default:
          return 0; // No sorting
      }
    });

    setfilteredCars(result);
    setCurrentPage(1); // Reset to first page when filter change
  }, [cars, filter, language]); // Depend on cars, filter, and language

  // Handle filter changes
  const handlefilterChange = (filterName, value) => {
    setfilter(prev => ({
      ...prev,
      [filterName]: value
    }));

    // If changing make, clear the model filter
    if (filterName === 'make') {
      setfilter(prev => ({
        ...prev,
        model: ''
      }));
    }
  };

  // Clear all filter
  const clearAllfilter = () => {
    setfilter({
      status: '',
      make: '',
      model: '',
      mileageFrom: '',
      mileageTo: '',
      sortBy: 'newest',
    });
    setCurrentPage(1); // Reset to first page
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">{t('common.loading') || 'Loading...'}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('sellerDashboard.blocks.myAuctions') || 'My Auctions'}</h3>
      {/* <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.myAuctionsDesc')}</p>
      <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.myAuctionsBids')}</p>
      <p className="text-xs text-yellow-600 font-medium mb-4">{t('sellerDashboard.blocks.myAuctionsWarning')}</p> */}

      {/* filter Section */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-900 flex items-center">
            <FiFilter className="mr-2 h-4 w-4" />
            {t('sellerDashboard.filter.title') || 'filter'}
          </h4>
          <button
            onClick={clearAllfilter}
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
          >
            {t('sellerDashboard.clearAll') || 'Clear All'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Status filter */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.status') || 'Status'}</label>
            <select
              value={filter.status}
              onChange={(e) => handlefilterChange('status', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
            >
              <option value="">{t('sellerDashboard.filter.allStatus') || 'All Statuses'}</option>
              <option value="active">{t('sellerDashboard.status.active') || 'Active'}</option>
              <option value="awarded">{t('sellerDashboard.status.awarded') || 'Awarded'}</option>
              <option value="delivered">{t('sellerDashboard.status.delivered') || 'Delivered'}</option>
              <option value="closed">{t('sellerDashboard.status.closed') || 'Closed'}</option>
              <option value="on-route">{t('sellerDashboard.status.onRoute') || 'On Route'}</option>
            </select>
          </div>

          {/* Make filter */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.make') || 'Make'}</label>
            <select
              value={filter.make}
              onChange={(e) => handlefilterChange('make', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
            >
              <option value="">{t('sellerDashboard.filter.allMakes') || 'All Makes'}</option>
              {allMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Model filter (Dependent on Make) */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.model') || 'Model'}</label>
            <select
              value={filter.model}
              onChange={(e) => handlefilterChange('model', e.target.value)}
              disabled={!filter.make} // Disable if no make is selected
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] ${!filter.make ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
            >
              <option value="">{!filter.make ? t('sellerDashboard.filter.selectMakeFirst') || 'Select Make First' : t('sellerDashboard.filter.allModels') || 'All Models'}</option>
              {allModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* Mileage From */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.mileageFrom') || 'Mileage From (km)'}</label>
            <input
              type="number"
              value={filter.mileageFrom}
              onChange={(e) => handlefilterChange('mileageFrom', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
              placeholder="0"
            />
          </div>

          {/* Mileage To */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.mileageTo') || 'Mileage To (km)'}</label>
            <input
              type="number"
              value={filter.mileageTo}
              onChange={(e) => handlefilterChange('mileageTo', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
              placeholder="200000"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.sortBy') || 'Sort By'}</label>
            <select
              value={filter.sortBy}
              onChange={(e) => handlefilterChange('sortBy', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
            >
              <option value="newest">{t('sellerDashboard.sort.newest') || 'Newest'}</option>
              <option value="oldest">{t('sellerDashboard.sort.oldest') || 'Oldest'}</option>
              <option value="mileage-low">{t('sellerDashboard.sort.mileageLow') || 'Mileage: Low to High'}</option>
              <option value="mileage-high">{t('sellerDashboard.sort.mileageHigh') || 'Mileage: High to Low'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active filter Display */}
      {/* {(Object.values(filter).some(val => val !== '' && val !== 'newest')) && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {t('sellerDashboard.activefilter') || 'Active filter'} ({Object.values(filter).filter(val => val !== '' && val !== 'newest').length})
            </span>
            <button
              onClick={clearAllfilter}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              {t('sellerDashboard.clearAll') || 'Clear All'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {filter.status && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.status.' + filter.status) || filter.status}
                <button
                  onClick={() => handlefilterChange('status', '')}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {filter.make && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filter.make') || 'Make'}: {filter.make}
                <button
                  onClick={() => handlefilterChange('make', '')}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {filter.model && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filter.model') || 'Model'}: {filter.model}
                <button
                  onClick={() => handlefilterChange('model', '')}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {(filter.mileageFrom || filter.mileageTo) && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filter.mileage') || 'Mileage'}: {filter.mileageFrom || '0'} - {filter.mileageTo || '∞'} km
                <button
                  onClick={() => { handlefilterChange('mileageFrom', ''); handlefilterChange('mileageTo', ''); }}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {filter.sortBy !== 'newest' && ( // Don't show 'newest' as it's the default
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filter.sortBy') || 'Sort By'}: {t('sellerDashboard.sort.' + filter.sortBy) || filter.sortBy}
                <button
                  onClick={() => handlefilterChange('sortBy', 'newest')}
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
      <div className="mb-4 text-sm text-gray-500">
        {filteredCars.length} {t('sellerDashboard.resultsFound') || 'results found'}
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {currentCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex-shrink-0">
              <CarImageSlider car={car} /> {/* Reuse the memoized slider */}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              {/* Title and Price */}
              <div className="flex justify-between items-start mb-2 flex-shrink-0">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                  {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                </h3>
                <div className="flex items-center flex-shrink-0 ml-2">
                  {/* <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5" /> */}
                  <span className="text-base font-bold text-[#3b396d] whitespace-nowrap">
                    €{car.price?.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>

              {/* Basic Specs */}
              <div className="text-sm text-gray-600 mb-2 flex-shrink-0">
                {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
              </div>

              {/* Location */}
              <div className="text-xs text-gray-500 mb-2 flex-shrink-0">
                <div className="flex items-start">
                  <FiMapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                  <span className="truncate">{car.location}</span>
                </div>
              </div>

              {/* Auction-Specific Info */}
              <div className="text-xs text-gray-500 mb-3 space-y-1 flex-grow">
                {/* Status Badge */}
                <div className="mb-2">
                  {car.status === 'active' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FiClock className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.active') || 'Active'}
                    </span>
                  )}
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
                  {car.status === 'closed' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <FiCheck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.closed') || 'Closed'}
                    </span>
                  )}
                  {car.status === 'on-route' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      <FiTruck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.onRoute') || 'On Route'}
                    </span>
                  )}
                </div>

                {/* Auction End Time (for active) */}
                {car.status === 'active' && car.auctionEnds && (
                  <div className="flex items-start">
                    <FiClock className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.auctionEnds') || 'Ends'}: {new Date(car.auctionEnds).toLocaleString()}</span>
                  </div>
                )}

                {/* Highest Bid (for active/awarded/delivered) */}
                {(car.status === 'active' || car.status === 'awarded' || car.status === 'delivered') && car.highestBid && (
                  <div className="flex items-start">
                    <FiAward className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.highestBid') || 'Highest Bid'}: €{car.highestBid.toLocaleString('de-DE')}</span>
                  </div>
                )}

                {/* Bid Count (for active) */}
                {car.status === 'active' && (car.bids || car.mockBids?.length) !== undefined && (
                  <div className="flex items-start">
                    <FiUsers className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.bids') || 'Bids'}: {car.bids || car.mockBids?.length || 0}</span>
                  </div>
                )}

                {/* Stock ID */}
                {car.stockId && (
                  <div className="flex items-start">
                    <FiInfo className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                  </div>
                )}
              </div>

              {/* Seller-Specific Actions or Info (Placeholder) */}
              <div className="mt-auto flex flex-col gap-2">
                 {/* Example: View Bids Button for Active Auctions */}
                 {car.status === 'active' && (
                    <button
                      // onClick={() => handleViewBids(car.id)} // Define this function if needed
                      className="w-full px-3 py-1.5 text-xs font-medium text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
                    >
                      {t('sellerDashboard.viewBids') || 'View Bids'} ({car.bids || car.mockBids?.length || 0})
                    </button>
                 )}
                 {/* Example: View Sale Process Button for Awarded/Delivered/Closed */}
                 {(car.status === 'awarded' || car.status === 'delivered' || car.status === 'closed') && (
                    <button
                      // onClick={() => handleViewSaleProcess(car.id)} // Define this function if needed
                      className="w-full px-3 py-1.5 text-xs font-medium text-center bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 border border-blue-300"
                    >
                      {t('sellerDashboard.viewSaleProcess') || 'View Sale Process'}
                    </button>
                 )}
                 {/* Example: View Listing Button */}
                 <button
                   // onClick={() => handleViewListing(car.id)} // Define this function if needed
                   className="w-full px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a]"
                 >
                   {t('sellerDashboard.viewListing') || 'View Listing'}
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCars.length === 0 && (
        <div className="text-center py-16">
          <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">{t('sellerDashboard.noResults') || 'No cars found'}</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {t('sellerDashboard.noResultsDescription') || 'Try adjusting your filter'}
          </p>
          <button
            onClick={clearAllfilter}
            className="mt-6 px-5 py-2.5 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] shadow-sm"
          >
            {t('sellerDashboard.resetfilter') || 'Reset filter'}
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
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

export default MyAuctionsDetail;