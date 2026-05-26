import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

/**
 * Dedicated type-safe entry hook for consuming the LanguageContext.
 * Isolated into its own file to comply with React Fast Refresh boundary rules.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
