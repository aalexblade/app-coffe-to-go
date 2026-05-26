import React from 'react';
import { MapPin } from 'lucide-react';
import { useOpeningHours } from '../../hooks/useOpeningHours';
import { useLanguage } from '../../hooks/useLanguage';

/**
 * LocationStatus component displays the physical address and the live shop status.
 * Adheres to the dark luxury aesthetic with emerald tones for active status.
 */
const LocationStatus: React.FC = () => {
  const { isOpen } = useOpeningHours();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      {/* Location Section */}
      <div className="flex items-center space-x-2.5 group">
        <div className="p-2 rounded-full bg-white/5 border border-white/10 text-luxury-gold group-hover:scale-110 transition-transform duration-500">
          <MapPin className="h-4 w-4 stroke-[1.5]" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-widest text-luxury-clay font-medium">
            {t("common.location")}
          </span>
          <span className="font-display text-sm text-white/90 font-light">
            {t("location.address").split(',').slice(0, 2).join(',')}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
        isOpen 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]' 
          : 'bg-white/5 border-white/10 text-luxury-clay'
      }`}>
        <span className={`relative flex h-2 w-2`}>
          {isOpen && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            isOpen ? 'bg-emerald-500' : 'bg-luxury-clay/40'
          }`}></span>
        </span>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-wider">
          {isOpen ? t("common.statusOpen") : t("common.statusClosed")}
        </span>
      </div>
    </div>
  );
};

export default LocationStatus;
