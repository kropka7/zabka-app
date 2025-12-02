# 🎨 PUBLICATION SCHEDULER — Complete Design Specification

**Feature:** Harmonogram publikacji z zaawansowanym planowaniem  
**Version:** 1.0  
**Last Updated:** 2025-11-30

---

## 📐 LAYOUT STRUCTURE

### Desktop Grid (12 columns, max-width: 1280px)

```
┌──────────────────────────────────────────────────────────────┐
│ [Header] col-span-12                                          │
│   🕐 Harmonogram Publikacji                                   │
│   Zaplanuj kiedy Twój komunikat zostanie opublikowany         │
├──────────────────────────────────────────────────────────────┤
│ [Publish Now Toggle] col-span-12                              │
│   ⚪→⚫ Publikuj natychmiast                                  │
│   Komunikat zostanie opublikowany zaraz po zatwierdzeniu      │
├──────────────────────────────────────────────────────────────┤
│ [Unified Schedule Toggle] col-span-12                         │
│   ⚪→⚫ Jednolity harmonogram                                 │
│   Wszystkie kanały zostaną opublikowane w tym samym czasie    │
│   ┌────────────────────────────────────────────────────────┐ │
│   │ [📅 Date Picker] [🕐 Time Picker]                      │ │
│   │ Quick Presets: [Jutro 9:00] [Jutro 14:00] [Koniec tyg.]│ │
│   └────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ Left: Scheduler Grid (col-span-8) │ Right: Summary (col-4)   │
│ ┌──────────────────────────────┐  │ ┌────────────────────┐   │
│ │ 📧 Email            ✓ Sched. │  │ │ ℹ️ Podsumowanie    │   │
│ │ ✓ Valid                      │  │ │                    │   │
│ │ 15 Dec 2024, 14:00           │  │ │ Zaplanowane: 3/3   │   │
│ │ 🕐 2 dni, 5 godz             │  │ │                    │   │
│ └──────────────────────────────┘  │ │ 📅 Kolejna:        │   │
│ ┌──────────────────────────────┐  │ │ Email              │   │
│ │ 🌐 Intranet         ✓ Sched. │  │ │ 15 Dec, 14:00      │   │
│ │ ✓ Valid                      │  │ │                    │   │
│ │ 15 Dec 2024, 14:00           │  │ │ 🕐 Czas do pub:    │   │
│ │ 🕐 2 dni, 5 godz             │  │ │ 2 dni, 5 godz      │   │
│ └──────────────────────────────┘  │ │                    │   │
│ ┌──────────────────────────────┐  │ │ Kanały:            │   │
│ │ 📋 Release  ⚠ Diff. time    │  │ │ • 📧 Email         │   │
│ │ [📅 20 Dec] [🕐 09:00]      │  │ │ • 🌐 Intranet      │   │
│ │                              │  │ │ • 📋 Release       │   │
│ └──────────────────────────────┘  │ └────────────────────┘   │
├──────────────────────────────────┴────────────────────────────┤
│ [Validation Banner]                                           │
│   ⚠ Release Notes ma inny czas publikacji niż pozostałe      │
├───────────────────────────────────────────────────────────────┤
│ [Action Bar] - Sticky bottom                                 │
│   3 channels scheduled | Next: 15 Dec 14:00                  │
│                          [Save Draft] [Schedule Publication →]│
└───────────────────────────────────────────────────────────────┘
```

### Tablet (768px)
- Scheduler grid: Full width
- Summary panel: Below scheduler
- Toggles: Full width

### Mobile (375px)
- All sections: Stack vertically
- Date/time pickers: Full width
- Quick presets: 2×2 grid
- Action bar: 2 rows

---

## 🧩 ATOMIC DESIGN BREAKDOWN

### **ATOMS**

#### Input/DatePicker
```tsx
<input
  type="date"
  min={new Date().toISOString().split('T')[0]}
  className="w-full bg-[#0F1229] border border-[#00B67A]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
/>
```
- Native browser date picker
- Min date: Today (no past dates)
- Label with Calendar icon

#### Input/TimePicker
```tsx
<input
  type="time"
  className="w-full bg-[#0F1229] border border-[#00B67A]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
/>
```
- Native browser time picker
- 24-hour format
- Label with Clock icon

