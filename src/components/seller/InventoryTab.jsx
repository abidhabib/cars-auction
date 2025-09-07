// src/components/seller/InventoryTab.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiPlus, FiSearch, FiFilter, FiEye, FiEdit,FiLink,FiCopy  } from 'react-icons/fi';

// Dummy data for demo
const demoVehicles = [
    {
      id: 'veh_001',
      stockNumber: 'STK2023-001',
      make: 'BMW',
      model: 'X5',
      year: 2022,
      mileage: 25000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      color: 'Black',
      condition: 'Excellent',
      mainImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=500&q=80',
      status: 'active',
      currentBid: 45000,
      reservePrice: 40000,
      buyItNowPrice: 52000,
      auctionEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      location: 'Berlin, DE',
      auctionType: 'public'
    },
    {
      id: 'veh_002',
      stockNumber: 'STK2023-002',
      make: 'Audi',
      model: 'A6',
      year: 2021,
      mileage: 32000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'White',
      condition: 'Good',
      mainImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80',
      status: 'sold',
      finalSalePrice: 38500,
      soldDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      buyer: {
        id: 'buyer_def',
        name: 'Luxury Motors Ltd.',
        email: 'sales@luxurymotors.co.uk',
        phone: '+44 20 7123 4567',
        location: 'London, UK'
      },
      location: 'Hamburg, DE',
      auctionType: 'private'
    },
    {
        id: 'veh_003',
        stockNumber: 'STK2023-003',
        make: 'Mercedes-Benz',
        model: 'GLE',
        year: 2023,
        mileage: 5000,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        color: 'Silver',
        condition: 'Like New',
        mainImage: 'https://images.unsplash.com/photo-1558981000-f5f2a3c4b4e4?auto=format&fit=crop&w=500&q=80',
        status: 'draft',
        askingPrice: 65000,
        location: 'Munich, DE',
        auctionType: 'public'
      }
];

