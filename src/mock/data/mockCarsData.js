// src/data/mockCarsData.js
export const loadMockCarsData = () => {
  return [
    // Car 1
    {
      id: 'car_001',
      // Step 1: Sale Type
      saleType: 'general-auction',
      // Step 2: Auction Timing
      auctionTiming: {
        preset: '7-days',
        startDate: '2024-07-10',
        startTime: '09:00',
        endDate: '2024-07-17',
        endTime: '20:00',
        timezone: 'Europe/Berlin'
      },
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'manual',
        make: 'BMW',
        model: 'X5',
        year: 2022,
        trim: 'xDrive40d',
        mileage: 25000,
        mileageUnit: 'km',
        registrationDate: '2022-06-15',
        previousOwners: 1,
        licensePlate: 'B-XY 123'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2022 BMW X5 xDrive40d in Excellent Condition',
        description: '2022 BMW X5 xDrive40d in excellent condition with full service history. Well-equipped with premium features including leather seats, sunroof, and advanced driver assistance systems.',
        photos: [
          'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      // Step 5: Exterior Options & Damages
      damagePoints: [], // No damages marked
      selectedOptions: [
        'alloy-wheels',
        'led-lighting',
        'panoramic-roof',
        'parking-sensors',
        'backup-camera'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'good',
          transmission: 'good',
          brakes: 'good',
          suspension: 'good',
          electrics: 'good',
          exhaust: 'good'
        },
        interiorChecklist: {
          seats: 'good',
          dashboard: 'good',
          carpets: 'good',
          headliner: 'good',
          controls: 'good'
        },
        tyreReport: {
          frontLeft: { brand: 'Michelin', treadDepth: 7.0, condition: 'good' },
          frontRight: { brand: 'Michelin', treadDepth: 7.0, condition: 'good' },
          rearLeft: { brand: 'Michelin', treadDepth: 6.5, condition: 'good' },
          rearRight: { brand: 'Michelin', treadDepth: 6.5, condition: 'good' }
        }
      },
      // Additional Data for Buyer View
      auctionEnds: new Date('2024-07-17T20:00:00+02:00'),
      bids: 12,
      highestBid: 54500,
      reservePrice: 50000,
      buyItNowPrice: 62000,
      location: 'Berlin, Germany',
      country: 'DE',
      auctionType: 'public',
      status: 'active',
      price: 55000,
      currency: 'EUR',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      color: 'Black',
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
      seller: {
        id: 'seller_001',
        name: 'Premium Auto Traders GmbH',
        rating: 4.8,
        reviews: 127,
        verified: true,
        location: 'Berlin, Germany'
      }
    },
    // Car 2
    {
      id: 'car_002',
      // Step 1: Sale Type
      saleType: 'direct-buy',
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'vin',
        vin: 'WDD12345678901234',
        make: 'Mercedes-Benz',
        model: 'GLE',
        year: 2023,
        trim: '450e Hybrid AMG Line',
        mileage: 18000,
        mileageUnit: 'km',
        registrationDate: '2023-03-22',
        previousOwners: 1,
        licensePlate: 'HH-AB 456'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        directBuyPrice: 62000,
        headline: '2023 Mercedes-Benz GLE 450e Hybrid AMG Line - Brand New!',
        description: 'Brand new 2023 Mercedes-Benz GLE 450e Hybrid with AMG Line package. Loaded with luxury features and advanced technology. One owner with full warranty.',
        photos: [
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      // Step 5: Exterior Options & Damages
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'led-lighting',
        'panoramic-roof',
        'air-suspension',
        'tow-hitch'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'good',
          transmission: 'good',
          brakes: 'good',
          suspension: 'good',
          electrics: 'good',
          exhaust: 'good'
        },
        interiorChecklist: {
          seats: 'good',
          dashboard: 'good',
          carpets: 'good',
          headliner: 'good',
          controls: 'good'
        },
        tyreReport: {
          frontLeft: { brand: 'Continental', treadDepth: 8.0, condition: 'good' },
          frontRight: { brand: 'Continental', treadDepth: 8.0, condition: 'good' },
          rearLeft: { brand: 'Continental', treadDepth: 8.0, condition: 'good' },
          rearRight: { brand: 'Continental', treadDepth: 8.0, condition: 'good' }
        }
      },
      // Additional Data for Buyer View
      location: 'Hamburg, Germany',
      country: 'DE',
      auctionType: 'private',
      status: 'active',
      price: 62000,
      currency: 'EUR',
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      color: 'White',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
      seller: {
        id: 'seller_002',
        name: 'Luxury Motors Ltd.',
        rating: 4.9,
        reviews: 89,
        verified: true,
        location: 'Hamburg, Germany'
      }
    },
    // Car 3
    {
      id: 'car_003',
      // Step 1: Sale Type
      saleType: 'private-sale',
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'manual',
        make: 'Audi',
        model: 'Q7',
        year: 2022,
        trim: '55 TFSI quattro',
        mileage: 32000,
        mileageUnit: 'km',
        registrationDate: '2022-01-10',
        previousOwners: 2,
        licensePlate: 'M-CD 789'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2022 Audi Q7 55 TFSI quattro - Well-Maintained Family SUV',
        description: '2022 Audi Q7 55 TFSI quattro in good condition. Well-maintained with recent service records. Great family SUV with all-wheel drive capability and premium amenities.',
        photos: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor fender bender on the rear left corner, professionally repaired with no structural damage.'
      },
      // Step 5: Exterior Options & Damages
      damagePoints: ['rear-left'], // Marked damage point
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'sunroof',
        'parking-sensors'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'good',
          transmission: 'good',
          brakes: 'average',
          suspension: 'good',
          electrics: 'good',
          exhaust: 'good'
        },
        interiorChecklist: {
          seats: 'average',
          dashboard: 'good',
          carpets: 'good',
          headliner: 'good',
          controls: 'good'
        },
        tyreReport: {
          frontLeft: { brand: 'Bridgestone', treadDepth: 5.5, condition: 'average' },
          frontRight: { brand: 'Bridgestone', treadDepth: 5.5, condition: 'average' },
          rearLeft: { brand: 'Bridgestone', treadDepth: 5.0, condition: 'average' },
          rearRight: { brand: 'Bridgestone', treadDepth: 5.0, condition: 'average' }
        }
      },
      // Additional Data for Buyer View
      location: 'Munich, Germany',
      country: 'DE',
      auctionType: 'private',
      status: 'active',
      price: 48000,
      currency: 'EUR',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'Gray',
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      seller: {
        id: 'seller_003',
        name: 'Autohaus Quality GmbH',
        rating: 4.6,
        reviews: 203,
        verified: true,
        location: 'Munich, Germany'
      }
    },
    // Car 4
    {
      id: 'car_004',
      // Step 1: Sale Type
      saleType: 'general-auction',
      // Step 2: Auction Timing
      auctionTiming: {
        preset: '5-days',
        startDate: '2024-07-12',
        startTime: '10:00',
        endDate: '2024-07-17',
        endTime: '18:00',
        timezone: 'Europe/Berlin'
      },
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'manual',
        make: 'BMW',
        model: '3 Series',
        year: 2021,
        trim: '330i',
        mileage: 45000,
        mileageUnit: 'km',
        registrationDate: '2021-08-20',
        previousOwners: 1,
        licensePlate: 'K-XY 321'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2021 BMW 3 Series 330i - Excellent Handling & Performance',
        description: '2021 BMW 3 Series 330i in good condition. Excellent handling and performance. Features include adaptive cruise control and lane departure warning.',
        photos: [
          'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      // Step 5: Exterior Options & Damages
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'led-lighting',
        'parking-sensors'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'good',
          transmission: 'good',
          brakes: 'good',
          suspension: 'good',
          electrics: 'good',
          exhaust: 'good'
        },
        interiorChecklist: {
          seats: 'good',
          dashboard: 'good',
          carpets: 'average',
          headliner: 'good',
          controls: 'good'
        },
        tyreReport: {
          frontLeft: { brand: 'Goodyear', treadDepth: 4.0, condition: 'average' },
          frontRight: { brand: 'Goodyear', treadDepth: 4.0, condition: 'average' },
          rearLeft: { brand: 'Goodyear', treadDepth: 3.5, condition: 'average' },
          rearRight: { brand: 'Goodyear', treadDepth: 3.5, condition: 'average' }
        }
      },
      // Additional Data for Buyer View
      auctionEnds: new Date('2024-07-17T18:00:00+02:00'),
      bids: 20,
      highestBid: 37500,
      reservePrice: 35000,
      buyItNowPrice: 42000,
      location: 'Cologne, Germany',
      country: 'DE',
      auctionType: 'public',
      status: 'active',
      price: 38000,
      currency: 'EUR',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'Blue',
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
      seller: {
        id: 'seller_004',
        name: 'Euro Auto Dealers',
        rating: 4.7,
        reviews: 156,
        verified: true,
        location: 'Cologne, Germany'
      }
    },
    // Car 5
    {
      id: 'car_005',
      // Step 1: Sale Type
      saleType: 'general-auction',
      // Step 2: Auction Timing
      auctionTiming: {
        preset: '10-days',
        startDate: '2024-07-08',
        startTime: '08:00',
        endDate: '2024-07-18',
        endTime: '20:00',
        timezone: 'Europe/Berlin'
      },
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'manual',
        make: 'Volkswagen',
        model: 'Tiguan',
        year: 2020,
        trim: '2.0 TSI',
        mileage: 60000,
        mileageUnit: 'km',
        registrationDate: '2020-11-15',
        previousOwners: 2,
        licensePlate: 'F-GH 654'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2020 Volkswagen Tiguan 2.0 TSI - Reliable Family SUV',
        description: '2020 Volkswagen Tiguan 2.0 TSI in good condition. Reliable family SUV with ample space for passengers and cargo. Features include parking sensors and rearview camera.',
        photos: [
          'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor scratches on the front bumper, repaired.'
      },
      // Step 5: Exterior Options & Damages
      damagePoints: ['front-left', 'front-right'], // Marked damage points
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'parking-sensors',
        'backup-camera'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'good',
          transmission: 'good',
          brakes: 'good',
          suspension: 'average',
          electrics: 'good',
          exhaust: 'good'
        },
        interiorChecklist: {
          seats: 'average',
          dashboard: 'good',
          carpets: 'average',
          headliner: 'good',
          controls: 'good'
        },
        tyreReport: {
          frontLeft: { brand: 'Dunlop', treadDepth: 3.0, condition: 'poor' },
          frontRight: { brand: 'Dunlop', treadDepth: 3.0, condition: 'poor' },
          rearLeft: { brand: 'Dunlop', treadDepth: 4.5, condition: 'average' },
          rearRight: { brand: 'Dunlop', treadDepth: 4.5, condition: 'average' }
        }
      },
      // Additional Data for Buyer View
      auctionEnds: new Date('2024-07-18T20:00:00+02:00'),
      bids: 8,
      highestBid: 27500,
      reservePrice: 25000,
      buyItNowPrice: 30000,
      location: 'Frankfurt, Germany',
      country: 'DE',
      auctionType: 'public',
      status: 'active',
      price: 28000,
      currency: 'EUR',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'Silver',
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
      seller: {
        id: 'seller_005',
        name: 'German Car Market',
        rating: 4.5,
        reviews: 189,
        verified: true,
        location: 'Frankfurt, Germany'
      }
    }
  ];
};