#### Toggle/Switch
```tsx
<div className="relative">
  <input type="checkbox" checked={value} className="sr-only peer" />
  <div className="w-14 h-8 bg-gray-600 rounded-full peer-checked:bg-[#00B67A] transition-all"></div>
  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
</div>
```

**States:**
- **Unchecked:** Gray background, knob left
- **Checked:** Green background, knob right
- **Hover:** Slight scale
- **Focus:** Ring outline

#### Badge/Status
```css
/* Scheduled */
bg-[#00B67A]/20 text-[#00B67A]
px-3 py-1 rounded-full text-xs

/* Warning */
bg-yellow-500/20 text-yellow-400

/* Error */
bg-red-500/20 text-red-400

/* Publishing Now */
bg-[#00B67A]/20 text-[#00B67A]
flex items-center gap-1
<Zap /> icon
```

#### Btn/Preset
```css
bg-[#00B67A]/20
hover:bg-[#00B67A]/30
text-[#00B67A]
px-4 py-2 rounded-lg
text-sm
transition-all
```

**Preset Buttons:**
- "Jutro 9:00" / "Tomorrow 9 AM"
- "Jutro 14:00" / "Tomorrow 2 PM"
- "Koniec tygodnia" / "End of week"
- "Następny poniedziałek" / "Next Monday"

#### Icon/Calendar, Icon/Clock
```tsx
<Calendar className="w-4 h-4 text-gray-400" />
<Clock className="w-4 h-4 text-gray-400" />
<CalendarClock className="w-8 h-8 text-[#00B67A]" /> // Header
```

---

### **MOLECULES**

#### PublishNowToggle
```
┌──────────────────────────────────────────────────┐
│ ⚪→⚫  ⚡ Publikuj natychmiast                   │
│       Komunikat zostanie opublikowany zaraz      │
│       po zatwierdzeniu                           │
└──────────────────────────────────────────────────┘
```

**Structure:**
```tsx
<div className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-xl p-6 border border-[#00B67A]/30">
  <label className="flex items-start gap-4 cursor-pointer">
    <Toggle/Switch checked={publishNow} onChange={handleToggle} />
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-5 h-5 text-[#00B67A]" />
        <span className="text-white text-lg">{t.publishNow}</span>
      </div>
      <p className="text-gray-400 text-sm">{t.publishNowDesc}</p>
    </div>
  </label>
</div>
```

**Behavior:**
- Toggle ON → Disables all date/time pickers
- Toggle ON → Shows "Publishing now" badges on channels
- Toggle OFF → Re-enables scheduler

#### UnifiedScheduleToggle
```
┌──────────────────────────────────────────────────┐
│ ⚪→⚫  📅 Jednolity harmonogram                  │
│       Wszystkie kanały w tym samym czasie        │
│ ─────────────────────────────────────────────────│
│ 📅 [Date Picker]     🕐 [Time Picker]           │
│                                                  │
│ Quick Presets:                                   │
│ [Jutro 9:00] [Jutro 14:00] [Koniec tyg.] [Pon.] │
└──────────────────────────────────────────────────┘
```

**Structure:**
```tsx
<div className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-xl p-6 border border-[#00B67A]/30">
  <label className="flex items-start gap-4 cursor-pointer">
    <Toggle/Switch checked={unifiedSchedule} />
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="w-5 h-5 text-[#00B67A]" />
        <span className="text-white text-lg">{title}</span>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </label>
  
  {/* Date/Time Pickers (shown when enabled) */}
  {unifiedSchedule && (
    <div className="mt-6 pt-6 border-t border-[#00B67A]/20">
      <div className="grid grid-cols-2 gap-4">
        <Input/DatePicker />
        <Input/TimePicker />
      </div>
      
      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn/Preset onClick={() => applyPreset('tomorrow9am')}>
          Jutro 9:00
        </Btn/Preset>
        {/* ... more presets */}
      </div>
    </div>
  )}
</div>
```

**Behavior:**
- Toggle ON → Shows unified date/time pickers
- Toggle ON → Syncs all channels to same time
- Toggle OFF → Shows individual pickers per channel
- Quick presets → Instantly apply date/time

