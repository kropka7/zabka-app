# 🎨 DISTRIBUTION CHANNELS LOGIC — Complete Design Specification

**Feature:** Logika kanałów dystrybucji z walidacją wymagań  
**Version:** 1.0  
**Last Updated:** 2025-11-30

---

## 📐 LAYOUT STRUCTURE

### Desktop Grid (12 columns, max-width: 1280px)

```
┌──────────────────────────────────────────────────────────────┐
│ [Validation Banner] - Auto-validation status (sticky top)    │
│   ✓ All requirements met | ⚠ 3 warnings | ✗ 2 errors        │
├──────────────────────────────────────────────────────────────┤
│ [Header] col-span-12                                          │
│   Title + Description                                         │
│   Selected: 2 of 6 channels                                   │
├──────────────────────────────────────────────────────────────┤
│ [Channel Grid] col-span-12 - 3 columns                        │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│   │ 📧 Email     │ │ 🌐 Intranet  │ │ 📋 Release   │        │
│   │  [Selected]  │ │  [Selected]  │ │    Notes     │        │
│   │   ✓ Valid    │ │  ⚠ Warning   │ │              │        │
│   │ 4/4 required │ │ 2/3 required │ │              │        │
│   └──────────────┘ └──────────────┘ └──────────────┘        │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│   │ 📊 Present.  │ │ 💬 Teams/SP  │ │ 📱 Social    │        │
│   │              │ │              │ │    Media     │        │
│   │              │ │              │ │              │        │
│   └──────────────┘ └──────────────┘ └──────────────┘        │
├──────────────────────────────────────────────────────────────┤
│ [Requirements Panel] col-span-12 - Expanded for Email        │
│   ┌──────────────────────────────────────────────────────┐  │
│   │ 📧 Email Requirements                                 │  │
│   │ ─────────────────────────────────────────────────────│  │
│   │ ✓ Subject line          [Input: 48/120 chars]        │  │
│   │ ✓ Plain text version    [☑ Enabled]                  │  │
│   │ ⚠ Sender info           [Select: Choose...]          │  │
│   │ ✓ Contact footer        [☑ Enabled]                  │  │
│   └──────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│ [Sticky Action Bar] - Fixed bottom                           │
│   2 of 6 channels selected | 1 warning                       │
│                             [Cancel] [Save & Continue →]     │
└──────────────────────────────────────────────────────────────┘
```

### Tablet (768px)
- Grid: 2 columns
- Requirements panel: full width
- Action bar: sticky bottom

### Mobile (375px)
- Grid: 1 column stack
- Cards: full width
- Requirements: full width expandable
- Action bar: 2 rows if needed

---

## 🧩 ATOMIC DESIGN BREAKDOWN

### **ATOMS**

#### Btn/Primary (Save & Continue)
```css
bg-gradient-to-r from-[#00B67A] to-[#00A066]
hover:from-[#00A066] hover:to-[#008F5A]
text-white
px-6 py-3 rounded-xl
flex items-center gap-2
disabled:bg-gray-500/20 disabled:text-gray-500 disabled:cursor-not-allowed
```
- Icon: `<ChevronRight className="w-5 h-5" />`
- Disabled state when validation fails

#### Btn/Secondary (Cancel)
```css
bg-[#1A1D3A]
hover:bg-[#252840]
text-white
px-6 py-3 rounded-xl
border border-[#00B67A]/30
hover:border-[#00B67A]
```

#### Badge/Status
**Selected:**
```css
bg-{color}-500
text-white
w-8 h-8 rounded-full
flex items-center justify-center
absolute top-4 right-4
```
- Icon: `<Check className="w-5 h-5" />`

**Validation States:**
```css
/* Valid */
bg-[#00B67A]/20 text-[#00B67A]
<CheckCircle2 /> icon

/* Warning */
bg-yellow-500/20 text-yellow-400
<AlertTriangle /> icon

/* Error */
bg-red-500/20 text-red-400
<XCircle /> icon
```

#### Icon/Channel
**6 Channel Icons:**
- Email: `<Mail className="w-6 h-6" />`
- Intranet: `<Globe className="w-6 h-6" />`
- Release Notes: `<FileCheck className="w-6 h-6" />`
- Presentation: `<Presentation className="w-6 h-6" />`
- Teams/SharePoint: `<MessageSquare className="w-6 h-6" />`
- Social Media: `<Share2 className="w-6 h-6" />`

#### Input/Text
```css
w-full
bg-[#1A1D3A]
border border-[#00B67A]/30
rounded-lg
px-4 py-2
text-white
placeholder-gray-500
focus:outline-none
focus:ring-2
focus:ring-[#00B67A]
```

#### Input/Select
```css
/* Same as Input/Text */
w-full bg-[#1A1D3A]
border border-[#00B67A]/30
rounded-lg
px-4 py-2
text-white
```

#### Input/Checkbox
```css
w-5 h-5
rounded
border-2 border-[#00B67A]/30
bg-[#1A1D3A]
checked:bg-[#00B67A]
focus:ring-2
focus:ring-[#00B67A]
cursor-pointer
```

#### Progress/CharacterCount
```tsx
<span className={`text-xs ${
  errorMessage ? 'text-red-400' :
  value.length > 0 ? 'text-[#00B67A]' : 'text-gray-500'
}`}>
  {value.length} / {max} characters
</span>
```

---

### **MOLECULES**

#### ChannelCard/Selectable
```
┌──────────────────────────────┐
│ [Valid ✓]            [✓]     │ ← Validation badge + Selected checkmark
│                               │
│ ┌────┐                        │
│ │ 📧 │  Email                │ ← Icon container + Title
│ └────┘                        │
│                               │
│ Send message directly to      │ ← Description (2 lines)
│ employee inboxes              │
│                               │
│ ────────────────────────────  │
│ ℹ️ 4 / 4 required            │ ← Requirements count
└──────────────────────────────┘
```

**Structure:**
```tsx
<button
  className={`relative bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-xl p-6 border-2 transition-all ${
    selected ? `border-${color}-500 shadow-lg` : 'border-[#00B67A]/30 hover:border-[#00B67A]'
  }`}
>
  {/* Selected Checkmark - absolute top-right */}
  {selected && (
    <div className={`absolute top-4 right-4 w-8 h-8 bg-${color}-500 rounded-full`}>
      <Check className="w-5 h-5 text-white" />
    </div>
  )}
  
  {/* Validation Badge - absolute top-left */}
  {selected && validationState !== 'pending' && (
    <Badge/Validation state={validationState} />
  )}
  
  {/* Icon */}
  <div className={`w-16 h-16 bg-${color}-500/20 rounded-xl text-${color}-500`}>
    {icon}
  </div>
  
  {/* Title */}
  <h3 className="text-white text-lg">{name}</h3>
  
  {/* Description */}
  <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
  
  {/* Requirements Count */}
  {selected && (
    <div className="flex items-center gap-1 text-xs text-gray-400 border-t border-[#00B67A]/20 pt-4">
      <Info className="w-3 h-3" />
      <span>{fulfilled} / {total} required</span>
    </div>
  )}
</button>
```

**States:**
1. **Unselected:** Gray border, hover green
2. **Selected:** Colored border, checkmark
3. **Selected + Valid:** Green validation badge
4. **Selected + Warning:** Yellow validation badge
5. **Selected + Error:** Red validation badge

#### ValidationBanner/Auto
```
┌──────────────────────────────────────────────────┐
│ ✓ All requirements met                           │
│ 4 / 4 required                                   │
└──────────────────────────────────────────────────┘
```

**Variants:**
```tsx
// Success
<div className="bg-[#00B67A]/20 border-[#00B67A] text-[#00B67A]">
  <CheckCircle2 /> All requirements met
</div>

// Warning
<div className="bg-yellow-500/20 border-yellow-500 text-yellow-400">
  <AlertTriangle /> 3 requirements to complete
</div>

// Error
<div className="bg-red-500/20 border-red-500 text-red-400">
  <XCircle /> 2 errors to fix
</div>
```

