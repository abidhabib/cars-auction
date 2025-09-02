// src/components/common/SplashScreen.jsx
import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#3b396d] flex items-center justify-center z-50">
      <div className="text-center w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-10">
          <img 
            src="/logoLight.svg" 
            alt="CarNetwork Logo" 
            className="h-16 mx-auto mb-4"
          />
        </div>


        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

       
        
      </div>
    </div>
  );
};

export default SplashScreen;