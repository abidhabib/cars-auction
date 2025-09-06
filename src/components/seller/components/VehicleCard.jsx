// src/components/seller/components/VehicleCard.jsx
import React from 'react';
import { FiCheck, FiDollarSign } from 'react-icons/fi';

const VehicleCard = ({ vehicle, onClick, t }) => { // Receive t as prop
  return (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={onClick}>
      <img src={vehicle.mainImage} alt={`${vehicle.make} ${vehicle.model}`} className="h-12 w-16 object-cover rounded mr-4" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{vehicle.make} {vehicle.model}</p>
        <p className="text-xs text-gray-500 truncate">{vehicle.stockNumber} • {vehicle.year}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {vehicle.status === 'sold' ? `€${vehicle.finalSalePrice?.toLocaleString()}` : `€${vehicle.currentBid?.toLocaleString() || vehicle.askingPrice?.toLocaleString()}`}
        </p>
        <p className={`text-xs ${vehicle.status === 'active' ? 'text-green-600' : vehicle.status === 'sold' ? 'text-blue-600' : 'text-gray-500'}`}>
          {vehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
           vehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
           (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;