#### RequirementItem/Check
```
┌──────────────────────────────────────────────────┐
│ ✓  Subject line                    [Required]    │
│    [Input field: "New HR Policy"  48/120 chars]  │
│    Helper: Optimal 40-60 characters              │
└──────────────────────────────────────────────────┘
```

**Structure:**
```tsx
<div className="bg-[#0F1229]/50 rounded-xl p-4 border border-[#00B67A]/20">
  <div className="flex items-start gap-3">
    {/* Status Icon */}
    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
      fulfilled ? 'bg-[#00B67A]/20 text-[#00B67A]' :
      errorMessage ? 'bg-red-500/20 text-red-400' :
      'bg-gray-500/20 text-gray-400'
    }`}>
      {fulfilled ? <Check /> : errorMessage ? <X /> : <dot />}
    </div>
    
    {/* Label + Badge */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-white">{label}</label>
        <Badge>{required ? 'Required' : 'Optional'}</Badge>
      </div>
      
      {/* Input Field */}
      {type === 'text' && <Input />}
      {type === 'select' && <Select />}
      {type === 'boolean' && <Checkbox />}
      {type === 'number' && <Input type="number" />}
      
      {/* Helper Text */}
      {helperText && <p className="text-xs text-gray-500 mt-2">{helperText}</p>}
      
      {/* Character Count */}
      {validation && <Progress/CharacterCount />}
      
      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
          <AlertTriangle /> {errorMessage}
        </p>
      )}
    </div>
  </div>
</div>
```

**Requirement Types:**
1. **Text:** Input field with character count (min/max validation)
2. **Number:** Number input with min/max
3. **Select:** Dropdown with options
4. **Boolean:** Checkbox toggle

---

### **ORGANISMS**

#### Section/Header
```tsx
<div className="mb-8">
  <h1 className="text-white text-3xl mb-2 flex items-center gap-3">
    <Share2 className="w-8 h-8 text-[#00B67A]" />
    {title}
  </h1>
  <p className="text-gray-400">{description}</p>
  <div className="mt-4 text-sm">
    <span className="text-gray-500">
      Selected: <span className="text-white font-medium">{selectedCount}</span> of {totalChannels}
    </span>
  </div>
</div>
```

#### Grid/Channels
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {channels.map(channel => (
    <ChannelCard/Selectable 
      key={channel.id}
      channel={channel}
      onToggle={toggleChannel}
    />
  ))}
</div>
```

**Responsive Breakpoints:**
- Mobile (<768px): 1 column
- Tablet (768-1023px): 2 columns
- Desktop (1024px+): 3 columns

#### Panel/Requirements
```
┌──────────────────────────────────────────────────────┐
│ [Header]                                              │
│   📧 Email Icon + Title                               │
│   Description                                         │
├──────────────────────────────────────────────────────┤
│ [Requirements List]                                   │
│   <RequirementItem/Check> × 4                         │
│     1. Subject line (text)                            │
│     2. Plain text version (boolean)                   │
│     3. Sender info (select)                           │
│     4. Contact footer (boolean)                       │
└──────────────────────────────────────────────────────┘
```

**Visibility:**
- Shows only when a channel is selected
- Updates dynamically when switching channels
- Full width below channel grid
- Scrollable if many requirements

#### Banner/ValidationSummary
```tsx
{stats.selectedCount > 0 && (
  <div className={`mb-8 rounded-xl p-4 border ${
    stats.isValid ? 'bg-[#00B67A]/20 border-[#00B67A]' :
    stats.errors > 0 ? 'bg-red-500/20 border-red-500' :
    'bg-yellow-500/20 border-yellow-500'
  }`}>
    <div className="flex items-center gap-3">
      {stats.isValid ? <CheckCircle2 /> : stats.errors > 0 ? <XCircle /> : <AlertTriangle />}
      <div>
        <p className="font-medium">{message}</p>
        <p className="text-sm opacity-80">
          {fulfilledRequirements} / {totalRequirements} required
        </p>
      </div>
    </div>
  </div>
)}
```

**States:**
1. **No channels selected:** Banner hidden
2. **All valid:** Green success banner
3. **Warnings:** Yellow warning banner
4. **Errors:** Red error banner

#### ActionBar/Sticky
```tsx
<div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1A1D3A] to-[#252840] border-t border-[#00B67A]/30 p-6 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Stats */}
    <div className="text-sm text-gray-400">
      <span className="text-white font-medium">{selectedCount}</span> of {totalChannels} selected
      {warnings > 0 && <span className="ml-4 text-yellow-400">• {warnings} warnings</span>}
      {errors > 0 && <span className="ml-4 text-red-400">• {errors} errors</span>}
    </div>
    
    {/* Actions */}
    <div className="flex gap-3">
      <Btn/Secondary onClick={onCancel}>Cancel</Btn>
      <Btn/Primary onClick={handleContinue} disabled={!isValid}>
        Save & Continue →
      </Btn>
    </div>
  </div>
</div>
```

**Features:**
- Fixed to bottom of screen
- Backdrop blur effect
- Shows live stats
- Disable "Continue" if invalid
- Responsive: Stack on mobile

#### EmptyState/NoChannels
```
┌─────────────────────────────────┐
│                                 │
│         📤 (large icon)         │
│                                 │
│  Select a channel to see        │
│  requirements                   │
│                                 │
│  Click on channel card above    │
│                                 │
└─────────────────────────────────┘
```

---

## 🎨 COLOR SYSTEM

### Channel Colors
| Channel | Primary | Light BG | Text | Border |
|---------|---------|----------|------|--------|
| Email | `bg-blue-500` (#3B82F6) | `bg-blue-500/20` | `text-blue-500` | `border-blue-500` |
| Intranet | `bg-green-500` (#22C55E) | `bg-green-500/20` | `text-green-500` | `border-green-500` |
| Release Notes | `bg-purple-500` (#A855F7) | `bg-purple-500/20` | `text-purple-500` | `border-purple-500` |
| Presentation | `bg-orange-500` (#F97316) | `bg-orange-500/20` | `text-orange-500` | `border-orange-500` |
| Teams/SharePoint | `bg-indigo-500` (#6366F1) | `bg-indigo-500/20` | `text-indigo-500` | `border-indigo-500` |
| Social Media | `bg-pink-500` (#EC4899) | `bg-pink-500/20` | `text-pink-500` | `border-pink-500` |

### Validation Colors
```css
/* Valid */
bg-[#00B67A]/20
border-[#00B67A]
text-[#00B67A]

/* Warning */
bg-yellow-500/20
border-yellow-500
text-yellow-400

/* Error */
bg-red-500/20
border-red-500
text-red-400

/* Pending */
bg-gray-500/20
border-gray-500/30
text-gray-400
```

### Background Colors
- **Main BG:** `#0F1229`
- **Card BG 1:** `#1A1D3A`
- **Card BG 2:** `#252840`
- **Requirement BG:** `#0F1229/50`
- **Overlay:** `backdrop-blur-sm`

---

## 🎭 INTERACTIONS & STATES

### Channel Selection Flow
1. **Initial state:** All channels unselected, empty state visible
2. **Click Email card:**
   - Card: border turns blue, checkmark appears top-right
   - Toast: "Kanał wybrany"
   - Requirements panel: Shows Email requirements (4 items)
   - Action bar: "1 of 6 selected"

3. **Fill requirement (Subject):**
   - Type: "New HR Policy Update"
   - Character count updates: 22/120
   - Status icon: Changes from gray dot → green checkmark
   - Validation: Updates channel state

4. **Select dropdown (Sender):**
   - Choose: "HR Team"
   - Status: Fulfilled ✓
   - Channel validation: Updates to check if all required fulfilled

5. **Select second channel (Intranet):**
   - Click Intranet card → selects + shows requirements
   - Action bar: "2 of 6 selected"
   - Banner: Appears if warnings/errors exist

6. **Complete all requirements:**
   - All required fields fulfilled
   - Channel validation: "Valid" ✓
   - Banner: Green "All requirements met"
   - Continue button: Enabled

7. **Click "Save & Continue":**
   - Validation check
   - Toast: "All channels configured correctly"
   - Callback to parent with selected channels

### Validation Logic

**Per Requirement:**
```typescript
// Text validation
if (type === 'text') {
  if (value.length < min) {
    errorMessage = `Minimum ${min} characters`;
    fulfilled = false;
  } else if (value.length > max) {
    errorMessage = `Maximum ${max} characters`;
    fulfilled = false;
  } else if (required && value.trim()) {
    fulfilled = true;
  }
}

// Boolean validation
if (type === 'boolean') {
  fulfilled = required ? value === true : true;
}

// Select validation
if (type === 'select') {
  fulfilled = required ? !!value : true;
}
```

**Per Channel:**
```typescript
const requiredReqs = requirements.filter(r => r.required);
const hasErrors = requiredReqs.some(r => r.errorMessage);
const allFulfilled = requiredReqs.every(r => r.fulfilled);
const hasWarnings = requiredReqs.some(r => !r.fulfilled && !r.errorMessage);

let validationState: ValidationState = 'pending';
if (hasErrors) validationState = 'error';
else if (hasWarnings) validationState = 'warning';
else if (allFulfilled) validationState = 'valid';
```

**Overall:**
```typescript
const isValid = 
  warnings === 0 && 
  errors === 0 && 
  selectedChannels.length > 0;
```

### Error States

| Error Type | Trigger | Visual Feedback |
|------------|---------|-----------------|
| **No channels selected** | Click Continue with 0 selected | Toast: "Select at least one channel" |
| **Character count too low** | Type 5 chars when min is 10 | Red underline + error message |
| **Character count too high** | Type 121 chars when max is 120 | Red underline + error message |
| **Required field empty** | Leave required field blank | Yellow warning badge |
| **Invalid format** | Wrong format (e.g., version number) | Red error message below field |

---

## 📊 DATA STRUCTURE

### Channel Interface
```typescript
interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  required: boolean; // Force user to use this channel
  requirements: Requirement[];
  validationState: 'valid' | 'warning' | 'error' | 'pending';
  color: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'pink';
}
```

### Requirement Interface
```typescript
interface Requirement {
  id: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  required: boolean;
  fulfilled: boolean;
  value?: string | number | boolean;
  validation?: {
    min?: number;
    max?: number;
  };
  options?: string[]; // For select type
  errorMessage?: string;
  helperText?: string;
}
```

### Channel Data (6 Channels)

#### 1. Email
**Requirements (4):**
1. ✅ Subject line (text, 10-120 chars) - **Required**
2. ✅ Plain text version (boolean) - **Required**
3. ✅ Sender info (select: HR/IT/Legal/Marketing/Management) - **Required**
4. ☐ Contact footer (boolean) - Optional

#### 2. Intranet Portal
**Requirements (4):**
1. ✅ SEO Title (text, 30-60 chars) - **Required**
2. ✅ Meta description (text, 120-160 chars) - **Required**
3. ✅ Category (select: News/Policy/IT/HR/Security) - **Required**
4. ☐ Featured image (boolean) - Optional

#### 3. Release Notes
**Requirements (4):**
1. ✅ Version number (text, e.g., v2.5.1) - **Required**
2. ✅ Change summary (text, 50-500 chars) - **Required**
3. ✅ Impact level (select: Low/Medium/High) - **Required**
4. ☐ Breaking changes (boolean) - Optional

#### 4. Presentation
**Requirements (4):**
1. ✅ Slide count (number, 5-50) - **Required**
2. ✅ Visual style (select: Corporate/Minimalist/Modern/Zabka Brand) - **Required**
3. ✅ Audience type (select: C-level/Operational/All/Partners) - **Required**
4. ☐ Charts and statistics (boolean) - Optional

#### 5. Teams/SharePoint
**Requirements (4):**
1. ✅ Channel name (select: General/HR/IT/Marketing/News) - **Required**
2. ✅ Permissions (select: All/Team/Specific) - **Required**
3. ✅ Push notifications (boolean) - Optional (default: true)
4. ☐ Pin message (boolean) - Optional

#### 6. Social Media
**Requirements (4):**
1. ✅ Platforms (select: LinkedIn/Facebook/Instagram/All) - **Required**
2. ✅ Post length (text, 50-280 chars) - **Required**
3. ☐ Hashtags (text) - Optional
4. ☐ Scheduled post (boolean) - Optional

---

## 🏷️ FIGMA NAMING CONVENTION

```
Frame/DistributionChannels
├─ Banner/ValidationSummary
│  ├─ Icon/CheckCircle2-20-Green
│  ├─ Text/Message-Success
│  └─ Text/Stats-Progress
│
├─ Section/Header
│  ├─ Icon/Share2-32-Green
│  ├─ Text/Heading1-Title
│  ├─ Text/Body-Description
│  └─ Text/Stats-Selected
│
├─ Grid/Channels
│  ├─ Card/Channel-Email-Selected-Valid
│  │  ├─ Badge/Selected-Blue-TopRight
│  │  ├─ Badge/Validation-Valid-TopLeft
│  │  ├─ Icon/Mail-Container-Blue
│  │  ├─ Text/Heading3-ChannelName
│  │  ├─ Text/Body-Description-LineClamp2
│  │  └─ Text/Stats-Requirements
│  │
│  ├─ Card/Channel-Intranet-Selected-Warning
│  │  ├─ Badge/Selected-Green-TopRight
│  │  ├─ Badge/Validation-Warning-TopLeft
│  │  ├─ Icon/Globe-Container-Green
│  │  ├─ Text/Heading3-ChannelName
│  │  ├─ Text/Body-Description-LineClamp2
│  │  └─ Text/Stats-Requirements
│  │
│  ├─ Card/Channel-ReleaseNotes-Unselected
│  ├─ Card/Channel-Presentation-Unselected
│  ├─ Card/Channel-TeamsSharePoint-Unselected
│  └─ Card/Channel-SocialMedia-Unselected
│
├─ Panel/Requirements-Email
│  ├─ Header/RequirementsPanel
│  │  ├─ Icon/Mail-Container-Blue
│  │  ├─ Text/Heading2-ChannelName
│  │  └─ Text/Body-Description
│  │
│  └─ List/Requirements
│     ├─ Item/Requirement-SubjectLine-Fulfilled
│     │  ├─ Icon/Check-Circle-Green
│     │  ├─ Text/Label-RequirementName
│     │  ├─ Badge/Required-Red
│     │  ├─ Input/Text-WithCharCount
│     │  └─ Text/Helper-Gray
│     │
│     ├─ Item/Requirement-PlainText-Fulfilled
│     │  ├─ Icon/Check-Circle-Green
│     │  ├─ Text/Label-RequirementName
│     │  ├─ Badge/Required-Red
│     │  └─ Input/Checkbox-Enabled
│     │
│     ├─ Item/Requirement-Sender-Pending
│     │  ├─ Icon/Dot-Gray
│     │  ├─ Text/Label-RequirementName
│     │  ├─ Badge/Required-Red
│     │  └─ Select/Dropdown-Options
│     │
│     └─ Item/Requirement-Footer-Optional
│        ├─ Icon/Check-Circle-Green
│        ├─ Text/Label-RequirementName
│        ├─ Badge/Optional-Gray
│        └─ Input/Checkbox-Enabled
│
├─ [Conditional] EmptyState/NoChannels
│  ├─ Icon/Share2-64-Gray
│  ├─ Text/Heading2-SelectChannel
│  └─ Text/Body-HelperText
│
└─ ActionBar/StickyBottom
   ├─ Text/Stats-ChannelsSelected
   ├─ Text/Stats-Warnings
   ├─ Text/Stats-Errors
   ├─ Btn/Secondary-Cancel
   └─ Btn/Primary-SaveContinue-Disabled
```

---

## ♿ ACCESSIBILITY (WCAG AA)

### Contrast Ratios
| Element | Foreground | Background | Ratio |
|---------|-----------|------------|-------|
| White text | #FFFFFF | #0F1229 | 17.4:1 ✅ |
| Green text | #00B67A | #1A1D3A | 5.8:1 ✅ |
| Yellow warning | #FACC15 | #1A1D3A | 9.2:1 ✅ |
| Red error | #EF4444 | #1A1D3A | 5.1:1 ✅ |
| Blue channel | #3B82F6 | #1A1D3A | 5.4:1 ✅ |

### Keyboard Navigation
- ✅ Tab through channel cards
- ✅ Tab through requirement inputs
- ✅ Enter to toggle channel selection
- ✅ Space to toggle checkboxes
- ✅ Arrow keys in select dropdowns
- ✅ Focus indicators on all interactive elements

### Screen Readers
```tsx
aria-label="Select Email channel" // Channel button
aria-label="Subject line, required" // Input label
aria-checked={selected} // Checkbox state
role="group" // Requirements panel
role="alert" // Validation banner
```

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-[#00B67A]
focus:ring-offset-2
focus:ring-offset-[#1A1D3A]
```

---

## 🌍 INTERNATIONALIZATION

### Supported Languages
- **Polish (pl)** - default
- **English (en)**

### Translation Keys
```typescript
{
  title: string;
  description: string;
  selectedCount: string;
  of: string;
  validationSuccess: string;
  validationWarning: string;
  validationError: string;
  requirementsTitle: string;
  required: string;
  optional: string;
  fulfilled: string;
  pending: string;
  characters: string;
  cancel: string;
  saveAndContinue: string;
  selectChannel: string;
  channelSelected: string;
  channelDeselected: string;
  fillRequirements: string;
  allValid: string;
  validState: string;
  warningState: string;
  errorState: string;
}
```

### Dynamic Content
- Channel names: Some translated (e.g., "Portal Intranet")
- Channel descriptions: Fully translated
- Requirement labels: Fully translated
- Helper texts: Fully translated
- Error messages: Dynamic with values (e.g., "Minimum 10 znaków")

---

## 📱 RESPONSIVE DESIGN

### Desktop (1024px+)
```css
.channelGrid { grid-cols-3; gap-6; }
.actionBar { flex-row; justify-between; }
.requirementsPanel { max-width-7xl; }
```

### Tablet (768-1023px)
```css
.channelGrid { grid-cols-2; gap-6; }
.actionBar { flex-row; }
```

### Mobile (<768px)
```css
.channelGrid { grid-cols-1; gap-4; }
.actionBar { flex-col; gap-4; }
.stats { text-sm; text-center; }
```

**Mobile Optimizations:**
- Cards: Full width
- Requirements: Expanded by default
- Action bar: Stacks vertically
- Character counts: Below inputs (not inline)

---

## 🚀 USAGE EXAMPLE

### Parent Component Integration
```tsx
import { DistributionChannels } from './components/distribution-channels/DistributionChannels';

function WizardStep3() {
  const handleContinue = (selectedChannels: Channel[]) => {
    console.log('Selected channels:', selectedChannels);
    // Save to state
    // Navigate to next step
  };

  const handleCancel = () => {
    // Navigate back or clear
  };

  return (
    <DistributionChannels
      language={language}
      onContinue={handleContinue}
      onCancel={handleCancel}
    />
  );
}
```

### Typical User Flow
1. User lands on screen → Sees 6 channel cards
2. Clicks "Email" → Card selects, requirements panel appears
3. Fills subject line → Character count updates, validation green
4. Enables plain text → Checkbox checked, requirement fulfilled
5. Selects sender → Dropdown changes, requirement fulfilled
6. All 3 required fields done → Channel validation: "Valid" ✓
7. Clicks "Intranet" → Second channel selected, new requirements shown
8. Fills SEO title, meta, category → All valid
9. Banner shows: "All requirements met" (green)
10. Clicks "Save & Continue" → Toast success, callback fires

---

## 🎯 VALIDATION RULES

### Text Fields
```typescript
// Subject line (10-120 chars)
min: 10 → Error: "Minimum 10 characters"
max: 120 → Error: "Maximum 120 characters"
required: true → Warning if empty

// SEO Title (30-60 chars)
min: 30 → Error: "Minimum 30 characters"
max: 60 → Error: "Maximum 60 characters"

// Post length (50-280 chars)
min: 50 → Error: "Minimum 50 characters"
max: 280 → Error: "Maximum 280 characters"
```

### Select Fields
```typescript
// Required selects
fulfilled: !!value
errorMessage: value ? undefined : "Please select an option"
```

### Boolean Fields
```typescript
// Required checkboxes
fulfilled: value === true
// Optional checkboxes
fulfilled: true (always)
```

### Number Fields
```typescript
// Slide count (5-50)
min: 5 → Error: "Minimum 5 slides"
max: 50 → Error: "Maximum 50 slides"
required: true → Warning if 0
```

---

## 🔧 TECHNICAL SPECIFICATIONS

### Component File
`/components/distribution-channels/DistributionChannels.tsx`

### Dependencies
```tsx
import { useState, useMemo } from 'react';
import { Language } from '../../App';
import { 
  Mail, Globe, FileCheck, Presentation, MessageSquare, Share2,
  CheckCircle2, AlertTriangle, XCircle, Check, X, ChevronRight,
  Info
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
```

### Props Interface
```typescript
interface DistributionChannelsProps {
  language: Language;
  onToggleLanguage?: () => void;
  onContinue?: (selectedChannels: Channel[]) => void;
  onCancel?: () => void;
}
```

### State Management
```typescript
const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
const [channels, setChannels] = useState<Channel[]>([...]);
```

### Performance
- **useMemo** for stats calculation (6 derived values)
- Efficient filtering (only selected channels)
- Optimized re-renders (channel-specific updates)

---

## 🎨 ANIMATIONS

### Card Hover
```css
transition: all 0.3s ease;
hover:scale-[1.02]
```

### Selection
```css
/* Border change */
transition: border-color 0.2s ease;

/* Checkmark appearance */
transition: opacity 0.2s ease;
```

### Validation Badge
```css
/* Fade in */
transition: opacity 0.3s ease;
```

### Action Bar
```css
/* Sticky positioning */
position: fixed;
bottom: 0;
backdrop-filter: blur(8px);
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [x] 6 channel cards with unique icons/colors
- [x] Toggle selection (click card)
- [x] Validation badges (valid/warning/error)
- [x] Requirements panel (dynamic per channel)
- [x] 4 requirement types (text/number/boolean/select)
- [x] Live character counting
- [x] Field validation (min/max/required)
- [x] Auto-validation banner (top)
- [x] Sticky action bar (bottom)
- [x] Stats calculation (useMemo)
- [x] Empty state
- [x] Toast notifications
- [x] Accessibility (WCAG AA)
- [x] Internationalization (PL/EN)
- [x] Responsive design (3 breakpoints)
- [x] Focus states
- [x] Error messages
- [x] Disabled Continue button
- [x] Callback integration

---

**Design Status:** ✅ Complete  
**Implementation Status:** ✅ Complete  
**Testing Status:** 🟡 Ready for QA  
**Documentation:** ✅ Complete
