// src/components/sellerDashboard/overviewDetails/OrderHistoryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
// Assuming CarImageSlider is correctly exported or adapted
import { CarImageSlider } from '../../seller/BuyCarsTab';
import {
  FiDollarSign,
  FiMapPin,
  FiClock,
  FiEye,
  FiAward,
  FiInfo,
  FiBarChart2,
  FiTag,
  FiUsers,
  FiCheck,
  FiX,
  FiPackage,
  FiTruck,
  FiCalendar,
  FiTool,
  FiSettings,
  FiCamera,
  FiImage,
  FiZoomIn,
  FiCheckCircle,
  FiStar,
  FiUser,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiList,
  FiFileText,
  FiDownload,
  FiEdit2,
  FiFile,
  FiPaperclip,
} from 'react-icons/fi';
import { FaArrowAltCircleLeft, FaLevelUpAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderHistoryDetail = ({ cars: initialCars }) => {
  const { t, language } = useLanguage();
  // const navigate = useNavigate(); // Uncomment if needed

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderHistoryCars, setOrderHistoryCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [allMakes, setAllMakes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10; // Can be adjusted

  // Filter states
  const [filters, setFilters] = useState({
    make: '',
    status: '',
    sortBy: 'date-delivered',
  });

  // State for managing file names being edited
  const [editingFileName, setEditingFileName] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    if (initialCars && Array.isArray(initialCars) && initialCars.length > 0) {
      setCars(initialCars);
      const history = initialCars.filter(car => car.status === 'delivered' || car.status === 'closed');
      setOrderHistoryCars(history);
      setLoading(false);
    } else {
      setCars([]);
      setOrderHistoryCars([]);
      setLoading(false);
    }
  }, [initialCars]);

  useEffect(() => {
    if (orderHistoryCars.length > 0) {
      const makes = [...new Set(orderHistoryCars.map(car => car.vehicleIdentification.make))];
      setAllMakes(makes);
    } else {
      setAllMakes([]);
    }
  }, [orderHistoryCars]);

  useEffect(() => {
    let result = [...orderHistoryCars];

    if (filters.make) {
      result = result.filter(car => car.vehicleIdentification.make.toLowerCase().includes(filters.make.toLowerCase()));
    }

    if (filters.status) {
      result = result.filter(car => car.status === filters.status);
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-delivered':
          const dateA = new Date(a.saleProcess?.delivery?.expectedAt || '1970-01-01');
          const dateB = new Date(b.saleProcess?.delivery?.expectedAt || '1970-01-01');
          return dateB - dateA;
        case 'date-closed':
          const dateAClosed = new Date(a.saleProcess?.delivery?.expectedAt || a.auctionEnds || '1970-01-01');
          const dateBClosed = new Date(b.saleProcess?.delivery?.expectedAt || b.auctionEnds || '1970-01-01');
          return dateBClosed - dateAClosed;
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

    setFilteredCars(result);
    setCurrentPage(1);
  }, [orderHistoryCars, filters, language]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      make: '',
      status: '',
      sortBy: 'date-delivered',
    });
    setCurrentPage(1);
  };

  const handleViewInvoice = (invoiceUrl, invoiceId) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, '_blank');
    } else {
      alert(`${t('sellerDashboard.orderHistory.invoiceNotAvailable') || 'Invoice'} ${invoiceId} ${t('sellerDashboard.orderHistory.notAvailable') || 'not available'}.`);
    }
  };

  const handleViewDocument = (docUrl, docId) => {
    if (docUrl) {
      window.open(docUrl, '_blank');
    } else {
      alert(`${t('sellerDashboard.orderHistory.documentNotAvailable') || 'Document'} ${docId} ${t('sellerDashboard.orderHistory.notAvailable') || 'not available'}.`);
    }
  };

  const startEditingFileName = (itemId, currentName) => {
    setEditingFileName(itemId);
    setNewFileName(currentName);
  };

  const saveFileName = (itemId) => {
    console.log(`File name for item ${itemId} changed to: ${newFileName}`);
    setEditingFileName(null);
    setNewFileName('');
    // TODO: Call API to update filename
  };

  const cancelEditingFileName = () => {
    setEditingFileName(null);
    setNewFileName('');
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">{t('common.loading') || 'Loading...'}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('sellerDashboard.blocks.orderHistory') || 'Order History'}</h3>
      <p className="text-sm text-gray-600 mb-4">{t('sellerDashboard.blocks.orderHistoryDesc')}</p>

      {/* Filters Section - Responsive */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3 w-full md:w-auto">
            {/* Make Filter */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.make') || 'Make'}</label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
                className="block w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
              >
                <option value="">{t('sellerDashboard.filter.allMakes') || 'All Makes'}</option>
                {allMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.status') || 'Status'}</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="block w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
              >
                <option value="">{t('sellerDashboard.filter.allStatus') || 'All Statuses'}</option>
                <option value="delivered">{t('sellerDashboard.status.delivered') || 'Delivered'}</option>
                <option value="closed">{t('sellerDashboard.status.closed') || 'Closed'}</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('sellerDashboard.filter.sortBy') || 'Sort By'}</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="block w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
              >
                <option value="date-delivered">{t('sellerDashboard.sort.dateDelivered') || 'Date Delivered'}</option>
                <option value="date-closed">{t('sellerDashboard.sort.dateClosed') || 'Date Closed'}</option>
                <option value="price-high">{t('sellerDashboard.sort.priceHigh') || 'Price: High to Low'}</option>
                <option value="price-low">{t('sellerDashboard.sort.priceLow') || 'Price: Low to High'}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end md:justify-center">
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 font-medium border border-red-300 rounded hover:bg-red-50 transition-colors duration-200"
            >
              {t('sellerDashboard.clearAll') || 'Clear All'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-2 text-sm text-gray-500">
        {filteredCars.length} {t('sellerDashboard.blocks.totalPurchases') || 'purchases found'}
      </div>

      {/* Order History List/Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Responsive Table Header */}
        {/* Hidden on small screens, visible from 'lg' upwards */}
        <div className="hidden lg:grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-3">{t('sellerDashboard.orderHistory.car') || 'Car'}</div>
          <div className="col-span-2">{t('sellerDashboard.orderHistory.details') || 'Details'}</div>
          <div className="col-span-2">{t('sellerDashboard.orderHistory.status') || 'Status'}</div>
          <div className="col-span-2">{t('sellerDashboard.orderHistory.buyer') || 'Buyer'}</div>
          <div className="col-span-3">{t('sellerDashboard.orderHistory.documents') || 'Documents'}</div>
        </div>

        {/* Order History Rows - Unified Responsive Structure */}
        <div className="divide-y divide-gray-200">
          {currentCars.length > 0 ? (
            currentCars.map((car) => (
              <div key={car.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                {/* Mobile/Tablet Layout (Stacked) - Shown below 'lg' */}
                <div className="lg:hidden space-y-4">
                  {/* Car Info Section */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                      {car.images && car.images.length > 0 ? (
                        <img src={car.images[0]} alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                          <FiImage className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <FiDollarSign className="mr-1 h-3 w-3 flex-shrink-0" />
                        <span className="font-medium">€{car.price?.toLocaleString('de-DE')}</span>
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit} • {car.fuelType} • {car.transmission}
                      </p>
                      <p className="text-xs text-gray-500 flex items-start mt-1">
                        <FiMapPin className="mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{car.location}</span>
                      </p>
                      {car.stockId && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <FiInfo className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Details, Status, Buyer Sections */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {/* Status */}
                    <div className="sm:col-span-1">
                      <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.orderHistory.status') || 'Status'}:</span>
                      <div>
                        {car.status === 'delivered' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                          </span>
                        )}
                        {car.status === 'closed' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <FiCheck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.closed') || 'Closed'}
                          </span>
                        )}
                      </div>
                      {(car.status === 'delivered' || car.status === 'closed') && car.saleProcess?.delivery?.expectedAt && (
                        <p className="text-gray-500 mt-1 flex items-start">
                          <FiCalendar className="mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{t('sellerDashboard.orderHistory.deliveredOn') || 'Delivered on'}: {new Date(car.saleProcess.delivery.expectedAt).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>

                    {/* Details (Location, Stock ID, Delivered Date) */}
                    <div className="sm:col-span-1">
                      <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.orderHistory.details') || 'Details'}:</span>
                      <p className="text-gray-500 truncate flex items-start">
                        <FiMapPin className="mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{car.location}</span>
                      </p>
                      {car.stockId && (
                        <p className="text-gray-500 mt-1 truncate flex items-center">
                          <FiInfo className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                        </p>
                      )}
                      {(car.status === 'delivered' || car.status === 'closed') && car.saleProcess?.delivery?.expectedAt && (
                        <p className="text-gray-500 mt-1 flex items-start">
                          <FiCalendar className="mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{new Date(car.saleProcess.delivery.expectedAt).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>

                    {/* Buyer */}
                    <div className="sm:col-span-1">
                      <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.orderHistory.buyer') || 'Buyer'}:</span>
                      {car.saleProcess?.awardedTo && (
                        <p className="text-gray-500 truncate flex items-center">
                          <FiUser className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{car.saleProcess.awardedTo.buyerName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div>
                    <span className="font-medium text-gray-700 block mb-1">{t('sellerDashboard.orderHistory.documents') || 'Documents'}:</span>
                    <div className="space-y-2">
                      {car.invoices?.proforma && (
                        <div className="flex items-center justify-between text-xs p-2 bg-blue-50 rounded">
                          <button
                            onClick={() => handleViewInvoice(car.invoices.proforma.pdfUrl, car.invoices.proforma.id)}
                            className="text-blue-600 hover:text-blue-800 truncate flex-1 text-left flex items-center"
                          >
                            <FiFileText className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{t('sellerDashboard.orderHistory.proformaInvoice') || 'Proforma Invoice'} ({car.invoices.proforma.id})</span>
                          </button>
                          <span className="text-gray-500 ml-2">{t('sellerDashboard.orderHistory.view') || 'View'}</span>
                        </div>
                      )}
                      {car.invoices?.final && (
                        <div className={`flex items-center justify-between text-xs p-2 rounded ${
                          car.invoices.final.status === 'paid' ? 'bg-green-50' : 'bg-yellow-50'
                        }`}>
                          <button
                            onClick={() => handleViewInvoice(car.invoices.final.pdfUrl, car.invoices.final.id)}
                            className={`truncate flex-1 text-left flex items-center ${
                              car.invoices.final.status === 'paid'
                                ? 'text-green-600 hover:text-green-800'
                                : 'text-yellow-600 hover:text-yellow-800'
                            }`}
                          >
                            <FiFileText className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{t('sellerDashboard.orderHistory.finalInvoice') || 'Final Invoice'} ({car.invoices.final.id}) - {car.invoices.final.status}</span>
                          </button>
                          <span className="text-gray-500 ml-2">{t('sellerDashboard.orderHistory.view') || 'View'}</span>
                        </div>
                      )}
                      {car.saleProcess?.documents?.ascriptionCode && (
                        <div className="flex items-center justify-between text-xs p-2 bg-purple-50 rounded">
                          {editingFileName === `asc-${car.id}` ? (
                            <div className="flex items-center w-full gap-1">
                              <input
                                type="text"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                className="flex-1 px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
                                autoFocus
                              />
                              <button
                                onClick={() => saveFileName(`asc-${car.id}`)}
                                className="text-green-600 hover:text-green-800 p-1"
                                aria-label={t('common.save') || 'Save'}
                              >
                                <FiCheck className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={cancelEditingFileName}
                                className="text-red-600 hover:text-red-800 p-1"
                                aria-label={t('common.cancel') || 'Cancel'}
                              >
                                <FiX className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center w-full">
                              <button
                                onClick={() => handleViewDocument(null, `ASC-${car.id}`)} // Placeholder URL
                                className="text-purple-600 hover:text-purple-800 truncate flex-1 text-left flex items-center"
                              >
                                <FiTag className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                                <span className="truncate">{t('sellerDashboard.orderHistory.ascriptionCode') || 'Ascription Code'} ({car.saleProcess.documents.ascriptionCode})</span>
                              </button>
                              <button
                                onClick={() => startEditingFileName(`asc-${car.id}`, car.saleProcess.documents.ascriptionCode)}
                                className="text-gray-500 hover:text-gray-700 ml-2 p-1"
                                aria-label={t('common.edit') || 'Edit'}
                              >
                                <FiEdit2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      // onClick={() => handleViewListing(car.id)}
                      className="px-3 py-1.5 text-xs font-medium text-center bg-[#3b396d] text-white rounded-lg hover:bg-[#2a285a]"
                    >
                      {t('sellerDashboard.viewListing') || 'View Listing'}
                    </button>
                    <button
                      // onClick={() => handleViewSaleProcess(car.id)}
                      className="px-3 py-1.5 text-xs font-medium text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
                    >
                      {t('sellerDashboard.viewSaleProcess') || 'View Sale Process'}
                    </button>
                  </div>
                </div>

                {/* Desktop Layout (Grid) - Visible from 'lg' upwards */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-start">
                  {/* Car Info */}
                  <div className="col-span-3 flex items-start">
                    <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                      {car.images && car.images.length > 0 ? (
                        <img src={car.images[0]} alt={`${car.vehicleIdentification.make} ${car.vehicleIdentification.model}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                          <FiImage className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {car.vehicleIdentification.year} {car.vehicleIdentification.make} {car.vehicleIdentification.model}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <FiDollarSign className="mr-1 h-3 w-3 flex-shrink-0" />
                        <span className="font-medium">€{car.price?.toLocaleString('de-DE')}</span>
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {parseInt(car.vehicleIdentification.mileage, 10)?.toLocaleString()} {car.vehicleIdentification.mileageUnit}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {car.fuelType} • {car.transmission}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="col-span-2 text-xs text-gray-500">
                    <p className="flex items-start">
                      <FiMapPin className="mr-1 h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <span className="truncate">{car.location}</span>
                    </p>
                    {car.stockId && (
                      <p className="mt-1 flex items-center">
                        <FiInfo className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                        <span>{t('sellerDashboard.stockId') || 'Stock ID'}: {car.stockId}</span>
                      </p>
                    )}
                    {(car.status === 'delivered' || car.status === 'closed') && car.saleProcess?.delivery?.expectedAt && (
                      <p className="mt-1 flex items-start">
                        <FiCalendar className="mr-1 h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span>{t('sellerDashboard.orderHistory.deliveredOn') || 'Delivered on'}: {new Date(car.saleProcess.delivery.expectedAt).toLocaleDateString()}</span>
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-2 text-xs">
                    {car.status === 'delivered' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FiPackage className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.delivered') || 'Delivered'}
                      </span>
                    )}
                    {car.status === 'closed' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <FiCheck className="mr-1 h-3 w-3" /> {t('sellerDashboard.status.closed') || 'Closed'}
                      </span>
                    )}
                  </div>

                  {/* Buyer */}
                  <div className="col-span-2 text-xs text-gray-500">
                    {car.saleProcess?.awardedTo && (
                      <p className="truncate flex items-center">
                        <FiUser className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{car.saleProcess.awardedTo.buyerName}</span>
                      </p>
                    )}
                  </div>

                  {/* Documents */}
                  <div className="col-span-3 text-xs">
                    <div className="space-y-1">
                      {car.invoices?.proforma && (
                        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                          <button
                            onClick={() => handleViewInvoice(car.invoices.proforma.pdfUrl, car.invoices.proforma.id)}
                            className="text-blue-600 hover:text-blue-800 truncate flex-1 text-left flex items-center"
                          >
                            <FiFileText className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{t('sellerDashboard.orderHistory.proformaInvoice') || 'Proforma Invoice'} ({car.invoices.proforma.id})</span>
                          </button>
                          <span className="text-gray-500 ml-2">{t('sellerDashboard.orderHistory.view') || 'View'}</span>
                        </div>
                      )}
                      {car.invoices?.final && (
                        <div className={`flex items-center justify-between p-2 rounded ${
                          car.invoices.final.status === 'paid' ? 'bg-green-50' : 'bg-yellow-50'
                        }`}>
                          <button
                            onClick={() => handleViewInvoice(car.invoices.final.pdfUrl, car.invoices.final.id)}
                            className={`truncate flex-1 text-left flex items-center ${
                              car.invoices.final.status === 'paid'
                                ? 'text-green-600 hover:text-green-800'
                                : 'text-yellow-600 hover:text-yellow-800'
                            }`}
                          >
                            <FiFileText className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{t('sellerDashboard.orderHistory.finalInvoice') || 'Final Invoice'} ({car.invoices.final.id}) - {car.invoices.final.status}</span>
                          </button>
                          <span className="text-gray-500 ml-2">{t('sellerDashboard.orderHistory.view') || 'View'}</span>
                        </div>
                      )}
                      {car.saleProcess?.documents?.ascriptionCode && (
                        <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                          {editingFileName === `asc-${car.id}` ? (
                            <div className="flex items-center w-full gap-1">
                              <input
                                type="text"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                className="flex-1 px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#3b396d]"
                                autoFocus
                              />
                              <button
                                onClick={() => saveFileName(`asc-${car.id}`)}
                                className="text-green-600 hover:text-green-800 p-1"
                                aria-label={t('common.save') || 'Save'}
                              >
                                <FiCheck className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={cancelEditingFileName}
                                className="text-red-600 hover:text-red-800 p-1"
                                aria-label={t('common.cancel') || 'Cancel'}
                              >
                                <FiX className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center w-full">
                              <button
                                onClick={() => handleViewDocument(null, `ASC-${car.id}`)} // Placeholder URL
                                className="text-purple-600 hover:text-purple-800 truncate flex-1 text-left flex items-center"
                              >
                                <FiTag className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                                <span className="truncate">{t('sellerDashboard.orderHistory.ascriptionCode') || 'Ascription Code'} ({car.saleProcess.documents.ascriptionCode})</span>
                              </button>
                              <button
                                onClick={() => startEditingFileName(`asc-${car.id}`, car.saleProcess.documents.ascriptionCode)}
                                className="text-gray-500 hover:text-gray-700 ml-2 p-1"
                                aria-label={t('common.edit') || 'Edit'}
                              >
                                <FiEdit2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
               <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
               <h3 className="mt-2 text-sm font-medium text-gray-900">{t('sellerDashboard.noResults') || 'No purchase history found'}</h3>
               <p className="mt-1 text-sm text-gray-500">
                 {t('sellerDashboard.orderHistory.noHistoryDescription') || 'There are no completed purchases yet.'}
               </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex items-center space-x-0.5 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const showPage =
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
              const showEllipsisBefore = pageNum === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter = pageNum === currentPage + 2 && currentPage < totalPages - 2;

              if (showPage) {
                return (
                  <button
                    key={i}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors min-w-[36px] ${
                      currentPage === pageNum
                        ? 'bg-[#3b396d] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={i} className="px-2 py-1.5 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryDetail;