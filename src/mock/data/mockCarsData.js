// src/data/mockCarsData.js
export const loadMockCarsData = () => {
  return [
    // Car 1: BMW X5
    {
      id:1,
      saleType: 'general-auction',
      auctionTiming: {
        preset: '7-days',
        startDate: '2024-07-10',
        startTime: '09:00',
        endDate: '2024-07-17',
        endTime: '20:00',
        timezone: 'Europe/Berlin'
      },
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
      mediaAndDescription: {
        headline: '2022 BMW X5 xDrive40d M Sport in Excellent Condition',
        description: 'Presenting a stunning 2022 BMW X5 xDrive40d M Sport. This vehicle has been meticulously maintained with a full BMW service history. It features a powerful 3.0L diesel engine, luxurious Vernasca leather interior, panoramic sunroof, Harman Kardon sound system, and advanced driver assistance technologies like adaptive cruise control and lane departure warning. The M Sport package gives it a distinctive and sporty appearance. Perfect for family adventures or executive travel.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'led-lighting',
        'panoramic-roof',
        'parking-sensors',
        'backup-camera',
        'tow-hitch'
      ],
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
      auctionEnds: new Date('2024-07-17T20:00:00+02:00'),
      bids: 15,
      highestBid: 54800,
      reservePrice: 50000,
      buyItNowPrice: 62000,
      location: 'Berlin, Germany',
      country: 'DE',
      auctionType: 'public',
      carType: 'SUV',
      vatStatus: 'deductible',
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
      },
      // --- NEW FIELDS ---
      rdwHistory: [
        { type: 'Import', date: '2022-05-10', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2022-06-15', description: 'First registered in Berlin' },
        { type: 'APK', date: '2023-06-10', description: 'Passed annual inspection with no remarks' },
        { type: 'Owner Change', date: '2023-08-20', description: 'Transferred to current owner' },
        { type: 'APK', date: '2024-06-12', description: 'Passed annual inspection with no remarks' }
      ],
      damageGrid: [
        { part: 'Front Bumper', type: 'Minor Scratch', photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' },
        { part: 'Rear Left Fender', type: 'Paint Chip', photo: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }
      ],
      stockId: 'STK-BMW-X5-001'
    },
    // Car 2: Mercedes-Benz GLE
    {
      id:2,
      saleType: 'direct-buy',
      auctionTiming: null,
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
      mediaAndDescription: {
        directBuyPrice: 62000,
        headline: '2023 Mercedes-Benz GLE 450e Hybrid AMG Line - Brand New!',
        description: 'Absolutely stunning and nearly new 2023 Mercedes-Benz GLE 450e Hybrid from the AMG Line. This vehicle is in pristine showroom condition with only 18,000km on the odometer. It comes equipped with the latest MBUX infotainment system, Burmester 3D surround sound, massage seats, air suspension, and the powerful plug-in hybrid powertrain offering an electric range of approximately 80km. A full Mercedes-Benz service history is included.',
        photos: [
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'led-lighting',
        'panoramic-roof',
        'air-suspension',
        'tow-hitch',
        'xenon-headlights'
      ],
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
      location: 'Hamburg, Germany',
      country: 'DE',
      auctionType: 'private',
      carType: 'SUV',
      vatStatus: 'deductible',
      status: 'active',
      price: 62000,
      currency: 'EUR',
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      color: 'White',
      condition: 'Like New',
      image:          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',

      seller: {
        id: 'seller_002',
        name: 'Luxury Motors Ltd.',
        rating: 4.9,
        reviews: 89,
        verified: true,
        location: 'Hamburg, Germany',
        memberSince: '2019-07-22'
      },
      rdwHistory: [
        { type: 'Import', date: '2023-02-01', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2023-03-22', description: 'First registered in Hamburg' },
        { type: 'APK', date: '2024-03-20', description: 'Passed annual inspection with no remarks' }
      ],
      damageGrid: [],
      stockId: 'STK-MB-GLE-002'
    },
    // Car 3: Audi Q7
    {
      id: 3,
      saleType: 'private-sale',
      auctionTiming: null,
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
      mediaAndDescription: {
        headline: '2022 Audi Q7 55 TFSI quattro S Line - Well-Maintained Family SUV',
        description: 'A spacious and comfortable 2022 Audi Q7 S Line, ideal for family life. This vehicle has been well looked after and comes with a partial Audi service history. Features include tri-zone climate control, MMI Navigation plus, Bang & Olufsen 3D sound system, panoramic sunroof, and Audi\'s renowned quattro all-wheel drive. The third row of seats provides flexibility for larger families or extra cargo space when folded down. Recent maintenance includes new brake pads and an oil change.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor fender bender on the rear left corner in October 2023. The bumper was professionally repainted to match the original color. No structural damage or mechanical issues resulted from the incident. Repairs were completed at an Audi authorized center.'
      },
      damagePoints: ['rear-left'],
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'sunroof',
        'parking-sensors',
        'backup-camera'
      ],
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
      location: 'Munich, Germany',
      country: 'DE',
      auctionType: 'private',
      carType: 'SUV',
      vatStatus: 'not-deductible',
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
      },
      rdwHistory: [
        { type: 'Import', date: '2021-12-01', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2022-01-10', description: 'First registered in Munich' },
        { type: 'APK', date: '2023-01-08', description: 'Passed annual inspection with minor remarks' },
        { type: 'Owner Change', date: '2023-04-15', description: 'Transferred to current owner' },
        { type: 'APK', date: '2024-01-10', description: 'Passed annual inspection with no remarks' }
      ],
      damageGrid: [
        { part: 'Rear Left Bumper', type: 'Repainted Area', photo: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }
      ],
      stockId: 'STK-AUDI-Q7-003'
    },
    // Car 4: BMW 3 Series
    {
      id:4,
      saleType: 'general-auction',
      auctionTiming: {
        preset: '5-days',
        startDate: '2024-07-12',
        startTime: '10:00',
        endDate: '2024-07-17',
        endTime: '18:00',
        timezone: 'Europe/Berlin'
      },
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
      mediaAndDescription: {
        headline: '2021 BMW 330i M Sport - Sporty Sedan with Premium Package',
        description: 'A fantastic 2021 BMW 330i M Sport that perfectly balances performance and luxury. This vehicle has been regularly serviced and is in very good condition. It comes with the desirable M Sport package, featuring sport suspension, M aerodynamics kit, and stunning 18" M double-spoke wheels. Inside, you\'ll find Vernasca leather upholstery, a Harman Kardon sound system, wireless Apple CarPlay, and BMW\'s Driving Assistant Professional. Ideal for the driving enthusiast who values both comfort and agility.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'led-lighting',
        'parking-sensors',
        'backup-camera'
      ],
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
      auctionEnds: new Date('2024-07-17T18:00:00+02:00'),
      bids: 22,
      highestBid: 37500,
      reservePrice: 35000,
      buyItNowPrice: 42000,
      location: 'Cologne, Germany',
      country: 'DE',
      auctionType: 'public',
      carType: 'Sedan',
      vatStatus: 'deductible',
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
      },
      rdwHistory: [
        { type: 'Import', date: '2021-07-15', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2021-08-20', description: 'First registered in Cologne' },
        { type: 'APK', date: '2022-08-18', description: 'Passed annual inspection with no remarks' },
        { type: 'APK', date: '2023-08-22', description: 'Passed annual inspection with no remarks' }
      ],
      damageGrid: [],
      stockId: 'STK-BMW-330-004'
    },
    // Car 5: Volkswagen Tiguan
    {
      id: 5,
      saleType: 'general-auction',
      auctionTiming: {
        preset: '10-days',
        startDate: '2024-07-08',
        startTime: '08:00',
        endDate: '2024-07-18',
        endTime: '20:00',
        timezone: 'Europe/Berlin'
      },
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
      mediaAndDescription: {
        headline: '2020 Volkswagen Tiguan 2.0 TSI Life - Reliable Family Crossover',
        description: 'A practical and reliable 2020 Volkswagen Tiguan Life, perfect for growing families. This vehicle has covered 60,000km and has been maintained according to the manufacturer\'s schedule with a partial service history. It\'s equipped with modern conveniences like keyless entry and start, automatic climate control, a touchscreen infotainment system with App-Connect, and front and rear parking sensors. The 2.0L TSI engine provides a good balance of power and efficiency. Ideal for daily commuting and weekend trips.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor scratches on the front bumper were noticed and professionally touched up in April 2024. The repair was purely cosmetic and does not affect the structure or function of the bumper. No other damage or repairs are recorded.'
      },
      damagePoints: ['front-left', 'front-right'],
      selectedOptions: [
        'alloy-wheels',
        'metallic-paint',
        'parking-sensors',
        'backup-camera'
      ],
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
      auctionEnds: new Date('2024-07-18T20:00:00+02:00'),
      bids: 10,
      highestBid: 27500,
      reservePrice: 25000,
      buyItNowPrice: 30000,
      location: 'Frankfurt, Germany',
      country: 'DE',
      auctionType: 'public',
      carType: 'SUV',
      vatStatus: 'not-deductible',
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
      },
      rdwHistory: [
        { type: 'Import', date: '2020-10-01', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2020-11-15', description: 'First registered in Frankfurt' },
        { type: 'APK', date: '2021-11-10', description: 'Passed annual inspection with no remarks' },
        { type: 'Owner Change', date: '2022-06-05', description: 'Transferred to second owner' },
        { type: 'APK', date: '2023-11-12', description: 'Passed annual inspection with minor scratches noted' }
      ],
      damageGrid: [
        { part: 'Front Left Bumper', type: 'Scratch', photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' },
        { part: 'Front Right Bumper', type: 'Scratch', photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }
      ],
      stockId: 'STK-VW-TIG-005'
    },
    // Car 6: Tesla Model 3
    {
      id:6,
      saleType: 'direct-buy',
      auctionTiming: null,
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
      mediaAndDescription: {
        directBuyPrice: 45000,
        headline: '2023 Tesla Model 3 Long Range - Low Mileage, Perfect Condition',
        description: 'Immaculate 2023 Tesla Model 3 Long Range with only 12,000km. This electric vehicle features Autopilot, premium interior with vegan leather, glass roof, and premium audio system. The battery health is at 100% with maximum range maintained. Includes all software upgrades and comes with Tesla\'s remaining warranty. Supercharger capable with free supercharging transferable. A perfect eco-friendly vehicle for daily commuting with minimal running costs.',
        photos: [
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
          'https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'led-lighting',
        'panoramic-roof',
        'autopilot',
        'premium-sound'
      ],
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
      location: 'Stuttgart, Germany',
      country: 'DE',
      auctionType: 'private',
      carType: 'Sedan',
      vatStatus: 'deductible',
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
      },
      rdwHistory: [
        { type: 'Import', date: '2023-01-10', description: 'Vehicle imported from factory in Netherlands' },
        { type: 'Registration', date: '2023-02-15', description: 'First registered in Stuttgart' },
        { type: 'APK', date: '2024-02-10', description: 'Passed annual inspection with no remarks' }
      ],
      damageGrid: [],
      stockId: 'STK-TSL-M3-006'
    },
    // Car 7: Porsche 911
    {
      id:7,
      saleType: 'general-auction',
      auctionTiming: {
        preset: '3-days',
        startDate: '2024-07-15',
        startTime: '12:00',
        endDate: '2024-07-18',
        endTime: '15:00',
        timezone: 'Europe/Berlin'
      },
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
      mediaAndDescription: {
        headline: '2022 Porsche 911 Carrera S - Low Mileage Collector\'s Item',
        description: 'Exceptional 2022 Porsche 911 Carrera S with only 8,000km. This iconic sports car features the Sports Chrono Package, Porsche Active Suspension Management, Porsche Ceramic Composite Brakes, and Burmester High-End Surround Sound System. The vehicle has never been tracked and has been meticulously maintained by Porsche Center. Includes all original documentation, two keys, and Porsche Approved Warranty. A rare opportunity to own one of the finest sports cars in existence.',
        photos: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1603712610494-73e5516d75f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80',
          'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: [
        'alloy-wheels',
        'led-lighting',
        'sports-package',
        'premium-sound',
        'ceramic-brakes'
      ],
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
      auctionEnds: new Date('2024-07-18T15:00:00+02:00'),
      bids: 32,
      highestBid: 112500,
      reservePrice: 100000,
      buyItNowPrice: 125000,
      location: 'Munich, Germany',
      country: 'DE',
      auctionType: 'public',
      carType: 'Coupe',
      vatStatus: 'deductible',
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
      },
      rdwHistory: [
        { type: 'Import', date: '2022-08-01', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2022-09-05', description: 'First registered in Munich' },
        { type: 'APK', date: '2023-09-01', description: 'Passed annual inspection with no remarks' }
      ],
      damageGrid: [],
      stockId: 'STK-POR-911-007'
    }
  ];
};