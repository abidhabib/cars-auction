// src/components/common/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Button from './Button';

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [ setCurrentCarIndex] = useState(0);



  // Buy/Sell card data with background images
  const actionCards = [
    {
      id: 1,
      type: "buy",
      title: "Buy a Car",
      subtitle: "Browse thousands of inspected vehicles at the best prices.",
      cta: "Start Buying",
      backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-600/80 to-indigo-800/80",
      color: "indigo"
    },
    {
      id: 2,
      type: "sell",
      title: "Sell a Car",
      subtitle: "List your car quickly and reach thousands of buyers instantly.",
      cta: "Start Selling",
      backgroundImage: "./car2.jpg",
      gradient: "from-amber-600/80 to-orange-700/80",
      color: "amber"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate featured cars every 5 seconds
    const carInterval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => (prevIndex + 1) % featuredCars.length);
    }, 5000);
    
    return () => clearInterval(carInterval);
  }, []);

  return (
    <section 
      className="min-h-screen w-full flex items-center justify-center sm:pt-16 sm:pb-12 overflow-x-hidden font-sans relative"
  style={{
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M45 30c2-2 5-3 8-3 4 0 7 2 9 5 2 3 2 6 0 9-2 2-5 3-8 3-4 0-7-2-9-5-2-3-2-6 0-9zm25 15c2-1 4-3 5-5 1-2 1-5 0-7-1-2-3-3-5-3-2 0-4 1-5 3-1 2-1 5 0 7 1 2 3 4 5 5zm-15 20c1-1 3-2 4-2 2 0 3 1 4 2 1 1 1 3 0 4-1 1-3 2-4 2-2 0-3-1-4-2-1-1-1-3 0-4zm35-10c1-1 2-3 2-5 0-2-1-3-2-4-1-1-2-1-3 0-1 1-2 3-2 5 0 2 1 3 2 4 1 1 2 1 3 0zm-25 15c1-1 2-2 2-4 0-2-1-3-2-4-1-1-2-1-3 0-1 1-2 2-2 4 0 2 1 3 2 4 1 1 2 1 3 0z' fill='%232563eb' fill-opacity='0.08'/%3E%3C/svg%3E"), linear-gradient(135deg, #f0f4ff 0%, #fff7ed 100%)`,
  backgroundSize: '200px 100px, auto',
  backgroundPosition: 'center, center',
  backgroundRepeat: 'repeat, no-repeat'
}}
    >
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/50 to-amber-50/30 animate-gradient-x"></div>
      
      {/* Grid pattern overlay for depth */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Text Content */}
          <div className={`text-gray-900 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-md shadow-blue-500/30">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {t('hero.tagline') || 'Premium Car Auctions'}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              {t('hero.title') || 'Find Your Dream Car at Auction'}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
              {t('about.hero.subtitle') || 'Discover premium vehicles from trusted sellers. Bid with confidence in our secure online auctions.'}
            </p>

            {/* Stats counter */}
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                  <CountUp end={25000} duration={3} separator="," />+
                </div>
                <div className="ml-2 text-sm text-gray-600">Vehicles</div>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                  <CountUp end={95} duration={3} />%
                </div>
                <div className="ml-2 text-sm text-gray-600">Satisfaction</div>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                  <CountUp end={120} duration={3} />+
                </div>
                <div className="ml-2 text-sm text-gray-600">Countries</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/explore')}
                className="px-8 py-3.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span className="flex items-center">
                  {t('hero.explore') || 'Explore Auctions'}
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/how-it-works')}
                className="px-8 py-3.5 font-semibold border-2 hover:bg-gray-50 transition-all duration-300 group"
              >
                <span className="flex items-center">
                  {t('hero.howItWorks') || 'How It Works'}
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </Button>
            </div>

          </div>

          {/* Right Column - Car Showcase and Action Cards */}
          <div className="space-y-6">
           
            
            {/* Buy & Sell Cards with Background Images */}
            <div className="grid grid-cols-2 gap-2">
              {actionCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => navigate(`/${card.type}`)}
                  className="group cursor-pointer rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative h-80"
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${card.backgroundImage})` }}
                  >
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4 text-white">
                    <h3 className="text-lg font-bold mb-2">{t(`hero.${card.type}Section.title`) || card.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{t(`hero.${card.type}Section.sub`) || card.subtitle}</p>
                    <span className="inline-flex items-center text-sm font-semibold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                      {t(`hero.${card.type}Section.cta`) || card.cta}
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;