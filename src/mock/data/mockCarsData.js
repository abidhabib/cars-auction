// src/data/mockCarsData.js
export const loadMockCarsData = () => {
  return [
    // Car 1: BMW X5
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
        licensePlate: 'B-XY 123',
        vin: 'WBAJK8C50BC123456'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2022 BMW X5 xDrive40d M Sport in Excellent Condition',
        description: 'Presenting a stunning 2022 BMW X5 xDrive40d M Sport. This vehicle has been meticulously maintained with a full BMW service history. It features a powerful 3.0L diesel engine, luxurious Vernasca leather interior, panoramic sunroof, Harman Kardon sound system, and advanced driver assistance technologies like adaptive cruise control and lane departure warning. The M Sport package gives it a distinctive and sporty appearance. Perfect for family adventures or executive travel.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // BMW X5 exterior
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW interior
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW dashboard
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // BMW wheel
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW side profile
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW rear
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',  // BMW engine
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'   // BMW interior detail
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
        'backup-camera',
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
          frontLeft: { brand: 'Michelin', treadDepth: 7.0, condition: 'good' },
          frontRight: { brand: 'Michelin', treadDepth: 7.0, condition: 'good' },
          rearLeft: { brand: 'Michelin', treadDepth: 6.5, condition: 'good' },
          rearRight: { brand: 'Michelin', treadDepth: 6.5, condition: 'good' }
        }
      },
      // Additional Data for Buyer View
      auctionEnds: new Date('2024-07-17T20:00:00+02:00'),
      bids: 15,
      highestBid: 54800,
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
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      seller: {
        id: 'seller_001',
        name: 'Premium Auto Traders GmbH',
        rating: 4.8,
        reviews: 127,
        verified: true,
        location: 'Berlin, Germany',
        memberSince: '2018-03-15'
      }
    },
    // Car 2: Mercedes-Benz GLE
    {
      id: 'car_002',
      // Step 1: Sale Type
      saleType: 'direct-buy',
      // Step 2: Auction Timing (not applicable for direct buy)
      auctionTiming: null,
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
        description: 'Absolutely stunning and nearly new 2023 Mercedes-Benz GLE 450e Hybrid from the AMG Line. This vehicle is in pristine showroom condition with only 18,000km on the odometer. It comes equipped with the latest MBUX infotainment system, Burmester 3D surround sound, massage seats, air suspension, and the powerful plug-in hybrid powertrain offering an electric range of approximately 80km. A full Mercedes-Benz service history is included.',
        photos: [
          'https://images.unsplash.com/photo-1563720223489-2301176c2e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',  // Mercedes front
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Mercedes interior
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Mercedes dashboard
          'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Mercedes wheel
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Mercedes side
          'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Mercedes rear
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Mercedes engine
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'   // Mercedes interior detail
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
        'tow-hitch',
        'xenon-headlights'
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
      image: 'https://images.unsplash.com/photo-1563720223489-2301176c2e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
      seller: {
        id: 'seller_002',
        name: 'Luxury Motors Ltd.',
        rating: 4.9,
        reviews: 89,
        verified: true,
        location: 'Hamburg, Germany',
        memberSince: '2019-07-22'
      }
    },
    // Car 3: Audi Q7
    {
      id: 'car_003',
      // Step 1: Sale Type
      saleType: 'private-sale',
      // Step 2: Auction Timing (not applicable for private sale)
      auctionTiming: null,
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'manual',
        make: 'Audi',
        model: 'Q7',
        year: 2022,
        trim: '55 TFSI quattro S Line',
        mileage: 32000,
        mileageUnit: 'km',
        registrationDate: '2022-01-10',
        previousOwners: 2,
        licensePlate: 'M-CD 789',
        vin: 'WAUZZZ4L2ND012345'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2022 Audi Q7 55 TFSI quattro S Line - Well-Maintained Family SUV',
        description: 'A spacious and comfortable 2022 Audi Q7 S Line, ideal for family life. This vehicle has been well looked after and comes with a partial Audi service history. Features include tri-zone climate control, MMI Navigation plus, Bang & Olufsen 3D sound system, panoramic sunroof, and Audi\'s renowned quattro all-wheel drive. The third row of seats provides flexibility for larger families or extra cargo space when folded down. Recent maintenance includes new brake pads and an oil change.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Audi front
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Audi interior
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Audi dashboard
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Audi wheel
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Audi side
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Audi rear
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',  // Audi engine
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'   // Audi interior detail
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor fender bender on the rear left corner in October 2023. The bumper was professionally repainted to match the original color. No structural damage or mechanical issues resulted from the incident. Repairs were completed at an Audi authorized center.'
      },
      // Step 5: Exterior Options & Damages
      damagePoints: ['rear-left'], // Marked damage point
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'sunroof',
        'parking-sensors',
        'backup-camera'
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
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      seller: {
        id: 'seller_003',
        name: 'Autohaus Quality GmbH',
        rating: 4.6,
        reviews: 203,
        verified: true,
        location: 'Munich, Germany',
        memberSince: '2017-11-05'
      }
    },
    // Car 4: BMW 3 Series
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
        trim: '330i M Sport',
        mileage: 45000,
        mileageUnit: 'km',
        registrationDate: '2021-08-20',
        previousOwners: 1,
        licensePlate: 'K-XY 321',
        vin: 'WBA8E9C03KCL12345'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2021 BMW 330i M Sport - Sporty Sedan with Premium Package',
        description: 'A fantastic 2021 BMW 330i M Sport that perfectly balances performance and luxury. This vehicle has been regularly serviced and is in very good condition. It comes with the desirable M Sport package, featuring sport suspension, M aerodynamics kit, and stunning 18" M double-spoke wheels. Inside, you\'ll find Vernasca leather upholstery, a Harman Kardon sound system, wireless Apple CarPlay, and BMW\'s Driving Assistant Professional. Ideal for the driving enthusiast who values both comfort and agility.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // BMW 3 Series front
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW interior
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW dashboard
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // BMW wheel
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW side
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // BMW rear
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',  // BMW engine
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'   // BMW interior detail
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
      bids: 22,
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
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      seller: {
        id: 'seller_004',
        name: 'Euro Auto Dealers',
        rating: 4.7,
        reviews: 156,
        verified: true,
        location: 'Cologne, Germany',
        memberSince: '2020-01-12'
      }
    },
    // Car 5: Volkswagen Tiguan
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
        trim: '2.0 TSI Life',
        mileage: 60000,
        mileageUnit: 'km',
        registrationDate: '2020-11-15',
        previousOwners: 2,
        licensePlate: 'F-GH 654',
        vin: 'WVGZZZ5NZJM123456'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2020 Volkswagen Tiguan 2.0 TSI Life - Reliable Family Crossover',
        description: 'A practical and reliable 2020 Volkswagen Tiguan Life, perfect for growing families. This vehicle has covered 60,000km and has been maintained according to the manufacturer\'s schedule with a partial service history. It\'s equipped with modern conveniences like keyless entry and start, automatic climate control, a touchscreen infotainment system with App-Connect, and front and rear parking sensors. The 2.0L TSI engine provides a good balance of power and efficiency. Ideal for daily commuting and weekend trips.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // VW front
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // VW interior
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // VW dashboard
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // VW wheel
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // VW side
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // VW rear
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',  // VW engine
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'   // VW interior detail
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor scratches on the front bumper were noticed and professionally touched up in April 2024. The repair was purely cosmetic and does not affect the structure or function of the bumper. No other damage or repairs are recorded.'
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
      bids: 10,
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
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      seller: {
        id: 'seller_005',
        name: 'German Car Market',
        rating: 4.5,
        reviews: 189,
        verified: true,
        location: 'Frankfurt, Germany',
        memberSince: '2019-03-20'
      }
    },
    // NEW Car 6: Tesla Model 3
    {
      id: 'car_006',
      // Step 1: Sale Type
      saleType: 'direct-buy',
      // Step 2: Auction Timing (not applicable for direct buy)
      auctionTiming: null,
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'vin',
        vin: '5YJ3E1EA0JF123456',
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        trim: 'Long Range AWD',
        mileage: 12000,
        mileageUnit: 'km',
        registrationDate: '2023-02-15',
        previousOwners: 1,
        licensePlate: 'S-EL 789'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        directBuyPrice: 45000,
        headline: '2023 Tesla Model 3 Long Range - Low Mileage, Perfect Condition',
        description: 'Immaculate 2023 Tesla Model 3 Long Range with only 12,000km. This electric vehicle features Autopilot, premium interior with vegan leather, glass roof, and premium audio system. The battery health is at 100% with maximum range maintained. Includes all software upgrades and comes with Tesla\'s remaining warranty. Supercharger capable with free supercharging transferable. A perfect eco-friendly vehicle for daily commuting with minimal running costs.',
        photos: [
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',  // Tesla front
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Tesla interior
          'https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Tesla dashboard
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Tesla wheel
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Tesla side
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Tesla rear
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',  // Tesla interior detail
          'https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'   // Tesla charging port
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
        'autopilot',
        'premium-sound'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'excellent',
          transmission: 'excellent',
          brakes: 'good',
          suspension: 'good',
          electrics: 'excellent',
          exhaust: 'n/a'
        },
        interiorChecklist: {
          seats: 'excellent',
          dashboard: 'excellent',
          carpets: 'excellent',
          headliner: 'excellent',
          controls: 'excellent'
        },
        tyreReport: {
          frontLeft: { brand: 'Michelin', treadDepth: 6.5, condition: 'good' },
          frontRight: { brand: 'Michelin', treadDepth: 6.5, condition: 'good' },
          rearLeft: { brand: 'Michelin', treadDepth: 6.0, condition: 'good' },
          rearRight: { brand: 'Michelin', treadDepth: 6.0, condition: 'good' }
        },
        batteryHealth: '100%'
      },
      // Additional Data for Buyer View
      location: 'Stuttgart, Germany',
      country: 'DE',
      auctionType: 'private',
      status: 'active',
      price: 45000,
      currency: 'EUR',
      fuelType: 'Electric',
      transmission: 'Automatic',
      color: 'Red',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
      seller: {
        id: 'seller_006',
        name: 'Eco Auto Solutions',
        rating: 4.8,
        reviews: 94,
        verified: true,
        location: 'Stuttgart, Germany',
        memberSince: '2021-05-10'
      }
    },
    // NEW Car 7: Porsche 911
    {
      id: 'car_007',
      // Step 1: Sale Type
      saleType: 'general-auction',
      // Step 2: Auction Timing
      auctionTiming: {
        preset: '3-days',
        startDate: '2024-07-15',
        startTime: '12:00',
        endDate: '2024-07-18',
        endTime: '15:00',
        timezone: 'Europe/Berlin'
      },
      // Step 3: Vehicle Identification
      vehicleIdentification: {
        method: 'vin',
        vin: 'WP0ZZZ99ZJS123456',
        make: 'Porsche',
        model: '911',
        year: 2022,
        trim: 'Carrera S',
        mileage: 8000,
        mileageUnit: 'km',
        registrationDate: '2022-09-05',
        previousOwners: 1,
        licensePlate: 'M-SP 911'
      },
      // Step 4: Media & Description
      mediaAndDescription: {
        headline: '2022 Porsche 911 Carrera S - Low Mileage Collector\'s Item',
        description: 'Exceptional 2022 Porsche 911 Carrera S with only 8,000km. This iconic sports car features the Sports Chrono Package, Porsche Active Suspension Management, Porsche Ceramic Composite Brakes, and Burmester High-End Surround Sound System. The vehicle has never been tracked and has been meticulously maintained by Porsche Center. Includes all original documentation, two keys, and Porsche Approved Warranty. A rare opportunity to own one of the finest sports cars in existence.',
        photos: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Porsche front
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Porsche interior
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Porsche dashboard
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',  // Porsche wheel
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Porsche side
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',  // Porsche rear
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',  // Porsche engine
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'   // Porsche interior detail
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
        'sports-package',
        'premium-sound',
        'ceramic-brakes'
      ],
      // Step 6: Condition Assessment
      conditionAssessment: {
        technicalChecklist: {
          engine: 'excellent',
          transmission: 'excellent',
          brakes: 'excellent',
          suspension: 'excellent',
          electrics: 'excellent',
          exhaust: 'excellent'
        },
        interiorChecklist: {
          seats: 'excellent',
          dashboard: 'excellent',
          carpets: 'excellent',
          headliner: 'excellent',
          controls: 'excellent'
        },
        tyreReport: {
          frontLeft: { brand: 'Pirelli', treadDepth: 7.5, condition: 'excellent' },
          frontRight: { brand: 'Pirelli', treadDepth: 7.5, condition: 'excellent' },
          rearLeft: { brand: 'Pirelli', treadDepth: 7.0, condition: 'excellent' },
          rearRight: { brand: 'Pirelli', treadDepth: 7.0, condition: 'excellent' }
        }
      },
      // Additional Data for Buyer View
      auctionEnds: new Date('2024-07-18T15:00:00+02:00'),
      bids: 32,
      highestBid: 112500,
      reservePrice: 100000,
      buyItNowPrice: 125000,
      location: 'Munich, Germany',
      country: 'DE',
      auctionType: 'public',
      status: 'active',
      price: 115000,
      currency: 'EUR',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'GT Silver',
      condition: 'Excellent',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      seller: {
        id: 'seller_007',
        name: 'Premium Sports Cars',
        rating: 4.9,
        reviews: 67,
        verified: true,
        location: 'Munich, Germany',
        memberSince: '2018-11-20'
      }
    }
  ];
};