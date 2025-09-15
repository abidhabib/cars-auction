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
  FiStar,
  FiCheckCircle,
  FiCalendar,
  FiTool,
  FiSettings,
  FiCamera,
  FiImage,
  FiZoomIn,
} from 'react-icons/fi';
import { loadMockCarsData  } from '../../mock/data/mockCarsData';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';
import BiddingModal from './BiddingModal'; // We'll create this component next

const BuyCarsTab = ({ 
  searchTerm, 
  setSearchTerm,  
  externalSelectedCar, 
  onBackToList,
}) => {
  const { t, language } = useLanguage();
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [internalSelectedCar, setInternalSelectedCar] = useState(null);
  const [biddingCar, setBiddingCar] = useState(null); // State for bidding modal
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false); // State for modal visibility
  const carsPerPage = 8;
  
  const effectiveSelectedCar = externalSelectedCar || internalSelectedCar;
  
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
          default:
            break;
        }
      }
    });
    
    if (searchTerm) {
      const termLower = searchTerm.toLowerCase();
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
    const car = allCars.find(c => c.id === carId);
    setInternalSelectedCar(car);
    if (externalSelectedCar && onBackToList) {
       onBackToList();
    }
  };
  
  // Handle place bid - opens the bidding modal
  const handlePlaceBid = (carId) => {
    const car = allCars.find(c => c.id === carId);
    setBiddingCar(car);
    setIsBiddingModalOpen(true);
  };
  
  // Handle bid submission
  const handleBidSubmit = (bidAmount) => {
    console.log(`Bid placed on car ${biddingCar.id} with amount: €${bidAmount}`);
    // Here you would typically make an API call to submit the bid
    // For now, we'll just close the modal
    setIsBiddingModalOpen(false);
    // You might want to update the car's bid information here
  };
  
  const handleBackToListInternal = () => {
    setInternalSelectedCar(null);
    if (onBackToList) {
      onBackToList();
    }
  };
  
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // --- Car Image Slider Component ---
  const CarImageSlider = ({ car }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState({});
    const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];
    
    useEffect(() => {
        setCurrentImageIndex(0);
        setImageLoaded({});
    }, [car.id, images.length]);
    
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
    
    const handleImageLoad = (index) => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
    
    const handleImageError = (e, index) => {
        e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
        setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
    
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
                    alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model} - Image ${index + 1}`}
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
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#3b396d] rounded-full p-1.5 shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
              aria-label={"Previous image"}
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#3b396d] rounded-full p-1.5 shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
              aria-label={"Next"}
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
  };
  
  // --- Car Detail View Component ---
  const CarDetailView = ({ car }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState({});
    const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];
    
    useEffect(() => {
        setCurrentImageIndex(0);
        setSelectedPhotoIndex(0);
        setImageLoaded({});
    }, [car.id]);
    
    const nextImage = () => {
      const newIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(newIndex);
      setSelectedPhotoIndex(newIndex);
    };
    
    const prevImage = () => {
      const newIndex = (currentImageIndex - 1 + images.length) % images.length;
      setCurrentImageIndex(newIndex);
      setSelectedPhotoIndex(newIndex);
    };
    
    const goToImage = (index) => {
        setCurrentImageIndex(index);
        setSelectedPhotoIndex(index);
    };
    
    const handleImageLoad = (index) => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
    
    const handleImageError = (e, index) => {
        e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
        setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US');
    };
    
    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US') + 
             ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    const getConditionColor = (condition) => {
      switch (condition) {
        case 'good': return 'text-green-600';
        case 'average': return 'text-yellow-600';
        case 'poor': return 'text-orange-600';
        case 'not-working': return 'text-red-600';
        case 'worn': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };
    
    const getConditionText = (condition) => {
      return t(`addCarListing.condition.rating.${condition}`) || condition;
    };
    
    const renderDamagePoints = () => {
      if (!car.damagePoints || car.damagePoints.length === 0) {
        return <span className="text-green-600">{t('buyCars.noDamage') || 'No damage reported'}</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {car.damagePoints.map((point, index) => (
            <span key={index} className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {point}
            </span>
          ))}
        </div>
      );
    };
    
    const renderSelectedOptions = () => {
      if (!car.selectedOptions || car.selectedOptions.length === 0) {
        return <span className="text-gray-500">{t('buyCars.noOptions') || 'No options selected'}</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {car.selectedOptions.map((option, index) => (
            <span key={index} className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {option.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      );
    };
    
    const openFullscreenImage = (imageSrc, index) => {
      setFullscreenImage(imageSrc);
      setSelectedPhotoIndex(index);
    };
    
    const closeFullscreenImage = () => {
      setFullscreenImage(null);
    };
    
    const photoPositions = [
      t('addCarListing.media.frontLeft') || 'Front left',
      t('addCarListing.media.frontRight') || 'Front right',
      t('addCarListing.media.leftRear') || 'Left rear',
      t('addCarListing.media.rightRear') || 'Right rear',
      t('addCarListing.media.dashboard') || 'Dashboard',
      t('addCarListing.media.odometer') || 'Odometer',
      t('addCarListing.media.interior') || 'Interior'
    ];
    
    return (
      <div className="p-4">
        <button
          onClick={handleBackToListInternal}
          className="flex items-center text-[#3b396d] hover:text-[#2a285a] mb-4 transition-colors duration-200"
        >
          <FaArrowAltCircleLeft className="mr-2 text-lg" /> 
          Back to List
        </button>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="relative h-96 w-full overflow-hidden bg-gray-100">
            {!imageLoaded[currentImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-gray-200 rounded-xl w-full h-full" />
                </div>
            )}
            <img
              src={images[currentImageIndex]}
              alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model} - Main Image`}
              className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(currentImageIndex)}
              onError={(e) => handleImageError(e, currentImageIndex)}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#3b396d] rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
                  aria-label={ "Previous image"}
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#3b396d] rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3b396d]"
              aria-label={"Next"}
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-[90%] overflow-x-auto pb-1 hide-scrollbar">
                  {images.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'border-[#3b396d] scale-105 shadow-md' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      aria-label={`${ 'Thumbnail for'} ${index + 1}`}
                    >
                      {!imageLoaded[index] && (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <div className="animate-pulse bg-gray-200 w-full h-full" />
                        </div>
                      )}
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`} 
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => handleImageError(e, index)}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                  {car.vehicleIdentification.trim && (
                    <span className="text-lg md:text-xl font-normal text-gray-600 ml-2">({car.vehicleIdentification.trim})</span>
                  )}
                </h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <FiMapPin className="mr-1.5 text-gray-500 flex-shrink-0" />
                  <span>{car.location}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl md:text-4xl font-bold text-[#3b396d]">
                  €{car.price?.toLocaleString()}
                </div>
                {car.saleType === 'direct-buy' && car.mediaAndDescription?.directBuyPrice && (
                  <div className="text-gray-600 mt-1">
                    {t('buyCars.buyItNow')}: €{parseInt(car.mediaAndDescription.directBuyPrice)?.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('buyCars.mileage') || 'Mileage'}</div>
                <div className="font-semibold text-gray-900">{parseInt(car.vehicleIdentification.mileage)?.toLocaleString()} {car.vehicleIdentification.mileageUnit}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('buyCars.fuelType') || 'Fuel Type'}</div>
                <div className="font-semibold text-gray-900">{car.fuelType}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('buyCars.transmission') || 'Transmission'}</div>
                <div className="font-semibold text-gray-900">{car.transmission}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('buyCars.condition') || 'Condition'}</div>
                <div className="font-semibold text-gray-900">{car.condition}</div>
              </div>
            </div>
            {car.saleType === 'general-auction' && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-800 text-lg">{t('buyCars.auctionInfo') || 'Auction Information'}</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      {t('buyCars.auctionEnds')}: {formatDateTime(car.auctionTiming.endDate + 'T' + car.auctionTiming.endTime)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#3b396d]">
                      {car.bids} {t('buyCars.bids') || 'Bids'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('buyCars.highestBid')}: €{car.highestBid?.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handlePlaceBid(car.id)}
                    className="flex-1 bg-[#3b396d] text-white py-3 px-4 rounded-lg hover:bg-[#2a285a] transition-colors duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] flex items-center justify-center"
                  >
                    <FaLevelUpAlt className="mr-2" />
                    {t('buyCars.placeBid') || 'Place Bid'}
                  </button>
                  {car.buyItNowPrice && (
                    <button className="flex-1 border-2 border-[#3b396d] text-[#3b396d] py-3 px-4 rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]">
                      {t('buyCars.buyItNow') || 'Buy It Now'}
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                <FiCamera className="mr-2 text-[#3b396d]" />
                {t('addCarListing.stepDetails.step4.title') || 'Visual Documentation & Description'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.media.headlineLabel') || 'Listing Headline'}</h4>
                  <p className="text-gray-700">{car.mediaAndDescription?.headline}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.media.descriptionLabel') || 'Full Description'}</h4>
                  <p className="text-gray-700 whitespace-pre-line">{car.mediaAndDescription?.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">{t('buyCars.serviceHistory') || 'Service History'}</h4>
                  <p className="text-gray-700 capitalize">{car.mediaAndDescription?.serviceHistory || '-'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">{t('buyCars.accidentHistory') || 'Accident History'}</h4>
                  <p className="text-gray-700">
                    {car.mediaAndDescription?.hasAccident 
                      ? t('yes') || 'Yes' 
                      : t('no') || 'No'}
                  </p>
                  {car.mediaAndDescription?.hasAccident && car.mediaAndDescription?.accidentDetails && (
                    <p className="text-gray-700 mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">{car.mediaAndDescription.accidentDetails}</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center pb-1 border-b border-gray-100">
                  <FiImage className="mr-2 text-[#3b396d]" />
                  Photos
                </h4>
                {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {images.map((photo, index) => {
                        let label = `Additional Photo ${index - photoPositions.length + 1}`;
                        if (index < photoPositions.length) {
                        label = photoPositions[index];
                        }
                        return (
                        <div 
                            key={index} 
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => openFullscreenImage(photo, index)}
                        >
                            <div className="relative w-full aspect-[4/3] border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                            {!imageLoaded[index] && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-pulse bg-gray-200 w-full h-full" />
                                </div>
                            )}
                            <img 
                                src={photo} 
                                alt={label} 
                                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => handleImageLoad(index)}
                                onError={(e) => handleImageError(e, index)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                                <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xl" />
                            </div>
                            </div>
                            <span className="text-xs text-gray-600 mt-1.5 text-center truncate w-full px-1">
                            {label}
                            </span>
                        </div>
                        );
                    })}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">{t('buyCars.noPhotos') || 'No photos available for this vehicle.'}</p>
                )}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                <FiInfo className="mr-2 text-[#3b396d]" />
                {t('buyCars.vehicleIdentification') || 'Vehicle Identification'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.makeLabel') || 'Make'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.make || '-'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.modelLabel') || 'Model'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.model || '-'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.yearLabel') || 'Year'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.year || '-'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.trimLabel') || 'Trim'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.trim || '-'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.mileageLabel') || 'Mileage'}</div>
                  <div className="font-semibold text-gray-900">{parseInt(car.vehicleIdentification?.mileage, 10)?.toLocaleString() || '0'} {car.vehicleIdentification?.mileageUnit || 'km'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.licensePlateLabel') || 'License Plate'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.licensePlate || '-'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.registrationDateLabel') || 'Registration Date'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.registrationDate || '-'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.previousOwnersLabel') || 'Previous Owners'}</div>
                  <div className="font-semibold text-gray-900">{car.vehicleIdentification?.previousOwners || '0'}</div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                <FiTool className="mr-2 text-[#3b396d]" />
                {t('buyCars.conditionAssessment') || 'Condition Assessment'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.condition.technicalChecklist.title') || 'Technical Checklist'}</h4>
                  <div className="space-y-2">
                    {Object.entries(car.conditionAssessment?.technicalChecklist || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span>
                        <span className={`font-medium ${getConditionColor(value)}`}>
                          {getConditionText(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.condition.interiorChecklist.title') || 'Interior Checklist'}</h4>
                  <div className="space-y-2">
                    {Object.entries(car.conditionAssessment?.interiorChecklist || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span>
                        <span className={`font-medium ${getConditionColor(value)}`}>
                          {getConditionText(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.condition.tyreReport.title') || 'Tyre Report'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(car.conditionAssessment?.tyreReport || {}).map(([position, tyreData]) => (
                  <div key={position} className="border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm">
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      {position.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                    <div className="space-y-1.5">
                      <div className="text-xs flex justify-between">
                        <span className="text-gray-500">{t('addCarListing.condition.tyreReport.brand') || 'Brand'}:</span>
                        <span className="font-medium truncate max-w-[50%]">{tyreData.brand || '-'}</span>
                      </div>
                      <div className="text-xs flex justify-between">
                        <span className="text-gray-500">{t('addCarListing.condition.tyreReport.treadDepth') || 'Tread'}:</span>
                        <span className="font-medium">{tyreData.treadDepth ? `${tyreData.treadDepth}mm` : '-'}</span>
                      </div>
                      <div className="text-xs flex justify-between">
                        <span className="text-gray-500">{t('addCarListing.condition.tyreReport.condition') || 'Condition'}:</span>
                        <span className={`font-medium ${getConditionColor(tyreData.condition)}`}>
                          {getConditionText(tyreData.condition)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                <FiSettings className="mr-2 text-[#3b396d]" />
                {t('buyCars.exteriorOptions') || 'Exterior Options & Damages'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.exterior.damageTitle') || 'Damages'}</h4>
                  {renderDamagePoints()}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.exterior.optionsTitle') || 'Options'}</h4>
                  {renderSelectedOptions()}
                </div>
              </div>
            </div>
            {car.saleType === 'general-auction' && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                  <FiCalendar className="mr-2 text-[#3b396d]" />
                  {t('buyCars.auctionTiming') || 'Auction Timing'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.auctionTiming.startDateLabel') || 'Start Date'}</div>
                    <div className="font-semibold text-gray-900">{formatDateTime(car.auctionTiming?.startDate + 'T' + car.auctionTiming?.startTime)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.auctionTiming.endDateLabel') || 'End Date'}</div>
                    <div className="font-semibold text-gray-900">{formatDateTime(car.auctionTiming?.endDate + 'T' + car.auctionTiming?.endTime)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.auctionTiming.timezoneLabel') || 'Timezone'}</div>
                    <div className="font-semibold text-gray-900">{car.auctionTiming?.timezone || '-'}</div>
                  </div>
                </div>
              </div>
            )}
            {/* <div className="border-t border-gray-200 pt-6 mt-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                <FiUser className="mr-2 text-[#3b396d]" />
                {t('buyCars.sellerInfo') || 'Seller Information'}
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
                <div className="ml-0 sm:ml-4 mt-3 sm:mt-0">
                  <div className="flex items-center flex-wrap">
                    <h4 className="font-semibold text-lg">{car.seller?.name || 'Unknown Seller'}</h4>
                    {car.seller?.verified && (
                      <FiCheckCircle className="ml-2 text-green-500 text-lg" title={t('buyCars.verifiedSeller') || 'Verified Seller'} />
                    )}
                  </div>
                  <div className="flex items-center mt-2 flex-wrap">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${i < Math.floor(car.seller?.rating) ? 'fill-current' : ''} text-lg`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {car.seller?.rating ? car.seller.rating.toFixed(1) : 'N/A'} 
                      {car.seller?.reviews && ` (${car.seller.reviews} ${t('buyCars.reviews') || 'reviews'})`}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {t('buyCars.memberSince') || 'Member since'}: {car.seller?.memberSince ? formatDate(car.seller.memberSince) : 'N/A'}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {fullscreenImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4"
            onClick={closeFullscreenImage}
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 z-10"
              onClick={closeFullscreenImage}
              aria-label={t('buyCars.closeFullscreen') || "Close fullscreen view"}
            >
              <FiX />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={fullscreenImage} 
                alt={t('buyCars.fullscreenImage') || "Fullscreen view"} 
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 text-white text-4xl p-3 rounded-full hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-200 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = (selectedPhotoIndex - 1 + images.length) % images.length;
                      setSelectedPhotoIndex(newIndex);
                      openFullscreenImage(images[newIndex], newIndex);
                    }}
                    aria-label={ "Previous image"}
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    className="absolute right-4 text-white text-4xl p-3 rounded-full hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-200 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = (selectedPhotoIndex + 1) % images.length;
                      setSelectedPhotoIndex(newIndex);
                      openFullscreenImage(images[newIndex], newIndex);
                    }}
              aria-label={"Next"}
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  if (effectiveSelectedCar) {
    return <CarDetailView car={effectiveSelectedCar} />;
  }
  
  return (
    <div>
      {/* Add BiddingModal component */}
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
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.make') || 'Make'}</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {makes.map(make => (
                <label key={make} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded transition-colors duration-150 cursor-pointer">
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
          {selectedMake && (
            <div className="border-b border-gray-200 mb-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
                <span className="font-medium text-gray-900 text-sm">{t('buyCars.model') || 'Model'}</span>
                <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
              </div>
              <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
                {getModelsByMake(selectedMake).map(model => (
                  <label key={model} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded transition-colors duration-150 cursor-pointer">
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
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.year') || 'Year'}</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-3 bg-gray-50 rounded-b-lg">
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-shadow duration-200"
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-shadow duration-200"
                    placeholder="2024"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.price') || 'Price'}</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-3 bg-gray-50 rounded-b-lg">
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-shadow duration-200"
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-shadow duration-200"
                    placeholder="€100,000"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.fuelType') || 'Fuel Type'}</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(fuel => (
                <label key={fuel} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded transition-colors duration-150 cursor-pointer">
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
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.transmission') || 'Transmission'}</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 space-y-2 bg-gray-50 rounded-b-lg">
              {['Automatic', 'Manual'].map(transmission => (
                <label key={transmission} className="flex items-center py-1.5 hover:bg-gray-100 px-2 rounded transition-colors duration-150 cursor-pointer">
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
          <div className="border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <span className="font-medium text-gray-900 text-sm">{t('buyCars.country') || 'Country'}</span>
              <FiChevronDown className="h-4 w-4 text-[#3b396d] rotate-180" />
            </div>
            <div className="p-3 bg-gray-50 rounded-b-lg">
              <select
                value={activeFilters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-shadow duration-200"
              >
                <option value="">{t('buyCars.allCountries') || 'All Countries'}</option>
                <option value="DE">Germany</option>
                <option value="NL">Netherlands</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white border-b border-gray-200 py-3 px-4 sticky top-16 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={toggleFilterPanel}
                  className="flex items-center text-sm font-medium text-[#3b396d] hover:text-[#2a285a] transition-colors duration-200 lg:hidden"
                >
                  <FiFilter className="mr-2 h-4 w-4" />
                  {t('buyCars.filters') || 'Filters'}
                  <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                    filterPanelOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className="ml-4 text-sm text-gray-500 hidden sm:block">
                  {filteredCars.length} {t('buyCars.resultsFound') || 'results found'}
                </div>
              </div>
            </div>
          </div>
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
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                >
                  {t('buyCars.clearAll') || 'Clear All'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#3b396d] text-white">
                    {t('search.searchTerm') || 'Search'}: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
                      aria-label={t('buyCars.clearFilter') || "Clear filter"}
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
                        className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
                        aria-label={t('buyCars.clearFilter') || "Clear filter"}
                      >
                        <FiX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
          <div className="p-4">
            {filteredCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-4 mt-8">
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
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#3b396d] transition-colors duration-200 line-clamp-2">
                            {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                          </h3>
                          <div className="flex items-center flex-shrink-0 ml-2">
                            <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5 flex-shrink-0" />
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
                            <FiMapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span className="truncate">{car.location}</span>
                          </div>
                          {car.auctionEnds && (
                            <div className="flex items-start">
                              <FiClock className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                              <span>{new Date(car.auctionEnds).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 mb-4 flex-grow">
                          <div className="text-xs text-gray-600">
                            <div className="flex items-start">
                              <FiTag className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                              <span className="truncate">{car.tags?.join(', ') || 'N/A'}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            <div className="flex items-start">
                              <FiAward className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                              <span>{car.status === 'active' ? t('buyCars.active') || 'Active' : t('buyCars.closed') || 'Closed'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-auto flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleViewCar(car.id); }}
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-[#3b396d] text-white text-xs font-medium rounded-lg hover:bg-[#2a285a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] min-h-[36px]"
                          >
                            <FiEye className="mr-1 h-3.5 w-3.5" />
                            {t('buyCars.view') || 'View'}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePlaceBid(car.id); }}
                            className="flex-1 flex items-center justify-center px-3 py-2 border border-[#3b396d] text-[#3b396d] text-xs font-medium rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] min-h-[36px]"
                          >
                            <FaLevelUpAlt className="mr-1 h-3.5 w-3.5" />
                            {t('buyCars.bid') || 'Bid'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 md:mt-10">
                    <nav className="inline-flex items-center space-x-0.5 sm:space-x-1 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        aria-label={t('buyCars.previousPage') || "Previous page"}
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
                              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md text-sm font-medium transition-colors duration-200 min-w-[36px] sm:min-w-[42px] flex items-center justify-center ${
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
                            <span key={i} className="px-2 py-1.5 sm:px-2 sm:py-2 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        aria-label={t('buyCars.nextPage') || "Next page"}
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
                <h3 className="mt-4 text-xl font-medium text-gray-900">{t('buyCars.noResults') || 'No cars found'}</h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  {t('buyCars.tryDifferentFilters') || 'Try adjusting your filters or search term'}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-5 py-2.5 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] shadow-sm"
                >
                  {t('buyCars.resetFilters') || 'Reset Filters'}
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