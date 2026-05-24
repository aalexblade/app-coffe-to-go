import React from "react";
import { Hero } from "./components/sections/Hero";
import { Storytelling } from "./components/sections/Storytelling";
import { InteractiveMenu } from "./components/sections/InteractiveMenu";
import { OnlineOrder } from "./components/sections/OnlineOrder"; 
import { LocationMap } from "./components/sections/LocationMap";
import { LanguageSwitcher } from "./components/ui/LanguageSwitcher";

const App: React.FC = () => {
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
    </main>
  );
};

export default App;