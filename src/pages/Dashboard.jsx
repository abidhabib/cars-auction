import React from 'react';
import { FiUsers, FiDollarSign, FiClock, FiBarChart2, FiTruck, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const Dashboard = () => {
  // Dummy data
  const stats = [
    {
      id: 1,
      name: "Total Sales",
      value: 125000,
      icon: "dollar",
      change: "+12.5%",
      changeType: "increase"
    },
    {
      id: 2,
      name: "Active Auctions",
      value: 24,
      icon: "clock",
      change: "+3",
      changeType: "increase"
    },
    {
      id: 3,
      name: "Registered Users",
      value: 1242,
      icon: "users",
      change: "+24",
      changeType: "increase"
    },
    {
      id: 4,
      name: "Avg. Bid Value",
      value: 3200,
      icon: "chart",
      change: "-2.3%",
      changeType: "decrease"
    }
  ];

  const recentAuctions = [
    {
      id: 1,
      carName: "BMW M3 Competition",
      year: 2022,
      currentBid: 65000,
      timeLeft: "2h 15m",
      bidders: 12,
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      carName: "Porsche 911 Turbo S",
      year: 2023,
      currentBid: 185000,
      timeLeft: "5h 30m",
      bidders: 8,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      carName: "Mercedes-AMG GT",
      year: 2021,
      currentBid: 98000,
      timeLeft: "1d 4h",
      bidders: 15,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const upcomingDeliveries = [
    {
      id: 1,
      carName: "Audi R8 V10 Plus",
      deliveryDate: "Oct 15, 2023",
      status: "In Transit",
      location: "Hamburg, Germany → Los Angeles, USA",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      carName: "Tesla Model S Plaid",
      deliveryDate: "Oct 18, 2023",
      status: "Processing",
      location: "Fremont, USA",
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      carName: "Lamborghini Huracán",
      deliveryDate: "Oct 22, 2023",
      status: "Ready for Pickup",
      location: "Bologna, Italy",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const renderIcon = (iconName, className) => {
    switch (iconName) {
      case 'clock': return <FiClock className={className} />;
      case 'dollar': return <FiDollarSign className={className} />;
      case 'users': return <FiUsers className={className} />;
      case 'chart': return <FiBarChart2 className={className} />;
      default: return <FiBarChart2 className={className} />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-purple-100 mr-4">
                  {renderIcon(stat.icon, "h-5 w-5 text-purple-600")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-xl font-semibold text-gray-900">
                      {stat.icon === 'dollar' || stat.icon === 'chart' 
                        ? formatCurrency(stat.value) 
                        : stat.value.toLocaleString()}
                    </p>
                    <span className={`ml-2 flex items-center text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <FiArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <FiArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Auctions */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Active Auctions</h2>
              <button className="text-sm text-purple-700 hover:text-purple-800 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentAuctions.map((auction) => (
                <div key={auction.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <img
                    src={auction.image}
                    alt={auction.carName}
                    className="h-16 w-full sm:w-20 object-cover rounded-lg mb-3 sm:mb-0"
                  />
                  <div className="sm:ml-4 flex-1 min-w-0 w-full">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {auction.carName} ({auction.year})
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Current Bid: {formatCurrency(auction.currentBid)}
                    </p>
                    <div className="flex flex-wrap items-center mt-2 space-x-4 text-xs text-gray-500">
                      <div className="flex items-center mb-1 sm:mb-0">
                        <FiClock className="mr-1 h-4 w-4" />
                        {auction.timeLeft}
                      </div>
                      <div className="flex items-center">
                        <FiUsers className="mr-1 h-4 w-4" />
                        {auction.bidders} bidders
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 sm:mt-0 bg-[#3b396d] text-white hover:bg-purple-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto text-center">
                    Bid Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deliveries */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Deliveries</h2>
              <button className="text-sm text-purple-700 hover:text-purple-800 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <img
                    src={delivery.image}
                    alt={delivery.carName}
                    className="h-16 w-full sm:w-20 object-cover rounded-lg mb-3 sm:mb-0"
                  />
                  <div className="sm:ml-4 flex-1 min-w-0 w-full">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {delivery.carName}
                    </p>
                    <div className="flex flex-wrap items-center mt-2 space-x-4 text-xs text-gray-500">
                      <div className="flex items-center mb-1 sm:mb-0">
                        <FiCalendar className="mr-1 h-4 w-4" />
                        {delivery.deliveryDate}
                      </div>
                      <div className="flex items-center">
                        <FiTruck className="mr-1 h-4 w-4" />
                        {delivery.status}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {delivery.location}
                    </p>
                  </div>
                  <button className="mt-3 sm:mt-0 border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto text-center">
                    Track
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;