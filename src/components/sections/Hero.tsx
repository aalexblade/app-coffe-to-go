import React from 'react';
import { motion, type Variants } from 'framer-motion'; 
import { ChevronDown } from 'lucide-react';
import LocationStatus from '../ui/LocationStatus';

/**
 * Hero component for the coffee-to-go window shop.
 * Features a fullscreen video background, premium typography, and Framer Motion animations.
 * Optimized for mobile and high-performance screens using Tailwind v4 syntax.
 */
export const Hero: React.FC = () => {
  // Explicitly typing variants to resolve TypeScript structure mismatch
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        // Using "as const" or direct easing array with strict Variants typing ensures TS compatibility
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-dark">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60 grayscale-20"
          poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920"
        >
          <source
            src="https://player.vimeo.com/external/494252666.hd.mp4?s=2f6199a221f7b8849646b528a3854378f1618776&profile_id=175"
            type="video/mp4"
          />
        </video>
        {/* Luxury Dark Gradient Overlay using modern Tailwind v4 bg-linear syntax */}
        <div className="absolute inset-0 bg-linear-to-b from-luxury-dark/80 via-luxury-dark/40 to-luxury-dark" />
      </div>

      {/* Floating Status and Location */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <LocationStatus />
      </div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={itemVariants}
          className="mb-4 text-sm font-medium tracking-premium uppercase text-luxury-gold/80"
        >
          Premium Coffee Experience
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-ritual tracking-tight text-white"
        >
          Elevate Your <br />
          <span className="text-luxury-gold italic">Morning Ritual</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-xl text-lg md:text-xl text-white/70 font-light leading-relaxed"
        >
          Artisanal coffee brewed to perfection, served from our window to your
          hands. Experience the gold standard of on-the-go caffeine.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12">
          <button
            onClick={() =>
              document
                .getElementById("storytelling")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-luxury-gold/30 bg-white/5 px-8 py-4 text-sm font-medium tracking-widest uppercase text-white backdrop-blur-md transition-all hover:bg-luxury-gold hover:text-luxury-dark"
          >
            <span>Explore Our Story</span>
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px bg-linear-to-b from-luxury-gold/50 to-transparent"
        />
      </div>
    </section>
  );
};
