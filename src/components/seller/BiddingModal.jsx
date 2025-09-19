import React, { useState, useEffect, useRef } from 'react';
import { FaLevelUpAlt } from 'react-icons/fa';
import { FiX, FiInfo, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import { MdOutlineNoteAdd } from 'react-icons/md';

const BiddingModal = ({ isOpen, onClose, car, onBidSubmit, t }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedBroker, setSelectedBroker] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Refs to manage the toast DOM element and its timer
  const toastRef = useRef(null);
  const toastTimerRef = useRef(null);

  // Reset form when car changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setBidAmount('');
      setNote('');
      setSelectedBroker('');
      setError('');
    }
  }, [isOpen, car]);

  // Cleanup function to remove toast and clear timers when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
      if (toastRef.current && toastRef.current.parentNode) {
        toastRef.current.parentNode.removeChild(toastRef.current);
        toastRef.current = null;
      }
    };
  }, []);

  // Function to show the custom toast by creating a DOM element
  const showToast = (message, type = 'success') => {
    // Clear any existing timer
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    // Remove existing toast if any
    if (toastRef.current && toastRef.current.parentNode) {
      toastRef.current.parentNode.removeChild(toastRef.current);
    }

    // Create the toast element
    const toastEl = document.createElement('div');
    toastEl.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-4 rounded-lg shadow-lg text-white font-medium text-sm flex items-center transition-opacity duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
    toastEl.innerHTML = `
      ${type === 'success' ?
        `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>` :
        `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`
      }
      <span>${message}</span>
    `;
    // Apply initial styles for animation
    toastEl.style.top = '-100px'; // Start above the viewport
    toastEl.style.opacity = '0';

    // Append to body
    document.body.appendChild(toastEl);
    toastRef.current = toastEl; // Store reference

    // Trigger animation after a tiny delay to allow initial styles to apply
    requestAnimationFrame(() => {
      if (toastRef.current) {
        toastRef.current.style.transition = 'top 0.3s ease-out, opacity 0.3s ease-out';
        toastRef.current.style.top = '1rem'; // Final top position
        toastRef.current.style.opacity = '1';
      }
    });

    // Set timer to hide the toast
    toastTimerRef.current = setTimeout(() => {
      if (toastRef.current) {
        toastRef.current.style.transition = 'top 0.3s ease-in, opacity 0.3s ease-in';
        toastRef.current.style.top = '-100px';
        toastRef.current.style.opacity = '0';
        // Remove element after animation
        setTimeout(() => {
          if (toastRef.current && toastRef.current.parentNode) {
            toastRef.current.parentNode.removeChild(toastRef.current);
            toastRef.current = null;
          }
          // Close modal on success
          if (type === 'success') {
            onClose();
          }
        }, 300); // Match the transition duration
      }
    }, 3000); // Show for 3 seconds
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      setError(t('bidding.invalidAmount') || 'Please enter a valid bid amount');
      return;
    }

    if (car.highestBid && amount <= car.highestBid) {
      setError(t('bidding.bidTooLow') || `Bid must be higher than current highest bid (€${car.highestBid.toLocaleString()})`);
      return;
    }

    const minIncrement = 100;
    if (car.highestBid && amount < car.highestBid + minIncrement) {
      setError(t('bidding.minimumIncrement', { amount: minIncrement }) || `Minimum bid increment is €${minIncrement}`);
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      try {
        onBidSubmit({ bidAmount: amount, note, broker: selectedBroker });
        setIsSubmitting(false);
        // Show success toast
        showToast(t('bidding.bidSubmitted') || 'Your bid has been submitted successfully!', 'success');
        // Modal will close via showToast's timeout
      } catch (err) {
        setIsSubmitting(false);
        console.error("Bid submission error:", err);
        showToast(t('bidding.bidSubmitError') || 'Failed to submit bid. Please try again.', 'error');
        // Keep modal open on error
        // Clear the toast timer ref if error occurs during submission simulation
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
            toastTimerRef.current = null;
        }
      }
    }, 800);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate total cost including fees (example: 3% auction fee)
  const calculateTotalCost = () => {
    const amount = parseFloat(bidAmount) || 0;
    const auctionFee = amount * 0.03; // Example: 3% fee
    return amount + auctionFee;
  };

  const totalCost = calculateTotalCost();

  // Broker options (mock data)
  const brokers = [
    'van den Broek Automotive bemiddeling',
    'AutoTrade International',
    'Luxury Cars BV',
    'EuroCar Sales'
  ];

  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className="bg-white shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
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
            disabled={isSubmitting}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
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
            {/* Bid Amount Input */}
            <div className="mb-4">
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
                  disabled={isSubmitting}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Total Cost Display */}
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-yellow-800">
                  {t('bidding.totalCost') || 'Total cost including fees:'}
                </span>
                <span className="font-bold text-yellow-700">
                  {formatCurrency(totalCost)}
                </span>
              </div>
              <div className="text-xs text-yellow-600 mt-1">
                {t('bidding.feeNote') || 'Includes 3% auction fee'}
              </div>
            </div>

            {/* Leave a Note */}
            <div className="mb-4">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MdOutlineNoteAdd className="h-4 w-4 mr-1 text-gray-500" />
                {t('bidding.leaveNote') || 'Optional note for seller'}
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={300}
                placeholder={t('bidding.notePlaceholder') || 'Your message will only be visible to you and the seller. Max 300 characters.'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                disabled={isSubmitting}
              />
              <div className="text-xs text-gray-500 mt-1">
                {note.length}/300
              </div>
            </div>

            {/* Broker Selection */}
            <div className="mb-5">
              <label htmlFor="broker" className="block text-sm font-medium text-gray-700 mb-2">
                {t('bidding.broker') || 'Broker / Intermediary'}
              </label>
              <select
                id="broker"
                value={selectedBroker}
                onChange={(e) => setSelectedBroker(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                disabled={isSubmitting}
              >
                <option value="">-- Select --</option>
                {brokers.map((broker) => (
                  <option key={broker} value={broker}>
                    {broker}
                  </option>
                ))}
              </select>
            </div>

            {/* Important Info */}
            <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <FiAlertCircle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-800">
                    {t('bidding.bidInfoTitle') || 'Important Information'}
                  </h4>
                  <div className="mt-2 text-sm text-gray-700">
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
                disabled={isSubmitting}
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