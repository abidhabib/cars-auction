// src/components/seller/InventoryPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 NEW
import { useLanguage } from '../../context/LanguageContext';
import { 
  FiSearch, FiEdit, FiTrash2, 
  FiRefreshCw, FiStar, FiDollarSign, 
  FiChevronDown, FiChevronUp,
  FiEye,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';
import { demoVehicles } from './demoVehicles';

// Mock Vehicle Service (same as before)
const VehicleService = {
  async fetchVehicles(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 500));
    let results = [...demoVehicles];
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
    return { success: true };
  },
  async updateVehicleStatus(vehicleId, status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
  async toggleFeatured(vehicleId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

// Delete Confirmation Modal (kept for inline delete)
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
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {t('sellerDashboard.cancel') || 'Cancel'}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
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

// Main InventoryPage Component — NOW ROUTER-COMPATIBLE
const InventoryPage = () => { // 👈 Removed all props
  const { t } = useLanguage();
  const navigate = useNavigate(); // 👈 For navigation

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
        setVehicles(prev => prev.filter(v => v.id !== vehicleId));
        setShowDeleteConfirm(null);
        alert(t('sellerDashboard.inventory.deleteSuccess') || 'Vehicle deleted successfully');
      }
    } catch (err) {
      alert(t('sellerDashboard.inventory.deleteError') || 'Failed to delete vehicle');
      console.error('Error deleting vehicle:', err);
    } finally {
      setDeletingId(null);
    }
  };


  const handleToggleFeatured = async (vehicleId, featured) => {
    try {
      const result = await VehicleService.toggleFeatured(vehicleId);
      if (result.success) {
        setVehicles(prev => 
          prev.map(v => v.id === vehicleId ? { ...v, featured } : v)
        );
        alert(featured ? 'Featured!' : 'Unfeatured!');
      }
    } catch (err) {
      alert('Failed to update featured status');
      console.error('Error:', err);
    }
  };

  // ✅ NAVIGATION HANDLERS (NO MORE DRAWERS)
  const handleViewVehicle = (vehicle) => {
    navigate(`/Dashboard/inventory/${vehicle.id}`); // 👈 Go to detail page
  };
