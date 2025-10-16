// src/mock/data/mockCarsData.js
export const loadMockCarsData = () => {
  const now = new Date();
  const myCompanyId = '1'; // This represents the "current user" for whom we want to show bids

  // Helper to generate realistic bids per car
  const generateBids = (car, count = 6) => {
    const base = car.highestBid || car.price || 50000;
    const reserve = car.reservePrice || base * 0.9;
    const names = [
      'AutoTrade GmbH',
      'Luxury Motors Ltd.',
      'EuroCar Sales',
      'Private Buyer',
      'Global Auto Imports',
      'DeutschAuto',
      'Premium Wheels',
      'City Motors',
      'Elite Car Group',
      'Bavarian Autos',
      'Amsterdam Auto BV',
      'Brussels Car Trade',
    ];

    return Array.from({ length: count }, (_, i) => {
      const amount = Math.max(reserve + 500, base - i * Math.floor(Math.random() * 1800));
      return {
        id: `bid_${car.id}_${i + 1}`,
        buyerName: names[(car.id * 10 + i) % names.length],
        amount,
        note: i === 0 ? 'Ready for immediate payment' : i === 2 ? 'Need 5 days for financing' : '',
        broker: i % 3 === 0 ? 'AutoTrade International' : i % 3 === 1 ? 'EuroCar Sales' : '',
        timestamp: new Date(now.getTime() - Math.floor(Math.random() * 7) * 86400000),
      };
    }).filter(bid => bid.amount > reserve);
  };
// Inside loadMockCarsData()
const generateInvoiceData = (car, bid) => {
  const now = new Date();
  return {
    proforma: {
      id: `PRO-${car.id}`,
      amount: bid.amount,
      vat: Math.round(bid.amount * 0.21),
      total: Math.round(bid.amount * 1.21),
      issuedAt: now.toISOString(),
      dueAt: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(),
      pdfUrl: `https://example.com/invoices/proforma-${car.id}.pdf`,
      from: 'Car Network Europe B.V.',
      to: car.seller.name
    },
    final: {
      id: null,
      uploadedAt: null,
      status: 'pending', // 'pending' | 'paid'
      pdfUrl: null
    }
  };
};
  // Helper to generate sale process data based on location type and status
  const generateSaleProcess = (car, status) => {
    const baseData = {
      status,
      awardedTo: status !== 'active' ? {
        buyerName: generateBids(car, 1)[0]?.buyerName || 'AutoTrade GmbH',
        bidId: `bid_${car.id}_1`,
        amount: car.highestBid || car.price
      } : null,
      paymentDeadline: status !== 'active' ? new Date(now.getTime() + 7 * 86400000) : null,
      delivery: status !== 'active' ? {
        status: car.locationType === 'in-stock' ? 'ready-for-pickup' : 'scheduled',
        expectedAt: car.locationType === 'in-stock' ? new Date(now.getTime() + 2 * 86400000) : new Date(now.getTime() + 14 * 86400000),
        trackingId: car.locationType === 'network' ? `TRK${car.id.toString().padStart(6, '0')}` : null
      } : null,
      documents: {
        proformaSent: status !== 'active',
        sellerInvoiceUploaded: status === 'delivered' || status === 'closed',
        ascriptionCode: status === 'closed' ? `ASC${car.id.toString().padStart(6, '0')}` : ''
      }
    };

    return baseData;
  };

  // Helper to generate invoice data
  const generateInvoices = (car, saleProcessStatus) => {
    const amount = car.highestBid || car.price;
    const baseUrl = `https://api.example.com/invoices/${car.id}`;
    
    return {
      proforma: saleProcessStatus !== 'active' ? {
        id: `PROF${car.id.toString().padStart(6, '0')}`,
        amount,
        pdfUrl: `${baseUrl}/proforma.pdf`
      } : null,
      final: (saleProcessStatus === 'delivered' || saleProcessStatus === 'closed') ? {
        id: `INV${car.id.toString().padStart(6, '0')}`,
        uploadedAt: new Date(now.getTime() - 2 * 86400000),
        status: saleProcessStatus === 'closed' ? 'paid' : 'pending',
        pdfUrl: saleProcessStatus === 'closed' ? `${baseUrl}/final.pdf` : null
      } : null
    };
  };
// Inside loadMockCarsData(), before `return [...]`
const generateMockBids = (car) => {
  const base = car.highestBid || car.price || 50000;
  const reserve = car.reservePrice || base * 0.9;
  const count = Math.floor(Math.random() * 4) + 3; // 3–6 bids
  const names = [
    'AutoTrade GmbH', 'Luxury Motors Ltd.', 'EuroCar Sales', 'Private Buyer',
    'Global Auto Imports', 'DeutschAuto', 'Premium Wheels', 'City Motors'
  ];
  return Array.from({ length: count }, (_, i) => {
    const amount = Math.max(reserve + 500, base - i * Math.floor(Math.random() * 2000));
    return {
      id: `bid_${car.id}_${i + 1}`,
      buyerName: names[(car.id * 10 + i) % names.length],
      amount,
      note: i === 0 ? 'Ready for immediate payment' : i === 2 ? 'Need 5 days for financing' : '',
      broker: i % 3 === 0 ? 'AutoTrade International' : i % 3 === 1 ? 'EuroCar Sales' : '',
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 5) * 86400000),
    };
  }).filter(bid => bid.amount > reserve);
};
  return [
    // Car 1: BMW X5 — in-stock (awarded, ready for payment)
    {
      id: 1,
  mockBids: generateMockBids({ id: 1, highestBid: 54800, reservePrice: 50000, price: 55000 }),
    
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
        description: 'Presenting a stunning 2022 BMW X5 xDrive40d M Sport. This vehicle has been meticulously maintained with a full BMW service history.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: ['alloy-wheels', 'led-lighting', 'panoramic-roof', 'parking-sensors', 'backup-camera', 'tow-hitch'],
      conditionAssessment: {
        technicalChecklist: { engine: 'good', transmission: 'good', brakes: 'good', suspension: 'good', electrics: 'good', exhaust: 'good' },
        interiorChecklist: { seats: 'good', dashboard: 'good', carpets: 'good', headliner: 'good', controls: 'good' },
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
      status: 'awarded', // Changed from 'active'
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
      rdwHistory: [
        { type: 'Import', date: '2022-05-10', description: 'Vehicle imported from factory in Germany' },
        { type: 'Registration', date: '2022-06-15', description: 'First registered in Berlin' }
      ],
      damageGrid: [
        { part: 'Front Bumper', type: 'Minor Scratch', photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }
      ],
      stockId: 'STK-BMW-X5-001',
      locationType: 'in-stock',
      saleProcess: generateSaleProcess({ id: 1, highestBid: 54800, price: 55000, locationType: 'in-stock' }, 'awarded'),
      invoices: generateInvoices({ id: 1, highestBid: 54800, price: 55000 }, 'awarded'),
      mockBids: generateBids({ id: 1, highestBid: 54800, reservePrice: 50000 })
    },

    // Car 2: Mercedes-Benz GLE — at network (delivered, awaiting payment)
    {
      id: 2,
        mockBids: generateMockBids({ id: 2, highestBid: 54700, reservePrice: 60000, price: 88000 }),

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
        description: 'Absolutely stunning and nearly new 2023 Mercedes-Benz GLE 450e Hybrid from the AMG Line.',
        photos: [
          'https://images.unsplash.com/photo-1622933017736-231a5a17f6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
        ],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: ['alloy-wheels', 'led-lighting', 'panoramic-roof', 'air-suspension', 'tow-hitch', 'xenon-headlights'],
      conditionAssessment: {
        technicalChecklist: { engine: 'good', transmission: 'good', brakes: 'good', suspension: 'good', electrics: 'good', exhaust: 'good' },
        interiorChecklist: { seats: 'good', dashboard: 'good', carpets: 'good', headliner: 'good', controls: 'good' },
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
      status: 'delivered', // Changed from 'active'
      price: 62000,
      currency: 'EUR',
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      color: 'White',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
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
        { type: 'Registration', date: '2023-03-22', description: 'First registered in Hamburg' }
      ],
      damageGrid: [],
      stockId: 'STK-MB-GLE-002',
      locationType: 'network',
      saleProcess: generateSaleProcess({ id: 2, highestBid: 62000, price: 62000, locationType: 'network' }, 'delivered'),
      invoices: generateInvoices({ id: 2, highestBid: 62000, price: 62000 }, 'delivered'),
      mockBids: generateBids({ id: 2, highestBid: 62000, reservePrice: 58000 })
    },

    // Car 3: Audi Q7 — in-stock (closed, completed sale)
    {
      id: 3,
              mockBids: generateMockBids({ id: 3, highestBid: 56600, reservePrice: 30000, price: 55900 }),

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
        description: 'A spacious and comfortable 2022 Audi Q7 S Line, ideal for family life.',
        photos: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
        ],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor fender bender on the rear left corner in October 2023...'
      },
      damagePoints: ['rear-left'],
      selectedOptions: ['alloy-wheels', 'metallic-paint', 'sunroof', 'parking-sensors', 'backup-camera'],
      conditionAssessment: {
        technicalChecklist: { engine: 'good', transmission: 'good', brakes: 'average', suspension: 'good', electrics: 'good', exhaust: 'good' },
        interiorChecklist: { seats: 'average', dashboard: 'good', carpets: 'good', headliner: 'good', controls: 'good' },
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
      status: 'closed', // Completed sale
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
        { type: 'Registration', date: '2022-01-10', description: 'First registered in Munich' }
      ],
      damageGrid: [
        { part: 'Rear Left Bumper', type: 'Repainted Area', photo: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }
      ],
      stockId: 'STK-AUDI-Q7-003',
      locationType: 'in-stock',
      saleProcess: generateSaleProcess({ id: 3, highestBid: 48000, price: 48000, locationType: 'in-stock' }, 'closed'),
      invoices: generateInvoices({ id: 3, highestBid: 48000, price: 48000 }, 'closed'),
      mockBids: generateBids({ id: 3, highestBid: 48000, reservePrice: 45000 })
    },

    // Car 4: BMW 3 Series — network (on-route, in transit)
    {
      id: 4,
              mockBids: generateMockBids({ id: 4, highestBid: 54180, reservePrice: 6600, price: 44000 }),

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
        description: 'A fantastic 2021 BMW 330i M Sport that perfectly balances performance and luxury...',
        photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
        serviceHistory: 'full',
        hasAccident: false,
        accidentDetails: ''
      },
      damagePoints: [],
      selectedOptions: ['alloy-wheels', 'metallic-paint', 'led-lighting', 'parking-sensors', 'backup-camera'],
      conditionAssessment: {
        technicalChecklist: { engine: 'good', transmission: 'good', brakes: 'good', suspension: 'good', electrics: 'good', exhaust: 'good' },
        interiorChecklist: { seats: 'good', dashboard: 'good', carpets: 'average', headliner: 'good', controls: 'good' },
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
      status: 'on-route', // In transit
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
        { type: 'Registration', date: '2021-08-20', description: 'First registered in Cologne' }
      ],
      damageGrid: [],
      stockId: 'STK-BMW-330-004',
      locationType: 'network',
      saleProcess: generateSaleProcess({ id: 4, highestBid: 37500, price: 38000, locationType: 'network' }, 'on-route'),
      invoices: generateInvoices({ id: 4, highestBid: 37500, price: 38000 }, 'on-route'),
      mockBids: generateBids({ id: 4, highestBid: 37500, reservePrice: 35000 })
    },

    // Car 5: VW Tiguan — in-stock (active auction - no post-award data)
    {
      id: 5,
              mockBids: generateMockBids({ id: 5, highestBid: 55500, reservePrice: 550000, price: 57000 }),

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
        description: 'A practical and reliable 2020 Volkswagen Tiguan Life, perfect for growing families...',
        photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
        serviceHistory: 'partial',
        hasAccident: true,
        accidentDetails: 'Minor scratches on the front bumper...'
      },
      damagePoints: ['front-left', 'front-right'],
      selectedOptions: ['alloy-wheels', 'metallic-paint', 'parking-sensors', 'backup-camera'],
      conditionAssessment: {
        technicalChecklist: { engine: 'good', transmission: 'good', brakes: 'good', suspension: 'average', electrics: 'good', exhaust: 'good' },
        interiorChecklist: { seats: 'average', dashboard: 'good', carpets: 'average', headliner: 'good', controls: 'good' },
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
      status: 'active', // Still active auction
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
        { type: 'Registration', date: '2020-11-15', description: 'First registered in Frankfurt' }
      ],
      damageGrid: [
        { part: 'Front Left Bumper', type: 'Scratch', photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }
      ],
      stockId: 'STK-VW-TIG-005',
      locationType: 'in-stock',
      saleProcess: generateSaleProcess({ id: 5, highestBid: 27500, price: 28000, locationType: 'in-stock' }, 'active'),
      invoices: generateInvoices({ id: 5, highestBid: 27500, price: 28000 }, 'active'),
      mockBids: generateBids({ id: 5, highestBid: 27500, reservePrice: 25000 })
    }
  ];
};