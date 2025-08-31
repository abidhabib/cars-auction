// HeroSection.jsx
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car3 from "../../assets/car3.jpg";

const images = [car1, car2, car3];

const HeroSection = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-white overflow-hidden pt-16 lg:pt-20">
      {/* Background Slideshow */}
      
      <div className="absolute inset-0 z-0">
        {images.map((image, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image}
              alt={`Car background ${i + 1}`}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.parentElement.style.backgroundColor = '#1a1a1a';
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        {/* Additional mobile overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 sm:hidden" />
      </div>
      

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-16 py-20 text-center min-h-screen flex flex-col justify-center">
      
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-break-all mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-2xl">
          {t('hero.title')}
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto w-full">
          {/* Buy Cars */}
          <article className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-md ring-1 ring-white/20 hover:ring-blue-300/50 transition-all duration-300 group">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              {t('hero.buySection.title')}
            </h2>
            <ul className="mt-4 space-y-3 text-white/90 text-left">
              {t('hero.buySection.points').map((point, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 group-hover:scale-125 transition-transform"></span>
                  {point}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25">
              {t('hero.buySection.cta')}
            </button>
          </article>

          {/* Sell Cars */}
          <article className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-md ring-1 ring-white/20 hover:ring-orange-300/50 transition-all duration-300 group">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
              {t('hero.sellSection.title')}
            </h2>
            <ul className="mt-4 space-y-3 text-white/90 text-left">
              {t('hero.sellSection.points').map((point, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-orange-400 mr-2 group-hover:scale-125 transition-transform"></span>
                  {point}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25">
              {t('hero.sellSection.cta')}
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;