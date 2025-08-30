// src/components/common/SuccessStories.jsx
import React, { useState } from 'react';
import dealer1 from '../../assets/success-stories/dealer1.jpg';
import dealer2 from '../../assets/success-stories/dealer2.jpg';
import dealer3 from '../../assets/success-stories/dealer3.jpg';
import dealer4 from '../../assets/success-stories/dealer4.jpg';
import dealer5 from '../../assets/success-stories/dealer5.jpg';
import dealer6 from '../../assets/success-stories/dealer6.jpg';
import dealer7 from '../../assets/success-stories/dealer7.jpg';
import dealer8 from '../../assets/success-stories/dealer8.jpg';



 

const SuccessStories = () => {

  // Sample data with Unsplash images
  const successStories = [
    {
      id: 1,
      name: "Sarah Mitchell",
      image: dealer1,
      description: "Increased sales by 150% in 6 months"
    },
    {
      id: 2,
      name: "James Wilson",
      image: dealer2,
      description: "Modernized dealership operations"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image: dealer3,
      description: "Expanded to 3 new locations"
    },
    {
      id: 4,
      name: "Michael Chang",
      image: dealer4,
      description: "Doubled customer satisfaction rate"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      image: dealer5,
      description: "Revolutionized online sales process"
    },
    {
      id: 6,
      name: "David Parker",
      image: dealer6,
      description: "Achieved record-breaking growth"
    },
    {
      id: 7,
      name: "Amanda Foster",
      image: dealer7,
      description: "Leading digital transformation"
    },
    {
      id: 8,
      name: "Robert Chen",
      image: dealer8,
      description: "Pioneer in electric vehicle sales"
    }
]
  const duplicatedStories = [...successStories, ...successStories];


  // Duplicate the array to create a seamless loop

  return (
    <section className="py-8 relative overflow-hidden bg-gradient-to-br from-blue-50/70 via-indigo-50/70 to-purple-50/70 backdrop-blur-md">
      {/* Dynamic background with particles/patterns */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-indigo-100/30 to-purple-100/40 backdrop-blur-xl"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-400/10 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-pink-400/10 rounded-full blur-xl animate-float"></div>
        </div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        {/* Border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"></div>
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1rem 1rem, currentColor 0.5px, transparent 0.5px)',
            backgroundSize: '3rem 3rem'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Success Stories
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover how dealers like you are growing their businesses with CarNetwork
          </p>
        </div>

        {/* First row - moves left to right */}
        <div 
          className="relative mb-12 overflow-hidden"
         
        >
          <div className={`flex space-x-8 animate-marquee-left`}>
            {duplicatedStories.map((story, index) => (
              <div 
                key={`${story.id}-${index}`}
                className="flex-shrink-0 w-64 relative group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-white/5 backdrop-blur-md">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Text overlay with glassmorphism effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <div className="backdrop-blur-sm rounded-xl p-4 bg-white/5 border border-white/10">
                      <h3 className="font-bold text-white text-xl mb-2">{story.name}</h3>
                      <p className="text-gray-200 text-sm">{story.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fade effect on edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-purple-50/70 via-indigo-50/70 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Second row - moves right to left */}
        <div 
          className="relative overflow-hidden"
      
        >
          <div className={`flex space-x-8 animate-marquee-right`}>
            {duplicatedStories.map((story, index) => (
              <div 
                key={`${story.id}-reverse-${index}`}
                className="flex-shrink-0 w-80 relative group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-white/5 backdrop-blur-md">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Text overlay with glassmorphism effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <div className="backdrop-blur-sm rounded-xl p-4 bg-white/5 border border-white/10">
                      <h3 className="font-bold text-white text-xl mb-2">{story.name}</h3>
                      <p className="text-gray-200 text-sm">{story.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fade effect on edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-purple-50/70 via-indigo-50/70 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

    </section>
  );
};

export default SuccessStories;