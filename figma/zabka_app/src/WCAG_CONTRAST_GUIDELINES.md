# WCAG Contrast Guidelines for TeamMessage

## Wymagania kontrastu zgodnie z WCAG 2.1 Level AA

- **Tekst normalny (< 18pt)**: minimum 4.5:1
- **Tekst duży (≥ 18pt lub ≥ 14pt bold)**: minimum 3:1
- **Elementy interaktywne i UI**: minimum 3:1

## Rekomendowane kolory tekstu

### Dark Mode (tło: #0A0F1E, #1A1D3A)

| Zastosowanie | Klasa Tailwind | Kolor hex | Kontrast | WCAG |
|--------------|---------------|-----------|----------|------|
| Tekst główny | `text-white` | #FFFFFF | 19.5:1 | ✅ AAA |
| Tekst drugorzędny | `text-gray-300` | #D1D5DB | ~10:1 | ✅ AAA |
| Tekst pomocniczy | `text-gray-400` | #9CA3AF | ~6:1 | ✅ AA |
| Placeholder/disabled | `text-gray-500` | #6B7280 | ~4:1 | ✅ AA (minimum) |

### Light Mode (tło: #FFFFFF)

| Zastosowanie | Klasa Tailwind | Kolor hex | Kontrast | WCAG |
|--------------|---------------|-----------|----------|------|
| Tekst główny | `text-gray-900` | #111827 | 18.6:1 | ✅ AAA |
| Tekst drugorzędny | `text-gray-600` | #4B5563 | 7.2:1 | ✅ AAA |
| Tekst pomocniczy | `text-gray-500` | #6B7280 | 5.3:1 | ✅ AA |
| Placeholder/disabled | `text-gray-400` | #9CA3AF | 3.8:1 | ⚠️  Granica AA |

## Kolory Żabki - weryfikacja kontrastu

### Główny zielony (#00B67A)

- **Na ciemnym tle (#0A0F1E)**: ~6.5:1 ✅ AA (dobrze dla tekstu)
- **Na białym tle**: ~3.2:1 ⚠️  Tylko dla dużego tekstu lub elementów UI
- **Tekst biały na #00B67A**: ~3.4:1 ⚠️  Tylko dla dużego tekstu

### Jaśniejszy zielony (#10B981)

- **Na ciemnym tle (#0A0F1E)**: ~7.8:1 ✅ AAA
- **Na białym tle**: ~2.7:1 ❌ Za niski dla tekstu
- **Tekst biały na #10B981**: ~4.5:1 ✅ AA

## Wzorce do stosowania

### 1. Tekst główny (nagłówki, treść główna)
```tsx
className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
```

### 2. Tekst drugorzędny (opisy, podpisy, labels)
```tsx
className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
```

### 3. Tekst pomocniczy (metadane, timestamps)
```tsx
className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
```

### 4. Placeholder / Disabled
```tsx
className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
```

## Klasy pomocnicze (zdefiniowane w globals.css)

```tsx
// Primary text - najwyższy kontrast
text-primary-contrast

// Secondary text - WCAG AA (4.5:1)
text-secondary-contrast

// Tertiary/helper - nadal WCAG compliant
text-tertiary-contrast

// Disabled/placeholder - może być niższy kontrast
text-disabled-contrast
```

## Sprawdzanie kontrastu

Narzędzia online:
- https://webaim.org/resources/contrastchecker/
- https://contrast-ratio.com/
- Chrome DevTools - Lighthouse Accessibility Audit

## Kluczowe poprawki do zaimplementowania

### Priorytet WYSOKI
1. Zamienić `text-gray-400` → `text-gray-300` w dark mode dla WSZYSTKICH:
   - Labels formularzy
   - Opisy pól
   - Napisy pomocnicze
   - Metadane dokumentów

### Priorytet ŚREDNI
2. Sprawdzić przyciski i linki:
   - Upewnić się że hover/focus states mają wystarczający kontrast
   - Zielony tekst na ciemnym tle: OK
   - Zielony tekst na białym tle: tylko dla dużych przycisków

### Priorytet NISKI
3. Dekoracyjne elementy:
   - Mogą mieć niższy kontrast (nie niosą treści)
   - Dividers, borders itp.

## Status implementacji

- [x] Dodano klasy pomocnicze w globals.css
- [ ] Zaktualizowano PublicationScheduler
- [ ] Zaktualizowano Dashboard  
- [ ] Zaktualizowano MessageCreator
- [ ] Zaktualizowano DocumentUpload
- [ ] Zaktualizowano ChannelSelection
- [ ] Zaktualizowano wszystkie komponenty modal/dialog
- [ ] Przeprowadzono audit z Lighthouse
