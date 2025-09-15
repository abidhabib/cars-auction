// src/components/seller/BiddingModal.jsx
import React, { useState, useEffect } from 'react';
import { FaLevelUpAlt } from 'react-icons/fa';
import { FiX, FiInfo, FiDollarSign } from 'react-icons/fi';

const BiddingModal = ({ isOpen, onClose, car, onBidSubmit, t }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when car changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setBidAmount('');
      setError('');
    }
  }, [isOpen, car]);
  
  if (!isOpen || !car) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate bid amount
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      setError(t('bidding.invalidAmount') || 'Please enter a valid bid amount');
      return;
    }
    
    // Check if bid is higher than current highest bid
    if (car.highestBid && amount <= car.highestBid) {
      setError(t('bidding.bidTooLow') || `Bid must be higher than current highest bid (€${car.highestBid.toLocaleString()})`);
      return;
    }
    
    // Check minimum bid increment (example: 100 euros)
    const minIncrement = 100;
    if (car.highestBid && amount < car.highestBid + minIncrement) {
      setError(t('bidding.minimumIncrement', { amount: minIncrement }) || `Minimum bid increment is €${minIncrement}`);
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onBidSubmit(amount);
      setIsSubmitting(false);
    }, 800);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <FaLevelUpAlt className="mr-2 text-[#3b396d]" />
            {t('bidding.placeBid') || 'Place Bid'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            aria-label={t('bidding.close') || "Close"}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-5">
          {/* Car Info */}
          <div className="flex items-center mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900">
                {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
              </h4>
              <div className="flex items-center mt-1">
                <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-1" />
                <span className="text-lg font-bold text-[#3b396d]">
                  {formatCurrency(car.price)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Auction Info */}
          {car.saleType === 'general-auction' && (
            <div className="mb-5 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{t('bidding.currentHighestBid') || 'Current highest bid'}:</span>
                <span className="font-semibold">
                  {car.highestBid ? formatCurrency(car.highestBid) : t('bidding.noBids') || 'No bids yet'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('bidding.yourBids') || 'Your bids'}:</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          )}
          
          {/* Bid Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                {t('bidding.bidAmount') || 'Bid Amount'} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">€</span>
                </div>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition-shadow duration-200"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            {/* Info Box */}
            <div className="mb-5 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex">
                <FiInfo className="flex-shrink-0 h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-800">
                    {t('bidding.bidInfoTitle') || 'Important Information'}
                  </h4>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{t('bidding.bidInfo1') || 'Your bid is binding once submitted'}</li>
                      <li>{t('bidding.bidInfo2') || 'You will be notified if you are outbid'}</li>
                      <li>{t('bidding.bidInfo3') || 'Bids must be higher than the current highest bid'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {t('bidding.cancel') || 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !bidAmount}
                className="flex-1 px-4 py-3 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('bidding.submitting') || 'Submitting...'}
                  </>
                ) : (
                  <>
                    <FaLevelUpAlt className="mr-2" />
                    {t('bidding.submitBid') || 'Submit Bid'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiddingModal;