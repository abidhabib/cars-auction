// src/components/common/SuccessStories.jsx
import { useLanguage } from '../../context/LanguageContext';
import dealer1 from '../../assets/success-stories/dealer1.jpg';
import dealer2 from '../../assets/success-stories/dealer2.jpg';
import dealer3 from '../../assets/success-stories/dealer3.jpg';
import dealer4 from '../../assets/success-stories/dealer4.jpg';
import dealer5 from '../../assets/success-stories/dealer5.jpg';
import dealer6 from '../../assets/success-stories/dealer6.jpg';
import dealer7 from '../../assets/success-stories/dealer7.jpg';
import dealer8 from '../../assets/success-stories/dealer8.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const SuccessStories = () => {
  const { t } = useLanguage();
  
  const images = [dealer1, dealer2, dealer3, dealer4, dealer5, dealer6, dealer7, dealer8];
  const successStories = t('successStories.stories').map((story, index) => ({
    id: index + 1,
    image: images[index],
    name: story.name,
    description: story.description
  }));

  // First carousel - moves left to right (normal direction)
  const firstCarouselSettings = {
    modules: [Autoplay],
    spaceBetween: 20,
    slidesPerView: 2,
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 5000,
    breakpoints: {
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
    className: "py-4 mb-6",
    allowTouchMove: false,
    grabCursor: false,
  };

  // Second carousel - moves right to left (reverse direction)
  const secondCarouselSettings = {
    ...firstCarouselSettings,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    },
    className: "py-4",
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            <span className="text-[#f97316]">
              {t('successStories.title')}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t('successStories.subtitle')}
          </p>
        </div>

        {/* First row - moves left to right */}
        <Swiper {...firstCarouselSettings}>
          {successStories.map((story) => (
            <SwiperSlide key={`first-${story.id}`}>
              <div className="relative group aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 bg-white/20 backdrop-blur-sm">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-white text-base truncate">{story.name}</h3>
                  <p className="text-slate-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {story.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Second row - moves right to left */}
        <Swiper {...secondCarouselSettings}>
          {successStories.map((story) => (
            <SwiperSlide key={`second-${story.id}`}>
              <div className="relative group aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 bg-white/20 backdrop-blur-sm">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-white text-base truncate">{story.name}</h3>
                  <p className="text-slate-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {story.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;