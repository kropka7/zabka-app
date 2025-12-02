# 🎨 AI DRAFT GENERATOR — Complete Design Specification

**Feature:** AI Draft Generator  
**Version:** 1.0  
**Last Updated:** 2025-11-30

---

## 📐 LAYOUT STRUCTURE

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────┐
│ [Header] Title + Description                    [Lang Toggle]│
├─────────────────────────────────────────────────────────────┤
│ [Section] Upload Document Source                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ [UploadZone] Drag & Drop Area                         │ │
│   │   🔼 Icon + Text + Browse Link                        │ │
│   └───────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ [Conditional] Processing Status (when AI analyzing)          │
│   ⚡ Spinner + Text                                          │
├─────────────────────────────────────────────────────────────┤
│ [Grid] 5 Draft Cards (3-2 layout)                           │
│   ┌────────┐ ┌────────┐ ┌────────┐                         │
│   │Summary │ │Executive│ │Intranet│                         │
│   │📝      │ │👔      │ │🌐      │                         │
│   │Preview │ │Preview  │ │Preview │                         │
│   │4 Actions│ │4 Actions│ │4 Actions│                       │
│   └────────┘ └────────┘ └────────┘                         │
│   ┌────────┐ ┌────────┐                                     │
│   │Email   │ │Release │                                     │
│   │📧      │ │📋      │                                     │
│   │Preview │ │Preview  │                                     │
│   │4 Actions│ │4 Actions│                                    │
│   └────────┘ └────────┘                                     │
└─────────────────────────────────────────────────────────────┘
```

### Tablet (768px)
- Grid: 2-2-1 layout
- Maintained spacing
- Responsive typography

### Mobile (375px)
- Grid: 1 column stack
- Full-width cards
- Actions: 2x2 grid maintained
- Upload zone: reduced padding

---

## 🧩 ATOMIC DESIGN BREAKDOWN

### **ATOMS**

#### Btn/Primary
- **Variant:** Gradient green CTA
- **Class:** `bg-gradient-to-r from-[#00B67A] to-[#00A066]`
- **Hover:** `hover:from-[#00A066] hover:to-[#008F5A]`
- **Focus:** `focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2`
- **Size:** `px-8 py-4 text-lg`
- **Border-radius:** `rounded-xl`

#### Btn/Secondary
- **Variant:** Dark outline
- **Class:** `bg-[#1A1D3A] border border-[#00B67A]/20`
- **Hover:** `hover:bg-[#252840] hover:border-[#00B67A]/40`
- **Text:** `text-gray-300 hover:text-white`

#### Btn/Action (Preview)
- **Variant:** Green subtle
- **Class:** `bg-[#00B67A]/20 text-[#00B67A]`
- **Hover:** `hover:bg-[#00B67A]/30`
- **Size:** `px-4 py-2`

#### Icon/24
- **Size:** 24x24px (w-6 h-6)
- **Colors:** Green (#00B67A), White, Gray-400

#### Icon/48
- **Size:** 48x48px (w-12 h-12)
- **Usage:** Upload icon, Processing spinner

#### Badge/ColorBar
- **Height:** 4px (h-1)
- **Width:** 64px (w-16)
- **Colors:** 
  - Summary: `bg-blue-500`
  - Executive: `bg-purple-500`
  - Intranet: `bg-orange-500`
  - Email: `bg-green-500`
  - Release: `bg-pink-500`

#### Text/Heading1
- **Size:** `text-3xl`
- **Color:** `text-white`
- **Weight:** Default from globals.css

#### Text/Heading2
- **Size:** `text-2xl` / `text-xl`
- **Color:** `text-white`

#### Text/Body
- **Size:** `text-lg` / `text-base`
- **Color:** `text-gray-400`

#### Text/Caption
- **Size:** `text-sm`
- **Color:** `text-gray-500`

---

### **MOLECULES**

#### UploadZone/DragDrop
**Components:**
- Container: `border-2 border-dashed rounded-2xl`
- Icon/48: Upload icon (centered)
- Text/Body: Main instruction
- Link: Browse files (green)
- Text/Caption: Supported formats

**States:**
- Default: `border-[#00B67A]/30 bg-[#1A1D3A]/50`
- Active (drag): `border-[#00B67A] bg-[#00B67A]/10`

**Spacing:**
- Padding: `p-12`
- Gap: `gap-4` between elements

#### FileCard/Uploaded
**Components:**
- Container: `bg-[#1A1D3A]/50 rounded-2xl p-6`
- Icon container: `w-14 h-14 bg-[#00B67A]/20 rounded-xl`
- Icon/24: FileText
- Text: Filename + file size
- Btn/Icon: Remove (X)

**Layout:**
- Flexbox: `flex items-center justify-between`
- Gap: `gap-4`

#### StatusCard/Processing
**Components:**
- Container: `bg-gradient-to-r from-[#1A1D3A] to-[#252840]`
- Icon/48: Loader2 (animated spinner)
- Text/Heading2: Processing message
- Text/Body: Description
- Blur effect: `blur-xl bg-[#00B67A]/30`

**Animation:**
- Spinner: `animate-spin`

#### DraftCard/Preview
**Components:**
- Container: `bg-gradient-to-br from-[#1A1D3A] to-[#252840]`
- Border: `border border-[#00B67A]/30`
- Emoji icon: 3xl size
- Badge/ColorBar: Type indicator
- Text preview: `line-clamp-4`
- Action grid: 2x2 buttons

**Hover:**
- Border: `hover:border-[#00B67A]`

**Grid Structure:**
```
┌──────────────────────┐
│ 🎯 Draft Type        │
│ ▬▬▬ (color bar)      │
│                      │
│ Preview text...      │
│ (4 lines max)        │
│                      │
│ ┌─────┐ ┌─────┐     │
│ │👁 Pre││📋 Cop│     │
│ └─────┘ └─────┘     │
│ ┌─────┐ ┌─────┐     │
│ │📥 Exp││🔄 Reg│     │
│ └─────┘ └─────┘     │
└──────────────────────┘
```

#### ActionBar/Draft
**Components:**
- Grid: `grid grid-cols-2 gap-2`
- 4 buttons:
  1. Preview (Eye icon)
  2. Copy (Copy icon)
  3. Export (Download icon)
  4. Regenerate (RotateCcw icon)

---

### **ORGANISMS**

#### Section/Upload
**Structure:**
- Heading: "Upload source document"
- Conditional rendering:
  - No file: UploadZone/DragDrop
  - File uploaded: FileCard/Uploaded + Btn/Primary "Generate All Drafts"

#### Section/Processing (Conditional)
**Display when:** `isProcessing === true`
**Structure:**
- StatusCard/Processing
- Auto-hide after 3s (when drafts ready)

#### Grid/Drafts
**Layout:**
- Desktop: `grid grid-cols-3 gap-6`
- Tablet: `grid md:grid-cols-2`
- Mobile: `grid-cols-1`

**Components:**
- 5x DraftCard/Preview (different types)

#### Modal/Preview
**Structure:**
```
┌──────────────────────────────────────┐
│ [Header]                             │
│   🎯 Draft Title        [X Close]    │
│   ▬▬▬▬ (color bar)                   │
├──────────────────────────────────────┤
│ [Content] Scrollable                 │
│                                      │
│   Full draft content...              │
│   (max-h-[calc(90vh-200px)])        │
│                                      │
├──────────────────────────────────────┤
│ [Actions]                    [Cancel]│
│                        [Copy] [Export]│
└──────────────────────────────────────┘
```

**Overlay:**
- Background: `bg-black/80 backdrop-blur-sm`
- Z-index: `z-50`

---

## 🎭 INTERACTIONS & STATES

### Upload Flow
1. **Empty state** → UploadZone visible
2. **Drag enter** → Border green, background highlight
3. **Drag leave** → Return to default
4. **Drop file** → FileCard appears, UploadZone hidden
5. **Click "Browse"** → File picker opens
6. **File selected** → FileCard appears

### Generation Flow
1. **Click "Generate All Drafts"** → Processing state
2. **Processing (3s)** → Spinner animation, status message
3. **Complete** → Grid with 5 cards appears, success icon

### Draft Actions
| Action | Interaction | Result |
|--------|-------------|--------|
| **Preview** | Click → Modal opens | Full content display |
| **Copy** | Click → Clipboard write | Toast: "Copied to clipboard!" |
| **Export** | Click → File download | Toast: "File exported!" + .txt download |
| **Regenerate** | Click → Mock API call | Toast: "Version regenerated!" |

### Modal Interactions
- **Open:** Click "Preview" on any draft card
- **Close:** 
  - Click X button
  - Click outside modal (overlay)
  - ESC key (future enhancement)
- **Actions:** Copy, Export from modal footer

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop (lg: 1024px+)
- Grid: 3 columns
- Full spacing maintained
- Language toggle: visible

### Tablet (md: 768px - 1023px)
- Grid: 2 columns
- Last card full-width
- Reduced padding on cards

### Mobile (< 768px)
- Grid: 1 column
- Upload zone: `p-8` instead of `p-12`
- Language toggle: icon only
- Actions: maintain 2x2 grid

---

## 🏷️ FIGMA NAMING CONVENTION

```
Frame/AIDraftGenerator
├─ Header/Title-Description
│  ├─ Text/Heading1
│  ├─ Text/Body-Gray
│  └─ Btn/LanguageToggle
│
├─ Section/Upload
│  ├─ Text/Heading2
│  └─ [Conditional]
│      ├─ UploadZone/DragDrop
│      │  ├─ Icon/Upload-48
│      │  ├─ Text/Body
│      │  ├─ Link/Browse
│      │  └─ Text/Caption-Formats
│      │
│      └─ FileCard/Uploaded
│         ├─ Icon/FileText-Container
│         ├─ Text/Filename
│         ├─ Text/Filesize
│         ├─ Btn/Remove
│         └─ Btn/Primary-GenerateAll
│
├─ [Conditional] StatusCard/Processing
│  ├─ Icon/Loader-Animated
│  ├─ Text/Heading2-Processing
│  └─ Text/Body-Description
│
├─ Grid/Drafts
│  ├─ DraftCard/Summary
│  │  ├─ Header
│  │  │  ├─ Emoji/Icon
│  │  │  ├─ Text/DraftType
│  │  │  └─ Badge/ColorBar-Blue
│  │  ├─ Text/Preview-LineClamp4
│  │  └─ ActionBar
│  │     ├─ Btn/Action-Preview
│  │     ├─ Btn/Action-Copy
│  │     ├─ Btn/Action-Export
│  │     └─ Btn/Action-Regenerate
│  │
│  ├─ DraftCard/Executive
│  ├─ DraftCard/Intranet
│  ├─ DraftCard/Email
│  └─ DraftCard/Release
│
└─ Modal/Preview [Conditional]
   ├─ Overlay/Backdrop-Blur
   └─ Container/Modal
      ├─ Header/Modal
      │  ├─ Emoji + Title
      │  ├─ Badge/ColorBar
      │  └─ Btn/Close
      ├─ Content/Scrollable
      │  └─ Text/FullContent
      └─ Footer/Actions
         ├─ Btn/Secondary-Copy
         └─ Btn/Primary-Export
```

---

## 🎨 COLOR SYSTEM

### Primary Colors
- **Green Primary:** `#00B67A`
- **Green Hover:** `#00A066`
- **Green Dark:** `#008F5A`

### Background
- **Main:** `#0F1229`
- **Card:** `#1A1D3A`
- **Card Hover:** `#252840`

### Text
- **White:** `#FFFFFF`
- **Gray 300:** `text-gray-300`
- **Gray 400:** `text-gray-400`
- **Gray 500:** `text-gray-500`

### Draft Type Colors
- **Summary:** Blue-500 (`#3B82F6`)
- **Executive:** Purple-500 (`#A855F7`)
- **Intranet:** Orange-500 (`#F97316`)
- **Email:** Green-500 (`#22C55E`)
- **Release:** Pink-500 (`#EC4899`)

### Opacity Variants
- Border default: `/30`
- Border hover: `/40`
- Background subtle: `/10`
- Background default: `/20`

---

## ✨ ANIMATIONS & TRANSITIONS

### Standard Transition
```css
transition: all 0.3s ease
```

### Hover States
- Buttons: Color + background change
- Cards: Border color change
- Text: Color change

### Loading States
- Spinner: `animate-spin`
- Blur glow: `blur-xl`

### Focus States
- Ring: `focus:ring-2 focus:ring-[#00B67A]`
- Ring offset: `focus:ring-offset-2`
- Outline: `focus:outline-none`

---

## ♿ ACCESSIBILITY (WCAG AA)

### Contrast Ratios
- ✅ White text on dark bg: > 15:1
- ✅ Green on dark bg: > 4.5:1
- ✅ Gray-400 on dark bg: > 4.5:1

### Focus Management
- All interactive elements have `focus:ring-2`
- Keyboard navigation supported
- Tab order logical

### ARIA Labels
```typescript
aria-label={t.remove}           // Remove button
aria-label={t.close}            // Modal close
aria-expanded={isDropdownOpen}  // Future dropdowns
```

### Screen Readers
- Semantic HTML (button, label)
- Hidden file inputs with visible labels
- Descriptive button text

---

## 🌍 INTERNATIONALIZATION

### Supported Languages
- Polish (pl)
- English (en)

### Translation Keys
```typescript
{
  title: string;
  description: string;
  uploadTitle: string;
  dragDrop: string;
  generateAll: string;
  processing: string;
  draftsReady: string;
  types: {
    summary: string;
    executive: string;
    intranet: string;
    email: string;
    release: string;
  }
}
```

---

## 🔧 TECHNICAL NOTES

### Component File
`/components/ai-draft-generator/AIDraftGenerator.tsx`

### Dependencies
- React hooks: `useState`
- Icons: `lucide-react`
- Toasts: `sonner@2.0.3`

### Props Interface
```typescript
interface AIDraftGeneratorProps {
  language: Language;
  onToggleLanguage?: () => void;
}
```

### State Management
```typescript
const [uploadedFile, setUploadedFile] = useState<File | null>(null);
const [dragActive, setDragActive] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);
const [drafts, setDrafts] = useState<DraftVersion[]>([]);
const [previewDraft, setPreviewDraft] = useState<DraftVersion | null>(null);
```

---

## 📊 CONTENT SPECIFICATIONS

### Draft Types & Icons
| Type | Icon | Color | Purpose |
|------|------|-------|---------|
| Summary | 📝 | Blue | Quick overview for all employees |
| Executive | 👔 | Purple | Formal version for management |
| Intranet | 🌐 | Orange | Casual post for company intranet |
| Email | 📧 | Green | Professional email template |
| Release | 📋 | Pink | Technical release notes |

### File Support
- **Formats:** PDF, DOCX, DOC, TXT
- **Max size:** 50MB (configurable)
- **Upload methods:** Drag & drop, file picker

---

## 🎯 USER FLOWS

### Happy Path
1. Land on page
2. Drag PDF file to upload zone
3. See file preview with name + size
4. Click "Generate All Drafts"
5. Wait 3s (animated spinner)
6. See 5 draft cards appear
7. Click "Preview" on Executive version
8. Read full content in modal
9. Click "Copy" → Content copied
10. Close modal
11. Click "Export" on Email version → Downloads .txt
12. Success! ✨

### Alternative Path
1. Click "browse files"
2. Select DOCX from file picker
3. File appears
4. Generate drafts
5. Click "Regenerate" on Summary
6. Toast confirms regeneration
7. Done

---

## 📝 MOCK DATA EXAMPLE

### Polish Summary Draft
```
Krótkie podsumowanie: Wprowadzamy nowy system TeamMessage 
do zarządzania komunikacją wewnętrzną. System umożliwia 
tworzenie, zatwierdzanie i dystrybuowanie wiadomości 
przez różne kanały.

Kluczowe korzyści:
- Automatyzacja procesu komunikacji
- Wsparcie AI w generowaniu treści
- Wielokanałowa dystrybucja
- Analityka i raporty
```

---

## 🚀 FUTURE ENHANCEMENTS

### Phase 2
- [ ] Real AI integration (OpenAI/Claude)
- [ ] PDF parsing for content extraction
- [ ] Custom tone selection (like existing modal)
- [ ] Save drafts to database
- [ ] Team collaboration features

### Phase 3
- [ ] Batch processing (multiple files)
- [ ] Template library
- [ ] Version comparison
- [ ] A/B testing suggestions
- [ ] Analytics on draft effectiveness

---

**Design Status:** ✅ Complete  
**Implementation Status:** ✅ Complete  
**Testing Status:** 🟡 Ready for QA  
**Documentation:** ✅ Complete
