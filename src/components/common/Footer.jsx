// src/components/common/Footer.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

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
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center shadow">
                <span className="text-white font-bold text-base">CN</span>
              </div>
              <span className="ml-3 text-2xl font-semibold text-gray-900">
                CarNetwork
              </span>
            </div>

            <div className="space-y-4 max-w-md text-gray-600 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  CarNetwork.com GmbH
                </p>
                <p>Bergmannstrasse 72</p>
                <p>10961 Amsterdam, Netherlands</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">Contact</p>
                <p>
                  DE:{" "}
                  <a
                    href="tel:+493083799333"
                    className="hover:text-blue-600 transition"
                  >
                    +49 30 837 99 333
                  </a>
                </p>
                <p>
                  AT:{" "}
                  <a
                    href="tel:+4314350253"
                    className="hover:text-blue-600 transition"
                  >
                    +43 14 35 0253
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:info@carnetwork.com"
                    className="hover:text-blue-600 transition"
                  >
                    info@carnetwork.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Account
            </h3>
            <ul className="space-y-3">
              {footerLinks.account.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* App badges */}
            <div className="flex space-x-3 mb-6 lg:mb-0">
              <a href="#" target="_blank" rel="noreferrer" className="inline-block">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-9"
                />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="inline-block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-9"
                />
              </a>
            </div>

            {/* Social + Legal */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
              {/* Social icons */}
              <div className="flex space-x-5 mb-4 sm:mb-0 text-gray-500">
                <a href="#" className="hover:text-blue-600 transition">
                  <FaFacebookF size={18} />
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="hover:text-sky-500 transition">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="hover:text-blue-700 transition">
                  <FaLinkedinIn size={18} />
                </a>
              </div>

              {/* Legal */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <p className="text-xs text-gray-500">
                  &copy; 2025  CarNetwork. All rights reserved.
                </p>
                <div className="flex space-x-4 text-xs mt-2 sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-gray-900 transition">
                    Terms
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 transition">
                    Privacy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
