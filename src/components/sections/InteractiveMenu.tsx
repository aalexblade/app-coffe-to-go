import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { type MenuItem, MENU_ITEMS } from '../../config/menuData';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../context/LangContext';
import type { TranslationPath } from '../../config/translations';

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

/**
 * Individual Menu Card Component - Fully Type-Safe with MenuItem interface
 */
const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { cart, addToCart, decrementQuantity } = useCart();
  const { t } = useLanguage();
  
  // Checking current item existence bounds within the layout context
  const cartItem = cart.find(i => i.id === item.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      layout
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-luxury-card border border-white/5 rounded-sm hover:border-luxury-gold/30 transition-colors duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="aspect-4/3 overflow-hidden relative">
          <img 
            src={item.image} 
            alt={t(`menuItems.${item.id}.name` as TranslationPath)}
            className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-luxury-card via-transparent to-transparent opacity-60" />
        </div>

        {/* Content Details Layer */}
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-xl text-white group-hover:text-luxury-gold transition-colors duration-300">
              {t(`menuItems.${item.id}.name` as TranslationPath)}
            </h3>
            <span className="text-luxury-gold font-medium whitespace-nowrap ml-4">
              {item.price.toFixed(2)} {t("common.uah")}
            </span>
          </div>
          
          <p className="text-sm text-luxury-clay leading-relaxed mb-6 line-clamp-2">
            {t(`menuItems.${item.id}.description` as TranslationPath)}
          </p>
        </div>
      </div>

      {/* Dynamic Interaction Button Footer Area - Optimized with 'grow' */}
      <div className="p-8 pt-4 grow flex flex-col justify-end">
        <AnimatePresence mode="wait">
          {currentQuantity > 0 ? (
            /* Active Luxury In-Cart Counter Control Bar */
            <motion.div
              key="in-cart-controls"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between border border-luxury-gold bg-luxury-gold/5 px-4 py-2.5 rounded-full text-white shadow-[0_0_15px_rgba(197,168,128,0.1)]"
            >
              <button
                onClick={() => decrementQuantity(item.id)}
                className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer p-1"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              
              <span className="font-sans text-xs font-bold tracking-widest text-luxury-gold uppercase select-none">
                In Order: {currentQuantity}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer p-1"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </motion.div>
          ) : (
            /* Default Premium Call To Action Trigger Button */
            <motion.button
              key="add-to-cart-trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => addToCart(item)}
              className="flex items-center justify-between w-full text-xs font-bold tracking-ritual uppercase text-white group/btn border border-white/5 hover:border-luxury-gold/50 rounded-full px-5 py-3 transition-colors duration-300 cursor-pointer"
            >
              <span className="relative">
                {t("menu.addToOrder")}
              </span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/10 group-hover/btn:border-luxury-gold group-hover/btn:bg-luxury-gold group-hover/btn:text-luxury-dark transition-all duration-300">
                <Plus size={12} />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};