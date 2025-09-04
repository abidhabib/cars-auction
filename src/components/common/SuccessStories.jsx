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
    // Font-sans for Outfit, reduced padding
    <section className="py-16 bg-gradient-to-br from-white to-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Reduced margins */}
        <div className="text-center mb-12">
          {/* 3. Minimal Design: Smaller tag */}
          <div className="inline-block px-3 py-1 bg-logo-dark-blue/10 rounded-full mb-3">
            <span className="text-logo-dark-blue font-normal text-xs"> {/* Reduced weight and size */}
              {t('successStories.tagline')}
            </span>
          </div>
          {/* 4. Typography & 3. Minimal Design: Smaller, lighter heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            {t('successStories.title')}
          </h2>
          {/* 4. Typography & 3. Minimal Design: Smaller subtitle */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('successStories.subtitle')}
          </p>
        </div>

        {/* Stats Section - Reduced margins and simplified cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200 text-center"> {/* Reduced padding, flatter shadow */}
            <div className="text-2xl font-semibold text-logo-dark-blue mb-1"> {/* Reduced size/weight */}
              <CountUp end={250} duration={3} suffix="+" />
            </div>
            <div className="text-gray-600 text-sm">Dealers</div> {/* Smaller text */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200 text-center">
            <div className="text-2xl font-semibold text-logo-dark-blue mb-1">
              <CountUp end={2} duration={3} prefix="€" suffix="B+" />
            </div>
            <div className="text-gray-600 text-sm">Transactions</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200 text-center">
            <div className="text-2xl font-semibold text-logo-dark-blue mb-1">
              <CountUp end={98} duration={3} suffix="%" />
            </div>
            <div className="text-gray-600 text-sm">Satisfaction</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200 text-center">
            <div className="text-2xl font-semibold text-logo-dark-blue mb-1">
              <CountUp end={15} duration={3} suffix="+" />
            </div>
            <div className="text-gray-600 text-sm">Countries</div>
          </div>
        </div>

        {/* Featured Stories - Reduced margin */}
        <div className="mb-12">
          {/* 4. Typography & 3. Minimal Design: Smaller heading */}
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {t('successStories.featured')}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large Featured Story - Reduced rounding/shadow */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
              <div className="md:flex">
                {/* 3. Minimal Design: Smaller image area */}
                <div className="md:w-2/5">
                  <img 
                    src={successStories[0]?.image || dealer1} 
                    alt={successStories[0]?.name || "Featured Dealer"}
                    className="w-full h-56 md:h-full object-cover" // Reduced height
                  />
                </div>
                <div className="p-6 md:w-3/5"> {/* Reduced padding */}
                  {/* 3. Minimal Design: Smaller tag */}
                  <div className="inline-block px-2.5 py-0.5 bg-logo-dark-blue/10 rounded-full mb-3">
                    <span className="text-logo-dark-blue text-[10px] font-normal">Featured Story</span> {/* Smaller text/weight */}
                  </div>
                  {/* 4. Typography & 3. Minimal Design: Smaller heading */}
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {successStories[0]?.name || "Leading Dealer"}
                  </h4>
                  {/* 4. Typography: Smaller body text */}
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {successStories[0]?.description || "Exceptional results through our platform"}
                  </p>
                  <div className="flex items-center">
                    {/* 1.1 Logo Color Principle: Theme color background, white text */}
                    <div className="w-9 h-9 rounded-full bg-logo-dark-blue flex items-center justify-center text-white font-normal text-sm mr-3"> {/* Smaller circle/font */}
                      {successStories[0]?.name?.charAt(0) || "D"}
                    </div>
                    <div>
                      {/* 4. Typography: Smaller text */}
                      <div className="font-medium text-gray-900 text-sm">{successStories[0]?.company || "Top Dealer"}</div>
                      <div className="text-xs text-gray-500">{successStories[0]?.location || "Germany"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stories - Reduced gap */}
            <div className="space-y-5">
              {successStories.slice(1, 3).map((story) => (
                <div key={story.id} className="bg-white rounded-lg p-5 shadow-xs border border-gray-200 hover:shadow-sm transition-shadow"> {/* Reduced rounding/padding/shadow */}
                  <div className="flex items-start">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-14 h-14 rounded-md object-cover mr-3" // Smaller image, reduced rounding
                    />
                    <div className="flex-1">
                      {/* 4. Typography: Smaller heading */}
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">{story.name}</h4>
                      {/* 4. Typography: Smaller body, consistent truncation */}
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">{story.description}</p>
                      {/* 4. Typography: Smaller meta text */}
                      <div className="text-[10px] text-gray-500">{story.company}, {story.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Grid - Reduced margin */}
        <div>
          {/* 4. Typography & 3. Minimal Design: Smaller heading */}
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {t('successStories.community')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Reduced gap */}
            {successStories.slice(3).map((story) => (
              <div 
                key={story.id} 
                className="bg-white rounded-lg p-5 shadow-xs border border-gray-200 hover:shadow-sm transition-all duration-300" // Reduced rounding/padding/shadow
              >
                <div className="flex items-center mb-3"> {/* Reduced margin */}
                  {/* 1.1 Logo Color Principle: Theme color background/text */}
                  <div className="w-10 h-10 rounded-full bg-logo-dark-blue/10 flex items-center justify-center text-logo-dark-blue font-normal text-sm mr-3"> {/* Smaller circle */}
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    {/* 4. Typography: Smaller text */}
                    <div className="font-medium text-gray-900 text-sm">{story.name}</div>
                    <div className="text-[10px] text-gray-500">{story.company}</div>
                  </div>
                </div>
                {/* 4. Typography: Smaller, italic body text */}
                <p className="text-gray-600 text-xs italic">"{story.description}"</p>
                <div className="flex mt-3"> {/* Reduced margin */}
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"> {/* Smaller stars */}
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