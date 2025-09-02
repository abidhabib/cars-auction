// src/pages/AboutPage/AboutPage.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import SuccessStories from '../../components/common/SuccessStories';

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
    <div className="overflow-x-hidden max-w-full">
      {/* Hero Section - Simplified */}
      <div className="relative bg-gradient-to-r from-[#3b396d] to-[#2a285a] py-16 px-4 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex mb-6">
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
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
              {t('about.hero.title')}
            </h1>
            <p className="text-white text-opacity-90 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
              {t('about.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#content" 
                className="px-6 py-3 bg-white text-[#3b396d] font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t('about.learnMore')}
              </a>
              <a 
                href={`/${language === 'en' ? '' : language}/contact`.replace(/^\/\//, '/')} 
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#3b396d] transition-colors"
              >
                {t('about.contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Simplified Design */}
      <div id="content" className="max-w-7xl mx-auto px-4 py-16">
       
        {/* Business Overview */}
        <div className="bg-[#f8f9ff] rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-6">
            {t('about.businessTitle')}
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-4xl text-lg">
            {t('about.businessDescription')}
          </p>
        </div>

        {/* Buy & Sell Sections */}
        <div className="space-y-20 mb-16">
          {/* Buy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-1">
              <img 
                src="https://ecarstrade.com/upload/modules/mod_page_about/history/7.jpg?v=1755867493"
                alt={t('about.buyImageAlt')}
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
            <div className="order-2 lg:order-2">
              <div className="text-[#3b396d] font-semibold mb-4">
                {t('about.forBuyers')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-5">
                {t('about.buyTitle')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('about.buyDescription')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#3b396d] rounded flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700">{t('about.buyBenefit1')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#3b396d] rounded flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700">{t('about.buyBenefit2')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#3b396d] rounded flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-2">
              <img 
                src="https://ecarstrade.com/upload/modules/mod_page_about//intro/1.jpg?v=1755867493"
                alt={t('about.sellImageAlt')}
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
            <div className="order-1 lg:order-1">
              <div className="text-[#3b396d] font-semibold mb-4">
                {t('about.forSellers')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-5">
                {t('about.sellTitle')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('about.sellDescription')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#3b396d] rounded flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('about.sellBenefit1Title')}</h4>
                    <p className="text-gray-600 text-sm">{t('about.sellBenefit1Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#3b396d] rounded flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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

        {/* Company Info */}
        <div className="bg-white rounded-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b396d] mb-5">
              {t('about.companyInfoTitle')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
              {t('about.companyDescription')}
            </p>
          </div>
          
        
        </div>
<SuccessStories/>
      
      </div>
    </div>
  );
};

export default AboutPage;