#### ChannelScheduleCard
```
┌──────────────────────────────────────────────────┐
│ 📧 Email                            ✓ Scheduled   │
│ ✓ Valid date                                      │
│                                                   │
│ Wed, 15 Dec 2024, 14:00                          │
│ 🕐 2 days, 5 hours                               │
└──────────────────────────────────────────────────┘
```

**Structure (Unified Mode):**
```tsx
<div className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-xl p-6 border border-[#00B67A]/30">
  {/* Header */}
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 bg-blue-500/20 rounded-xl text-blue-500">
      <Mail className="w-6 h-6" />
    </div>
    <div className="flex-1">
      <h3 className="text-white text-lg">Email</h3>
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />
        <span className="text-[#00B67A]">Valid date</span>
      </div>
    </div>
    <Badge/Status>Scheduled</Badge>
  </div>
  
  {/* Scheduled Time Display */}
  <div className="flex items-center gap-4 text-sm text-gray-400">
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      <span>Wed, 15 Dec 2024</span>
    </div>
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4" />
      <span>14:00</span>
    </div>
    <div className="flex items-center gap-2 text-[#00B67A]">
      <TrendingUp className="w-4 h-4" />
      <span>2 days, 5 hours</span>
    </div>
  </div>
</div>
```

**Structure (Individual Mode):**
```tsx
<div className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-xl p-6 border border-[#00B67A]/30">
  {/* Header (same as above) */}
  
  {/* Individual Date/Time Pickers */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Select date
      </label>
      <Input/DatePicker 
        value={channel.scheduledDate}
        onChange={(e) => handleDateChange(channel.id, e.target.value)}
      />
    </div>
    <div>
      <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Select time
      </label>
      <Input/TimePicker 
        value={channel.scheduledTime}
        onChange={(e) => handleTimeChange(channel.id, e.target.value)}
      />
    </div>
  </div>
</div>
```

**States:**
1. **Not scheduled:** Gray, no date/time
2. **Scheduled - Valid:** Green checkmark, date/time shown
3. **Scheduled - Warning:** Yellow warning (outside business hours)
4. **Scheduled - Error:** Red error (past date)
5. **Publishing now:** Zap icon, no date/time needed

#### TimeUntilPublish
```tsx
<div className="flex items-center gap-2 text-[#00B67A]">
  <TrendingUp className="w-4 h-4" />
  <span>2 days, 5 hours, 23 minutes</span>
</div>
```

**Calculation:**
```typescript
const calculateTimeUntil = (date: string, time: string) => {
  const scheduledDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const diff = scheduledDateTime.getTime() - now.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};
```

---

### **ORGANISMS**

#### Section/Header
```tsx
<div className="mb-8">
  <h1 className="text-white text-3xl mb-2 flex items-center gap-3">
    <CalendarClock className="w-8 h-8 text-[#00B67A]" />
    {t.title}
  </h1>
  <p className="text-gray-400">{t.description}</p>
</div>
```

#### Section/GlobalToggles
```tsx
<div className="space-y-4 mb-8">
  <PublishNowToggle 
    checked={publishNow}
    onChange={handlePublishNowToggle}
  />
  
  {!publishNow && (
    <UnifiedScheduleToggle
      checked={unifiedSchedule}
      onChange={handleUnifiedToggle}
      unifiedDate={unifiedDate}
      unifiedTime={unifiedTime}
      onDateChange={handleUnifiedDateChange}
      onTimeChange={handleUnifiedTimeChange}
      onPresetApply={applyPreset}
    />
  )}
</div>
```

#### Grid/SchedulerChannels
```tsx
<div className="lg:col-span-8 space-y-4">
  {selectedChannels.length === 0 ? (
    <EmptyState/NoChannels />
  ) : (
    selectedChannels.map(channel => (
      <ChannelScheduleCard
        key={channel.id}
        channel={channel}
        publishNow={publishNow}
        unifiedSchedule={unifiedSchedule}
        onDateChange={handleChannelDateChange}
        onTimeChange={handleChannelTimeChange}
      />
    ))
  )}
</div>
```

**Layout:**
- Desktop: 8 columns (left side)
- Mobile: Full width
- Spacing: 4 (1rem gap between cards)

#### Panel/Summary
```
┌────────────────────────────┐
│ ℹ️ Podsumowanie            │
│ ──────────────────────────│
│ Zaplanowane kanały: 3 / 3 │
│                            │
│ ⚠ 1 ostrzeżenie           │
│                            │
│ ──────────────────────────│
│ 📅 Kolejna publikacja:     │
│                            │
│ Email                      │
│ Wed, 15 Dec, 14:00         │
│                            │
│ 🕐 Czas do publikacji:     │
│ 2 dni, 5 godz             │
│ ──────────────────────────│
│ Zaplanowane kanały:        │
│                            │
│ 📧 Email                   │
│ 15 Dec, 14:00   ✓          │
│                            │
│ 🌐 Intranet                │
│ 15 Dec, 14:00   ✓          │
│                            │
│ 📋 Release Notes           │
│ 20 Dec, 09:00   ⚠          │
└────────────────────────────┘
```

**Structure:**
```tsx
<div className="lg:col-span-4">
  <div className="bg-gradient-to-br from-[#1A1D3A] to-[#252840] rounded-2xl p-6 border border-[#00B67A]/30 sticky top-8">
    <h3 className="text-white text-xl mb-4 flex items-center gap-2">
      <Info className="w-5 h-5 text-[#00B67A]" />
      {t.summary}
    </h3>
    
    {/* Stats */}
    <div className="space-y-4 mb-6">
      <div className="flex justify-between pb-3 border-b">
        <span className="text-gray-400">{t.scheduledChannels}</span>
        <span className="text-white font-medium">{scheduled} / {total}</span>
      </div>
      
      {warnings > 0 && (
        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>{warnings} warnings</span>
        </div>
      )}
    </div>
    
    {/* Next Publication */}
    {nextPublish && (
      <div className="bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-xl p-4 mb-6">
        <p className="text-gray-400 text-sm mb-2">{t.nextPublication}</p>
        <p className="text-white font-medium mb-1">{nextPublish.channel}</p>
        <p className="text-[#00B67A] text-sm">{nextPublish.datetime}</p>
        
        {/* Time Until */}
        <div className="mt-3 pt-3 border-t border-[#00B67A]/20">
          <p className="text-gray-400 text-xs mb-1">{t.timeUntilPublish}</p>
          <TimeUntilPublish date={date} time={time} />
        </div>
      </div>
    )}
    
    {/* Scheduled Channels List */}
    <div>
      <p className="text-gray-400 text-sm mb-3">{t.scheduledChannels}</p>
      <div className="space-y-2">
        {scheduledChannels.map(ch => (
          <div key={ch.id} className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-{color}-500/20 rounded-lg text-{color}-500">
              {ch.icon}
            </div>
            <div className="flex-1">
              <p className="text-white">{ch.name}</p>
              <p className="text-gray-400 text-xs">{ch.datetime}</p>
            </div>
            <ValidationIcon state={ch.validationState} />
          </div>
        ))}
      </div>
    </div>
    
    {/* Publish Now Summary */}
    {publishNow && (
      <div className="bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-xl p-4">
        <div className="flex items-center gap-2 text-[#00B67A] mb-2">
          <Zap className="w-5 h-5" />
          <span className="font-medium">{t.publishingNow}</span>
        </div>
        <p className="text-gray-400 text-sm mb-3">{t.publishNowDesc}</p>
        <div className="space-y-1">
          {selectedChannels.map(ch => (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 bg-{color}-500/20 text-{color}-500">
                {ch.icon}
              </div>
              <span className="text-white">{ch.name}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
```

**Features:**
- Sticky positioning (top-8)
- Live updates when schedule changes
- Time countdown
- Validation warnings
- Next publication highlight

#### Banner/Validation
```tsx
{stats.warnings > 0 && !publishNow && (
  <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 rounded-xl p-4 mb-8">
    <div className="flex items-center gap-3">
      <AlertTriangle className="w-5 h-5" />
      <div>
        <p className="font-medium">{stats.warnings} warnings</p>
        <p className="text-sm opacity-80">{t.outsideHours}</p>
      </div>
    </div>
  </div>
)}
```

**Variants:**
- **Warning:** Yellow (outside business hours, different times)
- **Error:** Red (past date, invalid data)
- **Success:** Green (all valid) - optional

