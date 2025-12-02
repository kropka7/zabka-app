# TeamMessage UI System Documentation

## Przegląd
Zunifikowany system komponentów UI dla aplikacji TeamMessage, zapewniający spójność wizualną i dostępność WCAG 2.1 AA.

## Komponenty UI

### 1. Button (`/components/ui/Button.tsx`)

Zunifikowany komponent przycisku z różnymi wariantami i rozmiarami.

**Warianty:**
- `primary` - Główny przycisk z gradientem zieleni Żabka
- `secondary` - Przycisk wtórny z obramowaniem
- `danger` - Przycisk dla destrukcyjnych akcji
- `ghost` - Przycisk transparentny
- `success` - Przycisk sukcesu w kolorze Żabka

**Rozmiary:**
- `sm` - Mały (36px wysokości)
- `md` - Średni (44px wysokości) - domyślny
- `lg` - Duży (52px wysokości)

**Przykład użycia:**
```tsx
import { Button } from '../ui';

<Button variant="primary" size="md" icon={<Plus />} onClick={handleClick}>
  Dodaj dokument
</Button>
```

### 2. Card (`/components/ui/Card.tsx`)

System kart z opcjonalnymi header, body i footer.

**Komponenty:**
- `Card` - Główny kontener karty
- `CardHeader` - Nagłówek z opcjonalną akcją
- `CardBody` - Główna treść
- `CardFooter` - Stopka

**Padding:**
- `none` - Brak paddingu
- `sm` - 16px
- `md` - 24px (domyślny)
- `lg` - 32px

**Przykład użycia:**
```tsx
import { Card, CardHeader, CardBody } from '../ui';

<Card theme={theme} padding="md" hover onClick={handleClick}>
  <CardHeader theme={theme} action={<Button>Action</Button>}>
    Tytuł karty
  </CardHeader>
  <CardBody>
    Treść karty
  </CardBody>
</Card>
```

### 3. Badge (`/components/ui/Badge.tsx`)

System odznak z różnymi wariantami.

**Typy:**
- `Badge` - Podstawowa odznaka
- `TeamBadge` - Odznaka zespołu z kolorami
- `StatusBadge` - Odznaka statusu dokumentu

**Warianty Badge:**
- `success` - Sukces (zielony)
- `warning` - Ostrzeżenie (żółty)
- `error` - Błąd (czerwony)
- `info` - Informacja (niebieski)
- `neutral` - Neutralny (szary)

**Przykład użycia:**
```tsx
import { StatusBadge, TeamBadge } from '../ui';

<StatusBadge status="published" theme={theme} size="sm" />
<TeamBadge team="HR" theme={theme} />
```

### 4. Input (`/components/ui/Input.tsx`)

Zunifikowane pola formularzy.

**Komponenty:**
- `Input` - Pole tekstowe
- `Textarea` - Pole wieloliniowe
- `Select` - Lista rozwijana

**Props:**
- `label` - Etykieta pola
- `error` - Komunikat błędu
- `helperText` - Tekst pomocniczy
- `icon` - Ikona wewnątrz pola
- `fullWidth` - Szerokość 100%

**Przykład użycia:**
```tsx
import { Input } from '../ui';
import { Mail } from 'lucide-react';

<Input
  label="Email"
  type="email"
  icon={<Mail className="w-5 h-5" />}
  error={errors.email}
  helperText="Wpisz adres email"
  theme={theme}
  fullWidth
/>
```

### 5. StatCard (`/components/ui/StatCard.tsx`)

Karta statystyk dla Dashboard.

**Props:**
- `label` - Etykieta statystyki
- `value` - Wartość
- `icon` - Ikona (Lucide Icon)
- `color` - Kolor (blue, green, yellow, purple, orange, red)
- `change` - Zmiana procentowa
- `trend` - Trend (up/down)
- `changeLabel` - Etykieta zmiany

**Przykład użycia:**
```tsx
import { StatCard } from '../ui';
import { MessageSquare } from 'lucide-react';

<StatCard
  label="Total Messages"
  value="124"
  icon={MessageSquare}
  color="blue"
  change="+12%"
  trend="up"
  changeLabel="vs last week"
  theme={theme}
  onClick={handleClick}
/>
```

### 6. ProgressBar (`/components/ui/ProgressBar.tsx`)

Pasek postępu z etykietami.

**Props:**
- `value` - Aktualna wartość
- `max` - Wartość maksymalna (domyślnie 100)
- `label` - Etykieta
- `valueLabel` - Etykieta wartości
- `color` - Kolor paska
- `showPercentage` - Pokazuj procent
- `size` - Rozmiar (sm, md, lg)

