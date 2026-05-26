import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { type MenuItem } from '../../config/menuData';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../context/LangContext';
import type { TranslationPath } from '../../config/translations';

/**
 * Individual Menu Card Component - Fully Type-Safe with MenuItem interface
 */
export const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
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