#### ActionBar/Sticky
```tsx
<div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1A1D3A] to-[#252840] border-t border-[#00B67A]/30 p-6 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Stats */}
    <div className="text-sm text-gray-400">
      <span className="text-white font-medium">{scheduled}</span> / {total} scheduled
      {nextPublish && (
        <span className="ml-4 text-[#00B67A]">
          • Next: {nextPublish.datetime}
        </span>
      )}
    </div>
    
    {/* Actions */}
    <div className="flex gap-3">
      <Btn/Secondary onClick={handleSaveDraft}>
        Save Draft
      </Btn/Secondary>
      <Btn/Primary onClick={handleSchedule} disabled={!isValid}>
        {publishNow ? 'Publish Now' : 'Schedule Publication'}
      </Btn/Primary>
    </div>
  </div>
</div>
```

#### EmptyState/NoChannels
```
┌─────────────────────────────────┐
│                                 │
│      🕐 (large icon)            │
│                                 │
│  No channels selected           │
│                                 │
│  Select at least one channel    │
│  to schedule publication        │
│                                 │
└─────────────────────────────────┘
```

---

## 🎨 COLOR SYSTEM

### Channel Colors (Same as Distribution Channels)
| Channel | Color | Usage |
|---------|-------|-------|
| Email | Blue (#3B82F6) | Icon container, badges |
| Intranet | Green (#22C55E) | Icon container, badges |
| Release Notes | Purple (#A855F7) | Icon container, badges |
| Presentation | Orange (#F97316) | Icon container, badges |
| Teams/SharePoint | Indigo (#6366F1) | Icon container, badges |
| Social Media | Pink (#EC4899) | Icon container, badges |

### Validation Colors
```css
/* Valid */
text-[#00B67A]
bg-[#00B67A]/20
border-[#00B67A]

/* Warning */
text-yellow-400
bg-yellow-500/20
border-yellow-500

/* Error */
text-red-400
bg-red-500/20
border-red-500
```

### Toggle Colors
```css
/* Unchecked */
bg-gray-600

/* Checked */
bg-[#00B67A]
peer-checked:bg-[#00B67A]

/* Knob */
bg-white
peer-checked:translate-x-6
```

---

## 🎭 INTERACTIONS & STATES

### Publish Now Flow
1. **Initial state:** Toggle OFF, scheduler visible
2. **User clicks toggle:** Toggle ON
3. **Result:**
   - All date/time pickers disappear
   - Channel cards show "Publishing now" badge (Zap icon)
   - Validation state → all valid
   - Summary panel → shows "Publishing now" section
   - Action button → changes to "Publish Now"
4. **User clicks toggle OFF:** Restores scheduler

### Unified Schedule Flow
1. **Initial state:** Toggle ON (default)
2. **User sees:** Single date/time picker + quick presets
3. **User picks date (15 Dec):**
   - Updates all selected channels to 15 Dec
   - Validates each channel
   - Updates summary
4. **User picks time (14:00):**
   - Updates all selected channels to 14:00
   - Validates (warning if outside 6-20)
   - Shows time until publish
5. **User clicks "Jutro 9:00" preset:**
   - Date → Tomorrow
   - Time → 09:00
   - Toast: "Preset zastosowany"
   - All channels updated instantly

### Individual Schedule Flow
1. **User toggles unified OFF:**
   - Single picker disappears
   - Each channel shows own date/time pickers
2. **User picks different date for Release Notes (20 Dec):**
   - Only Release Notes updated
   - Validation banner appears: "Different times"
   - Summary shows all channels with different dates
3. **User picks time for Release Notes (09:00):**
   - Validates (outside hours? → warning)
   - Updates summary
   - Next publication recalculates (earliest date)

### Validation Flow

**Date Validation:**
```typescript
if (scheduledDateTime < now) {
  return { state: 'error', message: 'Date cannot be in the past' };
}
```

**Time Validation:**
```typescript
const hour = parseInt(time.split(':')[0]);
if (hour < 6 || hour > 20) {
  return { state: 'warning', message: 'Outside business hours (6:00-20:00)' };
}
```

**Overall Validation:**
```typescript
isValid = 
  selectedChannels.length > 0 &&
  errors === 0 &&
  (publishNow || scheduledCount > 0);
```

### Quick Preset Actions
| Preset | Date | Time |
|--------|------|------|
| **Tomorrow 9 AM** | Today + 1 day | 09:00 |
| **Tomorrow 2 PM** | Today + 1 day | 14:00 |
| **End of week** | Next Friday | 17:00 |
| **Next Monday** | Next Monday | 09:00 |

---

## 📊 DATA STRUCTURE

### ChannelSchedule Interface
```typescript
interface ChannelSchedule {
  channelId: string;
  channelName: string;
  channelIcon: React.ReactNode;
  channelColor: string;
  selected: boolean;
  scheduledDate: string; // "2024-12-15"
  scheduledTime: string; // "14:00"
  validationState: 'valid' | 'warning' | 'error' | 'pending';
  validationMessage?: string;
}
```

### Scheduler State
```typescript
interface SchedulerState {
  publishNow: boolean;
  unifiedSchedule: boolean;
  unifiedDate: string;
  unifiedTime: string;
  channels: ChannelSchedule[];
}
```

### Stats (useMemo)
```typescript
const stats = {
  selectedCount: 3,       // Number of selected channels
  scheduledCount: 3,      // Number with date/time set
  warnings: 1,            // Channels with warnings
  errors: 0,              // Channels with errors
  isValid: true,          // Can publish/schedule?
  nextPublish: {          // Earliest publication
    date: '2024-12-15',
    time: '14:00',
    channel: 'Email'
  }
};
```

---

## 🏷️ FIGMA NAMING CONVENTION

```
Frame/PublicationScheduler
├─ Section/Header
│  ├─ Icon/CalendarClock-32-Green
│  ├─ Text/Heading1-Title
│  └─ Text/Body-Description
│
├─ Section/GlobalToggles
│  ├─ Card/PublishNowToggle
│  │  ├─ Toggle/Switch-PublishNow
│  │  ├─ Icon/Zap-20-Green
│  │  ├─ Text/Heading3-Title
│  │  └─ Text/Body-Description
│  │
│  └─ Card/UnifiedScheduleToggle
│     ├─ Toggle/Switch-UnifiedSchedule
│     ├─ Icon/Calendar-20-Green
│     ├─ Text/Heading3-Title
│     ├─ Text/Body-Description
│     ├─ Divider/Horizontal
│     ├─ Grid/DateTimePickers
│     │  ├─ Input/DatePicker-Unified
│     │  └─ Input/TimePicker-Unified
│     └─ Group/QuickPresets
│        ├─ Btn/Preset-Tomorrow9AM
│        ├─ Btn/Preset-Tomorrow2PM
│        ├─ Btn/Preset-EndOfWeek
│        └─ Btn/Preset-NextMonday
│
├─ Grid/MainContent-12Cols
│  ├─ Section/SchedulerGrid-Col8
│  │  ├─ Card/ChannelSchedule-Email-Valid
│  │  │  ├─ Header/ChannelInfo
│  │  │  │  ├─ Icon/Mail-Container-Blue
│  │  │  │  ├─ Text/Heading3-ChannelName
│  │  │  │  ├─ Group/ValidationStatus
│  │  │  │  │  ├─ Icon/CheckCircle2-Green
│  │  │  │  │  └─ Text/ValidationMessage
│  │  │  │  └─ Badge/Scheduled-Green
│  │  │  ├─ [Conditional] Grid/IndividualPickers
│  │  │  │  ├─ Input/DatePicker-Email
│  │  │  │  └─ Input/TimePicker-Email
│  │  │  └─ [Conditional] Group/ScheduledTimeDisplay
│  │  │     ├─ Text/Date-WithIcon
│  │  │     ├─ Text/Time-WithIcon
│  │  │     └─ Text/TimeUntil-Green
│  │  │
│  │  ├─ Card/ChannelSchedule-Intranet-Valid
│  │  ├─ Card/ChannelSchedule-ReleaseNotes-Warning
│  │  └─ [Conditional] EmptyState/NoChannels
│  │
│  └─ Section/SummaryPanel-Col4-Sticky
│     ├─ Header/SummaryTitle
│     │  ├─ Icon/Info-20-Green
│     │  └─ Text/Heading2-Summary
│     ├─ Group/Stats
│     │  ├─ Stat/ScheduledChannels
│     │  ├─ [Conditional] Alert/Warnings-Yellow
│     │  └─ [Conditional] Alert/Errors-Red
│     ├─ [Conditional] Card/NextPublication-Highlight
│     │  ├─ Text/Label-Gray
│     │  ├─ Text/ChannelName-White
│     │  ├─ Text/DateTime-Green
│     │  ├─ Divider/Horizontal
│     │  ├─ Text/Label-TimeUntil
│     │  └─ Text/Countdown-White
│     ├─ [Conditional] List/ScheduledChannels
│     │  ├─ Item/ChannelSchedule-Email
│     │  │  ├─ Icon/Mail-Container-Blue
│     │  │  ├─ Text/Name+DateTime
│     │  │  └─ Icon/ValidationState
│     │  ├─ Item/ChannelSchedule-Intranet
│     │  └─ Item/ChannelSchedule-ReleaseNotes
│     └─ [Conditional] Card/PublishNowSummary-Green
│        ├─ Header/PublishingNow
│        ├─ Text/Description
│        └─ List/ChannelIcons
│
├─ [Conditional] Banner/ValidationWarning-Yellow
│  ├─ Icon/AlertTriangle-20-Yellow
│  └─ Text/WarningMessage
│
└─ ActionBar/StickyBottom
   ├─ Group/Stats-Left
   │  ├─ Text/ScheduledCount
   │  └─ Text/NextPublish-Green
   └─ Group/Actions-Right
      ├─ Btn/Secondary-SaveDraft
      └─ Btn/Primary-SchedulePublication
```

---

## ♿ ACCESSIBILITY (WCAG AA)

### Contrast Ratios
All same as Distribution Channels (validated ✅)

### Keyboard Navigation
- ✅ Tab through toggles
- ✅ Space to toggle switches
- ✅ Tab through date/time pickers
- ✅ Tab through preset buttons
- ✅ Enter to apply preset
- ✅ Focus indicators on all interactive elements

### Screen Readers
```tsx
aria-label="Publish immediately toggle"
aria-checked={publishNow}
aria-label="Unified schedule toggle"
aria-label="Select publication date"
aria-label="Select publication time"
role="region" // Summary panel
```

### Date/Time Inputs
- Native HTML5 inputs (accessible by default)
- Keyboard navigation built-in
- Screen reader friendly

---

## 🌍 INTERNATIONALIZATION

### Translation Keys
```typescript
{
  title: string;
  description: string;
  publishNow: string;
  publishNowDesc: string;
  unifiedSchedule: string;
  unifiedScheduleDesc: string;
  individualSchedules: string;
  individualSchedulesDesc: string;
  selectDate: string;
  selectTime: string;
  scheduled: string;
  publishingNow: string;
  validDate: string;
  pastDate: string;
  outsideHours: string;
  differentTimes: string;
  summary: string;
  scheduledChannels: string;
  timeUntilPublish: string;
  nextPublication: string;
  days: string;
  hours: string;
  minutes: string;
  quickPresets: string;
  tomorrow9am: string;
  tomorrow2pm: string;
  endOfWeek: string;
  nextMonday: string;
  saveDraft: string;
  publishNowBtn: string;
  schedule: string;
  // ... etc
}
```

### Date Formatting
```typescript
// Polish
new Date(date).toLocaleDateString('pl-PL', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}); // "śr., 15 gru 2024"

// English
new Date(date).toLocaleDateString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}); // "Wed, Dec 15, 2024"
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (1024px+)
```css
.mainGrid { grid-cols-12; }
.schedulerGrid { col-span-8; }
.summaryPanel { col-span-4; sticky; top-8; }
.dateTimePickers { grid-cols-2; }
.quickPresets { flex-row; flex-wrap; }
```

### Tablet (768-1023px)
```css
.schedulerGrid { col-span-12; }
.summaryPanel { col-span-12; position-static; }
.dateTimePickers { grid-cols-2; }
```

### Mobile (<768px)
```css
.mainGrid { grid-cols-1; }
.dateTimePickers { grid-cols-1; }
.quickPresets { grid; grid-cols-2; }
.actionBar { flex-col; gap-4; }
```

---

## 🚀 USAGE EXAMPLE

### Integration with Wizard
```tsx
import { PublicationScheduler } from './components/publication-scheduler/PublicationScheduler';

function WizardStep4() {
  const [selectedChannels] = useState(['email', 'intranet', 'release-notes']);
  
  const handleSchedule = (schedules: ChannelSchedule[]) => {
    console.log('Scheduled:', schedules);
    // Save to backend
    // Navigate to confirmation
  };
  
  const handleSaveDraft = (schedules: ChannelSchedule[]) => {
    console.log('Draft saved:', schedules);
    // Save to backend as draft
  };
  
  return (
    <PublicationScheduler
      language={language}
      selectedChannels={selectedChannels}
      onSchedule={handleSchedule}
      onSaveDraft={handleSaveDraft}
    />
  );
}
```

### Typical User Flow
1. User lands on scheduler → Sees 3 selected channels (from previous step)
2. Unified schedule toggle ON (default) → Shows single date/time picker
3. User picks date: Tomorrow (Dec 15)
4. User picks time: 14:00
5. All 3 channels updated instantly
6. Summary shows: "Next: Email, 15 Dec 14:00" + "Time until: 1 day, 2 hours"
7. One channel (Release Notes) needs different time
8. User toggles unified OFF
9. User picks 20 Dec, 09:00 for Release Notes
10. Validation banner appears: "Different times"
11. Summary updates with all schedules
12. User clicks "Schedule Publication"
13. Toast: "Schedule saved successfully"
14. Callback fires with all channel schedules

---

## 🎯 VALIDATION RULES

### Date Validation
```typescript
// Must be >= today
if (scheduledDate < today) {
  return { state: 'error', message: 'Date cannot be in the past' };
}

// Valid
return { state: 'valid', message: 'Valid date' };
```

### Time Validation
```typescript
// Check business hours
const hour = parseInt(time.split(':')[0]);
if (hour < 6 || hour > 20) {
  return { state: 'warning', message: 'Outside business hours (6:00-20:00)' };
}

// Valid
return { state: 'valid' };
```

### Combined Validation
```typescript
// Check if datetime is in future
const scheduledDateTime = new Date(`${date}T${time}`);
const now = new Date();

if (scheduledDateTime < now) {
  return { state: 'error', message: 'Date/time must be in the future' };
}
```

---

## 🔧 TECHNICAL SPECIFICATIONS

### Component File
`/components/publication-scheduler/PublicationScheduler.tsx`

### Dependencies
```tsx
import { useState, useMemo } from 'react';
import { Language } from '../../App';
import { 
  Calendar, Clock, Mail, Globe, FileCheck, Presentation, 
  MessageSquare, Share2, CheckCircle2, AlertTriangle, XCircle, 
  Zap, CalendarClock, TrendingUp, Info 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
```

### State Management
```typescript
const [publishNow, setPublishNow] = useState(false);
const [unifiedSchedule, setUnifiedSchedule] = useState(true);
const [unifiedDate, setUnifiedDate] = useState('');
const [unifiedTime, setUnifiedTime] = useState('14:00');
const [channels, setChannels] = useState<ChannelSchedule[]>([...]);
```

### Performance
- **useMemo** for stats calculation
- Efficient time calculations (cached)
- Optimized re-renders (channel-specific updates)

---

## ✅ IMPLEMENTATION CHECKLIST

- [x] Publish Now toggle (master switch)
- [x] Unified Schedule toggle
- [x] Single date/time picker (unified mode)
- [x] Individual date/time pickers per channel
- [x] 4 quick presets (Tomorrow 9AM, 2PM, End of week, Next Monday)
- [x] Date validation (no past dates)
- [x] Time validation (business hours warning)
- [x] Combined datetime validation
- [x] Time until publish countdown
- [x] Summary panel (sticky)
- [x] Next publication highlight
- [x] Scheduled channels list
- [x] Validation banner (warnings)
- [x] Sticky action bar
- [x] Stats calculation (useMemo)
- [x] Toast notifications
- [x] Accessibility (WCAG AA)
- [x] Internationalization (PL/EN)
- [x] Responsive design
- [x] Empty state
- [x] Disabled state (action button)

---

**Design Status:** ✅ Complete  
**Implementation Status:** ✅ Complete  
**Testing Status:** 🟡 Ready for QA  
**Documentation:** ✅ Complete
