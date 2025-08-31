import React from 'react';
import { FiUsers, FiDollarSign, FiClock, FiBarChart2, FiTruck, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import AppLayout from '../components/layout/AppLayout';

const Dashboard = () => {
  const { t } = useLanguage();

  // Dummy data for the dashboard
  const stats = [
    {
      id: 1,
      name: 'Active Auctions',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: <FiClock className="h-6 w-6 text-orange-500" />,
    },
    {
      id: 2,
      name: 'Total Sales',
      value: '€234,500',
      change: '+8.2%',
      changeType: 'increase',
      icon: <FiDollarSign className="h-6 w-6 text-orange-500" />,
    },
    {
      id: 3,
      name: 'Active Bidders',
      value: '156',
      change: '+5.4%',
      changeType: 'increase',
      icon: <FiUsers className="h-6 w-6 text-orange-500" />,
    },
    {
      id: 4,
      name: 'Average Bid',
      value: '€12,400',
      change: '-2.3%',
      changeType: 'decrease',
      icon: <FiBarChart2 className="h-6 w-6 text-orange-500" />,
    },
  ];

  const recentAuctions = [
    {
      id: 1,
      carName: 'BMW M4 Competition',
      year: 2023,
      currentBid: '€82,500',
      timeLeft: '2h 15m',
      bidders: 12,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      carName: 'Porsche 911 GT3',
      year: 2022,
      currentBid: '€165,000',
      timeLeft: '4h 30m',
      bidders: 18,
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      carName: 'Mercedes-AMG GT',
      year: 2023,
      currentBid: '€145,750',
      timeLeft: '1h 45m',
      bidders: 15,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    },
  ];

  const upcomingDeliveries = [
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
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of your auction activities and statistics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white overflow-hidden shadow-sm rounded-xl p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">{stat.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </p>
                          <p
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === 'increase'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {stat.change}
                          </p>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Active Auctions */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Active Auctions</h2>
                <button className="text-sm font-medium text-orange-600 hover:text-orange-500">
                  View all
                </button>
              </div>
              <div className="space-y-6">
                {recentAuctions.map((auction) => (
                  <div key={auction.id} className="flex items-center space-x-4">
                    <img
                      src={auction.image}
                      alt={auction.carName}
                      className="h-16 w-24 object-cover rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {auction.carName} ({auction.year})
                      </p>
                      <p className="text-sm text-gray-500">
                        Current Bid: {auction.currentBid}
                      </p>
                      <div className="flex items-center mt-1">
                        <FiClock className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{auction.timeLeft}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <FiUsers className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{auction.bidders} bidders</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                      Bid Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deliveries */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Deliveries</h2>
                <button className="text-sm font-medium text-orange-600 hover:text-orange-500">
                  View all
                </button>
              </div>
              <div className="space-y-6">
                {upcomingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center space-x-4">
                    <img
                      src={delivery.image}
                      alt={delivery.carName}
                      className="h-16 w-24 object-cover rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {delivery.carName}
                      </p>
                      <div className="flex items-center mt-1">
                        <FiCalendar className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{delivery.deliveryDate}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <FiTruck className="text-gray-400 mr-1 h-4 w-4" />
                        <span className="text-xs text-gray-500">{delivery.status}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{delivery.location}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                      Track
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
