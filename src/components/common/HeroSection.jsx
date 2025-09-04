// src/components/common/HeroSection.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
// Import the updated Button component
import Button from './Button'; // Adjust the path if necessary

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    // 1. Changed background to white for light mode
    <section className="min-h-screen w-full flex items-center justify-center bg-white pt-16 pb-12 overflow-x-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* 2. Text Content - Updated text colors for light background */}
          <div className="text-gray-900"> {/* Changed from text-white */}
            <div className="mb-5">
              {/* 3. Typography: Using Outfit via font-sans, tag background now uses brand color subtly on light bg */}
              <span className="inline-block px-3 py-1 text-sm font-normal bg-logo-dark-blue/10 rounded-full"> {/* Changed bg */}
                {t('hero.tagline')}
              </span>
            </div>
            {/* 3. Typography: Headline - Using Outfit, reduced weight for minimalism, dark text */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-5">
              {t('hero.title')}
            </h1>
            {/* 3. Typography: Body - Using Outfit, dark text */}
            <p className="text-lg md:text-xl text-gray-600 mb-7 max-w-2xl leading-relaxed"> {/* Changed text color */}
              {t('about.hero.subtitle')}
            </p>

            {/* Using the updated, minimal Button component for consistency */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Button 1: Secondary variant works great on white */}
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/explore')}
              >
                {t('hero.explore')}
              </Button>
              {/* Button 2: Changed to Secondary variant for consistency on light background */}
              {/* Removed incorrect props for outline variant, using standard secondary */}
              <Button
                variant="secondary" // Correct variant for light background
                size="md"
                onClick={() => navigate('/how-it-works')}
              >
                {t('hero.howItWorks')}
              </Button>
            </div>
          </div>

          {/* Unique Visual Content */}
          <div className="relative">
            {/* 3. Updated card background for visibility on white page */}
            <div className="bg-gray-50 backdrop-blur-sm rounded-xl p-5 md:p-6">
              {/* Stats Visualization */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
                {/* 4. Stat items now have white backgrounds */}
                <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-xs border border-gray-200"> {/* Added bg, shadow, border */}
                  {/* 1.1 Logo Color Principle: Use brand color for key numbers */}
                  <div className="text-xl md:text-2xl font-semibold text-logo-dark-blue"> {/* Changed text color */}
                    <CountUp end={30} duration={3} suffix="+" />
                  </div>
                  {/* 4. Typography: Softer color for labels */}
                  <div className="text-xs text-gray-500 mt-1">{t('businessGrowth.countries')}</div> {/* Changed text color */}
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-xs border border-gray-200">
                  <div className="text-xl md:text-2xl font-semibold text-logo-dark-blue">
                    <CountUp end={60} duration={3} suffix="K+" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{t('about.dealers')}</div>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-xs border border-gray-200">
                  <div className="text-xl md:text-2xl font-semibold text-logo-dark-blue">
                    <CountUp end={6} duration={3} prefix="€" suffix="B+" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{t('about.revenue')}</div>
                </div>
              </div>

              {/* Interactive Path Visualization */}
              <div className="relative">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    {/* 1.1 Logo Color Principle: Use brand color icon */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-logo-dark-blue/10 flex items-center justify-center mx-auto mb-1.5"> {/* Changed bg */}
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Changed icon color */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {/* 4. Typography: Softer color for labels */}
                    <span className="text-xs text-gray-500">Buyer</span> {/* Changed text color */}
                  </div>

                  <div className="flex-1 mx-1 md:mx-2">
                    <div className="h-1 bg-gray-300 rounded-full relative"> {/* Changed track color */}
                      <div className="absolute top-0 left-0 h-full w-1/2 bg-logo-dark-blue rounded-full"></div> {/* Brand color fill */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center border-2 border-logo-dark-blue"> {/* White center, brand border */}
                        {/* 1.1 Logo Color Principle: Use Logo Dark Blue icon */}
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-logo-dark-blue" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-logo-dark-blue/10 flex items-center justify-center mx-auto mb-1.5">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Changed icon color */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">Seller</span> {/* Changed text color */}
                  </div>
                </div>

                {/* Key Benefits - Minimal list styling */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    {/* 1.1 Logo Color Principle: Use brand color icon */}
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-logo-dark-blue/10 flex items-center justify-center mt-1"> {/* Changed bg */}
                      <svg className="w-2.5 h-2.5 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Changed icon color */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {/* 4. Typography: Body text, dark color */}
                    <p className="text-gray-600 text-sm">{t('hero.benefit1')}</p> {/* Changed text color */}
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-logo-dark-blue/10 flex items-center justify-center mt-1">
                      <svg className="w-2.5 h-2.5 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm">{t('hero.benefit2')}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-logo-dark-blue/10 flex items-center justify-center mt-1">
                      <svg className="w-2.5 h-2.5 text-logo-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm">{t('hero.benefit3')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element - Kept brand color reference */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-logo-dark-blue/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-base sm:text-lg font-semibold text-logo-dark-blue">100%</div> {/* Changed text color to brand */}
                <div className="text-[0.55rem] sm:text-xs text-gray-500 px-1">{t('hero.digital')}</div> {/* Changed text color */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;