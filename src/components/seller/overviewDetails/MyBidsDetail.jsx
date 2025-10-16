// src/components/sellerDashboard/overviewDetails/MyBidsDetail.jsx
import React, { useState, useEffect } from 'react';
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
  FiList,
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';

const MyBidsDetail = ({ cars: initialCars }) => {
  const { t, language } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userBids, setUserBids] = useState([]); // Stores the bids placed by the current user
  const [filteredBids, setFilteredBids] = useState([]); // Stores the bids after applying filters
  const [allMakes, setAllMakes] = useState([]); // Store unique makes from the user's bids
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 8; // Adjust as needed

  // Mock: Define the current user's branch/bidder ID (replace with actual context/prop)
  const currentUserBranch = 'AutoTrade International'; // Example branch from mock data
  const currentUserBidderId = 'current_user_company'; // Example bidder ID from mock data

  // Filter states
  const [filters, setFilters] = useState({
    make: '', // Filter by car make
    status: '', // e.g., 'active', 'awarded', 'delivered', 'closed', 'on-route'
    sortBy: 'newest', // 'newest', 'oldest', 'bid-amount-high', 'bid-amount-low'
  });

  useEffect(() => {
    // If cars are passed from parent (OverviewTab), use them
    // Otherwise, load mock data (useful if this component is rendered standalone)
    if (initialCars && Array.isArray(initialCars) && initialCars.length > 0) {
      setCars(initialCars);
      // Flatten bids from all cars where the current user placed a bid
      const myBids = initialCars.flatMap(car => {
        return (car.mockBids || [])
          .filter(bid => bid.broker === currentUserBranch || bid.bidderId === currentUserBidderId) // Filter by current user
          .map(bid => ({
            ...bid,
            carId: car.id, // Add car ID to the bid object
            carInfo: { // Add relevant car info to the bid object
              make: car.vehicleIdentification.make,
              model: car.vehicleIdentification.model,
              year: car.vehicleIdentification.year,
              image: car.image,
              price: car.price,
              mileage: car.vehicleIdentification.mileage,
              mileageUnit: car.vehicleIdentification.mileageUnit,
              fuelType: car.fuelType,
              transmission: car.transmission,
              location: car.location,
              status: car.status,
              auctionEnds: car.auctionEnds,
              highestBid: car.highestBid,
              stockId: car.stockId,
              bidsCount: car.bids || car.mockBids?.length || 0,
            }
          }));
      });
      setUserBids(myBids);
      setLoading(false);
    } else {
      const mockCars = loadMockCarsData();
      setCars(mockCars);
      const myBids = mockCars.flatMap(car => {
        return (car.mockBids || [])
          .filter(bid => bid.broker === currentUserBranch || bid.bidderId === currentUserBidderId) // Filter by current user
          .map(bid => ({
            ...bid,
            carId: car.id,
            carInfo: {
              make: car.vehicleIdentification.make,
              model: car.vehicleIdentification.model,
              year: car.vehicleIdentification.year,
              image: car.image,
              price: car.price,
              mileage: car.vehicleIdentification.mileage,
              mileageUnit: car.vehicleIdentification.mileageUnit,
              fuelType: car.fuelType,
              transmission: car.transmission,
              location: car.location,
              status: car.status,
              auctionEnds: car.auctionEnds,
              highestBid: car.highestBid,
              stockId: car.stockId,
              bidsCount: car.bids || car.mockBids?.length || 0,
            }
          }));
      });
      setUserBids(myBids);
      setLoading(false);
    }
  }, [initialCars, currentUserBranch, currentUserBidderId]); // Add dependencies

  // Extract unique makes after userBids are loaded
  useEffect(() => {
    if (userBids.length > 0) {
      const makes = [...new Set(userBids.map(bid => bid.carInfo.make))];
      setAllMakes(makes);
    }
  }, [userBids]);

  // Apply filters and sorting whenever `userBids`, `filters`, or `language` changes
  useEffect(() => {
    let result = [...userBids]; // Start with the full list of user's bids

    // Filter by Make
    if (filters.make) {
      result = result.filter(bid => bid.carInfo.make.toLowerCase().includes(filters.make.toLowerCase()));
    }

    // Filter by Status (car status)
    if (filters.status) {
      result = result.filter(bid => bid.carInfo.status === filters.status);
    }

    // Apply Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          // Sort by bid timestamp, newest first
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          // Sort by bid timestamp, oldest first
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'bid-amount-high':
          // Sort by bid amount, highest first
          return b.amount - a.amount;
        case 'bid-amount-low':
          // Sort by bid amount, lowest first
          return a.amount - b.amount;
        default:
          return 0; // No sorting
      }
    });

    setFilteredBids(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [userBids, filters, language]); // Depend on userBids, filters, and language

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
      sortBy: 'newest',
    });
    setCurrentPage(1); // Reset to first page
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredBids.length / bidsPerPage);
  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = filteredBids.slice(indexOfFirstBid, indexOfLastBid);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">{t('common.loading') || 'Loading...'}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('sellerDashboard.blocks.myBids') || 'My Bids'}</h3>
      {/* <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.myBidsDesc')}</p> */}
      {/* <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.myBidsPerBranch')}</p> */}

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-900 flex items-center">
            <FiFilter className="mr-2 h-4 w-4" />
            {t('sellerDashboard.filter.title') || 'Filters'}
          </h4>
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
          >
            {t('sellerDashboard.clearAll') || 'Clear All'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Make Filter */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.make') || 'Make'}</label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
            >
              <option value="">{t('sellerDashboard.filter.allMakes') || 'All Makes'}</option>
              {allMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Status Filter (Car Status) */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filters.status') || 'Car Status'}</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
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

          {/* Sort By */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.sortBy') || 'Sort By'}</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
            >
              <option value="newest">{t('sellerDashboard.sort.newest') || 'Newest Bid'}</option>
              <option value="oldest">{t('sellerDashboard.sort.oldest') || 'Oldest Bid'}</option>
              <option value="bid-amount-high">{t('sellerDashboard.sort.bidAmountHigh') || 'Bid Amount: High to Low'}</option>
              <option value="bid-amount-low">{t('sellerDashboard.sort.bidAmountLow') || 'Bid Amount: Low to High'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {/* {(Object.values(filters).some(val => val !== '' && val !== 'newest')) && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {t('sellerDashboard.activeFilters') || 'Active Filters'} ({Object.values(filters).filter(val => val !== '' && val !== 'newest').length})
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
            {filters.sortBy !== 'newest' && ( // Don't show 'newest' as it's the default
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                {t('sellerDashboard.filters.sortBy') || 'Sort By'}: {t('sellerDashboard.sort.' + filters.sortBy) || filters.sortBy}
                <button
                  onClick={() => handleFilterChange('sortBy', 'newest')}
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
        {filteredBids.length} {t('sellerDashboard.resultsFound') || 'bids found'}
      </div>

      {/* Bids Grid - Each item represents a bid on a car by the current user */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {currentBids.map((bid) => (
          <div
            key={bid.id} // Use bid ID as key
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full"
          >
            {/* Use CarImageSlider from the car info within the bid */}
            <div className="flex-shrink-0">
              <CarImageSlider car={{ image: bid.carInfo.image, mediaAndDescription: { photos: [bid.carInfo.image] } }} />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              {/* Car Title and Bid Amount */}
              <div className="flex justify-between items-start mb-2 flex-shrink-0">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                  {bid.carInfo.year} {bid.carInfo.make} {bid.carInfo.model}
                </h3>
                <div className="flex items-center flex-shrink-0 ml-2">
                  {/* <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5" /> */}
                  <span className="text-base font-bold text-[#3b396d] whitespace-nowrap">
                    €{bid.amount?.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>

              {/* Basic Specs */}
              <div className="text-sm text-gray-600 mb-2 flex-shrink-0">
                {parseInt(bid.carInfo.mileage, 10)?.toLocaleString()} {bid.carInfo.mileageUnit} • {bid.carInfo.fuelType} • {bid.carInfo.transmission}
              </div>

              {/* Location */}
              <div className="text-xs text-gray-500 mb-2 flex-shrink-0">
                <div className="flex items-start">
                  <FiMapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                  <span className="truncate">{bid.carInfo.location}</span>
                </div>
              </div>

              {/* Bid-Specific Info */}
              <div className="text-xs text-gray-500 mb-3 space-y-1 flex-grow">
                {/* Status Badge (Car Status) */}
                <div className="mb-2">
                  {bid.carInfo.status === 'active' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FiClock className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.active') || 'Active'}
                    </span>
                  )}
                  {bid.carInfo.status === 'awarded' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <FiAward className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.awarded') || 'Awarded'}
                    </span>
                  )}
                  {bid.carInfo.status === 'delivered' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                    </span>
                  )}
                  {bid.carInfo.status === 'closed' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <FiCheck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.closed') || 'Closed'}
                    </span>
                  )}
                  {bid.carInfo.status === 'on-route' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      <FiTruck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.onRoute') || 'On Route'}
                    </span>
                  )}
                </div>

                {/* Auction End Time (for active) */}
                {bid.carInfo.status === 'active' && bid.carInfo.auctionEnds && (
                  <div className="flex items-start">
                    <FiClock className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.auctionEnds') || 'Ends'}: {new Date(bid.carInfo.auctionEnds).toLocaleString()}</span>
                  </div>
                )}

                {/* Your Bid Amount */}
                <div className="flex items-start">
                  <FiAward className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                  <span>{t('sellerDashboard.yourBid') || 'Your Bid'}: €{bid.amount?.toLocaleString('de-DE')}</span>
                </div>

                {/* Highest Bid (on the car) */}
                {bid.carInfo.highestBid && (
                  <div className="flex items-start">
                    <FiAward className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.highestBid') || 'Highest Bid'}: €{bid.carInfo.highestBid?.toLocaleString('de-DE')}</span>
                  </div>
                )}

                {/* Bid Count (on the car) */}
                {bid.carInfo.bidsCount !== undefined && (
                  <div className="flex items-start">
                    <FiUsers className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.bids') || 'Total Bids'}: {bid.carInfo.bidsCount}</span>
                  </div>
                )}

                {/* Stock ID */}
                {bid.carInfo.stockId && (
                  <div className="flex items-start">
                    <FiInfo className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {bid.carInfo.stockId}</span>
                  </div>
                )}

                {/* Broker/Branch */}
                {bid.broker && (
                  <div className="flex items-start">
                    <FiUser className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.broker') || 'Broker'}: {bid.broker}</span>
                  </div>
                )}

                {/* Note */}
                {bid.note && (
                  <div className="flex items-start">
                    <FiInfo className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                    <span>{t('sellerDashboard.note') || 'Note'}: {bid.note}</span>
                  </div>
                )}
              </div>

              {/* Bid-Specific Actions (Placeholder) */}
              <div className="mt-auto flex flex-col gap-2">
                 {/* Example: View Car Listing Button */}
                 <button
                   // onClick={() => handleViewListing(bid.carId)} // Define this function if needed
                   className="w-full px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a]"
                 >
                   {t('sellerDashboard.viewListing') || 'View Listing'}
                 </button>
                 {/* Example: View Bid Details Button (if applicable) */}
                 <button
                   // onClick={() => handleViewBidDetails(bid.id)} // Define this function if needed
                   className="w-full px-3 py-1.5 text-xs font-medium text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
                 >
                   {t('sellerDashboard.viewBidDetails') || 'View Bid Details'}
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredBids.length === 0 && (
        <div className="text-center py-16">
          <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">{t('sellerDashboard.noResults') || 'No bids found'}</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {t('sellerDashboard.noResultsDescription') || 'Try adjusting your filters'}
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-6 px-5 py-2.5 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] shadow-sm"
          >
            {t('sellerDashboard.resetFilters') || 'Reset Filters'}
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

export default MyBidsDetail;