// src/components/common/Press.jsx
import React from "react";

// 1. Cleaned up data: Removed trailing spaces from URLs
const content = {
  press: {
    title: "As Featured In",
    subtitle: "Trusted by leading automotive brands across Europe",
    logos: [
      { name: "Mercedes", logo: "https://cdn.brandfetch.io/mercedes-benz.com/logo/icon" },
      { name: "BMW", logo: "https://cdn.brandfetch.io/bmw.com/logo/icon" },
      { name: "Audi", logo: "https://cdn.brandfetch.io/audi.com/logo/icon" },
      { name: "Toyota", logo: "https://cdn.brandfetch.io/toyota.com/logo/icon" },
      { name: "Nissan", logo: "https://cdn.brandfetch.io/nissan-global.com/logo/icon" },
      { name: "Hyundai", logo: "https://cdn.brandfetch.io/hyundai.com/logo/icon" },
      { name: "Volkswagen", logo: "https://cdn.brandfetch.io/volkswagen.com/logo/icon" },
      { name: "Ford", logo: "https://cdn.brandfetch.io/ford.com/logo/icon" },
      { name: "Renault", logo: "https://cdn.brandfetch.io/renault.com/logo/icon" },
      { name: "Peugeot", logo: "https://cdn.brandfetch.io/peugeot.com/logo/icon" },
      { name: "Fiat", logo: "https://cdn.brandfetch.io/fiat.com/logo/icon" },
      { name: "Volvo", logo: "https://cdn.brandfetch.io/volvo.com/logo/icon" },
    ],
  },
};

export const Press = () => {
  return (
    // 2. Colors: Light gray background is acceptable. Font-sans for Outfit.
    <section className="py-14 bg-gray-50 font-sans"> {/* Slightly reduced padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8"> {/* Reduced margin */}
          {/* 4. Typography & 3. Minimal Design: Smaller, lighter heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            {content.press.title}
          </h2>
          {/* 4. Typography & 3. Minimal Design: Smaller subtitle */}
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            {content.press.subtitle}
          </p>
        </div>

        {/* 3. Minimal Design: Reduced gap and adjusted grid for spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-center">
          {content.press.logos.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-4 transition-all duration-300 group border border-gray-200 hover:border-gray-300" // Flatter design, hover border
            >
              {/* 3. Minimal Design: Smaller container */}
              <div className="flex items-center justify-center w-14 h-14 mb-2.5 p-1.5"> {/* Reduced size/padding */}
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`} // Added alt text
                  className="max-h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" // Reduced max height
                />
              </div>
              {/* 4. Typography & 3. Minimal Design: Smaller, subtle text with theme color on hover */}
              <span className="text-xs font-normal text-gray-600 text-center group-hover:text-logo-dark-blue transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10"> {/* Reduced margin */}
          {/* 4. Typography & 3. Minimal Design: Smaller, subtle footer text */}
          <p className="text-gray-500 text-xs">
            Car Network Europe partners with leading automotive brands to deliver exceptional service across the continent
          </p>
        </div>
      </div>
    </section>
  );
};