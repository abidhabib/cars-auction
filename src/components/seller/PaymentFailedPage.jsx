// src/components/seller/PaymentFailedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiX, FiRefreshCw, FiMail } from 'react-icons/fi';

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRetry = () => {
    // In real app, you'd need to know which car failed — 
    // for demo, redirect to buy dashboard
    navigate('/Dashboard/buy');
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@carnetworkeurope.com';
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <FiX className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">{t('payment.failedTitle')}</h1>
        <p className="text-gray-600 mt-2">{t('payment.failedMessage')}</p>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] transition-colors"
          >
            <FiRefreshCw className="text-white" />
            {t('payment.retryPayment')}
          </button>

          <button
            onClick={handleContactSupport}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiMail className="text-gray-600" />
            {t('payment.contactSupport')}
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          {t('payment.paymentDeadlineStillActive')}
        </p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;