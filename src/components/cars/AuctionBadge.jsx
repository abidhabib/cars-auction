// src/components/cars/AuctionBadge.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AuctionBadge = ({ type, timeLeft }) => {
  const { t } = useLanguage();

  const getTypeConfig = () => {
    switch (type) {
      case 'direct':
        return {
          label: t('directBuy'),
          className: 'bg-green-100 text-green-800',
          description: 'Fixed price - buy now'
        };
      case 'auction':
        return {
          label: t('generalAuction'),
          className: 'bg-blue-100 text-blue-800',
          description: 'Blind bidding - 3 days'
        };
      case 'private':
        return {
          label: t('privateSale'),
          className: 'bg-purple-100 text-purple-800',
          description: 'Link shared only'
        };
      default:
        return { label: type, className: 'bg-gray-100 text-gray-800' };
    }
  };

  const config = getTypeConfig();

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
      <span>{config.label}</span>
      {timeLeft && (
        <span className="ml-2">
          {timeLeft} {t('daysLeft')}
        </span>
      )}
    </div>
  );
};

export default AuctionBadge;