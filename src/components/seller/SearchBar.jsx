// src/components/common/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation might still be useful for initial search term
import { useLanguage } from '../../context/LanguageContext';
import { FiSearch, FiChevronRight, FiDollarSign, FiClock, FiGrid, FiX } from 'react-icons/fi';
import { loadMockCarsData } from '../../mock/data/mockCarsData';

const SearchBar = ({ className = '', viewMode = 'list', onSearch = null, onCarSelect = null }) => { // Added onCarSelect prop
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation(); // Keep if you still need URL-based search term handling
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsViewMode, setResultsViewMode] = useState(viewMode);
  const searchRef = useRef(null);
  const [mockCars, setMockCars] = useState([]);

  // Load mock data on component mount
  useEffect(() => {
    const cars = loadMockCarsData();
    setMockCars(cars);
  }, []);

  // Extract search term from URL on page load (optional, based on your routing needs)
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const query = params.get('q');
  //   if (query) {
  //     setSearchTerm(query);
  //     performSearch(query);
  //   }
  // }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  const performSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const termLower = term.toLowerCase();
      const results = mockCars.filter(car =>
        car.vehicleIdentification.make.toLowerCase().includes(termLower) ||
        car.vehicleIdentification.model.toLowerCase().includes(termLower) ||
        car.vehicleIdentification.year.toString().includes(termLower) ||
        car.vehicleIdentification.trim.toLowerCase().includes(termLower) ||
        (car.mediaAndDescription.headline && car.mediaAndDescription.headline.toLowerCase().includes(termLower)) ||
        car.fuelType.toLowerCase().includes(termLower) ||
        car.transmission.toLowerCase().includes(termLower) ||
        car.color.toLowerCase().includes(termLower) ||
        car.location.toLowerCase().includes(termLower)
      );

      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setShowResults(true);
      performSearch(value);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
    // Optionally call onSearch if parent needs to know about input changes
    // if (onSearch) onSearch(value);
  };

  // Handle search submission (e.g., pressing Enter)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Call parent search handler if provided (e.g., for updating URL or global state)
      if (onSearch) {
        onSearch(searchTerm);
      }
      // Keep dropdown open or close it based on your UX preference
      // setShowResults(false); // Might want to keep it open to show results
    }
  };

  // Handle result click - Call the onCarSelect callback instead of navigating
  const handleResultClick = (carId) => {
    // Find the car object
    const selectedCar = mockCars.find(car => car.id === carId);

    if (selectedCar) {
      // Call the callback passed from the parent to handle the selection
      // This allows the parent component to set the selectedCar state in BuyCarsTab
      if (onCarSelect) {
        onCarSelect(selectedCar);
      } else {
        console.warn("onCarSelect callback not provided to SearchBar");
        // Fallback to navigation if callback not provided
        navigate(`/car/${carId}`);
      }
    } else {
      console.error("Car not found for ID:", carId);
    }

    // Close the search dropdown
    setShowResults(false);
    // Optionally clear the search term
    // setSearchTerm('');
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    if (onSearch) {
      onSearch('');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format time remaining
  const formatTimeRemaining = (dateString) => {
    if (!dateString) return 'N/A';
    const endDate = new Date(dateString);
    const now = new Date();
    const diffTime = endDate - now;

    if (diffTime <= 0) return 'Ended';

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  // Get main image for car
  const getMainImage = (car) => {
    if (car.mediaAndDescription.photos && car.mediaAndDescription.photos.length > 0) {
      // Basic check for valid URL
      const photo = car.mediaAndDescription.photos[0];
      if (typeof photo === 'string' && (photo.startsWith('http') || photo.startsWith('/'))) {
        return photo;
      }
    }
    // Fallback image
    return car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setShowResults(true)}
          placeholder={t('search.placeholder') || "Search cars by make, model, year or tags..."}
          className="block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] text-base shadow-sm"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            aria-label={t('search.clear') || "Clear search"}
          >
            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-2 w-full rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          {/* Results Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">
                {searchResults.length} {t('search.results') || 'results'}
              </span>
              {searchTerm && (
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  "{searchTerm}"
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setResultsViewMode('list')}
                className={`p-1.5 rounded-md ${resultsViewMode === 'list' ? 'bg-[#3b396d] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                title={t('search.listView') || "List view"}
                aria-label={t('search.listView') || "List view"}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setResultsViewMode('grid')}
                className={`p-1.5 rounded-md ${resultsViewMode === 'grid' ? 'bg-[#3b396d] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                title={t('search.gridView') || "Grid view"}
                aria-label={t('search.gridView') || "Grid view"}
              >
                <FiGrid className="h-4 w-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="py-8 px-4 text-center">
              <svg className="animate-spin h-6 w-6 mx-auto text-[#3b396d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm mt-2 text-gray-600">{t('search.searching') || 'Searching...'}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className={`max-h-[70vh] overflow-y-auto ${resultsViewMode === 'grid' ? 'p-4' : ''}`}>
              {resultsViewMode === 'list' ? (
                // List View
                <div className="divide-y divide-gray-100">
                  {searchResults.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => handleResultClick(car.id)} // Use the modified handler
                      className="flex items-center w-full px-4 py-4 hover:bg-[#f8f9ff] transition-colors group text-left"
                      type="button" // Prevent form submission
                    >
                      <img
                        src={getMainImage(car)}
                        alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
                        className="h-16 w-20 object-cover rounded-lg mr-4"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                      />
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 group-hover:text-[#3b396d]">
                          {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FiDollarSign className="h-4 w-4 mr-1 text-[#3b396d]" />
                          <span className="font-medium text-[#3b396d]">€{car.price?.toLocaleString()}</span>
                          {car.auctionEnds && (
                            <>
                              <span className="mx-2">•</span>
                              <FiClock className="h-4 w-4 mr-1" />
                              <span>Ends {formatDate(car.auctionEnds)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <FiChevronRight className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0 group-hover:text-[#3b396d]" />
                    </button>
                  ))}
                </div>
              ) : (
                // Grid View (2 columns)
                <div className="grid grid-cols-2 gap-4">
                  {searchResults.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => handleResultClick(car.id)} // Use the modified handler
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group text-left"
                      type="button" // Prevent form submission
                    >
                      <div className="relative">
                        <img
                          src={getMainImage(car)}
                          alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                        />
                        {car.auctionEnds && (
                          <div className="absolute top-2 right-2 bg-[#3b396d] text-white text-xs font-medium px-2 py-1 rounded">
                            {formatTimeRemaining(car.auctionEnds)}
                          </div>
                        )}
                      </div>
                      <div className="p-3 text-left">
                        <div className="font-semibold text-gray-900 group-hover:text-[#3b396d] truncate">
                          {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-sm">
                            <FiDollarSign className="h-4 w-4 mr-1 text-[#3b396d]" />
                            <span className="font-bold text-[#3b396d]">€{car.price?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Optional: View All Results Button */}
              {/* <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <button
                  onClick={() => { /* Handle "View All" if needed, maybe navigate to search results page * / }}
                  className="w-full text-center text-sm font-medium text-[#3b396d] hover:text-[#2a285a]"
                >
                  {t('search.viewAllResults') || 'View all results'} ({searchResults.length})
                </button>
              </div> */}
            </div>
          ) : searchTerm ? (
            <div className="py-12 px-4 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{t('search.noResults') || 'No cars found'}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('search.tryDifferent') || 'Try a different search term'}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;