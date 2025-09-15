// src/components/seller/InventoryTab/demoVehicles.js
const demoVehicles = [
  // Your existing demo vehicle objects (veh_001 to veh_003)
];

// Example of auto-generating vehicles (keep this part if needed)
const makes = ['BMW', 'Audi', 'Mercedes-Benz', 'Tesla', 'Volkswagen', 'Toyota', 'Porsche', 'Volvo', 'Ford', 'Jaguar'];
const models = ['X5', 'A6', 'GLE', 'Model 3', 'Golf', 'Corolla', 'Cayenne', 'XC90', 'Mustang', 'F-Pace'];
for (let i = 4; i <= 50; i++) {
  const make = makes[i % makes.length];
  const model = models[i % models.length];
  demoVehicles.push({
    id: `veh_${String(i).padStart(3, '0')}`,
    stockNumber: `STK2023-${String(i).padStart(3, '0')}`,
    make,
    model,
    year: 2015 + (i % 9), // 2015–2023
    mileage: 10000 * (i % 15),
    fuelType: ['Petrol', 'Diesel', 'Hybrid', 'Electric'][i % 4],
    transmission: ['Automatic', 'Manual'][i % 2],
    color: ['Black', 'White', 'Silver', 'Red', 'Blue'][i % 5],
    condition: ['Excellent', 'Good', 'Fair', 'Like New'][i % 4],
    mainImage: `https://source.unsplash.com/800x500/?car,${make},${model},${i}`,
    images: [
      `https://source.unsplash.com/800x500/?car,${make},${i}`,
      `https://source.unsplash.com/800x500/?vehicle,${model},${i}`,
      `https://source.unsplash.com/800x500/?automobile,${make},${model},${i}`
    ],
    status: ['active', 'sold', 'draft'][i % 3],
    currentBid: 20000 + i * 500,
    reservePrice: 18000 + i * 500,
    buyItNowPrice: 25000 + i * 600,
    auctionEnds: new Date(Date.now() + i * 3600000),
    location: ['Berlin, DE', 'Hamburg, DE', 'Munich, DE', 'London, UK'][i % 4],
    auctionType: ['public', 'private'][i % 2],
    auctionLink: `https://auction.example.com/private/veh_${String(i).padStart(3, '0')}`,
    featured: i % 5 === 0,
    vim: `VIN1234567890${i}`,
    description: `${make} ${model} in ${i % 2 === 0 ? 'great' : 'excellent'} condition.`
  });
}

export { demoVehicles }; // Export the array