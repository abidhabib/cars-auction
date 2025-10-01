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

  // Close sidebar automatically on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true); // optional: reopen on desktop
      }
    };

    handleResize(); // Run once on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCarSelectFromSearch = (car) => {
    navigate('/Dashboard/buy', { state: { selectedCar: car } });
  };

  return (
    <div className="flex h-screen bg-transparent">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md">
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
        className={`fixed top-16 h-[calc(100vh-4rem)] bg-transparent z-40 overflow-y-auto transition-all duration-300 ease-in-out`}
        style={{
          width: sidebarOpen ? '15rem' : '5rem',
          left: 3,
        }}
      >
        <SellerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 pt-16 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: sidebarOpen ? '16rem' : '5rem',
        }}
      >
        {/* Apply padding to all child components */}
        <div className="sm:p-16 p-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
