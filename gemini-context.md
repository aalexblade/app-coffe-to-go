# Gemini CLI Developer Context

You are assisting in building a premium luxury coffee-to-go landing page.
Always adhere to these architectural rules for any code generation or modifications:

## Tech Stack
- React 18+ (Vite) & TypeScript
- Tailwind CSS v4 (Theme variables are defined in `src/index.css` via `@theme`)
- Framer Motion (GPU-accelerated, high-performance animations)

## Constraints
- **Language**: All code comments, architecture names, and initial UI strings must be in ENGLISH. (Ukrainian localization will be implemented as a separate step).
- **Styling**: Use premium custom classes: `bg-luxury-dark`, `text-luxury-gold`, `text-luxury-clay`, `font-display`, `font-sans`.
- **Mobile-First**: Always structure layouts starting with mobile screen sizes (`md:`, `lg:` modifiers for desktops).
- **HTML5 Video**: All background loop videos must include `muted playsInline autoPlay loop` attributes to ensure compatibility with iOS and Android.

## File Hierarchy
- Section components -> `src/components/sections/`
- Reusable UI elements -> `src/components/ui/`