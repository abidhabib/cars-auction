// src/components/seller/FavoritesTab.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useLanguage } from '../../context/LanguageContext';
import { FiHeart, FiEye,FiTag , FiDollarSign, FiMapPin, FiClock, FiInfo, FiX } from 'react-icons/fi'; // Removed unused FiX import for card
import { FaLevelUpAlt, FaHeart as FaHeartSolid } from 'react-icons/fa';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import { loadMockUserActivityData } from '../../mock/data/mockUserActivityData'; // Import mock data

const FavoritesTab = ({ onViewCar, onPlaceBid }) => {
  const { t } = useLanguage();

  // --- State for Managing Favorites Locally ---
  // Load initial mock data
  const allCars = loadMockCarsData();
  const { favorites: initialMockFavorites } = loadMockUserActivityData();
  const initialFavoriteCarIds = initialMockFavorites.map(fav => fav.carId);
  const initialFavoriteCars = allCars.filter(car => initialFavoriteCarIds.includes(car.id));

  // State to manage the list of favorite cars within this component
  const [favoriteCars, setFavoriteCars] = useState(initialFavoriteCars);
  const [favoriteCarIds, setFavoriteCarIds] = useState(initialFavoriteCarIds); // Track IDs for quick lookup/filtering

  // Effect to recalculate favoriteCars if initial data changes (unlikely with mocks, but good practice)
  useEffect(() => {
    setFavoriteCars(initialFavoriteCars);
    setFavoriteCarIds(initialFavoriteCarIds);
  }, [initialFavoriteCars, initialFavoriteCarIds]); // Dependencies on initial derived values

  // --- Handler to Remove a Favorite ---
  const handleRemoveFavorite = (carIdToRemove) => {
    // Update the local state
    setFavoriteCarIds(prevIds => prevIds.filter(id => id !== carIdToRemove));
    setFavoriteCars(prevCars => prevCars.filter(car => car.id !== carIdToRemove));
    
    // In a real app, you would also call an API or update localStorage here.
    // For mock purposes, we just update the local state.
    console.log(`[MOCK] Removed car ${carIdToRemove} from favorites.`);
    // Example (if you had a function like `removeFavoriteForUser(userId, carId)`):
    // removeFavoriteForUser(currentUserId, carIdToRemove);
  };

  if (favoriteCars.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <FiHeart className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            {t('buyCars.noFavorites') || 'No favorites yet'}
          </h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {t('buyCars.addFavorites') || 'Add cars to your favorites to see them here.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('buyCars.myFavorites') || 'My Favorite Cars'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="relative">
              {/* Simple Image Display */}
              {car.image ? (
                <img
                  src={car.image}
                  alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'; }}
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                  <FiImage className="h-12 w-12 text-gray-400" />
                </div>
              )}
              {/* Remove Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card's onClick if it had one
                  handleRemoveFavorite(car.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200"
                aria-label={t('buyCars.removeFavorite') || "Remove from favorites"}
              >
                <FiX className="h-4 w-4 text-red-500 hover:text-red-700" />
              </button>
              {/* Static Solid Heart Icon to indicate it's a favorite in this view */}
              <div className="absolute top-3 left-3 p-2 bg-white/80 rounded-full shadow-md">
                <FaHeartSolid className="h-4 w-4 text-red-500" />
              </div>
              <div className="absolute bottom-3 left-3 bg-white rounded-full p-2 shadow-md">
                <FiDollarSign className="h-5 w-5 text-[#3b396d]" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                  {car.vehicleIdentification.trim && (
                     <span className="text-sm font-normal text-gray-600 ml-1">({car.vehicleIdentification.trim})</span>
                  )}
                </h3>
                <div className="flex items-center">
                  <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5" />
                  <span className="text-lg font-bold text-[#3b396d]">
                    €{car.price?.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
              </div>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <div className="flex items-start">
                  <FiMapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{car.location}</span>
                </div>
                {car.auctionEnds && (
                  <div className="flex items-start">
                    <FiClock className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                    <span>{new Date(car.auctionEnds).toLocaleDateString()}</span>
                  </div>
                )}
                {car.saleType === 'general-auction' && car.bids !== undefined && (
                   <div className="flex items-start">
                     <FiTag className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                     <span>{car.bids} {t('buyCars.bids') || 'bids'}</span>
                   </div>
                 )}
              </div>
              <div className="mt-4 space-y-2">
                {car.stockId && (
                  <div className="text-xs text-gray-600">
                    <div className="flex items-start">
                      <FiInfo className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span>Stock ID: {car.stockId}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                {/* Ensure onViewCar is called correctly */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent any potential card-level event if added later
                    if (onViewCar) {
                       onViewCar(car.id); // Call the prop function passed from the parent
                    } else {
                       console.warn("onViewCar function not provided to FavoritesTab");
                    }
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-[#3b396d] text-white text-sm font-medium rounded-lg hover:bg-[#2a285a] transition-colors min-h-[36px]"
                >
                  <FiEye className="mr-2 h-4 w-4" />
                  {t('buyCars.view') || 'View'}
                </button>
                {/* Ensure onPlaceBid is called correctly and is disabled appropriately */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent any potential card-level event if added later
                    if (onPlaceBid) {
                       onPlaceBid(car.id); // Call the prop function passed from the parent
                    } else {
                       console.warn("onPlaceBid function not provided to FavoritesTab");
                    }
                  }}
                  disabled={car.saleType !== 'general-auction'} // Disable if not an auction car
                  className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg min-h-[36px] transition-colors ${
                    car.saleType === 'general-auction'
                      ? 'border border-[#3b396d] text-[#3b396d] hover:bg-[#3b396d] hover:text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaLevelUpAlt className="mr-2 h-4 w-4" />
                  {t('buyCars.bid') || 'Bid'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesTab;