const brands = [
  { name: 'Volkswagen', logo: 'https://cdn.brandfetch.io/volkswagen.com/logo/icon' },
  { name: 'Mercedes', logo: 'https://cdn.brandfetch.io/mercedes-benz.com/logo/icon' },
  { name: 'BMW', logo: 'https://cdn.brandfetch.io/bmw.com/logo/icon' },
  { name: 'Ford', logo: 'https://cdn.brandfetch.io/ford.com/logo/icon' },
  { name: 'Audi', logo: 'https://cdn.brandfetch.io/audi.com/logo/icon' },
  { name: 'Renault', logo: 'https://cdn.brandfetch.io/renault.com/logo/icon' },
  { name: 'Hyundai', logo: 'https://cdn.brandfetch.io/hyundai.com/logo/icon' },

  
];


export default function BrandsSection() {
  return (
   <>
   
   {/* Brand Logos */}
<div className="mt-20">
  <h3 className="text-xl font-semibold text-gray-700 text-center mb-8">Trusted by leading brands</h3>
  <div className="flex flex-wrap justify-center gap-8">
    {brands.map((brand, index) => (
      <div key={index} className="flex items-center justify-center w-24 h-16 bg-white rounded-lg shadow-sm p-2">
        <img 
          src={brand.logo} 
          alt={brand.name} 
          className="w-full h-full object-contain"
        />
      </div>
    ))}
  </div>
</div>
   
   </>
  );
}
