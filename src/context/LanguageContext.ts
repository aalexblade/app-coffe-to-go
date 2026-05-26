import { createContext } from 'react';
import type { Language, TranslationPath } from '../config/translations';

/**
 * Type definition for the reactive language context parameters.
 */
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: TranslationPath) => string;
}

/**
 * Core LanguageContext instance used for synchronization across the application.
 * Isolated into its own file to maintain Fast Refresh boundaries.
 */
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
