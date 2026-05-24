import { createContext, useState, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../config/translations';
import type { Language, TranslationPath } from '../config/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: TranslationPath) => string;
}

// Private local context declaration — perfect for Vite HMR optimization
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// First valid export: The global state context wrapper component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'en' || saved === 'ua') {
        return saved as Language;
      }
    } catch (error) {
      console.warn('Failed to read language from localStorage', error);
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.warn('Failed to save language to localStorage', error);
    }
  };

  // Safe memoized functional reference lookup matching translation constraints
  const t = useCallback((path: TranslationPath): string => {
    const keys = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
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

// Second valid export: The hook for context delivery across components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};