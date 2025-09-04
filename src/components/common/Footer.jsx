// src/components/common/Footer.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaApple, FaGooglePlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Import the updated Button component if you want to use it for the main CTA
// import Button from '../common/Button';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const footerLinks = {
    services: [
      { name: t("footer.services.buyCars"), href: "/buy" },
      { name: t("footer.services.sellCars"), href: "/sell" },
      { name: t("footer.services.auctions"), href: "/auctions" },
      { name: t("footer.services.directBuy"), href: "/direct-buy" },
    ],
    account: [
      { name: t("footer.account.login"), href: "/login" },
      { name: t("footer.account.register"), href: "/register" },
      { name: t("footer.account.dashboard"), href: "/dashboard" },
      { name: t("footer.account.profile"), href: "/profile" },
    ],
    company: [
      { name: t("footer.company.about"), href: "/about" },
      { name: t("footer.company.contact"), href: "/contact" },
      { name: t("footer.company.careers"), href: "/careers" },
      { name: t("footer.company.press"), href: "/press" },
    ],
    support: [
      { name: t("footer.support.help"), href: "/help" },
      { name: t("footer.support.faq"), href: "/contact" },
      { name: t("footer.support.privacy"), href: "/privacy" },
      { name: t("footer.support.terms"), href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF className="w-4 h-4" />, href: "#", label: "Facebook" },
    { icon: <FaInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter className="w-4 h-4" />, href: "#", label: "Twitter" },
  ];

  const appLinks = [
    { icon: <FaApple className="w-4 h-4" />, store: "App Store", href: "#" },
    { icon: <FaGooglePlay className="w-4 h-4" />, store: "Google Play", href: "#" },
  ];

  // Handle navigation for footer links
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    // 1. Changed to light background. Font-sans for Outfit.
    <footer className="bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top CTA Section - Light mode styling */}
        <div className="bg-white rounded-xl p-6 mb-12 shadow-sm border border-gray-200"> {/* White background, subtle shadow/border */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900"> {/* Explicit dark text */}
                {t("footer.cta.title")}
              </h3>
              <p className="text-gray-700 text-sm"> {/* Softer text color */}
                {t("footer.cta.subtitle")}
              </p>
            </div>
            {/* CTA Button: Keep brand color for visual impact on light background */}
            <button
              onClick={() => handleNavigation("/register")}
              className="px-5 py-2.5 bg-logo-dark-blue text-white font-medium rounded-lg hover:bg-[#2a285a] transition-colors text-sm shadow-sm" // Added shadow-sm for subtle depth
            >
              {t("footer.cta.button")}
            </button>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <div className="lg:col-span-2">
            <h4 className="text-base font-semibold mb-5 text-gray-900"> {/* Explicit dark text */}
              {t("footer.company.name")}
            </h4>
            <p className="text-gray-600 mb-5 text-sm max-w-md"> {/* Softer text color */}
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" // Light background
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-5 text-gray-900">
              {t("footer.services.title")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-600 hover:text-logo-dark-blue hover:underline transition-colors text-left text-sm w-full" // Softer text, brand color/link on hover
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-5 text-gray-900">
              {t("footer.account.title")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.account.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-600 hover:text-logo-dark-blue hover:underline transition-colors text-left text-sm w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-5 text-gray-900">
              {t("footer.support.title")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-600 hover:text-logo-dark-blue hover:underline transition-colors text-left text-sm w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App Download and Language Selector */}
        <div className="border-t border-gray-200 pt-7 mb-7"> {/* Light border */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <h5 className="text-base font-medium mb-3 text-gray-900"> {/* Explicit dark text */}
                {t("footer.downloadApp")}
              </h5>
              <div className="flex flex-wrap gap-2">
                {appLinks.map((app, index) => (
                  <a
                    key={index}
                    href={app.href}
                    className="flex items-center px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm" // Light background
                  >
                    {app.icon}
                    <span className="ml-2 text-gray-700">{app.store}</span> {/* Softer text color for store name */}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-base font-medium mb-3 text-gray-900">
                {t("footer.language")}
              </h5>
              <div className="flex space-x-2">
                {['en', 'de', 'nl'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      language === lang
                        ? 'bg-logo-dark-blue text-white' // Brand color for active
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Light background for inactive
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-200 pt-7"> {/* Light border */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              {/* 1. Logo Usage: Logo Dark Blue (#3B396D) on light background is correct */}
              {/* Assuming logo.svg is the dark blue version. If it's white, use logoLight.svg and it will be dark on light. */}
              <img src="/logo.svg" alt="Car Network Europe" className="w-28 mr-3" /> {/* Slightly smaller logo */}
            </div>
            <p className="text-gray-500 text-xs"> {/* Softer text color */}
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex space-x-5">
              <button
                onClick={() => handleNavigation("/privacy")}
                className="text-gray-500 hover:text-logo-dark-blue hover:underline text-xs transition-colors" // Softer text, brand color/link on hover
              >
                {t("footer.privacy")}
              </button>
              <button
                onClick={() => handleNavigation("/terms")}
                className="text-gray-500 hover:text-logo-dark-blue hover:underline text-xs transition-colors"
              >
                {t("footer.terms")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;