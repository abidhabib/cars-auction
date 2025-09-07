// src/components/seller/components/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-[#3b396d] mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{title}</div>
    </div>
  );
};

export default StatsCard;