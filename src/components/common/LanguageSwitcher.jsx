// src/components/common/LanguageSwitcher.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select 
      value={language}
      onChange={handleLanguageChange}
      className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="nl">NL</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LanguageSwitcher;