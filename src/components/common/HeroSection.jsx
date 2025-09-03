// src/components/common/HeroSection.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white  overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-[#3b396d]">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-[#3b396d]/10 text-[#3b396d] rounded-full">
                {t('hero.tagline')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/buying')}
                className="px-8 py-3.5 bg-[#3b396d] text-white font-semibold rounded-lg hover:bg-[#2a285a] transition-all duration-300 text-base shadow-lg hover:shadow-xl"
              >
                {t('hero.startBuying')}
              </button>
              <button 
                onClick={() => navigate('/selling')}
                className="px-8 py-3.5 bg-transparent text-[#3b396d] font-semibold rounded-lg border border-[#3b396d] hover:bg-[#3b396d] hover:text-white transition-all duration-300 text-base"
              >
                {t('hero.startSelling')}
              </button>
            </div>
          </div>
          
          {/* Unique Visual Content */}
          <div className="relative">
            <div className="bg-[#f8f9ff] rounded-2xl p-6 border border-gray-100">
              {/* Stats Visualization */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-[#3b396d]">
                    <CountUp end={30} duration={3} suffix="+" />
                  </div>
                  <div className="text-xs font-bold text-gray-600 mt-1">{t('businessGrowth.countries')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-[#3b396d]">
                    <CountUp end={60} duration={3} suffix="K+" />
                  </div>
                  <div className="text-xs font-bold text-gray-600 mt-1">{t('about.dealers')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-[#3b396d]">
                    <CountUp end={6} duration={3} prefix="€" suffix="B+" />
                  </div>
                  <div className="text-xs font-bold text-gray-600 mt-1">{t('about.revenue')}</div>
                </div>
              </div>
              
              {/* Interactive Path Visualization */}
              <div className="relative">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#3b396d]/10 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-600">Buyer</span>
                  </div>
                  
                  <div className="flex-1 mx-2">
                    <div className="h-1 bg-gray-200 rounded-full relative">
                      <div className="absolute top-0 left-0 h-full w-1/2 bg-[#3b396d] rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#3b396d] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#3b396d]/10 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-600">Seller</span>
                  </div>
                </div>
                
                {/* Key Benefits */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3b396d]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-bold text-sm">{t('hero.benefit1')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3b396d]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-bold text-sm">{t('hero.benefit2')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3b396d]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#3b396d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-bold text-sm">{t('hero.benefit3')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Element - Adjusted for mobile */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-[#3b396d]">100%</div>
                <div className="text-[0.6rem] sm:text-xs font-bold text-gray-600">{t('hero.digital')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;