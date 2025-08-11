'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

type Language = 'en' | 'es' | 'fr' | 'zh';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 p-2 bg-ink/10 backdrop-blur-sm rounded-full border border-ink/20">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code as Language)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
            ${language === lang.code
              ? 'bg-accent text-primary shadow-lg shadow-accent/30'
              : 'bg-transparent text-gray hover:text-ink hover:bg-ink/10'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">{lang.flag}</span>
          <span>{lang.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSelector;
