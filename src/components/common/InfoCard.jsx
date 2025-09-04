// src/components/common/InfoCard.jsx
import { IoCarSportOutline } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import { FaMapMarkedAlt } from "react-icons/fa";
// Import the updated Button component
import Button from './Button'; // Adjust path as necessary

const InfoSections = () => {
  const { t } = useLanguage();
  
  const infoData = [
    {
      title: t('info.business.title'),
      description: t('info.business.description'),
      cta: t('common.startBuying'),
      icon: FaMapMarkedAlt,
      image: "/info/business-growth.jpg",
      reverse: false,
      stats: [
        { label: "6,434+", value: t('info.business.stats.partners') },
        { label: "3,411", value: t('info.business.stats.inventory') },
        { label: "5,921+", value: t('info.business.stats.daily') }
      ]
    },
    {
      title: t('info.buying.title'),
      description: t('info.buying.description'),
      cta: t('common.startBuying'),
      icon: IoCarSportOutline,
      reverse: true,
      image: "/info/buying-cars.jpg",
      appLinks: true
    },
    {
      title: t('info.selling.title'),
      description: t('info.selling.description'),
      cta: t('common.startSelling'),
      icon: MdSell,
      reverse: false,
      image: "/info/selling-cars.jpg",
      appLinks: true
    }
  ];

  return (
    // Font-sans for Outfit
    <section className="py-10 sm:py-14 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          {/* 3. Minimal Design & 4. Typography: Smaller, lighter heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            Scale Your Business With Us
          </h2>
          {/* 4. Typography: Smaller subtitle */}
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover how our platform can help you grow your business and reach new heights.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {infoData.map((item, index) => (
            <div 
              key={index}
              // 3. Minimal Design: Reduced rounding, flatter shadow/border
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
            >
              {/* 3. Minimal Design: Reduced padding */}
              <div className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-5 sm:gap-6 p-5 sm:p-6 md:p-8`}>
                {/* Content Side */}
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    {/* 1.1 Logo Color Principle & 3. Minimal Design: Theme color background, white icon, smaller size */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-logo-dark-blue flex items-center justify-center text-white mr-3">
                      <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    {/* 4. Typography: Subheading with reduced weight */}
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  
                  {/* 4. Typography: Body text */}
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.stats && (
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {item.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center p-2 bg-white rounded-md border border-gray-200">
                          {/* 1.1 Logo Color Principle: Theme color for stats */}
                          <div className="text-sm font-semibold text-logo-dark-blue">{stat.label}</div>
                          <div className="text-[9px] sm:text-xs text-gray-500 mt-0.5">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Using the updated Button component */}
                  <Button variant="primary" size="md">
                    {item.cta}
                  </Button>
                  
                  {item.appLinks && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {/* Simplified App Store buttons */}
                      <a href="#" className="flex items-center px-3 py-2 bg-black text-white text-xs rounded-md hover:bg-gray-800 transition-colors">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 20.5v-17c0-0.3 0.2-0.5 0.5-0.5h17c0.3 0 0.5 0.2 0.5 0.5v17c0 0.3-0.2 0.5-0.5 0.5h-17c-0.3 0-0.5-0.2-0.5-0.5zM18 2h-12v1h12v-1zM18 4h-12v1h12v-1zM18 6h-12v1h12v-1z"/>
                        </svg>
                        Google Play
                      </a>
                      <a href="#" className="flex items-center px-3 py-2 bg-black text-white text-xs rounded-md hover:bg-gray-800 transition-colors">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                        App Store
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Image Side */}
                <div className="md:w-1/2 flex items-center justify-center">
                  {item.image ? (
                    <div className="relative w-full">
                      {/* 3. Minimal Design: Reduced rounding */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-md shadow-xs object-cover w-full h-full max-h-52 sm:max-h-72 md:max-h-80" // Slightly reduced max heights
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 sm:h-56 bg-logo-dark-blue/10 rounded-md flex items-center justify-center">
                      <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-logo-dark-blue" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSections;