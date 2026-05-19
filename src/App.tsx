import React from "react";
import { Hero } from "./components/sections/Hero";
import { Storytelling } from "./components/sections/Storytelling";
import { InteractiveMenu } from "./components/sections/InteractiveMenu";
import { OnlineOrder } from "./components/sections/OnlineOrder"; 
import { CartProvider } from "./context/CartProvider";

const App: React.FC = () => {
  return (
    <CartProvider>
      <main className="min-h-screen bg-luxury-dark text-white selection:bg-luxury-gold selection:text-luxury-dark">
        {/* Cinematic intro with video background */}
        <Hero />
        
        {/* Sourcing and concept narration */}
        <Storytelling />
        
        {/* Animated menu categories */}
        <InteractiveMenu />
        
        {/* Seamless checkout & pickup time scheduling */}
        <OnlineOrder />
      </main>
    </CartProvider>
  );
};

export default App;