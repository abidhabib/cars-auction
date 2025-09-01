// src/components/layout/AppLayout.jsx
import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const AppLayout = ({ children, hideHeader = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className={`flex-1 ${!hideHeader ? 'pt-16' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;