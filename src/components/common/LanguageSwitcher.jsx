// src/components/common/LanguageSwitcher.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, supportedLanguages, getLanguageName } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="relative">
      <select 
        value={language}
        onChange={handleLanguageChange}
        className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {supportedLanguages.map(lang => (
          <option key={lang} value={lang}>
            {getLanguageName(lang)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/60">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;