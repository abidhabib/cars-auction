// src/pages/seller/SellerDashboard.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');



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
          // Remove tab-specific props like selectedVehicle, selectedChat
        />
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 h-[calc(100vh-4rem)] bg-transparent z-40 overflow-y-auto transition-all duration-300 ease-in-out`}
        style={{
          width: sidebarOpen ? '16rem' : '5rem',
          left: 0,
        }}
      >
        <SellerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          // Sidebar can use `useLocation()` to highlight active tab
        />
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 pt-16 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: sidebarOpen ? '16rem' : '5rem',
        }}
      >
        <div className="py-8 max-w-8xl px-16 mx-auto">
          <Outlet /> {/* 👈 This renders the active route */}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;