// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import BrandsSection from '../components/common/BrandsSection';
import { Press } from '../components/common/Press';
import InfoSections from '../components/common/InfoCard';
import HeroSection from '../components/common/HeroSection';
import SuccessStories from '../components/common/SuccessStories';
import JoinNewsletter from '../components/common/JoinNewsletter';

const Home = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

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

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.daily_cars.cars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + content.daily_cars.cars.length) % content.daily_cars.cars.length);
  };

  // Handler for accepting cookies
  useEffect(() => {
    const isConsentGiven = localStorage.getItem('cookiesAccepted');
    if (isConsentGiven !== 'true') {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
    console.log("Cookies accepted by user.");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className=" bg-white">
        <HeroSection />
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* LEFT COLUMN: Text */}
            <div className="flex-1 text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                We are <span className="text-logo-dark-blue">Car Network Europe</span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                With an enthusiastic team of young professionals, we drive innovation in the automotive industry. 
                CarCollect offers an all-in-one platform, streamlining everything from vehicle trading and logistics 
                to inventory management and valuation.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                With AI-driven solutions and data-driven insights, we empower businesses to make smarter decisions, 
                maximizing efficiency and profitability.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to become the largest automotive network worldwide, offering a transparent and 
                scalable platform where organizations can start for free and grow at their own pace.
              </p>
              <button className="bg-logo-dark-blue hover:bg-logo-dark-blue-900 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300 flex items-center">
                More about our software
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* RIGHT COLUMN: Images */}
            <div className="flex-1 flex justify-center relative">
              <img
                src="./laptop.jpg"
                alt="Laptop mockup"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
              <img
                src="./mobile.png"
                alt="Phone mockup"
                className="absolute right-0 bottom-0 w-40 sm:w-48 lg:w-56 transform translate-x-12 translate-y-6 rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Daily Cars Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {t('dailyCars.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium vehicles, updated daily with the best deals across Europe.
            </p>
          </div>

          <div className="relative group">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition z-10 -ml-3 hidden md:flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Mobile-friendly Carousel */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-2" style={{ minWidth: `${content.daily_cars.cars.length * 272}px` }}>
                {content.daily_cars.cars.map((car, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
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
                      <h3 className="font-medium text-gray-900 text-base mb-1 truncate">{car.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">{t('dailyCars.activeStatus')} • {t('dailyCars.addedToday')}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-logo-dark-blue">€24,890</span>
                        <button className="text-xs font-medium text-logo-dark-blue hover:text-[#2a285a] transition-colors">
                          {t('dailyCars.viewDetails')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition z-10 -mr-3 hidden md:flex items-center justify-center"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-10">
            <Button variant="primary" size="md">
              Browse All Vehicles
            </Button>
          </div>

          {/* Brand Logos */}
          <BrandsSection />
          
          {/* Newsletter */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <JoinNewsletter/>
          </div>
        </div>
      </section>

      {/* Business Growth Section */}
      <section className="py-20 bg-logo-dark-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                  {t('businessGrowth.title')}
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed mb-8">
                  {t('businessGrowth.description')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">5,000+</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.partners')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">98%</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.satisfaction')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">15+</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.experience')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">27</div>
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.countries')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="md">
                  {t('businessGrowth.learnMore')}
                </Button>
                <Button variant="outline" size="md" textColorClass="text-white" borderColorClass="border-white" hoverBgClass="hover:bg-white/10">
                  {t('businessGrowth.contactUs')}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://blog.salvagebid.com/wp-content/uploads/2021/02/SB-Blog-Buying-a-car-with-a-lien-title-820x461.png"
                  alt="Business Growth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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

      {/* Success Stories */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessStories />
        </div>
      </section>

      {/* Buying/Selling Sections */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfoSections />
        </div>
      </section>

      {/* In the Press */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Press />
        </div>
      </section>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 font-sans">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <p className="mb-1">
                {t('cookies.message') || 'We use cookies to improve your experience, analyze traffic, and for marketing purposes.'}
              </p>
              <p className="text-gray-300 text-xs">
                {t('cookies.learnMore') || 'By continuing to use our site, you accept our'}{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline"
                >
                  {t('cookies.privacyPolicyLink') || 'Privacy Policy'}
                </a>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="primary" 
                size="sm"
                onClick={handleAcceptCookies}
                className="w-full sm:w-auto"
              >
                {t('cookies.accept') || 'Accept All'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;