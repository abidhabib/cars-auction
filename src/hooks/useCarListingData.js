// src/hooks/useCarListingData.js
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext'; 
const useCarListingData = () => {
  const { t } = useLanguage();

  // --- Initial States ---
  const INITIAL_AUCTION_TIMING = {
    preset: '3-days',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '18:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  const INITIAL_VEHICLE_IDENTIFICATION = {
    method: 'manual',
    vin: '',
    make: '',
    model: '',
    year: '',
    trim: '',
    licensePlate: '',
    mileage: '',
    mileageUnit: 'km',
    registrationDate: '',
    previousOwners: ''
  };

  const INITIAL_MEDIA_AND_DESCRIPTION = {
    photos: [],
    headline: '',
    description: '',
    serviceHistory: 'full',
    hasAccident: false,
    accidentDetails: '',
    // Note: Direct Buy Price is handled conditionally but kept here for completeness
    directBuyPrice: '' 
  };

  const INITIAL_CONDITION_ASSESSMENT = {
    damageReport: {},
    technicalChecklist: {
      engine: 'good',
      transmission: 'good',
      brakes: 'good',
      electronics: 'good',
      suspension: 'good',
      exhaust: 'good'
    },
    interiorChecklist: {
      upholstery: 'good',
      dashboard: 'good',
      seats: 'good'
    },
    tyreReport: {
      frontLeft: { condition: 'good', brand: '', treadDepth: '' },
      frontRight: { condition: 'good', brand: '', treadDepth: '' },
      rearLeft: { condition: 'good', brand: '', treadDepth: '' },
      rearRight: { condition: 'good', brand: '', treadDepth: '' }
    }
  };

  // --- Constants ---
  const TOTAL_STEPS = 7;

  const SALE_TYPES = [
    {
      id: 'direct-buy',
      title: t('addCarListing.saleTypes.directBuy.title') || 'Direct Buy',
      description: t('addCarListing.saleTypes.directBuy.description') || 'Set a fixed price. Users can buy it immediately or make bids, which you can choose to accept or decline.',
    },
    {
      id: 'general-auction',
      title: t('addCarListing.saleTypes.generalAuction.title') || 'General Auction',
      description: t('addCarListing.saleTypes.generalAuction.description') || 'Run a blind auction with a defined time window. Bidders won\'t see others\' offers. You are not obligated to accept the highest bid.',
      icon: 'FiClock'
    },
    {
      id: 'private-sale',
      title: t('addCarListing.saleTypes.privateSale.title') || 'Private Sale',
      description: t('addCarListing.saleTypes.privateSale.description') || 'Your listing will be hidden from the public. Only people with your unique link can view and bid on it.',
      icon: 'FiEye'
    }
  ];

  const AUCTION_PRESETS = [
    { id: '24-hours', label: t('addCarListing.auctionTiming.presets.24hours') || '24 Hours' },
    { id: '3-days', label: t('addCarListing.auctionTiming.presets.3days') || '3 Days' },
    { id: '5-days', label: t('addCarListing.auctionTiming.presets.5days') || '5 Days' },
    { id: '7-days', label: t('addCarListing.auctionTiming.presets.7days') || '7 Days' },
    { id: 'custom', label: t('addCarListing.auctionTiming.presets.custom') || 'Custom' }
  ];

  // --- State Management ---
  const [saleType, setSaleType] = useState('');
  const [auctionTiming, setAuctionTiming] = useState(INITIAL_AUCTION_TIMING);
  const [vehicleIdentification, setVehicleIdentification] = useState(INITIAL_VEHICLE_IDENTIFICATION);
  const [mediaAndDescription, setMediaAndDescription] = useState(INITIAL_MEDIA_AND_DESCRIPTION);
  const [conditionAssessment, setConditionAssessment] = useState(INITIAL_CONDITION_ASSESSMENT);
  const [damagePoints, setDamagePoints] = useState([]); // State for Step 5
  const [selectedOptions, setSelectedOptions] = useState([]); // State for Step 5
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vinDecodeLoading, setVinDecodeLoading] = useState(false);
  const [vinDecodeError, setVinDecodeError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  // --- Utility Functions ---

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
        // For 'custom' or invalid preset, return current state values
        return {
            startDate: auctionTiming.startDate,
            startTime: auctionTiming.startTime,
            endDate: auctionTiming.endDate,
            endTime: auctionTiming.endTime
        };
    }
    const formattedStartDate = now.toISOString().split('T')[0];
    const formattedEndDate = end.toISOString().split('T')[0];
    return {
        startDate: formattedStartDate,
        startTime: auctionTiming.startTime, // Keep existing time or use default
        endDate: formattedEndDate,
        endTime: auctionTiming.endTime // Keep existing time or use default
    };
  };

  // --- Core Logic Functions (Moved from component) ---

  const handleSaleTypeSelect = (typeId) => {
    setSaleType(typeId);
    if (typeId !== 'general-auction') {
        setAuctionTiming(INITIAL_AUCTION_TIMING);
    } else {
        const dates = calculateDatesFromPreset('3-days');
        setAuctionTiming(prev => ({ ...prev, ...dates }));
    }
  };
  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    if (Object.keys(newErrors).length === 0) {
        setErrors({}); 
        setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    } else {
        setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
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
    // Only reset preset if it wasn't already 'custom'
    if (field !== 'preset' && prev.preset !== 'custom') {
        setAuctionTiming(prevState => ({ ...prevState, preset: 'custom' }));
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
    } catch (err) {
        console.error("VIN Decode Error:", err);
        setVinDecodeError(t('addCarListing.vehicleId.vinDecodeFailed') || 'Failed to decode VIN. Please check the number and try again.');
    } finally {
        setVinDecodeLoading(false);
    }
  };

 const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
  
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
        case 1: 
            if (!saleType) newErrors.saleType = t('addCarListing.errors.saleTypeRequired') || 'Please select a sale type.';
            if (saleType === 'direct-buy' && !mediaAndDescription.directBuyPrice) {
                newErrors.directBuyPrice = t('addCarListing.errors.directBuyPriceRequired') || 'Direct buy price is required.';
            }
            break;
        case 2:
            if (saleType === 'general-auction') {
                if (!auctionTiming.startDate || !auctionTiming.startTime) {
                    newErrors.auctionStart = t('addCarListing.errors.auctionStartRequired') || 'Auction start date and time are required.';
                }
                if (!auctionTiming.endDate || !auctionTiming.endTime) {
                    newErrors.auctionEnd = t('addCarListing.errors.auctionEndRequired') || 'Auction end date and time are required.';
                }
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
                    if (diffHours > (14 * 24)) { 
                        newErrors.auctionDuration = t('addCarListing.errors.auctionTooLong') || 'Auction cannot exceed 14 days.';
                    }
                    if (endDateObj <= new Date()) {
                        newErrors.auctionEndFuture = t('addCarListing.errors.auctionEndFuture') || 'Auction end time must be in the future.';
                    }
                }
            }
            break;
        case 3: 
            if (vehicleIdentification.method === 'vin' && !vehicleIdentification.vin) {
                newErrors.vin = t('addCarListing.errors.vinRequired') || 'VIN is required.';
            }
            if (vehicleIdentification.method === 'manual') {
                if (!vehicleIdentification.make) newErrors.make = t('addCarListing.errors.makeRequired') || 'Make is required.';
                if (!vehicleIdentification.model) newErrors.model = t('addCarListing.errors.modelRequired') || 'Model is required.';
                if (!vehicleIdentification.year) newErrors.year = t('addCarListing.errors.yearRequired') || 'Year is required.';
            }
            break;
        case 4: 
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
        case 5:
            // Add validation for Step 5 if needed
            break;
        case 6:
            // Add validation for Step 6 if needed
            break;
        default:
            break;
    }
    return newErrors;
  };

  const handleSubmit = async (action) => { 
    const finalErrors = validateStep(currentStep);
    if (Object.keys(finalErrors).length === 0) {
        setIsSubmitting(true);
        try {
        
            const listingData = {
                saleType,
                auctionTiming: saleType === 'general-auction' ? auctionTiming : undefined,
                vehicleIdentification,
                mediaAndDescription,
                conditionAssessment,
                status: action === 'publish' ? 'published' : 'draft'
            };

            console.log("Submitting Listing Data:", listingData); // For debugging/demo

            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(action === 'publish' ?
                (t('addCarListing.publishSuccess') || 'Listing published successfully!') :
                (t('addCarListing.draftSaved') || 'Draft saved successfully!')
            );
        
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


  return {
    // State
    saleType, setSaleType,
    auctionTiming, setAuctionTiming,
    vehicleIdentification, setVehicleIdentification,
    mediaAndDescription, setMediaAndDescription,
    conditionAssessment, setConditionAssessment,
    damagePoints, setDamagePoints, // Step 5 state
    selectedOptions, setSelectedOptions, // Step 5 state
    errors, setErrors,
    isSubmitting, setIsSubmitting,
    vinDecodeLoading, setVinDecodeLoading,
    vinDecodeError, setVinDecodeError,
    // Add these two lines:
    currentStep, setCurrentStep, // <--- Add this line

    // Constants
    TOTAL_STEPS,
    SALE_TYPES,
    AUCTION_PRESETS,
    INITIAL_AUCTION_TIMING,
    INITIAL_VEHICLE_IDENTIFICATION,
    INITIAL_MEDIA_AND_DESCRIPTION,
    INITIAL_CONDITION_ASSESSMENT,

    // Utilities
    calculateDatesFromPreset,
    validateStep, // Add validation function

    // Core Logic
    handleSaleTypeSelect,
    handleAuctionPresetChange,
    handleAuctionTimingChange,
    handleVinDecode,
    handlePhotoUpload,
    removePhoto,
    handleNext, // Add this if you moved it to the hook
    handleBack, // Add this if you moved it to the hook
    handleSubmit, // Add submission handler
  };

};

export default useCarListingData;