// src/components/common/InfoCard.jsx
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Scale Your Business With Us 
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform can help you grow your business and reach new heights.
          </p>
        </div>

        <div className="space-y-16">
          {infoData.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 p-8 md:p-12`}>
                {/* Content Side */}
                <div className="md:w-1/2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#3b396d] flex items-center justify-center text-white mr-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {item.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                          <div className="text-lg font-bold text-[#3b396d]">{stat.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button className="px-6 py-3 bg-[#3b396d] text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors">
                    {item.cta}
                  </button>
                  
                  {item.appLinks && (
                    <div className="flex flex-wrap gap-3 mt-6">
                      <a href="#" className="flex items-center px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.24 10.285V14.4h6.828v-4.115h-1.118c-.568 0-1.04-.188-1.432-.567-.392-.38-.588-.858-.588-1.432 0-.574.196-1.052.588-1.432.392-.38.864-.568 1.432-.568h1.118zM12.24 17.265v-1.145h6.828v1.145h-6.828zm0-5.82v-1.145h6.828v1.145h-6.828z"/>
                        </svg>
                        Google Play
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-xl shadow-md object-cover w-full h-full max-h-96"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-[#3b396d]/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-16 h-16 text-[#3b396d]" />
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