# Mythic-Tech Theme Setup

## Overview
The mythic-tech theme has been successfully integrated into your Next.js 14 project with TypeScript, providing a high-contrast design system optimized for accessibility and visual impact.

## Theme Colors

### Primary Palette
- **Gold**: Primary accent color
  - `gold-500`: #FFD700 (Primary)
  - `gold-600`: #FFC107 (Hover states)
  - `gold-700`: #FFB300 (Active states)

- **White**: High contrast text
  - `white`: #FFFFFF (Primary text)
  - `white-50`: #FAFAFA (Secondary text)

- **Charcoal**: Background colors
  - `charcoal-900`: #1A1A1A (Primary background)
  - `charcoal-800`: #2D2D2D (Card backgrounds)
  - `charcoal-700`: #3D3D3D (Borders and dividers)

### Additional Colors
- **Signal**: #00D4FF (Information/Success states)
- **Danger**: #D9534F (Error/Warning states)
- **Gray**: #A9A6A0 (Muted text)

## Features Implemented

### 1. Tailwind CSS Configuration
- Custom color palette with mythic-tech theme
- High contrast utilities
- Custom animations (pulse-gold, glow effects)
- Box shadow utilities for gold glow effects

### 2. Custom CSS Classes
Located in `styles/mythic-tech-theme.css`:

#### Buttons
- `.btn-mythic-primary` - Gold primary button
- `.btn-mythic-secondary` - Bordered secondary button
- `.btn-mythic-ghost` - Ghost button variant

#### Components
- `.card-mythic` - High contrast card component
- `.input-mythic` - Styled form inputs
- `.divider-mythic` - Themed dividers

#### Effects
- `.text-glow-gold` - Gold text glow effect
- `.border-glow-gold` - Gold border glow
- `.animate-glow` - Animated glow effect
- `.bg-gradient-mythic` - Mythic gradient backgrounds

### 3. Chart.js Configuration
Located in `lib/chartConfig.ts`:
- Pre-configured chart options with mythic-tech colors
- Line, Bar, and Doughnut chart configurations
- Gradient creator utility
- Consistent theming across all chart types

### 4. Demo Component
Located in `components/MythicThemeDemo.tsx`:
- Showcases all theme elements
- Interactive examples with Framer Motion
- Chart.js integration examples
- Complete color palette reference

## Dependencies Installed
- ✅ Next.js 14 with TypeScript
- ✅ Tailwind CSS v4
- ✅ Framer Motion (v12.23.12)
- ✅ React Icons (v5.5.0)
- ✅ Chart.js (v4.5.0)
- ✅ React-Chartjs-2 (v5.3.0)
- ✅ Supabase (already configured)

## Usage Examples

### Using Theme Colors
```jsx
<div className="bg-charcoal-900 text-white">
  <h1 className="text-gold-500 text-glow-gold">Mythic Title</h1>
  <button className="btn-mythic-primary">Click Me</button>
</div>
```

### Using Chart.js
```jsx
import { Line } from 'react-chartjs-2';
import { lineChartOptions, datasetColors } from '@/lib/chartConfig';

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Data',
    data: [10, 20, 30],
    ...datasetColors.primary
  }]
};

<Line data={data} options={lineChartOptions} />
```

### Using Animations
```jsx
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  className="card-mythic animate-glow"
>
  Animated Card
</motion.div>
```

## Accessibility Features
- High contrast ratios (WCAG AAA compliant)
- Focus states with gold ring indicators
- Keyboard navigation support
- Screen reader friendly classes
- Print-friendly styles

## Next Steps
1. View the demo component at `/mythic-demo` route
2. Customize components using the provided CSS classes
3. Use the Chart.js configuration for data visualization
4. Leverage Framer Motion for smooth animations

## File Structure
```
├── styles/
│   └── mythic-tech-theme.css    # Custom theme styles
├── lib/
│   └── chartConfig.ts           # Chart.js configuration
├── components/
│   └── MythicThemeDemo.tsx      # Demo component
├── app/
│   └── globals.css              # Updated with theme import
└── tailwind.config.ts           # Updated with theme colors
```
