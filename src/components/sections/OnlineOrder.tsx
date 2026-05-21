import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { ShoppingBag, Trash2, Clock, User, Phone, CheckCircle } from 'lucide-react';

/**
 * OnlineOrder component handles the shopping cart display and simulated checkout.
 * Features scheduling for pickup times, critical for coffee-to-go window operations.
 */
export const OnlineOrder: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !pickupTime) return;

    // Simulate luxury API order processing
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setName('');
      setPhone('');
      setPickupTime('');
    }, 5000);
  };

  return (
    <section id="order" className="relative min-h-screen w-full bg-luxury-dark py-24 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-ritual uppercase text-luxury-gold">
            Your Order
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mt-2">
            Curate Your <span className="text-luxury-gold italic">Ritual</span>
          </h2>
        </div>

        {isOrdered ? (
          /* Success Screen Layout */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md bg-luxury-card border border-luxury-gold/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4"
          >
            <CheckCircle className="h-16 w-16 text-luxury-gold stroke-1" />
            <h3 className="font-display text-2xl text-white">Order Confirmed</h3>
            <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
              Thank you, {name}. Your espresso extraction is scheduled for <span className="text-luxury-gold font-medium">{pickupTime}</span>. 
              Please present your name at the window.
            </p>
          </motion.div>
        ) : cart.length === 0 ? (
          /* Empty Cart State Layout */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center py-20 space-y-4 bg-luxury-card/30 rounded-2xl border border-white/5"
          >
            <ShoppingBag className="h-12 w-12 text-luxury-clay opacity-40 stroke-1" />
            <p className="font-display text-xl text-white/60 italic">Your premium cup is currently empty.</p>
            <p className="font-sans text-xs text-luxury-clay max-w-xs uppercase tracking-widest">
              Explore the menu above to select your single-origin extraction.
            </p>
          </motion.div>
        ) : (
          /* Checkout Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Cart Items List Container (Left Side) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 mb-6">Selected Items ({totalItems})</h3>
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-5 bg-luxury-card border border-white/5 rounded-xl transition-all hover:border-white/10"
                  >
                    <div className="space-y-1">
                      <h4 className="font-display text-lg text-white font-light">{item.name}</h4>
                      <p className="font-sans text-xs text-luxury-clay tracking-wider uppercase">Qty: {item.quantity} × {item.price} UAH</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="font-sans text-base text-luxury-gold font-light">{item.price * item.quantity} UAH</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/40 hover:text-red-400 transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 stroke-1.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Premium Schedule & Summary Block (Right Side) */}
            <div className="lg:col-span-5 bg-luxury-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-8">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40">Window Dispatch</h3>
              
              {/* Simulated Pickup Details Input Form */}
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold transition-colors duration-200"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold transition-colors duration-200"
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold transition-colors duration-200"
                  />
                </div>

                {/* Subtotal Calculations Summary */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm text-white/60 font-light">
                    <span>Subtotal</span>
                    <span>{totalPrice} UAH</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60 font-light">
                    <span>Window Service Fee</span>
                    <span className="text-luxury-gold uppercase text-xs font-medium tracking-wider">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-base text-white font-light pt-3 border-t border-white/5">
                    <span>Total Ritual Cost</span>
                    <span className="text-xl text-luxury-gold font-medium">{totalPrice} UAH</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-luxury-gold text-luxury-dark font-medium py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-luxury-gold/5 cursor-pointer"
                >
                  Secure Window Order
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};