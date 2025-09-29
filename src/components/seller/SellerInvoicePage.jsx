// src/components/seller/SellerInvoicePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { loadMockCarsData } from '../../mock/data/mockCarsData';
import {
  FiDownload,
  FiUpload,
  FiCheck,
  FiClock,
  FiFileText,
  FiShield,
  FiArchive,
  FiDollarSign,
} from 'react-icons/fi';

const SellerInvoicePage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [car, setCar] = useState(null);
  const [ascriptionCode, setAscriptionCode] = useState('');
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [documentsFile, setDocumentsFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'paid'

  useEffect(() => {
    const cars = loadMockCarsData();
    const found = cars.find(c => String(c.id) === String(carId));
    if (!found) {
      navigate('/Dashboard/inventory/biddings');
      return;
    }
    setCar(found);

    // Simulate payment after 3 seconds (for demo)
    const timer = setTimeout(() => {
      setPaymentStatus('paid');
    }, 3000);
    return () => clearTimeout(timer);
  }, [carId, navigate]);

  const handleUpload = async () => {
    if (!invoiceFile || !documentsFile || !ascriptionCode) {
      alert(t('fillAllFields'));
      return;
    }
    setUploading(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate upload
    alert(t('uploadSuccess'));
    setUploading(false);
  };

  if (!car) return null;

  // Mock proforma invoice data
  const proforma = {
    id: `PRO-${car.id}`,
    amount: car.highestBid || car.price || 50000,
    vat: Math.round((car.highestBid || car.price || 50000) * 0.21),
    total: Math.round((car.highestBid || car.price || 50000) * 1.21),
    issuedAt: new Date().toISOString(),
    dueAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/Dashboard/inventory/biddings')}
        className="mb-6 text-[#3b396d] hover:text-[#2a285a] flex items-center"
      >
        ← {t('backToBiddings')}
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('invoiceManagement')} — {car.vehicleIdentification.year} {car.vehicleIdentification.make}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('awardedTo')}: <span className="font-medium">{car.seller?.name || 'Buyer'}</span>
          </p>
        </div>

        <div className="p-6">
          {/* Proforma Invoice */}
          <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FiFileText className="mr-2 text-blue-600" />
                  {t('proformaInvoice')}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{t('issuedByCNE')}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700">
                <FiDownload className="mr-1.5" />
                {t('download')}
              </button>
            </div>
            <div className="mt-4 text-sm space-y-1">
              <div><span className="font-medium">{t('invoiceNumber')}:</span> {proforma.id}</div>
              <div><span className="font-medium">{t('amount')}:</span> €{proforma.amount.toLocaleString()}</div>
              <div><span className="font-medium">{t('vat')} (21%):</span> €{proforma.vat.toLocaleString()}</div>
              <div><span className="font-medium">{t('total')}:</span> €{proforma.total.toLocaleString()}</div>
              <div><span className="font-medium">{t('issuedAt')}:</span> {new Date(proforma.issuedAt).toLocaleDateString()}</div>
              <div><span className="font-medium">{t('dueAt')}:</span> {new Date(proforma.dueAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Upload Final Invoice & Docs */}
          <div className="mb-8 p-5 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <FiUpload className="mr-2 text-yellow-600" />
              {t('uploadFinalInvoice')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('finalInvoicePDF')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setInvoiceFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('carDocumentsPDF')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setDocumentsFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('ascriptionCode')}
                </label>
                <input
                  type="text"
                  value={ascriptionCode}
                  onChange={(e) => setAscriptionCode(e.target.value)}
                  placeholder="e.g. ABC123XYZ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-5 py-2.5 bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a] flex items-center"
              >
                {uploading ? t('uploading') : t('uploadAll')}
              </button>
            </div>
          </div>

          {/* Payment Status */}
          <div className="p-5 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FiDollarSign className="mr-2 text-green-600" />
                  {t('paymentStatus')}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {paymentStatus === 'paid' ? (
                    <span className="text-green-700 font-medium flex items-center">
                      <FiCheck className="mr-1" /> {t('invoicePaid')}
                    </span>
                  ) : (
                    <span className="text-yellow-700">{t('pendingPayment')}</span>
                  )}
                </p>
              </div>
              {paymentStatus === 'paid' && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {t('paid')}
                </span>
              )}
            </div>
            {paymentStatus === 'pending' && (
              <div className="mt-3 text-sm text-gray-600 flex items-center">
                <FiClock className="mr-1 text-blue-600" />
                {t('paymentDueIn48h')}
              </div>
            )}
          </div>

          {/* Auto-Archive Note */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <FiShield className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                {t('autoArchiveNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInvoicePage;