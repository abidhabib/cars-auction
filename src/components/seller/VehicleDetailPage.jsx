// src/components/seller/VehicleDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { demoVehicles } from './demoVehicles';
import { FiChevronLeft, FiEdit, FiTrash2, FiStar, FiDollarSign } from 'react-icons/fi';
import EditCarListing from './EditCarListing';

// Mock service (same as in InventoryTab)
const VehicleService = {
  async fetchVehicle(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return demoVehicles.find(v => v.id === parseInt(id));
  },
  async deleteVehicle(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
  async updateVehicleStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
  async toggleFeatured(id, featured) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

const VehicleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      setLoading(true);
      const data = await VehicleService.fetchVehicle(id);
      if (!data) {
        navigate('/Dashboard/inventory', { replace: true });
        return;
      }
      setVehicle(data);
    } catch (err) {
      console.error('Failed to load vehicle:', err);
      navigate('/Dashboard/inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      setDeleting(true);
      await VehicleService.deleteVehicle(id);
      navigate('/Dashboard/inventory');
    } catch (err) {
      alert('Failed to delete vehicle');
      setDeleting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await VehicleService.updateVehicleStatus(id, newStatus);
      setVehicle(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleToggleFeatured = async () => {
    try {
      await VehicleService.toggleFeatured(id, !vehicle.featured);
      setVehicle(prev => ({ ...prev, featured: !prev.featured }));
    } catch (err) {
      alert('Failed to update featured status');
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3b396d]"></div>
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/Dashboard/inventory')}
        className="mb-4 flex items-center text-[#3b396d] hover:text-[#2a285a]"
      >
        <FiChevronLeft className="h-4 w-4 mr-1" />
        {t('sellerDashboard.inventory.backToList') || 'Back to Inventory'}
      </button>

      {/* Vehicle Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Images */}
            <div className="lg:col-span-1">
              <img
                src={vehicle.mainImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => e.target.src = '/car1.jpg'}
              />
              {vehicle.featured && (
                <div className="mt-2 inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  <FiStar className="h-3 w-3 mr-1" />
                  Featured
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-gray-600">Stock #{vehicle.stockNumber}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                  vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </span>
              </div>

              {vehicle.description && (
                <p className="mt-3 text-gray-700">{vehicle.description}</p>
              )}

              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <Spec label="Mileage" value={`${vehicle.mileage?.toLocaleString()} km`} />
                <Spec label="Fuel Type" value={vehicle.fuelType} />
                <Spec label="Transmission" value={vehicle.transmission} />
                <Spec label="Color" value={vehicle.color} />
                <Spec label="Condition" value={vehicle.condition} />
                <Spec label="Location" value={vehicle.location} />
                
                {vehicle.status === 'active' && (
                  <>
                    <Spec label="Current Bid" value={`€${vehicle.currentBid?.toLocaleString()}`} />
                    <Spec label="Bids" value={vehicle.bids?.length || 0} />
                  </>
                )}
                {vehicle.status === 'sold' && (
                  <Spec label="Final Price" value={`€${vehicle.finalSalePrice?.toLocaleString()}`} />
                )}
                {vehicle.status === 'draft' && vehicle.askingPrice && (
                  <Spec label="Asking Price" value={`€${vehicle.askingPrice?.toLocaleString()}`} />
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-2">
<button
  onClick={() => navigate(`/Dashboard/inventory/${id}/edit`)}
  className="px-4 py-2 bg-[#3b396d] text-white rounded hover:bg-[#2a285a] flex items-center"
>
  <FiEdit className="h-4 w-4 mr-1" />
  Edit
</button>
                <button
                  onClick={handleToggleFeatured}
                  className={`px-4 py-2 rounded flex items-center ${
                    vehicle.featured 
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiStar className="h-4 w-4 mr-1" />
                  {vehicle.featured ? 'Unfeature' : 'Feature'}
                </button>
                {vehicle.status !== 'sold' && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center disabled:opacity-50"
                  >
                    <FiTrash2 className="h-4 w-4 mr-1" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                )}
                {vehicle.status === 'draft' && (
                  <button
                    onClick={() => handleStatusChange('active')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Publish
                  </button>
                )}
                {vehicle.status === 'active' && (
                  <button
                    onClick={() => handleStatusChange('draft')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
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
  );
};

const Spec = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900">{value}</p>
  </div>
);

export default VehicleDetailPage;