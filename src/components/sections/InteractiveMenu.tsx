import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { type MenuItem, MENU_ITEMS } from '../../config/menuData';
import { useCart } from '../../hooks/useCart';
import { useLanguage } from '../../context/LangContext';
import type { TranslationPath } from '../../config/translations';

type Category = 'All' | 'Espresso' | 'Filter' | 'Signature' | 'Bakery';

/**
 * InteractiveMenu component.
 * Displays a filtered grid of menu items with GPU-accelerated staggered reveal.
 */
export const InteractiveMenu: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Espresso', 'Filter', 'Signature', 'Bakery'];

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const viewportConfig = {
    once: true,
    margin: "-100px",
  };

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

        {/* Category Tabs with Staggered Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
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
            </motion.button>
          ))}
        </motion.div>

        {/* Items Grid with Curated Sequential Reveal */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                variants={itemVariants}
              />
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
const MenuCard: React.FC<{ item: MenuItem; variants: Variants }> = ({ item, variants }) => {
  const { t } = useLanguage();
  const { cart, addToCart, decrementQuantity } = useCart();
  
  // Local state for "Fly-to-Cart" particles
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Extract active quantity from cart if item exists
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    if (typeof window === "undefined") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const id = Date.now();

    setParticles((prev) => [...prev, { id, x, y }]);
    action();
  };

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };
  
  return (
    <motion.div
      layout
      variants={variants}
      className="group relative bg-luxury-card border border-white/5 overflow-hidden rounded-sm hover:border-luxury-gold/30 transition-colors duration-500"
    >
      {/* Fly-to-Cart Particle Layer */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x - 8, 
              y: particle.y - 8, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{ 
              x: window.innerWidth - 64, 
              y: window.innerHeight - 64, 
              scale: 0.2, 
              opacity: 0 
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 1, 0.5, 1] 
            }}
            onAnimationComplete={() => removeParticle(particle.id)}
            className="fixed top-0 left-0 w-4 h-4 bg-luxury-gold rounded-full z-[100] pointer-events-none shadow-[0_0_15px_rgba(197,168,128,0.6)]"
          />
        ))}
      </AnimatePresence>

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

        {/* Action Button / Counter Morph Logic */}
        <AnimatePresence mode="wait">
          {quantity === 0 ? (
            <motion.button
              key="add-to-cart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={(e) => handleAction(e, () => addToCart(item))}
              className="flex items-center gap-2 text-xs font-bold tracking-ritual uppercase text-white group/btn w-full text-left"
            >
              <span className="relative">
                {t("menu.addToOrder")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold group-hover/btn:w-full transition-all duration-300" />
              </span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover/btn:border-luxury-gold group-hover/btn:bg-luxury-gold group-hover/btn:text-luxury-dark transition-all duration-300 ml-auto">
                <Plus size={14} />
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="in-cart-counter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-between border border-luxury-gold bg-luxury-gold/5 px-4 py-2.5 rounded-full text-white shadow-[0_0_15px_rgba(197,168,128,0.1)]"
            >
              <button 
                onClick={() => decrementQuantity(item.id)}
                className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer"
              >
                <Minus size={14} />
              </button>
              
              <span className="text-xs font-bold font-sans tracking-widest text-luxury-gold uppercase">
                In Order: {quantity}
              </span>

              <button 
                onClick={(e) => handleAction(e, () => addToCart(item))}
                className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
