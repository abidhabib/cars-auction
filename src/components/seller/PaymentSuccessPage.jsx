// src/components/seller/PaymentSuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiCheckCircle } from 'react-icons/fi';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto p-4 mt-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <FiCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">{t('payment.successTitle')}</h1>
        <p className="text-gray-600 mt-2">{t('payment.successMessage')}</p>
        <button
          onClick={() => navigate('/Dashboard/buy')}
          className="mt-6 px-6 py-3 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a]"
        >
          {t('payment.viewCars')}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;