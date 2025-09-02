// src/pages/AboutPage/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, { threshold: 0.1 });

    // Observe all animated elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Breadcrumb items
  const breadcrumbItems = [
    { 
      name: t('navigation.home'), 
      href: `/${language === 'en' ? '' : language}` || '/' 
    },
    { 
      name: t('about.title'), 
      href: `/${language === 'en' ? '' : language}/about`.replace(/^\/\//, '/')
    }
  ].filter(item => item.href !== '//');

  return (
    <div className="pt-16 overflow-x-hidden max-w-full">
      {/* Hero Section with Blurred Background */}
      <div className="relative overflow-hidden">
        {/* Animated background elements - Hidden on mobile to prevent overflow */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse hidden md:block"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full opacity-5 animate-ping hidden md:block"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-[#2a285a] rounded-full opacity-20 animate-bounce hidden md:block"></div>
        
        {/* Blurred background image - Fixed to prevent overflow */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&h=400&q=80"
            alt=""
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3b396d] to-[#2a285a] opacity-80"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Breadcrumb - Made responsive to prevent overflow */}
          <nav className="flex mb-6">
            <ol className="inline-flex items-center text-white text-sm flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <li key={index} className="inline-flex items-center">
                  {index > 0 && <span className="mx-2 text-white text-opacity-70">/</span>}
                  <Link 
                    to={item.href}
                    className={`${
                      index === breadcrumbItems.length - 1 
                        ? 'font-medium' 
                        : 'text-white text-opacity-80 hover:text-opacity-100'
                    } hover:underline`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          
          <div className="max-w-3xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5">
              {t('about.hero.title')}
            </h1>
            <p className="text-white text-opacity-90 text-base md:text-lg leading-relaxed mb-8">
              {t('about.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <a 
                href="#content" 
                className="px-5 py-2.5 bg-white text-[#3b396d] font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm transform hover:scale-105 transition-transform duration-300"
              >
                {t('about.learnMore')}
              </a>
              <a 
                href={`/${language === 'en' ? '' : language}/contact`.replace(/^\/\//, '/')} 
                className="px-5 py-2.5 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#3b396d] transition-colors text-sm transform hover:scale-105 transition-transform duration-300"
              >
                {t('about.contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="content" className="max-w-7xl mx-auto px-4 py-16">
        {/* Stats Section - Made responsive to prevent overflow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div 
            id="stat1"
            data-animate
            className={`transform transition-all duration-700 ${
              isVisible.stat1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{transitionDelay: isVisible.stat1 ? '0.1s' : '0s'}}
          >
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-[#3b396d] mb-1">30+</div>
              <div className="text-gray-600 text-sm">{t('about.countries')}</div>
            </div>
          </div>
          
          <div 
            id="stat2"
            data-animate
            className={`transform transition-all duration-700 ${
              isVisible.stat2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{transitionDelay: isVisible.stat2 ? '0.2s' : '0s'}}
          >
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-[#3b396d] mb-1">60,000+</div>
              <div className="text-gray-600 text-sm">{t('about.dealers')}</div>
            </div>
          </div>
          
          <div 
            id="stat3"
            data-animate
            className={`transform transition-all duration-700 ${
              isVisible.stat3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{transitionDelay: isVisible.stat3 ? '0.3s' : '0s'}}
          >
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-[#3b396d] mb-1">615,300+</div>
              <div className="text-gray-600 text-sm">{t('about.carsSold')}</div>
            </div>
          </div>
        </div>

        {/* Business Overview */}
        <div 
          id="business-overview"
          data-animate
          className={`bg-gradient-to-r from-[#3b396d] to-[#2a285a] text-white rounded-xl p-6 md:p-8 mb-16 transform transition-all duration-700 ${
            isVisible['business-overview'] ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
            <h2 className="text-xl md:text-2xl font-bold">
              {t('about.businessTitle')}
            </h2>
          </div>
          <p className="text-base md:text-lg text-white text-opacity-90 leading-relaxed">
            {t('about.businessDescription')}
          </p>
        </div>

        {/* Buy & Sell Sections */}
        <div className="space-y-20">
          {/* Buy Section */}
          <div 
            id="buy-section"
            data-animate
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transform transition-all duration-700 ${
              isVisible['buy-section'] ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            <div className="order-1 lg:order-1">
              <div className="relative">
                {/* Hidden decorative elements on mobile to prevent overflow */}
                <div className="hidden md:block absolute -top-4 -left-4 w-20 h-20 bg-[#3b396d] rounded-full opacity-10 animate-pulse"></div>
                <div className="hidden md:block absolute -bottom-4 -right-4 w-16 h-16 bg-[#2a285a] rounded-full opacity-10 animate-ping"></div>
                <div className="relative bg-white p-1 rounded-xl shadow-lg animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&h=300&q=80"
                    alt={t('about.buyImageAlt')}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="inline-block bg-[#f8f9ff] text-[#3b396d] px-3 py-1 rounded-full text-xs font-medium mb-4 animate-bounce-in">
                {t('about.forBuyers')}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#3b396d] mb-4 animate-slide-in-left">
                {t('about.buyTitle')}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base animate-fade-in">
                {t('about.buyDescription')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                  <span className="text-[#3b396d] mr-2 mt-1">•</span>
                  <span className="text-gray-600 text-sm">{t('about.buyBenefit1')}</span>
                </div>
                <div className="flex items-start animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                  <span className="text-[#3b396d] mr-2 mt-1">•</span>
                  <span className="text-gray-600 text-sm">{t('about.buyBenefit2')}</span>
                </div>
                <div className="flex items-start animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                  <span className="text-[#3b396d] mr-2 mt-1">•</span>
                  <span className="text-gray-600 text-sm">{t('about.buyBenefit3')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sell Section */}
          <div 
            id="sell-section"
            data-animate
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transform transition-all duration-700 ${
              isVisible['sell-section'] ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Hidden decorative elements on mobile to prevent overflow */}
                <div className="hidden md:block absolute -top-4 -left-4 w-20 h-20 bg-[#3b396d] rounded-full opacity-10 animate-pulse"></div>
                <div className="hidden md:block absolute -bottom-4 -right-4 w-16 h-16 bg-[#2a285a] rounded-full opacity-10 animate-ping"></div>
                <div className="relative bg-white p-1 rounded-xl shadow-lg animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&h=300&q=80"
                    alt={t('about.sellImageAlt')}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#f8f9ff] text-[#3b396d] px-3 py-1 rounded-full text-xs font-medium mb-4 animate-bounce-in">
                {t('about.forSellers')}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#3b396d] mb-4 animate-slide-in-right">
                {t('about.sellTitle')}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base animate-fade-in">
                {t('about.sellDescription')}
              </p>
              <div className="space-y-3">
                <div className="animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{t('about.sellBenefit1Title')}</h4>
                  <p className="text-gray-600 text-xs">{t('about.sellBenefit1Desc')}</p>
                </div>
                <div className="animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{t('about.sellBenefit2Title')}</h4>
                  <p className="text-gray-600 text-xs">{t('about.sellBenefit2Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div 
          id="company-info"
          data-animate
          className={`bg-[#f8f9ff] rounded-xl p-6 md:p-8 my-16 transform transition-all duration-700 ${
            isVisible['company-info'] ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-[#3b396d] text-white px-4 py-2 rounded-full text-sm font-bold mb-5 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              CarAuction Group
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#3b396d] mb-4 animate-fade-in-down">
              {t('about.companyInfoTitle')}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base animate-fade-in-up">
              {t('about.companyDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div 
              className="text-center animate-slide-in-up"
              style={{animationDelay: '0.1s'}}
            >
              <div className="text-xl font-bold text-[#3b396d] mb-1">€6.3B</div>
              <div className="text-gray-600 text-xs">{t('about.in2024')}</div>
            </div>
            <div 
              className="text-center animate-slide-in-up"
              style={{animationDelay: '0.2s'}}
            >
              <div className="text-xl font-bold text-[#3b396d] mb-1">30+</div>
              <div className="text-gray-600 text-xs">{t('about.countries')}</div>
            </div>
            <div 
              className="text-center animate-slide-in-up"
              style={{animationDelay: '0.3s'}}
            >
              <div className="text-xl font-bold text-[#3b396d] mb-1">100%</div>
              <div className="text-gray-600 text-xs">{t('about.digital')}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div 
          id="cta"
          data-animate
          className={`bg-gradient-to-r from-[#3b396d] to-[#2a285a] text-white rounded-xl p-8 md:p-12 text-center transform transition-all duration-700 ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <div className="flex justify-center mb-5">
            <div className="w-3 h-3 bg-white rounded-full mr-1 animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full mr-1 animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 animate-fade-in-down">
            {t('about.readyToStart')}
          </h2>
          <p className="text-white text-opacity-90 mb-7 leading-relaxed text-sm md:text-base animate-fade-in-up">
            {t('about.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <a 
              href={`/${language === 'en' ? '' : language}/contact`.replace(/^\/\//, '/')} 
              className="px-6 py-3 bg-white text-[#3b396d] font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm transform hover:scale-105 transition-transform duration-300"
            >
              {t('about.contactUs')}
            </a>
            <a 
              href={`/${language === 'en' ? '' : language}/auctions`.replace(/^\/\//, '/')} 
              className="px-6 py-3 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#3b396d] transition-colors text-sm transform hover:scale-105 transition-transform duration-300"
            >
              {t('about.exploreAuctions')}
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;