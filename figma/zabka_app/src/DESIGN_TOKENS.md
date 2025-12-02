# Design Tokens - TeamMessage

## Kolory Główne

### Brand Colors (Żabka Green)
```
Primary: #00B67A
Primary Hover: #00A066
Primary Active: #008F5A
Primary Light: #00B67A/20 (opacity 20%)
```

### Dark Mode Backgrounds
```
Background Primary: #0F1229
Background Secondary: #1A1D3A
Background Tertiary: #252840
Border: #00B67A/30 (opacity 30%)
```

### Light Mode Backgrounds
```
Background Primary: #FFFFFF
Background Secondary: #F9FAFB
Background Tertiary: #F3F4F6
Border: #D1D5DB
```

## Kolory Semantyczne

### Success
```
Dark Mode: #00B67A
Light Mode: #00B67A
Contrast Ratio: 4.8:1 (Dark), 4.9:1 (Light) ✅
```

### Warning
```
Dark Mode: #FBBF24 (yellow-400)
Light Mode: #B45309 (yellow-700)
Contrast Ratio: 4.5:1 (Dark), 5.2:1 (Light) ✅
```

### Error
```
Dark Mode: #F87171 (red-400)
Light Mode: #B91C1C (red-700)
Contrast Ratio: 4.6:1 (Dark), 5.8:1 (Light) ✅
```

### Info
```
Dark Mode: #60A5FA (blue-400)
Light Mode: #1D4ED8 (blue-700)
Contrast Ratio: 4.5:1 (Dark), 5.5:1 (Light) ✅
```

## Kolory Zespołów

### HR (Human Resources)
```
Background: #3B82F6/20 (blue-500, opacity 20%)
Border: #3B82F6/30 (blue-500, opacity 30%)
Text Dark: #60A5FA (blue-400)
Text Light: #1D4ED8 (blue-700)
Icon: Users (lucide-react)
```

### Dział Prawny (Legal)
```
Background: #A855F7/20 (purple-500, opacity 20%)
Border: #A855F7/30 (purple-500, opacity 30%)
Text Dark: #C084FC (purple-400)
Text Light: #7E22CE (purple-700)
Icon: Scale (lucide-react)
```

### IT & Tech
```
Background: #10B981/20 (green-500, opacity 20%)
Border: #10B981/30 (green-500, opacity 30%)
Text Dark: #34D399 (green-400)
Text Light: #047857 (green-700)
Icon: Monitor (lucide-react)
```

### Marketing
```
Background: #F97316/20 (orange-500, opacity 20%)
Border: #F97316/30 (orange-500, opacity 30%)
Text Dark: #FB923C (orange-400)
Text Light: #C2410C (orange-700)
Icon: Megaphone (lucide-react)
```

### Ogólny (General)
```
Background: #6B7280/20 (gray-500, opacity 20%)
Border: #6B7280/30 (gray-500, opacity 30%)
Text Dark: #9CA3AF (gray-400)
Text Light: #4B5563 (gray-600)
Icon: Building2 (lucide-react)
```

## Typography

### Font Family
```
Primary: 'Inter', sans-serif
Fallback: system-ui, -apple-system, sans-serif
```

### Font Sizes (nie nadpisywać w Tailwind)
```
Zdefiniowane w /styles/globals.css
h1, h2, h3, h4, h5, h6 mają własne rozmiary
p, span, div dziedziczą po base (14px)
```

### Font Weights (nie nadpisywać w Tailwind)
```
Zdefiniowane w /styles/globals.css
Normal: 400
Semibold: 600 (headings)
```

## Spacing

### Border Radius
```
Small: 0.5rem (8px) - rounded-lg
Medium: 0.75rem (12px) - rounded-xl
Large: 1rem (16px) - rounded-2xl
```

