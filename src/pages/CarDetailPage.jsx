// src/pages/CarDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiMapPin, 
  FiClock, 
  FiStar,
  FiCheckCircle,
  FiDollarSign,
  FiCalendar,
  FiTool,
  FiSettings,
  FiInfo,
  FiFileText,
  FiUser,
  FiTag,
  FiNavigation,
  FiWind,
  FiZap,
  FiAlertTriangle,
  FiX,
  FiCamera,
  FiImage
} from 'react-icons/fi';
import { loadMockCarsData } from '../data/mockCarsData';

const CarDetailPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0); // For step 4 photo grid

  useEffect(() => {
    const mockCars = loadMockCarsData();
    const selectedCar = mockCars.find(c => c.id === carId);
    setCar(selectedCar);
  }, [carId]);

  const nextImage = () => {
    if (car) {
      const images = car.mediaAndDescription?.photos || [car.image];
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (car) {
      const images = car.mediaAndDescription?.photos || [car.image];
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US');
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US') + 
           ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'good': return 'text-green-600';
      case 'average': return 'text-yellow-600';
      case 'poor': return 'text-orange-600';
      case 'not-working': return 'text-red-600';
      case 'worn': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConditionText = (condition) => {
    return t(`addCarListing.condition.rating.${condition}`) || condition;
  };

  const renderDamagePoints = () => {
    if (!car.damagePoints || car.damagePoints.length === 0) {
      return <span className="text-green-600">{t('buyCars.noDamage') || 'No damage reported'}</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {car.damagePoints.map((point, index) => (
          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
            { point}
          </span>
        ))}
      </div>
    );
  };

  const renderSelectedOptions = () => {
    if (!car.selectedOptions || car.selectedOptions.length === 0) {
      return <span className="text-gray-500">{t('buyCars.noOptions') || 'No options selected'}</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {car.selectedOptions.map((option, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {t(`addCarListing.exterior.${option}`) || option.replace(/-/g, ' ')}
          </span>
        ))}
      </div>
    );
  };

  const openFullscreenImage = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  // Function to handle photo click in the Step 4 grid
  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
    openFullscreenImage(car.mediaAndDescription.photos[index]);
  };

  if (!car) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t('buyCars.loading') || 'Loading...'}</div>
      </div>
    );
  }

  const images = car.mediaAndDescription?.photos || [car.image];

  // Define photo positions for labels (based on renderStep4_MediaDescription)
  const photoPositions = [
    t('addCarListing.media.frontLeft') || 'Front left',
    t('addCarListing.media.frontRight') || 'Front right',
    t('addCarListing.media.leftRear') || 'Left rear',
    t('addCarListing.media.rightRear') || 'Right rear',
    t('addCarListing.media.dashboard') || 'Dashboard',
    t('addCarListing.media.odometer') || 'Odometer',
    t('addCarListing.media.interior') || 'Interior'
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#3b396d] hover:text-[#2a285a] mb-6"
      >
        <FiChevronLeft className="mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Image Gallery */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`${car.vehicleIdentification?.make} ${car.vehicleIdentification?.model}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openFullscreenImage(images[currentImageIndex])}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 hover:bg-opacity-100 transition-opacity"
              >
                <FiChevronLeft className="h-6 w-6 text-[#3b396d]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 hover:bg-opacity-100 transition-opacity"
              >
                <FiChevronRight className="h-6 w-6 text-[#3b396d]" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-[#3b396d]' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {car.vehicleIdentification?.year} {car.vehicleIdentification?.make} {car.vehicleIdentification?.model}
                {car.vehicleIdentification?.trim && (
                  <span className="text-xl font-normal text-gray-600 ml-2">({car.vehicleIdentification?.trim})</span>
                )}
              </h1>
              <div className="flex items-center mt-2">
                <FiMapPin className="mr-1 text-gray-500" />
                <span className="text-gray-600">{car.location}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-4xl font-bold text-[#3b396d]">
                €{car.price?.toLocaleString()}
              </div>
              {car.saleType === 'direct-buy' && car.mediaAndDescription?.directBuyPrice && (
                <div className="text-gray-600">
                  {t('buyCars.buyItNow')}: €{parseInt(car.mediaAndDescription.directBuyPrice)?.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">{t('buyCars.mileage') || 'Mileage'}</div>
              <div className="font-semibold">
                {parseInt(car.vehicleIdentification?.mileage)?.toLocaleString()} {car.vehicleIdentification?.mileageUnit}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">{t('buyCars.fuelType') || 'Fuel Type'}</div>
              <div className="font-semibold">{car.fuelType}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">{t('buyCars.transmission') || 'Transmission'}</div>
              <div className="font-semibold">{car.transmission}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">{t('buyCars.condition') || 'Condition'}</div>
              <div className="font-semibold">{car.condition}</div>
            </div>
          </div>

          {/* Auction Info */}
          {car.saleType === 'general-auction' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-800">{t('buyCars.auctionInfo') || 'Auction Information'}</h3>
                  <p className="text-sm text-blue-600">
                    {t('buyCars.auctionEnds')}: {formatDateTime(car.auctionTiming?.endDate + 'T' + car.auctionTiming?.endTime)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#3b396d]">
                    {car.bids} {t('buyCars.bids') || 'Bids'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('buyCars.highestBid')}: €{car.highestBid?.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="flex-1 bg-[#3b396d] text-white py-3 px-4 rounded-lg hover:bg-[#2a285a] transition-colors">
                  {t('buyCars.placeBid') || 'Place Bid'}
                </button>
                {car.buyItNowPrice && (
                  <button className="flex-1 border border-[#3b396d] text-[#3b396d] py-3 px-4 rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors">
                    {t('buyCars.buyItNow') || 'Buy It Now'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Media & Description (Step 4) - Enhanced Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCamera className="mr-2" />
              {t('addCarListing.stepDetails.step4.title') || 'Visual Documentation & Description'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.media.headlineLabel') || 'Listing Headline'}</h4>
                <p className="text-gray-700">{car.mediaAndDescription?.headline}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.media.descriptionLabel') || 'Full Description'}</h4>
                <p className="text-gray-700 leading-relaxed">{car.mediaAndDescription?.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t('buyCars.serviceHistory') || 'Service History'}</h4>
                <p className="text-gray-700 capitalize">{car.mediaAndDescription?.serviceHistory}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t('buyCars.accidentHistory') || 'Accident History'}</h4>
                <p className="text-gray-700">
                  {car.mediaAndDescription?.hasAccident 
                    ? t('yes') || 'Yes' 
                    : t('no') || 'No'}
                </p>
                {car.mediaAndDescription?.hasAccident && car.mediaAndDescription?.accidentDetails && (
                  <p className="text-gray-700 mt-1">{car.mediaAndDescription.accidentDetails}</p>
                )}
              </div>
            </div>
            
            {/* Photo Gallery (Step 4 Specific Positions + Extras) */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <FiImage className="mr-2" />
                {t('addCarListing.media.photosLabel') || 'Photos'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.map((photo, index) => {
                  // Determine label based on index
                  let label = `${t('addCarListing.media.additional') || 'Additional'} ${index - photoPositions.length + 1}`;
                  if (index < photoPositions.length) {
                    label = photoPositions[index];
                  }
                  
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => handlePhotoClick(index)}
                    >
                      <div className="relative w-full h-24 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition-shadow">
                        <img 
                          src={photo} 
                          alt={label} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600 mt-1 text-center truncate w-full px-1">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vehicle Identification */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiInfo className="mr-2" />
              {t('buyCars.vehicleIdentification') || 'Vehicle Identification'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.makeLabel') || 'Make'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.make}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.modelLabel') || 'Model'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.model}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.yearLabel') || 'Year'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.year}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.trimLabel') || 'Trim'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.trim || '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.mileageLabel') || 'Mileage'}</div>
                <div className="font-semibold">
                  {parseInt(car.vehicleIdentification?.mileage)?.toLocaleString()} {car.vehicleIdentification?.mileageUnit}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.licensePlateLabel') || 'License Plate'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.licensePlate || '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.registrationDateLabel') || 'Registration Date'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.registrationDate || '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">{t('addCarListing.vehicleId.previousOwnersLabel') || 'Previous Owners'}</div>
                <div className="font-semibold">{car.vehicleIdentification?.previousOwners || '0'}</div>
              </div>
            </div>
          </div>

          {/* Condition Assessment */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiTool className="mr-2" />
              {t('buyCars.conditionAssessment') || 'Condition Assessment'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">{t('addCarListing.condition.technicalChecklist.title') || 'Technical Checklist'}</h4>
                <div className="space-y-2">
                  {Object.entries(car.conditionAssessment?.technicalChecklist || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span>
                      <span className={`font-medium ${getConditionColor(value)}`}>
                        {getConditionText(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">{t('addCarListing.condition.interiorChecklist.title') || 'Interior Checklist'}</h4>
                <div className="space-y-2">
                  {Object.entries(car.conditionAssessment?.interiorChecklist || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span>
                      <span className={`font-medium ${getConditionColor(value)}`}>
                        {getConditionText(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mb-3">{t('addCarListing.condition.tyreReport.title') || 'Tyre Report'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(car.conditionAssessment?.tyreReport || {}).map(([position, tyreData]) => (
                <div key={position} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <h5 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                    {position.replace(/([A-Z])/g, ' $1')}
                  </h5>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="text-gray-500">{t('addCarListing.condition.tyreReport.brand') || 'Brand'}:</span>{' '}
                      <span className="font-medium">{tyreData.brand || '-'}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-500">{t('addCarListing.condition.tyreReport.treadDepth') || 'Tread'}:</span>{' '}
                      <span className="font-medium">{tyreData.treadDepth ? `${tyreData.treadDepth}mm` : '-'}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-500">{t('addCarListing.condition.tyreReport.condition') || 'Condition'}:</span>{' '}
                      <span className={`font-medium ${getConditionColor(tyreData.condition)}`}>
                        {getConditionText(tyreData.condition)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exterior Options & Damages */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiSettings className="mr-2" />
              {t('buyCars.exteriorOptions') || 'Exterior Options & Damages'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.exterior.damageTitle') || 'Damages'}</h4>
                {renderDamagePoints()}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.exterior.optionsTitle') || 'Options'}</h4>
                {renderSelectedOptions()}
              </div>
            </div>
          </div>

          {/* Auction Timing (for auction listings) */}
          {car.saleType === 'general-auction' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiCalendar className="mr-2" />
                {t('buyCars.auctionTiming') || 'Auction Timing'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">{t('addCarListing.auctionTiming.startDateLabel') || 'Start Date'}</div>
                  <div className="font-semibold">{formatDateTime(car.auctionTiming?.startDate + 'T' + car.auctionTiming?.startTime)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">{t('addCarListing.auctionTiming.endDateLabel') || 'End Date'}</div>
                  <div className="font-semibold">{formatDateTime(car.auctionTiming?.endDate + 'T' + car.auctionTiming?.endTime)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">{t('addCarListing.auctionTiming.timezoneLabel') || 'Timezone'}</div>
                  <div className="font-semibold">{car.auctionTiming?.timezone}</div>
                </div>
              </div>
            </div>
          )}

          {/* Seller Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="mr-2" />
              {t('buyCars.sellerInfo') || 'Seller Information'}
            </h3>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
              <div className="ml-5">
                <div className="flex items-center">
                  <h4 className="text-lg font-semibold">{car.seller?.name}</h4>
                  {car.seller?.verified && (
                    <FiCheckCircle className="ml-2 text-green-500 text-xl" title={t('buyCars.verifiedSeller') || 'Verified Seller'} />
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-lg ${i < Math.floor(car.seller?.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {car.seller?.rating} ({car.seller?.reviews} {t('buyCars.reviews') || 'reviews'})
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t('buyCars.memberSince') || 'Member since'}: {formatDate(car.seller?.memberSince)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreenImage}
        >
          <button 
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeFullscreenImage}
          >
            <FiX />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={fullscreenImage} 
              alt="Fullscreen" 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Navigation Arrows for Step 4 Photos */}
            {car.mediaAndDescription?.photos && car.mediaAndDescription.photos.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white text-3xl p-2 hover:bg-gray-800 hover:bg-opacity-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = selectedPhotoIndex === 0 ? car.mediaAndDescription.photos.length - 1 : selectedPhotoIndex - 1;
                    setSelectedPhotoIndex(newIndex);
                    openFullscreenImage(car.mediaAndDescription.photos[newIndex]);
                  }}
                >
                  <FiChevronLeft />
                </button>
                <button
                  className="absolute right-4 text-white text-3xl p-2 hover:bg-gray-800 hover:bg-opacity-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = selectedPhotoIndex === car.mediaAndDescription.photos.length - 1 ? 0 : selectedPhotoIndex + 1;
                    setSelectedPhotoIndex(newIndex);
                    openFullscreenImage(car.mediaAndDescription.photos[newIndex]);
                  }}
                >
                  <FiChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;