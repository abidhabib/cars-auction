// src/pages/AboutPage/AboutPage.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
// Import the updated Button component
import Button from '../../components/common/Button';
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
    // Ensure Outfit font is applied
    <div className="overflow-x-hidden max-w-full font-sans">
      {/* Hero Section - Simplified with style guide colors and minimal design */}
      {/* 1. Primary Colors: Using theme colors for gradient */}
     {/* Light Mode Hero Section - Simplified */}
<div className="relative bg-gradient-to-r from-gray-100 to-white py-14 px-4 md:py-18">
  <div className="max-w-7xl mx-auto px-4">
    {/* Breadcrumb - Text colors need adjustment for light background */}
    <nav className="flex mb-5">
      <ol className="inline-flex items-center text-gray-600 text-sm"> {/* Changed text color */}
        {/* ... breadcrumb items ... */}
        {/* Make sure Link styles inside adapt to light background, e.g., text-gray-500 hover:text-gray-800 */}
      </ol>
    </nav>

    <div className="max-w-3xl">
      {/* Headings and Text - Adjusted for light background */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4"> {/* Changed text color */}
        {t('about.hero.title')}
      </h1>
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl mb-7"> {/* Changed text color */}
        {t('about.hero.subtitle')}
      </p>
      {/* Buttons - Use variants suitable for light background */}
      <div className="flex flex-wrap gap-3">
        {/* Example using primary and outline variants on light bg */}
        <Button variant="primary" size="md">
          {t('about.learnMore')}
        </Button>
        <Button variant="outline" size="md">
          {t('about.contactUs')}
        </Button>
         {/* Or define specific light-mode button variants if needed */}
      </div>
    </div>
  </div>
</div>

      {/* Main Content - Simplified Design */}
      <div id="content" className="max-w-7xl mx-auto px-4 py-14"> {/* Reduced padding */}

        {/* Business Overview - Minimal styling */}
        <div className="bg-gray-50 rounded-lg p-6 md:p-8 mb-12"> {/* Reduced rounding/padding/margin */}
          {/* 3. Typography & 4. Minimal Design: Reduced weight */}
          <h2 className="text-2xl md:text-3xl font-semibold text-logo-dark-blue mb-5"> {/* Reduced weight/margin */}
            {t('about.businessTitle')}
          </h2>
          {/* 3. Typography: Body text */}
          <p className="text-gray-700 leading-relaxed max-w-4xl text-base"> {/* Reduced text size */}
            {t('about.businessDescription')}
          </p>
        </div>

        {/* Buy & Sell Sections - Reduced spacing */}
        <div className="space-y-16 mb-12"> {/* Reduced spacing/margin */}
          {/* Buy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"> {/* Reduced gap */}
            <div className="order-1 lg:order-1">
              <img 
                src="https://ecarstrade.com/upload/modules/mod_page_about/history/7.jpg?v=1755867493"
                alt={t('about.buyImageAlt')}
                className="w-full h-auto rounded-lg shadow-sm object-cover" // Reduced rounding/shadow
              />
            </div>
            <div className="order-2 lg:order-2">
              {/* 1. Primary Colors: Theme color for accent text */}
              <div className="text-logo-dark-blue font-medium mb-3"> {/* Reduced weight/margin */}
                {t('about.forBuyers')}
              </div>
              {/* 3. Typography & 4. Minimal Design: Reduced weight */}
              <h3 className="text-2xl md:text-3xl font-semibold text-logo-dark-blue mb-4"> {/* Reduced weight/margin */}
                {t('about.buyTitle')}
              </h3>
              {/* 3. Typography: Body text */}
              <p className="text-gray-600 mb-5 leading-relaxed text-sm"> {/* Reduced margin/text size */}
                {t('about.buyDescription')}
              </p>
              {/* Simplified benefit list */}
              <div className="space-y-3"> {/* Reduced spacing */}
                <div className="flex items-start">
                  {/* 1. Primary Colors: Theme color for icon background */}
                  <div className="w-5 h-5 bg-logo-dark-blue rounded flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Smaller circle, reduced margin */}
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"> {/* Smaller icon */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    {/* 3. Typography: Body text */}
                    <p className="text-gray-700 text-sm">{t('about.buyBenefit1')}</p> {/* Smaller text */}
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-logo-dark-blue rounded flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">{t('about.buyBenefit2')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-logo-dark-blue rounded flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">{t('about.buyBenefit3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sell Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"> {/* Reduced gap */}
            <div className="order-2 lg:order-2">
              <img 
                src="https://ecarstrade.com/upload/modules/mod_page_about//intro/1.jpg?v=1755867493"
                alt={t('about.sellImageAlt')}
                className="w-full h-auto rounded-lg shadow-sm object-cover" // Reduced rounding/shadow
              />
            </div>
            <div className="order-1 lg:order-1">
              {/* 1. Primary Colors: Theme color for accent text */}
              <div className="text-logo-dark-blue font-medium mb-3"> {/* Reduced weight/margin */}
                {t('about.forSellers')}
              </div>
              {/* 3. Typography & 4. Minimal Design: Reduced weight */}
              <h3 className="text-2xl md:text-3xl font-semibold text-logo-dark-blue mb-4"> {/* Reduced weight/margin */}
                {t('about.sellTitle')}
              </h3>
              {/* 3. Typography: Body text */}
              <p className="text-gray-600 mb-5 leading-relaxed text-sm"> {/* Reduced margin/text size */}
                {t('about.sellDescription')}
              </p>
              {/* Simplified benefit list with titles */}
              <div className="space-y-3"> {/* Reduced spacing */}
                <div className="flex items-start">
                  {/* 1. Primary Colors: Theme color for icon background */}
                  <div className="w-5 h-5 bg-logo-dark-blue rounded flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Smaller circle, reduced margin */}
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"> {/* Smaller icon */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    {/* 3. Typography: Subheading/body text */}
                    <h4 className="font-medium text-gray-800 mb-1 text-sm">{t('about.sellBenefit1Title')}</h4> {/* Reduced weight/margin/text size */}
                    <p className="text-gray-600 text-xs">{t('about.sellBenefit1Desc')}</p> {/* Smaller text */}
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-logo-dark-blue rounded flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1 text-sm">{t('about.sellBenefit2Title')}</h4>
                    <p className="text-gray-600 text-xs">{t('about.sellBenefit2Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info - Minimal styling */}
        <div className="bg-white rounded-lg p-6 md:p-8 mb-12 border border-gray-200"> {/* Reduced rounding/padding/margin, added border */}
          <div className="text-center mb-10"> {/* Reduced margin */}
            {/* 3. Typography & 4. Minimal Design: Reduced weight */}
            <h2 className="text-2xl md:text-3xl font-semibold text-logo-dark-blue mb-4"> {/* Reduced weight/margin */}
              {t('about.companyInfoTitle')}
            </h2>
            {/* 3. Typography: Body text */}
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base"> {/* Reduced text size */}
              {t('about.companyDescription')}
            </p>
          </div>
        </div>

        {/* Success Stories Component - Already updated */}
        <SuccessStories />
      
      </div>
    </div>
  );
};

export default AboutPage;