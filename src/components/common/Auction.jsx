import React from 'react';
import { FaCar, FaShieldAlt, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

const AuctionService = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
Why is it worth it?          </h1>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
              <img 
                src="https://www.carsonnet.com/build/images/badge-1.6c9264ce.png" 
                alt="Wide range badge" 
                className="h-16 w-16"
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">A wide range of</h3>
            <p className="mt-3 text-base text-gray-600">
              Our car auctions offer access to a huge number of vehicles from all over Europe.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
              <img 
                src="https://www.carsonnet.com/build/images/badge-2.917b2a7b.png" 
                alt="Transparent rules badge" 
                className="h-16 w-16"
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Transparent rules</h3>
            <p className="mt-3 text-base text-gray-600">
              Our main goal is comfort, safety and customer satisfaction.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
              <FaCheckCircle className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Only verified offers</h3>
            <p className="mt-3 text-base text-gray-600">
              All cars auctioned online on CarsOnNet come from legal and verified sources.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
              <FaMapMarkerAlt className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Convenient and safe pickup</h3>
            <p className="mt-3 text-base text-gray-600">
              Cars purchased at online auctions can be picked up at our parking lots located in Germany, the Czech Republic, Austria and Poland.
            </p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <button className="inline-flex items-center px-6 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            DISCOVER ALL THE ADVANTAGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionService;