# TeamMessage - System Designu UI

## Kolory

### Primary (Żabka Green)
- **Main**: `#00B67A`
- **Hover**: `#00A066`
- **Light**: `#00B67A/20` (backgrounds)
- **Border**: `#00B67A/30` (borders)

### Background
- **Main**: `#0F1229`
- **Card**: `from-[#1A1D3A] to-[#252840]` (gradient)
- **Card Alt**: `#1A1D3A`
- **Hover**: `#00B67A/5`

### Text
- **Primary**: `#FFFFFF` (white)
- **Secondary**: `#9CA3AF` lub `text-gray-400`
- **Muted**: `#6B7280` lub `text-gray-500`

### Status Colors
- **Published**: `#00B67A` (green)
- **Draft**: `#6B7280` (gray)
- **Scheduled**: `#A855F7` (purple)
- **Pending**: `#F59E0B` (amber)
- **Ready**: `#3B82F6` (blue)
- **Error**: `#EF4444` (red)

## Border Radius

- **Small**: `rounded-lg` (8px)
- **Medium**: `rounded-xl` (12px)
- **Large**: `rounded-2xl` (16px)
- **Full**: `rounded-full`

**Użycie:**
- Buttony: `rounded-xl`
- Karty/Kontenery: `rounded-2xl`
- Inputy: `rounded-xl`
- Badges: `rounded-full`
- Icons containers: `rounded-xl`

## Spacing

- **Card padding**: `p-6` lub `p-8`
- **Section gap**: `gap-6` lub `gap-8`
- **Button padding**: `px-6 py-3`
- **Input padding**: `px-4 py-3`

## Shadows

- **Card**: `border border-[#00B67A]/30`
- **Hover**: `hover:border-[#00B67A]`
- **Active**: `ring-2 ring-[#00B67A]/50`

## Buttons

### Primary
```tsx
className="bg-[#00B67A] hover:bg-[#00A066] text-white px-6 py-3 rounded-xl transition-all border border-[#00B67A]"
```

### Secondary
```tsx
className="bg-gray-600/50 hover:bg-gray-600/70 text-white px-6 py-3 rounded-xl transition-all border border-gray-500/50"
```

### Ghost/Outline
```tsx
className="border-2 border-[#00B67A] text-[#00B67A] hover:bg-[#00B67A]/10 px-6 py-3 rounded-xl transition-all"
```

### Danger
```tsx
className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-3 rounded-xl transition-all border border-red-500/50"
```

## Cards/Containers

### Main Card
```tsx
className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-2xl border border-[#00B67A]/30 p-6"
```

### Hover Card
```tsx
className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-2xl border border-[#00B67A]/30 hover:border-[#00B67A] transition-all cursor-pointer p-6"
```

## Inputs

```tsx
className="w-full px-4 py-3 bg-[#0F1229] border border-[#00B67A]/30 rounded-xl text-white focus:outline-none focus:border-[#00B67A] focus:ring-2 focus:ring-[#00B67A]/50 transition-all"
```

## Badges/Tags

```tsx
className="px-3 py-1 rounded-full text-xs border bg-[#00B67A]/20 text-[#00B67A] border-[#00B67A]/30"
```

## Icons

- **Size**: `w-5 h-5` (20px) dla większości ikon
- **Size small**: `w-4 h-4` (16px) dla małych ikon w buttonach
- **Container**: `w-10 h-10` lub `w-12 h-12` z padding i rounded-xl
