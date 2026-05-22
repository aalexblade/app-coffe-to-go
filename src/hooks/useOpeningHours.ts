import { useState, useEffect } from 'react';

/**
 * Result object for the useOpeningHours hook.
 */
interface OpeningHoursStatus {
  isOpen: boolean;
  statusText: 'Open Now' | 'Closed';
  scheduleText: string;
}

/**
 * Custom hook to check the live shop status based on daily hours (08:00 - 20:00).
 * Recalculates on mount and every minute to ensure UI reflects current status.
 */
export const useOpeningHours = (): OpeningHoursStatus => {
  const scheduleText = 'Mon - Sun: 08:00 - 20:00';
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

  return {
    isOpen,
    statusText: isOpen ? 'Open Now' : 'Closed',
    scheduleText,
  };
};
