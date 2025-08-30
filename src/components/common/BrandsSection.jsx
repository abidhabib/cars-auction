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
    <div className="mt-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
          Trusted by Leading Automotive Brands
        </h3>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center group"
            >
              <div className="flex items-center justify-center w-32 h-20 bg-white rounded-xl shadow-sm p-4 transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}