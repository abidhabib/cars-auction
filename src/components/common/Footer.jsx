// src/components/common/Footer.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

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
    { icon: <FaFacebookF className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <FaInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  ];

  const appLinks = [
    { icon: <FaApple className="w-5 h-5" />, store: "App Store", href: "#" },
    { icon: <FaGooglePlay className="w-5 h-5" />, store: "Google Play", href: "#" },
  ];

  return (
    <footer className="bg-[#3b396d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top CTA Section */}
        <div className="bg-white/5 rounded-2xl p-8 mb-16 backdrop-blur-sm ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t("footer.cta.title")}</h3>
              <p className="text-white/90">{t("footer.cta.subtitle")}</p>
            </div>
            <button className="px-6 py-3 bg-white text-[#3b396d] font-semibold rounded-full hover:bg-gray-100 transition-colors">
              {t("footer.cta.button")}
            </button>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6">{t("footer.company.name")}</h4>
            <p className="text-white/80 mb-6 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t("footer.services.title")}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t("footer.account.title")}</h4>
            <ul className="space-y-3">
              {footerLinks.account.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t("footer.support.title")}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App Download and Language Selector */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h5 className="text-lg font-medium mb-4">{t("footer.downloadApp")}</h5>
              <div className="flex flex-wrap gap-3">
                {appLinks.map((app, index) => (
                  <a 
                    key={index}
                    href={app.href}
                    className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {app.icon}
                    <span className="ml-2 text-sm">{app.store}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-lg font-medium mb-4">{t("footer.language")}</h5>
              <div className="flex space-x-2">
                {['en', 'de', 'nl'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      language === lang 
                        ? 'bg-white text-[#3b396d]' 
                        : 'bg-white/10 text-white hover:bg-white/20'
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
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img src="/logoLight.svg" alt="Car Network Europe" className="w-32 mr-3" />
            </div>
            <p className="text-white/70 text-sm">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;