const handleEditVehicle = (vehicleId) => {
  navigate(`/Dashboard/inventory/${vehicleId}/edit`);
};

  // Filtering & Sorting (unchanged)
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesStatus = filters.status === 'all' || vehicle.status === filters.status;
      const matchesSearch = !filters.search ||
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

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
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

  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Render UI (same as before, but without expandedRow logic)
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {translateWithFallback('sellerDashboard.sidebar.inventory', 'My Inventory')}
          </h2>
          <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters */}
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
            
            <div className={`${showMobileFilters || 'lg:block'} ${!showMobileFilters && 'lg:block hidden'} md:block`}>
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <FiSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search vehicles..."
                    className="block w-full pl-8 pr-2.5 py-2 border border-gray-300 rounded text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Status, Sort, etc. — same as original */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="block w-full pl-2.5 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  {getStatusOptions().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="block w-full pl-2.5 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  {getSortOptions().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                  className="block w-full pl-2.5 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Only</span>
                  <FiStar className="ml-1 h-4 w-4 text-yellow-500" />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="block w-full pl-2.5 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] rounded"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <button 
                  onClick={() => loadVehicles(false)}
                  disabled={refreshing}
                  className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  {refreshing ? (
                    <FiRefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <FiRefreshCw className="h-4 w-4" />
                  )}
                  <span className="ml-1">Refresh</span>
                </button>
              </div>
            </div>
            
          </div>
          
        </div>


        {/* Table */}
        <div className="flex-1 lg:order-2 order-1">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3b396d]"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <div className="flex">
                <svg className="h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="ml-2">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  <button onClick={() => loadVehicles()} className="mt-1 text-sm text-red-700 font-medium">
                    {translateWithFallback('sellerDashboard.retry', 'Retry')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        <button onClick={() => handleSort('year')} className="flex items-center hover:text-gray-700">
                          Vehicle
                          {filters.sortBy === 'year' && (
                            <FiChevronUp className={`ml-1 h-4 w-4 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Stock #</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Mileage</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Price/Bid</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentVehicles.length === 0 ? (
                      <tr><td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                        {filters.search || filters.status !== 'all' || filters.featured
                          ? 'No vehicles found'
                          : 'No vehicles in inventory'}
                      </td></tr>
                    ) : (
                      currentVehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-16 relative">
                                <img 
                                  className="h-12 w-16 object-cover rounded" 
                                  src={vehicle.mainImage} 
                                  alt={`${vehicle.make} ${vehicle.model}`}
                                  onError={(e) => e.target.src = '/car2.jpg'}
                                />
                                {vehicle.featured && (
                                  <div className="absolute top-0 right-0 bg-yellow-500 text-white rounded-bl text-xs px-1 py-0.5">
                                    <FiStar className="h-3 w-3 inline" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{vehicle.year} {vehicle.make}</div>
                                <div className="text-sm text-gray-500">{vehicle.model}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{vehicle.stockNumber}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{vehicle.mileage?.toLocaleString()} km</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {vehicle.status === 'sold' ? (
                              <div className="flex items-center text-green-600 font-medium">
                                <FiDollarSign className="h-4 w-4 mr-0.5" /> €{vehicle.finalSalePrice?.toLocaleString()}
                              </div>
                            ) : vehicle.status === 'active' ? (
                              <div>
                                <div className="flex items-center text-[#3b396d] font-medium">
                                  <FiDollarSign className="h-4 w-4 mr-0.5" /> €{vehicle.currentBid?.toLocaleString()}
                                </div>
                                {vehicle.reservePrice && (
                                  <div className="text-xs text-gray-500">Res: €{vehicle.reservePrice?.toLocaleString()}</div>
                                )}
                              </div>
                            ) : vehicle.askingPrice ? (
                              <div className="flex items-center text-gray-600 font-medium">
                                <FiDollarSign className="h-4 w-4 mr-0.5" /> €{vehicle.askingPrice?.toLocaleString()}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs">No price</span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                              vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {vehicle.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewVehicle(vehicle)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
                                title="View"
                              >
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditVehicle(vehicle.id)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
                                title="Edit"
                              >
                                <FiEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleToggleFeatured(vehicle.id, !vehicle.featured)}
                                className={`${vehicle.featured ? 'text-yellow-500' : 'text-gray-400'} p-1 rounded hover:bg-gray-100`}
                                title={vehicle.featured ? 'Unfeature' : 'Feature'}
                              >
                                <FiStar className="h-4 w-4" />
                              </button>
                              {vehicle.status !== 'sold' && (
                                <button
                                  onClick={() => setShowDeleteConfirm(vehicle.id)}
                                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-gray-100"
                                  disabled={deletingId === vehicle.id}
                                >
                                  {deletingId === vehicle.id ? (
                                    <FiRefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <FiTrash2 className="h-4 w-4" />
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
          )}

          {/* Pagination — same as original */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200 rounded-lg text-sm mt-4">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <p className="text-gray-700">
                  <span className="font-medium">{indexOfFirstItem + 1}</span>-<span className="font-medium">{Math.min(indexOfLastItem, filteredVehicles.length)}</span> of <span className="font-medium">{filteredVehicles.length}</span>
                </p>
                <nav className="isolate inline-flex -space-x-px rounded shadow-sm">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FiChevronLeft className="h-4 w-4" />
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                    <button
                      key={i+1}
                      onClick={() => handlePageChange(i+1)}
                      className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
                        currentPage === i+1
                          ? 'z-10 bg-[#3b396d] text-white'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i+1}
                    </button>
                  ))}
                  {totalPages > 5 && <span className="px-3 py-2 text-sm text-gray-700">...</span>}
                  {totalPages > 5 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
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
                    className="relative inline-flex items-center rounded-r px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
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

export default InventoryPage;