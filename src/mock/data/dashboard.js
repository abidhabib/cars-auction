// src/mock/data/dashboard.js
export const mockDashboardStats = {
  stats: [
    {
      id: 1,
      name: 'Active Auctions',
      value: 24,
      change: '+12%',
      changeType: 'increase',
      icon: 'clock'
    },
    {
      id: 2,
      name: 'Total Sales',
      value: 234500,
      change: '+8.2%',
      changeType: 'increase',
      icon: 'dollar'
    },
    {
      id: 3,
      name: 'Active Bidders',
      value: 156,
      change: '+5.4%',
      changeType: 'increase',
      icon: 'users'
    },
    {
      id: 4,
      name: 'Average Bid',
      value: 12400,
      change: '-2.3%',
      changeType: 'decrease',
      icon: 'chart'
    }
  ],
  recentAuctions: [
    {
      id: 1,
      carName: 'BMW M4 Competition',
      year: 2023,
      currentBid: 82500,
      timeLeft: '2h 15m',
      bidders: 12,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      carName: 'Porsche 911 GT3',
      year: 2022,
      currentBid: 165000,
      timeLeft: '4h 30m',
      bidders: 18,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      carName: 'Mercedes-AMG GT',
      year: 2023,
      currentBid: 145750,
      timeLeft: '1h 45m',
      bidders: 15,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
  ],
  upcomingDeliveries: [
    {
      id: 1,
      carName: 'Audi RS e-tron GT',
      deliveryDate: 'Sep 5, 2025',
      status: 'In Transit',
      location: 'Hamburg',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      carName: 'Tesla Model S Plaid',
      deliveryDate: 'Sep 8, 2025',
      status: 'Processing',
      location: 'Berlin',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
  ]
};