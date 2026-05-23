import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import {
  ShoppingBag,
  Trash2,
  Clock,
  User,
  Phone,
  CheckCircle,
  Minus,
  Plus,
} from "lucide-react";

/**
 * OnlineOrder component handles the shopping cart display, quantity management,
 * and secure production dispatch directly to the Telegram Bot API ecosystem.
 * Features a 24h custom time input mask and targeted country phone masking.
 */
export const OnlineOrder: React.FC = () => {
  const {
    cart,
    addToCart,
    decrementQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  // Controlled form input states with predefined international baseline code
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  const [pickupTime, setPickupTime] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Enforces strict Ukrainian mobile formatting (+380 followed by exactly 9 digits)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+380")) {
      setPhone("+380");
    } else {
      const numericPayload = value.slice(4).replace(/\D/g, "");
      setPhone(`+380${numericPayload.slice(0, 9)}`);
    }
  };

  // Smart 24-hour time mask that allows manual typing and prevents AM/PM rendering
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only pure digits from input string
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length >= 2) {
      const hours = parseInt(value.slice(0, 2), 10);
      // Restrict hours strictly between 00 and 23
      const validHours = Math.min(hours, 23).toString().padStart(2, "0");
      
      if (value.length > 2) {
        const minutes = parseInt(value.slice(2), 10);
        // Restrict minutes strictly between 00 and 59
        const validMinutes = Math.min(minutes, 59).toString().padStart(2, "0");
        setPickupTime(`${validHours}:${validMinutes}`);
        return;
      }
      setPickupTime(`${validHours}:`);
      return;
    }
    setPickupTime(value);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict multi-layer validation checkpoint (Time must be fully formed, e.g., HH:MM -> 5 chars)
    if (!name || phone.length < 13 || pickupTime.length < 5 || cart.length === 0) {
      alert("Please provide a valid name, complete phone number, and a targeted pickup time (HH:MM).");
      return;
    }

    setIsSubmitting(true);

    const itemsList = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} = ${item.price * item.quantity} UAH`,
      )
      .join("\n");

    const formattedTime = `${pickupTime} (Kyiv Time, 24h)`;

    const message =
      `<b>🔔 NEW WINDOW ORDER</b>\n\n` +
      `<b>Customer Details:</b>\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n\n` +
      `<b>Pickup Time:</b> ${formattedTime}\n\n` +
      `<b>Items:</b>\n${itemsList}\n\n` +
      `<b>Total Cost: ${totalPrice} UAH</b>`;

    try {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || "Failed to transmit message sequence.");
      }

      setIsOrdered(true);
      clearCart();
      setName("");
      setPhone("+380");
      setPickupTime("");
    } catch (error) {
      console.error("Checkout dispatch interruption:", error);
      alert(
        "There was an error processing your order. Please try again or visit us at the window.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="order"
      className="relative min-h-screen w-full bg-luxury-dark py-24 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
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
            className="mx-auto max-w-md bg-luxury-card border border-luxury-gold/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-5"
          >
            <CheckCircle className="h-16 w-16 text-luxury-gold stroke-1" />
            <h3 className="font-display text-2xl text-white">
              Order Confirmed
            </h3>
            <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
              Thank you. Your espresso extraction has been successfully scheduled. 
              Please present your name at the window upon arrival.
            </p>

            <button
              onClick={() => setIsOrdered(false)}
              className="mt-4 px-6 py-2.5 bg-transparent border border-luxury-gold/30 text-luxury-gold hover:text-luxury-dark hover:bg-luxury-gold text-xs font-medium tracking-widest uppercase rounded-lg transition-all duration-300 cursor-pointer"
            >
              Return to Menu
            </button>
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
            <p className="font-display text-xl text-white/60 italic">
              Your premium cup is currently empty.
            </p>
            <p className="font-sans text-xs text-luxury-clay max-w-xs uppercase tracking-widest">
              Explore the menu above to select your single-origin extraction.
            </p>
          </motion.div>
        ) : (
          /* Checkout Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items List Container (Left Side) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 mb-6">
                Selected Items ({totalItems})
              </h3>
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
                    <div className="space-y-1.5">
                      <h4 className="font-display text-lg text-white font-light">
                        {item.name}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-luxury-dark/50 border border-white/10 rounded-lg overflow-hidden">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="p-1.5 text-white/40 hover:text-luxury-gold hover:bg-white/5 transition-all duration-200 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-sans text-xs text-white/80 px-2 min-w-[1.2rem] text-center border-x border-white/5">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1.5 text-white/40 hover:text-luxury-gold hover:bg-white/5 transition-all duration-200 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-sans text-xs text-luxury-clay tracking-wider uppercase">
                          × {item.price} UAH
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="font-sans text-base text-luxury-gold font-light">
                        {item.price * item.quantity} UAH
                      </span>
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
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40">
                Window Dispatch
              </h3>

              {/* Secure Customer Checkout Form Input Controls */}
              <form onSubmit={handleCheckout} className="space-y-4">
                {/* Name Input */}
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

                {/* Phone Input */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input
                    type="tel"
                    required
                    placeholder="+380 DD MMM MM MM"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold transition-colors duration-200 font-mono tracking-wider"
                  />
                </div>

                {/* Pickup Time Input (Strict 24h Text Mask - Direct Manual Input Allowed) */}
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="HH:MM (e.g., 14:30)"
                    value={pickupTime}
                    onChange={handleTimeChange}
                    maxLength={5}
                    className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold transition-colors duration-200 font-mono tracking-wider"
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
                    <span className="text-luxury-gold uppercase text-xs font-medium tracking-wider">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between text-base text-white font-light pt-3 border-t border-white/5">
                    <span>Total Ritual Cost</span>
                    <span className="text-xl text-luxury-gold font-medium">
                      {totalPrice} UAH
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-luxury-gold text-luxury-dark font-medium py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-luxury-gold/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Secure Window Order"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};