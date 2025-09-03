// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import BrandsSection from '../components/common/BrandsSection';
import { Press } from '../components/common/Press';
import InfoSections from '../components/common/InfoCard';
import HeroSection from '../components/common/HeroSection';
import SuccessStories from '../components/common/SuccessStories';

const Home = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Page content
  const content = {
    daily_cars: {
      title: t('dailyCars.title'),
      cars: [
        {
          name: "Toyota RAV 4 2.0 D-4D Active",
          image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Audi A4 2.0 TDI Sport",
          image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Renault Megane 1.5 dCi Energy Intens",
          image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Mercedes-Benz CLS-Klasse CLS 350 CGI",
          image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
        },
        {
          name: "Alfa Romeo Giulietta 1.6 JTDm Progression",
          image: "https://images.unsplash.com/photo-1549399542-7e7f8c3a8f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "BMW X1 sDrive 16d",
          image: "https://images.unsplash.com/photo-1558981000-f5f2a3c4b4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
      ]
    }
  };

  // Carousel navigation - Fixed
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.daily_cars.cars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + content.daily_cars.cars.length) % content.daily_cars.cars.length);
  };

  // Auto slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMobile) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      
      {/* Daily Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('dailyCars.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('Discover our handpicked selection of premium vehicles, updated daily with the best deals across Europe.')}
            </p>
          </div>
          
          <div className="relative group">
            {/* Navigation Buttons - Always visible on desktop, hidden on mobile */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition z-10 -ml-4 hidden md:flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Fixed Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (isMobile ? 272 : 272)}px)` }}
              >
                {content.daily_cars.cars.map((car, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-64 md:w-64 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 mx-2"
                  >
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{car.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">{t('dailyCars.activeStatus')} • {t('dailyCars.addedToday')}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#3b396d]">€24,890</span>
                        <button 
                          onClick={() => navigate(`/${language === 'en' ? '' : language}/car/${index}`)}
                          className="text-xs font-medium text-[#3b396d] hover:text-[#2a285a] transition-colors"
                        >
                          {t('viewDetails')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition z-10 -mr-4 hidden md:flex items-center justify-center"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2 md:hidden">
            {content.daily_cars.cars.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#3b396d]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button 
              onClick={() => navigate(`/${language === 'en' ? '' : language}/vehicles`)}
              className="px-6 py-3 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors"
            >
              {t('BrowseAll')}
            </button>
          </div>
          
          {/* Brand Logos */}
          <BrandsSection/>
        </div>
      </section>
      
      {/* Business Growth Section */}
      <section className="py-16 bg-[#3b396d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {t('businessGrowth.title')}
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed mb-8">
                  {t('businessGrowth.description')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold mb-1">5,000+</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.partners')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.satisfaction')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.experience')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold mb-1">27</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.countries')}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate(`/${language === 'en' ? '' : language}/about`)}
                  className="px-6 py-3 bg-white text-[#3b396d] font-medium rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  {t('businessGrowth.learnMore')}
                </button>
                <button 
                  onClick={() => navigate(`/${language === 'en' ? '' : language}/contact`)}
                  className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
                >
                  {t('businessGrowth.contactUs')}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80" 
                  alt="Business Growth" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-2 text-white cursor-pointer hover:underline">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>{t('businessGrowth.watchStory')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <SuccessStories/>
      
      {/* Buying/Selling Sections */}
      <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
        <InfoSections />
      </div>

      {/* In the Press */}
      <Press/>
    </div>
  );
};

export default Home;