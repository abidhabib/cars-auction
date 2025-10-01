// src/pages/seller/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-adjust sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCarSelectFromSearch = (car) => {
    navigate('/Dashboard/buy', { state: { selectedCar: car } });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-sm">
        <SellerHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCarSelect={handleCarSelectFromSearch}
        />
      </header>

      {/* Sidebar */}
      <aside
        className="fixed z-40 transition-all duration-300 ease-in-out"
        style={{
          top: '4.5rem', // 4rem header + 0.5rem gap
          left: '1rem',
          width: sidebarOpen ? '15rem' : '4rem',
          height: 'calc(100vh - 6rem)', // 4.5rem top + 1.5rem bottom
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
        }}
      >
        <div className="h-full bg-[#3b396d]">
          <SellerSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 pt-20 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: sidebarOpen ? '17.5rem' : '6rem', // sidebar width + margins
          marginRight: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Page Title (non-translated) */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm min-h-[calc(100vh-12rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;