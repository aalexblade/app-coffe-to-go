import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../config/translations';

interface LangOption {
  code: Language;
  label: string;
}

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: LangOption[] = [
    { code: 'en', label: 'EN' },
    { code: 'ua', label: 'UA' },
  ];

  return (
    <div className="flex items-center space-x-3 font-sans text-xs font-bold tracking-widest">
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => setLanguage(lang.code)}
            className="group relative cursor-pointer outline-none text-xs bg-transparent border-none p-0"
            aria-label={`Switch to ${lang.label}`}
          >
            <span
              className={`transition-colors duration-500 ${
                language === lang.code
                  ? 'text-luxury-gold'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {lang.label}
            </span>
            
            {/* Minimalist Underline Indicator powered by Framer Motion layout animations */}
            {language === lang.code && (
              <motion.div
                layoutId="langUnderline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-luxury-gold/50"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          {/* Elegant structural layout divider */}
          {index < languages.length - 1 && (
            <span className="text-white/10 select-none">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};