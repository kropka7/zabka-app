# Development Guidelines - TeamMessage

## Standardy Kodowania

### 1. Kolory i WCAG

#### Używanie Kolorów dla Status Badges
Zawsze używaj warunkowych kolorów dla różnych trybów:

```tsx
// ✅ DOBRZE
className={theme === 'dark' ? 'text-red-400' : 'text-red-700'}

// ❌ ŹLE
className="text-red-400"
```

#### Używanie Nowych Klas Utility

```tsx
// ✅ DOBRZE - używaj nowych klas
className="badge-error"
className="badge-warning"
className="badge-success"
className="team-hr"
className="team-legal"

// ❌ ŹLE - nie powtarzaj kodu
className={theme === 'dark' ? 'text-red-400' : 'text-red-700'}
```

### 2. Dostępność (WCAG 2.1 AA)

#### Minimalne Rozmiary Touch Targets
Wszystkie interaktywne elementy muszą mieć minimum 44x44px:

```tsx
// ✅ DOBRZE
className="min-h-[44px] min-w-[44px]"
// lub
className="touch-target"
```

#### Aria Labels
Przyciski bez widocznego tekstu muszą mieć aria-label:

```tsx
// ✅ DOBRZE
<button aria-label="Zamknij okno dialogowe">
  <X className="w-5 h-5" />
</button>

// ❌ ŹLE
<button>
  <X className="w-5 h-5" />
</button>
```

#### Input Labels
Wszystkie inputy muszą mieć label lub aria-label:

```tsx
// ✅ DOBRZE
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// LUB
<input type="email" aria-label="Adres email" />
```

#### Focus States
Wszystkie interaktywne elementy muszą mieć widoczny focus state:

```tsx
// ✅ DOBRZE
className="focus-ring-primary"
className="focus:outline-none focus:ring-2 focus:ring-[#00B67A]"

// ❌ ŹLE
className="focus:outline-none" // bez focus ring
```

### 3. Kontrast Kolorów

#### Wymagania Minimalne
- Tekst normalny: 4.5:1
- Tekst duży (18px+): 3:1
- Elementy UI: 3:1

#### Zatwierdzóne Kombinacje

| Typ | Dark Mode | Light Mode | Ratio Dark | Ratio Light |
|-----|-----------|------------|------------|-------------|
| Warning | yellow-400 | yellow-700 | 4.5:1 ✅ | 5.2:1 ✅ |
| Error | red-400 | red-700 | 4.6:1 ✅ | 5.8:1 ✅ |
| Success | #00B67A | #00B67A | 4.8:1 ✅ | 4.9:1 ✅ |
| Info | blue-400 | blue-700 | 4.5:1 ✅ | 5.5:1 ✅ |

### 4. TypeScript

#### Props Interface
Zawsze definiuj interfejsy dla props:

```tsx
// ✅ DOBRZE
interface ComponentProps {
  language: Language;
  theme?: 'light' | 'dark';
  onClose?: () => void;
}

export function Component({ language, theme = 'dark', onClose }: ComponentProps) {
  // ...
}
```

#### Type Safety
Używaj typów zamiast any:

```tsx
// ✅ DOBRZE
const [messages, setMessages] = useState<Message[]>([]);

// ❌ ŹLE
const [messages, setMessages] = useState<any>([]);
```

### 5. Responsive Design

#### Breakpointy
Używaj standardowych breakpointów Tailwind:

```tsx
// Mobile first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="flex flex-col sm:flex-row"
```

#### Priorytety
1. Mobile (domyślnie)
2. Tablet (md:)
3. Desktop (lg:)
4. Wide desktop (xl:)

### 6. Wydajność

#### React Keys
Zawsze używaj unikalnych key w listach:

```tsx
// ✅ DOBRZE
{messages.map(message => (
  <div key={message.id}>
    {message.title}
  </div>
))}

// ❌ ŹLE
{messages.map((message, index) => (
  <div key={index}>
    {message.title}
  </div>
))}
```

