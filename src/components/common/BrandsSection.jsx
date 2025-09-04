// src/components/common/BrandsSection.jsx
import React from 'react';

// 1. Cleaned up data: Removed trailing spaces from URLs
const brands = [
  { name: 'Volkswagen', logo: 'https://cdn.brandfetch.io/volkswagen.com/logo/icon' },
  { name: 'Mercedes', logo: 'https://cdn.brandfetch.io/mercedes-benz.com/logo/icon' },
  { name: 'BMW', logo: 'https://cdn.brandfetch.io/bmw.com/logo/icon' },
  { name: 'Ford', logo: 'https://cdn.brandfetch.io/ford.com/logo/icon' },
  { name: 'Skoda', logo: 'https://cdn.brandfetch.io/skoda-auto.com/logo/icon' },
  { name: 'Audi', logo: 'https://cdn.brandfetch.io/audi.com/logo/icon' },
  { name: 'Renault', logo: 'https://cdn.brandfetch.io/renault.com/logo/icon' },
  { name: 'Hyundai', logo: 'https://cdn.brandfetch.io/hyundai.com/logo/icon' },
];

export default function BrandsSection() {
  return (
    // 2. Colors: Light gray background is acceptable per style guide context.
    <div className="mt-8 py-12 bg-gray-50 font-sans"> {/* Added py-12 for internal padding, assumes font-sans applies Outfit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4. Typography: Headline - Reduced size/weight for minimalism, using Outfit */}
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-8">
          Trusted by Leading Automotive Brands
        </h3>
        {/* 3. Minimal Design: Reduced gaps between items */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              {/* 3. Minimal Design: Smaller card, subtle border, reduced rounding/shadow */}
              <div className="flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-gray-200 p-3 transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="w-full h-full object-contain"
                  // Consider adding onError handler if Brandfetch links can be flaky
                  // onError={(e) => { e.target.src = '/path/to/placeholder-logo.svg'; }}
                />
              </div>
              {/* 4. Typography: Body text for brand name, using Outfit */}
              <span className="mt-2 text-sm font-normal text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}