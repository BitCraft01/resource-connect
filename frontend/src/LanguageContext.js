import React, { createContext, useState, useContext } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [lowBandwidth, setLowBandwidth] = useState(false);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const toggleLowBandwidth = () => {
    setLowBandwidth(prev => !prev);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, lowBandwidth, toggleLowBandwidth }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}