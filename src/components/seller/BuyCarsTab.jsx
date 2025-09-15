// src/components/seller/BuyCarsTab.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FiFilter, 
  FiChevronDown, 
  FiChevronLeft, 
  FiChevronRight, 
  FiDollarSign, 
  FiMapPin, 
  FiClock, 
  FiEye, 
  FiTag, 
  FiX,
  FiAward,
  FiUser,
  FiInfo,
  FiChevronLeft as FiBack,
  FiStar,
  FiCheckCircle
} from 'react-icons/fi';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const BuyCarsTab = ({ searchTerm, setSearchTerm }) => {
  const { t, language } = useLanguage();
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // New state for selected car
  const carsPerPage = 8;

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
    setCurrentPage(1);
  }, [activeFilters, allCars, searchTerm]);

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
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  // Handle view car - now sets the selected car
  const handleViewCar = (carId) => {
    const car = allCars.find(c => c.id === carId);
    setSelectedCar(car);
  };

  // Handle place bid
  const handlePlaceBid = (carId) => {
    console.log(`Placing bid on car ${carId}`);
  };

  // Handle back to car list
  const handleBackToList = () => {
    setSelectedCar(null);
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
      <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <FiChevronLeft className="h-4 w-4 text-[#3b396d]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <FiChevronRight className="h-4 w-4 text-[#3b396d]" />
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

  // Car Detail View Component
  const CarDetailView = ({ car }) => {
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

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US');
    };

    return (
      <div className="p-4">
        <button
          onClick={handleBackToList}
          className="flex items-center text-[#3b396d] hover:text-[#2a285a] mb-4"
        >
          <FaArrowAltCircleLeft className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Image Gallery */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-opacity"
                >
                  <FiChevronLeft className="h-6 w-6 text-[#3b396d]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-opacity"
                >
                  <FiChevronRight className="h-6 w-6 text-[#3b396d]" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-[#3b396d]' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="flex items-center mt-2">
                  <FiMapPin className="mr-1 text-gray-500" />
                  <span className="text-gray-600">{car.location}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-[#3b396d]">
                  €{car.price?.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  {t('buyCars.buyItNow')}: €{car.buyItNowPrice?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">{t('buyCars.mileage') || 'Mileage'}</div>
                <div className="font-semibold">{car.mileage?.toLocaleString()} km</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">{t('buyCars.fuelType') || 'Fuel Type'}</div>
                <div className="font-semibold">{car.fuelType}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">{t('buyCars.transmission') || 'Transmission'}</div>
                <div className="font-semibold">{car.transmission}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">{t('buyCars.condition') || 'Condition'}</div>
                <div className="font-semibold">{car.condition}</div>
              </div>
            </div>

            {/* Auction Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-800">{t('buyCars.auctionInfo') || 'Auction Information'}</h3>
                  <p className="text-sm text-blue-600">
                    {t('buyCars.auctionEnds')}: {formatDate(car.auctionEnds)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#3b396d]">
                    {car.bids} {t('buyCars.bids') || 'Bids'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('buyCars.highestBid')}: €{car.highestBid?.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={() => handlePlaceBid(car.id)}
                  className="flex-1 bg-[#3b396d] text-white py-2 px-4 rounded-lg hover:bg-[#2a285a] transition-colors"
                >
                  {t('buyCars.placeBid') || 'Place Bid'}
                </button>
                <button className="flex-1 border border-[#3b396d] text-[#3b396d] py-2 px-4 rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors">
                  {t('buyCars.buyItNow') || 'Buy It Now'}
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('buyCars.description') || 'Description'}
              </h3>
              <p className="text-gray-700">{car.description}</p>
            </div>

            {/* Inspection Report */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('buyCars.inspectionReport') || 'Inspection Report'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500">{t('buyCars.overall') || 'Overall'}</div>
                  <div className="font-bold text-lg">{car.inspectionReport.overallRating}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500">{t('buyCars.exterior') || 'Exterior'}</div>
                  <div className="font-bold text-lg">{car.inspectionReport.exterior}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500">{t('buyCars.interior') || 'Interior'}</div>
                  <div className="font-bold text-lg">{car.inspectionReport.interior}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500">{t('buyCars.mechanical') || 'Mechanical'}</div>
                  <div className="font-bold text-lg">{car.inspectionReport.mechanical}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500">{t('buyCars.accidents') || 'Accidents'}</div>
                  <div className="font-bold text-lg">{car.inspectionReport.accidentHistory}</div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('buyCars.sellerInfo') || 'Seller Information'}
              </h3>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <div className="flex items-center">
                    <h4 className="font-semibold">{car.seller}</h4>
                    {car.verified && (
                      <FiCheckCircle className="ml-2 text-green-500" title={t('buyCars.verifiedSeller') || 'Verified Seller'} />
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < Math.floor(car.sellerRating) ? 'fill-current' : ''}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {car.sellerRating} ({car.sellerReviews} {t('buyCars.reviews') || 'reviews'})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('buyCars.tags') || 'Tags'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {car.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#3b396d] text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show detail view if a car is selected
  if (selectedCar) {
    return <CarDetailView car={selectedCar} />;
  }

  return (
    <div className="">
      
      <div className="flex flex-col lg:flex-row">
        <div className={`lg:w-64 bg-white border-r border-gray-200 p-4 lg:sticky lg:h-[calc(100vh)] lg:overflow-y-auto ${
          filterPanelOpen ? 'block' : 'hidden lg:block'
        }`}>
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
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => setSelectedMake(selectedMake ? '' : makes[0])}>
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.make') || 'Make'}</span>
              <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                selectedMake ? 'rotate-180' : ''
              }`} />
            </div>
            {selectedMake && (
              <div className="p-3 space-y-2 bg-gray-50">
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
            )}
          </div>

          {/* Model Filter */}
          {selectedMake && (
            <div className="border-b border-gray-200 mb-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedModel(selectedModel ? '' : getModelsByMake(selectedMake)[0])}>
                <span className="font-medium text-gray-900 text-sm">{t('buyCars.model') || 'Model'}</span>
                <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                  selectedModel ? 'rotate-180' : ''
                }`} />
              </div>
              {selectedModel && (
                <div className="p-3 space-y-2 bg-gray-50">
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
              )}
            </div>
          )}

          {/* Year Range */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => {
                const yearFilterOpen = activeFilters.yearFrom || activeFilters.yearTo;
                if (!yearFilterOpen) {
                  handleFilterChange('yearFrom', '2020');
                  handleFilterChange('yearTo', '2024');
                } else {
                  handleFilterChange('yearFrom', '');
                  handleFilterChange('yearTo', '');
                }
              }}>
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.year') || 'Year'}</span>
              <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                (activeFilters.yearFrom || activeFilters.yearTo) ? 'rotate-180' : ''
              }`} />
            </div>
            {(activeFilters.yearFrom || activeFilters.yearTo) && (
              <div className="p-3 space-y-3 bg-gray-50">
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
                      className="block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
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
                      className="block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                      placeholder="2024"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => {
                const priceFilterOpen = activeFilters.priceFrom || activeFilters.priceTo;
                if (!priceFilterOpen) {
                  handleFilterChange('priceFrom', '0');
                  handleFilterChange('priceTo', '100000');
                } else {
                  handleFilterChange('priceFrom', '');
                  handleFilterChange('priceTo', '');
                }
              }}>
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.price') || 'Price'}</span>
              <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                (activeFilters.priceFrom || activeFilters.priceTo) ? 'rotate-180' : ''
              }`} />
            </div>
            {(activeFilters.priceFrom || activeFilters.priceTo) && (
              <div className="p-3 space-y-3 bg-gray-50">
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
                      className="block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
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
                      className="block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                      placeholder="€100,000"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fuel Type */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => {
                const fuelFilterOpen = activeFilters.fuelType;
                if (!fuelFilterOpen) {
                  handleFilterChange('fuelType', 'Petrol');
                } else {
                  handleFilterChange('fuelType', '');
                }
              }}>
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.fuelType') || 'Fuel Type'}</span>
              <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                activeFilters.fuelType ? 'rotate-180' : ''
              }`} />
            </div>
            {activeFilters.fuelType && (
              <div className="p-3 space-y-2 bg-gray-50">
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
            )}
          </div>

          {/* Transmission */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => {
                const transmissionFilterOpen = activeFilters.transmission;
                if (!transmissionFilterOpen) {
                  handleFilterChange('transmission', 'Automatic');
                } else {
                  handleFilterChange('transmission', '');
                }
              }}>
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.transmission') || 'Transmission'}</span>
              <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                activeFilters.transmission ? 'rotate-180' : ''
              }`} />
            </div>
            {activeFilters.transmission && (
              <div className="p-3 space-y-2 bg-gray-50">
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
            )}
          </div>

          {/* Country */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => {
                const countryFilterOpen = activeFilters.country;
                if (!countryFilterOpen) {
                  handleFilterChange('country', 'DE');
                } else {
                  handleFilterChange('country', '');
                }
              }}>
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.country') || 'Country'}</span>
              <FiChevronDown className={`h-4 w-4 text-[#3b396d] transition-transform ${
                activeFilters.country ? 'rotate-180' : ''
              }`} />
            </div>
            {activeFilters.country && (
              <div className="p-3 bg-gray-50">
                <select
                  value={activeFilters.country || ''}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
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
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Filter Header - CarCollect Style */}
          <div className="bg-white border-b border-gray-200 py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={toggleFilterPanel}
                  className="flex items-center text-sm font-medium text-[#3b396d] hover:text-[#2a285a]"
                >
                  <FiFilter className="mr-2 h-4 w-4" />
                  {t('buyCars.filters') || 'Filters'}
                  <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                    filterPanelOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className="ml-4 text-sm text-gray-500">
                  {filteredCars.length} {t('buyCars.resultsFound') || 'results found'}
                </div>
              </div>
             
            </div>
          </div>

          {/* Active Filters */}
          {(Object.keys(activeFilters).length > 0 || searchTerm) && (
            <div className="bg-white border-b border-gray-200 py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
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
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                    {t('search.searchTerm') || 'Search'}: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 text-white hover:text-gray-200"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {Object.entries(activeFilters).map(([key, value]) => (
                  value && (
                    <div key={key} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                      {key}: {value}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="ml-1 text-white hover:text-gray-200"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Car Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentCars.map((car) => (
                <div key={car.id} className="bg-white rounded- shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <CarImageSlider car={car} />
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <div className="flex items-center">
                        <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-1" />
                        <span className="text-base font-bold text-[#3b396d]">
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
              <div className="flex justify-center mt-6">
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
                <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
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