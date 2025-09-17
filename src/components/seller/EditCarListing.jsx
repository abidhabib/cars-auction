// src/components/seller/EditCarListing.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FiArrowLeft, FiSave, FiPlus, FiX, FiRefreshCw, FiInfo, 
  FiTrash2, FiUpload, FiImage, FiCheck, FiAlertTriangle 
} from 'react-icons/fi';
import { demoVehicles } from './demoVehicles';

// Mock API service
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

  // Refs for each section to enable smooth scrolling
  const basicRef = useRef(null);
  const pricingRef = useRef(null);
  const technicalRef = useRef(null);
  const conditionRef = useRef(null);
  const mediaRef = useRef(null);
  const featuresRef = useRef(null);

  // State to track which section is currently in view
  const [activeSection, setActiveSection] = useState('basic');

  // Initialize form data with comprehensive fields
  const [formData, setFormData] = useState({
    // Basic Information
    make: '',
    model: '',
    year: new Date().getFullYear(),
    trim: '',
    mileage: '',
    mileageUnit: 'km',
    registrationDate: '',
    previousOwners: 1,
    licensePlate: '',
    vim: '',
    description: '',
    // Pricing & Auction
    status: 'draft',
    reservePrice: '',
    buyItNowPrice: '',
    auctionType: 'public',
    auctionEnds: '',
    auctionTiming: {
      preset: '7-days',
      startDate: '',
      startTime: '09:00',
      endDate: '',
      endTime: '20:00',
      timezone: 'Europe/Berlin'
    },
    // Location & Contact
    location: '',
    country: 'DE',
    // Technical Specifications
    fuelType: 'Petrol',
    transmission: 'Automatic',
    color: '',
    condition: 'Good',
    engine: '',
    horsepower: '',
    doors: 4,
    seats: 5,
    // Images
    images: [],
    headline: '',
    // Features & Options
    features: [],
    damagePoints: [],
    selectedOptions: [],
    // Condition Assessment
    conditionAssessment: {
      technicalChecklist: {
        engine: 'good',
        transmission: 'good',
        brakes: 'good',
        suspension: 'good',
        electrics: 'good',
        exhaust: 'good'
      },
      interiorChecklist: {
        seats: 'good',
        dashboard: 'good',
        carpets: 'good',
        headliner: 'good',
        controls: 'good'
      },
      tyreReport: {
        frontLeft: { brand: '', treadDepth: 0, condition: 'good' },
        frontRight: { brand: '', treadDepth: 0, condition: 'good' },
        rearLeft: { brand: '', treadDepth: 0, condition: 'good' },
        rearRight: { brand: '', treadDepth: 0, condition: 'good' }
      }
    },
    // Service History
    serviceHistory: 'full',
    hasAccident: false,
    accidentDetails: ''
  });

  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadVehicle();
    }
  }, [id]);

  // Effect to handle scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'basic', ref: basicRef },
        { id: 'pricing', ref: pricingRef },
        { id: 'technical', ref: technicalRef },
        { id: 'condition', ref: conditionRef },
        { id: 'media', ref: mediaRef },
        { id: 'features', ref: featuresRef },
      ];

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const elementTop = section.ref.current.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadVehicle = async () => {
    try {
      setLoading(true);
      const vehicle = await VehicleService.getVehicleById(id);
      if (vehicle) {
        // Map vehicle data to form data structure
        setFormData({
          make: vehicle.make || '',
          model: vehicle.model || '',
          year: vehicle.year || new Date().getFullYear(),
          trim: vehicle.trim || '',
          mileage: vehicle.mileage || '',
          mileageUnit: vehicle.mileageUnit || 'km',
          registrationDate: vehicle.registrationDate || '',
          previousOwners: vehicle.previousOwners || 1,
          licensePlate: vehicle.licensePlate || '',
          vim: vehicle.vim || '',
          description: vehicle.description || '',
          status: vehicle.status || 'draft',
          reservePrice: vehicle.reservePrice || '',
          buyItNowPrice: vehicle.buyItNowPrice || '',
          auctionType: vehicle.auctionType || 'public',
          auctionEnds: vehicle.auctionEnds ? new Date(vehicle.auctionEnds).toISOString().split('T')[0] : '',
          location: vehicle.location || '',
          country: vehicle.country || 'DE',
          fuelType: vehicle.fuelType || 'Petrol',
          transmission: vehicle.transmission || 'Automatic',
          color: vehicle.color || '',
          condition: vehicle.condition || 'Good',
          engine: vehicle.engine || '',
          horsepower: vehicle.horsepower || '',
          doors: vehicle.doors || 4,
          seats: vehicle.seats || 5,
          images: vehicle.images || [],
          headline: vehicle.headline || '',
          features: vehicle.features || [],
          damagePoints: vehicle.damagePoints || [],
          selectedOptions: vehicle.selectedOptions || [],
          conditionAssessment: vehicle.conditionAssessment || {
            technicalChecklist: {
              engine: 'good',
              transmission: 'good',
              brakes: 'good',
              suspension: 'good',
              electrics: 'good',
              exhaust: 'good'
            },
            interiorChecklist: {
              seats: 'good',
              dashboard: 'good',
              carpets: 'good',
              headliner: 'good',
              controls: 'good'
            },
            tyreReport: {
              frontLeft: { brand: '', treadDepth: 0, condition: 'good' },
              frontRight: { brand: '', treadDepth: 0, condition: 'good' },
              rearLeft: { brand: '', treadDepth: 0, condition: 'good' },
              rearRight: { brand: '', treadDepth: 0, condition: 'good' }
            }
          },
          serviceHistory: vehicle.serviceHistory || 'full',
          hasAccident: vehicle.hasAccident || false,
          accidentDetails: vehicle.accidentDetails || ''
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
    const { name, value, type, checked } = e.target;
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'conditionAssessment') {
        setFormData(prev => ({
          ...prev,
          conditionAssessment: {
            ...prev.conditionAssessment,
            [child]: value
          }
        }));
      } else if (parent === 'tyreReport') {
        const [tyre, field] = child.split('.');
        setFormData(prev => ({
          ...prev,
          conditionAssessment: {
            ...prev.conditionAssessment,
            tyreReport: {
              ...prev.conditionAssessment.tyreReport,
              [tyre]: {
                ...prev.conditionAssessment.tyreReport[tyre],
                [field]: value
              }
            }
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNestedInputChange = (path, value) => {
    const updateNestedObject = (obj, path, value) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const newObj = { ...obj };
      let current = newObj;
      for (let i = 0; i < keys.length; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[lastKey] = value;
      return newObj;
    };
    setFormData(prev => updateNestedObject(prev, path, value));
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

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6">
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
              <FiAlertTriangle className="h-5 w-5 text-red-500" />
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
              <FiCheck className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Container with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sticky Sidebar for Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-6 rounded-xl shadow-lg border border-gray-200 p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sections</h3>
            <nav className="space-y-2">
              {[
                { id: 'basic', label: 'Basic Information', ref: basicRef },
                { id: 'pricing', label: 'Pricing & Auction', ref: pricingRef },
                { id: 'technical', label: 'Technical Details', ref: technicalRef },
                { id: 'condition', label: 'Condition & History', ref: conditionRef },
                { id: 'media', label: 'Media & Description', ref: mediaRef },
                { id: 'features', label: 'Features & Options', ref: featuresRef }
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.ref)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#3b396d] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {translateWithFallback(`sellerDashboard.tabs.${section.id}`, section.label)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <section 
              ref={basicRef} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              id="basic"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {translateWithFallback('sellerDashboard.inventory.basicInfo', 'Basic Information')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.make', 'Make')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    required
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., BMW"
                  />
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.model', 'Model')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., X5"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.year', 'Year')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="trim" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.trim', 'Trim Level')}
                  </label>
                  <input
                    type="text"
                    id="trim"
                    name="trim"
                    value={formData.trim}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., xDrive40d"
                  />
                </div>
                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.mileage', 'Mileage')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="mileage"
                      name="mileage"
                      required
                      min="0"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-l-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                      placeholder="e.g., 25000"
                    />
                    <select
                      name="mileageUnit"
                      value={formData.mileageUnit}
                      onChange={handleInputChange}
                      className="w-16 px-2 py-2.5 border border-gray-300 rounded-r-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    >
                      <option value="km">km</option>
                      <option value="mi">mi</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.registrationDate', 'Registration Date')}
                  </label>
                  <input
                    type="date"
                    id="registrationDate"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="previousOwners" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.previousOwners', 'Previous Owners')}
                  </label>
                  <input
                    type="number"
                    id="previousOwners"
                    name="previousOwners"
                    min="0"
                    max="10"
                    value={formData.previousOwners}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.licensePlate', 'License Plate')}
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., B-XY 123"
                  />
                </div>
                <div className="lg:col-span-3">
                  <label htmlFor="vim" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.vim', 'VIN')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="vim"
                    name="vim"
                    required
                    value={formData.vim}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., WBAJK8C50BC123456"
                  />
                </div>
              </div>
            </section>

            {/* Pricing & Auction Section */}
            <section 
              ref={pricingRef} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              id="pricing"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {translateWithFallback('sellerDashboard.inventory.pricingAuction', 'Pricing & Auction Details')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.status', 'Status')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="auctionType" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.auctionType', 'Auction Type')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="auctionType"
                    name="auctionType"
                    required
                    value={formData.auctionType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    <option value="public">Public Auction</option>
                    <option value="private">Private Auction</option>
                    <option value="direct-buy">Direct Buy</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reservePrice" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., 40000"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., 52000"
                  />
                </div>
                {formData.status === 'active' && (
                  <>
                    <div>
                      <label htmlFor="auctionEnds" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="auctionTiming.preset" className="block text-sm font-medium text-gray-700 mb-1">
                        {translateWithFallback('sellerDashboard.inventory.auctionDuration', 'Auction Duration')}
                      </label>
                      <select
                        id="auctionTiming.preset"
                        name="auctionTiming.preset"
                        value={formData.auctionTiming?.preset || '7-days'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                      >
                        <option value="3-days">3 Days</option>
                        <option value="5-days">5 Days</option>
                        <option value="7-days">7 Days</option>
                        <option value="10-days">10 Days</option>
                        <option value="14-days">14 Days</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Technical Details Section */}
            <section 
              ref={technicalRef} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              id="technical"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {translateWithFallback('sellerDashboard.inventory.technicalDetails', 'Technical Details')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.fuelType', 'Fuel Type')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    required
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
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
                    {translateWithFallback('sellerDashboard.inventory.transmission', 'Transmission')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="transmission"
                    name="transmission"
                    required
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.color', 'Color')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    required
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., Black"
                  />
                </div>
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.condition', 'Condition')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    required
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="engine" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.engine', 'Engine')}
                  </label>
                  <input
                    type="text"
                    id="engine"
                    name="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., 3.0L Twin-Turbo"
                  />
                </div>
                <div>
                  <label htmlFor="horsepower" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.horsepower', 'Horsepower')}
                  </label>
                  <input
                    type="number"
                    id="horsepower"
                    name="horsepower"
                    min="0"
                    value={formData.horsepower}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="e.g., 300"
                  />
                </div>
                <div>
                  <label htmlFor="doors" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.doors', 'Doors')}
                  </label>
                  <select
                    id="doors"
                    name="doors"
                    value={formData.doors}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.seats', 'Seats')}
                  </label>
                  <select
                    id="seats"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  >
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    {translateWithFallback('sellerDashboard.inventory.location', 'Location')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </section>

            {/* Condition & History Section */}
            <section 
              ref={conditionRef} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              id="condition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {translateWithFallback('sellerDashboard.inventory.conditionHistory', 'Condition & History')}
              </h2>
              
              {/* Technical Condition */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {translateWithFallback('sellerDashboard.inventory.technicalCondition', 'Technical Condition')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(formData.conditionAssessment?.technicalChecklist || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                        {key}
                      </label>
                      <select
                        value={value}
                        onChange={(e) => handleNestedInputChange(`conditionAssessment.technicalChecklist.${key}`, e.target.value)}
                        className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interior Condition */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {translateWithFallback('sellerDashboard.inventory.interiorCondition', 'Interior Condition')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(formData.conditionAssessment?.interiorChecklist || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                        {key}
                      </label>
                      <select
                        value={value}
                        onChange={(e) => handleNestedInputChange(`conditionAssessment.interiorChecklist.${key}`, e.target.value)}
                        className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d]"
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tyre Report */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {translateWithFallback('sellerDashboard.inventory.tyreReport', 'Tyre Report')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(formData.conditionAssessment?.tyreReport || {}).map(([position, tyre]) => (
                    <div key={position} className="bg-gray-50 p-3 rounded-md">
                      <h4 className="text-xs font-medium text-gray-700 mb-2 capitalize">
                        {position.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Brand</label>
                          <input
                            type="text"
                            value={tyre.brand}
                            onChange={(e) => handleNestedInputChange(`conditionAssessment.tyreReport.${position}.brand`, e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                            placeholder="e.g., Michelin"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Tread Depth (mm)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tyre.treadDepth}
                            onChange={(e) => handleNestedInputChange(`conditionAssessment.tyreReport.${position}.treadDepth`, e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Condition</label>
                          <select
                            value={tyre.condition}
                            onChange={(e) => handleNestedInputChange(`conditionAssessment.tyreReport.${position}.condition`, e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#3b396d] focus:border-[#3b396d]"
                          >
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="average">Average</option>
                            <option value="poor">Poor</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service History & Accident */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {translateWithFallback('sellerDashboard.inventory.serviceHistory', 'Service History & Accident')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translateWithFallback('sellerDashboard.inventory.serviceHistory', 'Service History')}
                    </label>
                    <select
                      name="serviceHistory"
                      value={formData.serviceHistory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] text-sm"
                    >
                      <option value="full">Full Service History</option>
                      <option value="partial">Partial Service History</option>
                      <option value="none">No Service History</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="hasAccident"
                        checked={formData.hasAccident}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {translateWithFallback('sellerDashboard.inventory.hasAccident', 'Has Accident History')}
                      </span>
                    </label>
                  </div>
                  {formData.hasAccident && (
                    <div>
                      <label htmlFor="accidentDetails" className="block text-sm font-medium text-gray-700 mb-1">
                        {translateWithFallback('sellerDashboard.inventory.accidentDetails', 'Accident Details')}
                      </label>
                      <textarea
                        id="accidentDetails"
                        name="accidentDetails"
                        rows="3"
                        value={formData.accidentDetails}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] text-sm"
                        placeholder="Describe any accidents, repairs, or damage history..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Media & Description Section */}
            <section 
              ref={mediaRef} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              id="media"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {translateWithFallback('sellerDashboard.inventory.mediaDescription', 'Media & Description')}
              </h2>
              <div className="mb-4">
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
                  {translateWithFallback('sellerDashboard.inventory.headline', 'Headline')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  required
                  value={formData.headline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  placeholder="e.g., 2022 BMW X5 xDrive40d M Sport in Excellent Condition"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {translateWithFallback('sellerDashboard.inventory.description', 'Description')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm"
                  placeholder="Provide a detailed description of the vehicle, highlighting its features, condition, and any special attributes..."
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {translateWithFallback('sellerDashboard.inventory.images', 'Vehicle Images')}
                </h3>
                <div className="mb-4">
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
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] transition whitespace-nowrap disabled:opacity-70"
                    >
                      <FiUpload className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {translateWithFallback('sellerDashboard.inventory.imageHelp', 'Select one or more images to upload. Recommended: 8+ high-quality photos from different angles.')}
                  </p>
                </div>
                {formData.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {translateWithFallback('sellerDashboard.inventory.currentImages', 'Current Images')} ({formData.images.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={image}
                            alt={`Vehicle ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/400x300?text=Image+Not+Found';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <FiTrash2 className="h-3 w-3" />
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Features & Options Section */}
            <section 
              ref={featuresRef} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              id="features"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {translateWithFallback('sellerDashboard.inventory.featuresOptions', 'Features & Options')}
              </h2>
              {/* Add Feature */}
              <div className="mb-6">
                <label htmlFor="newFeature" className="block text-sm font-medium text-gray-700 mb-1">
                  {translateWithFallback('sellerDashboard.inventory.addFeature', 'Add Feature')}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    id="newFeature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition text-sm min-w-0"
                    placeholder="e.g., Leather Seats, Sunroof, Navigation System"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    disabled={!newFeature.trim()}
                    className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#3b396d] hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] transition whitespace-nowrap disabled:opacity-70"
                  >
                    <FiPlus className="h-4 w-4 mr-2" />
                    Add
                  </button>
                </div>
              </div>
              {/* Current Features */}
              {formData.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    {translateWithFallback('sellerDashboard.inventory.currentFeatures', 'Current Features')} ({formData.features.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                          aria-label={`Remove feature ${feature}`}
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Selected Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {translateWithFallback('sellerDashboard.inventory.selectedOptions', 'Selected Options')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'alloy-wheels', 'led-lighting', 'panoramic-roof', 'parking-sensors', 
                    'backup-camera', 'tow-hitch', 'air-suspension', 'xenon-headlights',
                    'metallic-paint', 'sunroof', 'sports-package', 'premium-sound',
                    'ceramic-brakes', 'autopilot', 'adaptive-cruise', 'lane-assist'
                  ].map(option => (
                    <label key={option} className="flex items-center p-2.5 border border-gray-200 rounded-md hover:bg-gray-50 transition text-xs">
                      <input
                        type="checkbox"
                        checked={formData.selectedOptions.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              selectedOptions: [...prev.selectedOptions, option]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              selectedOptions: prev.selectedOptions.filter(opt => opt !== option)
                            }));
                          }
                        }}
                        className="h-3.5 w-3.5 text-[#3b396d] focus:ring-[#3b396d] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {option.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Form Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky bottom-0">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] transition"
                >
                  {translateWithFallback('sellerDashboard.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white bg-[#3b396d] border border-transparent rounded-md shadow-sm hover:bg-[#2a285a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] disabled:opacity-70 transition flex items-center justify-center"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCarListing;