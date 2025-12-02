# Quick Reference Guide - TeamMessage

## 🚀 Szybki Start

### Najczęściej Używane Klasy

```tsx
// Focus states
className="focus-ring-primary"
className="focus-ring-primary-offset"

// Touch targets (44x44px minimum)
className="touch-target"
className="min-h-[44px] min-w-[44px]"

// Status badges
className="badge-success"  // zielony
className="badge-warning"  // żółty
className="badge-error"    // czerwony
className="badge-info"     // niebieski

// Team badges
className="team-hr"        // niebieski (HR)
className="team-legal"     // fioletowy (Prawny)
className="team-it"        // zielony (IT)
className="team-marketing" // pomarańczowy (Marketing)
className="team-general"   // szary (Ogólny)
```

## 🎨 Kolory

### Primary (Żabka Green)
```tsx
bg-[#00B67A]
text-[#00B67A]
border-[#00B67A]
```

### Dark Mode Backgrounds
```tsx
bg-[#0F1229]  // Primary
bg-[#1A1D3A]  // Secondary
bg-[#252840]  // Tertiary
```

### Light Mode Backgrounds
```tsx
bg-white      // Primary
bg-[#F9FAFB]  // Secondary
bg-[#F3F4F6]  // Tertiary
```

## ✅ WCAG Compliant Colors

### Zawsze używaj warunkowych kolorów:

```tsx
// ✅ DOBRZE
className={theme === 'dark' ? 'text-red-400' : 'text-red-700'}
className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}
className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}

// LUB użyj klas utility
className="badge-error"
className="badge-warning"
className="badge-info"

// ❌ ŹLE
className="text-red-400"
className="text-yellow-400"
```

## 📱 Responsive Breakpoints

```tsx
// Mobile first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="flex flex-col sm:flex-row"
className="hidden lg:block"
className="text-sm md:text-base lg:text-lg"
```

## 🔘 Przyciski

### Primary Button
```tsx
<button className="
  bg-gradient-to-r from-[#10B981] to-[#059669]
  hover:from-[#059669] hover:to-[#047857]
  text-white rounded-xl px-6 py-3
  transition-all
  focus-ring-primary-offset
  touch-target
">
  Kliknij
</button>
```

### Secondary Button
```tsx
<button className={`
  rounded-xl px-6 py-3
  border transition-all
  focus-ring-primary
  touch-target
  ${theme === 'dark'
    ? 'bg-[#1A1D3A] hover:bg-[#252840] border-[#00B67A]/30 text-white'
    : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-900'
  }
`}>
  Kliknij
</button>
```

### Danger Button
```tsx
<button className={`
  rounded-xl px-6 py-3
  border transition-all
  focus-ring-primary
  touch-target
  ${theme === 'dark'
    ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20 border-red-500/30'
    : 'text-red-700 hover:text-red-800 hover:bg-red-50 border-red-300'
  }
`}>
  Usuń
</button>
```

## 📝 Input Fields

```tsx
<input
  type="text"
  className={`
    w-full rounded-xl px-4 py-3
    border transition-colors
    focus-ring-primary
    ${theme === 'dark'
      ? 'bg-[#374151] border-[#4B5563] text-white placeholder-gray-500'
      : 'bg-[#F9FAFB] border-[#D1D5DB] text-gray-900 placeholder-gray-400'
    }
  `}
  placeholder="Wpisz tekst..."
/>
```

## ☑️ Checkboxy

```tsx
// Używaj CustomCheckbox z /components/ui/custom-checkbox
<CustomCheckbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Zaznacz mnie"
/>

// LUB standardowy checkbox (ma automatyczne style z globals.css)
<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

## 🏷️ Badges

### Team Badge
```tsx
<span className={`
  px-3 py-1 rounded-full text-sm border
  ${
    team === 'HR' ? 'team-hr' :
    team === 'Dział Prawny' ? 'team-legal' :
    team === 'IT & Tech' ? 'team-it' :
    team === 'Marketing' ? 'team-marketing' :
    'team-general'
  }
`}>
  {team}
</span>
```

### Status Badge
```tsx
<div className={`
  px-3 py-1 rounded-full text-xs
  ${
    status === 'success' ? 'bg-[#00B67A]/20 badge-success' :
    status === 'warning' ? 'bg-yellow-500/20 badge-warning' :
    status === 'error' ? 'bg-red-500/20 badge-error' :
    'bg-blue-500/20 badge-info'
  }
`}>
  {statusText}
</div>
```

## 🎯 Accessibility

### Aria Labels (przyciski bez tekstu)
```tsx
<button aria-label="Zamknij okno">
  <X className="w-5 h-5" />
</button>
```

### Aria Labels (inputy)
```tsx
<input
  type="email"
  aria-label="Adres email"
  placeholder="email@example.com"
/>
```

### Role dla interaktywnych divów
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Kliknij aby otworzyć"
>
  Zawartość
</div>
```

