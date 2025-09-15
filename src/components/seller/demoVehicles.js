// src/components/seller/InventoryTab/demoVehicles.js

// Define the first few vehicles explicitly with IDs 001, 002, 003
const demoVehicles = [
  {
    id: 'veh_001',
    stockNumber: 'STK2023-001',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    mileage: 25000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    color: 'Black',
    condition: 'Excellent',
    mainImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358755?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'active',
    currentBid: 45000,
    reservePrice: 40000,
    buyItNowPrice: 52000,
    auctionEnds: new Date(Date.now() + 86400000 * 3), // 3 days from now
    location: 'Berlin, DE',
    auctionType: 'public',
    auctionLink: 'https://auction.example.com/public/veh_001',
    featured: true,
    vim: 'VIN12345678901',
    description: 'BMW X5 in excellent condition with low mileage.'
    // ... other properties as needed
  },
  {
    id: 'veh_002',
    stockNumber: 'STK2023-002',
    make: 'Mercedes-Benz',
    model: 'GLE',
    year: 2021,
    mileage: 32000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    color: 'White',
    condition: 'Good',
    mainImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553440570-bcc63803a83e?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'sold',
    finalSalePrice: 58000,
    buyer: { name: 'John Doe' },
    soldDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
    location: 'Hamburg, DE',
    auctionType: 'private',
    auctionLink: 'https://auction.example.com/private/veh_002',
    featured: false,
    vim: 'VIN12345678902',
    description: 'Mercedes-Benz GLE Hybrid in good condition.'
    // ... other properties as needed
  },
  {
    id: 'veh_003',
    stockNumber: 'STK2023-003',
    make: 'Audi',
    model: 'Q7',
    year: 2020,
    mileage: 45000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    color: 'Gray',
    condition: 'Good',
    mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'draft',
    askingPrice: 42000,
    location: 'Munich, DE',
    auctionType: 'public',
    featured: false,
    vim: 'VIN12345678903',
    description: 'Audi Q7 draft listing.'
    // ... other properties as needed
  }
  // Add more initial vehicles here if needed, ensuring IDs are veh_001, veh_002, veh_003, etc.
];

// Example of auto-generating vehicles from veh_004 to veh_050
// Make sure the initial demoVehicles array only contains IDs veh_001, veh_002, veh_003
const makes = ['BMW', 'Audi', 'Mercedes-Benz', 'Tesla', 'Volkswagen', 'Toyota', 'Porsche', 'Volvo', 'Ford', 'Jaguar'];
const models = ['X5', 'A6', 'GLE', 'Model 3', 'Golf', 'Corolla', 'Cayenne', 'XC90', 'Mustang', 'F-Pace'];

// Start the loop from 4 to avoid ID conflicts with manually defined vehicles
for (let i = 4; i <= 50; i++) {
  const make = makes[i % makes.length];
  const model = models[i % models.length];
  
  // Ensure the ID is unique and follows the pattern
  const vehicleId = `veh_${String(i).padStart(3, '0')}`;
  
  // Optional: Add a check to see if ID already exists (though it shouldn't with this logic)
  // const idExists = demoVehicles.some(v => v.id === vehicleId);
  // if (idExists) {
  //   console.warn(`Duplicate ID detected: ${vehicleId}. Skipping.`);
  //   continue; // Skip adding this vehicle
  // }

  demoVehicles.push({
    id: vehicleId, // Use the generated unique ID
    stockNumber: `STK2023-${String(i).padStart(3, '0')}`,
    make,
    model,
    year: 2015 + (i % 9), // 2015–2023
    mileage: 10000 * (i % 15),
    fuelType: ['Petrol', 'Diesel', 'Hybrid', 'Electric'][i % 4],
    transmission: ['Automatic', 'Manual'][i % 2],
    color: ['Black', 'White', 'Silver', 'Red', 'Blue'][i % 5],
    condition: ['Excellent', 'Good', 'Fair', 'Like New'][i % 4],
    // Note: Fixed the extra spaces in the image URLs
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
    // Note: Fixed the extra spaces in the auction link
    auctionLink: `https://auction.example.com/private/veh_${String(i).padStart(3, '0')}`,
    featured: i % 5 === 0,
    vim: `VIN1234567890${i}`,
    description: `${make} ${model} in ${i % 2 === 0 ? 'great' : 'excellent'} condition.`
  });
}

export { demoVehicles };