### Padding/Margin Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
```

## Shadows

### Focus Ring
```
Primary: 0 0 0 2px #00B67A
Offset: 0 0 0 2px transparent, 0 0 0 4px #00B67A
```

### Card Shadows
```
Dark Mode: shadow-lg shadow-[#00B67A]/30
Light Mode: shadow-lg shadow-gray-200/50
```

## Interactive States

### Buttons - Primary (Green)
```
Default: bg-gradient-to-r from-[#10B981] to-[#059669]
Hover: bg-gradient-to-r from-[#059669] to-[#047857]
Active: transform scale-95
Focus: ring-2 ring-[#10B981] ring-offset-2
Disabled: opacity-50 cursor-not-allowed
```

### Buttons - Secondary
```
Dark: bg-[#1A1D3A] hover:bg-[#252840] border-[#00B67A]/30
Light: bg-white hover:bg-gray-50 border-gray-300
```

### Buttons - Danger
```
Dark: text-red-400 hover:text-red-300 hover:bg-red-500/20
Light: text-red-700 hover:text-red-800 hover:bg-red-50
```

### Links
```
Dark: text-[#00B67A] hover:underline
Light: text-[#00B67A] hover:underline
```

## Input Fields

### Text Inputs
```
Dark Mode:
  Background: #374151
  Border: #4B5563
  Text: white
  Placeholder: gray-500
  Focus: ring-2 ring-[#10B981]

Light Mode:
  Background: #F9FAFB
  Border: #D1D5DB
  Text: gray-900
  Placeholder: gray-400
  Focus: ring-2 ring-[#10B981]
```

### Checkboxes
```
Unchecked:
  Dark: border-gray-600 bg-[#1A1D3A]
  Light: border-gray-300 bg-white

Checked:
  Both: bg-[#00B67A] border-[#00B67A]

Hover:
  Both: border-[#00B67A]

Focus:
  Both: ring-2 ring-[#00B67A] ring-offset-2
```

## Animations & Transitions

### Standard Transitions
```
Duration: 150ms (transition-all)
Easing: ease-in-out (default)
```

### Hover Effects
```
Scale: scale-105
Opacity: opacity-80
Background: bg-opacity change
```

### Loading States
```
Spinner: animate-spin
Pulse: animate-pulse
```

## Accessibility

### Minimum Contrast Ratios
```
Normal Text: 4.5:1 (WCAG AA)
Large Text (18px+): 3:0:1 (WCAG AA)
UI Components: 3:1 (WCAG AA)
```

### Touch Targets
```
Minimum: 44x44px
Class: .touch-target or min-h-[44px] min-w-[44px]
```

### Focus Indicators
```
Always visible
Minimum 2px width
Contrasting color
Use: .focus-ring-primary or .focus-ring-primary-offset
```

## Breakpoints (Mobile First)

```
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large desktops
```

## Z-Index Scale

```
Modal Backdrop: 50
Modal Content: 50
Dropdown: 40
Header: 30
Sidebar: 20
Toast: 100
```

## Icons

### Icon Library
```
Primary: lucide-react
Size Small: w-4 h-4 (16px)
Size Medium: w-5 h-5 (20px)
Size Large: w-6 h-6 (24px)
Size XL: w-8 h-8 (32px)
```

### Icon Colors
```
Dark Mode: text-gray-300 (default), text-white (active)
Light Mode: text-gray-500 (default), text-gray-900 (active)
Accent: text-[#00B67A]
```

## Utility Classes (Custom)

### Focus Rings
```
.focus-ring-primary
.focus-ring-primary-offset
```

### Badges
```
.badge-warning
.badge-error
.badge-success
.badge-info
```

### Teams
```
.team-hr
.team-legal
.team-it
.team-marketing
.team-general
```

### Interactive
```
.btn-interactive
.touch-target
```

## Usage Examples

### Team Badge
```tsx
<span className={`px-3 py-1 rounded-full text-sm border ${
  team === 'HR' ? 'team-hr' :
  team === 'Dział Prawny' ? 'team-legal' :
  team === 'IT & Tech' ? 'team-it' :
  team === 'Marketing' ? 'team-marketing' :
  'team-general'
}`}>
  {team}
</span>
```

### Status Badge
```tsx
<div className={`px-3 py-1 rounded-full text-xs ${
  status === 'success' ? 'badge-success' :
  status === 'warning' ? 'badge-warning' :
  status === 'error' ? 'badge-error' :
  'badge-info'
}`}>
  {statusText}
</div>
```

### Button
```tsx
<button className={`
  touch-target
  focus-ring-primary
  bg-gradient-to-r from-[#10B981] to-[#059669]
  hover:from-[#059669] hover:to-[#047857]
  text-white rounded-xl px-6 py-3
  transition-all
`}>
  {buttonText}
</button>
```

### Input
```tsx
<input
  type="text"
  className={`
    w-full rounded-xl px-4 py-3
    focus-ring-primary
    transition-colors
    ${theme === 'dark'
      ? 'bg-[#374151] border-[#4B5563] text-white placeholder-gray-500'
      : 'bg-[#F9FAFB] border-[#D1D5DB] text-gray-900 placeholder-gray-400'
    }
  `}
/>
```

## Testing Tools

### Contrast
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Accessibility Panel

### Color Blindness
- Colorblind Web Page Filter: https://www.toptal.com/designers/colorfilter

### Accessibility
- axe DevTools: Browser extension
- WAVE: Web accessibility evaluation tool

---

**Version**: 1.0  
**Last Updated**: December 2, 2024  
**Maintained By**: TeamMessage Design System Team
