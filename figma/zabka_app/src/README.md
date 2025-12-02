# TeamMessage

<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/WCAG-AA-10B981?style=for-the-badge" alt="WCAG AA" />
</div>

## 📋 O Projekcie

**TeamMessage** to kompleksowa aplikacja webowa stworzona dla zespołów wewnętrznych do zarządzania komunikacją firmową. Umożliwia tworzenie, edycję i dystrybucję dokumentów oraz komunikatów przez różne kanały (email, intranet, release notes, prezentacje, media społecznościowe).

### ✨ Kluczowe Funkcjonalności

- 🎨 **Dark/Light Mode** - pełne wsparcie dla jasnego i ciemnego motywu z płynnym przełączaniem
- 🌍 **Dwujęzyczność** - interfejs dostępny w języku polskim i angielskim
- 📝 **Zarządzanie dokumentami** - tworzenie, edycja, publikacja i planowanie komunikatów
- 👥 **Podział na zespoły** - HR, Dział Prawny, IT & Tech, Marketing, Ogólny (każdy z unikalnym kolorem i ikoną)
- 📤 **Multi-kanałowa dystrybucja** - Email, Intranet, Release Notes, Prezentacje, Social Media
- 🤖 **AI Generator** - automatyczne generowanie szkiców dokumentów
- 📊 **Dashboard** - przejrzysty przegląd statystyk i aktywności
- ✅ **System akceptacji** - workflow do zatwierdzania dokumentów
- 📅 **Harmonogram** - planowanie publikacji komunikatów
- 🎤 **Generator prezentacji** - automatyczne tworzenie slide decks
- ♿ **Dostępność** - zgodność z WCAG AA (kontrast min. 4.5:1)

## 🚀 Technologie

- **React 18** - biblioteka do budowy interfejsu użytkownika
- **TypeScript** - typowanie statyczne
- **Tailwind CSS 4** - utility-first CSS framework
- **Lucide React** - zestaw ikon
- **React DnD** - drag & drop functionality
- **React Quill** - edytor WYSIWYG
- **Recharts** - wykresy i wizualizacje

## 🎨 Design System

### Kolory Główne (Żabka Brand)

```css
/* Primary Green */
--primary: #10B981
--primary-dark: #059669
--primary-darker: #047857

/* Dark Mode */
--bg-dark: #1F2937
--bg-dark-lighter: #374151
--bg-dark-darker: #111827

/* Light Mode */
--bg-light: #FFFFFF
--bg-light-gray: #F9FAFB
--bg-light-darker: #F3F4F6
```

### Kolory Zespołów

- 🟢 **HR** - `#10B981` (Zielony)
- 🔵 **IT & Tech** - `#3B82F6` (Niebieski)
- 🟣 **Dział Prawny** - `#8B5CF6` (Fioletowy)
- 🟠 **Marketing** - `#F97316` (Pomarańczowy)
- ⚪ **Ogólny** - `#6B7280` (Szary)

## 📦 Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/your-username/team-message.git

# Przejście do katalogu projektu
cd team-message

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev
```

## 🔐 Dane Demo

Aplikacja zawiera wbudowane dane demo do testowania:

```
Email: demo@zabka.pl
Hasło: demo123
```

## 📁 Struktura Projektu

```
team-message/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       # Główny layout aplikacji
│   │   ├── Sidebar.tsx         # Nawigacja boczna
│   │   └── TopNav.tsx          # Górna nawigacja
│   ├── dashboard/
│   │   └── Dashboard.tsx       # Panel główny
│   ├── documents/
│   │   ├── MessagesList.tsx    # Lista dokumentów
│   │   ├── NewDocument.tsx     # Kreator dokumentów
│   │   ├── DocumentEditor.tsx  # Edytor WYSIWYG
│   │   └── FullPreview.tsx     # Podgląd dokumentu
│   ├── features/
│   │   ├── TeamTemplates.tsx   # Szablony zespołowe
│   │   ├── AIDraftGenerator.tsx # Generator AI
│   │   ├── DistributionChannels.tsx
│   │   ├── PublicationScheduler.tsx
│   │   ├── ApprovalFlow.tsx
│   │   └── SlidedeckGenerator.tsx
│   └── LoginScreen.tsx         # Ekran logowania
├── styles/
│   └── globals.css             # Globalne style + Tailwind
└── App.tsx                     # Główny komponent aplikacji
```

## 🎯 Główne Ekrany

1. **Dashboard** - przegląd statystyk, ostatniej aktywności i wykresów
2. **Lista Dokumentów** - zarządzanie wszystkimi komunikatami
3. **Nowy Dokument** - kreator z wyborem zespołu, kanałów i typów
4. **Edytor** - WYSIWYG editor z podglądem na żywo
5. **Szablony** - gotowe szablony dla różnych zespołów
6. **AI Generator** - automatyczne generowanie treści
7. **Kanały Dystrybucji** - konfiguracja kanałów komunikacji
8. **Harmonogram** - kalendarz publikacji
9. **Akceptacja** - workflow zatwierdzania dokumentów
10. **SlideDeck** - generator prezentacji

## ♿ Dostępność (WCAG)

- ✅ Kontrast minimum 4.5:1 (WCAG AA)
- ✅ Wszystkie przyciski min. 44x44px (touch target)
- ✅ Focus states dla wszystkich interaktywnych elementów
- ✅ Semantyczny HTML
- ✅ ARIA labels dla screen readers
- ✅ Nawigacja klawiaturą

## 🌐 Wielojęzyczność

Aplikacja wspiera:
- 🇵🇱 Polski (domyślny)
- 🇬🇧 Angielski

Przełączanie języka dostępne w prawym górnym rogu interfejsu.

## 🎨 Motywy

- 🌙 **Dark Mode** (domyślny) - ciemny motyw przyjazny dla oczu
- ☀️ **Light Mode** - jasny motyw z wysokim kontrastem

Przełączanie motywu dostępne w górnej nawigacji (ikona Słońce/Księżyc).

## 🔄 Status Dokumentów

- ✏️ **Draft** - szkic w trakcie edycji
- ⏰ **Scheduled** - zaplanowany do publikacji
- ⏳ **Pending Approval** - oczekuje na akceptację
- ✅ **Ready to Publish** - gotowy do publikacji
- 📢 **Published** - opublikowany

## 📝 Roadmap

- [ ] Integracja z prawdziwym API
- [ ] Autentykacja i autoryzacja użytkowników
- [ ] System powiadomień push
- [ ] Eksport dokumentów do PDF
- [ ] Wersjonowanie dokumentów
- [ ] Komentarze i współpraca w czasie rzeczywistym
- [ ] Zaawansowana analityka
- [ ] Integracja z Microsoft Teams/Slack

## 🤝 Wkład w Projekt

Pull requesty są mile widziane! W przypadku większych zmian, najpierw otwórz issue, aby omówić proponowane zmiany.

## 📄 Licencja

[MIT](LICENSE)

## 👤 Autor

Projekt stworzony jako narzędzie do zarządzania komunikacją wewnętrzną dla zespołów korporacyjnych.

---

<div align="center">
  Made with ❤️ for better team communication
</div>
