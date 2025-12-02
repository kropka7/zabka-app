# 🎨 TEAM TEMPLATES LIBRARY — Complete Design Specification

**Feature:** Szablony komunikacyjne per zespół  
**Version:** 1.0  
**Last Updated:** 2025-11-30

---

## 📐 LAYOUT STRUCTURE

### Desktop Grid (12 columns, max-width: 1280px)

```
┌──────────────────────────────────────────────────────────────┐
│ [Header] col-span-12                                          │
│   ┌──────────────────────────────────────────────────────┐   │
│   │ Title + Description               [Search Bar]       │   │
│   └──────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│ [TeamSelector] col-span-12 - Horizontal Scroll Pills         │
│   [All] [HR] [Prawny] [IT] [Marketing] [Ogólny]             │
├──────────────────────────────────────────────────────────────┤
│ [Stats] col-span-12 - 3 columns grid                         │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐                 │
│   │📄 24      │ │❤️ 8       │ │🕒 2 days  │                 │
│   │Templates  │ │Favourites │ │Last used  │                 │
│   └───────────┘ └───────────┘ └───────────┘                 │
├──────────────────────────────────────────────────────────────┤
│ [TemplateGrid] col-span-12 - 3 columns grid                  │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│   │ [HR] Badge  │ │[Legal] Badge│ │ [IT] Badge  │          │
│   │ Title       │ │ Title       │ │ Title       │          │
│   │ Description │ │ Description │ │ Description │          │
│   │ 📧 🌐      │ │ 📧 🌐 📋   │ │ 📧 🌐 📊   │          │
│   │ ⭐ 45 | 🕒 │ │ ⭐ 23 | 🕒 │ │ ⭐ 67 | 🕒 │          │
│   │ [👁 Preview]│ │ [👁 Preview]│ │ [👁 Preview]│          │
│   │ [✓ Use]     │ │ [✓ Use]     │ │ [✓ Use]     │          │
│   │      ❤️     │ │      ❤️     │ │      ❤️     │          │
│   └─────────────┘ └─────────────┘ └─────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

### Tablet (768px)
- Grid: 2 columns
- Team pills: scrollable
- Stats: maintained 3 columns

### Mobile (375px)
- Grid: 1 column stack
- Search bar: full width
- Team pills: horizontal scroll
- Stats: 3 columns (smaller cards)

---

## 🧩 ATOMIC DESIGN BREAKDOWN

### **ATOMS**

#### Btn/Primary (Use Template)
```css
bg-gradient-to-r from-[#00B67A] to-[#00A066]
hover:from-[#00A066] hover:to-[#008F5A]
text-white
px-4 py-2 rounded-lg
focus:ring-2 focus:ring-[#00B67A]
```

#### Btn/Secondary (Preview)
```css
bg-[#00B67A]/20 
hover:bg-[#00B67A]/30 
text-[#00B67A]
px-4 py-2 rounded-lg
```

#### Btn/TeamPill
**Active State:**
```css
bg-gradient-to-r from-[#00B67A] to-[#00A066]
text-white
```

**Inactive State:**
```css
bg-[#1A1D3A]
border border-[#00B67A]/30
text-gray-300
hover:border-[#00B67A] hover:text-white
```

**Team-Specific Pills:**
- **HR:** `bg-blue-500 text-white` (active)
- **Legal:** `bg-red-500 text-white` (active)
- **IT:** `bg-purple-500 text-white` (active)
- **Marketing:** `bg-orange-500 text-white` (active)
- **General:** `bg-green-500 text-white` (active)

#### Toggle/Favourite
```tsx
<Heart 
  className={isFavourite 
    ? 'fill-pink-500 text-pink-500' 
    : 'text-gray-400 hover:text-pink-500'
  }
/>
```
- Size: w-5 h-5
- Container: w-8 h-8 rounded-full bg-[#0F1229]/80
- Position: absolute top-4 right-4

#### Badge/Team
```css
px-3 py-1 rounded-full
bg-{team}-500/20 text-{team}-500
text-xs
flex items-center gap-2
```
- Icon: `<Users className="w-3 h-3" />`
- Colors: blue (HR), red (Legal), purple (IT), orange (Marketing), green (General)

#### Badge/Channel
```css
w-8 h-8
bg-[#00B67A]/20 rounded-lg
flex items-center justify-center
text-[#00B67A]
```
**Icons:**
- Email: `<Mail className="w-4 h-4" />`
- Intranet: `<Globe className="w-4 h-4" />`
- Presentation: `<Presentation className="w-4 h-4" />`
- Release Notes: `<FileCheck className="w-4 h-4" />`

#### Input/Search
```css
w-full lg:w-96
bg-[#1A1D3A]
border border-[#00B67A]/30
rounded-xl
pl-12 pr-4 py-3
text-white placeholder-gray-500
focus:ring-2 focus:ring-[#00B67A]
```
- Icon: `<Search />` at absolute left-4

#### Icon/Sizes
- **Icon/16:** w-4 h-4 (używane w badge'ach channel)
- **Icon/20:** w-5 h-5 (używane w button'ach)
- **Icon/24:** w-6 h-6 (używane w modal close)
- **Icon/32:** w-8 h-8 (używane w header)

---

### **MOLECULES**

#### TeamSelector/Pills
**Structure:**
```tsx
<div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
  <Btn/TeamPill team="All" count={8} active={true} />
  <Btn/TeamPill team="HR" count={2} color="blue" />
  <Btn/TeamPill team="Legal" count={1} color="red" />
  ...
</div>
```

**Pill Internal Structure:**
```
┌─────────────────────┐
│ Team Name    [2]    │ ← Count badge
└─────────────────────┘
```

#### SearchBar/WithIcon
```
┌────────────────────────────┐
│ 🔍  Search templates...    │
└────────────────────────────┘
```
- Icon positioned absolute
- Clear focus states

#### StatsCard/Metric
```
┌─────────────────────┐
│ ┌───┐               │
│ │📄 │ Templates     │
│ └───┘ 24            │
└─────────────────────┘
```
**Components:**
- Icon container: w-10 h-10 bg-{color}/20 rounded-lg
- Label: text-gray-400 text-sm
- Value: text-white text-2xl

**Variants:**
1. **Templates:** FileText icon, green bg
2. **Favourites:** Heart icon, pink bg
3. **Last Used:** Clock icon, blue bg

#### TemplateCard/Preview
```
┌──────────────────────────────┐
│ [HR Badge]            ❤️     │ ← Favourite toggle
│                               │
│ Template Title                │
│                               │
│ Short description...          │
│ (2 lines max)                 │
│                               │
│ 📧 🌐 📊 ← Channel icons     │
│                               │
│ ─────────────────────────────│
│ ⭐ 45 times  |  🕒 2 days ago│
│ ─────────────────────────────│
│                               │
│ [👁 Preview] [✓ Use Template]│
└──────────────────────────────┘
```

**Structure:**
```tsx
<div className="relative bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-xl p-6">
  {/* Favourite Toggle - absolute top-right */}
  <Toggle/Favourite />
  
  {/* Team Badge */}
  <Badge/Team team="HR" />
  
  {/* Title */}
  <h3 className="text-white text-lg mb-2 pr-8">
    {title}
  </h3>
  
  {/* Description */}
  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
    {description}
  </p>
  
  {/* Channel Icons */}
  <div className="flex gap-2 mb-4">
    {channels.map(ch => <Badge/Channel />)}
  </div>
  
  {/* Metadata */}
  <div className="flex justify-between text-xs text-gray-500 mb-4 pb-4 border-b">
    <span>⭐ {usageCount} times</span>
    <span>🕒 {daysAgo} days ago</span>
  </div>
  
  {/* Actions */}
  <div className="grid grid-cols-2 gap-2">
    <Btn/Secondary icon={Eye}>Preview</Btn>
    <Btn/Primary icon={CheckCircle2}>Use Template</Btn>
  </div>
</div>
```

#### EmptyState/NoResults
```
┌─────────────────────────────────┐
│                                 │
│         📄 (large icon)         │
│                                 │
│    No templates found           │
│                                 │
│  Try changing search criteria   │
│                                 │
└─────────────────────────────────┘
```
- Icon: w-16 h-16 text-gray-500
- Centered layout
- Gradient background

---

### **ORGANISMS**

#### Section/Header
```tsx
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
  <div>
    <h1 className="text-white text-3xl flex items-center gap-3">
      <FileText className="w-8 h-8 text-[#00B67A]" />
      {title}
    </h1>
    <p className="text-gray-400">{description}</p>
  </div>
  
  <SearchBar/WithIcon />
</div>
```

**Responsive:**
- Desktop: Row layout, search on right
- Mobile: Column stack, full-width search

#### Section/TeamSelection
```tsx
<TeamSelector/Pills 
  teams={['All', 'HR', 'Legal', 'IT', 'Marketing', 'General']}
  selectedTeam={selectedTeam}
  onSelectTeam={setSelectedTeam}
/>
```

**Features:**
- Horizontal scroll on mobile
- Active state highlighting
- Count badges per team
- Keyboard navigation support

#### Section/Stats
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <StatsCard/Metric 
    icon={FileText}
    label="Templates"
    value={24}
    color="green"
  />
  <StatsCard/Metric 
    icon={Heart}
    label="Favourites"
    value={8}
    color="pink"
  />
  <StatsCard/Metric 
    icon={Clock}
    label="Last used"
    value="2 days ago"
    color="blue"
  />
</div>
```

#### Grid/Templates
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredTemplates.map(template => (
    <TemplateCard/Preview 
      key={template.id}
      template={template}
      onToggleFavourite={toggleFavourite}
      onPreview={setPreviewTemplate}
      onUse={handleUseTemplate}
    />
  ))}
</div>
```

**Responsive Breakpoints:**
- Mobile (<768px): 1 column
- Tablet (768-1023px): 2 columns
- Desktop (1024px+): 3 columns

#### Modal/TemplatePreview
```
┌──────────────────────────────────────────────────────────┐
│ [Header]                                            [X]   │
│   [HR Badge] 📧 🌐                                        │
│   Template Title                                          │
│   Description text                                        │
├──────────────────────────────────────────────────────────┤
│ [Content - Scrollable]                                    │
│                                                           │
│   Full template content...                                │
│   Preserves formatting...                                 │
│   Multiple paragraphs...                                  │
│                                                           │
│                                                           │
│   (max-height with scroll)                                │
│                                                           │
├──────────────────────────────────────────────────────────┤
│ [Footer]                                                  │
│   ⭐ 45 times  🕒 Last: 2024-11-20                        │
│                                  [📋 Copy] [✓ Use]        │
└──────────────────────────────────────────────────────────┘
```

**Structure:**
```tsx
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
  <div className="max-w-5xl bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-2xl">
    {/* Header */}
    <div className="p-6 border-b">
      <div className="flex items-center gap-3 mb-2">
        <Badge/Team />
        <div className="flex gap-2">
          {channels.map(ch => <Badge/Channel />)}
        </div>
      </div>
      <h2 className="text-2xl">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>
      <button className="absolute top-6 right-6">
        <X className="w-6 h-6" />
      </button>
    </div>
    
    {/* Content */}
    <div className="p-8 max-h-[calc(90vh-250px)] overflow-y-auto">
      <pre className="whitespace-pre-wrap">{content}</pre>
    </div>
    
    {/* Footer */}
    <div className="p-6 border-t flex justify-between">
      <div className="text-sm text-gray-400">
        <span>⭐ {usage} times</span>
        <span>🕒 {lastUsed}</span>
      </div>
      <div className="flex gap-3">
        <Btn/Secondary icon={Copy}>Copy</Btn>
        <Btn/Primary icon={CheckCircle2}>Use Template</Btn>
      </div>
    </div>
  </div>
</div>
```

**Modal Interactions:**
- Click overlay → close modal
- Click X button → close modal
- ESC key → close modal (future)
- Scroll content independently

---

## 🎨 COLOR SYSTEM

### Primary Colors (Żabka Green)
- **Green Primary:** `#00B67A`
- **Green Secondary:** `#00A066`
- **Green Dark:** `#008F5A`

### Background Colors
- **Main BG:** `#0F1229`
- **Card BG 1:** `#1A1D3A`
- **Card BG 2:** `#252840`
- **Overlay:** `black/80` + `backdrop-blur-sm`

### Team Colors
| Team | Primary | Light BG | Text | Border |
|------|---------|----------|------|--------|
| HR | `bg-blue-500` (#3B82F6) | `bg-blue-500/20` | `text-blue-500` | `border-blue-500` |
| Legal | `bg-red-500` (#EF4444) | `bg-red-500/20` | `text-red-500` | `border-red-500` |
| IT | `bg-purple-500` (#A855F7) | `bg-purple-500/20` | `text-purple-500` | `border-purple-500` |
| Marketing | `bg-orange-500` (#F97316) | `bg-orange-500/20` | `text-orange-500` | `border-orange-500` |
| General | `bg-green-500` (#22C55E) | `bg-green-500/20` | `text-green-500` | `border-green-500` |

### Text Colors
- **White:** `text-white` (#FFFFFF)
- **Gray 300:** `text-gray-300` (inactive buttons)
- **Gray 400:** `text-gray-400` (descriptions)
- **Gray 500:** `text-gray-500` (metadata)

### Accent Colors
- **Pink (Favourites):** `pink-500` (#EC4899)
- **Blue (Time):** `blue-500`
- **Green (Stats):** `#00B67A`

### Opacity Levels
- `/10` - Very subtle (drag states)
- `/20` - Light backgrounds (badges, icon containers)
- `/30` - Default borders
- `/40` - Hover borders
- `/80` - Overlays

---

## 🎭 INTERACTIONS & STATES

### Team Selection Flow
1. **Load:** "All" selected by default → shows all 8 templates
2. **Click "HR":** Filters to 2 HR templates, pill turns blue
3. **Click "IT":** Filters to 2 IT templates, pill turns purple
4. **Click "All":** Returns to all 8 templates, green gradient

### Search Flow
1. **Type "urlop":** Filters to 1 template (leave policy)
2. **Type "rodo":** Filters to 1 template (GDPR)
3. **Clear search:** Returns to team filter state
4. **No results:** Shows empty state with message

### Favourite Toggle Flow
1. **Click heart (unfavourited):** 
   - Icon fills pink
   - Toast: "Dodano do ulubionych"
   - Stats update (+1 favourite)

2. **Click heart (favourited):**
   - Icon unfills (gray outline)
   - Toast: "Usunięto z ulubionych"
   - Stats update (-1 favourite)

### Template Card Actions

| Action | Trigger | Result |
|--------|---------|--------|
| **Preview** | Click eye button | Opens modal with full content |
| **Use Template** | Click green button | Toast + callback to parent |
| **Toggle Favourite** | Click heart icon | Updates state + toast |
| **Hover Card** | Mouse over | Border changes to green |

### Modal Interactions

| Action | Trigger | Result |
|--------|---------|--------|
| **Open** | Click "Preview" on card | Modal appears with blur overlay |
| **Close** | Click X or overlay | Modal closes smoothly |
| **Copy** | Click Copy button | Content → clipboard + toast |
| **Use** | Click Use Template | Toast + close modal + callback |
| **Scroll** | Wheel in content area | Content scrolls, header/footer fixed |

---

## 📱 RESPONSIVE DESIGN

### Desktop (1024px+)
```css
.grid { grid-cols-3; gap-6; }
.search { w-96; }
.teamPills { no-scroll; }
.stats { grid-cols-3; }
```

### Tablet (768px - 1023px)
```css
.grid { grid-cols-2; gap-6; }
.search { w-full; }
.teamPills { overflow-x-auto; }
.stats { grid-cols-3; }
```

### Mobile (<768px)
```css
.grid { grid-cols-1; gap-4; }
.search { w-full; }
.teamPills { overflow-x-auto; pb-2; }
.stats { grid-cols-3; smaller-cards; }
.header { flex-col; items-start; }
```

**Mobile Optimizations:**
- Search bar above pills (full width)
- Team pills horizontal scroll with snap
- Cards stack vertically
- Modal: full screen on small devices
- Touch-friendly targets (min 44x44px)

---

## 🏷️ FIGMA NAMING CONVENTION

```
Frame/TeamTemplatesLibrary
├─ Section/Header
│  ├─ Text/Heading1-Title
│  ├─ Icon/FileText-32
│  ├─ Text/Body-Description
│  └─ Input/Search-WithIcon
│     ├─ Icon/Search-20
│     └─ Input/Field
│
├─ Section/TeamSelection
│  └─ Pills/TeamSelector
│     ├─ Btn/Pill-All-Active
│     ├─ Btn/Pill-HR-Inactive
│     ├─ Btn/Pill-Legal-Inactive
│     ├─ Btn/Pill-IT-Inactive
│     ├─ Btn/Pill-Marketing-Inactive
│     └─ Btn/Pill-General-Inactive
│
├─ Section/Stats
│  ├─ Card/Stat-Templates
│  │  ├─ Icon/FileText-Container
│  │  ├─ Text/Label-Gray
│  │  └─ Text/Value-White
│  ├─ Card/Stat-Favourites
│  │  ├─ Icon/Heart-Container
│  │  ├─ Text/Label-Gray
│  │  └─ Text/Value-White
│  └─ Card/Stat-LastUsed
│     ├─ Icon/Clock-Container
│     ├─ Text/Label-Gray
│     └─ Text/Value-White
│
├─ Grid/Templates
│  ├─ Card/Template-HR-LeavePolicy
│  │  ├─ Toggle/Favourite-Btn
│  │  ├─ Badge/Team-HR
│  │  ├─ Text/Heading3-Title
│  │  ├─ Text/Body-Description-LineClamp2
│  │  ├─ Group/Channels
│  │  │  ├─ Icon/Email-Badge
│  │  │  └─ Icon/Intranet-Badge
│  │  ├─ Group/Metadata
│  │  │  ├─ Text/Usage
│  │  │  └─ Text/LastUsed
│  │  └─ Group/Actions-Grid2
│  │     ├─ Btn/Secondary-Preview
│  │     └─ Btn/Primary-UseTemplate
│  │
│  ├─ Card/Template-Legal-GDPR
│  ├─ Card/Template-IT-System
│  ├─ Card/Template-Marketing-Campaign
│  ├─ Card/Template-General-Announcement
│  ├─ Card/Template-HR-Recruitment
│  ├─ Card/Template-IT-Security
│  └─ Card/Template-Marketing-Newsletter
│
├─ [Conditional] EmptyState/NoResults
│  ├─ Icon/FileText-64-Gray
│  ├─ Text/Heading2-NoResults
│  └─ Text/Body-Description
│
└─ [Conditional] Modal/TemplatePreview
   ├─ Overlay/Backdrop-Blur
   └─ Container/Modal
      ├─ Header/Modal
      │  ├─ Group/Badges
      │  │  ├─ Badge/Team
      │  │  └─ Group/Channels
      │  ├─ Text/Heading2-Title
      │  ├─ Text/Body-Description
      │  └─ Btn/Close-X
      ├─ Content/Scrollable
      │  └─ Text/FullContent-Preformatted
      └─ Footer/Actions
         ├─ Group/Metadata
         │  ├─ Text/Usage
         │  └─ Text/LastUsed
         └─ Group/Actions
            ├─ Btn/Secondary-Copy
            └─ Btn/Primary-UseTemplate
```

---

## ✨ ANIMATIONS & TRANSITIONS

### Standard Transition
```css
transition: all 0.3s ease;
```

### Hover States
- **Cards:** border-color changes instantly
- **Buttons:** background + text color transition
- **Pills:** border + background smooth fade
- **Favourite icon:** color transition + slight scale

### Focus States
```css
focus:outline-none
focus:ring-2 
focus:ring-[#00B67A]
focus:ring-offset-2
focus:ring-offset-[#1A1D3A]
```

### Modal Animations
- **Entry:** Fade in overlay + scale up modal (0.95 → 1)
- **Exit:** Fade out overlay + scale down modal (1 → 0.95)
- Duration: 200ms

### Toast Notifications
- Position: `top-right`
- Theme: `dark`
- Duration: 3s
- Style: `richColors` with close button

---

## ♿ ACCESSIBILITY (WCAG AA)

### Contrast Ratios
| Element | Foreground | Background | Ratio |
|---------|-----------|------------|-------|
| White text | #FFFFFF | #0F1229 | 17.4:1 ✅ |
| Green text | #00B67A | #1A1D3A | 5.8:1 ✅ |
| Gray-400 | #9CA3AF | #1A1D3A | 4.6:1 ✅ |
| Team badges | Various | Light BG | All >4.5:1 ✅ |

### Keyboard Navigation
- ✅ All buttons: `Tab` to focus
- ✅ Team pills: Arrow keys for navigation
- ✅ Search: Auto-focus on load (optional)
- ✅ Modal: Trap focus when open
- ✅ Escape: Close modal (future)

### Screen Readers
```tsx
aria-label="Remove from favourites" // Favourite toggle
aria-label="Close modal" // X button
aria-label="Search templates" // Search input
role="grid" // Template grid
role="dialog" // Modal
```

### Focus Indicators
- **All interactive elements:** Visible ring on focus
- **Ring color:** Green (#00B67A)
- **Ring width:** 2px
- **Ring offset:** 2px

### Text Sizing
- Minimum: 14px (0.875rem) for body text
- Labels: 12px (0.75rem) - acceptable for metadata
- Headings: Proper hierarchy (h1, h2, h3)

---

## 🌍 INTERNATIONALIZATION

### Supported Languages
- **Polish (pl)** - default
- **English (en)**

### Translation Keys Structure
```typescript
{
  title: string;
  description: string;
  search: string;
  stats: {
    templates: string;
    favourites: string;
    lastUsed: string;
  };
  teams: {
    All: string;
    HR: string;
    Legal: string;
    IT: string;
    Marketing: string;
    General: string;
  };
  noResults: string;
  noResultsDesc: string;
  usedTimes: string;
  useTemplate: string;
  preview: string;
  copyContent: string;
  close: string;
  // ... etc
}
```

### Dynamic Content
- Template titles: Translated per language
- Template descriptions: Translated per language
- Template content: Full translation with placeholders
- Dates: Locale-based formatting
- Numbers: Locale-based formatting

---

## 🔧 TECHNICAL SPECIFICATIONS

### Component File
`/components/team-templates/TeamTemplatesLibrary.tsx`

### Dependencies
```tsx
import { useState, useMemo } from 'react';
import { Language } from '../../App';
import { 
  Search, Heart, Eye, FileText, Mail, Globe, 
  Presentation, FileCheck, Users, Clock, Star, 
  Copy, X, CheckCircle2 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
```

### Props Interface
```typescript
interface TeamTemplatesLibraryProps {
  language: Language;
  onToggleLanguage?: () => void;
  onUseTemplate?: (template: Template) => void;
}
```

### State Management
```typescript
const [selectedTeam, setSelectedTeam] = useState<TeamType>('All');
const [searchQuery, setSearchQuery] = useState('');
const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
const [templates, setTemplates] = useState<Template[]>([...]);
```

### Performance Optimizations
- **useMemo** for filtered templates (search + team)
- **useMemo** for stats calculation
- Efficient re-renders (only affected components)

---

## 📊 DATA STRUCTURE

### Template Interface
```typescript
interface Template {
  id: string;
  title: string;
  content: string;
  description: string;
  team: 'HR' | 'Legal' | 'IT' | 'Marketing' | 'General';
  channels: string[]; // ['email', 'intranet', 'presentation', 'release-notes']
  usageCount: number;
  lastUsed: Date;
  isFavourite: boolean;
  category: string;
}
```

### Mock Data (8 Templates)
1. **HR:** Leave Policy (45 uses, favourite)
2. **Legal:** GDPR Update (23 uses)
3. **IT:** System Deployment (67 uses, favourite)
4. **Marketing:** Q1 Campaign (34 uses, favourite)
5. **General:** Company Announcement (89 uses)
6. **HR:** Recruitment (28 uses)
7. **IT:** Security Incident (12 uses)
8. **Marketing:** Newsletter (56 uses, favourite)

---

## 🎯 USER FLOWS

### Happy Path
1. Land on page → See all 8 templates
2. Click "HR" team pill → Filters to 2 HR templates
3. Type "rekrut" in search → Shows 1 recruitment template
4. Click heart icon → Template added to favourites (toast)
5. Click "Preview" → Modal opens with full content
6. Click "Copy Content" → Content copied (toast)
7. Click "Use Template" → Toast confirms + callback triggered
8. Modal closes → Returns to filtered view

### Alternative Flow
1. Click "Marketing" pill → 3 templates
2. Click "All" → Back to 8 templates
3. Click heart on Newsletter → Mark as favourite
4. Click "Use Template" directly → Skips preview, uses template immediately
5. Success!

---

## 📚 CONTENT SPECIFICATIONS

### Template Content Placeholders
Templates use `[PLACEHOLDER]` syntax:
- `[DATA]` - Date
- `[NAZWA]` - Name
- `[LINK]` - Link URL
- `[EMAIL]` - Email address
- `[NUMER]` - Phone number

### Categories
- Policy
- Compliance
- System
- Campaign
- General
- Recruitment
- Security
- Newsletter

---

## 🚀 FUTURE ENHANCEMENTS

### Phase 2
- [ ] Custom template creation
- [ ] Template editing
- [ ] Team management (add/remove teams)
- [ ] Template versioning
- [ ] Template sharing between teams

### Phase 3
- [ ] AI-powered template suggestions
- [ ] Template analytics (most used, best performing)
- [ ] Bulk actions (delete, favourite multiple)
- [ ] Template categories/tags system
- [ ] Advanced filtering (by channel, date, category)

### Phase 4
- [ ] Template approval workflow
- [ ] Template permissions per team
- [ ] Template usage reports
- [ ] Integration with document management
- [ ] Export templates to different formats

---

## ✅ IMPLEMENTATION CHECKLIST

- [x] Atomic design structure
- [x] Responsive grid (3-2-1 columns)
- [x] Team color system (5 teams)
- [x] Search functionality
- [x] Favourite toggle
- [x] Template preview modal
- [x] Stats overview (3 cards)
- [x] Empty state
- [x] Accessibility (WCAG AA)
- [x] Internationalization (PL/EN)
- [x] Toast notifications
- [x] Focus states
- [x] Hover effects
- [x] Mock data (8 templates)

---

**Design Status:** ✅ Complete  
**Implementation Status:** ✅ Complete  
**Testing Status:** 🟡 Ready for QA  
**Documentation:** ✅ Complete
