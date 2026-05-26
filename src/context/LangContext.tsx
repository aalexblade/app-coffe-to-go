import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../config/translations';
import type { Language, TranslationPath } from '../config/translations';
import { LanguageContext } from './LanguageContext';

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * LanguageProvider manages the application's localization state.
 * It is the single valid export of this file to satisfy Fast Refresh constraints.
 */
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'en' || saved === 'ua') {
        return saved as Language;
      }
    } catch {
      // Wildcard catch for safe localStorage access
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch {
      // Wildcard catch for safe localStorage persistence
    }
  };

  // Safe memoized functional reference lookup matching translation constraints
  const t = useCallback((path: TranslationPath): string => {
    const keys = path.split('.');
    let current: Record<string, unknown> | string = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, key)) {
        current = (current as Record<string, unknown>)[key] as Record<string, unknown> | string;
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }

    if (typeof current === 'string') {
      return current;
    }

    console.warn(`Translation key does not resolve to a string: ${path}`);
    return path;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
