<<<<<<< Updated upstream
// src/components/seller/BuyCarsTab.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
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

  return (
    <div className="">
      {/* Main Content - No extra margins/padding */}
      <div className="flex flex-col lg:flex-row">
        {/* Filter Panel - CarCollect Style */}
        <div className={`lg:w-64 bg-white border-r border-gray-200 p-4 lg:sticky lg:h-[calc(100vh)] lg:overflow-y-auto ${
          filterPanelOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('buyCars.filters') || 'Filters'}
            </h2>
            {/* <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              {t('buyCars.clearAll') || 'Clear All'}
            </button> */}
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
=======
  // src/components/seller/BuyCarsTab.jsx
  import React, { useState, useEffect, useCallback, memo } from 'react';
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
  const CarImageSlider = memo(({ car }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState({});

    
    // Use useCallback to prevent unnecessary re-creation of functions
    const nextImage = useCallback(() => {
      setCurrentImageIndex(prevIndex => {
        const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      });
    }, [car.id]); // Only re-create when car.id changes

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

    // Get images array
    const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];

    // Reset to first image when car changes
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
    // Only re-render if car.id changes
    return prevProps.car.id === nextProps.car.id;
  });

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
    const [biddingCar, setBiddingCar] = useState(null);
    const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);
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

    const handlePlaceBid = (carId) => {
      const car = allCars.find(c => c.id === carId);
      setBiddingCar(car);
      setIsBiddingModalOpen(true);
    };

    const handleBidSubmit = (bidAmount) => {
      console.log(`Bid placed on car ${biddingCar.id} with amount: €${bidAmount}`);
      setIsBiddingModalOpen(false);
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

      const openFullscreenImage = (imageSrc, index) => {
        setFullscreenImage(imageSrc);
        setSelectedPhotoIndex(index);
      };

      const closeFullscreenImage = () => {
        setFullscreenImage(null);
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

      const photoPositions = [
        t('addCarListing.media.frontLeft') || 'Front left',
        t('addCarListing.media.frontRight') || 'Front right',
        t('addCarListing.media.leftRear') || 'Left rear',
        t('addCarListing.media.rightRear') || 'Right rear',
        t('addCarListing.media.dashboard') || 'Dashboard',
        t('addCarListing.media.odometer') || 'Odometer',
        t('addCarListing.media.interior') || 'Interior'
      ];

      // RDW History Timeline
      const renderRDWHistory = () => {
        if (!car.rdwHistory || car.rdwHistory.length === 0) return null;
        return (
          <div className="mb-6 p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
              <FiInfo className="mr-2 text-[#3b396d]" />
              {t('buyCars.rdwHistory') || 'RDW History'}
            </h3>
            <div className="space-y-3">
              {car.rdwHistory.map((event, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                  <div className="font-medium text-blue-800">{event.type}</div>
                  <div className="text-sm text-gray-700 mt-1">{formatDate(event.date)}</div>
                  <div className="text-sm text-gray-600 mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      // Damage Grid Table
      const renderDamageGrid = () => {
        if (!car.damageGrid || car.damageGrid.length === 0) return null;
        return (
          <div className="mb-6 p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
              <FiTool className="mr-2 text-[#3b396d]" />
          Damage Report
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Damage Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {car.damageGrid.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.part}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.type}</td>
                      <td className="px-4 py-3">
                        <img 
                          src={item.photo} 
                          alt="Damage" 
                          className="w-20 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => openFullscreenImage(item.photo, index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      };

      // Safe translation function that doesn't log errors
      const safeT = (key, defaultValue = '') => {
        try {
          const translation = t(key);
          return translation !== key ? translation : defaultValue;
        } catch (error) {
          return defaultValue;
        }
      };

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* LEFT: Image Gallery */}
              <div className="relative">
                {!imageLoaded[currentImageIndex] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-gray-200 rounded-xl w-full h-full" />
                  </div>
                )}
                <img
                  src={images[currentImageIndex]}
                  alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
                  className={`w-full  object-contain transition-opacity duration-500 ${imageLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [currentImageIndex]: true }))}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
                    setImageLoaded(prev => ({ ...prev, [currentImageIndex]: true }));
                  }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#3b396d] rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <FiChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#3b396d] rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
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
                            onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
                              setImageLoaded(prev => ({ ...prev, [index]: true }));
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* RIGHT: Specs & Info */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                    {car.vehicleIdentification.trim && (
                      <span className="text-lg font-normal text-gray-600 ml-2">({car.vehicleIdentification.trim})</span>
                    )}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin className="mr-1.5 text-gray-500" />
                    <span>{car.location}</span>
                  </div>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-[#3b396d]">
                      €{car.price?.toLocaleString()}
                    </div>
                    {car.saleType === 'direct-buy' && car.mediaAndDescription?.directBuyPrice && (
                      <div className="text-gray-600 mt-1">
                        {t('buyCars.buyItNow')}: €{parseInt(car.mediaAndDescription.directBuyPrice)?.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  {/* Auction Timer */}
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
                  
                  {/* VAT Info */}
                  {car.vatStatus === 'deductible' && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <FiCheckCircle className="mr-2 text-green-600" />
                      <span className="text-green-800">Btw aftrekbaar (21%)</span>
                    </div>
                  )}
                  
                  {/* Spec Table */}
                  <div className="space-y-2 mb-6">
                    {[
                      { 
                        label: t('stockId', 'Stock ID:'), 
                        value: car.stockId || t('common.na', 'N/A') 
                      },
                      { 
                        label: t('buildYear', 'Bouwjaar / modeljaar (CvO):'), 
                        value: car.vehicleIdentification.year 
                      },
                      { 
                        label: t('firstRegistration', 'Eerste toelating:'), 
                        value: car.vehicleIdentification.registrationDate || t('common.na', 'N/A') 
                      },
                      { 
                        label: t('mileage', 'Afgelezen kilometerstand:'), 
                        value: `${parseInt(car.vehicleIdentification.mileage)?.toLocaleString()} km` 
                      },
                      { 
                        label: t('fuelType', 'Brandstoftype:'), 
                        value: car.fuelType 
                      },
                      { 
                        label: t('power', 'Vermogen:'), 
                        value: `${car.conditionAssessment?.tyreReport?.frontLeft?.brand || t('common.na', 'N/A')} kW / ${car.conditionAssessment?.tyreReport?.frontLeft?.treadDepth || t('common.na', 'N/A')} PK` 
                      },
                      { 
                        label: t('engineCapacity', 'Cilinderinhoud:'), 
                        value: car.conditionAssessment?.tyreReport?.frontLeft?.condition || t('common.na', 'N/A') 
                      },
                      { 
                        label: t('transmission', 'Transmissie:'), 
                        value: car.transmission 
                      },
                      { 
                        label: 'Inspectie vernieuwd in de laatste 6 maanden:', 
                        value: safeT('common.yes', 'Ja') // Fixed: Use safeT to avoid console errors
                      },
                      { 
                        label: t('bodyType', 'Carrosserietype:'), 
                        value: car.carType 
                      }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                        <span className="text-sm text-gray-700">{row.label}</span>
                        <span className="text-sm font-medium text-gray-900">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    FAVORITEN
                  </button>
                  <button 
                    onClick={() => handlePlaceBid(car.id)}
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    PLAATS EEN BOD
                  </button>
                </div>
              </div>
            </div>
            
            {/* --- ALL OTHER SECTIONS PRESERVED --- */}
            {/* RDW History */}
            {renderRDWHistory()}
            
            {/* Damage Grid */}
            {renderDamageGrid()}
            
            {/* Vehicle Identification */}
            <div className="p-6 border-t border-gray-200">
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
            
            {/* Condition Assessment */}
            <div className="p-6 border-t border-gray-200">
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
            
            {/* Exterior Options & Damages */}
            <div className="p-6 border-t border-gray-200">
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
            
            {/* Visual Documentation & Description */}
            <div className="p-6 border-t border-gray-200">
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
                      ? safeT('common.yes', 'Yes') // Fixed: Use safeT to avoid console errors
                      : safeT('common.no', 'No')} // Fixed: Use safeT to avoid console errors
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
                              onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
                                setImageLoaded(prev => ({ ...prev, [index]: true }));
                              }}
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
            
            {/* Auction Timing */}
            {car.saleType === 'general-auction' && (
              <div className="p-6 border-t border-gray-200">
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
            
            {/* Seller Information (Uncommented) */}
            <div className="p-6 border-t border-gray-200">
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
            </div>
          </div>
          
          {/* Fullscreen Image Modal */}
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
                      aria-label="Previous image"
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
                      aria-label="Next"
                    >
                      <FiChevronRight />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
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
        </div>
      );
    };

    if (effectiveSelectedCar) {
      return <CarDetailView car={effectiveSelectedCar} />;
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
>>>>>>> Stashed changes
                    <input
                      type="checkbox"
                      checked={activeFilters.make === make}
                      onChange={() => handleFilterChange('make', activeFilters.make === make ? '' : make)}
                      className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                    />
<<<<<<< Updated upstream
                    <span className="ml-2 text-sm text-gray-700">{make}</span>
=======
                    <span className="ml-3 text-sm text-gray-700">{make}</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]">
                  <option>{t('buyCars.sort.newest') || 'Newest First'}</option>
                  <option>{t('buyCars.sort.oldest') || 'Oldest First'}</option>
                  <option>{t('buyCars.sort.priceLow') || 'Price: Low to High'}</option>
                  <option>{t('buyCars.sort.priceHigh') || 'Price: High to Low'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(Object.keys(activeFilters).length > 0 || searchTerm) && (
            <div className="bg-white border-b border-gray-200 py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiFilter className="h-4 w-4 text-[#3b396d] mr-2" />
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
=======
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
>>>>>>> Stashed changes
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
<<<<<<< Updated upstream
                  )
                ))}
              </div>
            </div>
          )}

          {/* Car Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentCars.map((car) => (
                <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
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
=======
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
>>>>>>> Stashed changes
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
                              <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5" />
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
<<<<<<< Updated upstream
      </div>
    </div>
  );
};
=======
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
>>>>>>> Stashed changes

      
      </div>
    );
  };

  export default BuyCarsTab;