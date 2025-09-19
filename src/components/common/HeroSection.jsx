// src/components/common/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Button from "./Button";

// Import Lottie
import lottie from "lottie-web";
// --- Import the useAuth hook ---
import { useAuth } from "../../context/AuthContext"; // Adjust the path if your AuthContext is located elsewhere

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  // --- Use the useAuth hook to get login status ---
  const { isLoggedIn } = useAuth(); // Assuming your AuthContext provides an `isLoggedIn` boolean
  const [isVisible, setIsVisible] = useState(false);
  const lottieContainer = useRef(null);

  const actionCards = [
    {
      id: 1,
      type: "buy",
      title: "Buy a Car",
      subtitle: "Browse thousands of inspected vehicles at the best prices.",
      cta: "Start Buying",
      backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      color: "indigo"
    },
    {
      id: 2,
      type: "sell",
      title: "Sell a Car",
      subtitle: "List your car quickly and reach thousands of buyers instantly.",
      cta: "Start Selling",
      backgroundImage: "./car2.jpg", // Ensure this path is correct
      color: "blue"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    if (lottieContainer.current) {
      const anim = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://www.carcollect.com/hubfs/raw_assets/public/carcollect-2021-theme/js/lottie/general/general_en.json'
      });

      return () => anim.destroy();
    }
  }, []);

  // --- Handler for Action Card clicks ---
  const handleActionCardClick = (actionType) => {
    if (isLoggedIn) {
      // If logged in, navigate to the dashboard with hash
      if (actionType === 'buy') {
        navigate('/Dashboard#buy'); // Adjust '/dashboard' path if needed
      } else if (actionType === 'sell') {
        navigate('/Dashboard#add'); // Adjust '/dashboard' path if needed
        // Or if you have a specific route for adding cars:
        // navigate('/dashboard/add-car'); 
      }
    } else {
      // If not logged in, navigate to the login page
      navigate('/login'); // Adjust '/login' path if needed
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden font-sans bg-logo-dark-blue">
      
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="./hero_bg.png" 
        >
          <source src="./hero_bg.mp4" type="video/mp4" />
          {/* If video is not supported */}
          <img
            src="./hero_bg.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Floating Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-600/5 z-10 animate-pulse"></div>

      {/* Content Container */}
      <div className="relative z-20 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">

        {/* LEFT COLUMN: Text Content */}
        <div className={`flex-1 max-w-2xl transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          {/* Tagline Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-5 py-2.5 text-sm font-semibold tracking-wide border text-white rounded-full shadow-lg shadow-white/10 backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t('hero.tagline') || 'Premium Car Auctions'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight text-white">
            {t('hero.title') || 'Find Your Dream Car at Auction'}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed text-gray-100">
            {t('about.hero.subtitle') || 'Discover premium vehicles from trusted sellers. Bid with confidence in our secure online auctions.'}
          </p>

          {/* Stats Counter Row */}
          <div className="flex flex-wrap gap-8 mb-12">
            <div className="flex flex-col items-start">
              <span className="text-3xl md:text-4xl font-bold text-blue-100">
                <CountUp end={25000} duration={3} separator="," />+
              </span>
              <span className="text-sm text-blue-200 mt-1">Vehicles</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-3xl md:text-4xl font-bold text-blue-100">
                <CountUp end={95} duration={3} />%
              </span>
              <span className="text-sm text-blue-200 mt-1">Satisfaction</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-3xl md:text-4xl font-bold text-blue-100">
                <CountUp end={120} duration={3} />+
              </span>
              <span className="text-sm text-blue-200 mt-1">Countries</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/explore')}
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

        {/* RIGHT COLUMN: Action Cards */}
        {/* Updated to use handleActionCardClick */}
        <div className="flex flex-col gap-6 w-full md:w-96">
          {actionCards.map((card) => (
            <div
              key={card.id}
              className="relative rounded-xl overflow-hidden bg-white/30 shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer" // Added cursor-pointer
              style={{
                backgroundImage: `url(${card.backgroundImage})`, // Apply background image via style
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px'
              }}
              // Use the new handler
              onClick={() => handleActionCardClick(card.type)} 
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
              
              <div className="relative z-10 p-6 flex flex-col h-full justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-blue-100 text-sm">{card.subtitle}</p>
                </div>
                
                <button
                  // Removed onClick from button, handled by parent div
                  className="mt-4 py-3 px-6 rounded-lg font-semibold bg-white text-logo-dark-blue hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  {card.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;