**Przykład użycia:**
```tsx
import { ProgressBar } from '../ui';

<ProgressBar
  label="HR Messages"
  value={42}
  max={100}
  valueLabel="42"
  color="bg-blue-500"
  theme={theme}
  size="md"
/>
```

### 7. EmptyState (`/components/ui/EmptyState.tsx`)

Stan pusty z ikoną i akcjami.

**Props:**
- `icon` - Ikona
- `title` - Tytuł
- `description` - Opis
- `action` - Główna akcja {label, onClick}
- `secondaryAction` - Akcja wtórna {label, onClick}

**Przykład użycia:**
```tsx
import { EmptyState } from '../ui';
import { FileText } from 'lucide-react';

<EmptyState
  icon={<FileText className="w-12 h-12" />}
  title="Brak dokumentów"
  description="Nie masz jeszcze żadnych dokumentów"
  theme={theme}
  action={{
    label: "Stwórz dokument",
    onClick: handleCreate
  }}
/>
```

## Kolory Zespołów

Każdy zespół ma przypisany unikalny kolor zgodny z WCAG:

- **HR** - Niebieski (`#3B82F6`)
- **Dział Prawny** - Fioletowy (`#A855F7`)
- **IT & Tech** - Zielony (`#10B981`)
- **Marketing** - Pomarańczowy (`#F97316`)
- **Ogólny** - Szary (`#6B7280`)

## Statusy Dokumentów

- **draft** - Szkic (szary)
- **published** - Opublikowany (zielony emerald)
- **scheduled** - Zaplanowany (fioletowy)
- **pending-approval** - Oczekuje na akceptację (żółty)
- **ready-to-publish** - Gotowy do publikacji (niebieski)

## Spacing System

Spójny system odstępów:
- `gap-2` - 8px
- `gap-3` - 12px
- `gap-4` - 16px
- `gap-6` - 24px
- `gap-8` - 32px

## Padding System

- Card padding: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Section padding: `px-4 sm:px-6 lg:px-8`
- Vertical spacing: `py-2`, `py-3`, `py-4`

## Border Radius

- `rounded-xl` - 12px (przyciski, inputy, małe karty)
- `rounded-2xl` - 16px (główne karty)
- `rounded-full` - Koła (badges, avatary)

## Shadow System

- Light mode: `shadow-sm`, `shadow`, `shadow-lg`
- Dark mode: Cienie z kolorami (np. `shadow-[#10B981]/30`)

## Transition

Wszystkie interaktywne elementy: `transition-all duration-200 ease-in-out`

## Focus States

Wszystkie interaktywne elementy:
```css
focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2
```

## Hover States

- Przyciski: zmiana koloru tła/obramowania
- Karty: `hover:border-[#10B981]`
- Linki: `hover:underline` lub zmiana koloru

## Accessibility

- Minimalne minimum 44px dla touchable elements
- Kontrast 4.5:1 dla tekstu
- Kontrast 3:1 dla komponentów UI
- Aria-labels dla wszystkich akcji
- Focus visible dla nawigacji klawiaturowej

## Import

Wszystkie komponenty UI można importować z jednego miejsca:

```tsx
import { 
  Button, 
  Card, 
  Badge, 
  Input, 
  StatCard, 
  EmptyState 
} from '../ui';
```

## Best Practices

1. **Zawsze używaj theme prop** - przekazuj `theme={theme}` do wszystkich komponentów
2. **Spójne spacing** - używaj gap-4, gap-6, gap-8 dla odstępów
3. **Minimum 44px dla touchable** - wszystkie przyciski i linki
4. **Spójne rounded** - używaj rounded-xl dla małych, rounded-2xl dla dużych
5. **Zawsze dodawaj hover states** - dla lepszej UX
6. **Używaj StatusBadge zamiast custom** - dla spójności statusów
7. **Używaj TeamBadge zamiast custom** - dla spójności zespołów
8. **Card zamiast div** - dla spójnych kart
9. **Button zamiast button** - dla spójnych przycisków
10. **Input zamiast input** - dla spójnych pól formularzy

## Migration Guide

Aby zmigr Ować istniejący kod:

**Przed:**
```tsx
<button className="px-6 py-3 bg-[#10B981] rounded-xl">
  Click me
</button>
```

**Po:**
```tsx
<Button variant="primary">Click me</Button>
```

**Przed:**
```tsx
<div className="rounded-2xl p-6 border bg-[#1F2937]">
  Content
</div>
```

**Po:**
```tsx
<Card theme={theme} padding="md">
  Content
</Card>
```
