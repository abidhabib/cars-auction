// src/components/seller/BidsTab.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiList, FiEye, FiRefreshCw, FiX, FiDollarSign, FiClock, FiInfo } from 'react-icons/fi';
import { FaLevelUpAlt } from 'react-icons/fa';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import { loadMockUserActivityData } from '../../mock/data/mockUserActivityData'; // Import mock data

const BidsTab = ({ onViewCar, onPlaceBid /* , onRemoveBid - if you add this feature */ }) => {
  const { t } = useLanguage();

  // --- Load Mock Data ---
  // In a real app, this would be passed as props or fetched based on the logged-in user
  const allCars = loadMockCarsData();
  const { bids: mockBids } = loadMockUserActivityData(); // Load mock user bids

  // --- Get Unique Bidded Car Objects (keeping only the latest/active bid per car) ---
  // Group bids by carId and take the most recent one (or filter by isActive if needed)
  const latestBidsPerCar = {};
  mockBids.forEach(bid => {
      // Assuming mock data is ordered or we sort to get the latest
      // Or filter by isActive if that's the criteria
      if (!latestBidsPerCar[bid.carId] || new Date(bid.bidAt) > new Date(latestBidsPerCar[bid.carId].bidAt)) {
          latestBidsPerCar[bid.carId] = bid;
      }
      // If using isActive flag: if (bid.isActive) { latestBidsPerCar[bid.carId] = bid; }
  });

  // Get the list of car IDs that have bids
  const bidCarIds = Object.keys(latestBidsPerCar);
  // Filter all cars to get only the ones with bids
  const bidCars = allCars.filter(car => bidCarIds.includes(car.id));

  if (bidCars.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <FiList className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            {t('buyCars.noBids') || 'No bids yet'}
          </h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {t('buyCars.placeBids') || 'Place bids on cars to see them here.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('buyCars.myBids') || 'My Bids'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bidCars.map((car) => {
          // Get the corresponding bid information for this car
          const bidInfo = latestBidsPerCar[car.id];
          if (!bidInfo) return null; // Safety check

          // Determine if the user is outbid based on mock data flags
          const isOutbid = bidInfo.isWinning === false && bidInfo.currentHighestBid != null && bidInfo.bidAmount < bidInfo.currentHighestBid;

          // Simple image display for bids tab
          const displayImage = car.image || (car.mediaAndDescription?.photos?.[0] || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80');

          return (
            <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <div className="relative">
                <img
                  src={displayImage}
                  alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'; }}
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                  <FiDollarSign className="h-5 w-5 text-[#3b396d]" />
                </div>
                {/* Example of a remove bid button (optional) */}
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onRemoveBid) onRemoveBid(car.id);
                  }}
                  className="absolute top-3 left-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200"
                  aria-label={t('buyCars.removeBid') || "Remove bid"}
                >
                  <FiX className="h-4 w-4 text-red-500 hover:text-red-700" />
                </button> */}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                    {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                  </h3>
                  <div className="flex items-center">
                    <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-0.5" />
                    <span className="text-base font-bold text-[#3b396d]">
                      €{car.price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Bid Information Display */}
                <div className={`mb-4 p-3 rounded-lg border ${isOutbid ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="text-sm font-medium text-gray-800 mb-1 flex justify-between items-center">
                    <span>{t('buyCars.yourBid') || 'Your Bid'}</span>
                    {/* Outbid Indicator */}
                    {isOutbid && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {t('buyCars.outbid') || 'Outbid'}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">
                      €{bidInfo.bidAmount?.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(bidInfo.bidAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* Optional: Show current highest if user is outbid or for info */}
                  {isOutbid && bidInfo.currentHighestBid && (
                    <div className="text-xs text-gray-600 mt-1">
                      {t('buyCars.currentHighest') || 'Current Highest'}: €{bidInfo.currentHighestBid.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => onViewCar(car.id)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-[#3b396d] text-white text-xs font-medium rounded-lg hover:bg-[#2a285a] min-h-[36px]"
                  >
                    <FiEye className="mr-1 h-3.5 w-3.5" />
                    {t('buyCars.view') || 'View'}
                  </button>
                  <button
                    onClick={() => onPlaceBid(car.id)} // "Update Bid"
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-[#3b396d] text-[#3b396d] text-xs font-medium rounded-lg hover:bg-[#3b396d] hover:text-white min-h-[36px]"
                  >
                    <FiRefreshCw className="mr-1 h-3.5 w-3.5" />
                    {t('buyCars.updateBid') || 'Update'}
                  </button>
                  {/* <button
                    onClick={() => { if (onRemoveBid) onRemoveBid(car.id); }}
                    className="flex items-center justify-center px-3 py-2 border border-red-500 text-red-500 text-xs font-medium rounded-lg hover:bg-red-500 hover:text-white min-h-[36px]"
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BidsTab;