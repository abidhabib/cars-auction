// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { translations } from '../translations';
import { SUPPORTED_LANGUAGES } from '../constants/languages';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [language, setLanguage] = useState('en'); // Default to English

  const changeLanguage = (newLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  const getLanguageName = (code) => {
    return translations[code]?.languageName || code.toUpperCase();
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    if (Array.isArray(value)) {
      return [...value];
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      getLanguageName
    }}>
      {children}
    </LanguageContext.Provider>
  );
};