// src/components/seller/EditCarListing.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
// Removed useNavigate and useParams as they are not needed for tab-based navigation
import { FiArrowLeft, FiSave, FiPlus, FiX, FiRefreshCw, FiInfo } from 'react-icons/fi';
import { demoVehicles } from './demoVehicles';

// Mock API service (remains the same)
const VehicleService = {
  async getVehicleById(vehicleId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return demoVehicles.find(vehicle => vehicle.id === vehicleId) || null;
  },

  async updateVehicle(vehicleId, vehicleData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Updating vehicle:', vehicleId, vehicleData);
    return { success: true, message: 'Vehicle updated successfully' };
  },

  async createVehicle(vehicleData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Creating vehicle:', vehicleData);
    return { 
      success: true, 
      message: 'Vehicle created successfully',
      vehicle: { ...vehicleData, id: 'veh_' + Math.random().toString(36).substr(2, 9) }
    };
  }
};

const EditCarListing = ({ id, onBack }) => {
  const { t } = useLanguage();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    color: '',
    condition: 'Good',
    vim: '',
    description: '',
    status: 'draft',
    reservePrice: '',
    buyItNowPrice: '',
    auctionType: 'public',
    auctionEnds: '',
    location: '',
    images: [],
    features: []
  });

  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadVehicle();
    }
  }, [id]);

  const loadVehicle = async () => {
    try {
      setLoading(true);
      const vehicle = await VehicleService.getVehicleById(id);
      if (vehicle) {
        setFormData({
          make: vehicle.make || '',
          model: vehicle.model || '',
          year: vehicle.year || new Date().getFullYear(),
          mileage: vehicle.mileage || '',
          fuelType: vehicle.fuelType || 'Petrol',
          transmission: vehicle.transmission || 'Automatic',
          color: vehicle.color || '',
          condition: vehicle.condition || 'Good',
          vim: vehicle.vim || '',
          description: vehicle.description || '',
          status: vehicle.status || 'draft',
          reservePrice: vehicle.reservePrice || '',
          buyItNowPrice: vehicle.buyItNowPrice || '',
          auctionType: vehicle.auctionType || 'public',
          auctionEnds: vehicle.auctionEnds ? new Date(vehicle.auctionEnds).toISOString().split('T')[0] : '',
          location: vehicle.location || '',
          images: vehicle.images || [],
          features: vehicle.features || []
        });
      } else {
        setError('Vehicle not found');
      }
    } catch (err) {
      setError('Failed to load vehicle data');
      console.error('Error loading vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert files to data URLs for demo purposes
      const uploadedImages = await Promise.all(
        files.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        })
      );

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    } catch (err) {
      setError('Failed to upload images');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      let result;
      if (isEditing) {
        result = await VehicleService.updateVehicle(id, formData);
      } else {
        result = await VehicleService.createVehicle(formData);
      }
      
      if (result.success) {
        setSuccess(result.message);
        // Instead of navigating, call the onBack callback after a delay
        setTimeout(() => {
          if (onBack) onBack();
        }, 1500);
      } else {
        setError(result.message || 'Failed to save vehicle');
      }
    } catch (err) {
      setError('Failed to save vehicle data');
      console.error('Error saving vehicle:', err);
    } finally {
      setSaving(false);
    }
  };

  const translateWithFallback = (key, fallback) => {
    const translation = t(key);
    return translation && !translation.includes('missing') ? translation : fallback;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b396d]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header with Back Button and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-[#3b396d] hover:text-[#2a285a] self-start"
        >
          <FiArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">{translateWithFallback('sellerDashboard.back', 'Back to Inventory')}</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left flex-1 px-4">
          {isEditing 
            ? translateWithFallback('sellerDashboard.inventory.editVehicle', 'Edit Vehicle Listing')
            : translateWithFallback('sellerDashboard.inventory.addVehicle', 'Add New Vehicle')
          }
        </h1>
        <div className="w-24"></div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiInfo className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Basic Information Section */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {translateWithFallback('sellerDashboard.inventory.basicInfo', 'Basic Information')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.make', 'Make')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="make"
                name="make"
                required
                value={formData.make}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., BMW"
              />
            </div>
            
            <div className="md:col-span-1">
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.model', 'Model')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                value={formData.model}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., X5"
              />
            </div>
            
            <div className="md:col-span-1">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.year', 'Year')} <span className="text-red-500">*</span>
              </label>
              <select
                id="year"
                name="year"
                required
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.mileage', 'Mileage')} (km) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                required
                min="0"
                value={formData.mileage}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., 25000"
              />
            </div>
            
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.fuelType', 'Fuel Type')} <span className="text-red-500">*</span>
              </label>
              <select
                id="fuelType"
                name="fuelType"
                required
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="LPG">LPG</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.transmission', 'Transmission')} <span className="text-red-500">*</span>
              </label>
              <select
                id="transmission"
                name="transmission"
                required
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.color', 'Color')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="color"
                name="color"
                required
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., Black"
              />
            </div>
            
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.condition', 'Condition')} <span className="text-red-500">*</span>
              </label>
              <select
                id="condition"
                name="condition"
                required
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label htmlFor="vim" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.vim', 'VIN')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vim"
                name="vim"
                required
                value={formData.vim}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., 1HGBH41JXMN109186"
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.description', 'Description')} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="Provide a detailed description of the vehicle..."
              />
            </div>
          </div>
        </div>

        {/* Pricing & Auction Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {translateWithFallback('sellerDashboard.inventory.pricingAuction', 'Pricing & Auction Details')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.status', 'Status')} <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="auctionType" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.auctionType', 'Auction Type')} <span className="text-red-500">*</span>
              </label>
              <select
                id="auctionType"
                name="auctionType"
                required
                value={formData.auctionType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="public">Public Auction</option>
                <option value="private">Private Auction</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="reservePrice" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.reservePrice', 'Reserve Price')} (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="reservePrice"
                name="reservePrice"
                required
                min="0"
                step="100"
                value={formData.reservePrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., 40000"
              />
            </div>
            
            <div>
              <label htmlFor="buyItNowPrice" className="block text-sm font-medium text-gray-700 mb-2">
                {translateWithFallback('sellerDashboard.inventory.buyItNowPrice', 'Buy It Now Price')} (€)
              </label>
              <input
                type="number"
                id="buyItNowPrice"
                name="buyItNowPrice"
                min="0"
                step="100"
                value={formData.buyItNowPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                placeholder="e.g., 52000"
              />
            </div>
            
            {formData.status === 'active' && (
              <div className="md:col-span-2">
                <label htmlFor="auctionEnds" className="block text-sm font-medium text-gray-700 mb-2">
                  {translateWithFallback('sellerDashboard.inventory.auctionEnds', 'Auction End Date')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="auctionEnds"
                  name="auctionEnds"
                  required={formData.status === 'active'}
                  value={formData.auctionEnds}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
                />
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {translateWithFallback('sellerDashboard.inventory.location', 'Location')}
          </h2>
          <div className="max-w-md">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              {translateWithFallback('sellerDashboard.inventory.location', 'Location')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {translateWithFallback('sellerDashboard.inventory.images', 'Vehicle Images')}
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translateWithFallback('sellerDashboard.inventory.addImages', 'Add Images')}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                disabled={uploading}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition min-w-0"
              />
              {uploading && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiRefreshCw className="animate-spin mr-2" />
                  Uploading...
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {translateWithFallback('sellerDashboard.inventory.imageHelp', 'Select one or more images to upload')}
            </p>
          </div>
          
          {formData.images.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={image}
                      alt={`Vehicle ${index + 1}`}
                      className="h-full w-full object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300?text=Image+Not+Found';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <FiX className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {translateWithFallback('sellerDashboard.inventory.features', 'Features & Options')}
          </h2>
          
          <div className="mb-6">
            <label htmlFor="newFeature" className="block text-sm font-medium text-gray-700 mb-2">
              {translateWithFallback('sellerDashboard.inventory.addFeature', 'Add Feature')}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                id="newFeature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition min-w-0"
                placeholder="e.g., Leather Seats, Sunroof"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] transition whitespace-nowrap"
              >
                <FiPlus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>
          </div>
          
          {formData.features.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current Features</h3>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                      aria-label={`Remove feature ${feature}`}
                    >
                      <FiX className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-5 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] transition"
          >
            {translateWithFallback('sellerDashboard.cancel', 'Cancel')}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-[#3b396d] border border-transparent rounded-lg shadow-sm hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] disabled:opacity-70 transition flex items-center justify-center"
          >
            {saving ? (
              <>
                <FiRefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                {translateWithFallback('sellerDashboard.saving', 'Saving...')}
              </>
            ) : (
              <>
                <FiSave className="-ml-1 mr-2 h-4 w-4" />
                {isEditing 
                  ? translateWithFallback('sellerDashboard.update', 'Update Vehicle')
                  : translateWithFallback('sellerDashboard.create', 'Create Vehicle')
                }
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarListing;