// src/components/sellerDashboard/overviewDetails/MyFavoritesDetail.jsx
import React, { useState, useEffect } from 'react';
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
  FiHeart,
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';

const MyFavoritesDetail = ({ cars: initialCars }) => {
  const { t, language } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteCars, setFavoriteCars] = useState([]); // Stores the favorite cars
  const [filteredCars, setFilteredCars] = useState([]); // Stores the cars after applying filters
  const [allMakes, setAllMakes] = useState([]); // Store unique makes from the favorite cars
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8; // Adjust as needed

  // Mock: Define the current user's favorite car IDs (replace with actual context/prop/localStorage)
  // For demonstration, let's assume the user favorited cars with IDs 1, 3, and 5 from the mock data
  const userFavoriteCarIds = ['1', '3', '5']; // Example IDs

  // Filter states
  const [filters, setFilters] = useState({
    make: '', // Filter by car make
    status: '', // e.g., 'active', 'awarded', 'delivered', 'closed', 'on-route'
    sortBy: 'newest', // 'newest', 'oldest', 'price-high', 'price-low' (using car price)
  });

  useEffect(() => {
    // If cars are passed from parent (OverviewTab), use them
    if (initialCars && Array.isArray(initialCars) && initialCars.length > 0) {
      setCars(initialCars);
      // Filter the initial cars to get only the favorite ones
      const favorites = initialCars.filter(car => userFavoriteCarIds.includes(car.id.toString()));
      setFavoriteCars(favorites);
      setLoading(false);
    } else {
      // If no initial cars are passed, you might want to load them here,
      // but typically OverviewTab will pass them.
      // For now, just set loading to false if no cars are provided.
      setCars([]);
      setFavoriteCars([]);
      setLoading(false);
    }
  }, []); //inside the brackt [initialCars, userFavoriteCarIds ] Depend on initialCars and the mock favorite IDs

  // Extract unique makes after favoriteCars are loaded
  useEffect(() => {
    if (favoriteCars.length > 0) {
      const makes = [...new Set(favoriteCars.map(car => car.vehicleIdentification.make))];
      setAllMakes(makes);
    }
  }, [favoriteCars]);

  // Apply filters and sorting whenever `favoriteCars`, `filters`, or `language` changes
  useEffect(() => {
    let result = [...favoriteCars]; // Start with the full list of favorite cars

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
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        default:
          return 0; // No sorting
      }
    });

    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [favoriteCars, filters, language]); // Depend on favoriteCars, filters, and language

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
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('sellerDashboard.blocks.myFavorites') || 'My Favorites'}</h3>
      {/* <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.myFavoritesDesc')}</p> */}

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

          {/* Status Filter */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.status') || 'Status'}</label>
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
              <option value="newest">{t('sellerDashboard.sort.newest') || 'Newest'}</option>
              <option value="oldest">{t('sellerDashboard.sort.oldest') || 'Oldest'}</option>
              <option value="price-high">{t('sellerDashboard.sort.priceHigh') || 'Price: High to Low'}</option>
              <option value="price-low">{t('sellerDashboard.sort.priceLow') || 'Price: Low to High'}</option>
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
        {filteredCars.length} {t('sellerDashboard.resultsFound') || 'favorites found'}
      </div>

      {/* Favorites Grid - Each item represents a favorite car */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {currentCars.map((car) => (
          <div
            key={car.id} // Use car ID as key
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full"
          >
            {/* Use CarImageSlider from the car object */}
            <div className="flex-shrink-0">
              <CarImageSlider car={car} />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              {/* Car Title and Price */}
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

              {/* Car-Specific Info */}
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

              {/* Favorite Indicator */}
              <div className="mt-auto flex justify-center py-2 bg-red-50 border-t border-red-100">
                 <FiHeart className="h-5 w-5 text-red-600" />
                 <span className="ml-1 text-xs text-red-600 font-medium">{t('sellerDashboard.favorited') || 'Favorited'}</span>
              </div>

              {/* Car-Specific Actions (Placeholder) */}
              <div className="mt-2 flex flex-col gap-2">
                 {/* Example: View Listing Button */}
                 <button
                   // onClick={() => handleViewListing(car.id)} // Define this function if needed
                   className="w-full px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a]"
                 >
                   {t('sellerDashboard.viewListing') || 'View Listing'}
                 </button>
                 {/* Example: Remove from Favorites Button */}
                 <button
                   // onClick={() => handleRemoveFromFavorites(car.id)} // Define this function if needed
                   className="w-full px-3 py-1.5 text-xs font-medium text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
                 >
                   {t('sellerDashboard.removeFromFavorites') || 'Remove from Favorites'}
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCars.length === 0 && (
        <div className="text-center py-16">
          <FiHeart className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">{t('sellerDashboard.noResults') || 'No favorites found'}</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {t('sellerDashboard.noFavoritesDescription') || 'You have not added any cars to your favorites yet.'}
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

export default MyFavoritesDetail;