import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./hooks/useCart";
import { Hero } from "./components/sections/Hero";
import { Storytelling } from "./components/sections/Storytelling";
import { InteractiveMenu } from "./components/sections/InteractiveMenu";
import { OnlineOrder } from "./components/sections/OnlineOrder"; 
import { LocationMap } from "./components/sections/LocationMap";
import { LanguageSwitcher } from "./components/ui/LanguageSwitcher";

const App: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <main className="relative min-h-screen bg-luxury-dark text-white selection:bg-luxury-gold selection:text-luxury-dark">
      {/* Fixed Floating Language Selector 
        Floating seamlessly above the cinema filters and interactive sections
      */}
      <div className="fixed top-6 right-6 z-50 bg-luxury-dark/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/10">
        <LanguageSwitcher />
      </div>

      {/* Cinematic intro with video background */}
      <Hero />
      
      {/* Sourcing and concept narration */}
      <Storytelling />
      
      {/* Animated menu categories */}
      <InteractiveMenu />
      
      {/* Seamless checkout & pickup time scheduling */}
      <OnlineOrder />

      {/* Physical window coordinates and status */}
      <LocationMap />

      {/* Reactive Floating Cart Button Trigger */}
      <AnimatePresence mode="popLayout">
        {totalItems > 0 && (
          <motion.button
            key="floating-cart-trigger"
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 bg-luxury-gold text-luxury-dark font-sans text-xs font-bold px-5 py-4 rounded-full flex items-center gap-3 shadow-2xl shadow-luxury-gold/10 hover:bg-white transition-colors duration-300 transform active:scale-95"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span className="tracking-widest uppercase">
              {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;