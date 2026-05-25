import React from "react";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "../../context/LangContext";
import { Star, Heart, MessageCircle } from "lucide-react";
import type { TranslationPath } from "../../config/translations";

interface InstagramPost {
  id: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  text: string;
  likes: number;
  comments: number;
  isVerified: boolean;
  date: string;
}

/**
 * SocialFeed component displays Instagram reviews and layout grids.
 * Fully type-safe variants override to satisfy strict TypeScript definitions.
 */
export const SocialFeed: React.FC = () => {
  const { t } = useLanguage();

  const mockPosts: InstagramPost[] = [
    {
      id: "ig1",
      username: "alex_ritual",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      imageUrl: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=600",
      text: "The anaerobic single origin from this window completely rewrote my morning expectations. Absolute gold standard. ☕✨",
      likes: 142,
      comments: 12,
      isVerified: true,
      date: "2h ago",
    },
    {
      id: "ig2",
      username: "kate.geometry",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600",
      text: "No indoor distractions, just perfect espresso geometry. The Vyshhorod window is a true architectural masterpiece for coffee lovers.",
      likes: 98,
      comments: 4,
      isVerified: true,
      date: "5h ago",
    },
    {
      id: "ig3",
      username: "urban_vibe",
      avatarUrl: "https://images.unsplash.com/photo-1395560507299-4345222b94fa?auto=format&fit=crop&q=80&w=150",
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600",
      text: "Gold Leaf Croissant paired with Luxury Flat White. This is how every urban journey should start. Pre-filled localStorage form works like magic!",
      likes: 230,
      comments: 19,
      isVerified: false,
      date: "1d ago",
    },
  ];

  // Explicitly typing container variants to satisfy strict index signatures
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // FIX: Explicitly typing item variants using Framer Motion's type wrappers to prevent string wider extensions
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const InstagramIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/40 group-hover:text-luxury-gold transition-colors duration-300"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  return (
    <section
      id="reviews"
      className="relative w-full bg-luxury-dark py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-ritual uppercase text-luxury-gold">
            {t("common.location" as TranslationPath)} Rituals
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mt-2">
            #KAFFA_WINDOW <span className="text-luxury-gold italic">Rituals</span>
          </h2>
        </div>

        {/* Instagram Reviews Bento-Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mockPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group bg-luxury-card border border-white/5 rounded-2xl overflow-hidden hover:border-luxury-gold/30 transition-colors duration-500 flex flex-col justify-between"
            >
              {/* Card Header Section */}
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.avatarUrl}
                    alt={post.username}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                  <div className="flex items-center space-x-1.5">
                    <span className="font-sans text-sm font-semibold text-white/90">
                      {post.username}
                    </span>
                    {post.isVerified && (
                      <span className="w-3.5 h-3.5 bg-sky-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold select-none">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
                <InstagramIcon />
              </div>

              {/* Card Main Image Block with Luxury Hover State Overlay */}
              <div className="relative aspect-square w-full bg-luxury-dark overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt="Instagram feed upload"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Micro-interaction overlay on layout hover events */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-8 pointer-events-none">
                  <div className="flex items-center space-x-2 text-white">
                    <Heart size={18} className="text-luxury-gold fill-luxury-gold" />
                    <span className="font-mono text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <MessageCircle size={18} className="text-luxury-gold fill-luxury-gold" />
                    <span className="font-mono text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Card Content & Review Text Area - Optimized with 'grow' */}
              <div className="p-5 space-y-3 grow flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Golden Luxury Stars Row */}
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-luxury-gold fill-luxury-gold" />
                    ))}
                  </div>
                  <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                    <span className="text-luxury-gold font-medium mr-1.5">@{post.username}</span>
                    {post.text}
                  </p>
                </div>
                <span className="block font-sans text-[10px] uppercase tracking-widest text-luxury-clay">
                  {post.date}
                </span>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};