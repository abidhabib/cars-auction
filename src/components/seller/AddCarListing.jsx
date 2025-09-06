// src/components/listings/AddCarListing.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Assuming this path
import { FiCheck, FiChevronLeft, FiChevronRight, FiUpload, FiCamera, FiDollarSign, FiClock, FiInfo, FiEdit2, FiSave, FiEye, FiLink } from 'react-icons/fi';
import Button from '../common/Button'; // Assuming this path or use your Button component
// import AppLayout from '../layout/AppLayout'; // If needed as a wrapper

const AddCarListing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // --- State Management ---
  const [currentStep, setCurrentStep] = useState(1);
  const [saleType, setSaleType] = useState(''); // 'direct-buy', 'general-auction', 'private-sale'
  const [auctionTiming, setAuctionTiming] = useState({
    preset: '3-days', // '24-hours', '3-days', '5-days', '7-days', 'custom'
    startDate: '',
    startTime: '10:00', // Default time
    endDate: '',
    endTime: '18:00',   // Default time
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // Get user's local timezone
  });
  const [vehicleIdentification, setVehicleIdentification] = useState({
    method: 'manual', // 'vin' or 'manual'
    vin: '',
    make: '',
    model: '',
    year: '',
    trim: '',
    licensePlate: '',
    mileage: '',
    mileageUnit: 'km', // 'km' or 'mi'
    registrationDate: '',
    previousOwners: ''
  });
  const [mediaAndDescription, setMediaAndDescription] = useState({
    photos: [], // Array of File objects or preview URLs
    headline: '',
    description: '',
    serviceHistory: 'full', // 'full', 'partial', 'none'
    hasAccident: false,
    accidentDetails: ''
  });
  const [conditionAssessment, setConditionAssessment] = useState({
    // This is a simplified structure. You might want more detailed nested objects.
    damageReport: {}, // Could be an object with keys for different car parts
    technicalChecklist: {
      engine: 'good', // 'good', 'average', 'poor', 'not-working'
      transmission: 'good',
      brakes: 'good',
      electronics: 'good',
      suspension: 'good',
      exhaust: 'good'
    },
    interiorChecklist: {
      upholstery: 'good', // 'good', 'average', 'poor', 'worn'
      dashboard: 'good',
      seats: 'good'
    },
    tyreReport: {
      frontLeft: { condition: 'good', brand: '', treadDepth: '' },
      frontRight: { condition: 'good', brand: '', treadDepth: '' },
      rearLeft: { condition: 'good', brand: '', treadDepth: '' },
      rearRight: { condition: 'good', brand: '', treadDepth: '' }
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vinDecodeLoading, setVinDecodeLoading] = useState(false);
  const [vinDecodeError, setVinDecodeError] = useState('');

  // --- Constants ---
  const TOTAL_STEPS = 6;
  const SALE_TYPES = [
    {
      id: 'direct-buy',
      title: t('addCarListing.saleTypes.directBuy.title') || 'Direct Buy',
      description: t('addCarListing.saleTypes.directBuy.description') || 'Set a fixed price. Users can buy it immediately or make bids, which you can choose to accept or decline.',
      icon: <FiDollarSign className="h-6 w-6" />
    },
    {
      id: 'general-auction',
      title: t('addCarListing.saleTypes.generalAuction.title') || 'General Auction',
      description: t('addCarListing.saleTypes.generalAuction.description') || 'Run a blind auction with a defined time window. Bidders won\'t see others\' offers. You are not obligated to accept the highest bid.',
      icon: <FiClock className="h-6 w-6" />
    },
    {
      id: 'private-sale',
      title: t('addCarListing.saleTypes.privateSale.title') || 'Private Sale',
      description: t('addCarListing.saleTypes.privateSale.description') || 'Your listing will be hidden from the public. Only people with your unique link can view and bid on it.',
      icon: <FiEye className="h-6 w-6" />
    }
  ];

  const AUCTION_PRESETS = [
    { id: '24-hours', label: t('addCarListing.auctionTiming.presets.24Hours') || '24 Hours' },
    { id: '3-days', label: t('addCarListing.auctionTiming.presets.3Days') || '3 Days' },
    { id: '5-days', label: t('addCarListing.auctionTiming.presets.5Days') || '5 Days' },
    { id: '7-days', label: t('addCarListing.auctionTiming.presets.7Days') || '7 Days' },
    { id: 'custom', label: t('addCarListing.auctionTiming.presets.custom') || 'Custom' }
  ];

  // --- Helper Functions ---
  const calculateDatesFromPreset = (preset) => {
    const now = new Date();
    let end = new Date(now);
    switch(preset) {
      case '24-hours':
        end.setHours(now.getHours() + 24);
        break;
      case '3-days':
        end.setDate(now.getDate() + 3);
        break;
      case '5-days':
        end.setDate(now.getDate() + 5);
        break;
      case '7-days':
        end.setDate(now.getDate() + 7);
        break;
      default:
        return { startDate: auctionTiming.startDate, startTime: auctionTiming.startTime, endDate: auctionTiming.endDate, endTime: auctionTiming.endTime };
    }
    const formattedStartDate = now.toISOString().split('T')[0];
    const formattedEndDate = end.toISOString().split('T')[0];
    return {
        startDate: formattedStartDate,
        startTime: auctionTiming.startTime, // Keep default or use current time?
        endDate: formattedEndDate,
        endTime: auctionTiming.endTime // Keep default or calculate?
    };
  };

  // --- Handlers ---
  const handleSaleTypeSelect = (typeId) => {
    setSaleType(typeId);
    // Reset auction timing if switching away from auction
    if (typeId !== 'general-auction') {
        setAuctionTiming({
            preset: '3-days',
            startDate: '',
            startTime: '10:00',
            endDate: '',
            endTime: '18:00',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    } else {
        // Pre-fill dates if switching to auction
        const dates = calculateDatesFromPreset('3-days');
        setAuctionTiming(prev => ({ ...prev, ...dates }));
    }
  };

  const handleAuctionPresetChange = (presetId) => {
    setAuctionTiming(prev => {
        if (presetId === 'custom') {
            return { ...prev, preset: presetId };
        } else {
            const dates = calculateDatesFromPreset(presetId);
            return { ...prev, preset: presetId, ...dates };
        }
    });
  };

  const handleAuctionTimingChange = (field, value) => {
    setAuctionTiming(prev => ({ ...prev, [field]: value }));
    // Clear preset if user manually changes a custom field
    if (auctionTiming.preset !== 'custom') {
        setAuctionTiming(prev => ({ ...prev, preset: 'custom' }));
    }
  };

  const handleVinDecode = async () => {
    if (!vehicleIdentification.vin) {
        setVinDecodeError(t('addCarListing.vehicleId.vinRequired') || 'Please enter a VIN.');
        return;
    }
    setVinDecodeLoading(true);
    setVinDecodeError('');
    try {
        // --- Simulate API Call ---
        // In a real app, you'd call your backend API here
        // const response = await fetch(`/api/decode-vin/${vehicleIdentification.vin}`);
        // const data = await response.json();
        // Simulate a delay and mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = {
            make: 'BMW',
            model: 'X5',
            year: '2020',
            trim: 'xDrive40i',
            // ... other decoded fields
        };
        setVehicleIdentification(prev => ({ ...prev, ...mockData }));
        alert(t('addCarListing.vehicleId.vinDecoded') || 'VIN decoded successfully! (Simulated)');
        // --- End Simulation ---
    } catch (err) {
        console.error("VIN Decode Error:", err);
        setVinDecodeError(t('addCarListing.vehicleId.vinDecodeFailed') || 'Failed to decode VIN. Please check the number and try again.');
    } finally {
        setVinDecodeLoading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // Basic validation and file handling logic would go here
    // For now, we'll just add them to the state
    setMediaAndDescription(prev => ({
        ...prev,
        photos: [...prev.photos, ...files.map(file => URL.createObjectURL(file))] // Store preview URLs
    }));
    // In a real app, you'd likely store File objects and upload them later
  };

  const removePhoto = (index) => {
    setMediaAndDescription(prev => {
        const newPhotos = [...prev.photos];
        URL.revokeObjectURL(newPhotos[index]); // Clean up memory
        newPhotos.splice(index, 1);
        return { ...prev, photos: newPhotos };
    });
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch(step) {
        case 1: // Sale Type
            if (!saleType) newErrors.saleType = t('addCarListing.errors.saleTypeRequired') || 'Please select a sale type.';
            if (saleType === 'direct-buy' && !mediaAndDescription.directBuyPrice) {
                newErrors.directBuyPrice = t('addCarListing.errors.directBuyPriceRequired') || 'Direct buy price is required.';
            }
            break;
        case 2: // Auction Timing (Conditional)
            if (saleType === 'general-auction') {
                if (!auctionTiming.startDate || !auctionTiming.startTime) {
                    newErrors.auctionStart = t('addCarListing.errors.auctionStartRequired') || 'Auction start date and time are required.';
                }
                if (!auctionTiming.endDate || !auctionTiming.endTime) {
                    newErrors.auctionEnd = t('addCarListing.errors.auctionEndRequired') || 'Auction end date and time are required.';
                }
                // Basic date/time comparison logic needed here
                // Convert to Date objects for comparison
                const startDateTimeStr = `${auctionTiming.startDate}T${auctionTiming.startTime}`;
                const endDateTimeStr = `${auctionTiming.endDate}T${auctionTiming.endTime}`;
                const startDateObj = new Date(startDateTimeStr);
                const endDateObj = new Date(endDateTimeStr);

                if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
                     newErrors.auctionDates = t('addCarListing.errors.invalidAuctionDates') || 'Invalid date or time format.';
                } else {
                    const diffMs = endDateObj - startDateObj;
                    const diffHours = diffMs / (1000 * 60 * 60);

                    if (diffHours < 1) {
                        newErrors.auctionDuration = t('addCarListing.errors.auctionTooShort') || 'Auction must be at least 1 hour long.';
                    }
                    if (diffHours > (14 * 24)) { // 14 days
                        newErrors.auctionDuration = t('addCarListing.errors.auctionTooLong') || 'Auction cannot exceed 14 days.';
                    }
                    if (endDateObj <= new Date()) {
                        newErrors.auctionEndFuture = t('addCarListing.errors.auctionEndFuture') || 'Auction end time must be in the future.';
                    }
                }
            }
            break;
        case 3: // Vehicle ID
            if (vehicleIdentification.method === 'vin' && !vehicleIdentification.vin) {
                newErrors.vin = t('addCarListing.errors.vinRequired') || 'VIN is required.';
            }
            if (vehicleIdentification.method === 'manual') {
                if (!vehicleIdentification.make) newErrors.make = t('addCarListing.errors.makeRequired') || 'Make is required.';
                if (!vehicleIdentification.model) newErrors.model = t('addCarListing.errors.modelRequired') || 'Model is required.';
                if (!vehicleIdentification.year) newErrors.year = t('addCarListing.errors.yearRequired') || 'Year is required.';
                // Add validation for other manual fields as needed
            }
            break;
        case 4: // Media & Description
            if (mediaAndDescription.photos.length === 0) {
                newErrors.photos = t('addCarListing.errors.photosRequired') || 'At least one photo is required.';
            }
            if (!mediaAndDescription.headline) {
                newErrors.headline = t('addCarListing.errors.headlineRequired') || 'A headline is required.';
            }
            if (!mediaAndDescription.description) {
                newErrors.description = t('addCarListing.errors.descriptionRequired') || 'A detailed description is required.';
            }
            if (mediaAndDescription.hasAccident && !mediaAndDescription.accidentDetails) {
                newErrors.accidentDetails = t('addCarListing.errors.accidentDetailsRequired') || 'Please describe the accident.';
            }
            break;
        case 5: // Condition Assessment
            // Add validation for condition assessment fields if necessary
            break;
        case 6: // Review & Publish
            // Generally, this step validates previous steps, so no specific validation here
            break;
        default:
            break;
    }
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    if (Object.keys(newErrors).length === 0) {
        setErrors({}); // Clear previous errors on this step
        setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    } else {
        setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (action) => { // action: 'save-draft' or 'publish'
    const finalErrors = validateStep(currentStep); // Validate current step (Review)
    // You might want to validate all steps here for a final check before submission
    if (Object.keys(finalErrors).length === 0) {
        setIsSubmitting(true);
        try {
            // Prepare data for submission
            // This involves collecting data from all state objects
            const listingData = {
                saleType,
                auctionTiming: saleType === 'general-auction' ? auctionTiming : undefined,
                vehicleIdentification,
                mediaAndDescription,
                conditionAssessment,
                status: action === 'publish' ? 'published' : 'draft'
            };

            console.log("Submitting Listing Data:", listingData); // For debugging/demo

            // --- Simulate API Call ---
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(action === 'publish' ?
                (t('addCarListing.publishSuccess') || 'Listing published successfully!') :
                (t('addCarListing.draftSaved') || 'Draft saved successfully!')
            );
            // Navigate to success page or listings dashboard
            // navigate('/seller/my-listings');
            // --- End Simulation ---
        } catch (error) {
            console.error("Submission Error:", error);
            setErrors({ submit: error.message || (t('addCarListing.submitError') || 'An error occurred during submission. Please try again.') });
        } finally {
            setIsSubmitting(false);
        }
    } else {
        setErrors(finalErrors);
    }
  };

  // --- Render Functions for Steps ---
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[...Array(TOTAL_STEPS)].map((_, index) => {
            const step = index + 1;
            return (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    step < currentStep
                      ? 'bg-[#3b396d] text-white'
                      : step === currentStep
                      ? 'bg-[#3b396d] text-white border-4 border-[#3b396d]/20'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <span className="font-medium text-sm">{step}</span>
                  )}
                </div>
                <div className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                  step <= currentStep ? 'text-[#3b396d]' : 'text-gray-400'
                }`}>
                  {t(`addCarListing.steps.step${step}`) || `Step ${step}`}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#3b396d] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep1_SaleType = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.steps.step1.title') || 'Select Sale Type'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.steps.step1.description') || 'Choose how you want to sell your vehicle.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SALE_TYPES.map((type) => (
          <div
            key={type.id}
            onClick={() => handleSaleTypeSelect(type.id)}
            className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${
              saleType === type.id
                ? 'border-[#3b396d] bg-[#3b396d]/5 ring-2 ring-[#3b396d]/20'
                : 'border-gray-200 hover:border-[#3b396d] hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full mb-4 ${
                saleType === type.id ? 'bg-[#3b396d] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {type.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      {errors.saleType && <p className="text-red-600 text-sm mt-2">{errors.saleType}</p>}

      {/* Conditional Direct Buy Price Input */}
      {saleType === 'direct-buy' && (
        <div className="mt-6 p-4 bg-[#f8f9ff] rounded-lg border border-gray-200">
          <label htmlFor="directBuyPrice" className="block text-sm font-medium text-gray-700 mb-2">
            {t('addCarListing.steps.step1.directBuyPriceLabel') || 'Direct Buy Price ($)'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="directBuyPrice"
              name="directBuyPrice"
              value={mediaAndDescription.directBuyPrice || ''} // Temporary storage
              onChange={(e) => setMediaAndDescription(prev => ({ ...prev, directBuyPrice: e.target.value }))}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              placeholder={t('addCarListing.steps.step1.directBuyPricePlaceholder') || 'Enter price'}
            />
          </div>
          {errors.directBuyPrice && <p className="text-red-600 text-sm mt-1">{errors.directBuyPrice}</p>}
        </div>
      )}

      {/* Conditional Private Sale Note */}
      {saleType === 'private-sale' && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex items-start">
          <FiInfo className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              {t('addCarListing.steps.step1.privateSaleNoteTitle') || 'Private Listing Confirmed'}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              {t('addCarListing.steps.step1.privateSaleNoteDesc') || 'Your listing will not appear in public searches. You can share the unique link with potential buyers.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2_AuctionTiming = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.steps.step2.title') || 'Auction Timing'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.steps.step2.description') || 'Define the start and end times for your auction.'}</p>
      </div>

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('addCarListing.auctionTiming.presetLabel') || 'Quick Select Duration'}
        </label>
        <div className="flex flex-wrap gap-2">
          {AUCTION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleAuctionPresetChange(preset.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                auctionTiming.preset === preset.id
                  ? 'bg-[#3b396d] text-white border-[#3b396d]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Date/Time Pickers */}
      <div className={`space-y-5 transition-all duration-300 ${auctionTiming.preset === 'custom' ? 'opacity-100 max-h-screen' : 'opacity-100 max-h-screen'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Start Date & Time */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.auctionTiming.startDateLabel') || 'Start Date'}
            </label>
            <input
              type="date"
              id="startDate"
              value={auctionTiming.startDate}
              onChange={(e) => handleAuctionTimingChange('startDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Today or future
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.auctionTiming.startTimeLabel') || 'Start Time'}
            </label>
            <input
              type="time"
              id="startTime"
              value={auctionTiming.startTime}
              onChange={(e) => handleAuctionTimingChange('startTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* End Date & Time */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.auctionTiming.endDateLabel') || 'End Date'}
            </label>
            <input
              type="date"
              id="endDate"
              value={auctionTiming.endDate}
              onChange={(e) => handleAuctionTimingChange('endDate', e.target.value)}
              min={auctionTiming.startDate || new Date().toISOString().split('T')[0]} // Must be after start date or today
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.auctionTiming.endTimeLabel') || 'End Time'}
            </label>
            <input
              type="time"
              id="endTime"
              value={auctionTiming.endTime}
              onChange={(e) => handleAuctionTimingChange('endTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
        </div>
      </div>

      {/* Timezone Info */}
      <div className="text-xs text-gray-500 flex items-center">
        <FiInfo className="mr-1.5 h-4 w-4" />
        {t('addCarListing.auctionTiming.timezoneInfo', { timezone: auctionTiming.timezone }) || `Times are in your local timezone: ${auctionTiming.timezone}`}
      </div>

      {/* Validation Errors for Auction Timing */}
      {(errors.auctionStart || errors.auctionEnd || errors.auctionDates || errors.auctionDuration || errors.auctionEndFuture) && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          <ul className="list-disc pl-5 space-y-1">
            {errors.auctionStart && <li>{errors.auctionStart}</li>}
            {errors.auctionEnd && <li>{errors.auctionEnd}</li>}
            {errors.auctionDates && <li>{errors.auctionDates}</li>}
            {errors.auctionDuration && <li>{errors.auctionDuration}</li>}
            {errors.auctionEndFuture && <li>{errors.auctionEndFuture}</li>}
          </ul>
        </div>
      )}
    </div>
  );

  const renderStep3_VehicleId = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.steps.step3.title') || 'Vehicle Identification'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.steps.step3.description') || 'Provide the core details of your vehicle.'}</p>
      </div>

      {/* Identification Method */}
      <div className="bg-gray-50 rounded-lg p-4">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-3">{t('addCarListing.vehicleId.methodLabel') || 'How would you like to identify your vehicle?'}</legend>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="identify-vin"
                name="identification-method"
                type="radio"
                value="vin"
                checked={vehicleIdentification.method === 'vin'}
                onChange={() => setVehicleIdentification(prev => ({ ...prev, method: 'vin' }))}
                className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
              />
              <label htmlFor="identify-vin" className="ml-3 block text-sm font-medium text-gray-700">
                {t('addCarListing.vehicleId.findVin') || 'Find by VIN (Chassis Number)'}
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="identify-manual"
                name="identification-method"
                type="radio"
                value="manual"
                checked={vehicleIdentification.method === 'manual'}
                onChange={() => setVehicleIdentification(prev => ({ ...prev, method: 'manual' }))}
                className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
              />
              <label htmlFor="identify-manual" className="ml-3 block text-sm font-medium text-gray-700">
                {t('addCarListing.vehicleId.enterManually') || 'Enter details manually'}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      {/* VIN Input */}
      {vehicleIdentification.method === 'vin' && (
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
            {t('addCarListing.vehicleId.vinLabel') || 'VIN (Vehicle Identification Number)'}
          </label>
          <div className="flex">
            <input
              type="text"
              id="vin"
              value={vehicleIdentification.vin}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, vin: e.target.value.toUpperCase() }))}
              maxLength="17"
              placeholder={t('addCarListing.vehicleId.vinPlaceholder') || '17-character VIN'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            <button
              type="button"
              onClick={handleVinDecode}
              disabled={vinDecodeLoading || !vehicleIdentification.vin}
              className={`px-4 py-2 rounded-r-lg font-medium ${
                vinDecodeLoading || !vehicleIdentification.vin
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#3b396d] text-white hover:bg-[#2a285a]'
              }`}
            >
              {vinDecodeLoading ? (t('addCarListing.vehicleId.decoding') || 'Decoding...') : (t('addCarListing.vehicleId.decodeButton') || 'Decode VIN')}
            </button>
          </div>
          {vinDecodeError && <p className="mt-2 text-sm text-red-600">{vinDecodeError}</p>}
          <p className="mt-2 text-xs text-gray-500 flex items-center">
            <FiInfo className="mr-1 h-3 w-3" />
            {t('addCarListing.vehicleId.vinHelper') || 'The 17-character VIN is usually found on the dashboard (driver\'s side), door jamb, or engine bay.'}
          </p>
        </div>
      )}

      {/* Manual Entry Fields */}
      {vehicleIdentification.method === 'manual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.makeLabel') || 'Make'} *
            </label>
            <input
              type="text"
              id="make"
              value={vehicleIdentification.make}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, make: e.target.value }))}
              placeholder={t('addCarListing.vehicleId.makePlaceholder') || 'e.g., BMW'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.modelLabel') || 'Model'} *
            </label>
            <input
              type="text"
              id="model"
              value={vehicleIdentification.model}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, model: e.target.value }))}
              placeholder={t('addCarListing.vehicleId.modelPlaceholder') || 'e.g., X5'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.yearLabel') || 'Year'} *
            </label>
            <input
              type="number"
              id="year"
              value={vehicleIdentification.year}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, year: e.target.value }))}
              placeholder={t('addCarListing.vehicleId.yearPlaceholder') || 'e.g., 2020'}
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
          </div>
          <div>
            <label htmlFor="trim" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.trimLabel') || 'Trim / Edition'}
            </label>
            <input
              type="text"
              id="trim"
              value={vehicleIdentification.trim}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, trim: e.target.value }))}
              placeholder={t('addCarListing.vehicleId.trimPlaceholder') || 'e.g., xDrive40i'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
          <div>
            <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.licensePlateLabel') || 'License Plate Number'}
            </label>
            <input
              type="text"
              id="licensePlate"
              value={vehicleIdentification.licensePlate}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, licensePlate: e.target.value }))}
              placeholder={t('addCarListing.vehicleId.licensePlatePlaceholder') || 'e.g., ABC-123'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                {t('addCarListing.vehicleId.mileageLabel') || 'Mileage'} *
              </label>
              <input
                type="number"
                id="mileage"
                value={vehicleIdentification.mileage}
                onChange={(e) => setVehicleIdentification(prev => ({ ...prev, mileage: e.target.value }))}
                placeholder={t('addCarListing.vehicleId.mileagePlaceholder') || 'e.g., 30000'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              />
              {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
            </div>
            <div>
              <label htmlFor="mileageUnit" className="block text-sm font-medium text-gray-700 mb-2">
                {t('addCarListing.vehicleId.unitLabel') || 'Unit'}
              </label>
              <select
                id="mileageUnit"
                value={vehicleIdentification.mileageUnit}
                onChange={(e) => setVehicleIdentification(prev => ({ ...prev, mileageUnit: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.registrationDateLabel') || 'Vehicle Registration Date'}
            </label>
            <input
              type="date"
              id="registrationDate"
              value={vehicleIdentification.registrationDate}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, registrationDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
          <div>
            <label htmlFor="previousOwners" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.vehicleId.previousOwnersLabel') || 'Previous Owners'}
            </label>
            <input
              type="number"
              id="previousOwners"
              value={vehicleIdentification.previousOwners}
              onChange={(e) => setVehicleIdentification(prev => ({ ...prev, previousOwners: e.target.value }))}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4_MediaDescription = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.steps.step4.title') || 'Visual Documentation & Description'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.steps.step4.description') || 'Add photos and tell the story of your vehicle.'}</p>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('addCarListing.media.photosLabel') || 'Photos'} *
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300">
          <div className="space-y-1 text-center">
            <FiCamera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 justify-center">
              <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#3b396d] hover:text-[#2a285a] focus-within:outline-none">
                <span>{t('addCarListing.media.uploadButton') || 'Upload Photos'}</span>
                <input
                  id="photo-upload"
                  name="photo-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
              <p className="pl-1">{t('addCarListing.media.dragDrop') || 'or drag and drop'}</p>
            </div>
            <p className="text-xs text-gray-500">{t('addCarListing.media.fileTypes') || 'PNG, JPG, GIF up to 10MB'}</p>
          </div>
        </div>
        {errors.photos && <p className="mt-2 text-sm text-red-600">{errors.photos}</p>}

        {/* Preview Uploaded Photos */}
        {mediaAndDescription.photos.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{t('addCarListing.media.previewTitle') || 'Preview'}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaAndDescription.photos.map((photoUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photoUrl} // This is the preview URL from URL.createObjectURL
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={t('addCarListing.media.removePhoto') || "Remove photo"}
                  >
                    <FiTrash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Description Fields */}
      <div className="space-y-5">
        <div>
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
            {t('addCarListing.media.headlineLabel') || 'Listing Headline'} *
          </label>
          <input
            type="text"
            id="headline"
            value={mediaAndDescription.headline}
            onChange={(e) => setMediaAndDescription(prev => ({ ...prev, headline: e.target.value }))}
            placeholder={t('addCarListing.media.headlinePlaceholder') || 'e.g., 2020 BMW X5 xDrive40i in Excellent Condition'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
          />
          {errors.headline && <p className="mt-1 text-sm text-red-600">{errors.headline}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            {t('addCarListing.media.descriptionLabel') || 'Full Description'} *
          </label>
          <textarea
            id="description"
            rows={5}
            value={mediaAndDescription.description}
            onChange={(e) => setMediaAndDescription(prev => ({ ...prev, description: e.target.value }))}
            placeholder={t('addCarListing.media.descriptionPlaceholder') || 'Describe the vehicle in detail, including its history, features, condition, and any unique aspects. What makes it special?'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="serviceHistory" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.media.serviceHistoryLabel') || 'Service History'}
            </label>
            <select
              id="serviceHistory"
              value={mediaAndDescription.serviceHistory}
              onChange={(e) => setMediaAndDescription(prev => ({ ...prev, serviceHistory: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            >
              <option value="full">{t('addCarListing.media.serviceHistory.full') || 'Full'}</option>
              <option value="partial">{t('addCarListing.media.serviceHistory.partial') || 'Partial'}</option>
              <option value="none">{t('addCarListing.media.serviceHistory.none') || 'None'}</option>
            </select>
          </div>

          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                {t('addCarListing.media.accidentQuestion') || 'Has the car been in an accident?'}
              </legend>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="accident-yes"
                    name="has-accident"
                    type="radio"
                    checked={mediaAndDescription.hasAccident === true}
                    onChange={() => setMediaAndDescription(prev => ({ ...prev, hasAccident: true }))}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <label htmlFor="accident-yes" className="ml-2 block text-sm text-gray-700">
                    {t('yes') || 'Yes'}
                  </label>
                </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="accident-no"
                    name="has-accident"
                    type="radio"
                    checked={mediaAndDescription.hasAccident === false}
                    onChange={() => setMediaAndDescription(prev => ({ ...prev, hasAccident: false, accidentDetails: '' }))} // Reset details if 'No' is selected
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <label htmlFor="accident-no" className="ml-2 block text-sm text-gray-700">
                    {t('no') || 'No'}
                  </label>
                </div>
              </fieldset>
            
          </div>
        </div>

        {/* Conditional Accident Details */}
        {mediaAndDescription.hasAccident && (
          <div>
            <label htmlFor="accident-details" className="block text-sm font-medium text-gray-700 mb-2">
              {t('addCarListing.media.accidentDetailsLabel') || 'Accident Details'} *
            </label>
            <textarea
              id="accident-details"
              rows={3}
              value={mediaAndDescription.accidentDetails}
              onChange={(e) => setMediaAndDescription(prev => ({ ...prev, accidentDetails: e.target.value }))}
              placeholder={t('addCarListing.media.accidentDetailsPlaceholder') || 'Please describe the nature and extent of the accident damage.'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            {errors.accidentDetails && <p className="mt-1 text-sm text-red-600">{errors.accidentDetails}</p>}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5_Condition = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.steps.step5.title') || 'Condition Assessment'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.steps.step5.description') || 'Provide a detailed condition report to build trust with buyers.'}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
          <FiInfo className="mr-2 h-4 w-4 text-[#3b396d]" />
          {t('addCarListing.condition.damageReport.title') || 'Damage Report'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {t('addCarListing.condition.damageReport.description') || 'Please indicate any damage on the vehicle. (Interactive diagram would go here in a real implementation)'}
        </p>
        <div className="text-center p-8 bg-gray-50 rounded border-2 border-dashed border-gray-300">
          <FiInfo className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">
            {t('addCarListing.condition.damageReport.placeholder') || 'Interactive car diagram for damage reporting (Not implemented in this demo)'}
          </p>
        </div>
        {/* In a real app, this would be a complex interactive SVG or canvas element */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical Checklist */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-medium text-gray-800 mb-4">{t('addCarListing.condition.technicalChecklist.title') || 'Technical Checklist'}</h3>
          <div className="space-y-3">
            {Object.entries(conditionAssessment.technicalChecklist).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">{key}</span>
                <select
                  value={value}
                  onChange={(e) => setConditionAssessment(prev => ({
                    ...prev,
                    technicalChecklist: { ...prev.technicalChecklist, [key]: e.target.value }
                  }))}
                  className="text-sm border-gray-300 rounded focus:ring-[#3b396d] focus:border-[#3b396d]"
                >
                  <option value="good">{t('addCarListing.condition.rating.good') || 'Good'}</option>
                  <option value="average">{t('addCarListing.condition.rating.average') || 'Average'}</option>
                  <option value="poor">{t('addCarListing.condition.rating.poor') || 'Poor'}</option>
                  <option value="not-working">{t('addCarListing.condition.rating.notWorking') || 'Not Working'}</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Interior Checklist */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="font-medium text-gray-800 mb-4">{t('addCarListing.condition.interiorChecklist.title') || 'Interior Checklist'}</h3>
          <div className="space-y-3">
            {Object.entries(conditionAssessment.interiorChecklist).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">{key}</span>
                <select
                  value={value}
                  onChange={(e) => setConditionAssessment(prev => ({
                    ...prev,
                    interiorChecklist: { ...prev.interiorChecklist, [key]: e.target.value }
                  }))}
                  className="text-sm border-gray-300 rounded focus:ring-[#3b396d] focus:border-[#3b396d]"
                >
                  <option value="good">{t('addCarListing.condition.rating.good') || 'Good'}</option>
                  <option value="average">{t('addCarListing.condition.rating.average') || 'Average'}</option>
                  <option value="poor">{t('addCarListing.condition.rating.poor') || 'Poor'}</option>
                  <option value="worn">{t('addCarListing.condition.rating.worn') || 'Worn'}</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tyre Report */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="font-medium text-gray-800 mb-4">{t('addCarListing.condition.tyreReport.title') || 'Tyre Report'}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(conditionAssessment.tyreReport).map(([tyrePosition, tyreData]) => (
            <div key={tyrePosition} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">{tyrePosition.replace(/([A-Z])/g, ' $1').trim()}</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t('addCarListing.condition.tyreReport.brand') || 'Brand'}</label>
                  <input
                    type="text"
                    value={tyreData.brand}
                    onChange={(e) => setConditionAssessment(prev => ({
                      ...prev,
                      tyreReport: {
                        ...prev.tyreReport,
                        [tyrePosition]: { ...prev.tyreReport[tyrePosition], brand: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder={t('addCarListing.condition.tyreReport.brandPlaceholder') || 'e.g., Michelin'}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t('addCarListing.condition.tyreReport.treadDepth') || 'Tread Depth (mm)'}</label>
                  <input
                    type="number"
                    value={tyreData.treadDepth}
                    onChange={(e) => setConditionAssessment(prev => ({
                      ...prev,
                      tyreReport: {
                        ...prev.tyreReport,
                        [tyrePosition]: { ...prev.tyreReport[tyrePosition], treadDepth: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder="e.g., 6.5"
                    step="0.5"
                    min="0"
                    max="20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t('addCarListing.condition.tyreReport.condition') || 'Condition'}</label>
                  <select
                    value={tyreData.condition}
                    onChange={(e) => setConditionAssessment(prev => ({
                      ...prev,
                      tyreReport: {
                        ...prev.tyreReport,
                        [tyrePosition]: { ...prev.tyreReport[tyrePosition], condition: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                  >
                    <option value="good">{t('addCarListing.condition.rating.good') || 'Good'}</option>
                    <option value="average">{t('addCarListing.condition.rating.average') || 'Average'}</option>
                    <option value="poor">{t('addCarListing.condition.rating.poor') || 'Poor'}</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep6_ReviewPublish = () => {
    // This step renders a summary of the data entered in previous steps.
    // In a real app, you'd display the actual data.
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.steps.step6.title') || 'Review & Publish'}</h2>
          <p className="text-gray-600 mt-2">{t('addCarListing.steps.step6.description') || 'Please review your listing details before publishing.'}</p>
        </div>

        {/* Summary Cards */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">{t('addCarListing.steps.step1.title') || 'Sale Type'}</h3>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p><span className="font-medium">{t('addCarListing.steps.step1.title') || 'Sale Type'}:</span> {SALE_TYPES.find(st => st.id === saleType)?.title || saleType}</p>
            {saleType === 'direct-buy' && (
              <p><span className="font-medium">{t('addCarListing.steps.step1.directBuyPriceLabel') || 'Direct Buy Price'}:</span> ${mediaAndDescription.directBuyPrice}</p>
            )}
            {saleType === 'private-sale' && (
              <p className="text-yellow-600 flex items-center mt-1">
                <FiLink className="mr-1 h-4 w-4" />
                {t('addCarListing.steps.step1.privateSaleNoteTitle') || 'Private Listing Confirmed'}
              </p>
            )}
          </div>
        </div>

        {saleType === 'general-auction' && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">{t('addCarListing.steps.step2.title') || 'Auction Timing'}</h3>
              <button
                onClick={() => setCurrentStep(2)}
                className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
              >
                <FiEdit2 className="mr-1 h-4 w-4" />
                {t('edit') || 'Edit'}
              </button>
            </div>
            <div className="text-sm text-gray-700">
              <p><span className="font-medium">{t('addCarListing.auctionTiming.startDateLabel') || 'Start'}:</span> {auctionTiming.startDate} {auctionTiming.startTime}</p>
              <p><span className="font-medium">{t('addCarListing.auctionTiming.endDateLabel') || 'End'}:</span> {auctionTiming.endDate} {auctionTiming.endTime}</p>
              <p><span className="font-medium">{t('addCarListing.auctionTiming.timezoneLabel') || 'Timezone'}:</span> {auctionTiming.timezone}</p>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">{t('addCarListing.steps.step3.title') || 'Vehicle Identification'}</h3>
            <button
              onClick={() => setCurrentStep(3)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p><span className="font-medium">{t('addCarListing.vehicleId.makeLabel') || 'Make'}:</span> {vehicleIdentification.make}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.modelLabel') || 'Model'}:</span> {vehicleIdentification.model}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.yearLabel') || 'Year'}:</span> {vehicleIdentification.year}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.trimLabel') || 'Trim'}:</span> {vehicleIdentification.trim}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.mileageLabel') || 'Mileage'}:</span> {vehicleIdentification.mileage} {vehicleIdentification.mileageUnit}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.licensePlateLabel') || 'License Plate'}:</span> {vehicleIdentification.licensePlate}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">{t('addCarListing.steps.step4.title') || 'Media & Description'}</h3>
            <button
              onClick={() => setCurrentStep(4)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700 mb-3">
            <p><span className="font-medium">{t('addCarListing.media.headlineLabel') || 'Headline'}:</span> {mediaAndDescription.headline}</p>
            <p><span className="font-medium">{t('addCarListing.media.descriptionLabel') || 'Description'}:</span> {mediaAndDescription.description.substring(0, 100)}...</p>
            <p><span className="font-medium">{t('addCarListing.media.serviceHistoryLabel') || 'Service History'}:</span> {mediaAndDescription.serviceHistory}</p>
            <p><span className="font-medium">{t('addCarListing.media.accidentQuestion') || 'Accident'}:</span> {mediaAndDescription.hasAccident ? t('yes') || 'Yes' : t('no') || 'No'}</p>
            {mediaAndDescription.hasAccident && (
              <p><span className="font-medium">{t('addCarListing.media.accidentDetailsLabel') || 'Details'}:</span> {mediaAndDescription.accidentDetails.substring(0, 50)}...</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-2">{t('addCarListing.media.previewTitle') || 'Photos'} ({mediaAndDescription.photos.length}):</p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {mediaAndDescription.photos.slice(0, 5).map((photoUrl, index) => (
                <div key={index} className="flex-shrink-0">
                  <img src={photoUrl} alt={`Preview ${index + 1}`} className="h-16 w-16 object-cover rounded border border-gray-200" />
                </div>
              ))}
              {mediaAndDescription.photos.length > 5 && (
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-gray-100 rounded border border-gray-200">
                  <span className="text-xs text-gray-500">+{mediaAndDescription.photos.length - 5}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">{t('addCarListing.steps.step5.title') || 'Condition Assessment'}</h3>
            <button
              onClick={() => setCurrentStep(5)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-2"><span className="font-medium">{t('addCarListing.condition.technicalChecklist.title') || 'Technical Checklist'}:</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(conditionAssessment.technicalChecklist).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}:</span>
                  <span className={
                    value === 'good' ? 'text-green-600' :
                    value === 'average' ? 'text-yellow-600' :
                    value === 'poor' ? 'text-orange-600' :
                    'text-red-600'
                  }>
                    {t(`addCarListing.condition.rating.${value}`) || value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 mb-2"><span className="font-medium">{t('addCarListing.condition.interiorChecklist.title') || 'Interior Checklist'}:</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(conditionAssessment.interiorChecklist).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}:</span>
                  <span className={
                    value === 'good' ? 'text-green-600' :
                    value === 'average' ? 'text-yellow-600' :
                    value === 'poor' ? 'text-orange-600' :
                    'text-red-600'
                  }>
                    {t(`addCarListing.condition.rating.${value}`) || value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    // Conditional rendering based on sale type and current step
    if (currentStep === 2 && saleType !== 'general-auction') {
        // Skip Step 2 (Auction Timing) if not an auction
        setCurrentStep(3);
        return null; // Or render a loading/skip indicator briefly
    }

    switch (currentStep) {
      case 1: return renderStep1_SaleType();
      case 2: return renderStep2_AuctionTiming();
      case 3: return renderStep3_VehicleId();
      case 4: return renderStep4_MediaDescription();
      case 5: return renderStep5_Condition();
      case 6: return renderStep6_ReviewPublish();
      default: return <div>{t('addCarListing.unknownStep') || 'Unknown step'}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-white shadow-sm">
            <img
              src="/icon.svg"
              alt="Car Network Logo"
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('addCarListing.title') || 'Add New Car Listing'}</h1>
          <p className="text-gray-600 mt-2">{t('addCarListing.subtitle') || 'Follow the steps to list your vehicle for sale.'}</p>
        </div>

        {/* Progress Indicator */}
        {renderStepIndicator()}

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={(e) => { e.preventDefault(); }}>
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                size="md"
                onClick={handleBack}
                disabled={currentStep === 1}
                icon={<FiChevronLeft className="mr-2 h-4 w-4" />}
              >
                {t('back') || 'Back'}
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  icon={<FiChevronRight className="ml-2 h-4 w-4" />}
                  iconPosition="right"
                >
                  {t('next') || 'Next'}
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => handleSubmit('save-draft')}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('addCarListing.savingDraft') || 'Saving Draft...'}
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2 h-4 w-4" />
                        {t('addCarListing.saveDraft') || 'Save Draft'}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSubmit('publish')}
                    disabled={isSubmitting}
                    icon={<FiCheck className="ml-2 h-4 w-4" />}
                    iconPosition="right"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('addCarListing.publishing') || 'Publishing...'}
                      </>
                    ) : (
                      <>
                        {t('addCarListing.publishButton') || 'Publish Listing'}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                {errors.submit}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarListing;