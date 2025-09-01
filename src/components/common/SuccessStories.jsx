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

const SuccessStories = () => {
  const { t } = useLanguage();
  
  const images = [dealer1, dealer2, dealer3, dealer4, dealer5, dealer6, dealer7, dealer8];
  const successStories = t('successStories.stories').map((story, index) => ({
    id: index + 1,
    image: images[index],
    name: story.name,
    description: story.description
  }));

  // Create infinite loop by duplicating stories multiple times
  const duplicatedStories = [...successStories, ...successStories, ...successStories, ...successStories, ...successStories];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {t('successStories.title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t('successStories.subtitle')}
          </p>
        </div>

        <div className="slider-container overflow-hidden">
          <style jsx>{`
            .slider {
              background: transparent;
              height: 280px;
              margin: auto;
              overflow: hidden;
              position: relative;
              width: 100%;
              margin-bottom: 20px;
            }

            .slider-row-2 {
              margin-bottom: 0;
            }

            .slider::before,
            .slider::after {
              content: "";
              height: 280px;
              position: absolute;
              width: 150px;
              z-index: 2;
            }

            .slider::after {
              right: 0;
              top: 0;
              transform: rotateZ(180deg);
            }

            .slider::before {
              left: 0;
              top: 0;
            }

            .slide-track {
              display: flex;
              width: calc(300px * ${duplicatedStories.length});
            }

            .slide-track-1 {
              animation: scrollLeftToRight 40s linear infinite;
            }

            .slide-track-2 {
              animation: scrollRightToLeft 40s linear infinite;
            }

            .slide {
              height: 280px;
              width: 300px;
              padding: 0 15px;
              flex-shrink: 0;
            }

            @keyframes scrollLeftToRight {
              0% { transform: translateX(-${300 * successStories.length}px); }
              100% { transform: translateX(0px); }
            }

            @keyframes scrollRightToLeft {
              0% { transform: translateX(0px); }
              100% { transform: translateX(-${300 * successStories.length}px); }
            }

            @media (max-width: 1024px) {
              .slide {
                width: 280px;
              }
              
              .slide-track {
                width: calc(280px * ${duplicatedStories.length});
              }
              
              @keyframes scrollLeftToRight {
                0% { transform: translateX(-${280 * successStories.length}px); }
                100% { transform: translateX(0px); }
              }

              @keyframes scrollRightToLeft {
                0% { transform: translateX(0px); }
                100% { transform: translateX(-${280 * successStories.length}px); }
              }
            }

            @media (max-width: 768px) {
              .slide {
                width: 250px;
              }
              
              .slide-track {
                width: calc(250px * ${duplicatedStories.length});
              }
              
              @keyframes scrollLeftToRight {
                0% { transform: translateX(-${250 * successStories.length}px); }
                100% { transform: translateX(0px); }
              }

              @keyframes scrollRightToLeft {
                0% { transform: translateX(0px); }
                100% { transform: translateX(-${250 * successStories.length}px); }
              }
            }
          `}</style>

          {/* First row - moves left to right */}
          <div className="slider">
            <div className="slide-track slide-track-1">
              {duplicatedStories.map((story, index) => (
                <div className="slide" key={`row1-${story.id}-${index}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex-grow">
                      <h3 className="font-semibold text-slate-800 text-lg truncate">{story.name}</h3>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-2">{story.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - moves right to left */}
          <div className="slider slider-row-2">
            <div className="slide-track slide-track-2">
              {duplicatedStories.map((story, index) => (
                <div className="slide" key={`row2-${story.id}-${index}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex-grow">
                      <h3 className="font-semibold text-slate-800 text-lg truncate">{story.name}</h3>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-2">{story.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;