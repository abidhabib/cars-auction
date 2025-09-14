// src/components/seller/BuyCarsTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FiSearch, 
  FiFilter, 
  FiChevronDown, 
  FiChevronUp, 
  FiChevronLeft, 
  FiChevronRight, 
  FiDollarSign, 
  FiMapPin, 
  FiClock, 
  FiEye, 
  FiHeart, 
  FiTag, 
  FiPlus, 
  FiMinus, 
  FiX,
  FiAward,
  FiCheck,
  FiUser,
  FiSettings,
  FiPhone,
  FiInfo
} from 'react-icons/fi';
import { loadMockCarsData } from '../../mock/data/mockCarsData';

const BuyCarsTab = ({ searchTerm, setSearchTerm }) => {
  const { t, language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileDropdownStates, setMobileDropdownStates] = useState({
    make: false,
    model: false,
    year: false,
    price: false,
    fuelType: false,
    transmission: false,
    country: false
  });
  const [desktopDropdownStates, setDesktopDropdownStates] = useState({
    make: false,
    model: false,
    year: false,
    price: false,
    fuelType: false,
    transmission: false,
    country: false
  });
  const carsPerPage = 8;

  // Refs for dropdowns
  const dropdownRefs = {
    make: useRef(null),
    model: useRef(null),
    year: useRef(null),
    price: useRef(null),
    fuelType: useRef(null),
    transmission: useRef(null),
    country: useRef(null)
  };

  // Load mock data
  useEffect(() => {
    const mockCars = loadMockCarsData();
    setAllCars(mockCars);
    setFilteredCars(mockCars);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...allCars];
    
    // Apply active filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'make':
            filtered = filtered.filter(car => car.make.toLowerCase().includes(value.toLowerCase()));
            break;
          case 'model':
            filtered = filtered.filter(car => car.model.toLowerCase().includes(value.toLowerCase()));
            break;
          case 'yearFrom':
            filtered = filtered.filter(car => car.year >= parseInt(value));
            break;
          case 'yearTo':
            filtered = filtered.filter(car => car.year <= parseInt(value));
            break;
          case 'priceFrom':
            filtered = filtered.filter(car => car.price >= parseInt(value));
            break;
          case 'priceTo':
            filtered = filtered.filter(car => car.price <= parseInt(value));
            break;
          case 'fuelType':
            filtered = filtered.filter(car => car.fuelType === value);
            break;
          case 'transmission':
            filtered = filtered.filter(car => car.transmission === value);
            break;
          case 'country':
            filtered = filtered.filter(car => car.country === value);
            break;
          default:
            break;
        }
      }
    });
    
    // Apply search term
    if (searchTerm) {
      const termLower = searchTerm.toLowerCase();
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(termLower) ||
        car.model.toLowerCase().includes(termLower) ||
        car.year.toString().includes(termLower) ||
        car.location.toLowerCase().includes(termLower)
      );
    }
    
    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, allCars, searchTerm]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDesktopDropdownStates(prev => ({ ...prev, [key]: false }));
          setMobileDropdownStates(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get unique makes and models
  const makes = [...new Set(allCars.map(car => car.make))];
  const getModelsByMake = (make) => {
    return [...new Set(allCars.filter(car => car.make === make).map(car => car.model))];
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    
    // Clear model when make changes
    if (filterName === 'make') {
      setSelectedMake(value);
      setSelectedModel('');
      setActiveFilters(prev => ({
        ...prev,
        model: ''
      }));
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    setSelectedMake('');
    setSelectedModel('');
    setCurrentPage(1);
    setDesktopDropdownStates({
      make: false,
      model: false,
      year: false,
      price: false,
      fuelType: false,
      transmission: false,
      country: false
    });
    setMobileDropdownStates({
      make: false,
      model: false,
      year: false,
      price: false,
      fuelType: false,
      transmission: false,
      country: false
    });
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (dropdownKey) => {
    setMobileDropdownStates(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  // Toggle desktop dropdown
  const toggleDesktopDropdown = (dropdownKey) => {
    setDesktopDropdownStates(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  // Handle view car
  const handleViewCar = (carId) => {
    console.log(`Viewing car ${carId}`);
  };

  // Handle place bid
  const handlePlaceBid = (carId) => {
    console.log(`Placing bid on car ${carId}`);
  };

  // Handle buy it now
  const handleBuyItNow = (carId) => {
    console.log(`Buying car ${carId} immediately`);
  };

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Car Image Slider Component
  const CarImageSlider = ({ car }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = car.photos || [car.image];

    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    return (
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <FiChevronLeft className="h-5 w-5 text-[#3b396d]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <FiChevronRight className="h-5 w-5 text-[#3b396d]" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-[#3b396d]' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <img
          src={images[currentImageIndex]}
          alt={`${car.make} ${car.model} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
    );
  };

  // Filter Section Component
  const FilterSection = ({ title, children, isOpen, onToggle, dropdownKey }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <FiChevronDown className={`h-5 w-5 text-[#3b396d] transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>
      {isOpen && (
        <div className="p-4 space-y-3 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="">


      {/* Main Content */}
      <div className="max-w-full mx-auto  sm:px-6  py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-64 bg-white rounded-xl shadow-sm p-2 sticky top-8 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {t('buyCars.filters') || 'Filters'}
              </h2>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                {t('buyCars.clearAll') || 'Clear All'}
              </button>
            </div>

            {/* Make Filter */}
            <FilterSection
              title={t('buyCars.make') || 'Make'}
              isOpen={desktopDropdownStates.make}
              onToggle={() => toggleDesktopDropdown('make')}
              dropdownKey="make"
            >
              <div className="space-y-2">
                {makes.map(make => (
                  <label key={make} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.make === make}
                      onChange={() => handleFilterChange('make', activeFilters.make === make ? '' : make)}
                      className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{make}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Model Filter */}
            {selectedMake && (
              <FilterSection
                title={t('buyCars.model') || 'Model'}
                isOpen={desktopDropdownStates.model}
                onToggle={() => toggleDesktopDropdown('model')}
                dropdownKey="model"
              >
                <div className="space-y-2">
                  {getModelsByMake(selectedMake).map(model => (
                    <label key={model} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.model === model}
                        onChange={() => handleFilterChange('model', activeFilters.model === model ? '' : model)}
                        className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{model}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Year Range */}
            <FilterSection
              title={t('buyCars.year') || 'Year'}
              isOpen={desktopDropdownStates.year}
              onToggle={() => toggleDesktopDropdown('year')}
              dropdownKey="year"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="yearFrom" className="block text-xs text-gray-500 mb-1">
                    {t('buyCars.from') || 'From'}
                  </label>
                  <input
                    type="number"
                    id="yearFrom"
                    value={activeFilters.yearFrom || ''}
                    onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label htmlFor="yearTo" className="block text-xs text-gray-500 mb-1">
                    {t('buyCars.to') || 'To'}
                  </label>
                  <input
                    type="number"
                    id="yearTo"
                    value={activeFilters.yearTo || ''}
                    onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder="2024"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
              title={t('buyCars.price') || 'Price'}
              isOpen={desktopDropdownStates.price}
              onToggle={() => toggleDesktopDropdown('price')}
              dropdownKey="price"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="priceFrom" className="block text-xs text-gray-500 mb-1">
                    {t('buyCars.from') || 'From'}
                  </label>
                  <input
                    type="number"
                    id="priceFrom"
                    value={activeFilters.priceFrom || ''}
                    onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder="€0"
                  />
                </div>
                <div>
                  <label htmlFor="priceTo" className="block text-xs text-gray-500 mb-1">
                    {t('buyCars.to') || 'To'}
                  </label>
                  <input
                    type="number"
                    id="priceTo"
                    value={activeFilters.priceTo || ''}
                    onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder="€100,000"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Fuel Type */}
            <FilterSection
              title={t('buyCars.fuelType') || 'Fuel Type'}
              isOpen={desktopDropdownStates.fuelType}
              onToggle={() => toggleDesktopDropdown('fuelType')}
              dropdownKey="fuelType"
            >
              <div className="space-y-2">
                {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(fuel => (
                  <label key={fuel} className="flex items-center">
                    <input
                      type="radio"
                      name="fuelType"
                      value={fuel}
                      checked={activeFilters.fuelType === fuel}
                      onChange={() => handleFilterChange('fuelType', activeFilters.fuelType === fuel ? '' : fuel)}
                      className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{fuel}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Transmission */}
            <FilterSection
              title={t('buyCars.transmission') || 'Transmission'}
              isOpen={desktopDropdownStates.transmission}
              onToggle={() => toggleDesktopDropdown('transmission')}
              dropdownKey="transmission"
            >
              <div className="space-y-2">
                {['Automatic', 'Manual'].map(transmission => (
                  <label key={transmission} className="flex items-center">
                    <input
                      type="radio"
                      name="transmission"
                      value={transmission}
                      checked={activeFilters.transmission === transmission}
                      onChange={() => handleFilterChange('transmission', activeFilters.transmission === transmission ? '' : transmission)}
                      className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{transmission}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Country */}
            <FilterSection
              title={t('buyCars.country') || 'Country'}
              isOpen={desktopDropdownStates.country}
              onToggle={() => toggleDesktopDropdown('country')}
              dropdownKey="country"
            >
              <select
                value={activeFilters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
              >
                <option value="">{t('buyCars.allCountries') || 'All Countries'}</option>
                <option value="DE">Germany</option>
                <option value="NL">Netherlands</option>
                <option value="BE">Belgium</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
                <option value="UK">United Kingdom</option>
              </select>
            </FilterSection>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header with Results Count */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#3b396d] mb-1">
                    {t('buyCars.title') || 'Buy Cars'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {t('buyCars.subtitle') || 'Find your perfect vehicle from our marketplace'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {t('buyCars.resultsFound') || 'Results Found'}
                  </div>
                  <div className="text-lg font-bold text-[#3b396d]">
                    {filteredCars.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(Object.keys(activeFilters).length > 0 || searchTerm) && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <FiFilter className="h-5 w-5 text-[#3b396d] mr-2" />
                    <span className="font-medium text-gray-900">
                      {t('buyCars.activeFilters') || 'Active Filters'} ({Object.keys(activeFilters).filter(key => activeFilters[key]).length + (searchTerm ? 1 : 0)})
                    </span>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    {t('buyCars.clearAll') || 'Clear All'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                      {t('search.searchTerm') || 'Search'}: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {Object.entries(activeFilters).map(([key, value]) => (
                    value && (
                      <div key={key} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                        {key}: {value}
                        <button
                          onClick={() => handleFilterChange(key, '')}
                          className="ml-2 text-white hover:text-gray-200"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Car Grid with Image Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCars.map((car) => (
                <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  {/* Car Image Slider */}
                  <CarImageSlider car={car} />
                  
                  {/* Car Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <div className="flex items-center">
                        <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-1" />
                        <span className="text-lg font-bold text-[#3b396d]">
                          €{car.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {car.mileage?.toLocaleString()} km • {car.fuelType} • {car.transmission}
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      <div className="flex items-center mb-1">
                        <FiMapPin className="h-3 w-3 mr-1" />
                        {car.location}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="h-3 w-3 mr-1" />
                        {car.auctionEnds?.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center">
                          <FiTag className="h-3 w-3 mr-1" />
                          <span>{car.tags?.join(', ')}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center">
                          <FiAward className="h-3 w-3 mr-1" />
                          <span>{car.status === 'active' ? t('buyCars.active') || 'Active' : t('buyCars.closed') || 'Closed'}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Compact Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewCar(car.id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-[#3b396d] text-white text-xs font-medium rounded-lg hover:bg-[#2a285a] transition-colors"
                      >
                        <FiEye className="mr-1 h-3 w-3" />
                        {t('buyCars.view') || 'View'}
                      </button>
                      <button
                        onClick={() => handlePlaceBid(car.id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 border border-[#3b396d] text-[#3b396d] text-xs font-medium rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors"
                      >
                        <FiUser className="mr-1 h-3 w-3" />
                        {t('buyCars.bid') || 'Bid'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex items-center space-x-1">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-2 border rounded-md text-sm font-medium ${
                        currentPage === i + 1
                          ? 'bg-[#3b396d] text-white border-[#3b396d]'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}

            {/* No Results */}
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {t('buyCars.noResults') || 'No cars found'}
                </h3>
                <p className="mt-2 text-gray-500">
                  {t('buyCars.tryDifferentFilters') || 'Try adjusting your filters or search term'}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors"
                >
                  {t('buyCars.resetFilters') || 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCarsTab;