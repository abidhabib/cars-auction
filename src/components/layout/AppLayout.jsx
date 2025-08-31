import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const AppLayout = ({ children, hideHeader = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main >

        {children}
                      <Footer/>

      </main>
    </div>
  );
};

export default AppLayout;
