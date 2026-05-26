import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

/**
 * Result object for the useOpeningHours hook.
 * Fully localized for independent UI consumption.
 */
interface OpeningHoursStatus {
  isOpen: boolean;
  statusText: string;
  scheduleText: string;
}

/**
 * Custom hook to check the live shop status based on daily hours (08:00 - 20:00).
 * Recalculates on mount and every minute to ensure UI reflects current status.
 * Subscribes to LangContext for real-time translation synchronization.
 */
export const useOpeningHours = (): OpeningHoursStatus => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // Open daily from 08:00 to 20:00
      const open = hours >= 8 && hours < 20;
      setIsOpen(open);
    };

    // Initial check on mount
    checkStatus();

    // Re-verify status every 60 seconds to handle day/hour transitions
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  // Localized status text lookup
  const statusText = isOpen 
    ? t("common.statusOpen") 
    : t("common.statusClosed");

  // Localized schedule text lookup from central coordinates dictionary
  const scheduleText = t("location.hoursValue");

  return {
    isOpen,
    statusText,
    scheduleText,
  };
};
