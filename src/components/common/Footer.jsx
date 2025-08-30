// src/components/common/Footer.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { name: t("buyCars"), href: "#" },
      { name: t("sellCars"), href: "#" },
    ],
    account: [
      { name: t("login"), href: "#" },
      { name: "Sign up", href: "#" },
    ],
    company: [
      { name: "About us", href: "#" },
      { name: "Jobs", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-orange-50/40">
      {/* Abstract Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1200 800" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="abstract1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="abstract2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#4f46e5" opacity="0.1" />
            </pattern>
          </defs>
          
          {/* Abstract shapes */}
          <rect x="0" y="0" width="1200" height="800" fill="url(#circles)" />
          
          <path 
            d="M0,100 C150,200 350,0 500,100 C700,250 850,50 1200,200 L1200,800 L0,800 Z" 
            fill="url(#abstract1)" 
          />
          
          <path 
            d="M0,600 C300,500 500,700 800,600 C1000,550 1100,650 1200,600 L1200,800 L0,800 Z" 
            fill="url(#abstract2)" 
          />
          
          {/* Geometric shapes */}
          <polygon points="100,50 150,100 100,150 50,100" fill="#f59e0b" opacity="0.1" />
          <polygon points="1100,100 1150,150 1100,200 1050,150" fill="#ec4899" opacity="0.1" />
          <circle cx="600" cy="700" r="50" fill="#3b82f6" opacity="0.1" />
          <rect x="1000" y="300" width="80" height="80" transform="rotate(45 1000 300)" fill="#4f46e5" opacity="0.1" />
        </svg>
        
        {/* Floating elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: i % 4 === 0 ? '#4f46e5' : 
                                i % 4 === 1 ? '#ec4899' : 
                                i % 4 === 2 ? '#f59e0b' : '#3b82f6',
                opacity: 0.1,
                borderRadius: i % 2 === 0 ? '50%' : '10%',
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 7}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  <img src="/icon.png" alt="CarNetwork" className="h-6 w-6" />
                </span>
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">
                CarNetwork
              </span>
            </div>

            <div className="space-y-4 max-w-md text-gray-800">
              <div>
                <p className="font-semibold text-gray-900 mb-2 text-lg">
                  CarNetwork EU
                </p>
                <p className="text-gray-800">Bergmannstrasse 72</p>
                <p className="text-gray-800">10961 Amsterdam, Netherlands</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2 text-lg">Contact</p>
                <p className="text-gray-800">
                  DE:{" "}
                  <a
                    href="tel:+493083799333"
                    className="hover:text-orange-600 transition-colors font-medium"
                  >
                    +49 30 837 99 333
                  </a>
                </p>
                <p className="text-gray-800">
                  AT:{" "}
                  <a
                    href="tel:+4314350253"
                    className="hover:text-orange-600 transition-colors font-medium"
                  >
                    +43 14 35 0253
                  </a>
                </p>
                <p className="mt-2 text-gray-800">
                  <a
                    href="mailto:info@carnetwork.com"
                    className="hover:text-orange-600 transition-colors font-medium"
                  >
                    info@carnetwork.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base uppercase tracking-wider border-l-4 border-orange-500 pl-3">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-800 hover:text-orange-600 transition-colors font-medium flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base uppercase tracking-wider border-l-4 border-orange-500 pl-3">
              Account
            </h3>
            <ul className="space-y-3">
              {footerLinks.account.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-800 hover:text-orange-600 transition-colors font-medium flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base uppercase tracking-wider border-l-4 border-orange-500 pl-3">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-800 hover:text-orange-600 transition-colors font-medium flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-300 border-opacity-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* App badges */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 lg:mb-0">
              <a href="#" className="inline-flex items-center justify-center bg-gray-900 text-white rounded-xl px-5 py-3 mb-3 sm:mb-0 hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                <FaApple className="mr-2 text-xl" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="inline-flex items-center justify-center bg-gray-900 text-white rounded-xl px-5 py-3 hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                <FaGooglePlay className="mr-2 text-xl" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            {/* Social + Legal */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
              {/* Social icons */}
              <div className="flex space-x-5 mb-4 sm:mb-0">
                <a href="#" className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all">
                  <FaFacebookF size={16} />
                </a>
                <a href="#" className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-pink-600 hover:bg-pink-50 hover:shadow-lg transition-all">
                  <FaInstagram size={16} />
                </a>
                <a href="#" className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-sky-500 hover:bg-sky-50 hover:shadow-lg transition-all">
                  <FaTwitter size={16} />
                </a>
                <a href="#" className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 hover:shadow-lg transition-all">
                  <FaLinkedinIn size={16} />
                </a>
              </div>

              {/* Legal */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <p className="text-sm text-gray-800 font-medium">
                  &copy; 2025 CarNetwork. All rights reserved.
                </p>
                <div className="flex space-x-5 mt-2 sm:mt-0">
                  <a href="#" className="text-sm text-gray-800 hover:text-orange-600 transition-colors font-medium">
                    Terms
                  </a>
                  <a href="#" className="text-sm text-gray-800 hover:text-orange-600 transition-colors font-medium">
                    Privacy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 20s infinite ease-in-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;