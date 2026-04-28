import React, { createContext, useState, useContext } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const toggleLowBandwidth = () => {
    setLowBandwidth(prev => !prev);
  };

  const toggleLargeText = () => {
    setLargeText(prev => !prev);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, lowBandwidth, toggleLowBandwidth, largeText, toggleLargeText }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}