// src/components/seller/InventoryTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
   FiSearch,  FiEdit, FiTrash2, 
  FiRefreshCw, FiStar, FiDollarSign, FiChevronLeft, 
  FiChevronRight, FiExternalLink, FiChevronDown, FiChevronUp,
  FiEye
} from 'react-icons/fi';
import { demoVehicles } from './demoVehicles';
import EditCarListing from './EditCarListing';

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

// Compact Vehicle Detail Drawer
const VehicleDetailDrawer = ({ 
  vehicle, 
  onClose, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onToggleFeatured,
  t 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <FiChevronRight className="h-5 w-5 rotate-180" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Image Gallery - Compact */}
            <div className="lg:col-span-1">
              <div className="relative mb-3">
                <img 
                  src={vehicle.images?.[currentImageIndex] || vehicle.mainImage} 
                  alt={`${vehicle.make} ${vehicle.model}`} 
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = '/car1.jpg';
                  }}
                />
                {vehicle.images?.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                {vehicle.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-1.5 py-0.5 rounded text-xs">
                    <FiStar className="inline h-3 w-3 mr-0.5" /> Featured
                  </div>
                )}
              </div>
              
              {vehicle.images?.length > 1 && (
                <div className="grid grid-cols-3 gap-1">
                  {vehicle.images.slice(0, 3).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-12 w-full ${currentImageIndex === index ? 'ring-1 ring-[#3b396d]' : ''}`}
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
              )}
            </div>
            
            {/* Vehicle Details - Compact */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                    <p className="text-gray-600 text-sm">{vehicle.stockNumber}</p>
                    {vehicle.vim && <p className="text-xs text-gray-500">VIN: {vehicle.vim}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {vehicle.status === 'active' ? 'Active' :
                       vehicle.status === 'sold' ? 'Sold' :
                       'Draft'}
                    </span>
                  </div>
                </div>
                
                {vehicle.description && (
                  <div className="mb-3 p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-700 line-clamp-2">{vehicle.description}</p>
                  </div>
                )}
                
                {/* Key Specs in Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Mileage</p>
                    <p className="text-sm font-medium">{vehicle.mileage?.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="text-sm font-medium">{vehicle.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transmission</p>
                    <p className="text-sm font-medium">{vehicle.transmission}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Color</p>
                    <p className="text-sm font-medium">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Condition</p>
                    <p className="text-sm font-medium">{vehicle.condition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{vehicle.location}</p>
                  </div>
                  
                  {/* Price and Auction Info */}
                  {vehicle.status === 'active' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Current Bid</p>
                        <p className="text-sm font-bold text-[#3b396d]">€{vehicle.currentBid?.toLocaleString()}</p>
                        {vehicle.reservePrice && (
                          <p className="text-xs text-gray-500">Res: €{vehicle.reservePrice?.toLocaleString()}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Auction Ends</p>
                        <p className="text-sm font-medium">
                          {vehicle.auctionEnds?.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bids</p>
                        <p className="text-sm font-medium">{vehicle.bids?.length || 0}</p>
                      </div>
                      {vehicle.buyItNowPrice && (
                        <div>
                          <p className="text-xs text-gray-500">Buy It Now</p>
                          <p className="text-sm font-bold text-green-600">€{vehicle.buyItNowPrice?.toLocaleString()}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {vehicle.status === 'sold' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Final Price</p>
                        <p className="text-sm font-bold text-[#3b396d]">€{vehicle.finalSalePrice?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sold To</p>
                        <p className="text-sm font-medium">{vehicle.buyer?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sold Date</p>
                        <p className="text-sm font-medium">{vehicle.soldDate?.toLocaleDateString()}</p>
                      </div>
                    </>
                  )}
                  
                  {vehicle.status === 'draft' && vehicle.askingPrice && (
                    <div>
                      <p className="text-xs text-gray-500">Asking Price</p>
                      <p className="text-sm font-bold text-[#3b396d]">€{vehicle.askingPrice?.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                
                {vehicle.auctionType === 'private' && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded mb-3">
                    <div className="flex items-start">
                      <FiExternalLink className="h-4 w-4 text-yellow-600 mt-0.5 mr-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-yellow-800">Private Auction Link</p>
                        <p className="text-xs text-yellow-700 break-all">{vehicle.auctionLink}</p>
                        <button
                          onClick={() => copyToClipboard(vehicle.auctionLink)}
                          className="mt-1 inline-flex items-center px-2 py-0.5 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                        >
                          <FiCopy className="mr-1 h-3 w-3" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Compact Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => onEdit(vehicle.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FiEdit className="mr-1 h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => onToggleFeatured(vehicle.id, !vehicle.featured)}
                    className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded ${
                      vehicle.featured 
                        ? 'border-yellow-400 text-yellow-700 bg-yellow-100 hover:bg-yellow-200' 
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <FiStar className="mr-1 h-3 w-3" />
                    {vehicle.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  {vehicle.status !== 'sold' && (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                    >
                      <FiTrash2 className="mr-1 h-3 w-3" />
                      Delete
                    </button>
                  )}
                  {vehicle.status === 'draft' && (
                    <button
                      onClick={() => onStatusChange(vehicle.id, 'active')}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                    >
                      Publish
                    </button>
                  )}
                  {vehicle.status === 'active' && (
                    <button
                      onClick={() => onStatusChange(vehicle.id, 'draft')}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Unpublish
                    </button>
                  )}
                </div>
              </div>
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
  
  const handleBackFromEdit = () => {
    setEditingVehicleId(null);
    loadVehicles(false);
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
    setEditingVehicleId(vehicleId);
  };
  
  const handleViewDetails = (vehicle) => {
    setExpandedRow(expandedRow === vehicle.id ? null : vehicle.id);
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
  
  // Handle sorting
  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };
  
  if (editingVehicleId) {
    return (
      <div className="p-4">
        <EditCarListing 
          id={editingVehicleId} 
          onBack={handleBackFromEdit} 
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Header with Add Vehicle Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {translateWithFallback('sellerDashboard.sidebar.inventory', 'My Inventory')}
          </h2>
          <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'item' : 'items'}
          </span>
        </div>
       
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters Sidebar (Left Side) */}
        <div className="lg:w-64 w-full lg:order-1 order-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FiChevronDown className={`h-4 w-4 ${showMobileFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className={`${showMobileFilters || 'lg:block'} ${!showMobileFilters && 'lg:block hidden'}`}>
              {/* Search */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <FiSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search vehicles..."
                    className="block w-full pl-8 pr-2.5 py-1.5 border border-gray-300 rounded text-xs bg-white placeholder-gray-500 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="block w-full pl-2.5 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  {getStatusOptions().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="block w-full pl-2.5 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  {getSortOptions().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Order */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">Order</label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                  className="block w-full pl-2.5 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
              
              {/* Featured Filter */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    className="h-3 w-3 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-xs text-gray-700">Featured Only</span>
                  <FiStar className="ml-1 h-3 w-3 text-yellow-500" />
                </label>
              </div>
              
              {/* Items Per Page */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">Items per page</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="block w-full pl-2.5 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
              
              {/* Refresh Button */}
              <div className="pt-2 border-t border-gray-200">
                <button 
                  onClick={() => loadVehicles(false)}
                  disabled={refreshing}
                  className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-xs rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  {refreshing ? (
                    <FiRefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <FiRefreshCw className="h-3 w-3" />
                  )}
                  <span className="ml-1">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 lg:order-2 order-1">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3b396d]"></div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2">
                  <h3 className="text-xs font-medium text-red-800">{error}</h3>
                  <div className="mt-1 text-xs text-red-700">
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
          
          {/* Vehicle Table - Matches Buy Car layout */}
          {!loading && !error && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('year')}
                          className="flex items-center hover:text-gray-700"
                        >
                          Vehicle
                          {filters.sortBy === 'year' && (
                            <FiChevronUp className={`ml-1 h-3 w-3 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('stockNumber')}
                          className="flex items-center hover:text-gray-700"
                        >
                          Stock #
                          {filters.sortBy === 'stockNumber' && (
                            <FiChevronUp className={`ml-1 h-3 w-3 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('mileage')}
                          className="flex items-center hover:text-gray-700"
                        >
                          Mileage
                          {filters.sortBy === 'mileage' && (
                            <FiChevronUp className={`ml-1 h-3 w-3 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price/Bid
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentVehicles.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-3 py-4 text-center text-xs text-gray-500">
                          {filters.search || filters.status !== 'all' || filters.featured
                            ? translateWithFallback('sellerDashboard.inventory.noResults', 'No vehicles found') 
                            : translateWithFallback('sellerDashboard.inventory.noVehicles', 'No vehicles in inventory')}
                        </td>
                      </tr>
                    ) : (
                      currentVehicles.map((vehicle) => (
                        <React.Fragment key={vehicle.id}>
                          <tr className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-12 relative">
                                  <img 
                                    className="h-10 w-12 object-cover rounded" 
                                    src={vehicle.mainImage} 
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    onError={(e) => {
                                      e.target.src = '/car2.jpg';
                                    }}
                                  />
                                  {vehicle.featured && (
                                    <div className="absolute top-0 right-0 bg-yellow-500 text-white rounded-bl text-[10px] px-0.5 py-0.5">
                                      <FiStar className="h-2 w-2 inline" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-2">
                                  <div className="text-xs font-medium text-gray-900">{vehicle.year} {vehicle.make}</div>
                                  <div className="text-xs text-gray-500">{vehicle.model}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                              {vehicle.stockNumber}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                              {vehicle.mileage?.toLocaleString()} km
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="text-xs text-gray-900">
                                {vehicle.status === 'sold' ? (
                                  <div className="flex items-center text-green-600 font-medium">
                                    <FiDollarSign className="h-3 w-3 mr-0.5" />
                                    €{vehicle.finalSalePrice?.toLocaleString()}
                                  </div>
                                ) : vehicle.status === 'active' ? (
                                  <div>
                                    <div className="flex items-center text-[#3b396d] font-medium">
                                      <FiDollarSign className="h-3 w-3 mr-0.5" />
                                      €{vehicle.currentBid?.toLocaleString()}
                                    </div>
                                    {vehicle.reservePrice && (
                                      <div className="text-[10px] text-gray-500">Res: €{vehicle.reservePrice?.toLocaleString()}</div>
                                    )}
                                  </div>
                                ) : vehicle.askingPrice ? (
                                  <div className="flex items-center text-gray-600 font-medium">
                                    <FiDollarSign className="h-3 w-3 mr-0.5" />
                                    €{vehicle.askingPrice?.toLocaleString()}
                                  </div>
                                ) : (
                                  <span className="text-gray-500 text-[10px]">No price</span>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                  vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                                  vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {vehicle.status === 'active' ? 'Active' :
                                   vehicle.status === 'sold' ? 'Sold' :
                                   'Draft'}
                                </span>
                                {vehicle.auctionType === 'private' && (
                                  <div className="mt-0.5">
                                    <span className="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800">
                                      <FiExternalLink className="h-2 w-2 mr-0.5" />
                                      Private
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewVehicle(vehicle);
                                  }}
                                  className="text-gray-500 hover:text-gray-700 p-0.5 rounded hover:bg-gray-100"
                                  title="View"
                                >
                                  <FiEye className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditVehicle(vehicle.id);
                                  }}
                                  className="text-gray-500 hover:text-gray-700 p-0.5 rounded hover:bg-gray-100"
                                  title="Edit"
                                >
                                  <FiEdit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleFeatured(vehicle.id, !vehicle.featured);
                                  }}
                                  className={`${vehicle.featured ? 'text-yellow-500 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'} p-0.5 rounded hover:bg-gray-100`}
                                  title={vehicle.featured ? 'Unfeature' : 'Feature'}
                                >
                                  <FiStar className="h-3.5 w-3.5" />
                                </button>
                                {vehicle.status !== 'sold' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowDeleteConfirm(vehicle.id);
                                    }}
                                    className="text-red-500 hover:text-red-700 p-0.5 rounded hover:bg-gray-100"
                                    title="Delete"
                                    disabled={deletingId === vehicle.id}
                                  >
                                    {deletingId === vehicle.id ? (
                                      <FiRefreshCw className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                      <FiTrash2 className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                          
                          {/* Expanded Row for Details - Compact */}
                          {expandedRow === vehicle.id && (
                            <tr>
                              <td colSpan="6" className="px-3 py-2 bg-gray-50 border-t">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[10px]">
                                  <div>
                                    <p className="text-gray-500 font-medium">Fuel</p>
                                    <p className="font-medium text-gray-900">{vehicle.fuelType}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">Trans</p>
                                    <p className="font-medium text-gray-900">{vehicle.transmission}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">Color</p>
                                    <p className="font-medium text-gray-900">{vehicle.color}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">Cond</p>
                                    <p className="font-medium text-gray-900">{vehicle.condition}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">Loc</p>
                                    <p className="font-medium text-gray-900">{vehicle.location}</p>
                                  </div>
                                  {vehicle.status === 'active' && (
                                    <>
                                      <div>
                                        <p className="text-gray-500 font-medium">Ends</p>
                                        <p className="font-medium text-gray-900">
                                          {vehicle.auctionEnds?.toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500 font-medium">Bids</p>
                                        <p className="font-medium text-gray-900">{vehicle.bids?.length || 0}</p>
                                      </div>
                                    </>
                                  )}
                                  {vehicle.status === 'sold' && (
                                    <div>
                                      <p className="text-gray-500 font-medium">Sold</p>
                                      <p className="font-medium text-gray-900">{vehicle.soldDate?.toLocaleDateString()}</p>
                                    </div>
                                  )}
                                  {vehicle.auctionType === 'private' && (
                                    <div className="md:col-span-2">
                                      <p className="text-gray-500 font-medium">Private</p>
                                      <p className="font-medium text-gray-900 break-all text-[10px]">{vehicle.auctionLink}</p>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-2 flex justify-end">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewDetails(vehicle);
                                    }}
                                    className="inline-flex items-center text-[#3b396d] hover:text-[#2a285a] text-[10px] font-medium"
                                  >
                                    View Details
                                    <FiChevronRight className="ml-0.5 h-3 w-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-3 py-2 border-t border-gray-200 rounded-lg text-xs mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-2 inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">{indexOfFirstItem + 1}</span>-<span className="font-medium">{Math.min(indexOfLastItem, filteredVehicles.length)}</span> of <span className="font-medium">{filteredVehicles.length}</span>
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l px-1.5 py-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FiChevronLeft className="h-3 w-3" />
                    </button>
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`relative inline-flex items-center px-2 py-1.5 text-xs font-medium ${
                            currentPage === pageNumber
                              ? 'z-10 bg-[#3b396d] text-white'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="relative inline-flex items-center px-2 py-1.5 text-xs text-gray-700">
                        ...
                      </span>
                    )}
                    {totalPages > 5 && (
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`relative inline-flex items-center px-2 py-1.5 text-xs font-medium ${
                          currentPage === totalPages
                            ? 'z-10 bg-[#3b396d] text-white'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {totalPages}
                      </button>
                    )}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r px-1.5 py-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FiChevronRight className="h-3 w-3" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDeleteVehicle(showDeleteConfirm)}
        isDeleting={deletingId === showDeleteConfirm}
        t={t}
      />
      
      {/* Full Detail Drawer */}
      {expandedRow && (
        <VehicleDetailDrawer
          vehicle={vehicles.find(v => v.id === expandedRow)}
          onClose={() => setExpandedRow(null)}
          onEdit={handleEditVehicle}
          onDelete={handleDeleteVehicle}
          onStatusChange={handleStatusChange}
          onToggleFeatured={handleToggleFeatured}
          t={t}
        />
      )}
    </div>
  );
};

export default InventoryTab;