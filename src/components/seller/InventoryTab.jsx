// src/components/seller/InventoryTab.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiPlus, FiSearch, FiFilter, FiEye, FiEdit, FiLink, FiCopy, FiTrash2, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Vehicle Service (Mock API calls)
const VehicleService = {
  // Mock API call to fetch vehicles
  async fetchVehicles(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In real app: return fetch('/api/vehicles', { method: 'GET' }).then(res => res.json());
    return demoVehicles;
  },

  // Mock API call to delete vehicle
  async deleteVehicle(vehicleId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // In real app: return fetch(`/api/vehicles/${vehicleId}`, { method: 'DELETE' }).then(res => res.json());
    return { success: true, message: 'Vehicle deleted successfully' };
  },

  // Mock API call to update vehicle status
  async updateVehicleStatus(vehicleId, status) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // In real app: return fetch(`/api/vehicles/${vehicleId}/status`, { 
    //   method: 'PUT', 
    //   body: JSON.stringify({ status }),
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(res => res.json());
    return { success: true, message: 'Vehicle status updated successfully' };
  }
};

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
    auctionType: 'public',
    bids: [{ id: 1, amount: 42000 }, { id: 2, amount: 45000 }],
    auctionLink: 'https://auction.example.com/private/veh_001'
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
    auctionType: 'private',
    auctionLink: 'https://auction.example.com/private/veh_002'
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
    auctionType: 'public',
    auctionLink: 'https://auction.example.com/private/veh_003'
  }
];

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
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch vehicles on component mount
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await VehicleService.fetchVehicles(filters);
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(t('sellerDashboard.inventory.loadError') || 'Failed to load vehicles');
      console.error('Error loading vehicles:', err);
    } finally {
      setLoading(false);
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(t('sellerDashboard.linkCopied') || 'Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert(t('sellerDashboard.linkCopyFailed') || 'Failed to copy link.');
    });
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = filters.status === 'all' || vehicle.status === filters.status;
    const matchesSearch = filters.search === '' ||
      vehicle.make.toLowerCase().includes(filters.search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(filters.search.toLowerCase()) ||
      vehicle.stockNumber.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getStatusOptions = () => [
    { value: 'all', label: t('sellerDashboard.filters.all') || 'All Vehicles' },
    { value: 'active', label: t('sellerDashboard.filters.active') || 'Active' },
    { value: 'sold', label: t('sellerDashboard.filters.sold') || 'Sold' },
    { value: 'draft', label: t('sellerDashboard.filters.draft') || 'Draft' }
  ];

  const getSortOptions = () => [
    { value: 'year', label: t('sellerDashboard.inventory.sort.year') || 'Year' },
    { value: 'make', label: t('sellerDashboard.inventory.sort.make') || 'Make' },
    { value: 'price', label: t('sellerDashboard.inventory.sort.price') || 'Price' },
    { value: 'mileage', label: t('sellerDashboard.inventory.sort.mileage') || 'Mileage' }
  ];

  // Translation helper with fallbacks
  const translateWithFallback = (key, fallback) => {
    const translation = t(key);
    return translation && !translation.includes('missing') ? translation : fallback;
  };

  if (selectedVehicle) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="flex items-center text-[#3b396d] hover:text-[#2a285a] mr-4"
            >
              <FiChevronLeft className="h-5 w-5 mr-1" />
              {translateWithFallback('back', 'Back')}
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
              <img 
                src={selectedVehicle.mainImage} 
                alt={`${selectedVehicle.make} ${selectedVehicle.model}`} 
                className="w-full h-auto rounded-lg object-cover" 
                onError={(e) => {
                  e.target.src = '/placeholder-vehicle.jpg';
                }}
              />
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
                    {selectedVehicle.status === 'active' ? translateWithFallback('sellerDashboard.vehicleStatus.active', 'Active') :
                     selectedVehicle.status === 'sold' ? translateWithFallback('sellerDashboard.vehicleStatus.sold', 'Sold') :
                     translateWithFallback('sellerDashboard.vehicleStatus.draft', 'Draft')}
                  </span>
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                    onClick={() => navigate(`/seller/edit-vehicle/${selectedVehicle.id}`)}
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.mileage', 'Mileage')}</p>
                  <p className="font-medium">{selectedVehicle.mileage?.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.fuelType', 'Fuel Type')}</p>
                  <p className="font-medium">{selectedVehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.transmission', 'Transmission')}</p>
                  <p className="font-medium">{selectedVehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.color', 'Color')}</p>
                  <p className="font-medium">{selectedVehicle.color}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.condition', 'Condition')}</p>
                  <p className="font-medium">{selectedVehicle.condition}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{translateWithFallback('sellerDashboard.inventory.location', 'Location')}</p>
                  <p className="font-medium">{selectedVehicle.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedVehicle.status === 'active' && (
                  <>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.currentBid', 'Current Bid')}</p>
                      <p className="text-2xl font-bold text-[#3b396d]">€{selectedVehicle.currentBid?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {translateWithFallback('sellerDashboard.inventory.reservePrice', 'Reserve')}: €{selectedVehicle.reservePrice?.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.auctionEnds', 'Auction Ends')}</p>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedVehicle.auctionEnds?.toLocaleDateString()} <br />
                        <span className="text-sm font-normal">{selectedVehicle.auctionEnds?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </p>
                    </div>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.bids', 'Bids')}</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedVehicle.bids?.length || 0}</p>
                      <button
                        onClick={() => {
                          navigate(`/seller/auction/${selectedVehicle.id}/bids`);
                        }}
                        className="text-xs text-[#3b396d] hover:text-[#2a285a] font-medium mt-1"
                      >
                        {translateWithFallback('viewDetails', 'View Details')}
                      </button>
                    </div>
                  </>
                )}
                {selectedVehicle.status === 'sold' && (
                  <>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.finalSalePrice', 'Final Sale Price')}</p>
                      <p className="text-2xl font-bold text-[#3b396d]">€{selectedVehicle.finalSalePrice?.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#f8f9ff] rounded-lg p-4 flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500 mb-1">{translateWithFallback('sellerDashboard.inventory.soldTo', 'Sold To')}</p>
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
                      <p className="text-sm font-medium text-yellow-800">{translateWithFallback('sellerDashboard.inventory.privateAuction', 'Private Auction Link')}</p>
                      <p className="text-xs text-yellow-700 mt-1 break-all">{selectedVehicle.auctionLink}</p>
                      <button
                        onClick={() => copyToClipboard(selectedVehicle.auctionLink)}
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <FiCopy className="mr-1 h-3 w-3" />
                        {translateWithFallback('copyLink', 'Copy Link')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/seller/edit-vehicle/${selectedVehicle.id}`)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                >
                  <FiEdit className="mr-2 h-4 w-4" />
                  {translateWithFallback('edit', 'Edit')}
                </button>
                
                {selectedVehicle.status !== 'sold' && (
                  <button
                    onClick={() => setShowDeleteConfirm(selectedVehicle.id)}
                    className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    {translateWithFallback('delete', 'Delete')}
                  </button>
                )}
                
                {selectedVehicle.status === 'draft' && (
                  <button
                    onClick={() => handleStatusChange(selectedVehicle.id, 'active')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {translateWithFallback('sellerDashboard.inventory.publish', 'Publish')}
                  </button>
                )}
                
                {selectedVehicle.status === 'active' && (
                  <button
                    onClick={() => handleStatusChange(selectedVehicle.id, 'draft')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                  >
                    {translateWithFallback('sellerDashboard.inventory.unpublish', 'Unpublish')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm === selectedVehicle.id && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {translateWithFallback('sellerDashboard.inventory.deleteConfirmTitle', 'Delete Vehicle')}
              </h3>
              <p className="text-gray-500 mb-6">
                {translateWithFallback('sellerDashboard.inventory.deleteConfirmText', 'Are you sure you want to delete this vehicle? This action cannot be undone.')}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
                >
                  {translateWithFallback('cancel', 'Cancel')}
                </button>
                <button
                  onClick={() => handleDeleteVehicle(selectedVehicle.id)}
                  disabled={deletingId === selectedVehicle.id}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {deletingId === selectedVehicle.id ? (
                    <span className="flex items-center">
                      <FiRefreshCw className="animate-spin mr-2 h-4 w-4" />
                      {translateWithFallback('deleting', 'Deleting...')}
                    </span>
                  ) : (
                    translateWithFallback('delete', 'Delete')
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          {translateWithFallback('sellerDashboard.sidebar.inventory', 'My Inventory')}
        </h2>
        <button
          onClick={handleAddVehicle}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
        >
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          {translateWithFallback('sellerDashboard.inventory.addVehicle', 'Add Vehicle')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
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
              onClick={loadVehicles}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] disabled:opacity-50"
            >
              <FiRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]">
              <FiFilter className="mr-1 h-4 w-4" />
              {translateWithFallback('filters', 'Filters')}
            </button>
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
                  onClick={loadVehicles}
                  className="font-medium text-red-800 hover:text-red-900"
                >
                  {translateWithFallback('retry', 'Retry')}
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translateWithFallback('sellerDashboard.inventory.vehicle', 'Vehicle')}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translateWithFallback('sellerDashboard.inventory.details', 'Details')}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translateWithFallback('sellerDashboard.inventory.status', 'Status')}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translateWithFallback('sellerDashboard.inventory.price', 'Price')}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{translateWithFallback('sellerDashboard.inventory.actions', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentVehicles.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {filters.search || filters.status !== 'all' 
                          ? translateWithFallback('sellerDashboard.inventory.noResults', 'No vehicles found matching your criteria') 
                          : translateWithFallback('sellerDashboard.inventory.noVehicles', 'No vehicles in inventory')}
                      </td>
                    </tr>
                  ) : (
                    currentVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-16">
                              <img 
                                className="h-12 w-16 object-cover rounded" 
                                src={vehicle.mainImage} 
                                alt={`${vehicle.make} ${vehicle.model}`}
                                onError={(e) => {
                                  e.target.src = '/placeholder-vehicle.jpg';
                                }}
                              />
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
                            <>€{vehicle.finalSalePrice?.toLocaleString()}</>
                          ) : vehicle.status === 'active' ? (
                            <>€{vehicle.currentBid?.toLocaleString()} <span className="text-gray-500 text-xs">(€{vehicle.reservePrice?.toLocaleString()} reserve)</span></>
                          ) : (
                            <>€{vehicle.askingPrice?.toLocaleString()}</>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewVehicle(vehicle)}
                              className="text-[#3b396d] hover:text-[#2a285a]"
                              title={translateWithFallback('view', 'View')}
                            >
                              <FiEye className="h-5 w-5" />
                            </button>
                            <button 
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => navigate(`/seller/edit-vehicle/${vehicle.id}`)}
                              title={translateWithFallback('edit', 'Edit')}
                            >
                              <FiEdit className="h-5 w-5" />
                            </button>
                            {vehicle.status !== 'sold' && (
                              <button
                                onClick={() => setShowDeleteConfirm(vehicle.id)}
                                className="text-red-500 hover:text-red-700"
                                title={translateWithFallback('delete', 'Delete')}
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
                  {translateWithFallback('previous', 'Previous')}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {translateWithFallback('next', 'Next')}
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {translateWithFallback('sellerDashboard.inventory.showing', 'Showing')} <span className="font-medium">{indexOfFirstItem + 1}</span> {translateWithFallback('to', 'to')} <span className="font-medium">{Math.min(indexOfLastItem, filteredVehicles.length)}</span> {translateWithFallback('of', 'of')} <span className="font-medium">{filteredVehicles.length}</span> {translateWithFallback('results', 'results')}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && showDeleteConfirm !== selectedVehicle?.id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {translateWithFallback('sellerDashboard.inventory.deleteConfirmTitle', 'Delete Vehicle')}
            </h3>
            <p className="text-gray-500 mb-6">
              {translateWithFallback('sellerDashboard.inventory.deleteConfirmText', 'Are you sure you want to delete this vehicle? This action cannot be undone.')}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
              >
                {translateWithFallback('cancel', 'Cancel')}
              </button>
              <button
                onClick={() => handleDeleteVehicle(showDeleteConfirm)}
                disabled={deletingId === showDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {deletingId === showDeleteConfirm ? (
                  <span className="flex items-center">
                    <FiRefreshCw className="animate-spin mr-2 h-4 w-4" />
                    {translateWithFallback('deleting', 'Deleting...')}
                  </span>
                ) : (
                  translateWithFallback('delete', 'Delete')
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTab;