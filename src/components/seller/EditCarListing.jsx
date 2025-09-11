// src/components/seller/EditCarListing.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiUpload, FiTrash2, FiPlus, FiX, FiRefreshCw } from 'react-icons/fi';

// Mock API service
const VehicleService = {
  async getVehicleById(vehicleId) {
    await new Promise(resolve => setTimeout(resolve, 500));
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
        images: [
          'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80'
        ],
        status: 'active',
        currentBid: 45000,
        reservePrice: 40000,
        buyItNowPrice: 52000,
        auctionEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        location: 'Berlin, DE',
        auctionType: 'public',
        vim: 'WBA12345678901234',
        description: 'Premium SUV with all options. One owner, no accidents.',
        features: ['Leather Seats', 'Sunroof', 'Navigation System', 'Backup Camera']
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
        images: [
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80'
        ],
        status: 'draft',
        askingPrice: 38500,
        location: 'Hamburg, DE',
        auctionType: 'private',
        vim: 'WAU12345678901234',
        description: 'Well-maintained executive sedan with full service history.',
        features: ['Heated Seats', 'Apple CarPlay', 'LED Headlights']
      }
    ];
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

const EditCarListing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    // Basic Information
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
    
    // Pricing & Auction
    status: 'draft',
    reservePrice: '',
    buyItNowPrice: '',
    auctionType: 'public',
    auctionEnds: '',
    
    // Location
    location: '',
    
    // Media
    images: [],
    
    // Features
    features: []
  });

  const [newImageUrl, setNewImageUrl] = useState('');
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

  const handleAddImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
        setTimeout(() => {
          navigate('/seller/inventory');
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b396d]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/sellerDashboard')}
          className="flex items-center text-[#3b396d] hover:text-[#2a285a] mr-4"
        >
          <FiArrowLeft className="h-5 w-5 mr-1" />
          {translateWithFallback('sellerDashboard.back', 'Back to Inventory')}
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing 
            ? translateWithFallback('sellerDashboard.inventory.editVehicle', 'Edit Vehicle Listing')
            : translateWithFallback('sellerDashboard.inventory.addVehicle', 'Add New Vehicle')
          }
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {translateWithFallback('sellerDashboard.inventory.basicInfo', 'Basic Information')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.make', 'Make')} *
              </label>
              <input
                type="text"
                id="make"
                name="make"
                required
                value={formData.make}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.model', 'Model')} *
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                value={formData.model}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.year', 'Year')} *
              </label>
              <select
                id="year"
                name="year"
                required
                value={formData.year}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              >
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.mileage', 'Mileage')} (km) *
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                required
                min="0"
                value={formData.mileage}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.fuelType', 'Fuel Type')} *
              </label>
              <select
                id="fuelType"
                name="fuelType"
                required
                value={formData.fuelType}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="LPG">LPG</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.transmission', 'Transmission')} *
              </label>
              <select
                id="transmission"
                name="transmission"
                required
                value={formData.transmission}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.color', 'Color')} *
              </label>
              <input
                type="text"
                id="color"
                name="color"
                required
                value={formData.color}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.condition', 'Condition')} *
              </label>
              <select
                id="condition"
                name="condition"
                required
                value={formData.condition}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              >
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="vim" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.vim', 'VIN')} *
              </label>
              <input
                type="text"
                id="vim"
                name="vim"
                required
                value={formData.vim}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.description', 'Description')} *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {translateWithFallback('sellerDashboard.inventory.pricingAuction', 'Pricing & Auction Details')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.status', 'Status')} *
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="auctionType" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.auctionType', 'Auction Type')} *
              </label>
              <select
                id="auctionType"
                name="auctionType"
                required
                value={formData.auctionType}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              >
                <option value="public">Public Auction</option>
                <option value="private">Private Auction</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="reservePrice" className="block text-sm font-medium text-gray-700 mb-1">
                {translateWithFallback('sellerDashboard.inventory.reservePrice', 'Reserve Price')} (€) *
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label htmlFor="buyItNowPrice" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              />
            </div>
            
            {formData.status === 'active' && (
              <div>
                <label htmlFor="auctionEnds" className="block text-sm font-medium text-gray-700 mb-1">
                  {translateWithFallback('sellerDashboard.inventory.auctionEnds', 'Auction End Date')} *
                </label>
                <input
                  type="date"
                  id="auctionEnds"
                  name="auctionEnds"
                  required={formData.status === 'active'}
                  value={formData.auctionEnds}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {translateWithFallback('sellerDashboard.inventory.location', 'Location')}
          </h2>
          
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              {translateWithFallback('sellerDashboard.inventory.location', 'Location')} *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {translateWithFallback('sellerDashboard.inventory.images', 'Vehicle Images')}
          </h2>
          
          <div className="mb-4">
            <label htmlFor="newImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              {translateWithFallback('sellerDashboard.inventory.addImageUrl', 'Add Image URL')}
            </label>
            <div className="flex">
              <input
                type="url"
                id="newImageUrl"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
              >
                <FiPlus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Vehicle ${index + 1}`}
                  className="h-32 w-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = '/car3.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {translateWithFallback('sellerDashboard.inventory.features', 'Features & Options')}
          </h2>
          
          <div className="mb-4">
            <label htmlFor="newFeature" className="block text-sm font-medium text-gray-700 mb-1">
              {translateWithFallback('sellerDashboard.inventory.addFeature', 'Add Feature')}
            </label>
            <div className="flex">
              <input
                type="text"
                id="newFeature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-[#3b396d] focus:ring focus:ring-[#3b396d] focus:ring-opacity-50"
                placeholder="e.g., Leather Seats, Sunroof"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
              >
                <FiPlus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/seller/inventory')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]"
          >
            {translateWithFallback('sellerDashboard.cancel', 'Cancel')}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] disabled:opacity-50"
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