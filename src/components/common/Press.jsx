import React from "react";

// Example content (replace with your own or import from a constants file)
const content = {
  press: {
    title: "Featured In",
    logos: [
      { name: "Mercedes", logo: "https://cdn.brandfetch.io/mercedes-benz.com/logo/icon" },
      { name: "BMW", logo: "https://cdn.brandfetch.io/bmw.com/logo/icon" },
      { name: "Ford", logo: "https://cdn.brandfetch.io/ford.com/logo/icon" },
      { name: "Audi", logo: "https://cdn.brandfetch.io/audi.com/logo/icon" },
      { name: "Toyota", logo: "https://cdn.brandfetch.io/toyota.com/logo/icon" },
      { name: "Nissan", logo: "https://cdn.brandfetch.io/nissan-global.com/logo/icon" },
      { name: "Hyundai", logo: "https://cdn.brandfetch.io/hyundai.com/logo/icon" },
    ],
  },
};

export const Press = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {content.press.title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {content.press.logos.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 object-contain"
                />
              </div>
              <span className="text-xs font-medium text-gray-600 text-center group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};