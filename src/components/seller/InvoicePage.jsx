// src/components/seller/InvoicePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import { FiDownload, FiExternalLink, FiClock, FiCheckCircle } from 'react-icons/fi';

const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [car, setCar] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const cars = loadMockCarsData();
    const found = cars.find(c => String(c.id) === String(id));
    if (!found || found.status !== 'awarded') {
      navigate('/Dashboard/buy');
      return;
    }
    setCar(found);

    // Simulate 48h countdown from awardedAt
    const awardedAt = new Date(found.awardedAt || Date.now());
    const updateTimer = () => {
      const now = new Date();
      const diff = (awardedAt.getTime() + 48 * 3600 * 1000) - now.getTime();
      if (diff <= 0) {
        setTimeLeft(t('invoice.expired'));
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${h}h ${m}m`);
      }
    };
    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, [id, navigate, t]);

  if (!car) return null;

  const total = car.awardedBid * 1.03;
  const fee = car.awardedBid * 0.03;

  const handlePay = () => {
    // Mock Mollie redirect
    alert(t('invoice.paymentInitiated'));
    // In real app: window.location.href = molliePaymentUrl;
  };

  const handleDownload = () => {
    alert(t('invoice.downloadInitiated'));
    // In real app: trigger PDF download
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-green-50">
          <div className="flex items-center">
            <FiCheckCircle className="h-6 w-6 text-green-600 mr-2" />
            <h1 className="text-xl font-bold text-green-800">{t('invoice.congrats')}</h1>
          </div>
          <p className="text-green-700 mt-1">{t('invoice.carIsYours')}</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">{t('invoice.invoiceTo')}</span>
              <span className="font-medium">{car.seller?.name || 'Car Network Europe'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('invoice.invoiceDate')}</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('invoice.invoiceDetails')}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t('invoice.bidAmount')}</span>
                <span>€{car.awardedBid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('invoice.auctionFee')} (3%)</span>
                <span>€{fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold">
                <span>{t('invoice.totalDue')}</span>
                <span>€{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center text-blue-800">
              <FiClock className="mr-2" />
              <span>
                {t('invoice.paymentDeadline')}: <strong>{timeLeft}</strong>
              </span>
            </div>
            <p className="text-blue-700 text-sm mt-1">
              {t('invoice.payWithin48h')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePay}
              className="flex-1 flex items-center justify-center gap-2 bg-[#3b396d] text-white py-3 rounded-lg hover:bg-[#2a285a]"
            >
              <FiExternalLink className="text-white" />
              {t('invoice.payWithMollie')}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
            >
              <FiDownload className="text-gray-600" />
              {t('invoice.downloadInvoice')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;