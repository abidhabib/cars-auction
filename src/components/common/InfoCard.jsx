// src/components/InfoSections.jsx

import { IoCarSportOutline } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import { FaMapMarkedAlt } from "react-icons/fa";

const InfoSections = () => {
  const { t } = useLanguage();
  
  const infoData = [
    {
      title: t('info.business.title'),
      description: t('info.business.description'),
      cta: t('common.startBuying'),
      ctaColor: "bg-blue-600 hover:bg-blue-700",
      icon: FaMapMarkedAlt,
      image: "/info/business-growth.jpg",
      reverse: false,
      stats: [
        { label: "60,000+", value: t('info.business.stats.partners') },
        { label: "30,000+", value: t('info.business.stats.inventory') },
        { label: "3,000+", value: t('info.business.stats.daily') }
      ]
    },
    {
      title: t('info.buying.title'),
      description: t('info.buying.description'),
      cta: t('common.startBuying'),
      ctaColor: "bg-blue-600 hover:bg-blue-700",
      icon: IoCarSportOutline,
      reverse: true,
      image: "/info/buying-cars.jpg",
      appLinks: true
    },
    {
      title: t('info.selling.title'),
      description: t('info.selling.description'),
      cta: t('common.startSelling'),
      ctaColor: "bg-orange-500 hover:bg-orange-600",
      icon: MdSell,
      reverse: false,
      image: "/info/selling-cars.jpg",
      appLinks: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {infoData.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl shadow-lg mb-8 ${
              item.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Background Color */}
            <div 
              className={`absolute inset-0 ${
                item.reverse ? "left-0" : "right-0"
              } w-1 h-full ${item.reverse ? "bg-blue-600" : "bg-orange-500"} z-0`}
            />
            
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 relative z-10">
              {/* Left Side - Text */}
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <item.icon className="w-10 h-10 mr-3 text-pink-800 rounded" />
                  <h2 className="text-2xl font-bold  text-[#f97316]">{item.title}</h2>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>
                
               
                
                <button
                  className={`px-6 py-3 rounded-lg font-medium text-white ${item.ctaColor}`}
                >
                  {item.cta}
                </button>
              </div>
<frameElement/>
              {/* Right Side - Image */}
              <div className="flex-1 flex justify-center">
                {item.image ? (
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full max-w-md rounded-lg object-contain"
                    />

                    {item.appLinks && (
                      <div className="flex space-x-4 mt-4">
                        <a href="#" className="flex items-center px-3 py-2 bg-black text-white text-xs rounded">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.828v-4.115h-1.118c-.568 0-1.04-.188-1.432-.567-.392-.38-.588-.858-.588-1.432 0-.574.196-1.052.588-1.432.392-.38.864-.568 1.432-.568h1.118zM12.24 17.265v-1.145h6.828v1.145h-6.828zm0-5.82v-1.145h6.828v1.145h-6.828z"/>
                          </svg>
                          Google Play
                        </a>
                        <a href="#" className="flex items-center px-3 py-2 bg-black text-white text-xs rounded">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                          </svg>
                          App Store
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                 <item.icon/>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSections;