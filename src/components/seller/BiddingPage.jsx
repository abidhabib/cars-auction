// src/components/seller/BiddingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  FiChevronLeft,
  FiDollarSign,
  FiMapPin,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi';
import { MdOutlineNoteAdd } from 'react-icons/md';

const BiddingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [car, setCar] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedBroker, setSelectedBroker] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Flat broker list (could come from API later)
  const brokers = [
    'van den Broek Automotive bemiddeling',
    'AutoTrade International',
    'Luxury Cars BV',
    'EuroCar Sales',
  ];

  useEffect(() => {
    const cars = loadMockCarsData();
    const foundCar = cars.find(c => String(c.id) === String(id));
    if (!foundCar) {
      navigate('/Dashboard/buy');
      return;
    }

    const now = new Date();
    const auctionEnded = new Date(foundCar.auctionEnds) < now;
    const isAwarded = foundCar.status === 'awarded';

    if (auctionEnded || isAwarded) {
      // Redirect or show message — but for now, just disable bidding
      setCar({ ...foundCar, _biddingClosed: true });
    } else {
      setCar(foundCar);
    }
  }, [id, navigate]);

  if (!car) return null;

  const isBiddingClosed = car._biddingClosed || car.status === 'awarded' || new Date(car.auctionEnds) < new Date();

  // --- Validation ---
  const validateBid = (value) => {
    const num = parseFloat(value);
    if (!value || isNaN(num) || num <= 0) {
      return t('bidding.invalidAmount');
    }

    const current = car.highestBid || 0;
    if (num <= current) {
      return t('bidding.bidTooLow', { highest: current.toLocaleString() });
    }

    if (num < current + 100) {
      return t('bidding.minimumIncrement');
    }

    if (car.reservePrice && num < car.reservePrice) {
      return t('bidding.reserveNotMet', { reserve: car.reservePrice.toLocaleString() });
    }

    return '';
  };

  const handleBidChange = (e) => {
    const val = e.target.value;
    setBidAmount(val);
    setError(val ? validateBid(val) : '');
  };

  const calculateTotal = () => {
    const amount = parseFloat(bidAmount) || 0;
    return amount * 1.03; // 3% fee
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateBid(bidAmount);
    if (err) {
      setError(err);
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: API call
      console.log('Bid submitted:', { bidAmount, note, broker: selectedBroker, carId: car.id });
      alert(t('bidding.bidSubmitted'));
      navigate(`/Dashboard/buy/${id}`);
    } catch {
      setError(t('bidding.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCost = calculateTotal();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <button
        onClick={() => navigate(`/Dashboard/buy/${id}`)}
        className="mb-6 flex items-center text-[#3b396d] hover:text-[#2a285a] font-medium"
      >
        <FiChevronLeft className="mr-1.5" /> {t('bidding.backToDetails')}
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">
            {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
          </h1>
          <div className="mt-1 flex items-center text-gray-600 text-sm">
            <FiMapPin className="mr-1.5 flex-shrink-0" />
            <span>{car.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Car Image */}
          <div className="p-6 border-r border-gray-100 bg-gray-50">
            <img
              src={car.image}
              alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
              className="w-full h-60 object-cover rounded-lg bg-white"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>

          {/* Bidding Form */}
          <div className="p-6">
            {isBiddingClosed ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                  <FiClock className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{t('bidding.auctionClosed')}</h3>
                <p className="text-gray-600 mt-1 text-sm">{t('bidding.noBiddingAllowed')}</p>
                <button
                  onClick={() => navigate(`/Dashboard/buy/${id}`)}
                  className="mt-4 text-[#3b396d] font-medium hover:text-[#2a285a]"
                >
                  {t('bidding.viewDetails')}
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-5">{t('bidding.placeBid')}</h2>

                {/* Auction Summary */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('bidding.currentHighestBid')}:</span>
                    <span className="font-medium">€{(car.highestBid || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('bidding.reservePrice')}:</span>
                    <span className="font-medium">
                      {car.reservePrice ? `€${car.reservePrice.toLocaleString()}` : t('bidding.noReserve')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="text-gray-600">{t('bidding.auctionEnds')}:</span>
                    <span className="font-medium text-red-600">
                      {new Date(car.auctionEnds).toLocaleString()}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Bid Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('bidding.bidAmount')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        €
                      </div>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={handleBidChange}
                        className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] outline-none"
                        placeholder="0"
                        min={car.highestBid ? car.highestBid + 100 : 100}
                        step="100"
                        autoFocus
                      />
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  </div>

                  {/* Total Cost */}
                  {bidAmount && (
                    <div className="mb-5 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-yellow-800">{t('bidding.totalCost')}:</span>
                        <span className="font-bold text-yellow-700">{formatCurrency(totalCost)}</span>
                      </div>
                      <p className="text-xs text-yellow-600 mt-1">{t('bidding.includesAuctionFee')}</p>
                    </div>
                  )}

                  {/* Note */}
                  <div className="mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MdOutlineNoteAdd className="mr-1.5 text-gray-500" />
                      {t('bidding.leaveNote')}
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows="2"
                      maxLength="300"
                      placeholder={t('bidding.notePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] outline-none"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-right">{note.length}/300</div>
                  </div>

                  {/* Broker */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('bidding.broker')}
                    </label>
                    <select
                      value={selectedBroker}
                      onChange={(e) => setSelectedBroker(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] outline-none"
                    >
                      <option value="">{t('bidding.selectBroker')}</option>
                      {brokers.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Info Notice */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex">
                      <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{t('bidding.important')}</h4>
                        <ul className="mt-1 text-sm text-gray-600 list-disc pl-5 space-y-0.5">
                          <li>{t('bidding.bidIsBinding')}</li>
                          <li>{t('bidding.willBeNotified')}</li>
                          <li>{t('bidding.incrementRule')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-5">
                    <FiCheckCircle className="text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">{t('bidding.confirmationEmail')}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !!error || !bidAmount}
                    className="w-full bg-[#3b396d] text-white py-3 px-4 rounded-lg hover:bg-[#2a285a] transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('bidding.submitting')}
                      </span>
                    ) : (
                      t('bidding.confirmBid')
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;