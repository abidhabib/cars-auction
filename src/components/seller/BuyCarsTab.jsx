
// src/components/seller/BuyCarsTab.jsx
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 👈 Added
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
  FiInfo,
  FiCalendar,
  FiTool,
  FiSettings,
  FiCamera,
  FiImage,
  FiZoomIn,
  FiCheckCircle,
  FiStar,
  FiUser,
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';
import BiddingModal from './BiddingModal';
import { loadMockCarsData } from '../../mock/data/mockCarsData';

// Memoized Car Image Slider Component
 export const  CarImageSlider = memo(({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const nextImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  }, [car.id]);
  const prevImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  }, [car.id]);
  const handleImageLoad = useCallback((index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  }, []);
  const handleImageError = useCallback((e, index) => {
    e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  }, []);
  const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded({});
  }, [car.id]);
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-gray-100">
      {images.map((imgSrc, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {!imageLoaded[index] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 rounded-xl w-full h-full" />
            </div>
          )}
          <img
            src={imgSrc}
            alt={`${car.vehicleIdentification?.make} ${car.vehicleIdentification?.model} - Image ${index + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => handleImageLoad(index)}
            onError={(e) => handleImageError(e, index)}
            style={{ display: index === currentImageIndex ? 'block' : 'none' }}
          />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#3b396d] rounded-full p-1.5 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Previous image"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#3b396d] rounded-full p-1.5 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Next"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-[#3b396d] scale-125' : 'bg-white/60 hover:bg-white'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.car.id === nextProps.car.id;
});

const BuyCarsTab = ({ searchTerm, setSearchTerm }) => { // 👈 Removed externalSelectedCar, onBackToList
  const { t, language } = useLanguage();
  const navigate = useNavigate(); // 👈 For navigation
  const location = useLocation(); // 👈 To check if we're in detail view

  const [activeFilters, setActiveFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [biddingCar, setBiddingCar] = useState(null);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);
  const carsPerPage = 8;

  // If we're on /Dashboard/buy/:id or /Dashboard/buy/:id/bid, don't render the list
  const isDetailView = location.pathname.startsWith('/Dashboard/buy/') && location.pathname !== '/Dashboard/buy';

  useEffect(() => {
    const mockCars = loadMockCarsData();
    setAllCars(mockCars);
    setFilteredCars(mockCars);
  }, []);

  useEffect(() => {
    let filtered = [...allCars];
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'make':
            filtered = filtered.filter(car => car.vehicleIdentification.make.toLowerCase().includes(value.toLowerCase()));
            break;
          case 'model':
            filtered = filtered.filter(car => car.vehicleIdentification.model.toLowerCase().includes(value.toLowerCase()));
            break;
          case 'yearFrom':
            filtered = filtered.filter(car => car.vehicleIdentification.year >= parseInt(value));
            break;
          case 'yearTo':
            filtered = filtered.filter(car => car.vehicleIdentification.year <= parseInt(value));
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
          case 'auctionType':
            filtered = filtered.filter(car => car.saleType === value);
            break;
          case 'carType':
            filtered = filtered.filter(car => car.carType === value);
            break;
          case 'vatStatus':
            filtered = filtered.filter(car => car.vatStatus === value);
            break;
          default:
            break;
        }
      }
    });
    if (searchTerm) {
      const termLower = searchTerm;
      filtered = filtered.filter(car => 
        car.vehicleIdentification.make.toLowerCase().includes(termLower) ||
        car.vehicleIdentification.model.toLowerCase().includes(termLower) ||
        car.vehicleIdentification.year.toString().includes(termLower) ||
        car.location.toLowerCase().includes(termLower)
      );
    }
    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [activeFilters, allCars, searchTerm]);

 const makes = [...new Set(allCars.map(car => car.vehicleIdentification.make))];
  const getModelsByMake = (make) => {
    return [...new Set(allCars.filter(car => car.vehicleIdentification.make === make).map(car => car.vehicleIdentification.model))];
  };
  

  const handleFilterChange = (filterName, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    if (filterName === 'make') {
      setSelectedMake(value);
      setSelectedModel('');
      setActiveFilters(prev => ({
        ...prev,
        model: ''
      }));
    }
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    setSelectedMake('');
    setSelectedModel('');
    setCurrentPage(1);
  };

  const toggleFilterPanel = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  const handleViewCar = (carId) => {
    navigate(`/Dashboard/buy/${carId}`);
  };

  const handlePlaceBid = (carId) => {
    const car = allCars.find(c => c.id === carId);
    setBiddingCar(car);
    setIsBiddingModalOpen(true);
  };

  const handleBidSubmit = (bidAmount) => {
    console.log(`Bid placed on car ${biddingCar.id} with amount: €${bidAmount}`);
    setIsBiddingModalOpen(false);
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // If we're in detail or bidding view, don't render the list
  if (isDetailView) {
    return null;
  }

  return (
    <div>
      {/* Bidding Modal */}
      {biddingCar && (
        <BiddingModal
          isOpen={isBiddingModalOpen}
          onClose={() => setIsBiddingModalOpen(false)}
          car={biddingCar}
          onBidSubmit={handleBidSubmit}
          t={t}
        />
      )}
      <div className="flex flex-col lg:flex-row">
        {/* Filters Panel */}
        <div className={`lg:w-64 bg-white border-r border-gray-200 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto ${
          filterPanelOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('buyCars.filters') || 'Filters'}
            </h2>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
            >
              {t('buyCars.clearAll') || 'Clear All'}
            </button>
          </div>
          {/* Make */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Make</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {makes.map(make => (
                <label key={make} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.make === make}
                    onChange={() => handleFilterChange('make', activeFilters.make === make ? '' : make)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{make}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Model */}
          {selectedMake && (
            <div className="border-b border-gray-200 mb-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="font-medium text-gray-900 text-sm">Model</span>
                <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
              </div>
              <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
                {getModelsByMake(selectedMake).map(model => (
                  <label key={model} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.model === model}
                      onChange={() => handleFilterChange('model', activeFilters.model === model ? '' : model)}
                      className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">{model}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Year */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Year</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-3 bg-gray-50 rounded-b-lg">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="number"
                    value={activeFilters.yearFrom || ''}
                    onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="number"
                    value={activeFilters.yearTo || ''}
                    onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
                    placeholder="2024"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Price</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-3 bg-gray-50 rounded-b-lg">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="number"
                    value={activeFilters.priceFrom || ''}
                    onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
                    placeholder="€0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="number"
                    value={activeFilters.priceTo || ''}
                    onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
                    placeholder="€100,000"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Fuel Type */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Fuel Type</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(fuel => (
                <label key={fuel} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="fuelType"
                    value={fuel}
                    checked={activeFilters.fuelType === fuel}
                    onChange={() => handleFilterChange('fuelType', activeFilters.fuelType === fuel ? '' : fuel)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">{fuel}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Transmission */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Transmission</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['Automatic', 'Manual'].map(transmission => (
                <label key={transmission} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="transmission"
                    value={transmission}
                    checked={activeFilters.transmission === transmission}
                    onChange={() => handleFilterChange('transmission', activeFilters.transmission === transmission ? '' : transmission)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">{transmission}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Country */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Country</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 bg-gray-50 rounded-b-lg">
              <select
                value={activeFilters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
              >
                <option value="">All Countries</option>
                <option value="DE">Germany</option>
                <option value="NL">Netherlands</option>
              </select>
            </div>
          </div>
          {/* Auction Type */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Auction Type</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['general-auction', 'direct-buy'].map(type => (
                <label key={type} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="auctionType"
                    value={type}
                    checked={activeFilters.auctionType === type}
                    onChange={() => handleFilterChange('auctionType', activeFilters.auctionType === type ? '' : type)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">{type.replace('-', ' ').toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Car Type */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">Car Type</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['Sedan', 'SUV', 'Van', 'Truck', 'Coupe'].map(type => (
                <label key={type} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.carType === type}
                    onChange={() => handleFilterChange('carType', activeFilters.carType === type ? '' : type)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          {/* VAT Status */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="font-medium text-gray-900 text-sm">VAT Status</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['deductible', 'not-deductible'].map(status => (
                <label key={status} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="vatStatus"
                    value={status}
                    checked={activeFilters.vatStatus === status}
                    onChange={() => handleFilterChange('vatStatus', activeFilters.vatStatus === status ? '' : status)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">{status.replace('-', ' ').toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          {/* Sticky Header */}
          <div className="bg-white border-b border-gray-200 py-3 px-4 sticky top-16 z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleFilterPanel}
                className="flex items-center text-sm font-medium text-[#3b396d] hover:text-[#2a285a] lg:hidden"
              >
                <FiFilter className="mr-2 h-4 w-4" />
                Filters
                <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${filterPanelOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className="ml-4 text-sm text-gray-500 hidden sm:block">
                {filteredCars.length} results found
              </div>
            </div>
          </div>
          {/* Active Filters */}
          {(Object.keys(activeFilters).length > 0 || searchTerm) && (
            <div className="bg-white border-b border-gray-200 py-3 px-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Active Filters ({Object.keys(activeFilters).filter(key => activeFilters[key]).length + (searchTerm ? 1 : 0)})
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-white hover:text-gray-200"
                    >
                      <FiX className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                {Object.entries(activeFilters).map(([key, value]) => (
                  value && (
                    <div key={key} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                      {key}: {value}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        <FiX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
          {/* Car Grid */}
          <div className="p-4">
            {filteredCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {currentCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col h-full"
                      onClick={() => handleViewCar(car.id)}
                    >
                      <div className="flex-shrink-0">
                        <CarImageSlider car={car} />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2 flex-shrink-0">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#3b396d] line-clamp-2">
                            {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                          </h3>
                          <div className="flex items-center flex-shrink-0 ml-2">
                            {/* <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5" /> */}
                            <span className="text-base font-bold text-[#3b396d] whitespace-nowrap">
                              €{car.price?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-3 flex-shrink-0">
                          {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
                        </div>
                        <div className="text-xs text-gray-500 mb-4 space-y-1 flex-grow">
                          <div className="flex items-start">
                            <FiMapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                            <span className="truncate">{car.location}</span>
                          </div>
                          {car.auctionEnds && (
                            <div className="flex items-start">
                              <FiClock className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                              <span>{new Date(car.auctionEnds).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 mb-4 flex-grow">
                          {car.stockId && (
                            <div className="text-xs text-gray-600">
                              <div className="flex items-start">
                                <FiInfo className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400" />
                                <span>Stock ID: {car.stockId}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 mt-auto flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleViewCar(car.id); }}
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-[#3b396d] text-white text-xs font-medium rounded-lg hover:bg-[#2a285a] min-h-[36px]"
                          >
                            <FiEye className="mr-1 h-3.5 w-3.5" />
                            View
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePlaceBid(car.id); }}
                            className="flex-1 flex items-center justify-center px-3 py-2 border border-[#3b396d] text-[#3b396d] text-xs font-medium rounded-lg hover:bg-[#3b396d] hover:text-white min-h-[36px]"
                          >
                            <FaLevelUpAlt className="mr-1 h-3.5 w-3.5" />
                            Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              </>
            ) : (
              <div className="text-center py-16">
                <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">No cars found</h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-5 py-2.5 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BuyCarsTab;