const InventoryTab = ({ selectedVehicle, setSelectedVehicle, handleAddVehicle, handleViewVehicle }) => {
  const { t } = useLanguage();
  const [auctionFilter, setAuctionFilter] = useState('all'); // all, active, sold, draft
  const [searchTerm, setSearchTerm] = useState('');

  // Filter vehicles based on status, search term
  const filteredVehicles = demoVehicles.filter(vehicle => {
    const matchesFilter = auctionFilter === 'all' || vehicle.status === auctionFilter;
    const matchesSearch = searchTerm === '' ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.stockNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (selectedVehicle) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
              <img src={selectedVehicle.mainImage} alt={`${selectedVehicle.make} ${selectedVehicle.model}`} className="w-full h-auto rounded-lg object-cover" />
            </div>
            <div className="md:w-2/3">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h3>
                  <p className="text-gray-600">{selectedVehicle.stockNumber}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedVehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedVehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedVehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
                     selectedVehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
                     (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
                  </span>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <FiEdit className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.mileage') || 'Mileage'}</p>
                  <p className="font-medium">{selectedVehicle.mileage?.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.fuelType') || 'Fuel Type'}</p>
                  <p className="font-medium">{selectedVehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.transmission') || 'Transmission'}</p>
                  <p className="font-medium">{selectedVehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.color') || 'Color'}</p>
                  <p className="font-medium">{selectedVehicle.color}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.condition') || 'Condition'}</p>
                  <p className="font-medium">{selectedVehicle.condition}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('sellerDashboard.inventory.location') || 'Location'}</p>
                  <p className="font-medium">{selectedVehicle.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedVehicle.status === 'active' && (
                  <>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.currentBid') || 'Current Bid'}</p>
                      <p className="text-2xl font-bold text-[#3b396d]">€{selectedVehicle.currentBid?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t('sellerDashboard.inventory.reservePrice') || 'Reserve'}: €{selectedVehicle.reservePrice?.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.auctionEnds') || 'Auction Ends'}</p>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedVehicle.auctionEnds?.toLocaleDateString()} <br />
                        <span className="text-sm font-normal">{selectedVehicle.auctionEnds?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </p>
                    </div>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.bids') || 'Bids'}</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedVehicle.bids?.length || 0}</p>
                      <button
                        onClick={() => {
                          alert(t('sellerDashboard.viewBidHistoryAlert') || 'Opening bid history...');
                          // navigate(`/seller/auction/${selectedVehicle.id}/bids`); // Uncomment when you have the bids page
                        }}
                        className="text-xs text-[#3b396d] hover:text-[#2a285a] font-medium mt-1"
                      >
                        {t('viewDetails') || 'View Details'}
                      </button>
                    </div>
                  </>
                )}
                {selectedVehicle.status === 'sold' && (
                  <>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.finalSalePrice') || 'Final Sale Price'}</p>
                      <p className="text-2xl font-bold text-[#3b396d]">€{selectedVehicle.finalSalePrice?.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{t('sellerDashboard.inventory.soldTo') || 'Sold To'}</p>
                      <p className="font-medium text-gray-900">{selectedVehicle.buyer?.name}</p>
                      <p className="text-xs text-gray-500">{selectedVehicle.soldDate?.toLocaleDateString()}</p>
                    </div>
                  </>
                )}
              </div>

              {selectedVehicle.auctionType === 'private' && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <FiLink className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">{t('sellerDashboard.inventory.privateAuction') || 'Private Auction Link'}</p>
                      <p className="text-xs text-yellow-700 mt-1 break-all">{selectedVehicle.auctionLink}</p>
                      <button
                        onClick={() => {
                            navigator.clipboard.writeText(selectedVehicle.auctionLink).then(() => {
                                alert(t('sellerDashboard.linkCopied') || 'Link copied to clipboard!');
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                                alert(t('sellerDashboard.linkCopyFailed') || 'Failed to copy link.');
                            });
                        }}
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          {t('sellerDashboard.sidebar.inventory') || 'My Inventory'}
        </h2>
        <button
          onClick={handleAddVehicle}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
        >
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          {t('sellerDashboard.inventory.addVehicle') || 'Add Vehicle'}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('sellerDashboard.inventory.searchPlaceholder') || "Search vehicles..."}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={auctionFilter}
              onChange={(e) => setAuctionFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] sm:text-sm rounded-md"
            >
              <option value="all">{t('sellerDashboard.filters.all') || 'All Vehicles'}</option>
              <option value="active">{t('sellerDashboard.filters.active') || 'Active'}</option>
              <option value="sold">{t('sellerDashboard.filters.sold') || 'Sold'}</option>
              <option value="draft">{t('sellerDashboard.filters.draft') || 'Draft'}</option>
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]">
              <FiFilter className="mr-1 h-4 w-4" />
              {t('filters') || 'Filters'}
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Grid/Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.vehicle') || 'Vehicle'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.details') || 'Details'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.status') || 'Status'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.price') || 'Price'}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sellerDashboard.inventory.actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-16">
                        <img className="h-12 w-16 object-cover rounded" src={vehicle.mainImage} alt={`${vehicle.make} ${vehicle.model}`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                        <div className="text-sm text-gray-500">{vehicle.stockNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vehicle.year}</div>
                    <div className="text-sm text-gray-500">{vehicle.mileage?.toLocaleString()} km • {vehicle.fuelType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {vehicle.status === 'active' ? (t('sellerDashboard.vehicleStatus.active') || 'Active') :
                       vehicle.status === 'sold' ? (t('sellerDashboard.vehicleStatus.sold') || 'Sold') :
                       (t('sellerDashboard.vehicleStatus.draft') || 'Draft')}
                    </span>
                    {vehicle.auctionType === 'private' && (
                      <div className="mt-1 flex items-center text-xs text-yellow-600">
                        <FiLink className="mr-1 h-3 w-3" />
                        {t('sellerDashboard.inventory.private') || 'Private'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.status === 'sold' ? (
                      <>€{vehicle.finalSalePrice?.toLocaleString()}</>
                    ) : vehicle.status === 'active' ? (
                      <>€{vehicle.currentBid?.toLocaleString()} <span className="text-gray-500 text-xs">(€{vehicle.reservePrice?.toLocaleString()} reserve)</span></>
                    ) : (
                      <>€{vehicle.askingPrice?.toLocaleString()}</>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewVehicle(vehicle)}
                      className="text-[#3b396d] hover:text-[#2a285a] mr-3"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FiEdit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;