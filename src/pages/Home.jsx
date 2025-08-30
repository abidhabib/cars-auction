// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import BrandsSection from '../components/common/BrandsSection';
import { Press } from '../components/common/Press';
import InfoSections from '../components/common/InfoCard';
import HeroSection from '../components/common/HeroSection';
import SuccessStories from '../components/common/SuccessStories';

const Home = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);


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
        },
        {
          name: "Peugeot 308 1.6 e-HDi Business-Line",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7517d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Land Rover Discovery Sport 2.0 Td4 Pure",
          image: "https://images.unsplash.com/photo-1596774459709-7d8e5e2c3c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Smart fortwo 0.8 CDI Passion",
          image: "https://images.unsplash.com/photo-1549493029-75f60f1aaaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Audi Q5 2.0 TDI Avus",
          image: "https://images.unsplash.com/photo-1550358860-2595bc55d5e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Abarth 500 1.4 Turbo",
          image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
        },
        {
          name: "Opel Astra K 1.6 CDTI DPF Edition Start/Stop",
          image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
          name: "Nissan Leaf electric drive 80 kW Acenta",
          image: "https://images.unsplash.com/photo-1596774459709-7d8e5e2c3c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
      ]
    },
  
  };



  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.daily_cars.cars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + content.daily_cars.cars.length) % content.daily_cars.cars.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
<HeroSection/>

      {/* Daily Cars Carousel */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            {t('dailyCars.title')}
          </h2>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition z-10 -ml-4 hidden md:block"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="overflow-x-auto no-scrollbar">
              <div 
                className="flex gap-6 py-4 px-4 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {content.daily_cars.cars.map((car, index) => (
                  <div 
                    key={index} 
                    className="carousel-card flex-shrink-0 w-64 md:w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 snap-start"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{car.name}</h3>
                      <p className="text-sm text-gray-600">{t('dailyCars.activeStatus')} • {t('dailyCars.addedToday')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition z-10 -mr-4 hidden md:block"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
         
          
          {/* Brand Logos */}
          <BrandsSection/>
        </div>
      </section>
      
      {/* Business Growth Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('businessGrowth.title')}</h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                {t('businessGrowth.description')}
              </p>
              <div className="mt-8 flex space-x-4">
                <Button variant="secondary">{t('businessGrowth.learnMore')}</Button>
                <Button variant="outline">{t('businessGrowth.contactUs')}</Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Business Growth" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-2 text-white">
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
      <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <InfoSections />
          </div>
      </section>

      {/* In the Press */}
      <Press/>
      
      <Footer />
    </div>
  );
};

export default Home;