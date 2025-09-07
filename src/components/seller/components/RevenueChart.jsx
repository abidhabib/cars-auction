// src/components/seller/components/RevenueChart.jsx
import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const RevenueChart = ({ data }) => {
  const { t } = useLanguage();
  return (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">{t('sellerDashboard.analytics.chartPlaceholder') || 'Revenue Chart Placeholder'}</p>
    </div>
  );
};

export default RevenueChart;