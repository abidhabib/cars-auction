// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  const translations = {
    de: {
      title: "Europa's größte Großhandelsplattform für Gebrauchtwagen",
      buyCars: "Autos kaufen",
      sellCars: "Autos verkaufen",
      carsAddedDaily: "3.000+ Autos täglich hinzugefügt",
      carsInStock: "30.000+ Autos auf Lager",
      directBuy: "Direktkauf",
      generalAuction: "Allgemeine Auktion",
      privateSale: "Privatverkauf",
      daysLeft: "Tage übrig",
      login: "Anmelden",
      register: "Registrieren",
      dashboard: "Dashboard",
      profile: "Profil",
      logout: "Abmelden",
      ourServices: "Unsere Services",
      ourApps: "Unsere Apps",
      yourAccount: "Ihr Konto",
      contactUs: "Kontaktieren Sie uns",
      ourCompany: "Unser Unternehmen",
      address: "Adresse",
      phone: "Telefon",
      email: "E-Mail"
    },
    en: {
      title: "Europe's largest wholesale platform for used cars",
      buyCars: "Buy cars",
      sellCars: "Sell cars",
      carsAddedDaily: "3,000+ cars added daily",
      carsInStock: "30,000+ cars in stock",
      directBuy: "Direct Buy",
      generalAuction: "General Auction",
      privateSale: "Private Sale",
      daysLeft: "days left",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      profile: "Profile",
      logout: "Logout",
      ourServices: "Our Services",
      ourApps: "Our Apps",
      yourAccount: "Your Account",
      contactUs: "Contact Us",
      ourCompany: "Our Company",
      address: "Address",
      phone: "Phone",
      email: "Email"
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};