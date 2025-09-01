// src/components/common/HeroSection.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#3b396d] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 rounded-full">
                Car Network Europe
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => navigate('/buy')}
                className="px-8 py-4 bg-white text-[#3b396d] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg"
              >
                {t('hero.buySection.cta')}
              </button>
              <button 
                onClick={() => navigate('/sell')}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-300 text-lg"
              >
                {t('hero.sellSection.cta')}
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white mb-2">3,000+</div>
                <div className="text-white/80">{t('hero.buySection.points')[0]}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">30,000+</div>
                <div className="text-white/80">{t('hero.buySection.points')[1]}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">60,000+</div>
                <div className="text-white/80">{t('hero.sellSection.points')[2]}</div>
              </div>
            </div>
          </div>
          
          {/* Visual Content */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-8">
                {/* Buy Section */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">{t('hero.buySection.title')}</h3>
                  <div className="space-y-5">
                    {t('hero.buySection.points').map((point, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-white/90">{point}</p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/buy')}
                    className="mt-6 w-full py-3 bg-white text-[#3b396d] font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {t('hero.buySection.cta')}
                  </button>
                </div>
                
                <div className="h-px bg-white/20"></div>
                
                {/* Sell Section */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">{t('hero.sellSection.title')}</h3>
                  <div className="space-y-5">
                    {t('hero.sellSection.points').map((point, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-white/90">{point}</p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/sell')}
                    className="mt-6 w-full py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-colors"
                  >
                    {t('hero.sellSection.cta')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;