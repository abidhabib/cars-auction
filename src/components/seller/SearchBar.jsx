// src/components/common/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiSearch, FiChevronRight, FiDollarSign, FiClock } from 'react-icons/fi';

// Mock car data - Replace with your actual mock data import
const mockCars = [
  {
    id: 'car_001',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    mileage: 25000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    color: 'Black',
    mainImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=200&q=80',
    auctionEnds: '2023-12-31T23:59:59Z',
    currentBid: 45000,
    reservePrice: 40000,
    buyItNowPrice: 52000,
    tags: ['luxury', 'suv', 'family', 'premium']
  },
  {
    id: 'car_002',
    make: 'Mercedes-Benz',
    model: 'GLE',
    year: 2023,
    mileage: 18000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    color: 'White',
    mainImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=200&q=80',
    auctionEnds: '2023-12-25T15:30:00Z',
    currentBid: 61500,
    reservePrice: 58000,
    buyItNowPrice: 68000,
    tags: ['luxury', 'suv', 'hybrid', 'premium']
  },
  {
    id: 'car_003',
    make: 'Audi',
    model: 'Q7',
    year: 2022,
    mileage: 32000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    color: 'Gray',
    mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80',
    auctionEnds: '2023-12-28T10:00:00Z',
    currentBid: 47800,
    reservePrice: 42000,
    buyItNowPrice: 52000,
    tags: ['luxury', 'suv', 'awd', 'family']
  },
  {
    id: 'car_004',
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: 2021,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    color: 'Red',
    mainImage: 'https://images.unsplash.com/photo-1549399542-7e7f8c3a8f6b?auto=format&fit=crop&w=200&q=80',
    auctionEnds: '2023-12-22T18:45:00Z',
    currentBid: 28200,
    reservePrice: 25000,
    buyItNowPrice: 32000,
    tags: ['sports', 'hatchback', 'manual', 'performance']
  },
  {
    id: 'car_005',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    mileage: 12000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    color: 'Midnight Silver',
    mainImage: 'https://images.unsplash.com/photo-1558981000-f5f2a3c4b4e4?auto=format&fit=crop&w=200&q=80',
    auctionEnds: '2023-12-30T14:20:00Z',
    currentBid: 41500,
    reservePrice: 38000,
    buyItNowPrice: 48000,
    tags: ['electric', 'sedan', 'autopilot', 'eco']
  }
];

const SearchBar = ({ className = '' }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

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
        car.make.toLowerCase().includes(termLower) ||
        car.model.toLowerCase().includes(termLower) ||
        car.year.toString().includes(termLower) ||
        car.tags.some(tag => tag.toLowerCase().includes(termLower))
      ).slice(0, 5); // Limit to 5 results
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(true);
    performSearch(value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  // Handle result click
  const handleResultClick = (carId) => {
    navigate(`/car/${carId}`);
    setShowResults(false);
    setSearchTerm('');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          placeholder={t('search.placeholder') || "Search cars by make, model, year or tags..."}
          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] text-sm"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSearchResults([]);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          {isLoading ? (
            <div className="py-4 px-4 text-center text-gray-500">
              <svg className="animate-spin h-5 w-5 mx-auto text-[#3b396d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xs mt-1">{t('search.searching') || 'Searching...'}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-1 max-h-96 overflow-y-auto">
              {searchResults.map((car) => (
                <button
                  key={car.id}
                  onClick={() => handleResultClick(car.id)}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f9ff] hover:text-[#3b396d] transition-colors"
                >
                  <img 
                    src={car.mainImage} 
                    alt={`${car.make} ${car.model}`} 
                    className="h-12 w-16 object-cover rounded mr-3"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 truncate">
                      {car.year} {car.make} {car.model}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {car.mileage?.toLocaleString()} km • {car.fuelType} • {car.transmission}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FiDollarSign className="h-3 w-3 mr-1" />
                      <span className="font-medium text-[#3b396d]">€{car.currentBid?.toLocaleString()}</span>
                      <span className="mx-2">•</span>
                      <FiClock className="h-3 w-3 mr-1" />
                      <span>{formatDate(car.auctionEnds)}</span>
                    </div>
                  </div>
                  <FiChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </button>
              ))}
              <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full text-center text-xs font-medium text-[#3b396d] hover:text-[#2a285a]"
                >
                  {t('search.viewAllResults') || 'View all results'} ({searchResults.length})
                </button>
              </div>
            </div>
          ) : searchTerm ? (
            <div className="py-4 px-4 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm mt-2">{t('search.noResults') || 'No cars found'}</p>
              <p className="text-xs mt-1">{t('search.tryDifferent') || 'Try a different search term'}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;