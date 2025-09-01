import React from "react";

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.press.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.press.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
          {content.press.logos.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-3 p-2 bg-gray-50 rounded-lg">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-600 text-center group-hover:text-[#3b396d] transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Car Network Europe partners with leading automotive brands to deliver exceptional service across the continent
          </p>
        </div>
      </div>
    </section>
  );
};