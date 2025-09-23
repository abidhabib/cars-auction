// src/components/seller/CarDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you use React Router
import { useLanguage } from '../../context/LanguageContext';
import {
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
  FiHeart, // For favorite icon
  FiList // For bid icon
} from 'react-icons/fi';
import { FaLevelUpAlt, FaHeart as FaHeartSolid } from 'react-icons/fa'; // For solid heart
import BiddingModal from './BiddingModal'; // Make sure the path is correct
import { loadMockCarsData } from '../../mock/data/mockCarsData'; // Adjust path if needed

// --- Helper Functions (same as in BuyCarsTab) ---
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const safeT = (key, fallback) => {
  // Simple fallback mechanism, ideally use your i18n library's capabilities
  return fallback || key;
};
// --- End Helper Functions ---

const CarDetailPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { carId } = useParams(); // Get carId from URL params

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);
  const [biddingCar, setBiddingCar] = useState(null);
  // --- Mock User State (Replace with real auth/context) ---
  const [userId] = useState('mock_user_123abc'); // Simulate logged-in user
  const [userFavorites, setUserFavorites] = useState([]);
  const [userBids, setUserBids] = useState({});
  // --- End Mock User State ---

  // --- Load Car Data ---
  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        setError(null);
        const cars = loadMockCarsData();
        const foundCar = cars.find(c => c.id === carId);

        if (foundCar) {
          setCar(foundCar);
        } else {
          setError(t('buyCars.carNotFound') || 'Car not found.');
        }
      } catch (err) {
        console.error("Error loading car data:", err);
        setError(t('common.error') || 'An error occurred while loading the car details.');
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      loadCar();
    } else {
      setError(t('buyCars.invalidCarId') || 'Invalid car ID.');
      setLoading(false);
    }
  }, [carId, t]);

  // --- Load User Data (Mock) ---
  useEffect(() => {
    // Simulate loading user favorites and bids from localStorage or API
    // In a real app, this would be tied to the actual `userId`
    const loadUserData = () => {
      try {
        // Mock: Load from localStorage or initialize
        const favs = JSON.parse(localStorage.getItem('car_favorites')) || ['car_001', 'car_004']; // Example
        const bids = JSON.parse(localStorage.getItem('user_bids')) || {
          'car_001': { amount: 54850, timestamp: '2024-07-11T10:00:00Z' },
          'car_003': { amount: 47500, timestamp: '2024-07-13T15:45:00Z' }
        }; // Example
        setUserFavorites(favs);
        setUserBids(bids);
      } catch (e) {
        console.error("Error loading mock user data:", e);
        setUserFavorites([]);
        setUserBids({});
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);
  // --- End Load User Data ---

  // --- Handlers ---
  const handleBackToList = () => {
    // Navigate back to the buy cars list
    // Adjust the path as needed based on your routing structure
    navigate('/dashboard#buy'); // Example: navigate to dashboard buy tab
    // Or use navigate(-1) to go back in history
    // navigate(-1);
  };

  const handlePlaceBid = (carToBidOn) => {
    if (!userId) {
      alert(t('buyCars.loginToBid') || 'Please log in to place a bid.');
      return;
    }
    setBiddingCar(carToBidOn || car); // Use passed car or state car
    setIsBiddingModalOpen(true);
  };

  const handleBidSubmit = (bidAmount) => {
    if (biddingCar && userId) {
      // Update user bids state (mock)
      const newUserBids = {
        ...userBids,
        [biddingCar.id]: {
          amount: bidAmount,
          timestamp: new Date().toISOString()
        }
      };
      setUserBids(newUserBids);
      localStorage.setItem('user_bids', JSON.stringify(newUserBids)); // Persist mock data

      console.log(`Bid placed on car ${biddingCar.id} with amount: €${bidAmount}`);
    }
    setIsBiddingModalOpen(false);
  };

  const handleToggleFavorite = () => {
    if (!userId) {
      alert(t('buyCars.loginToFavorite') || 'Please log in to add favorites.');
      return;
    }
    if (!car) return;

    try {
      let newFavorites;
      if (userFavorites.includes(car.id)) {
        // Remove from favorites
        newFavorites = userFavorites.filter(id => id !== car.id);
      } else {
        // Add to favorites
        newFavorites = [...userFavorites, car.id];
      }
      setUserFavorites(newFavorites);
      localStorage.setItem('car_favorites', JSON.stringify(newFavorites)); // Persist mock data
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert(t('common.error') || 'Failed to update favorites.');
    }
  };
  // --- End Handlers ---

  // --- CarDetailView Component (Extracted from BuyCarsTab) ---
  const CarDetailView = useCallback(({ car }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState({});
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];

    const nextImage = useCallback(() => {
      setCurrentImageIndex(prevIndex => {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      });
    }, [images.length]);

    const prevImage = useCallback(() => {
      setCurrentImageIndex(prevIndex => {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      });
    }, [images.length]);

    const handleImageLoad = useCallback((index) => {
      setImageLoaded(prev => ({ ...prev, [index]: true }));
    }, []);

    const handleImageError = useCallback((e, index) => {
      e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
      setImageLoaded(prev => ({ ...prev, [index]: true }));
    }, []);

    const openFullscreenImage = (src, index) => {
      setFullscreenImage({ src, index });
      setSelectedPhotoIndex(index);
    };

    const closeFullscreenImage = () => {
      setFullscreenImage(null);
    };

    const goToPrevPhoto = () => {
      setSelectedPhotoIndex(prevIndex => {
        const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
        setFullscreenImage({ src: images[newIndex], index: newIndex });
        return newIndex;
      });
    };

    const goToNextPhoto = () => {
      setSelectedPhotoIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % images.length;
        setFullscreenImage({ src: images[newIndex], index: newIndex });
        return newIndex;
      });
    };

    useEffect(() => {
      setCurrentImageIndex(0);
      setImageLoaded({});
    }, [car.id]);

    // ... (rest of the helper functions from BuyCarsTab like renderDamagePoints, renderSelectedOptions, etc.)
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
        return <span className="text-gray-500">{t('buyCars.noOptions') || 'No additional options specified'}</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {car.selectedOptions.map((option, index) => (
            <span key={index} className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
              {option.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      );
    };

    const renderConditionRating = (ratingKey) => {
      const ratingLabels = {
        'excellent': t('addCarListing.condition.rating.excellent') || 'Excellent',
        'good': t('addCarListing.condition.rating.good') || 'Good',
        'average': t('addCarListing.condition.rating.average') || 'Average',
        'poor': t('addCarListing.condition.rating.poor') || 'Poor',
        'n/a': t('common.na') || 'N/A'
      };
      return ratingLabels[ratingKey] || ratingKey;
    };

    if (!car) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b396d]"></div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Back Button */}
        <button
          onClick={handleBackToList}
          className="flex items-center text-[#3b396d] hover:text-[#2a285a] mb-6 transition-colors duration-200"
        >
          <FiChevronLeft className="mr-2 h-5 w-5" />
          {t('buyCars.backToList') || 'Back to List'}
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images & Key Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
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
                      className={`w-full h-full object-contain bg-gray-100 transition-opacity duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => handleImageError(e, index)}
                      style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                    />
                  </div>
                ))}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#3b396d] rounded-full p-2 shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#3b396d] rounded-full p-2 shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Next image"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-[#3b396d] scale-125' : 'bg-white/60 hover:bg-white'}`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails (Optional, for more images) */}
            {images.length > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hide-scrollbar">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('buyCars.gallery') || 'Gallery'}</h3>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 group ${index === currentImageIndex ? 'border-[#3b396d] ring-2 ring-[#3b396d]/20' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=200&q=80'; }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xl" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Auction Timing */}
            {car.saleType === 'general-auction' && car.auctionTiming && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                  <FiCalendar className="mr-2 text-[#3b396d]" />
                  {t('buyCars.auctionTiming') || 'Auction Timing'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {t('addCarListing.auctionTiming.startDateLabel') || 'Start Date'}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formatDateTime(`${car.auctionTiming.startDate}T${car.auctionTiming.startTime}`)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {t('addCarListing.auctionTiming.endDateLabel') || 'End Date'}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formatDateTime(`${car.auctionTiming.endDate}T${car.auctionTiming.endTime}`)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {t('addCarListing.auctionTiming.timezoneLabel') || 'Timezone'}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {car.auctionTiming.timezone || '-'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exterior Options & Damages */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                <FiSettings className="mr-2 text-[#3b396d]" />
                {t('buyCars.exteriorOptions') || 'Exterior Options & Damages'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">
                    {t('addCarListing.exterior.damageTitle') || 'Damages'}
                  </h4>
                  {renderDamagePoints()}
                </div>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">
                    {t('addCarListing.exterior.optionsTitle') || 'Options'}
                  </h4>
                  {renderSelectedOptions()}
                </div>
              </div>
            </div>

            {/* Interior Checklists */}
            {car.conditionAssessment?.interiorChecklist && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                  <FiAward className="mr-2 text-[#3b396d]" />
                  {t('buyCars.interiorChecklist') || 'Interior Checklist'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {Object.entries(car.conditionAssessment.interiorChecklist).map(([part, rating]) => (
                    <div key={part} className="text-center">
                      <div className="text-xs text-gray-500 capitalize mb-1">{part.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        rating === 'excellent' ? 'bg-green-100 text-green-800' :
                        rating === 'good' ? 'bg-blue-100 text-blue-800' :
                        rating === 'average' ? 'bg-yellow-100 text-yellow-800' :
                        rating === 'poor' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {renderConditionRating(rating)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tyre Report */}
            {car.conditionAssessment?.tyreReport && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
                  <FiSettings className="mr-2 text-[#3b396d]" />
                  {t('buyCars.tyreReport') || 'Tyre Report'}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tread Depth (mm)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(car.conditionAssessment.tyreReport).map(([position, tyre]) => (
                        <tr key={position}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{position.replace(/([A-Z])/g, ' $1').trim()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tyre.brand}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tyre.treadDepth}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tyre.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                              tyre.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                              tyre.condition === 'average' ? 'bg-yellow-100 text-yellow-800' :
                              tyre.condition === 'poor' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {renderConditionRating(tyre.condition)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Car Header & Pricing */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-24"> {/* Sticky for easy access */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                    {car.vehicleIdentification.trim && (
                      <span className="text-xl font-normal text-gray-600 ml-2">({car.vehicleIdentification.trim})</span>
                    )}
                  </h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <FiMapPin className="mr-1.5 text-gray-500" />
                    <span>{car.location}</span>
                  </div>
                </div>
                {/* Favorite Button */}
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label={userFavorites.includes(car.id) ? t('buyCars.removeFavorite') || "Remove from favorites" : t('buyCars.addToFavorites') || "Add to favorites"}
                >
                  {userFavorites.includes(car.id) ? (
                    <FaHeartSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <FiHeart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  )}
                </button>
              </div>

              <div className="mt-6">
                <div className="text-3xl font-bold text-[#3b396d]">€{car.price?.toLocaleString()}</div>
                {car.saleType === 'direct-buy' && car.mediaAndDescription?.directBuyPrice && (
                  <div className="text-gray-600 mt-1">
                    {t('buyCars.buyItNow')}: €{parseInt(car.mediaAndDescription.directBuyPrice)?.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Auction Info */}
              {car.saleType === 'general-auction' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">{t('buyCars.currentHighestBid') || 'Current Highest Bid'}:</span>
                    <span className="font-bold text-blue-700">€{car.highestBid?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-blue-800">{t('buyCars.yourBid') || 'Your Bid'}:</span>
                    <span className="font-bold text-blue-700">
                      €{userBids[car.id]?.amount?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-blue-600">
                    {car.bids || 0} {t('buyCars.bids') || 'bids'}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {car.saleType === 'general-auction' && (
                  <button
                    onClick={() => handlePlaceBid(car)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                  >
                    <FaLevelUpAlt className="mr-2" />
                    {t('buyCars.placeBid') || 'Place Bid'}
                  </button>
                )}
                {car.saleType === 'direct-buy' && car.mediaAndDescription?.directBuyPrice && (
                  <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-[#3b396d] text-[#3b396d] font-medium rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]">
                    {t('buyCars.buyItNow') || 'Buy It Now'}
                  </button>
                )}
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <FiList className="mr-2" />
                  {t('buyCars.makeOffer') || 'Make Offer'}
                </button>
              </div>

              {/* VAT Info */}
              {car.vatStatus === 'deductible' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <FiCheckCircle className="mr-2 text-green-600 flex-shrink-0" />
                  <span className="text-green-800 text-sm">Btw aftrekbaar (21%)</span>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {t('buyCars.specifications') || 'Specifications'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('stockId', 'Stock ID:')}</span>
                  <span className="font-medium text-gray-900">{car.stockId || t('common.na', 'N/A')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('buildYear', 'Build Year:')}</span>
                  <span className="font-medium text-gray-900">{car.vehicleIdentification.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('mileage', 'Mileage:')}</span>
                  <span className="font-medium text-gray-900">
                    {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('fuelType', 'Fuel Type:')}</span>
                  <span className="font-medium text-gray-900">{car.fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('transmission', 'Transmission:')}</span>
                  <span className="font-medium text-gray-900">{car.transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('previousOwners', 'Previous Owners:')}</span>
                  <span className="font-medium text-gray-900">{car.vehicleIdentification.previousOwners || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('color', 'Color:')}</span>
                  <span className="font-medium text-gray-900">{car.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('condition', 'Condition:')}</span>
                  <span className="font-medium text-gray-900">{car.condition}</span>
                </div>
              </div>
            </div>

            {/* Condition Assessment */}
            {car.conditionAssessment?.technicalChecklist && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  <FiTool className="mr-2 text-[#3b396d]" />
                  {t('buyCars.conditionAssessment') || 'Condition Assessment'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(car.conditionAssessment.technicalChecklist).map(([part, rating]) => (
                    <div key={part} className="text-center">
                      <div className="text-xs text-gray-500 capitalize mb-1">{part.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rating === 'excellent' ? 'bg-green-100 text-green-800' :
                        rating === 'good' ? 'bg-blue-100 text-blue-800' :
                        rating === 'average' ? 'bg-yellow-100 text-yellow-800' :
                        rating === 'poor' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {renderConditionRating(rating)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                <FiInfo className="mr-2 text-[#3b396d]" />
                {t('buyCars.additionalInfo') || 'Additional Information'}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{t('buyCars.serviceHistory') || 'Service History'}:</h4>
                  <p className="text-sm text-gray-600 capitalize">{car.mediaAndDescription?.serviceHistory || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{t('buyCars.accidentHistory') || 'Accident History'}:</h4>
                  <p className="text-sm text-gray-600">
                    {car.mediaAndDescription?.hasAccident ?
                      safeT('common.yes', 'Yes') :
                      safeT('common.no', 'No')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Image Modal */}
        {fullscreenImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeFullscreenImage}>
            <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={fullscreenImage.src}
                alt="Fullscreen"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={closeFullscreenImage}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full"
                aria-label="Close fullscreen"
              >
                <FiX className="h-6 w-6" />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full"
                    aria-label="Previous photo"
                  >
                    <FiChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full"
                    aria-label="Next photo"
                  >
                    <FiChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedPhotoIndex(index);
                          setFullscreenImage({ src: images[index], index });
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === selectedPhotoIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white'}`}
                        aria-label={`Go to photo ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }, [t, userFavorites, userBids, handlePlaceBid, handleToggleFavorite]); // Memoize based on dependencies

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b396d]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-16 bg-red-50 border border-red-200 rounded-lg">
          <FiInfo className="mx-auto h-16 w-16 text-red-500" />
          <h3 className="mt-4 text-xl font-medium text-red-800">{t('common.error') || 'Error'}</h3>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={handleBackToList}
            className="mt-6 px-5 py-2.5 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] shadow-sm"
          >
            {t('buyCars.backToList') || 'Back to List'}
          </button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">{t('buyCars.carNotFound') || 'Car Not Found'}</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {t('buyCars.carNotFoundDesc') || 'Sorry, we couldn\'t find the car you were looking for.'}
          </p>
          <button
            onClick={handleBackToList}
            className="mt-6 px-5 py-2.5 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] shadow-sm"
          >
            {t('buyCars.backToList') || 'Back to List'}
          </button>
        </div>
      </div>
    );
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

      {/* Render Car Detail View */}
      <CarDetailView car={car} />
    </div>
  );
};

export default CarDetailPage;