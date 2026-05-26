import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MENU_ITEMS } from '../../config/menuData';
import { useLanguage } from '../../hooks/useLanguage';
import type { TranslationPath } from '../../config/translations';
import { MenuCard } from '../ui/MenuCard';

type Category = 'All' | 'Espresso' | 'Filter' | 'Signature' | 'Bakery';

/**
 * InteractiveMenu component displays a filtered grid of menu items.
 * Optimized with standardized section padding, scroll reveal, and strict types.
 */
export const InteractiveMenu: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Espresso', 'Filter', 'Signature', 'Bakery'];

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  // Explicitly typing variants using Framer Motion's type wrappers to prevent string wider extensions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section id="menu" className="bg-luxury-dark py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-white tracking-tight"
          >
            {t("menu.title")} <span className="text-luxury-gold italic">{t("menu.subtitle")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-luxury-clay max-w-2xl mx-auto"
          >
            {t("menu.description")}
          </motion.p>
        </div>

        {/* Category Tabs - Fully Cleaned From 'any' Castings */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => {
            // FIX: Chronologically mapping downcase paths into the TranslationPath union interface
            const categoryKey = category.toLowerCase() as Lowercase<Category>;
            const translationPath = `menu.categories.${categoryKey}` as TranslationPath;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                  activeCategory === category ? 'text-luxury-gold' : 'text-luxury-clay hover:text-white'
                }`}
              >
                {t(translationPath)}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-px bg-luxury-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Items Grid equipped with staggered scroll reveal variants */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
