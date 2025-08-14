# Babylonian Taxonomy Hero Section

## Overview

A full-screen hero section designed specifically for "The Babylonian Civilisation Taxonomy — and the Genesis Break" page. Features dark gradient overlays, mythic text styling, and sophisticated motion animations.

## Features

- **Full-width dark gradient background** using `bg-gradient-mythic` utility class
- **Mythic text styling** with gold gradient text and glow effects
- **Motion animations** for smooth entrance effects using Framer Motion
- **Responsive design** that works across all device sizes
- **Interactive elements** including animated scroll indicator and floating mythic symbols
- **Call-to-action buttons** styled with existing button classes

## Implementation

### Basic Usage

```tsx
import BabylonianTaxonomyHero from '@/components/hero/BabylonianTaxonomyHero';

export default function YourPage() {
  return (
    <div>
      <BabylonianTaxonomyHero />
      {/* Your other page content */}
    </div>
  );
}
```

### Component Structure

The hero section includes:

1. **Background Layers**:
   - Base gradient using `bg-gradient-mythic`
   - Additional dark overlay for depth
   - Animated parallax grid
   - Floating mythic symbols (RecursionRing components)

2. **Content Elements**:
   - Main title with gold gradient text effect
   - Subtitle explaining the taxonomy purpose
   - Two CTA buttons (Primary and Accent variants)
   - Decorative text element
   - Animated scroll indicator

3. **Animation Sequence**:
   - Container fade-in
   - Staggered content appearance
   - Continuous floating animations
   - Scroll indicator pulse

## Customization

### Color Scheme

The component uses the following color variables from the theme:
- `gold-500`, `gold-600`, `gold-700` for the title gradient
- `charcoal-900` for dark overlays
- `gray-300` for subtitle text
- `accent` and `primary` for buttons

### Animation Timing

Modify animation variants in the component:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,    // Delay before children animate
      staggerChildren: 0.15,  // Delay between each child
      duration: 0.8,          // Container fade duration
    },
  },
};
```

### Button Actions

To add functionality to the CTA buttons, modify the Button components:

```tsx
<Button 
  variant="primary" 
  size="lg" 
  glowEffect
  onClick={() => router.push('/explore')}
>
  Begin Exploration
</Button>
```

## Styling Classes Used

- `bg-gradient-mythic`: Dark gradient background defined in globals.css
- `text-glow-gold`: Gold text glow effect
- `shadow-gold-glow`: Gold box shadow effect
- `font-display`: Orbitron font for headings
- `text-transparent bg-clip-text`: For gradient text effect

## Dependencies

- **framer-motion**: For animations
- **Button component**: From UI components
- **ParallaxGrid**: For background grid effect
- **RecursionRing**: For floating mythic symbols

## Responsive Behavior

- **Mobile (< 640px)**: Buttons stack vertically, smaller text sizes
- **Tablet (640px - 1024px)**: Side-by-side buttons, medium text
- **Desktop (> 1024px)**: Full-size text and optimal spacing

## Accessibility

- Proper heading hierarchy (h1 for main title)
- Sufficient color contrast for text
- Focus states on interactive elements
- Descriptive button labels

## Example Integration

```tsx
// app/babylonian-taxonomy/page.tsx
'use client';

import BabylonianTaxonomyHero from '@/components/hero/BabylonianTaxonomyHero';
import { motion } from 'framer-motion';

export default function BabylonianTaxonomyPage() {
  return (
    <div className="min-h-screen bg-charcoal-900">
      <BabylonianTaxonomyHero />
      
      {/* Additional page sections */}
      <section className="py-20">
        {/* Your content here */}
      </section>
    </div>
  );
}
```
