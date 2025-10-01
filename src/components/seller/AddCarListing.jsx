// src/components/seller/AddCarListing.jsx
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext'; 
import { FiCheck, FiChevronLeft, FiChevronRight, FiUpload,  FiDollarSign,  FiInfo, FiEdit2, FiSave, FiEye, FiLink,FiTrash2, FiX, FiPlus } from 'react-icons/fi';
import Button from '../common/Button';
import useCarListingData from '../../hooks/useCarListingData';

const AddCarListing = () => {
  const { t } = useLanguage();
  const {
    // State (now managed by the hook)
    saleType, setSaleType,
    auctionTiming, setAuctionTiming,
    vehicleIdentification, setVehicleIdentification,
    mediaAndDescription, setMediaAndDescription,
    conditionAssessment, setConditionAssessment,
    damagePoints, setDamagePoints,
    selectedOptions, setSelectedOptions,
    errors, setErrors,
    isSubmitting, setIsSubmitting,
    vinDecodeLoading, setVinDecodeLoading,
    vinDecodeError, setVinDecodeError,
    currentStep, setCurrentStep, // <-- Assuming you moved currentStep to the hook
    // Constants (provided by the hook)
    TOTAL_STEPS,
    SALE_TYPES,
    AUCTION_PRESETS,
    // Core Logic Functions (provided by the hook)
    handleSaleTypeSelect,
    handleAuctionPresetChange,
    handleAuctionTimingChange,
    handleVinDecode,
    handlePhotoUpload,
    removePhoto,
    handleNext, // <-- Assuming you moved handleNext to the hook
    handleBack, // <-- Assuming you moved handleBack to the hook
    handleSubmit,
  } = useCarListingData(); // <-- Call the hook

  // Custom hook for managing the progress line style
  const getProgressLineStyle = (step) => {
    if (step < currentStep) {
      return 'bg-blue-500';
    }
    if (step === currentStep) {
      return 'bg-blue-300';
    }
    return 'bg-gray-200';
  };

  const renderStepIndicator = () => (
    <div className="hidden md:block w-full max-w-64">
      <div className="relative pl-8">
        {/* Vertical connector line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
        {/* Step items */}
        {[...Array(TOTAL_STEPS)].map((_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          return (
            <div
              key={step}
              className={`relative flex items-center py-4 ${
                index !== TOTAL_STEPS - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Step circle */}
              <div
                className={`absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                  isCompleted
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isActive
                    ? 'bg-blue-500 border-blue-500 text-white scale-110'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <FiCheck className="w-3 h-3" />
                ) : (
                  <span className="text-xs font-medium">{step}</span>
                )}
              </div>
              {/* Progress connector (between steps) */}
              {index > 0 && (
                <div
                  className={`absolute left-3 top-0 w-px transition-all duration-300 ${
                    isCompleted || isActive ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  style={{ height: '100%' }}
                ></div>
              )}
              {/* Step label — forced to be in one line */}
              <div
                className={`ml-8 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300 ${
                  isCompleted || isActive ? 'text-blue-700' : 'text-gray-500'
                }`}
              >
                {t(`addCarListing.stepNames.step${step}`) || `Step ${step}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

const renderStep1_SaleType = () => (
  <div className="space-y-8">
    {/* Header */}
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">
        {t('addCarListing.stepDetails.step1.title') || 'Select Sale Type'}
      </h2>
      <p className="text-gray-600 mt-2">
        {t('addCarListing.stepDetails.step1.description') || 'Choose how you want to sell your vehicle.'}
      </p>
    </div>

    {/* Sale Type Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {SALE_TYPES.map((type) => (
        <div
          key={type.id}
          onClick={() => handleSaleTypeSelect(type.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleSaleTypeSelect(type.id)}
          className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:ring-offset-2 ${
            saleType === type.id
              ? 'border-[#3b396d] bg-[#3b396d]/5 ring-2 ring-[#3b396d]/20'
              : 'border-gray-200 hover:border-[#3b396d] hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            {/* Optional: Add icon here if available */}
            {/* <div className={`p-3 rounded-full mb-4 ${saleType === type.id ? 'bg-[#3b396d] text-white' : 'bg-gray-100 text-gray-600'}`}>
              {type.icon}
            </div> */}

            <h3 className="font-semibold text-gray-900 text-lg mb-2">{type.title}</h3>
            <p className="text-sm text-gray-600">{type.description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Validation Error */}
    {errors.saleType && (
      <p className="text-red-600 text-sm text-center mt-2">{errors.saleType}</p>
    )}

    {/* Conditional: Direct Buy Price */}
    {saleType === 'direct-buy' && (
      <div className="mt-8 p-6 bg-[#f8f9ff] rounded-lg border border-gray-200 max-w-md mx-auto">
        <label htmlFor="directBuyPrice" className="block text-sm font-medium text-gray-700 mb-3">
          {t('addCarListing.saleTypes.directBuy.title') || 'Direct Buy Price ($)'}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiDollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="directBuyPrice"
            name="directBuyPrice"
            value={mediaAndDescription.directBuyPrice || ''}
            onChange={(e) =>
              setMediaAndDescription((prev) => ({
                ...prev,
                directBuyPrice: e.target.value,
              }))
            }
            min="0"
            step="100"
            className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            placeholder={t('addCarListing.saleTypes.directBuy.description') || 'Enter price'}
            aria-invalid={!!errors.directBuyPrice}
          />
        </div>
        {errors.directBuyPrice && (
          <p className="text-red-600 text-sm mt-2">{errors.directBuyPrice}</p>
        )}
      </div>
    )}

    {/* Conditional: Private Sale Note */}
    {saleType === 'private-sale' && (
      <div className="mt-6 p-5 bg-yellow-50 rounded-lg border border-yellow-200 max-w-2xl mx-auto">
        <div className="flex items-start">
          <FiInfo className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              {t('addCarListing.stepDetails.step1.privateSaleNoteTitle') || 'Private Listing Confirmed'}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              {t('addCarListing.stepDetails.step1.privateSaleNoteDesc') ||
                'Your listing will not appear in public searches. You can share the unique link with potential buyers.'}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

  const renderStep2_AuctionTiming = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step2.title') || 'Auction Timing'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step2.description') || 'Define the start and end times for your auction.'}</p>
      </div>
      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('addCarListing.auctionTiming.presetLabel') || 'Quick Select Duration'}
        </label>
        <div className="flex flex-wrap gap-3">
          {AUCTION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleAuctionPresetChange(preset.id)}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
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
      <div className={`space-y-6 transition-all duration-300 ${auctionTiming.preset === 'custom' ? 'opacity-100 max-h-screen' : 'opacity-100 max-h-screen'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              min={auctionTiming.startDate || new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
        </div>
      </div>
      {/* Timezone Info */}
      <div className="text-xs text-gray-500 flex items-center mt-2">
        <FiInfo className="mr-1.5 h-4 w-4" />
        {t('addCarListing.auctionTiming.timezoneInfo', { timezone: auctionTiming.timezone }) || `Times are in your local timezone: ${auctionTiming.timezone}`}
      </div>
      {/* Validation Errors for Auction Timing */}
      {(errors.auctionStart || errors.auctionEnd || errors.auctionDates || errors.auctionDuration || errors.auctionEndFuture) && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step3.title') || 'Vehicle Identification'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step3.description') || 'Provide the core details of your vehicle.'}</p>
      </div>
      {/* Identification Method */}
      <div className="bg-gray-50 rounded-lg p-5">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-4">{t('addCarListing.vehicleId.methodLabel') || 'How would you like to identify your vehicle?'}</legend>
          <div className="space-y-4">
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
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-3">
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            <button
              type="button"
              onClick={handleVinDecode}
              disabled={vinDecodeLoading || !vehicleIdentification.vin}
              className={`px-5 py-3 rounded-r-lg font-medium ${
                vinDecodeLoading || !vehicleIdentification.vin
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#3b396d] text-white hover:bg-[#2a285a]'
              }`}
            >
              {vinDecodeLoading ? (t('addCarListing.vehicleId.decoding') || 'Decoding...') : (t('addCarListing.vehicleId.decodeButton') || 'Decode VIN')}
            </button>
          </div>
          {vinDecodeError && <p className="mt-3 text-sm text-red-600">{vinDecodeError}</p>}
          <p className="mt-3 text-xs text-gray-500 flex items-center">
            <FiInfo className="mr-1 h-3 w-3" />
            {t('addCarListing.vehicleId.vinHelper') || 'The 17-character VIN is usually found on the dashboard (driver\'s side), door jamb, or engine bay.'}
          </p>
        </div>
      )}
      {/* Manual Entry Fields */}
      {vehicleIdentification.method === 'manual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4_MediaDescription = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step4.title') || 'Visual Documentation & Description'}</h2>
          <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step4.description') || 'Add photos and tell the story of your vehicle.'}</p>
        </div>
        {/* Smart Photo Upload */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {t('addCarListing.media.photosLabel') || 'Photos'} *
            </label>
            <span className="text-xs text-gray-500">
              {mediaAndDescription.photos.length}/28 { 'photos uploaded'}
            </span>
          </div>
          {/* Smart Upload Grid */}
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Dynamic Photo Upload */}
              {mediaAndDescription.photos.map((photoUrl, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-full h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                    <img
                      src={photoUrl}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                      aria-label={t('addCarListing.media.removePhoto') || "Remove photo"}
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                Photo {index + 1}
                  </span>
                </div>
              ))}
              {/* Smart Upload Button (only show if under limit) */}
              {mediaAndDescription.photos.length < 28 && (
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-24 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                    <FiUpload className="h-6 w-6 text-blue-500" />
                    <span className="text-xs text-blue-600 mt-2 text-center px-2">
                   Add Photo
                    </span>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e)}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2 text-center">
                    {t('media.maxPhotos') || 'Max. 28 photos'}
                  </span>
                </div>
              )}
            </div>
          </div>
          {errors.photos && <p className="mt-3 text-sm text-red-600">{errors.photos}</p>}
        </div>
        {/* Description Fields */}
        <div className="space-y-6">
          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-3">
              {t('addCarListing.media.headlineLabel') || 'Listing Headline'} *
            </label>
            <input
              type="text"
              id="headline"
              value={mediaAndDescription.headline}
              onChange={(e) => setMediaAndDescription(prev => ({ ...prev, headline: e.target.value }))}
              placeholder={t('addCarListing.media.headlinePlaceholder') || 'e.g., 2020 BMW X5 xDrive40i in Excellent Condition'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            {errors.headline && <p className="mt-2 text-sm text-red-600">{errors.headline}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-3">
              {t('addCarListing.media.descriptionLabel') || 'Full Description'} *
            </label>
            <textarea
              id="description"
              rows={6}
              value={mediaAndDescription.description}
              onChange={(e) => setMediaAndDescription(prev => ({ ...prev, description: e.target.value }))}
              placeholder={t('addCarListing.media.descriptionPlaceholder') || 'Describe the vehicle in detail, including its history, features, condition, and any unique aspects. What makes it special?'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            />
            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="serviceHistory" className="block text-sm font-medium text-gray-700 mb-3">
                {t('addCarListing.media.serviceHistoryLabel') || 'Service History'}
              </label>
              <select
                id="serviceHistory"
                value={mediaAndDescription.serviceHistory}
                onChange={(e) => setMediaAndDescription(prev => ({ ...prev, serviceHistory: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              >
                <option value="full">{t('addCarListing.media.serviceHistory.full') || 'Full'}</option>
                <option value="partial">{t('addCarListing.media.serviceHistory.partial') || 'Partial'}</option>
                <option value="none">{t('addCarListing.media.serviceHistory.none') || 'None'}</option>
              </select>
            </div>
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-3">
                  {t('addCarListing.media.accidentQuestion') || 'Has the car been in an accident?'}
                </legend>
                <div className="flex space-x-6">
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
                  <div className="flex items-center">
                    <input
                      id="accident-no"
                      name="has-accident"
                      type="radio"
                      checked={mediaAndDescription.hasAccident === false}
                      onChange={() => setMediaAndDescription(prev => ({ ...prev, hasAccident: false, accidentDetails: '' }))}
                      className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                    />
                    <label htmlFor="accident-no" className="ml-2 block text-sm text-gray-700">
                      {t('no') || 'No'}
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          {/* Conditional Accident Details */}
          {mediaAndDescription.hasAccident && (
            <div>
              <label htmlFor="accident-details" className="block text-sm font-medium text-gray-700 mb-3">
                {t('addCarListing.media.accidentDetailsLabel') || 'Accident Details'} *
              </label>
              <textarea
                id="accident-details"
                rows={4}
                value={mediaAndDescription.accidentDetails}
                onChange={(e) => setMediaAndDescription(prev => ({ ...prev, accidentDetails: e.target.value }))}
                placeholder={t('addCarListing.media.accidentDetailsPlaceholder') || 'Please describe the nature and extent of the accident damage.'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
              />
              {errors.accidentDetails && <p className="mt-2 text-sm text-red-600">{errors.accidentDetails}</p>}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep5_ExteriorOptions = () => {
    const handleDamagePointClick = (position) => {
      if (damagePoints.includes(position)) {
        setDamagePoints(prev => prev.filter(p => p !== position));
      } else {
        setDamagePoints(prev => [...prev, position]);
      }
    };

    const handleOptionChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(prev => prev.filter(o => o !== option));
      } else {
        setSelectedOptions(prev => [...prev, option]);
      }
    };

    const resetAll = () => {
      setDamagePoints([]);
      setSelectedOptions([]);
    };

    const getPositionLabel = (position) => {
      const labels = {
        'front-left': t('addCarListing.exterior.frontLeft') || 'Front Left',
        'front-right': t('addCarListing.exterior.frontRight') || 'Front Right',
        'left-side': t('addCarListing.exterior.leftSide') || 'Left Side',
        'right-side': t('addCarListing.exterior.rightSide') || 'Right Side',
        'rear-left': t('addCarListing.exterior.rearLeft') || 'Rear Left',
        'rear-right': t('addCarListing.exterior.rearRight') || 'Rear Right',
        'roof': t('addCarListing.exterior.roof') || 'Roof',
        'trunk': t('addCarListing.exterior.trunk') || 'Trunk'
      };
      return labels[position] || position.replace('-', ' ');
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step5.title') || 'Exterior & Options'}</h2>
          <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step5.description') || 'Mark any damages and select exterior options.'}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-lg border border-gray-200 p-6">
  <div className="flex items-center justify-between mb-5">
    <h3 className="text-lg font-semibold text-gray-900">
      {t('addCarListing.exterior.damageTitle') || 'Exterior | Damages'}
    </h3>
    <button
      onClick={resetAll}
      className="text-sm text-red-600 hover:text-red-800 font-medium"
    >
      {t('addCarListing.exterior.reset') || 'Reset'}
    </button>
  </div>
  <div className="mb-5">
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={damagePoints.length === 0}
        onChange={() => {
          if (damagePoints.length > 0) {
            setDamagePoints([]);
          }
        }}
        className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
      />
      <span className="ml-2 text-sm text-gray-700">
        {t('addCarListing.exterior.noDamage') || 'Vehicle has no exterior damage'}
      </span>
    </label>
  </div>
  <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
    <img
      src="/exterior_view.png"
      alt="Car top view"
      className="w-full h-full object-contain opacity-50"
    />
    {/* Damage points overlay */}
    {/* REMOVED 'pointer-events-none' from the next line. This was blocking clicks. */}
    <div className="absolute inset-0">
      {/* Front left */}
      <button
        onClick={() => handleDamagePointClick('front-left')}
        className={`absolute top-1/4 left-1/4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('front-left') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Front left damage"
      >
        {damagePoints.includes('front-left') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Front right */}
      <button
        onClick={() => handleDamagePointClick('front-right')}
        className={`absolute top-1/4 right-1/4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('front-right') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Front right damage"
      >
        {damagePoints.includes('front-right') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Left side */}
      <button
        onClick={() => handleDamagePointClick('left-side')}
        className={`absolute top-1/2 left-1/4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('left-side') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Left side damage"
      >
        {damagePoints.includes('left-side') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Right side */}
      <button
        onClick={() => handleDamagePointClick('right-side')}
        className={`absolute top-1/2 right-1/4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('right-side') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Right side damage"
      >
        {damagePoints.includes('right-side') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Rear left */}
      <button
        onClick={() => handleDamagePointClick('rear-left')}
        className={`absolute bottom-1/4 left-1/4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('rear-left') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Rear left damage"
      >
        {damagePoints.includes('rear-left') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Rear right */}
      <button
        onClick={() => handleDamagePointClick('rear-right')}
        className={`absolute bottom-1/4 right-1/4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('rear-right') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Rear right damage"
      >
        {damagePoints.includes('rear-right') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Roof */}
      <button
        onClick={() => handleDamagePointClick('roof')}
        className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('roof') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Roof damage"
      >
        {damagePoints.includes('roof') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
      {/* Trunk */}
      <button
        onClick={() => handleDamagePointClick('trunk')}
        className={`absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          damagePoints.includes('trunk') 
            ? 'bg-red-500 scale-110 z-10' 
            : 'bg-white bg-opacity-70 hover:bg-opacity-100'
        }`}
        aria-label="Trunk damage"
      >
        {damagePoints.includes('trunk') && (
          <FiX className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  </div>
  {/* Selected Damage Areas */}
  {damagePoints.length > 0 && (
    <div className="mt-5">
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        {t('addCarListing.exterior.selectedDamages') || 'Selected Damage Areas'}
      </h4>
      <div className="flex flex-wrap gap-3">
        {damagePoints.map((point) => (
          <span
            key={point}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-800"
          >
            {getPositionLabel(point)}
          </span>
        ))}
      </div>
    </div>
  )}
</div>
          {/* Exterior Options Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('addCarListing.exterior.optionsTitle') || 'Exterior | Options'}
              </h3>
              <button
                onClick={resetAll}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                {t('addCarListing.exterior.reset') || 'Reset'}
              </button>
            </div>
            <div className="mb-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedOptions.length === 0}
                  onChange={() => {
                    if (selectedOptions.length > 0) {
                      setSelectedOptions([]);
                    }
                  }}
                  className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {t('addCarListing.exterior.noOptions') || 'Vehicle has no exterior options'}
                </span>
              </label>
            </div>
            <div className="space-y-4">
              {[
               { value: 'alloy-wheels', label: 'Alloy wheels' },
  { value: 'metallic-paint', label: 'Metallic paint' },
  { value: 'panoramic-roof', label: 'Panoramic roof' },
  { value: 'sunroof', label: 'Sunroof / open roof' },
  { value: 'parking-sensors', label: 'Parking sensors' },
  { value: 'backup-camera', label: 'Backup camera' },
  { value: 'tow-hitch', label: 'Tow hitch' },
  { value: 'air-suspension', label: 'Air suspension' },
  { value: 'xenon-headlights', label: 'Xenon headlights' },
  { value: 'led-lighting', label: 'LED lighting' } 
              
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleOptionChange(option.value)}
                    className="h-4 w-4 text-[#3b396d] focus:ring-[#3b396d] border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {/* Extra options dropdown */}
            <div className="mt-5">
              <label htmlFor="extra-options" className="block text-sm font-medium text-gray-700 mb-3">
                {t('addCarListing.exterior.extraOptions') || 'Extra options'}
              </label>
              <select
                id="extra-options"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
              >
                <option value="">{t('addCarListing.exterior.selectExtra') || 'Select extra options...'}</option>
                <option value="custom-bodykit">Custom body kit</option>
                <option value="carbon-fiber">Carbon fiber parts</option>
                <option value="spoiler">Spoiler</option>
                <option value="custom-exhaust">Custom exhaust</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Selected Options List */}
            {selectedOptions.length > 0 && (
              <div className="mt-5">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  {t('addCarListing.exterior.selectedOptions') || 'Selected Options'}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedOptions.map((option) => (
                    <span
                      key={option}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      { option.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStep6_TyresRims = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step6.title') || 'Tyres & Rims'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step6.description') || 'Provide detailed information about the tyres and rims.'}</p>
      </div>
      {/* Tyre Report Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-800 mb-5">
          {t('addCarListing.condition.tyreReport.title') || 'Tyre Report'}
        </h3>
        {/* Grid for Tyre Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {/* Safely map over tyre report entries */}
          {Object.entries(conditionAssessment.tyreReport || {}).map(([tyrePosition, tyreData]) => (
            <div key={tyrePosition} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {/* Improved tyre position label formatting */}
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                {tyrePosition
                  .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                  .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                }
              </h4>
              <div className="space-y-3">
                {/* Tyre Brand Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t('addCarListing.condition.tyreReport.brand') || 'Brand'}
                  </label>
                  <input
                    type="text"
                    value={tyreData?.brand || ''} 
                    onChange={(e) => setConditionAssessment(prev => ({
                      ...prev,
                      tyreReport: {
                        ...prev.tyreReport,
                        [tyrePosition]: { ...prev.tyreReport[tyrePosition], brand: e.target.value }
                      }
                    }))}
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                    placeholder={t('addCarListing.condition.tyreReport.brandPlaceholder') || 'e.g., Michelin'}
                  />
                </div>
                {/* Tread Depth Input (Updated to Select) */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t('addCarListing.condition.tyreReport.treadDepth') || 'Tread Depth'}
                  </label>
                  <select
                    value={tyreData?.treadDepth || ''}
                    onChange={(e) => setConditionAssessment(prev => ({
                      ...prev,
                      tyreReport: {
                        ...prev.tyreReport,
                        [tyrePosition]: { ...prev.tyreReport[tyrePosition], treadDepth: e.target.value }
                      }
                    }))}
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
                  >
                    <option value=""> Depth</option>
                    <option value="<3mm">{"<3mm"}</option>
                    <option value="3-5mm">{"3-5mm"}</option>
                    <option value=">5mm">{">5mm"}</option>
                  </select>
                </div>
                {/* Tyre Condition Select */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t('addCarListing.condition.tyreReport.condition') || 'Condition'}
                  </label>
                  <select
                    value={tyreData?.condition || 'good'}
                    onChange={(e) => setConditionAssessment(prev => ({
                      ...prev,
                      tyreReport: {
                        ...prev.tyreReport,
                        [tyrePosition]: { ...prev.tyreReport[tyrePosition], condition: e.target.value }
                      }
                    }))}
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
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

  const renderStep7_Interior = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step7.title') || 'Interior Condition'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step7.description') || 'Assess the condition of the vehicle\'s interior.'}</p>
      </div>
      {/* Interior Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <label htmlFor="interiorScore" className="block text-sm font-medium text-gray-700 mb-3">
            {t('addCarListing.condition.interiorScore') || 'Overall Interior Condition Score (1-10)'}
          </label>
          <input
            type="number"
            id="interiorScore"
            min="1"
            max="10"
            value={conditionAssessment.interiorScore || ''}
            onChange={(e) => setConditionAssessment(prev => ({ ...prev, interiorScore: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            placeholder={t('addCarListing.condition.scorePlaceholder') || 'e.g., 8'}
          />
        </div>
      </div>
      {/* Interior Checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-800 mb-5">
          {t('addCarListing.condition.interiorChecklist.title') || 'Interior Checklist'}
        </h3>
        <div className="space-y-4">
          {/* Safely map over interior checklist entries */}
          {Object.entries(conditionAssessment.interiorChecklist || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span> {/* Consistent key formatting */}
              <select
                value={value}
                onChange={(e) => setConditionAssessment(prev => ({
                  ...prev,
                  interiorChecklist: { ...prev.interiorChecklist, [key]: e.target.value }
                }))}
                className="text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
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
  );

  const renderStep8_Technical = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step8.title') || 'Technical Condition'}</h2>
        <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step8.description') || 'Assess the technical condition of the vehicle.'}</p>
      </div>
      {/* Technical Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <label htmlFor="technicalScore" className="block text-sm font-medium text-gray-700 mb-3">
            {t('addCarListing.condition.technicalScore') || 'Overall Technical Condition Score (1-10)'}
          </label>
          <input
            type="number"
            id="technicalScore"
            min="1"
            max="10"
            value={conditionAssessment.technicalScore || ''}
            onChange={(e) => setConditionAssessment(prev => ({ ...prev, technicalScore: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d] transition"
            placeholder={t('addCarListing.condition.scorePlaceholder') || 'e.g., 9'}
          />
        </div>
      </div>
      {/* Technical Checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-800 mb-5">
          {t('addCarListing.condition.technicalChecklist.title') || 'Technical Checklist'}
        </h3>
        <div className="space-y-4">
          {/* Safely map over technical checklist entries */}
          {Object.entries(conditionAssessment.technicalChecklist || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span> {/* Consistent key formatting */}
              <select
                value={value}
                onChange={(e) => setConditionAssessment(prev => ({
                  ...prev,
                  technicalChecklist: { ...prev.technicalChecklist, [key]: e.target.value }
                }))}
                className="text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3b396d] focus:border-[#3b396d]"
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
    </div>
  );

  const renderStep9_ReviewPublish = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('addCarListing.stepDetails.step9.title') || 'Review & Publish'}</h2>
          <p className="text-gray-600 mt-2">{t('addCarListing.stepDetails.step9.description') || 'Please review your listing details before publishing.'}</p>
        </div>
        {/* Summary Cards */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step1.title') || 'Sale Type'}</h3>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p><span className="font-medium">{t('addCarListing.stepDetails.step1.title') || 'Sale Type'}:</span> {SALE_TYPES.find(st => st.id === saleType)?.title || saleType}</p>
            {saleType === 'direct-buy' && (
              <p><span className="font-medium">{t('addCarListing.stepDetails.step1.directBuyPriceLabel') || 'Direct Buy Price'}:</span> ${mediaAndDescription.directBuyPrice}</p>
            )}
            {saleType === 'private-sale' && (
              <p className="text-yellow-600 flex items-center mt-2">
                <FiLink className="mr-1 h-4 w-4" />
                {t('addCarListing.stepDetails.step1.privateSaleNoteTitle') || 'Private Listing Confirmed'}
              </p>
            )}
          </div>
        </div>
        {saleType === 'general-auction' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step2.title') || 'Auction Timing'}</h3>
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
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step3.title') || 'Vehicle Identification'}</h3>
            <button
              onClick={() => setCurrentStep(3)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p><span className="font-medium">{t('addCarListing.vehicleId.makeLabel') || 'Make'}:</span> {vehicleIdentification.make}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.modelLabel') || 'Model'}:</span> {vehicleIdentification.model}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.yearLabel') || 'Year'}:</span> {vehicleIdentification.year}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.trimLabel') || 'Trim'}:</span> {vehicleIdentification.trim}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.mileageLabel') || 'Mileage'}:</span> {vehicleIdentification.mileage} {vehicleIdentification.mileageUnit}</p>
            <p><span className="font-medium">{t('addCarListing.vehicleId.licensePlateLabel') || 'License Plate'}:</span> {vehicleIdentification.licensePlate}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step4.title') || 'Media & Description'}</h3>
            <button
              onClick={() => setCurrentStep(4)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700 mb-4">
            <p><span className="font-medium">{t('addCarListing.media.headlineLabel') || 'Headline'}:</span> {mediaAndDescription.headline}</p>
            <p><span className="font-medium">{t('addCarListing.media.descriptionLabel') || 'Description'}:</span> {mediaAndDescription.description.substring(0, 100)}...</p>
            <p><span className="font-medium">{t('addCarListing.media.serviceHistoryLabel') || 'Service History'}:</span> {mediaAndDescription.serviceHistory}</p>
            <p><span className="font-medium">{t('addCarListing.media.accidentQuestion') || 'Accident'}:</span> {mediaAndDescription.hasAccident ? t('yes') || 'Yes' : t('no') || 'No'}</p>
            {mediaAndDescription.hasAccident && (
              <p><span className="font-medium">{t('addCarListing.media.accidentDetailsLabel') || 'Details'}:</span> {mediaAndDescription.accidentDetails.substring(0, 50)}...</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-3">{t('addCarListing.media.previewTitle') || 'Photos'} ({mediaAndDescription.photos.length}):</p>
            <div className="flex space-x-3 overflow-x-auto pb-3">
              {mediaAndDescription.photos.slice(0, 5).map((photoUrl, index) => (
                <div key={index} className="flex-shrink-0">
                  <img src={photoUrl} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded border border-gray-200" />
                </div>
              ))}
              {mediaAndDescription.photos.length > 5 && (
                <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 bg-gray-100 rounded border border-gray-200">
                  <span className="text-xs text-gray-500">+{mediaAndDescription.photos.length - 5}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step5.title') || 'Exterior & Options'}</h3>
            <button
              onClick={() => setCurrentStep(5)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-3"><span className="font-medium">{t('addCarListing.exterior.damageTitle') || 'Damages'}:</span> {damagePoints.length > 0 ? damagePoints.map(p => getPositionLabel(p)).join(', ') : t('addCarListing.exterior.noDamage') || 'None'}</p>
            <p className="mb-3"><span className="font-medium">{t('addCarListing.exterior.optionsTitle') || 'Options'}:</span> {selectedOptions.length > 0 ? selectedOptions.map(o => t(`addCarListing.exterior.${o}`) || o).join(', ') : t('addCarListing.exterior.noOptions') || 'None'}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step6.title') || 'Tyres & Rims'}</h3>
            <button
              onClick={() => setCurrentStep(6)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(conditionAssessment.tyreReport).map(([position, data]) => (
                <div key={position} className="mb-2">
                  <span className="font-medium capitalize">{position}:</span> {data.brand} | {data.treadDepth} | {t(`addCarListing.condition.rating.${data.condition}`) || data.condition}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step7.title') || 'Interior'}</h3>
            <button
              onClick={() => setCurrentStep(7)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-3"><span className="font-medium">{t('addCarListing.condition.interiorScore') || 'Overall Score'}:</span> {conditionAssessment.interiorScore}/10</p>
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
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-gray-800">{t('addCarListing.stepDetails.step8.title') || 'Technical'}</h3>
            <button
              onClick={() => setCurrentStep(8)}
              className="text-[#3b396d] hover:text-[#2a285a] text-sm font-medium flex items-center"
            >
              <FiEdit2 className="mr-1 h-4 w-4" />
              {t('edit') || 'Edit'}
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-3"><span className="font-medium">{t('addCarListing.condition.technicalScore') || 'Overall Score'}:</span> {conditionAssessment.technicalScore}/10</p>
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
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    if (currentStep === 2 && saleType !== 'general-auction') {
        setCurrentStep(3);
        return null;
    }

    switch (currentStep) {
      case 1: return renderStep1_SaleType();
      case 2: return renderStep2_AuctionTiming();
      case 3: return renderStep3_VehicleId();
      case 4: return renderStep4_MediaDescription();
      case 5: return renderStep5_ExteriorOptions();
      case 6: return renderStep6_TyresRims();
      case 7: return renderStep7_Interior();
      case 8: return renderStep8_Technical();
      case 9: return renderStep9_ReviewPublish();
      default: return <div>{t('addCarListing.unknownStep') || 'Unknown step'}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 ">{t('addCarListing.title') || 'Add New Car Listing'}</h1>
          <p className="text-gray-600 mt-3 mb-12">{t('addCarListing.subtitle') || 'Follow the steps to list your vehicle for sale.'}</p>
        </div>
        {/* Main Content with Left Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Progress Tracker (Sticky) */}
          <div className="relative md:w-64 flex-shrink-0 mb-8 md:mb-0">
            <div className="sticky top-8">
              {renderStepIndicator()}
            </div>
          </div>
          {/* Main Form Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form onSubmit={(e) => { e.preventDefault(); }}>
                {renderCurrentStep()}
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-10 border-t border-gray-200 mt-8">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    icon={<FiChevronLeft className="mr-2 h-4 w-4" />}
                  >
                    {t('back') || 'Back'}
                  </Button>
                  {currentStep < 9 ? (
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
                    <div className="flex space-x-4">
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
                  <div className="mt-8 p-5 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                    {errors.submit}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarListing;