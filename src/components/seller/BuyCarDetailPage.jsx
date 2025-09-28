// src/components/seller/BuyCarDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiMapPin,
  FiClock,
  FiEye,
  FiTag,
  FiX,
  FiAward,
  FiInfo,
  FiCalendar,
  FiTool,
  FiSettings,
  FiCamera,
  FiImage,
  FiZoomIn,
  FiCheckCircle,
  FiStar,
  FiUser,
  FiCheck
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';
import BiddingModal from './BiddingModal';

const BuyCarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [biddingCar, setBiddingCar] = useState(null);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

useEffect(() => {
  const cars = loadMockCarsData();
  const foundCar = cars.find(c => String(c.id) === String(id));
  if (foundCar) {
    setCar(foundCar);
  } else {
    navigate('/Dashboard/buy');
  }
  setLoading(false);
}, [id, navigate]);

  const handlePlaceBid = () => {
    setBiddingCar(car);
    setIsBiddingModalOpen(true);
  };

  const handleBidSubmit = (bidAmount) => {
    console.log(`Bid placed on car ${car.id}: €${bidAmount}`);
    setIsBiddingModalOpen(false);
  };

  const handleGoToBiddingPage = () => {
    navigate(`/Dashboard/buy/${id}/bid`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3b396d]"></div>
      </div>
    );
  }

  if (!car) return null;

  // Helper functions
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

  const safeT = (key, defaultValue = '') => {
    try {
      const translation = t(key);
      return translation !== key ? translation : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  // Render functions
  const renderDamagePoints = () => {
    if (!car.damagePoints || car.damagePoints.length === 0) {
      return <span className="text-green-600">{t('buyCars.noDamage') || 'No damage reported'}</span>;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {car.damagePoints.map((point, index) => (
          <span key={index} className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            {point}
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
          <span key={index} className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {option.replace(/-/g, ' ')}
          </span>
        ))}
      </div>
    );
  };

  const photoPositions = [
    t('addCarListing.media.frontLeft') || 'Front left',
    t('addCarListing.media.frontRight') || 'Front right',
    t('addCarListing.media.leftRear') || 'Left rear',
    t('addCarListing.media.rightRear') || 'Right rear',
    t('addCarListing.media.dashboard') || 'Dashboard',
    t('addCarListing.media.odometer') || 'Odometer',
    t('addCarListing.media.interior') || 'Interior'
  ];

  const renderRDWHistory = () => {
    if (!car.rdwHistory || car.rdwHistory.length === 0) return null;
    return (
      <div className="mb-6 p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
          <FiInfo className="mr-2 text-[#3b396d]" />
          {t('buyCars.rdwHistory') || 'RDW History'}
        </h3>
        <div className="space-y-3">
          {car.rdwHistory.map((event, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
              <div className="font-medium text-blue-800">{event.type}</div>
              <div className="text-sm text-gray-700 mt-1">{formatDate(event.date)}</div>
              <div className="text-sm text-gray-600 mt-1">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDamageGrid = () => {
    if (!car.damageGrid || car.damageGrid.length === 0) return null;
    return (
      <div className="mb-6 p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
          <FiTool className="mr-2 text-[#3b396d]" />
          Damage Report
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Damage Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {car.damageGrid.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.part}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.type}</td>
                  <td className="px-4 py-3">
                    <img 
                      src={item.photo} 
                      alt="Damage" 
                      className="w-20 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setFullscreenImage(item.photo)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const images = car.mediaAndDescription?.photos || [car.image || 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'];

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedPhotoIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedPhotoIndex(newIndex);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedPhotoIndex(index);
  };

  const openFullscreenImage = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate('/Dashboard/buy')}
        className="flex items-center text-[#3b396d] hover:text-[#2a285a] mb-4 transition-colors duration-200"
      >
        <FaArrowAltCircleLeft className="mr-2 text-lg" /> 
        Back to List
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT: Image Gallery */}
          <div className="relative">
            {!imageLoaded[currentImageIndex] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 rounded-xl w-full h-full" />
              </div>
            )}
            <img
              src={images[currentImageIndex]}
              alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`}
              className={`w-full object-contain transition-opacity duration-500 ${imageLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(prev => ({ ...prev, [currentImageIndex]: true }))}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
                setImageLoaded(prev => ({ ...prev, [currentImageIndex]: true }));
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#3b396d] rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#3b396d] rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-[90%] overflow-x-auto pb-1 hide-scrollbar">
                  {images.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'border-[#3b396d] scale-105 shadow-md' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {!imageLoaded[index] && (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <div className="animate-pulse bg-gray-200 w-full h-full" />
                        </div>
                      )}
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`} 
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
                          setImageLoaded(prev => ({ ...prev, [index]: true }));
                        }}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Specs & Info */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                {car.vehicleIdentification.trim && (
                  <span className="text-lg font-normal text-gray-600 ml-2">({car.vehicleIdentification.trim})</span>
                )}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <FiMapPin className="mr-1.5 text-gray-500" />
                <span>{car.location}</span>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-bold text-[#3b396d]">
                  €{car.price?.toLocaleString()}
                </div>
                {car.saleType === 'direct-buy' && car.mediaAndDescription?.directBuyPrice && (
                  <div className="text-gray-600 mt-1">
                    {t('buyCars.buyItNow')}: €{parseInt(car.mediaAndDescription.directBuyPrice)?.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Auction Timer */}
              {car.saleType === 'general-auction' && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-blue-800 text-lg">{t('buyCars.auctionInfo') || 'Auction Information'}</h3>
                      <p className="text-sm text-blue-600 mt-1">
                        {t('buyCars.auctionEnds')}: {formatDateTime(car.auctionTiming.endDate + 'T' + car.auctionTiming.endTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#3b396d]">
                        {car.bids} {t('buyCars.bids') || 'Bids'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {t('buyCars.highestBid')}: €{car.highestBid?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleGoToBiddingPage}
                      className="flex-1 bg-[#3b396d] text-white py-3 px-4 rounded-lg hover:bg-[#2a285a] transition-colors duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d] flex items-center justify-center"
                    >
                      <FaLevelUpAlt className="mr-2" />
                      {t('buyCars.placeBid') || 'Place Bid'}
                    </button>
                    {car.buyItNowPrice && (
                      <button className="flex-1 border-2 border-[#3b396d] text-[#3b396d] py-3 px-4 rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b396d]">
                        {t('buyCars.buyItNow') || 'Buy It Now'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* VAT Info */}
              {car.vatStatus === 'deductible' && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <FiCheckCircle className="mr-2 text-green-600" />
                  <span className="text-green-800">Btw aftrekbaar (21%)</span>
                </div>
              )}

              {/* Spec Table */}
<div className="space-y-2 mb-6">
  {[
    { label: t('stockId', 'Stock ID:'), value: car.stockId || t('common.na', 'N/A') },
    { label: t('buildYear', 'Bouwjaar / modeljaar (CvO):'), value: car.vehicleIdentification.year },
    { label: t('firstRegistration', 'Eerste toelating:'), value: car.vehicleIdentification.registrationDate || t('common.na', 'N/A') },
    { label: t('mileage', 'Afgelezen kilometerstand:'), value: `${parseInt(car.vehicleIdentification.mileage)?.toLocaleString()} km` },
    { label: t('fuelType', 'Brandstoftype:'), value: car.fuelType },
    { label: t('power', 'Vermogen:'), value: car.vehicleIdentification?.power ? `${car.vehicleIdentification.power} kW / ${Math.round(car.vehicleIdentification.power * 1.36)} PK` : t('common.na', 'N/A') },
    { label: t('engineCapacity', 'Cilinderinhoud:'), value: car.vehicleIdentification?.engineCapacity ? `${car.vehicleIdentification.engineCapacity} cc` : t('common.na', 'N/A') },
    { label: t('transmission', 'Transmissie:'), value: car.transmission },
    { label: 'Inspectie vernieuwd in de laatste 6 maanden:', value: safeT('common.yes', 'Ja') },
    { label: t('bodyType', 'Carrosserietype:'), value: car.carType }
  ].map((row, i) => (
    <div key={i} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
      <span className="text-sm text-gray-700">{row.label}</span>
      <span className="text-sm font-medium text-gray-900">{row.value}</span>
    </div>
  ))}
</div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                FAVORITEN
              </button>
              <button 
                onClick={handleGoToBiddingPage}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                PLAATS EEN BOD
              </button>
            </div>
          </div>
        </div>

        {/* RDW History */}
        {renderRDWHistory()}

        {/* Damage Grid */}
        {renderDamageGrid()}

        {/* Vehicle Identification */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
            <FiInfo className="mr-2 text-[#3b396d]" />
            {t('buyCars.vehicleIdentification') || 'Vehicle Identification'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.makeLabel') || 'Make'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.make || '-'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.modelLabel') || 'Model'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.model || '-'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.yearLabel') || 'Year'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.year || '-'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.trimLabel') || 'Trim'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.trim || '-'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.mileageLabel') || 'Mileage'}</div>
              <div className="font-semibold text-gray-900">{parseInt(car.vehicleIdentification?.mileage, 10)?.toLocaleString() || '0'} {car.vehicleIdentification?.mileageUnit || 'km'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.licensePlateLabel') || 'License Plate'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.licensePlate || '-'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.registrationDateLabel') || 'Registration Date'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.registrationDate || '-'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.vehicleId.previousOwnersLabel') || 'Previous Owners'}</div>
              <div className="font-semibold text-gray-900">{car.vehicleIdentification?.previousOwners || '0'}</div>
            </div>
          </div>
        </div>

        {/* Condition Assessment */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
            <FiTool className="mr-2 text-[#3b396d]" />
            {t('buyCars.conditionAssessment') || 'Condition Assessment'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.condition.technicalChecklist.title') || 'Technical Checklist'}</h4>
              <div className="space-y-2">
                {Object.entries(car.conditionAssessment?.technicalChecklist || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span>
                    <span className={`font-medium ${getConditionColor(value)}`}>
                      {getConditionText(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.condition.interiorChecklist.title') || 'Interior Checklist'}</h4>
              <div className="space-y-2">
                {Object.entries(car.conditionAssessment?.interiorChecklist || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 capitalize">{key.replace(/-/g, ' ')}</span>
                    <span className={`font-medium ${getConditionColor(value)}`}>
                      {getConditionText(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.condition.tyreReport.title') || 'Tyre Report'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(car.conditionAssessment?.tyreReport || {}).map(([position, tyreData]) => (
              <div key={position} className="border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm">
                <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  {position.replace(/([A-Z])/g, ' $1').trim()}
                </h5>
                <div className="space-y-1.5">
                  <div className="text-xs flex justify-between">
                    <span className="text-gray-500">{t('addCarListing.condition.tyreReport.brand') || 'Brand'}:</span>
                    <span className="font-medium truncate max-w-[50%]">{tyreData.brand || '-'}</span>
                  </div>
                  <div className="text-xs flex justify-between">
                    <span className="text-gray-500">{t('addCarListing.condition.tyreReport.treadDepth') || 'Tread'}:</span>
                    <span className="font-medium">{tyreData.treadDepth ? `${tyreData.treadDepth}mm` : '-'}</span>
                  </div>
                  <div className="text-xs flex justify-between">
                    <span className="text-gray-500">{t('addCarListing.condition.tyreReport.condition') || 'Condition'}:</span>
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
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
            <FiSettings className="mr-2 text-[#3b396d]" />
            {t('buyCars.exteriorOptions') || 'Exterior Options & Damages'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.exterior.damageTitle') || 'Damages'}</h4>
              {renderDamagePoints()}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3 pb-1 border-b border-gray-200">{t('addCarListing.exterior.optionsTitle') || 'Options'}</h4>
              {renderSelectedOptions()}
            </div>
          </div>
        </div>

        {/* Visual Documentation & Description */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
            <FiCamera className="mr-2 text-[#3b396d]" />
            {t('addCarListing.stepDetails.step4.title') || 'Visual Documentation & Description'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.media.headlineLabel') || 'Listing Headline'}</h4>
              <p className="text-gray-700">{car.mediaAndDescription?.headline}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">{t('addCarListing.media.descriptionLabel') || 'Full Description'}</h4>
              <p className="text-gray-700 whitespace-pre-line">{car.mediaAndDescription?.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">{t('buyCars.serviceHistory') || 'Service History'}</h4>
              <p className="text-gray-700 capitalize">{car.mediaAndDescription?.serviceHistory || '-'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">{t('buyCars.accidentHistory') || 'Accident History'}</h4>
              <p className="text-gray-700">
                {car.mediaAndDescription?.hasAccident 
                  ? safeT('common.yes', 'Yes')
                  : safeT('common.no', 'No')}
              </p>
              {car.mediaAndDescription?.hasAccident && car.mediaAndDescription?.accidentDetails && (
                <p className="text-gray-700 mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">{car.mediaAndDescription.accidentDetails}</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center pb-1 border-b border-gray-100">
              <FiImage className="mr-2 text-[#3b396d]" />
              Photos
            </h4>
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((photo, index) => {
                  let label = `Additional Photo ${index - photoPositions.length + 1}`;
                  if (index < photoPositions.length) {
                    label = photoPositions[index];
                  }
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => openFullscreenImage(photo)}
                    >
                      <div className="relative w-full aspect-[4/3] border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                        {!imageLoaded[index] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-pulse bg-gray-200 w-full h-full" />
                          </div>
                        )}
                        <img 
                          src={photo} 
                          alt={label} 
                          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                          onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80';
                            setImageLoaded(prev => ({ ...prev, [index]: true }));
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xl" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1.5 text-center truncate w-full px-1">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 italic">{t('buyCars.noPhotos') || 'No photos available for this vehicle.'}</p>
            )}
          </div>
        </div>

        {/* Auction Timing */}
        {car.saleType === 'general-auction' && (
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
              <FiCalendar className="mr-2 text-[#3b396d]" />
              {t('buyCars.auctionTiming') || 'Auction Timing'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.auctionTiming.startDateLabel') || 'Start Date'}</div>
                <div className="font-semibold text-gray-900">{formatDateTime(car.auctionTiming?.startDate + 'T' + car.auctionTiming?.startTime)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.auctionTiming.endDateLabel') || 'End Date'}</div>
                <div className="font-semibold text-gray-900">{formatDateTime(car.auctionTiming?.endDate + 'T' + car.auctionTiming?.endTime)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('addCarListing.auctionTiming.timezoneLabel') || 'Timezone'}</div>
                <div className="font-semibold text-gray-900">{car.auctionTiming?.timezone || '-'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Seller Information */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center pb-2 border-b border-gray-200">
            <FiUser className="mr-2 text-[#3b396d]" />
            {t('buyCars.sellerInfo') || 'Seller Information'}
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
            <div className="ml-0 sm:ml-4 mt-3 sm:mt-0">
              <div className="flex items-center flex-wrap">
                <h4 className="font-semibold text-lg">{car.seller?.name || 'Unknown Seller'}</h4>
                {car.seller?.verified && (
                  <FiCheckCircle className="ml-2 text-green-500 text-lg" title={t('buyCars.verifiedSeller') || 'Verified Seller'} />
                )}
              </div>
              <div className="flex items-center mt-2 flex-wrap">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${i < Math.floor(car.seller?.rating) ? 'fill-current' : ''} text-lg`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {car.seller?.rating ? car.seller.rating.toFixed(1) : 'N/A'} 
                  {car.seller?.reviews && ` (${car.seller.reviews} ${t('buyCars.reviews') || 'reviews'})`}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {t('buyCars.memberSince') || 'Member since'}: {car.seller?.memberSince ? formatDate(car.seller.memberSince) : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4"
          onClick={closeFullscreenImage}
        >
          <button 
            className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 z-10"
            onClick={closeFullscreenImage}
            aria-label={t('buyCars.closeFullscreen') || "Close fullscreen view"}
          >
            <FiX />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={fullscreenImage} 
              alt={t('buyCars.fullscreenImage') || "Fullscreen view"} 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white text-4xl p-3 rounded-full hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-200 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = (selectedPhotoIndex - 1 + images.length) % images.length;
                    setSelectedPhotoIndex(newIndex);
                    openFullscreenImage(images[newIndex]);
                  }}
                  aria-label="Previous image"
                >
                  <FiChevronLeft />
                </button>
                <button
                  className="absolute right-4 text-white text-4xl p-3 rounded-full hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-200 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = (selectedPhotoIndex + 1) % images.length;
                    setSelectedPhotoIndex(newIndex);
                    openFullscreenImage(images[newIndex]);
                  }}
                  aria-label="Next"
                >
                  <FiChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bidding Modal (optional quick bid) */}
      {biddingCar && (
        <BiddingModal
          isOpen={isBiddingModalOpen}
          onClose={() => setIsBiddingModalOpen(false)}
          car={biddingCar}
          onBidSubmit={handleBidSubmit}
          t={t}
        />
      )}
    </div>
  );
};

export default BuyCarDetailPage;