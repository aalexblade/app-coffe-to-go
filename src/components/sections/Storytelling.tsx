import React from 'react';
import { motion, type Variants } from 'framer-motion';

/**
 * Storytelling section for the coffee-to-go window shop.
 * Showcases single-origin bean culture and window aesthetics using Tailwind v4 utilities.
 */
export const Storytelling: React.FC = () => {
  // Explicitly typing variants to ensure strict TypeScript compilation
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section id="storytelling" className="relative min-h-screen w-full bg-luxury-dark py-24 px-6 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        
        {/* Cinematic Imagery Column */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-luxury-card border border-white/5"
        >
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200"
            alt="Cinematic coffee brewing"
            className="h-full w-full object-cover opacity-80 grayscale-10 transition-transform duration-2000 hover:scale-105"
          />
          {/* Subtle gradient overlay using modern v4 bg-linear syntax */}
          <div className="absolute inset-0 bg-linear-to-t from-luxury-dark via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Typography-First Narrative Column */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center space-y-6"
        >
          <span className="text-sm font-medium tracking-ritual uppercase text-luxury-gold">
            The Bean & The Craft
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
            Single Origin. <br />
            <span className="text-luxury-gold italic">Served Through a Window.</span>
          </h2>
          
          <p className="font-sans text-base md:text-lg text-white/70 font-light leading-relaxed">
            We source our beans directly from sustainable farms in Ethiopia and El Salvador. 
            By utilizing micro-lot selections and meticulous anaerobic fermentation processing, 
            every cup delivers tasting notes that challenge expectations.
          </p>

          <p className="font-sans text-sm md:text-base text-luxury-clay font-light leading-relaxed">
            Our window conceptualizes speed without sacrificing luxury. No indoor distractions—just 
            uncompromising, artisanal coffee geometry engineered for city movement. Meet your barista, 
            take your cup, and elevate your urban journey.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10">
            <div>
              <h4 className="font-display text-xl font-medium text-luxury-gold">100%</h4>
              <p className="text-xs tracking-wider uppercase text-white/50 mt-1">Arabica Specialty</p>
            </div>
            <div>
              <h4 className="font-display text-xl font-medium text-luxury-gold">Micro</h4>
              <p className="text-xs tracking-wider uppercase text-white/50 mt-1">Lot Sourcing</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};