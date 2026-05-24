import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { type MenuItem, MENU_ITEMS } from '../../config/menuData';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../context/LangContext';
import type { TranslationPath } from '../../config/translations';

type Category = 'All' | 'Espresso' | 'Filter' | 'Signature' | 'Bakery';

/**
 * InteractiveMenu component.
 * Displays a filtered grid of menu items with standardized layout padding.
 */
export const InteractiveMenu: React.FC = () => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Espresso', 'Filter', 'Signature', 'Bakery'];

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section 
      id="menu" 
      className="bg-luxury-dark py-20 md:py-32 px-6 md:px-12 lg:px-24"
    >
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                activeCategory === category ? 'text-luxury-gold' : 'text-luxury-clay hover:text-white'
              }`}
            >
              {t(`menu.categories.${category.toLowerCase() as any}` as any)}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-luxury-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Individual Menu Card Component
 */
const MenuCard: React.FC<{ item: MenuItem; onAdd: () => void }> = ({ item, onAdd }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative bg-luxury-card border border-white/5 overflow-hidden rounded-sm hover:border-luxury-gold/30 transition-colors duration-500"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img 
          src={item.image} 
          alt="Coffee selection"
          className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-luxury-card via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl text-white group-hover:text-luxury-gold transition-colors duration-300">
            {t(`menuItems.${item.id}.name` as TranslationPath)}
          </h3>
          <span className="text-luxury-gold font-medium">
            {item.price.toFixed(2)} {t("common.uah")}
          </span>
        </div>
        
        <p className="text-sm text-luxury-clay leading-relaxed mb-8 line-clamp-2">
          {t(`menuItems.${item.id}.description` as TranslationPath)}
        </p>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 text-xs font-bold tracking-ritual uppercase text-white group/btn"
        >
          <span className="relative">
            {t("menu.addToOrder")}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold group-hover/btn:w-full transition-all duration-300" />
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover/btn:border-luxury-gold group-hover/btn:bg-luxury-gold group-hover/btn:text-luxury-dark transition-all duration-300">
            <Plus size={14} />
          </div>
        </button>
      </div>
    </motion.div>
  );
};
