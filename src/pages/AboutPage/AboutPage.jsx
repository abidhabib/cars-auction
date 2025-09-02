// src/pages/AboutPage/AboutPage.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const { t, language } = useLanguage();

  // Breadcrumb items
  const breadcrumbItems = [
    { 
      name: t('Home'), 
      href: `/${language === 'en' ? '' : language}` || '/' 
    },
    { 
      name: t('about.title'), 
      href: `/${language === 'en' ? '' : language}/about`.replace(/^\/\//, '/')
    }
  ].filter(item => item.href !== '//');

  return (
    <div className="pt-10 overflow-x-hidden max-w-full">
      {/* Hero Section with Blurred Background */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full opacity-5 animate-ping"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-[#2a285a] rounded-full opacity-20 animate-bounce"></div>
        
        {/* Blurred background image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&h=400&q=80"
            alt=""
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3b396d] to-[#2a285a] opacity-80"></div>
        </div>
        
        {/* Content overlay with entrance animation */}
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex mb-6 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
            <ol className="inline-flex items-center text-white text-sm">
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
            <p className="text-white text-opacity-90 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
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

      {/* Main Content - Modern Design with Animations */}
      <div id="content" className="max-w-7xl mx-auto px-4 py-16">
        {/* Stats Section - STATIC NUMBERS (No Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
            <div className="absolute top-4 right-4 w-3 h-3 bg-[#3b396d] rounded-full opacity-20 group-hover:animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#2a285a] rounded-full opacity-10"></div>
            <div className="text-3xl md:text-4xl font-bold text-[#3b396d] mb-2 font-mono">
              30+
            </div>
            <div className="text-gray-600 font-medium text-lg">{t('about.countries')}</div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b396d] to-[#2a285a] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </div>
          
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
            <div className="absolute top-4 right-4 w-3 h-3 bg-[#3b396d] rounded-full opacity-20 group-hover:animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#2a285a] rounded-full opacity-10"></div>
            <div className="text-3xl md:text-4xl font-bold text-[#3b396d] mb-2 font-mono">
              60,000+
            </div>
            <div className="text-gray-600 font-medium text-lg">{t('about.dealers')}</div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b396d] to-[#2a285a] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </div>
          
          <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
            <div className="absolute top-4 right-4 w-3 h-3 bg-[#3b396d] rounded-full opacity-20 group-hover:animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#2a285a] rounded-full opacity-10"></div>
            <div className="text-3xl md:text-4xl font-bold text-[#3b396d] mb-2 font-mono">
              615,300+
            </div>
            <div className="text-gray-600 font-medium text-lg">{t('about.carsSold')}</div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b396d] to-[#2a285a] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Business Overview - Animated Card */}
        <div 
          id="business-overview"
          data-animate
          className={`bg-gradient-to-r from-[#3b396d] to-[#2a285a] text-white rounded-2xl p-8 md:p-12 mb-20 shadow-xl transform transition-all duration-700`}
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {t('about.businessTitle')}
            </h2>
          </div>
          <p className="text-lg text-white text-opacity-90 leading-relaxed max-w-4xl">
            {t('about.businessDescription')}
          </p>
        </div>

        {/* Buy & Sell Sections - Animated Alternating Layout */}
        <div className="space-y-24">
          {/* Buy Section */}
          <div 
            id="buy-section"
            data-animate
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform transition-all duration-700`}
          >
            <div className="order-1 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#3b396d] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#2a285a] rounded-full opacity-10 animate-ping"></div>
                <div className="relative bg-white p-1 rounded-2xl shadow-lg animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&h=300&q=80"
                    alt={t('about.buyImageAlt')}
                    className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="inline-block bg-[#f8f9ff] text-[#3b396d] px-4 py-2 rounded-full text-sm font-medium mb-4 animate-bounce-in">
                {t('about.forBuyers')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-5 animate-slide-in-left">
                {t('about.buyTitle')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in">
                {t('about.buyDescription')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start group animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                  <div className="w-8 h-8 bg-[#3b396d] rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700">{t('about.buyBenefit1')}</p>
                  </div>
                </div>
                <div className="flex items-start group animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                  <div className="w-8 h-8 bg-[#3b396d] rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700">{t('about.buyBenefit2')}</p>
                  </div>
                </div>
                <div className="flex items-start group animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                  <div className="w-8 h-8 bg-[#3b396d] rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700">{t('about.buyBenefit3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sell Section */}
          <div 
            id="sell-section"
            data-animate
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform transition-all duration-700`}
          >
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#3b396d] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#2a285a] rounded-full opacity-10 animate-ping"></div>
                <div className="relative bg-white p-1 rounded-2xl shadow-lg animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&h=300&q=80"
                    alt={t('about.sellImageAlt')}
                    className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#f8f9ff] text-[#3b396d] px-4 py-2 rounded-full text-sm font-medium mb-4 animate-bounce-in">
                {t('about.forSellers')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-5 animate-slide-in-right">
                {t('about.sellTitle')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in">
                {t('about.sellDescription')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start group animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                  <div className="w-8 h-8 bg-[#3b396d] rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('about.sellBenefit1Title')}</h4>
                    <p className="text-gray-600 text-sm">{t('about.sellBenefit1Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start group animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                  <div className="w-8 h-8 bg-[#3b396d] rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('about.sellBenefit2Title')}</h4>
                    <p className="text-gray-600 text-sm">{t('about.sellBenefit2Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info - Animated Card */}
        <div 
          id="company-info"
          data-animate
          className={`bg-white rounded-2xl p-8 md:p-12 my-20 shadow-xl border border-gray-100 transform transition-all duration-700`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#3b396d] text-white px-6 py-3 rounded-full text-lg font-bold mb-6 animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
              CarAuction Group
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-5 animate-fade-in-down">
              {t('about.companyInfoTitle')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg animate-fade-in-up">
              {t('about.companyDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="text-center group animate-slide-in-up"
              style={{animationDelay: '0.1s'}}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#3b396d] to-[#2a285a] rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white animate-pulse">€6.3B</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{t('about.revenue')}</h3>
              <p className="text-gray-600 text-sm">{t('about.in2024')}</p>
            </div>
            <div 
              className="text-center group animate-slide-in-up"
              style={{animationDelay: '0.2s'}}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white animate-pulse">30+</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{t('about.countries')}</h3>
              <p className="text-gray-600 text-sm">{t('about.operations')}</p>
            </div>
            <div 
              className="text-center group animate-slide-in-up"
              style={{animationDelay: '0.3s'}}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#3b396d] to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white animate-pulse">100%</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{t('about.digital')}</h3>
              <p className="text-gray-600 text-sm">{t('about.platform')}</p>
            </div>
          </div>
        </div>

        {/* CTA - Animated Gradient */}
        <div 
          id="cta"
          data-animate
          className={`bg-gradient-to-r from-[#3b396d] via-[#2a285a] to-[#1a184a] text-white rounded-2xl p-12 md:p-16 text-center shadow-2xl transform transition-all duration-700`}
        >
          <div className="flex justify-center mb-6">
            <div className="w-4 h-4 bg-white rounded-full mr-2 animate-bounce"></div>
            <div className="w-4 h-4 bg-white rounded-full mr-2 animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 animate-fade-in-down">
            {t('about.readyToStart')}
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            {t('about.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <a 
              href={`/${language === 'en' ? '' : language}/contact`.replace(/^\/\//, '/')} 
              className="px-8 py-4 bg-white text-[#3b396d] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse hover:animate-none"
            >
              {t('about.contactUs')}
            </a>
            <a 
              href={`/${language === 'en' ? '' : language}/auctions`.replace(/^\/\//, '/')} 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#3b396d] transition-all duration-300 shadow-lg transform hover:scale-105"
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