// src/components/common/SplashScreen.jsx
import React, { useEffect } from "react";

const SplashScreen = ({ onSplashComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* Background Image with blur & overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')", // Replace with your car auction image
        }}
      ></div>
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-colors duration-500"></div>

      {/* Content */}
      <div className="relative text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Car Network EU
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-200 dark:text-gray-300 opacity-90">
          Europa's groothandelsplatform voor tweedehands auto's
        </p>

        {/* Loader */}
        <div className="flex justify-center mt-10">
          <div className="w-16 h-16 border-4 border-white/70 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
