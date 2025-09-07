// src/components/seller/VehicleDetailModal.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiX, FiEdit, FiCopy, FiLink } from 'react-icons/fi';

const VehicleDetailModal = ({ vehicle, onClose, t }) => { // Receive t as prop
  if (!vehicle) return null;

  const copyAuctionLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert(t('sellerDashboard.linkCopied') || 'Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert(t('sellerDashboard.linkCopyFailed') || 'Failed to copy link.');
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{vehicle.stockNumber}</p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <img src={vehicle.mainImage} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-auto rounded-lg" />
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>{t('sellerDashboard.inventory.mileage') || 'Mileage'}:</strong></div>
                      <div>{vehicle.mileage?.toLocaleString()} km</div>
                      <div><strong>{t('sellerDashboard.inventory.fuelType') || 'Fuel Type'}:</strong></div>
                      <div>{vehicle.fuelType}</div>
                      <div><strong>{t('sellerDashboard.inventory.transmission') || 'Transmission'}:</strong></div>
                      <div>{vehicle.transmission}</div>
                      <div><strong>{t('sellerDashboard.inventory.color') || 'Color'}:</strong></div>
                      <div>{vehicle.color}</div>
                      <div><strong>{t('sellerDashboard.inventory.condition') || 'Condition'}:</strong></div>
                      <div>{vehicle.condition}</div>
                      <div><strong>{t('sellerDashboard.inventory.location') || 'Location'}:</strong></div>
                      <div>{vehicle.location}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between p-3 bg-[#f8f9ff] rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">{t('sellerDashboard.inventory.status') || 'Status'}</p>
                      <p className={`font-bold ${
                        vehicle.status === 'active' ? 'text-green-600' :
                        vehicle.status === 'sold' ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {vehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
                         vehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
                         (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('sellerDashboard.inventory.price') || 'Price'}</p>
                      <p className="font-bold text-[#3b396d]">
                        {vehicle.status === 'sold' ? `€${vehicle.finalSalePrice?.toLocaleString()}` :
                         vehicle.status === 'active' ? `€${vehicle.currentBid?.toLocaleString()}` :
                         `€${vehicle.askingPrice?.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </div>
                {vehicle.auctionType === 'private' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <FiLink className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">{t('sellerDashboard.inventory.privateAuction') || 'Private Auction Link'}</p>
                        <p className="text-xs text-yellow-700 mt-1 break-all">{vehicle.auctionLink}</p>
                        <button
                          onClick={() => copyAuctionLink(vehicle.auctionLink)}
                          className="mt-2 inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <FiCopy className="mr-1 h-3 w-3" />
                          {t('copyLink') || 'Copy Link'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3b396d] text-base font-medium text-white hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t('edit') || 'Edit'}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              {t('close') || 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailModal;