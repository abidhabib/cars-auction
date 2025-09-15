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
  FiDollarSign
} from 'react-icons/fi';
import { loadMockCarsData } from '../data/mockCarsData';

const CarDetailPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const mockCars = loadMockCarsData();
    const selectedCar = mockCars.find(c => c.id === carId);
    setCar(selectedCar);
  }, [carId]);

  const nextImage = () => {
    if (car) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === car.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (car) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? car.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US');
  };

  if (!car) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t('buyCars.loading') || 'Loading...'}</div>
      </div>
    );
  }

  const images = car.photos || [car.image];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#3b396d] hover:text-[#2a285a] mb-6"
      >
        <FiChevronLeft className="mr-2" />
        {t('buyCars.backToList') || 'Back to List'}
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Image Gallery */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`${car.make} ${car.model}`}
            className="object-cover"
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
                {car.year} {car.make} {car.model}
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
              <div className="text-gray-600">
                {t('buyCars.buyItNow')}: €{car.buyItNowPrice?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">{t('buyCars.mileage') || 'Mileage'}</div>
              <div className="font-semibold">{car.mileage?.toLocaleString()} km</div>
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-blue-800">{t('buyCars.auctionInfo') || 'Auction Information'}</h3>
                <p className="text-sm text-blue-600">
                  {t('buyCars.auctionEnds')}: {formatDate(car.auctionEnds)}
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
              <button className="flex-1 border border-[#3b396d] text-[#3b396d] py-3 px-4 rounded-lg hover:bg-[#3b396d] hover:text-white transition-colors">
                {t('buyCars.buyItNow') || 'Buy It Now'}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('buyCars.description') || 'Description'}
            </h3>
            <p className="text-gray-700 leading-relaxed">{car.description}</p>
          </div>

          {/* Inspection Report */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('buyCars.inspectionReport') || 'Inspection Report'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">{t('buyCars.overall') || 'Overall'}</div>
                <div className="font-bold text-xl">{car.inspectionReport.overallRating}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">{t('buyCars.exterior') || 'Exterior'}</div>
                <div className="font-bold text-xl">{car.inspectionReport.exterior}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">{t('buyCars.interior') || 'Interior'}</div>
                <div className="font-bold text-xl">{car.inspectionReport.interior}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">{t('buyCars.mechanical') || 'Mechanical'}</div>
                <div className="font-bold text-xl">{car.inspectionReport.mechanical}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-500">{t('buyCars.accidents') || 'Accidents'}</div>
                <div className="font-bold text-xl">{car.inspectionReport.accidentHistory}</div>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('buyCars.sellerInfo') || 'Seller Information'}
            </h3>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
              <div className="ml-5">
                <div className="flex items-center">
                  <h4 className="text-lg font-semibold">{car.seller}</h4>
                  {car.verified && (
                    <FiCheckCircle className="ml-2 text-green-500 text-xl" title={t('buyCars.verifiedSeller') || 'Verified Seller'} />
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-lg ${i < Math.floor(car.sellerRating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {car.sellerRating} ({car.sellerReviews} {t('buyCars.reviews') || 'reviews'})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('buyCars.tags') || 'Tags'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#3b396d] text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;