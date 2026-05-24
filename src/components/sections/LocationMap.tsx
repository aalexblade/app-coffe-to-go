import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LangContext";
import { MapPin, Clock, Phone } from "lucide-react";
import LocationStatus from "../ui/LocationStatus";
import type { TranslationPath } from "../../config/translations";

/**
 * LocationMap component displays the premium dark physical store location maps.
 * Fully synchronized with the corporate address at Mazepy Ave, Vyshhorod.
 */
export const LocationMap: React.FC = () => {
  const { t } = useLanguage();

  // Valid, active Google Maps Embed URL for Mazepy Ave, Vyshhorod
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2532.7478647565576!2d30.4828114!3d50.5853241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d3a017fe4bbf%3A0x6a2ebba25a74e503!2z0L/RgNC-0YHQvy4g0JzQsNC30LXQv9C90Cwg0JLRi9GI0LPQvtGA0L7QtCwg0JrQuNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMDczMDA!5e0!3m2!1suk!2sua!4v1716654823912!5m2!1suk!2sua";

  return (
    <section
      id="location"
      className="relative w-full bg-luxury-dark py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informational Details Left Block */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-sm font-medium tracking-ritual uppercase text-luxury-gold">
                {t("location.badge")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                {t("location.titlePart1")}{" "}
                <span className="text-luxury-gold italic">{t("location.titlePart2")}</span>
              </h2>
            </div>

            <p className="font-sans text-base text-white/70 font-light leading-relaxed">
              {t("location.description" as TranslationPath)}
            </p>

            <div className="space-y-6 pt-4">
              {/* Dynamic Location Status Identifier */}
              <LocationStatus />

              {/* Physical Address Notation */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-luxury-card border border-white/10 rounded-xl mt-0.5">
                  <MapPin className="h-5 w-5 text-luxury-gold stroke-1" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 mb-1">
                    {t("location.addressTitle" as TranslationPath)}
                  </h4>
                  <p className="font-sans text-base text-white font-light">
                    {t("location.addressValue" as TranslationPath)}
                  </p>
                </div>
              </div>

              {/* Structural Schedule Notation */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-luxury-card border border-white/10 rounded-xl mt-0.5">
                  <Clock className="h-5 w-5 text-luxury-gold stroke-1" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 mb-1">
                    {t("location.hoursTitle" as TranslationPath)}
                  </h4>
                  <p className="font-sans text-base text-white font-light">
                    {t("location.hoursValue" as TranslationPath)}
                  </p>
                </div>
              </div>

              {/* Direct Window Hotlines */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-luxury-card border border-white/10 rounded-xl mt-0.5">
                  <Phone className="h-5 w-5 text-luxury-gold stroke-1" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 mb-1">
                    {t("location.phoneTitle" as TranslationPath)}
                  </h4>
                  <p className="font-sans text-base text-white font-light">
                    +380 (93) 123-45-67
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optimized Premium Map Frame Box Right Block using Tailwind v4 arbitrary math tokens */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full h-112.5 md:h-137.5 bg-luxury-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative group hover:border-white/10 transition-colors duration-300"
          >
            {/* Embedded maps iframe container block */}
            <iframe
              title="Vyshhorod Mazepy Premium Coffee Location"
              src={embedUrl}
              className="w-full h-full border-0 invert-[0.9] hue-rotate-180 contrast-[1.2] grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Ambient luxury design inner shadow layout guard */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] rounded-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};