// src/pages/Home.jsx (or your Home component file path)
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button'; // Updated Button component
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
    // Show banner only if consent is not explicitly given (either 'true' or 'false')
    // This means it shows on first visit or if user previously declined.
    // You might want to show it only if 'cookiesAccepted' is null/undefined.
    // Adjust logic as needed.
    if (isConsentGiven !== 'true') {
      setShowCookieBanner(true);
    }
    // If isConsentGiven is 'true', banner stays hidden (showCookieBanner remains false)
  }, []);
  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
    // Here you would typically initialize or enable non-essential cookies/tracking scripts
    console.log("Cookies accepted by user.");
  };

  // Handler for declining cookies (optional, depends on your policy)
  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowCookieBanner(false);
    // Here you would typically ensure non-essential cookies/tracking are disabled
    console.log("Cookies declined by user.");
  };
  return (
    // Ensure Outfit font is applied globally via CSS or Tailwind config (sans: ['Outfit', ...])
    <div className="min-h-screen bg-white font-sans">
      <HeroSection />

      {/* Daily Cars Section - Minimalist styling */}
      <section className="py-16 bg-gray-50"> {/* Light gray background is acceptable */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* 3. Typography: Headline - Using Outfit, reduced weight for minimalism */}
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {t('dailyCars.title')}
            </h2>
            {/* 3. Typography: Body - Using Outfit */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium vehicles, updated daily with the best deals across Europe.
            </p>
          </div>

          <div className="relative group">
            {/* Navigation Buttons - Simplified shadows for minimalism */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition z-10 -ml-3 hidden md:flex items-center justify-center"
              aria-label="Previous slide"
            >
              {/* 1.1 Logo Color Principle: Use Logo Dark Blue on white background */}
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
                    className="flex-shrink-0 w-64 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200" // Softer border
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
                      {/* 3. Typography: Subline/Body for car name */}
                      <h3 className="font-medium text-gray-900 text-base mb-1 truncate">{car.name}</h3>
                      {/* 3. Typography: Body for status */}
                      <p className="text-xs text-gray-500 mb-3">{t('dailyCars.activeStatus')} • {t('dailyCars.addedToday')}</p>
                      <div className="flex justify-between items-center">
                        {/* 1.1 Logo Color Principle: Use Logo Dark Blue for price */}
                        <span className="text-base font-semibold text-logo-dark-blue">€24,890</span>
                        {/* 1.1 Logo Color Principle: Use Logo Dark Blue for links/buttons on light background */}
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
              {/* 1.1 Logo Color Principle: Use Logo Dark Blue on white background */}
              <svg className="w-5 h-5 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-10">
            {/* Using the updated, minimal Button component */}
            <Button variant="primary" size="md">
              Browse All Vehicles
            </Button>
          </div>

          {/* Brand Logos */}
          <BrandsSection />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <JoinNewsletter/>
</div>
        </div>
      </section>

      {/* Business Growth Section - Using Logo Dark Blue background */}
      {/* Note: Per style guide, if logo were here, background should be background-deep-blue with white logo. */}
      <section className="py-16 bg-logo-dark-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                {/* 3. Typography: Headline - White text, reduced weight for minimalism */}
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                  {t('businessGrowth.title')}
                </h2>
                {/* 3. Typography: Body - Lighter blue text, using Outfit */}
                <p className="text-lg text-blue-100 leading-relaxed mb-8">
                  {t('businessGrowth.description')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">5,000+</div> {/* Reduced weight */}
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.partners')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">98%</div> {/* Reduced weight */}
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.satisfaction')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">15+</div> {/* Reduced weight */}
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.experience')}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-semibold mb-1">27</div> {/* Reduced weight */}
                  <div className="text-blue-200 text-sm">{t('businessGrowth.stats.countries')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Using the updated, minimal Button component for consistency */}
                <Button variant="secondary" size="md">
                  {t('businessGrowth.learnMore')}
                </Button>
                <Button variant="outline" size="md" textColorClass="text-white" borderColorClass="border-white" hoverBgClass="hover:bg-white/10">
                  {t('businessGrowth.contactUs')}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl"> {/* Slightly reduced rounding/shadow for minimalism */}
                <img
                  src="https://blog.salvagebid.com/wp-content/uploads/2021/02/SB-Blog-Buying-a-car-with-a-lien-title-820x461.png"
                  alt="Business Growth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div> {/* Softer gradient */}
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

      <SuccessStories />

      {/* Buying/Selling Sections */}
      <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
        <InfoSections />
      </div>

      {/* In the Press */}
      <Press />
       {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 font-sans"> {/* Ensure font, z-index, position */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <p className="mb-1">
                {t('cookies.message') || 'We use cookies to improve your experience, analyze traffic, and for marketing purposes.'}
              </p>
              <p className="text-gray-300 text-xs">
                {t('cookies.learnMore') || 'By continuing to use our site, you accept our'}{' '}
                <a
                  href="/privacy" // Link to your actual privacy policy page
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer" // Security best practice
                  className="text-gray-500 hover:underline" // Use theme color for link
                >
                  {t('cookies.privacyPolicyLink') || 'Privacy Policy'}
                </a>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {/* Optional: Decline button. Be aware of legal requirements in your jurisdiction. */}
              {/* <Button
                variant="outline"
                size="sm"
                onClick={handleDeclineCookies}
                textColorClass="text-white"
                borderColorClass="border-white"
                hoverBgClass="hover:bg-white/10"
                className="w-full sm:w-auto"
              >
                {t('cookies.decline') || 'Decline'}
              </Button> */}
              <Button
                variant="primary" // Uses theme primary color
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