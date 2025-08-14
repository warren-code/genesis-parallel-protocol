# Loop Card Component System

A comprehensive component library for visualizing continuous improvement cycles using a 5-column loop pattern. Features glass morphism styling, gold accents, and smooth animations.

## Components

### 1. LoopCard
The main component for displaying a full 5-column loop system.

```tsx
import { LoopCard } from '@/app/components/loop-cards';

<LoopCard
  title="My Loop System"
  description="Description of the continuous loop"
  input={{
    title: 'Input',
    icon: <InputIcon />,
    content: 'Resources and prerequisites',
    items: ['Item 1', 'Item 2'],
    color: 'signal'
  }}
  process={{
    title: 'Process',
    icon: <ProcessIcon />,
    content: 'Transformation steps',
    items: ['Step 1', 'Step 2'],
    color: 'gold'
  }}
  output={{
    title: 'Output',
    icon: <OutputIcon />,
    content: 'Results and products',
    items: ['Result 1', 'Result 2'],
    color: 'quantum'
  }}
  feedback={{
    title: 'Feedback',
    icon: <FeedbackIcon />,
    content: 'Monitoring and adjustment',
    items: ['Metric 1', 'Metric 2'],
    color: 'white'
  }}
  recursion={{
    title: 'Recursion',
    icon: <RecursionIcon />,
    content: 'System improvement',
    items: ['Improvement 1', 'Improvement 2'],
    color: 'gold'
  }}
  variant="horizontal" // 'horizontal' | 'vertical' | 'compact'
  animationDelay={0}
/>
```

### 2. MiniLoopCard
A compact version for simpler loop visualizations.

```tsx
import { MiniLoopCard } from '@/app/components/loop-cards';

<MiniLoopCard
  title="Quick Loop"
  steps={[
    { label: 'Learn', icon: <LearnIcon /> },
    { label: 'Apply', icon: <ApplyIcon /> },
    { label: 'Share', icon: <ShareIcon /> }
  ]}
  color="gold" // 'gold' | 'signal' | 'quantum' | 'white'
  size="md" // 'sm' | 'md' | 'lg'
/>
```

### 3. LoopCardGrid
Display multiple loop cards in a responsive grid layout.

```tsx
import { LoopCardGrid } from '@/app/components/loop-cards';

<LoopCardGrid
  cards={[
    {
      id: '1',
      type: 'full',
      data: { /* LoopCard props */ }
    },
    {
      id: '2',
      type: 'mini',
      data: { /* MiniLoopCard props */ }
    }
  ]}
  columns={2} // 1 | 2 | 3 | 4
  gap="md" // 'sm' | 'md' | 'lg'
  staggerAnimation={true}
/>
```

### 4. InteractiveLoopCard
An editable version of LoopCard with real-time editing capabilities.

```tsx
import { InteractiveLoopCard } from '@/app/components/loop-cards';

<InteractiveLoopCard
  initialTitle="Custom Loop System"
  initialDescription="Click to edit"
  initialColumns={{
    input: { /* column data */ },
    process: { /* column data */ },
    output: { /* column data */ },
    feedback: { /* column data */ },
    recursion: { /* column data */ }
  }}
  onSave={(data) => console.log('Saved:', data)}
  editable={true}
/>
```

### 5. LoopCardVisualization
An animated SVG visualization showing particle flow through loop stages.

```tsx
import { LoopCardVisualization } from '@/app/components/loop-cards';

<LoopCardVisualization
  stages={[
    { label: 'Input', color: '#00D4FF' },
    { label: 'Process', color: '#FFD700' },
    { label: 'Output', color: '#9945FF' },
    { label: 'Feedback', color: '#FFFFFF' },
    { label: 'Recursion', color: '#FFD700' }
  ]}
  particleCount={8}
  speed="normal" // 'slow' | 'normal' | 'fast'
  size="lg" // 'sm' | 'md' | 'lg'
/>
```

## Features

- **Glass Morphism Styling**: Modern translucent design with backdrop blur
- **Gold Accents**: Consistent use of gold color scheme for highlights
- **Smooth Animations**: Framer Motion powered animations
- **Responsive Design**: Adapts to different screen sizes
- **Multiple Variants**: Horizontal, vertical, and compact layouts
- **Interactive Editing**: Real-time content editing capability
- **Particle Flow Visualization**: Animated representation of continuous loops

## Color Palette

- `gold`: #FFD700 (Primary accent)
- `signal`: #00D4FF (Vibrant cyan)
- `quantum`: #9945FF (Quantum purple)
- `white`: #FFFFFF (Pure white)
- `charcoal`: #1A1A1A (Deep charcoal)

## Usage Tips

1. **Choose the Right Component**: Use `LoopCard` for detailed systems, `MiniLoopCard` for simple flows
2. **Consistent Icons**: Use matching icon sizes across columns (w-6 h-6 recommended)
3. **Color Coding**: Use colors meaningfully to differentiate stages
4. **Animation Performance**: Limit the number of animated components on a single page
5. **Accessibility**: Ensure sufficient contrast between text and backgrounds

## Examples

See the demo page at `/loop-cards-demo` for live examples of all components.

## Dependencies

- React
- Framer Motion
- Tailwind CSS
- @heroicons/react (for icons)

## Future Enhancements

- Dark/Light theme variants
- Export loop data as JSON
- Print-friendly styles
- Additional animation patterns
- Integration with data visualization libraries