#### Memo i Callbacks
Dla dużych list rozważ użycie React.memo:

```tsx
// ✅ DOBRZE dla dużych list
const MessageItem = React.memo(({ message, onClick }: Props) => {
  return <div onClick={() => onClick(message.id)}>{message.title}</div>;
});
```

### 7. Formatowanie Dat

Zawsze używaj locale-aware formatowania:

```tsx
// ✅ DOBRZE
date.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// ❌ ŹLE
date.toLocaleDateString() // używa locale przeglądarki
```

### 8. Placeholders

Placeholdery mogą mieć niższy kontrast:

```tsx
// ✅ DOPUSZCZALNE
className={theme === 'dark' 
  ? 'placeholder-gray-500' 
  : 'placeholder-gray-400'
}
```

### 9. Console Logs

#### Rozwój vs Produkcja

```tsx
// ✅ DOBRZE - tylko w rozwoju
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// ❌ ŹLE - w produkcji
console.log('User data:', data);
```

#### Debugging
Usuń wszystkie console.log przed commitem do produkcji.

### 10. Error Handling

#### Toast Notifications
Używaj spójnych komunikatów:

```tsx
// ✅ DOBRZE
toast.success(language === 'pl' ? 'Zapisano' : 'Saved');
toast.error(language === 'pl' ? 'Błąd' : 'Error');

// ❌ ŹLE
toast.success('Saved'); // tylko po angielsku
```

## Checklist Przed Commitem

- [ ] Wszystkie kolory mają warianty dla dark/light mode
- [ ] Wszystkie interaktywne elementy mają min 44x44px
- [ ] Wszystkie przyciski/inputy bez tekstu mają aria-label
- [ ] Kontrast minimum 4.5:1 dla tekstu
- [ ] Brak console.log w kodzie produkcyjnym
- [ ] Wszystkie listy mają unique keys
- [ ] TypeScript nie pokazuje błędów
- [ ] Komponent jest responsywny (mobile, tablet, desktop)
- [ ] Focus states są widoczne
- [ ] Testy accessibility przechodzą

## Narzędzia Testowe

### WCAG Contrast
- WebAIM Contrast Checker
- Chrome DevTools Accessibility Panel

### Keyboard Navigation
1. Tab przez wszystkie interaktywne elementy
2. Enter/Space aktywuje przyciski
3. Escape zamyka dialogi

### Screen Readers
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS)

### Responsive
- Chrome DevTools Device Mode
- Fizyczne urządzenia iOS/Android

## Struktura Komponentów

```
/components
  /[feature-name]
    FeatureComponent.tsx
  /ui
    button.tsx
    custom-checkbox.tsx
  /layout
    Sidebar.tsx
    TopNav.tsx
  /utils
    teamIcons.tsx
```

## Git Workflow

### Commit Messages
```
feat: Add new channel configuration panel
fix: Correct WCAG contrast in badges
style: Update team colors for light mode
refactor: Extract team badge logic to utility class
docs: Update development guidelines
```

### Branch Naming
```
feature/channel-config-panel
fix/wcag-contrast-badges
refactor/team-badge-classes
```

## Performance Budgets

- Lighthouse Performance Score: > 90
- Accessibility Score: 100
- Bundle Size: < 500KB gzipped
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

## Bezpieczeństwo

### Dane Użytkownika
- Nigdy nie loguj wrażliwych danych
- Używaj environment variables dla API keys
- Sanityzuj user input przed wyświetleniem

### API Calls
```tsx
// ✅ DOBRZE - z error handling
try {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
} catch (error) {
  toast.error('Nie udało się pobrać danych');
  console.error('API Error:', error);
}
```

---

**Wersja**: 1.0  
**Ostatnia aktualizacja**: 2 grudnia 2024  
**Maintainer**: TeamMessage Development Team
