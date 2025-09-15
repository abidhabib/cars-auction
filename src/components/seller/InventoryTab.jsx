// src/components/seller/InventoryTab.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FiPlus, FiSearch, FiFilter, FiEye, FiEdit, FiLink, 
  FiCopy, FiTrash2, FiRefreshCw, FiChevronLeft, 
  FiChevronRight, FiStar, FiClock, FiDollarSign 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {demoVehicles} from './demoVehicles'

// Vehicle Service (Mock API calls)
const VehicleService = {
  async fetchVehicles(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 500));
    let results = [...demoVehicles];
    
    // Apply filters
    if (filters.status && filters.status !== 'all') {
      results = results.filter(v => v.status === filters.status);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(v => 
        v.make.toLowerCase().includes(searchTerm) ||
        v.model.toLowerCase().includes(searchTerm) ||
        v.stockNumber.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      results.sort((a, b) => {
        let aValue = a[filters.sortBy];
        let bValue = b[filters.sortBy];
        
        if (filters.sortBy === 'year') {
          return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return results;
  },

  async deleteVehicle(vehicleId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Vehicle deleted successfully' };
  },

  async updateVehicleStatus(vehicleId, status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Vehicle status updated successfully' };
  },
  
  async toggleFeatured(vehicleId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Featured status updated successfully' };
  }
};

// Dummy data for demo (50 vehicles)


// Example of auto-generating vehicles
const makes = ['BMW', 'Audi', 'Mercedes-Benz', 'Tesla', 'Volkswagen', 'Toyota', 'Porsche', 'Volvo', 'Ford', 'Jaguar'];
const models = ['X5', 'A6', 'GLE', 'Model 3', 'Golf', 'Corolla', 'Cayenne', 'XC90', 'Mustang', 'F-Pace'];

for (let i = 4; i <= 50; i++) {
  const make = makes[i % makes.length];
  const model = models[i % models.length];
  demoVehicles.push({
    id: `veh_${String(i).padStart(3, '0')}`,
    stockNumber: `STK2023-${String(i).padStart(3, '0')}`,
    make,
    model,
    year: 2015 + (i % 9), // 2015–2023
    mileage: 10000 * (i % 15),
    fuelType: ['Petrol', 'Diesel', 'Hybrid', 'Electric'][i % 4],
    transmission: ['Automatic', 'Manual'][i % 2],
    color: ['Black', 'White', 'Silver', 'Red', 'Blue'][i % 5],
    condition: ['Excellent', 'Good', 'Fair', 'Like New'][i % 4],
    mainImage: `https://source.unsplash.com/800x500/?car,${make},${model},${i}`,
    images: [
      `https://source.unsplash.com/800x500/?car,${make},${i}`,
      `https://source.unsplash.com/800x500/?vehicle,${model},${i}`,
      `https://source.unsplash.com/800x500/?automobile,${make},${model},${i}`
    ],
    status: ['active', 'sold', 'draft'][i % 3],
    currentBid: 20000 + i * 500,
    reservePrice: 18000 + i * 500,
    buyItNowPrice: 25000 + i * 600,
    auctionEnds: new Date(Date.now() + i * 3600000),
    location: ['Berlin, DE', 'Hamburg, DE', 'Munich, DE', 'London, UK'][i % 4],
    auctionType: ['public', 'private'][i % 2],
    auctionLink: `https://auction.example.com/private/veh_${String(i).padStart(3, '0')}`,
    featured: i % 5 === 0,
    vim: `VIN1234567890${i}`,
    description: `${make} ${model} in ${i % 2 === 0 ? 'great' : 'excellent'} condition.`
  });
}


// Sub-components for better organization
const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting, 
  t 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('sellerDashboard.inventory.deleteConfirmTitle') || 'Delete Vehicle'}
        </h3>
        <p className="text-gray-500 mb-6">
          {t('sellerDashboard.inventory.deleteConfirmText') || 'Are you sure you want to delete this vehicle? This action cannot be undone.'}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
          >
            {t('sellerDashboard.cancel') || 'Cancel'}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="flex items-center">
                <FiRefreshCw className="animate-spin mr-2 h-4 w-4" />
                {t('sellerDashboard.deleting') || 'Deleting...'}
              </span>
            ) : (
              t('sellerDashboard.delete') || 'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const VehicleDetailView = ({ 
  vehicle, 
  onBack, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onToggleFeatured,
  t 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBidHistory, setShowBidHistory] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(vehicle.id);
    setDeleting(false);
    setShowDeleteConfirm(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(t('sellerDashboard.linkCopied') || 'Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert(t('sellerDashboard.linkCopyFailed') || 'Failed to copy link.');
    });
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  const translateWithFallback = (key, fallback) => {
    const translation = t(key);
    return translation && !translation.includes('missing') ? translation : fallback;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-[#3b396d] hover:text-[#2a285a] mr-4"
          >
            <FiChevronLeft className="h-5 w-5 mr-1" />
            {translateWithFallback('sellerDashboard.back', 'Back')}
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 mb-4 lg:mb-0 lg:pr-6">
            <div className="relative">
              <img 
                src={vehicle.images?.[currentImageIndex] || vehicle.mainImage} 
                alt={`${vehicle.make} ${vehicle.model}`} 
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = '/car1.jpg';
                }}
              />
              {vehicle.images?.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                    {vehicle.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {vehicle.featured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <FiStar className="mr-1" /> Featured
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-2">
              {vehicle.images?.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-16 w-full ${currentImageIndex === index ? 'ring-2 ring-[#3b396d]' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`${vehicle.make} ${vehicle.model} ${index + 1}`} 
                    className="h-full w-full object-cover rounded"
                    onError={(e) => {
                  e.target.src = '/car1.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                <p className="text-gray-600">{vehicle.stockNumber}</p>
                {vehicle.vim && <p className="text-xs text-gray-500 mt-1">VIN: {vehicle.vim}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                  vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {vehicle.status === 'active' ? translateWithFallback('sellerDashboard.vehicleStatus.active', 'Active') :
                   vehicle.status === 'sold' ? translateWithFallback('sellerDashboard.vehicleStatus.sold', 'Sold') :
                   translateWithFallback('sellerDashboard.vehicleStatus.draft', 'Draft')}
                </span>
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                  onClick={() => onEdit(vehicle.id)}
                  title={`edit`}
                >
                  <FiEdit className="h-5 w-5" />
                </button>
              </div>
            </div>

            {vehicle.description && (
              <div className="mb-4">
                <p className="text-sm text-gray-700">{vehicle.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.mileage', 'Mileage')}</p>
                <p className="font-medium">{vehicle.mileage?.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.fuelType', 'Fuel Type')}</p>
                <p className="font-medium">{vehicle.fuelType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.transmission', 'Transmission')}</p>
                <p className="font-medium">{vehicle.transmission}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.color', 'Color')}</p>
                <p className="font-medium">{vehicle.color}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.condition', 'Condition')}</p>
                <p className="font-medium">{vehicle.condition}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.location', 'Location')}</p>
                <p className="font-medium">{vehicle.location}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {vehicle.status === 'active' && (
                <>
                  <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.currentBid', 'Current Bid')}</p>
                    <p className="text-2xl font-bold text-[#3b396d]">€{vehicle.currentBid?.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {translateWithFallback('sellerDashboard.inventory.reservePrice', 'Reserve')}: €{vehicle.reservePrice?.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.auctionEnds', 'Auction Ends')}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {vehicle.auctionEnds?.toLocaleDateString()} <br />
                      <span className="text-sm font-normal">{vehicle.auctionEnds?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <FiClock className="mr-1" />
                      {Math.floor((vehicle.auctionEnds - new Date()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                  </div>
                  <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.bids', 'Bids')}</p>
                    <p className="text-2xl font-bold text-gray-900">{vehicle.bids?.length || 0}</p>
                    <button
                      onClick={() => setShowBidHistory(!showBidHistory)}
                      className="text-xs text-[#3b396d] hover:text-[#2a285a] font-medium mt-1"
                    >
                      {showBidHistory ? 'Hide History' : 'View History'}
                    </button>
                  </div>
                  {vehicle.buyItNowPrice && (
                    <div className="bg-green-50 rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">Buy It Now Price</p>
                      <p className="text-2xl font-bold text-green-800">€{vehicle.buyItNowPrice?.toLocaleString()}</p>
                    </div>
                  )}
                </>
              )}
              {vehicle.status === 'sold' && (
                <>
                  <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.finalSalePrice', 'Final Sale Price')}</p>
                    <p className="text-2xl font-bold text-[#3b396d]">€{vehicle.finalSalePrice?.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.soldTo', 'Sold To')}</p>
                    <p className="font-medium text-gray-900">{vehicle.buyer?.name}</p>
                    <p className="text-xs text-gray-500">{vehicle.soldDate?.toLocaleDateString()}</p>
                  </div>
                </>
              )}
              {vehicle.status === 'draft' && vehicle.askingPrice && (
                <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                  <p className="text-sm text-gray-500 mb-1">Asking Price</p>
                  <p className="text-2xl font-bold text-[#3b396d]">€{vehicle.askingPrice?.toLocaleString()}</p>
                </div>
              )}
            </div>

            {showBidHistory && vehicle.bids?.length > 0 && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Bid History</h4>
                <div className="space-y-2">
                  {vehicle.bids.map((bid, index) => (
                    <div key={bid.id || index} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <p className="font-medium">{bid.bidder || `Bidder #${index + 1}`}</p>
                        <p className="text-xs text-gray-500">{bid.time?.toLocaleString()}</p>
                      </div>
                      <div className="text-lg font-bold text-[#3b396d]">€{bid.amount?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vehicle.auctionType === 'private' && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <FiLink className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">{translateWithFallback('sellerDashboard.inventory.privateAuction', 'Private Auction Link')}</p>
                    <p className="text-xs text-yellow-700 mt-1 break-all">{vehicle.auctionLink}</p>
                    <button
                      onClick={() => copyToClipboard(vehicle.auctionLink)}
                      className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <FiCopy className="mr-1 h-3 w-3" />
                      {translateWithFallback('sellerDashboard.copyLink', 'Copy Link')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onEdit(vehicle.id)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
              >
                <FiEdit className="mr-2 h-4 w-4" />
                {translateWithFallback('sellerDashboard.edit', 'Edit')}
              </button>
              
              <button
                onClick={() => onToggleFeatured(vehicle.id, !vehicle.featured)}
                className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] ${
                  vehicle.featured 
                    ? 'border-yellow-400 text-yellow-700 bg-yellow-100 hover:bg-yellow-200' 
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <FiStar className="mr-2 h-4 w-4" />
                {vehicle.featured ? 'Unfeature' : 'Feature'}
              </button>
              
              {vehicle.status !== 'sold' && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiTrash2 className="mr-2 h-4 w-4" />
                  {translateWithFallback('sellerDashboard.delete', 'Delete')}
                </button>
              )}
              
              {vehicle.status === 'draft' && (
                <button
                  onClick={() => onStatusChange(vehicle.id, 'active')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {translateWithFallback('sellerDashboard.inventory.publish', 'Publish')}
                </button>
              )}
              
              {vehicle.status === 'active' && (
                <button
                  onClick={() => onStatusChange(vehicle.id, 'draft')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                >
                  {translateWithFallback('sellerDashboard.inventory.unpublish', 'Unpublish')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        isDeleting={deleting}
        t={t}
      />
    </div>
  );
};

const InventoryTab = ({ selectedVehicle, setSelectedVehicle, handleAddVehicle, handleViewVehicle }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'year',
    sortOrder: 'desc',
    featured: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch vehicles on component mount and when filters change
  useEffect(() => {
    loadVehicles();
  }, [filters.status, filters.sortBy, filters.sortOrder, filters.featured]);

  const loadVehicles = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);
      
      const data = await VehicleService.fetchVehicles(filters);
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(t('sellerDashboard.inventory.loadError') || 'Failed to load vehicles');
      console.error('Error loading vehicles:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      setDeletingId(vehicleId);
      const result = await VehicleService.deleteVehicle(vehicleId);
      
      if (result.success) {
        setVehicles(prevVehicles => prevVehicles.filter(v => v.id !== vehicleId));
        setShowDeleteConfirm(null);
        alert(t('sellerDashboard.inventory.deleteSuccess') || 'Vehicle deleted successfully');
      } else {
        throw new Error(result.message || 'Failed to delete vehicle');
      }
    } catch (err) {
      alert(t('sellerDashboard.inventory.deleteError') || 'Failed to delete vehicle: ' + err.message);
      console.error('Error deleting vehicle:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (vehicleId, newStatus) => {
    try {
      const result = await VehicleService.updateVehicleStatus(vehicleId, newStatus);
      
      if (result.success) {
        setVehicles(prevVehicles => 
          prevVehicles.map(v => 
            v.id === vehicleId ? { ...v, status: newStatus } : v
          )
        );
        alert(t('sellerDashboard.inventory.statusUpdateSuccess') || 'Vehicle status updated successfully');
      } else {
        throw new Error(result.message || 'Failed to update status');
      }
    } catch (err) {
      alert(t('sellerDashboard.inventory.statusUpdateError') || 'Failed to update status: ' + err.message);
      console.error('Error updating status:', err);
    }
  };

  const handleToggleFeatured = async (vehicleId, featured) => {
    try {
      const result = await VehicleService.toggleFeatured(vehicleId);
      
      if (result.success) {
        setVehicles(prevVehicles => 
          prevVehicles.map(v => 
            v.id === vehicleId ? { ...v, featured } : v
          )
        );
        alert(featured ? 'Vehicle featured successfully' : 'Vehicle unfeatured successfully');
      } else {
        throw new Error(result.message || 'Failed to update featured status');
      }
    } catch (err) {
      alert('Failed to update featured status: ' + err.message);
      console.error('Error updating featured status:', err);
    }
  };

  const handleEditVehicle = (vehicleId) => {
    navigate(`/seller/edit-vehicle/${vehicleId}`);
  };

 

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesStatus = filters.status === 'all' || vehicle.status === filters.status;
      const matchesSearch = filters.search === '' ||
        vehicle.make.toLowerCase().includes(filters.search.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(filters.search.toLowerCase()) ||
        vehicle.stockNumber.toLowerCase().includes(filters.search.toLowerCase());
      const matchesFeatured = !filters.featured || vehicle.featured;
      return matchesStatus && matchesSearch && matchesFeatured;
    });
  }, [vehicles, filters]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getStatusOptions = () => [
    { value: 'all', label: t('sellerDashboard.all') || 'All Vehicles' },
    { value: 'active', label: t('sellerDashboard.active') || 'Active' },
    { value: 'sold', label: t('sellerDashboard.sold') || 'Sold' },
    { value: 'draft', label: t('sellerDashboard.draft') || 'Draft' }
  ];

  const getSortOptions = () => [
    { value: 'year', label: t('sellerDashboard.inventory.sort.year') || 'Year' },
    { value: 'make', label: t('sellerDashboard.inventory.sort.make') || 'Make' },
    { value: 'mileage', label: t('sellerDashboard.inventory.sort.mileage') || 'Mileage' }
  ];

  const translateWithFallback = (key, fallback) => {
    const translation = t(key);
    return translation && !translation.includes('missing') ? translation : fallback;
  };

  if (selectedVehicle) {
    return (
      <VehicleDetailView
        vehicle={selectedVehicle}
        onBack={() => setSelectedVehicle(null)}
        onEdit={handleEditVehicle}
        onDelete={handleDeleteVehicle}
        onStatusChange={handleStatusChange}
        onToggleFeatured={handleToggleFeatured}
        t={t}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          {translateWithFallback('sellerDashboard.sidebar.inventory', 'My Inventory')}
        </h2>
       
      </div>

      {/* Filters */}
      <div >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={translateWithFallback('sellerDashboard.inventory.searchPlaceholder', "Search vehicles...")}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] text-sm"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] sm:text-sm rounded-md"
          >
            {getStatusOptions().map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] sm:text-sm rounded-md"
          >
            {getSortOptions().map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => loadVehicles(false)}
              disabled={refreshing}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] disabled:opacity-50"
            >
              <FiRefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center px-3 border border-gray-300 rounded-md">
              <input
                id="featured-filter"
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
                className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
              />
              <label htmlFor="featured-filter" className="ml-2 block text-sm text-gray-700">
                <FiStar className="inline h-4 w-4 mr-1" />
                
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b396d]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
              <div className="mt-2 text-sm text-red-700">
                <button 
                  onClick={() => loadVehicles()}
                  className="font-medium text-red-800 hover:text-red-900"
                >
                  {translateWithFallback('sellerDashboard.retry', 'Retry')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Grid/Table */}
      {!loading && !error && (
        <>
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {translateWithFallback('sellerDashboard.inventory.vehicle', 'Vehicle')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {translateWithFallback('sellerDashboard.inventory.details', 'Details')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {translateWithFallback('sellerDashboard.inventory.status', 'Status')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {translateWithFallback('sellerDashboard.inventory.price', 'Price')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {translateWithFallback('sellerDashboard.inventory.actions', 'Actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentVehicles.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {filters.search || filters.status !== 'all' || filters.featured
                          ? translateWithFallback('sellerDashboard.inventory.noResults', 'No vehicles found matching your criteria') 
                          : translateWithFallback('sellerDashboard.inventory.noVehicles', 'No vehicles in inventory')}
                      </td>
                    </tr>
                  ) : (
                    currentVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-16 relative">
                              <img 
                                className="h-12 w-16 object-cover rounded" 
                                src={vehicle.mainImage} 
                                alt={`${vehicle.make} ${vehicle.model}`}
                                onError={(e) => {
                                  e.target.src = '/car2.jpg';
                                }}
                              />
                              {vehicle.featured && (
                                <div className="absolute top-0 right-0 bg-yellow-500 text-white rounded-bl-md p-1">
                                  <FiStar className="h-3 w-3" />
                                </div>
                              )}
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
                            {vehicle.status === 'active' ? translateWithFallback('sellerDashboard.vehicleStatus.active', 'Active') :
                             vehicle.status === 'sold' ? translateWithFallback('sellerDashboard.vehicleStatus.sold', 'Sold') :
                             translateWithFallback('sellerDashboard.vehicleStatus.draft', 'Draft')}
                          </span>
                          {vehicle.auctionType === 'private' && (
                            <div className="mt-1 flex items-center text-xs text-yellow-600">
                              <FiLink className="mr-1 h-3 w-3" />
                              {translateWithFallback('sellerDashboard.inventory.private', 'Private')}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vehicle.status === 'sold' ? (
                            <div className="flex items-center">
                              <FiDollarSign className="h-4 w-4 text-green-600 mr-1" />
                              <span>€{vehicle.finalSalePrice?.toLocaleString()}</span>
                            </div>
                          ) : vehicle.status === 'active' ? (
                            <div>
                              <div className="flex items-center">
                                <FiDollarSign className="h-4 w-4 text-[#3b396d] mr-1" />
                                <span>€{vehicle.currentBid?.toLocaleString()}</span>
                              </div>
                              <div className="text-gray-500 text-xs">Reserve: €{vehicle.reservePrice?.toLocaleString()}</div>
                            </div>
                          ) : vehicle.askingPrice ? (
                            <div className="flex items-center">
                              <FiDollarSign className="h-4 w-4 text-gray-600 mr-1" />
                              <span>€{vehicle.askingPrice?.toLocaleString()}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">No price set</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewVehicle(vehicle)}
                              className="text-[#3b396d] hover:text-[#2a285a]"
                              title={translateWithFallback('sellerDashboard.view', 'View')}
                            >
                              <FiEye className="h-5 w-5" />
                            </button>
                            <button 
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => handleEditVehicle(vehicle.id)}
                              title={translateWithFallback('sellerDashboard.edit', 'Edit')}
                            >
                              <FiEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleToggleFeatured(vehicle.id, !vehicle.featured)}
                              className={`${vehicle.featured ? 'text-yellow-500 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'}`}
                              title={vehicle.featured ? 'Unfeature' : 'Feature'}
                            >
                              <FiStar className="h-5 w-5" />
                            </button>
                            {vehicle.status !== 'sold' && (
                              <button
                                onClick={() => setShowDeleteConfirm(vehicle.id)}
                                className="text-red-500 hover:text-red-700"
                                title={translateWithFallback('sellerDashboard.delete', 'Delete')}
                                disabled={deletingId === vehicle.id}
                              >
                                {deletingId === vehicle.id ? (
                                  <FiRefreshCw className="h-5 w-5 animate-spin" />
                                ) : (
                                  <FiTrash2 className="h-5 w-5" />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-lg shadow">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {translateWithFallback('sellerDashboard.previous', 'Previous')}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {translateWithFallback('sellerDashboard.next', 'Next')}
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {translateWithFallback('sellerDashboard.inventory.showing', 'Showing')} <span className="font-medium">{indexOfFirstItem + 1}</span> {translateWithFallback('sellerDashboard.to', 'to')} <span className="font-medium">{Math.min(indexOfLastItem, filteredVehicles.length)}</span> {translateWithFallback('sellerDashboard.of', 'of')} <span className="font-medium">{filteredVehicles.length}</span> {translateWithFallback('sellerDashboard.results', 'results')}
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === pageNumber
                              ? 'z-10 bg-[#3b396d] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b396d]'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteConfirmationModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDeleteVehicle(showDeleteConfirm)}
        isDeleting={deletingId === showDeleteConfirm}
        t={t}
      />
    </div>
  );
};

export default InventoryTab;