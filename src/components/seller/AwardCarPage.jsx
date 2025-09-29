// src/components/seller/BiddingChatLayout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  FiUser,
  FiDollarSign,
  FiClock,
  FiCheck,
  FiArchive,
  FiAward,
  FiEye,
  FiLock,
  FiTag,
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

const BiddingChatLayout = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [recentlySold, setRecentlySold] = useState(() => {
    // Optional: persist in localStorage for demo
    const saved = localStorage.getItem('recentlySold');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('active');

  // Persist recentlySold to localStorage (for demo only)
  useEffect(() => {
    localStorage.setItem('recentlySold', JSON.stringify(recentlySold));
  }, [recentlySold]);

  const getSaleTypeLabel = (type) => {
    const map = {
      'direct-buy': t('saleType.directBuy.label') || 'Direct Buy',
      'general-auction': t('saleType.generalAuction.label') || 'General Auction',
      'private-sale': t('saleType.privateSale.label') || 'Private Sale',
    };
    return map[type] || type;
  };

  const getSaleTypeIcon = (type) => {
    if (type === 'direct-buy') return <FiTag className="text-blue-500" />;
    if (type === 'general-auction') return <FiEye className="text-green-500" />;
    if (type === 'private-sale') return <FiLock className="text-purple-500" />;
    return <FaCar />;
  };

  useEffect(() => {
    const allCars = loadMockCarsData().filter(car => car.status === 'active');
    const allConversations = [];

    allCars.forEach(car => {
      const bids = car.mockBids || []; // Now uses mockBids from updated data
      bids.forEach(bid => {
        allConversations.push({ car, bid });
      });
    });

    allConversations.sort((a, b) => b.bid.timestamp - a.bid.timestamp);
    setConversations(allConversations);
  }, []);

  const handleAward = async (car, bid) => {
    if (!car || !bid) return;

    await new Promise(r => setTimeout(r, 800));

    const now = new Date();
    let paymentDeadline = null;
    if (car.locationType === 'in-stock') {
      paymentDeadline = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    }

    const saleProcess = {
      status: 'awarded',
      awardedTo: { buyerName: bid.buyerName, bidId: bid.id, amount: bid.amount },
      paymentDeadline,
      delivery: car.locationType === 'in-stock'
        ? { status: 'ready', expectedAt: null }
        : { status: 'pending-receipt', expectedAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) },
      documents: {
        proformaSent: true,
        sellerInvoiceUploaded: false,
        ascriptionCode: ''
      }
    };

    const soldItem = {
      id: `${car.id}_sold_${Date.now()}`,
      car: { ...car, saleProcess },
      awardedTo: bid,
      soldAt: now,
    };

    setRecentlySold(prev => [soldItem, ...prev]);
    setConversations(prev => prev.filter(c => !(c.car.id === car.id && c.bid.id === bid.id)));
    setSelectedConversation(null);
    alert(t('award.success') || 'Car successfully awarded!');
  };

  const renderConversationItem = (item) => {
    const { car, bid } = item;
    const isHighest = conversations
      .filter(c => c.car.id === car.id)
      .every(c => c.bid.amount <= bid.amount);

    return (
      <div
        key={`${car.id}-${bid.id}`}
        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
          selectedConversation?.car.id === car.id && selectedConversation?.bid.id === bid.id
            ? 'bg-blue-50 border-l-4 border-[#3b396d]'
            : 'border-gray-100'
        }`}
        onClick={() => setSelectedConversation(item)}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-600" />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate">{bid.buyerName}</div>
            <div className="text-sm text-gray-600 truncate">
              {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
            </div>
            <div className="flex items-center mt-1">
              <FiDollarSign className="text-green-600 mr-1 text-xs" />
              <span className="text-sm font-bold text-green-700">€{bid.amount.toLocaleString()}</span>
              {isHighest && (
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                  {t('award.highest') || 'Highest'}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
            {new Date(bid.timestamp).toLocaleDateString(
              language === 'de' ? 'de-DE' : language === 'nl' ? 'nl-NL' : 'en-US'
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAwardPanel = () => {
    if (!selectedConversation) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 text-center">
          <FiAward className="text-4xl mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">{t('award.selectConversation') || 'Select a bidding request'}</h3>
          <p className="text-sm max-w-md">
            {t('award.biddingRequests') || 'Bidding requests'} appear on the left.
          </p>
        </div>
      );
    }

    const { car, bid } = selectedConversation;
    const isHighest = conversations
      .filter(c => c.car.id === car.id)
      .every(c => c.bid.amount <= bid.amount);

    const availabilityText = car.locationType === 'in-stock'
      ? (t('award.carAvailableNow') || 'Car is immediately available. Payment due within 48 hours.')
      : (t('award.carAtNetwork') || 'Car is at Car Network Europe. Payment due 48h after delivery.');

    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FiAward className="mr-2 text-[#3b396d]" /> {t('award.awardCar') || 'Award Car'}
              </h2>
              <p className="text-gray-600 mt-1">
                {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
              </p>
            </div>
            <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
              {getSaleTypeIcon(car.saleType)}
              <span className="ml-1.5">{getSaleTypeLabel(car.saleType)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5 mb-6">
            <div className="font-medium text-gray-900 flex items-center">
              <FiUser className="mr-2 text-blue-600" /> {bid.buyerName}
            </div>
            <div className="mt-2 flex items-center">
              <FiDollarSign className="text-[#3b396d] mr-1.5" />
              <span className="font-bold text-[#3b396d] text-xl">€{bid.amount.toLocaleString()}</span>
              {isHighest && (
                <span className="ml-3 px-2.5 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                  {t('award.highest') || 'Highest'}
                </span>
              )}
            </div>
            {bid.broker && (
              <div className="text-sm text-gray-700 mt-1">
                <span className="font-medium">{t('award.broker') || 'Broker'}:</span> {bid.broker}
              </div>
            )}
            {bid.note && (
              <div className="mt-2 text-sm italic text-gray-800 bg-white bg-opacity-70 p-2 rounded">
                “{bid.note}”
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 flex items-center mb-3">
              <FaCar className="mr-2" /> {t('award.carDetails') || 'Car Details'}
            </h3>
            <p className="text-gray-700 text-sm mb-2">{car.mediaAndDescription.headline}</p>
            <div className="text-xs text-gray-500 space-x-3">
              <span>{car.location}</span>
              <span>•</span>
              <span>{car.mileage} {car.mileageUnit}</span>
              <span>•</span>
              <span>{car.fuelType}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
              <div><span className="font-medium">{t('award.reserve') || 'Reserve'}:</span> €{car.reservePrice?.toLocaleString() || 'N/A'}</div>
              <div><span className="font-medium">{t('award.highestBid') || 'Highest Bid'}:</span> €{car.highestBid?.toLocaleString() || 'N/A'}</div>
              <div className="mt-1 text-blue-700 font-medium">
                <FiClock className="inline mr-1 text-blue-600" />
                {availabilityText}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelectedConversation(null)}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              {t('award.cancel') || 'Cancel'}
            </button>
            <button
              onClick={() => handleAward(car, bid)}
              className="px-6 py-2.5 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] flex items-center font-medium shadow-sm"
            >
              <FiCheck className="mr-1.5" />
              {t('award.awardToSelected') || 'Award to Selected Bidder'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRecentlySold = () => {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FiArchive className="mr-2 text-gray-600" /> {t('award.recentlySold') || 'Recently Sold'}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {recentlySold.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FiArchive className="text-4xl mx-auto mb-3 opacity-50" />
              {t('award.noSoldCars') || 'No cars sold yet.'}
            </div>
          ) : (
            <div className="space-y-4">
              {recentlySold.map(item => (
                <div key={item.id} className="bg-white rounded-xl border p-5 shadow-sm">
                  <div className="font-bold text-gray-900">
                    {item.car.vehicleIdentification.year} {item.car.vehicleIdentification.make} {item.car.vehicleIdentification.model}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t('award.awardedTo') || 'Awarded to'}: {item.awardedTo.buyerName}
                  </div>
                  <div className="flex items-center mt-2">
                    <FiDollarSign className="text-green-600 mr-1" />
                    <span className="font-semibold text-green-700">€{item.awardedTo.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {t('award.soldOn') || 'Sold on'}: {item.soldAt.toLocaleDateString(
                      language === 'de' ? 'de-DE' : language === 'nl' ? 'nl-NL' : 'en-US'
                    )}
                  </div>
                  {item.car.locationType === 'network' && (
                    <div className="text-xs text-blue-600 mt-1">
                      {t('award.deliveryPending') || 'Delivery in progress'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">{t('award.biddingRequests') || 'Bidding Requests'}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {conversations.length} active request{conversations.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'active'
                ? 'text-[#3b396d] border-b-2 border-[#3b396d] bg-blue-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('active')}
          >
            {t('award.activeBids') || 'Active Bids'}
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'sold'
                ? 'text-[#3b396d] border-b-2 border-[#3b396d] bg-blue-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('sold')}
          >
            {t('award.recentlySold') || 'Recently Sold'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'active' ? (
            conversations.length > 0 ? (
              conversations.map(renderConversationItem)
            ) : (
              <div className="p-6 text-center text-gray-500">{t('award.noActiveBids') || 'No active bidding requests.'}</div>
            )
          ) : (
            recentlySold.length > 0 ? (
              recentlySold.map(item => renderConversationItem({ car: item.car, bid: item.awardedTo }))
            ) : (
              <div className="p-6 text-center text-gray-500">{t('award.noSoldCars') || 'No cars sold yet.'}</div>
            )
          )}
        </div>
      </div>

      <div className="flex-1">
        {activeTab === 'active' ? renderAwardPanel() : renderRecentlySold()}
      </div>
    </div>
  );
};

export default BiddingChatLayout;