## 🌐 Tłumaczenia

```tsx
const translations = {
  pl: {
    title: 'Tytuł',
    description: 'Opis',
    save: 'Zapisz',
    cancel: 'Anuluj'
  },
  en: {
    title: 'Title',
    description: 'Description',
    save: 'Save',
    cancel: 'Cancel'
  }
};

const t = translations[language];
```

## 📅 Formatowanie Dat

```tsx
// ✅ DOBRZE - z locale
date.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// ❌ ŹLE - bez locale
date.toLocaleDateString()
```

## 🎭 Ikony (lucide-react)

```tsx
import { Mail, User, Settings, X, Check } from 'lucide-react';

// Użycie
<Mail className="w-5 h-5 text-[#00B67A]" />

// Rozmiary
className="w-4 h-4"  // 16px (small)
className="w-5 h-5"  // 20px (medium)
className="w-6 h-6"  // 24px (large)
className="w-8 h-8"  // 32px (xl)
```

## 🔔 Toast Notifications

```tsx
import { toast } from 'sonner';

// Success
toast.success(language === 'pl' ? 'Zapisano!' : 'Saved!');

// Error
toast.error(language === 'pl' ? 'Błąd!' : 'Error!');

// Info
toast.info(language === 'pl' ? 'Informacja' : 'Information');

// Warning
toast.warning(language === 'pl' ? 'Uwaga!' : 'Warning!');
```

## 🎨 Gradienty

### Background Gradients
```tsx
// Dark mode
className="bg-gradient-to-br from-[#1A1D3A] to-[#252840]"

// Light mode
className="bg-gradient-to-br from-white to-gray-50"

// Conditional
className={`${
  theme === 'dark'
    ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
    : 'bg-gradient-to-br from-white to-gray-50'
}`}
```

### Button Gradients
```tsx
className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857]"
```

## 📊 Listy (Keys)

```tsx
// ✅ DOBRZE - unique ID
{messages.map(message => (
  <div key={message.id}>
    {message.title}
  </div>
))}

// ❌ ŹLE - index
{messages.map((message, index) => (
  <div key={index}>
    {message.title}
  </div>
))}
```

## 🔍 Conditional Rendering

```tsx
// Short circuit
{isVisible && <Component />}

// Ternary
{isVisible ? <ComponentA /> : <ComponentB />}

// Nullish coalescing
{value ?? 'Default value'}

// Optional chaining
{user?.name ?? 'Anonymous'}
```

## 💡 Szybkie Tipsy

### 1. Zawsze sprawdzaj kontrast
```bash
# Minimum dla tekstu: 4.5:1
# Minimum dla UI: 3:1
```

### 2. Minimum touch targets
```tsx
// Zawsze używaj dla przycisków i linków
className="min-h-[44px] min-w-[44px]"
// LUB
className="touch-target"
```

### 3. Focus states
```tsx
// Nigdy nie używaj sam
className="focus:outline-none"

// Zawsze z ring
className="focus:outline-none focus:ring-2 focus:ring-[#00B67A]"

// LUB użyj utility class
className="focus-ring-primary"
```

### 4. Dark/Light mode
```tsx
// Zawsze sprawdzaj czy element ma wariant dla obu trybów
${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
```

### 5. TypeScript
```tsx
// Zawsze typuj props
interface ComponentProps {
  language: Language;
  theme?: 'light' | 'dark';
  onClose?: () => void;
}
```

## 📁 Struktura Projektu

```
/
├── App.tsx                    # Główny komponent
├── components/
│   ├── ai-draft-generator/   # Generator AI
│   ├── approval/             # System zatwierdzania
│   ├── auth/                 # Autoryzacja
│   ├── dashboard/            # Dashboard
│   ├── distribution-channels/# Kanały dystrybucji
│   ├── document-wizard/      # Kreator dokumentów
│   ├── layout/               # Layout (Sidebar, TopNav)
│   ├── messages/             # Lista wiadomości
│   ├── preview/              # Podgląd dokumentów
│   ├── publication-scheduler/# Harmonogram publikacji
│   ├── settings/             # Ustawienia
│   ├── slidedeck/           # Generator prezentacji
│   ├── team-templates/      # Szablony zespołów
│   ├── ui/                  # Komponenty UI
│   └── utils/               # Utilities
├── styles/
│   └── globals.css          # Style globalne + utilities
├── imports/                 # SVG importy z Figma
├── OPTIMIZATION_REPORT.md   # Raport optymalizacji
├── DEVELOPMENT_GUIDELINES.md# Wytyczne deweloperskie
├── DESIGN_TOKENS.md         # Design tokens
└── QUICK_REFERENCE.md       # Ten plik
```

## 🔗 Przydatne Linki

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Tip**: Zapisz ten plik jako bookmark lub wydrukuj dla szybkiego dostępu! 🚀
