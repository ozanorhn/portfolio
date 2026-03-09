# Ozan Orhan - Premium Portfolio

Ein modernes, elegantes und minimal gestaltetes Developer Portfolio mit Apple-Style Design, entwickelt mit Angular 20, TypeScript und SCSS.

## Features

✨ **Apple-Style Design**
- Dark Mode mit modernen Farben und Glasmorphismus-Effekten
- Premium Typografie mit System-Fonts (-apple-system, BlinkMacSystemFont)
- Sanfte Animationen und Übergänge
- Responsive Design für alle Geräte

🎨 **Komponenten**
- **Navbar** - Sticky Navigation mit Mobile-Menü
- **Hero** - Beeindruckender Full-Screen Hero-Section mit Gradient-Text
- **About** - Persönliche Vorstellung mit statistischen Daten
- **Skills** - 4-spaltige Grid der Fachkompetenzen
- **Projects** - Großartige Projekt-Showcases mit alternierenden Layouts
- **Contact** - 3 Kontaktmöglichkeiten mit Hover-Effekten
- **Footer** - Minimalistischer Footer mit Scroll-to-Top

⚡ **Technologie**
- Angular 20 (Standalone Components)
- TypeScript mit striktem Typing
- SCSS mit Variablen und Mixins
- Smooth Scrolling & Scroll Animations
- IntersectionObserver für Reveal-Effekte
- Mobile Responsive (Mobile First)

## Projekt-Struktur

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── navbar.component.ts
│   │   │   ├── navbar.component.html
│   │   │   └── navbar.component.scss
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── project-card/
│   │   ├── contact/
│   │   └── footer/
│   ├── directives/
│   │   └── reveal.directive.ts
│   ├── services/
│   │   └── scroll.service.ts
│   ├── app.ts
│   └── app.html
├── styles/
│   ├── _variables.scss
│   ├── _typography.scss
│   ├── _animations.scss
│   └── styles.scss
├── index.html
└── main.ts
```

## Installation & Verwendung

### Voraussetzungen
- Node.js 18+ (getestet mit 24.8.0)
- npm 11.6.0+
- Angular CLI 20.3.2+

### Development Server starten

```bash
cd /Users/ozan/Desktop/portfolio
npm install
npm start
```

Server läuft auf `http://localhost:4200`

### Production Build

```bash
ng build --configuration production
# Output in dist/portfolio/
```

## Design System

### Farben
```
$color-black: #000000
$color-text-primary: #f5f5f7
$color-text-secondary: #86868b
$color-accent: #0071e3 (Apple Blue)
$color-glass: rgba(255,255,255,0.05)
```

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px

## Komponenten Details

### NavbarComponent
- Fixed Navigation mit Scroll-State
- Mobile Hamburger-Menü
- Smooth Scroll zu Sektionen
- Frosted Glass Effekt on Scroll

### HeroComponent
- Full-Screen Hero mit Gradient Text
- 2 Call-to-Action Buttons
- Scroll-Indicator Animation
- Responsive Background Gradient

### AboutComponent
- 2-Spaltig Layout (Desktop)
- Stats mit Zahlen
- Scroll-Reveal Animationen
- Dekorative CSS-Blobs

### SkillsComponent
- 4-Spaltige Grid
- Glass Morphism Cards
- Tech Badges
- Staggered Animations

### ProjectsComponent + ProjectCardComponent
- 3 Großartige Projekte
- Alternierend Layout (Left/Right/Center)
- Technologie-Badges
- Hover-Lift Effekte

### ContactComponent
- 3 Kontakt-Methoden
- Animated Card Hover
- External Links
- Gradient Background

### FooterComponent
- Minimal Design
- Auto-aktualisiertes Jahr
- Scroll-to-Top Button

## Services & Directives

### ScrollService
```typescript
scrollToSection(sectionId: string)
scrollToTop()
getCurrentScroll(): number
isElementInViewport(element: HTMLElement): boolean
```

### RevealDirective
Scroll-triggered Animations mit IntersectionObserver:
```html
<div appReveal>Animiert on Scroll</div>
<div appReveal [revealDelay]="200">Mit Verzögerung</div>
```

## Animations

Vordefinierte Animationen:
- `fadeInUp` - Slide up + Fade
- `slideInLeft/Right` - Slide von Seite
- `scaleIn` - Scale + Fade
- `float` - Floating Effect
- `glow` - Glowing Border

Utility-Klassen:
```html
<div class="animate-fade-in-up">...</div>
<div class="hover-lift">Lifts on Hover</div>
<div class="hover-glow">Glows on Hover</div>
```

## Performance

- ✅ Tree-shaking (Standalone Components)
- ✅ CSS-only Animations (GPU accelerated)
- ✅ Responsive Images (Gradient Placeholders)
- ✅ Mobile Optimized
- ✅ Semantic HTML

## SEO & Meta Tags

- German Language (`lang="de"`)
- Optimierte Meta Tags
- Open Graph für Social Sharing
- Mobile-friendly Viewport
- Favicon & Apple Touch Icon

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Browsers (iOS 14+, Android 9+)

## Nächste Schritte

1. **Aktuelle Kontaktinformationen**: Email in contact.component aktualisieren
2. **Projekt-Screenshots**: Echte Bilder für Projekte hinzufügen
3. **Domain einrichten**: Portfolio auf ozan-orhan.com deployen
4. **Analytics**: Google Analytics oder ähnliches integrieren
5. **Kontakt-Formular**: Backend für Email-Verarbeitung verbinden

---

**© 2026 Ozan Orhan. Alle Rechte vorbehalten.**

Entwickelt mit ❤️ in Hannover, Deutschland.
