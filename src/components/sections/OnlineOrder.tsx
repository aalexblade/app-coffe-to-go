import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { useLanguage } from "../../context/LangContext";
import type { TranslationPath } from "../../config/translations";

import {
  ShoppingBag,
  Trash2,
  Clock,
  User,
  Phone,
  CheckCircle,
  Minus,
  Plus,
  Zap,
} from "lucide-react";

/**
 * OnlineOrder component handles the shopping cart and dispatch.
 * Optimized with a high-end Luxury Time Picker for pickup scheduling.
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

  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  const [pickupTime, setPickupTime] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate dynamic time slots for business hours (08:00 - 20:00)
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    let startHour = 8;
    let startMinute = 0;

    // Check if within business hours (08:00 - 20:00)
    const isWithinHours = currentHour >= 8 && currentHour < 20;

    if (isWithinHours) {
      // Round to next 15-minute interval
      startMinute = Math.ceil(currentMinutes / 15) * 15;
      startHour = currentHour;
      
      if (startMinute >= 60) {
        startHour += 1;
        startMinute = 0;
      }
      
      // If rounding pushed us to/past closing time, fallback to next day (full sequence)
      if (startHour >= 20) {
        startHour = 8;
        startMinute = 0;
      }
    }

    const iter = new Date();
    iter.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(20, 0, 0, 0);

    while (iter <= end) {
      slots.push(
        iter.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      iter.setMinutes(iter.getMinutes() + 15);
    }

    return slots;
  }, []);

  // Quick action helper for relative time offsets
  const setRelativeTime = (offsetMinutes: number) => {
    const now = new Date();
    // Rounding logic for relative times to ensure they land on sensible boundaries
    const target = new Date(now.getTime() + offsetMinutes * 60000);
    
    let hours = target.getHours();
    let minutes = target.getMinutes();

    // Clamp to business hours
    if (hours < 8) {
      hours = 8;
      minutes = 0;
    } else if (hours >= 20) {
      hours = 20;
      minutes = 0;
    }

    const formatted = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    setPickupTime(formatted);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+380")) {
      setPhone("+380");
    } else {
      const numericPayload = value.slice(4).replace(/\D/g, "");
      setPhone(`+380${numericPayload.slice(0, 9)}`);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 13 || !pickupTime || cart.length === 0) {
      alert("Please provide a valid name, complete phone number, and targeted pickup time.");
      return;
    }

    setIsSubmitting(true);
    
    const itemsList = cart
      .map(item => {
        const localizedName = t(`menuItems.${item.id}.name` as TranslationPath);
        return `• ${localizedName} x${item.quantity}`;
      })
      .join("\n");

    const formattedTime = `${pickupTime} (Kyiv Time, 24h)`;
    const message = `🔔 NEW ORDER\nName: ${name}\nPhone: ${phone}\nTime: ${formattedTime}\nItems:\n${itemsList}\nTotal: ${totalPrice} ${t("common.uah")}`;

    try {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
      });

      if (!response.ok) throw new Error("Dispatch failure.");

      setIsOrdered(true);
      clearCart();
      setName("");
      setPhone("+380");
      setPickupTime("");
    } catch (error) {
      console.error(error);
      alert("Error processing order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="order"
      className="relative w-full bg-luxury-dark py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-ritual uppercase text-luxury-gold">
            {t("order.badge")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mt-2">
            {t("order.titlePart1")}{" "}
            <span className="text-luxury-gold italic">{t("order.titlePart2")}</span>
          </h2>
        </div>

        {isOrdered ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md bg-luxury-card border border-luxury-gold/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-5"
          >
            <CheckCircle className="h-16 w-16 text-luxury-gold stroke-1" />
            <h3 className="font-display text-2xl text-white">{t("order.orderConfirmed")}</h3>
            <p className="font-sans text-sm text-white/70 font-light leading-relaxed">{t("order.successDescription")}</p>
            <button
              onClick={() => setIsOrdered(false)}
              className="mt-4 px-6 py-2.5 bg-transparent border border-luxury-gold/30 text-luxury-gold hover:text-luxury-dark hover:bg-luxury-gold text-xs font-medium tracking-widest uppercase rounded-lg transition-all duration-300"
            >
              {t("order.returnToMenu")}
            </button>
          </motion.div>
        ) : cart.length === 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center py-20 space-y-4 bg-luxury-card/30 rounded-2xl border border-white/5"
          >
            <ShoppingBag className="h-12 w-12 text-luxury-clay opacity-40 stroke-1" />
            <p className="font-display text-xl text-white/60 italic">{t("order.emptyCart")}</p>
            <p className="font-sans text-xs text-luxury-clay max-w-xs uppercase tracking-widest">{t("order.emptyCartSub")}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 mb-6">
                {t("order.selectedItems")} ({totalItems})
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
                        {t(`menuItems.${item.id}.name` as TranslationPath)}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-luxury-dark/50 border border-white/10 rounded-lg overflow-hidden">
                          <button onClick={() => decrementQuantity(item.id)} className="p-1.5 text-white/40 hover:text-luxury-gold hover:bg-white/5"><Minus size={12} /></button>
                          <span className="font-sans text-xs text-white/80 px-2 min-w-[1.2rem] text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="p-1.5 text-white/40 hover:text-luxury-gold hover:bg-white/5"><Plus size={12} /></button>
                        </div>
                        <p className="font-sans text-xs text-luxury-clay tracking-wider uppercase">× {item.price} {t("common.uah")}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="font-sans text-base text-luxury-gold font-light">{item.price * item.quantity} {t("common.uah")}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-red-400"><Trash2 size={16} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5 bg-luxury-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-8">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40">{t("order.windowDispatch")}</h3>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input type="text" required placeholder={t("order.inputName")} value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold" />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-luxury-clay" />
                  <input type="tel" required placeholder={t("order.inputPhone")} value={phone} onChange={handlePhoneChange} className="w-full bg-luxury-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold font-mono" />
                </div>

                {/* Luxury Time Picker UX Component */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-luxury-gold" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      {t("order.inputTime")}
                    </span>
                  </div>
                  
                  {/* Quick Selection Action Badges */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRelativeTime(15)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-luxury-dark/40 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-tighter text-white/80 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all group"
                    >
                      <Zap size={12} className="text-luxury-gold group-hover:scale-110 transition-transform" />
                      ASAP (10-15 min)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRelativeTime(30)}
                      className="flex-1 py-2 px-3 bg-luxury-dark/40 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-tighter text-white/80 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all"
                    >
                      In 30 minutes
                    </button>
                  </div>

                  {/* Horizontal Scrollable Time Slots */}
                  <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none snap-x mask-fade-right">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPickupTime(slot)}
                        className={`flex-none px-4 py-2 text-xs font-mono rounded-lg transition-all snap-start ${
                          pickupTime === slot
                            ? "bg-luxury-gold text-luxury-dark border border-luxury-gold font-bold shadow-[0_0_15px_rgba(197,168,128,0.2)]"
                            : "bg-luxury-dark/50 border border-white/10 text-white/70 hover:border-luxury-gold/50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm text-white/60"><span>{t("order.subtotal")}</span><span>{totalPrice} {t("common.uah")}</span></div>
                  <div className="flex justify-between text-sm text-white/60"><span>{t("order.serviceFee")}</span><span className="text-luxury-gold uppercase text-xs font-medium">{t("order.complimentary")}</span></div>
                  <div className="flex justify-between text-base text-white pt-3 border-t border-white/5"><span>{t("order.totalCost")}</span><span className="text-xl text-luxury-gold font-medium">{totalPrice} {t("common.uah")}</span></div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-luxury-gold text-luxury-dark font-medium py-4 rounded-xl text-sm tracking-widest uppercase transition-all hover:bg-white disabled:opacity-50">{isSubmitting ? t("common.processing") : t("order.secureOrderButton")}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};