import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import { useOpeningHours } from '../../hooks/useOpeningHours';

/**
 * LocationMap component provides a full-screen map experience.
 * Features a custom-styled Google Maps embed and a premium details overlay.
 * Blends the map into the dark luxury theme using CSS filters and overlays.
 */
export const LocationMap: React.FC = () => {
  const { scheduleText } = useOpeningHours();
  
  // Official Google Maps URL for the location
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=50.452273,30.517453";
  
  // Google Maps Embed URL (darkened via CSS filter on container)
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.641648052562!2d30.515264315731!3d50.452273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI3JzA4LjIiTiAzMMKwMzAnNTQuOSJF!5e0!3m2!1sen!2sua!4v1620000000000!5m2!1sen!2sua";

  return (
    <section id="location" className="relative w-full bg-luxury-dark py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-ritual uppercase text-luxury-gold">
            Location
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mt-2">
            Find the <span className="text-luxury-gold italic">Window</span>
          </h2>
        </div>

        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          {/* Map Container with Dark Luxury Filters */}
          <div className="absolute inset-0 z-0 grayscale contrast-[1.1] brightness-[0.7] opacity-60 transition-all duration-700 hover:brightness-[0.8] hover:opacity-80">
            <iframe
              title="Kaffa Window Location"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Dark Mask Overlay for seamless blending */}
          <div className="absolute inset-0 z-10 bg-linear-to-t from-luxury-dark/90 via-transparent to-luxury-dark/40 pointer-events-none" />

          {/* Premium Details Panel Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96 z-20 bg-luxury-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold">
                  <MapPin className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-display text-xl text-white font-light">The Extraction Window</h4>
                  <p className="font-sans text-sm text-luxury-clay mt-1">Sofiivska St, 23, Kyiv, 01001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 text-white/60">
                  <Clock className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40">Dispatch Hours</h4>
                  <p className="font-sans text-sm text-white/80 mt-1">{scheduleText}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center space-x-2 w-full bg-luxury-gold text-luxury-dark font-medium py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-luxury-gold/5"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
