// src/components/common/SuccessStories.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import dealer1 from '../../assets/success-stories/dealer1.jpg';
import dealer2 from '../../assets/success-stories/dealer2.jpg';
import dealer3 from '../../assets/success-stories/dealer3.jpg';
import dealer4 from '../../assets/success-stories/dealer4.jpg';
import dealer5 from '../../assets/success-stories/dealer5.jpg';
import dealer6 from '../../assets/success-stories/dealer6.jpg';
import dealer7 from '../../assets/success-stories/dealer7.jpg';
import dealer8 from '../../assets/success-stories/dealer8.jpg';
import CountUp from 'react-countup';
const SuccessStories = () => {
  const { t } = useLanguage();
  
  const images = [dealer1, dealer2, dealer3, dealer4, dealer5, dealer6, dealer7, dealer8];
  const successStories = t('successStories.stories').map((story, index) => ({
    id: index + 1,
    image: images[index],
    name: story.name,
    description: story.description,
    company: story.company || "Car Network Dealer",
    location: story.location || "Europe"
  }));

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#3b396d]/10 rounded-full mb-4">
            <span className="text-[#3b396d] font-medium text-sm">
              {t('successStories.tagline')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('successStories.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('successStories.subtitle')}
          </p>
        </div>

       {/* Stats Section */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
    <div className="text-3xl font-bold text-[#3b396d] mb-2">
      <CountUp end={250} duration={3} suffix="+" />
    </div>
    <div className="text-gray-600">Dealers</div>
  </div>
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
    <div className="text-3xl font-bold text-[#3b396d] mb-2">
      <CountUp end={2} duration={3} prefix="€" suffix="B+" />
    </div>
    <div className="text-gray-600">Transactions</div>
  </div>
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
    <div className="text-3xl font-bold text-[#3b396d] mb-2">
      <CountUp end={98} duration={3} suffix="%" />
    </div>
    <div className="text-gray-600">Satisfaction</div>
  </div>
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
    <div className="text-3xl font-bold text-[#3b396d] mb-2">
      <CountUp end={15} duration={3} suffix="+" />
    </div>
    <div className="text-gray-600">Countries</div>
  </div>
</div>
        {/* Featured Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('successStories.featured')}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Large Featured Story */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img 
                    src={successStories[0]?.image || dealer1} 
                    alt={successStories[0]?.name || "Featured Dealer"}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-3/5">
                  <div className="inline-block px-3 py-1 bg-[#3b396d]/10 rounded-full mb-4">
                    <span className="text-[#3b396d] text-xs font-medium">Featured Story</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    {successStories[0]?.name || "Leading Dealer"}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {successStories[0]?.description || "Exceptional results through our platform"}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#3b396d] flex items-center justify-center text-white font-bold mr-3">
                      {successStories[0]?.name?.charAt(0) || "D"}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {successStories[0]?.company || "Top Dealer"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {successStories[0]?.location || "Germany"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stories */}
            <div className="space-y-6">
              {successStories.slice(1, 3).map((story) => (
                <div key={story.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{story.name}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{story.description}</p>
                      <div className="text-xs text-gray-500">{story.company}, {story.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('successStories.community')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.slice(3).map((story) => (
              <div 
                key={story.id} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#3b396d]/10 flex items-center justify-center text-[#3b396d] font-bold mr-3">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-xs text-gray-500">{story.company}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"{story.description}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;