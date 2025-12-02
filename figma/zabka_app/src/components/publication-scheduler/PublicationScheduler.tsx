import { useState, useMemo } from 'react';
import { Language } from '../../App';
import { 
  Calendar, Clock, Mail, Globe, FileCheck, Presentation, MessageSquare, Share2,
  CheckCircle2, AlertTriangle, XCircle, Zap, CalendarClock, TrendingUp, Info, FileText, Users
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button, Card, Input, Badge, CustomCheckbox } from '../ui';

type ValidationState = 'valid' | 'warning' | 'error' | 'pending';

interface ChannelSchedule {
  channelId: string;
  channelName: string;
  channelIcon: React.ReactNode;
  channelColor: string;
  selected: boolean;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  validationState: ValidationState;
  validationMessage?: string;
}

interface PublicationSchedulerProps {
  language: Language;
  theme?: 'light' | 'dark';
  selectedChannels?: string[];
  documentData?: {
    title: string;
    teams: string[];
    content: string;
    socialPlatforms?: string[];
    createdBy?: string;
  };
  onToggleLanguage?: () => void;
  onSchedule?: (schedules: ChannelSchedule[]) => void;
  onSaveDraft?: (schedules: ChannelSchedule[]) => void;
  onCancel?: () => void;
}

export function PublicationScheduler({ 
  language,
  theme = 'dark',
  selectedChannels = ['email', 'intranet', 'release-notes'],
  documentData,
  onToggleLanguage, 
  onSchedule, 
  onSaveDraft,
  onCancel 
}: PublicationSchedulerProps) {
  // Map channel names from DocumentWizard to channel IDs
  const normalizeChannelName = (channelName: string): string => {
    const mapping: { [key: string]: string } = {
      'Email': 'email',
      'Intranet': 'intranet',
      'Release Notes': 'release-notes',
      'Presentation': 'presentation',
      'Teams/SharePoint': 'teams-sharepoint',
      'Social Media': 'social-media',
      // Already normalized IDs
      'email': 'email',
      'intranet': 'intranet',
      'release-notes': 'release-notes',
      'presentation': 'presentation',
      'teams-sharepoint': 'teams-sharepoint',
      'social-media': 'social-media'
    };
    return mapping[channelName] || channelName.toLowerCase().replace(/\s+/g, '-');
  };

  // Normalize incoming selectedChannels
  const normalizedSelectedChannels = selectedChannels.map(normalizeChannelName);

  const [publishNow, setPublishNow] = useState(false);
  const [unifiedSchedule, setUnifiedSchedule] = useState(true);
  const [unifiedDate, setUnifiedDate] = useState('');
  const [unifiedTime, setUnifiedTime] = useState('14:00');
  
  const [channels, setChannels] = useState<ChannelSchedule[]>([
    {
      channelId: 'email',
      channelName: 'Email',
      channelIcon: <Mail className="w-6 h-6" />,
      channelColor: 'blue',
      selected: normalizedSelectedChannels.includes('email'),
      scheduledDate: '',
      scheduledTime: '14:00',
      validationState: 'pending',
    },
    {
      channelId: 'intranet',
      channelName: language === 'pl' ? 'Portal Intranet' : 'Intranet Portal',
      channelIcon: <Globe className="w-6 h-6" />,
      channelColor: 'green',
      selected: normalizedSelectedChannels.includes('intranet'),
      scheduledDate: '',
      scheduledTime: '14:00',
      validationState: 'pending',
    },
    {
      channelId: 'release-notes',
      channelName: 'Release Notes',
      channelIcon: <FileCheck className="w-6 h-6" />,
      channelColor: 'purple',
      selected: normalizedSelectedChannels.includes('release-notes'),
      scheduledDate: '',
      scheduledTime: '09:00',
      validationState: 'pending',
    },
    {
      channelId: 'presentation',
      channelName: language === 'pl' ? 'Prezentacja' : 'Presentation',
      channelIcon: <Presentation className="w-6 h-6" />,
      channelColor: 'orange',
      selected: normalizedSelectedChannels.includes('presentation'),
      scheduledDate: '',
      scheduledTime: '10:00',
      validationState: 'pending',
    },
    {
      channelId: 'teams-sharepoint',
      channelName: 'Teams/SharePoint',
      channelIcon: <MessageSquare className="w-6 h-6" />,
      channelColor: 'indigo',
      selected: normalizedSelectedChannels.includes('teams-sharepoint'),
      scheduledDate: '',
      scheduledTime: '14:00',
      validationState: 'pending',
    },
    {
      channelId: 'social-media',
      channelName: 'Social Media',
      channelIcon: <Share2 className="w-6 h-6" />,
      channelColor: 'pink',
      selected: normalizedSelectedChannels.includes('social-media'),
      scheduledDate: '',
      scheduledTime: '16:00',
      validationState: 'pending',
    }
  ]);

  const translations = {
    pl: {
      title: 'Harmonogram Publikacji',
      description: 'Zaplanuj kiedy Twój komunikat zostanie opublikowany na wybranych kanałach',
      publishNow: 'Publikuj natychmiast',
      publishNowDesc: 'Komunikat zostanie opublikowany zaraz po zatwierdzeniu',
      unifiedSchedule: 'Jednolity harmonogram',
      unifiedScheduleDesc: 'Wszystkie kanały zostaną opublikowane w tym samym czasie',
      individualSchedules: 'Indywidualne harmonogramy',
      individualSchedulesDesc: 'Ustaw osobny czas publikacji dla każdego kanału',
      selectDate: 'Wybierz datę',
      selectTime: 'Wybierz godzinę',
      scheduled: 'Zaplanowane',
      publishingNow: 'Publikacja natychmiastowa',
      validDate: 'Data poprawna',
      pastDate: 'Data nie może być w przeszłości',
      outsideHours: 'Poza godzinami pracy (6:00-20:00)',
      differentTimes: 'Różne czasy publikacji',
      summary: 'Podsumowanie',
      scheduledChannels: 'Zaplanowane kanały',
      timeUntilPublish: 'Czas do publikacji',
      nextPublication: 'Kolejna publikacja',
      days: 'dni',
      hours: 'godz',
      minutes: 'min',
      quickPresets: 'Szybkie ustawienia',
      tomorrow9am: 'Jutro 9:00',
      tomorrow2pm: 'Jutro 14:00',
      endOfWeek: 'Koniec tygodnia',
      nextMonday: 'Następny poniedziałek',
      saveDraft: 'Zapisz szkic',
      publishNowBtn: 'Publikuj teraz',
      schedule: 'Zaplanuj publikację',
      cancel: 'Anuluj',
      allValid: 'Wszystkie harmonogramy poprawne',
      hasWarnings: 'ostrzeżeń',
      hasErrors: 'błędów',
      noChannelsSelected: 'Nie wybrano żadnego kanału',
      selectAtLeastOne: 'Wybierz przynajmniej jeden kanał do publikacji',
      scheduledSuccess: 'Harmonogram zapisany pomyślnie',
      publishedSuccess: 'Komunikat opublikowany',
      draftSaved: 'Szkic zapisany'
    },
    en: {
      title: 'Publication Schedule',
      description: 'Plan when your message will be published on selected channels',
      publishNow: 'Publish immediately',
      publishNowDesc: 'Message will be published right after approval',
      unifiedSchedule: 'Unified schedule',
      unifiedScheduleDesc: 'All channels will be published at the same time',
      individualSchedules: 'Individual schedules',
      individualSchedulesDesc: 'Set separate publication time for each channel',
      selectDate: 'Select date',
      selectTime: 'Select time',
      scheduled: 'Scheduled',
      publishingNow: 'Publishing now',
      validDate: 'Valid date',
      pastDate: 'Date cannot be in the past',
      outsideHours: 'Outside business hours (6:00-20:00)',
      differentTimes: 'Different publication times',
      summary: 'Summary',
      scheduledChannels: 'Scheduled channels',
      timeUntilPublish: 'Time until publish',
      nextPublication: 'Next publication',
      days: 'days',
      hours: 'hrs',
      minutes: 'min',
      quickPresets: 'Quick presets',
      tomorrow9am: 'Tomorrow 9 AM',
      tomorrow2pm: 'Tomorrow 2 PM',
      endOfWeek: 'End of week',
      nextMonday: 'Next Monday',
      saveDraft: 'Save draft',
      publishNowBtn: 'Publish now',
      schedule: 'Schedule publication',
      cancel: 'Cancel',
      allValid: 'All schedules valid',
      hasWarnings: 'warnings',
      hasErrors: 'errors',
      noChannelsSelected: 'No channels selected',
      selectAtLeastOne: 'Select at least one channel to publish',
      scheduledSuccess: 'Schedule saved successfully',
      publishedSuccess: 'Message published',
      draftSaved: 'Draft saved'
    }
  };

  const t = translations[language];

  const channelColors = {
    blue: { bg: 'bg-blue-500', light: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500' },
    green: { bg: 'bg-green-500', light: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500' },
    purple: { bg: 'bg-purple-500', light: 'bg-purple-500/20', text: 'text-purple-500', border: 'border-purple-500' },
    orange: { bg: 'bg-orange-500', light: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500' },
    indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-500/20', text: 'text-indigo-500', border: 'border-indigo-500' },
    pink: { bg: 'bg-pink-500', light: 'bg-pink-500/20', text: 'text-pink-500', border: 'border-pink-500' }
  };

  // Get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get end of week date
  const getEndOfWeekDate = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = 5 - day; // Friday
    date.setDate(date.getDate() + diff);
    return date.toISOString().split('T')[0];
  };

  // Get next Monday
  const getNextMondayDate = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = day === 0 ? 1 : 8 - day; // Next Monday
    date.setDate(date.getDate() + diff);
    return date.toISOString().split('T')[0];
  };

  // Validate date/time
  const validateSchedule = (date: string, time: string): { state: ValidationState; message?: string } => {
    if (!date || !time) {
      return { state: 'pending' };
    }

    const scheduledDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    // Check if in past
    if (scheduledDateTime < now) {
      return { state: 'error', message: t.pastDate };
    }

    // Check if outside business hours (6 AM - 8 PM)
    const hour = parseInt(time.split(':')[0]);
    if (hour < 6 || hour > 20) {
      return { state: 'warning', message: t.outsideHours };
    }

    return { state: 'valid', message: t.validDate };
  };

  // Calculate time until publish
  const calculateTimeUntil = (date: string, time: string) => {
    if (!date || !time) return null;

    const scheduledDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = scheduledDateTime.getTime() - now.getTime();

    if (diff < 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  // Stats
  const stats = useMemo(() => {
    const selectedChannelsList = channels.filter(ch => ch.selected);
    const scheduledCount = publishNow ? selectedChannelsList.length : selectedChannelsList.filter(ch => ch.scheduledDate && ch.scheduledTime).length;
    
    const warnings = selectedChannelsList.filter(ch => ch.validationState === 'warning').length;
    const errors = selectedChannelsList.filter(ch => ch.validationState === 'error').length;
    
    // Find next publication
    let nextPublish: { date: string; time: string; channel: string } | null = null;
    if (!publishNow && scheduledCount > 0) {
      const scheduled = selectedChannelsList
        .filter(ch => ch.scheduledDate && ch.scheduledTime)
        .map(ch => ({
          date: ch.scheduledDate,
          time: ch.scheduledTime,
          channel: ch.channelName,
          datetime: new Date(`${ch.scheduledDate}T${ch.scheduledTime}`)
        }))
        .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
      
      if (scheduled.length > 0) {
        nextPublish = scheduled[0];
      }
    }

    const isValid = selectedChannelsList.length > 0 && errors === 0 && (publishNow || scheduledCount > 0);

    return {
      selectedCount: selectedChannelsList.length,
      scheduledCount,
      warnings,
      errors,
      isValid,
      nextPublish
    };
  }, [channels, publishNow]);

  // Update unified schedule
  const handleUnifiedDateChange = (date: string) => {
    setUnifiedDate(date);
    if (unifiedSchedule) {
      setChannels(prev => prev.map(ch => {
        if (!ch.selected) return ch;
        const validation = validateSchedule(date, ch.scheduledTime);
        return {
          ...ch,
          scheduledDate: date,
          validationState: validation.state,
          validationMessage: validation.message
        };
      }));
    }
  };

  const handleUnifiedTimeChange = (time: string) => {
    setUnifiedTime(time);
    if (unifiedSchedule) {
      setChannels(prev => prev.map(ch => {
        if (!ch.selected) return ch;
        const validation = validateSchedule(ch.scheduledDate, time);
        return {
          ...ch,
          scheduledTime: time,
          validationState: validation.state,
          validationMessage: validation.message
        };
      }));
    }
  };

  // Update individual channel
  const handleChannelDateChange = (channelId: string, date: string) => {
    setChannels(prev => prev.map(ch => {
      if (ch.channelId === channelId) {
        const validation = validateSchedule(date, ch.scheduledTime);
        return {
          ...ch,
          scheduledDate: date,
          validationState: validation.state,
          validationMessage: validation.message
        };
      }
      return ch;
    }));
  };

  const handleChannelTimeChange = (channelId: string, time: string) => {
    setChannels(prev => prev.map(ch => {
      if (ch.channelId === channelId) {
        const validation = validateSchedule(ch.scheduledDate, time);
        return {
          ...ch,
          scheduledTime: time,
          validationState: validation.state,
          validationMessage: validation.message
        };
      }
      return ch;
    }));
  };

  // Quick presets
  const applyPreset = (preset: 'tomorrow9am' | 'tomorrow2pm' | 'endOfWeek' | 'nextMonday') => {
    let date = '';
    let time = '';

    switch (preset) {
      case 'tomorrow9am':
        date = getTomorrowDate();
        time = '09:00';
        break;
      case 'tomorrow2pm':
        date = getTomorrowDate();
        time = '14:00';
        break;
      case 'endOfWeek':
        date = getEndOfWeekDate();
        time = '17:00';
        break;
      case 'nextMonday':
        date = getNextMondayDate();
        time = '09:00';
        break;
    }

    setUnifiedDate(date);
    setUnifiedTime(time);
    handleUnifiedDateChange(date);
    handleUnifiedTimeChange(time);
    toast.success(language === 'pl' ? 'Preset zastosowany' : 'Preset applied');
  };

  // Toggle publish now
  const handlePublishNowToggle = () => {
    const newValue = !publishNow;
    setPublishNow(newValue);
    
    if (newValue) {
      // Reset validation when publishing now
      setChannels(prev => prev.map(ch => ({
        ...ch,
        validationState: 'valid',
        validationMessage: undefined
      })));
      toast.success(t.publishNowDesc);
    }
  };

  // Toggle unified schedule
  const handleUnifiedToggle = () => {
    const newValue = !unifiedSchedule;
    setUnifiedSchedule(newValue);
    
    if (newValue && unifiedDate && unifiedTime) {
      // Apply unified schedule to all selected channels
      handleUnifiedDateChange(unifiedDate);
      handleUnifiedTimeChange(unifiedTime);
    }
  };

  // Handle schedule
  const handleSchedule = () => {
    if (!stats.isValid) {
      if (stats.selectedCount === 0) {
        toast.error(t.selectAtLeastOne);
      } else if (stats.errors > 0) {
        toast.error(language === 'pl' ? 'Napraw błędy przed publikacją' : 'Fix errors before publishing');
      } else {
        toast.error(language === 'pl' ? 'Uzupełnij harmonogram' : 'Complete the schedule');
      }
      return;
    }

    const selectedSchedules = channels.filter(ch => ch.selected);
    
    if (publishNow) {
      toast.success(t.publishedSuccess);
      if (onSchedule) {
        onSchedule(selectedSchedules);
      }
    } else {
      toast.success(t.scheduledSuccess);
      if (onSchedule) {
        onSchedule(selectedSchedules);
      }
    }
  };

  const handleSaveDraft = () => {
    const selectedSchedules = channels.filter(ch => ch.selected);
    toast.success(t.draftSaved);
    if (onSaveDraft) {
      onSaveDraft(selectedSchedules);
    }
  };

  const selectedChannelsList = channels.filter(ch => ch.selected);

  return (
    <div className="p-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <CalendarClock className="w-8 h-8 text-[#00B67A]" />
            {t.title}
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            {t.description}
          </p>
        </div>

        {/* Document Preview Card */}
        {documentData && (
          <div className={`rounded-2xl border border-[#00B67A]/30 p-6 mb-8 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
              : 'bg-white'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00B67A]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#00B67A]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xl mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{documentData.title}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className={`w-4 h-4 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`} />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                          {language === 'pl' ? 'Zespoły:' : 'Teams:'}
                        </span>
                        <div className="flex gap-2">
                          {documentData.teams.map(team => (
                            <span 
                              key={team}
                              className={`px-2 py-1 rounded text-xs ${
                                team === 'HR' 
                                  ? `bg-blue-500/20 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}` :
                                team === 'Dział Prawny' 
                                  ? `bg-purple-500/20 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}` :
                                team === 'IT & Tech' 
                                  ? `bg-green-500/20 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}` :
                                team === 'Marketing' 
                                  ? `bg-orange-500/20 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}` :
                                `bg-gray-500/20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                              }`}
                            >
                              {team}
                            </span>
                          ))}
                        </div>
                      </div>
                      {documentData.socialPlatforms && documentData.socialPlatforms.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Share2 className="w-4 h-4 text-pink-400" />
                          <div className="flex gap-2">
                            {documentData.socialPlatforms.map(platform => (
                              <span 
                                key={platform}
                                className="px-2 py-1 rounded text-xs bg-pink-500/20 text-pink-400"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {documentData.createdBy && (
                        <div className={`flex items-center gap-2 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <Users className="w-4 h-4" />
                          <span>{documentData.createdBy}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`rounded-lg p-4 border ${
                  theme === 'dark'
                    ? 'bg-[#0F1229] border-[#00B67A]/20'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm line-clamp-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {documentData.content}
                  </p>
                  {documentData.content.length > 200 && (
                    <p className="text-[#00B67A] text-xs mt-2">
                      {language === 'pl' ? `+ ${documentData.content.length - 200} znaków więcej` : `+ ${documentData.content.length - 200} more characters`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Toggles */}
        <div className="space-y-4 mb-8">
          {/* Publish Now Toggle */}
          <div className={`rounded-xl p-6 border ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
              : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
          }`}>
            <label className="flex items-start gap-4 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={publishNow}
                  onChange={handlePublishNowToggle}
                  className="sr-only peer"
                />
                <div className={`w-14 h-8 rounded-full peer-checked:bg-[#00B67A] transition-all ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <div className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-all peer-checked:translate-x-6 ${
                  theme === 'dark' ? 'bg-white' : 'bg-white'
                }`}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-[#00B67A]" />
                  <span className={`text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{t.publishNow}</span>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{t.publishNowDesc}</p>
              </div>
            </label>
          </div>

          {/* Unified Schedule Toggle */}
          {!publishNow && (
            <div className={`rounded-xl p-6 border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
            }`}>
              <label className="flex items-start gap-4 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={unifiedSchedule}
                    onChange={handleUnifiedToggle}
                    className="sr-only peer"
                  />
                  <div className={`w-14 h-8 rounded-full peer-checked:bg-[#00B67A] transition-all ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                  }`}></div>
                  <div className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-all peer-checked:translate-x-6 ${
                    theme === 'dark' ? 'bg-white' : 'bg-white'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 text-[#00B67A]" />
                    <span className={`text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{unifiedSchedule ? t.unifiedSchedule : t.individualSchedules}</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{unifiedSchedule ? t.unifiedScheduleDesc : t.individualSchedulesDesc}</p>
                </div>
              </label>

              {/* Unified Date/Time Pickers */}
              {unifiedSchedule && (
                <div className="mt-6 pt-6 border-t border-[#00B67A]/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={`text-sm mb-2 block flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        {t.selectDate}
                      </label>
                      <input
                        type="date"
                        value={unifiedDate}
                        onChange={(e) => handleUnifiedDateChange(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full border border-[#00B67A]/30 rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                          theme === 'dark'
                            ? 'bg-[#0F1229] text-white'
                            : 'bg-white text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`text-sm mb-2 block flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4" />
                        {t.selectTime}
                      </label>
                      <input
                        type="time"
                        value={unifiedTime}
                        onChange={(e) => handleUnifiedTimeChange(e.target.value)}
                        className={`w-full border border-[#00B67A]/30 rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                          theme === 'dark'
                            ? 'bg-[#0F1229] text-white'
                            : 'bg-white text-gray-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div>
                    <label className={`text-sm mb-2 block ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{t.quickPresets}</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => applyPreset('tomorrow9am')}
                        className="bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2 rounded-[8px] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                      >
                        {t.tomorrow9am}
                      </button>
                      <button
                        onClick={() => applyPreset('tomorrow2pm')}
                        className="bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2 rounded-[8px] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                      >
                        {t.tomorrow2pm}
                      </button>
                      <button
                        onClick={() => applyPreset('endOfWeek')}
                        className="bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2 rounded-[8px] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                      >
                        {t.endOfWeek}
                      </button>
                      <button
                        onClick={() => applyPreset('nextMonday')}
                        className="bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2 rounded-[8px] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                      >
                        {t.nextMonday}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content: Scheduler Grid + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left: Scheduler Grid */}
          <div className="lg:col-span-8 space-y-4">
            {selectedChannelsList.length === 0 ? (
              <div className={`rounded-2xl p-12 border border-[#00B67A]/30 text-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                  : 'bg-white'
              }`}>
                <CalendarClock className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`} />
                <h3 className={`text-xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{t.noChannelsSelected}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {t.selectAtLeastOne}
                </p>
              </div>
            ) : (
              selectedChannelsList.map((channel) => {
                const colors = channelColors[channel.channelColor as keyof typeof channelColors];
                const timeUntil = calculateTimeUntil(channel.scheduledDate, channel.scheduledTime);

                return (
                  <div
                    key={channel.channelId}
                    className={`rounded-xl p-6 border border-[#00B67A]/30 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                        : 'bg-white'
                    }`}
                  >
                    {/* Channel Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${colors.light} rounded-xl flex items-center justify-center ${colors.text}`}>
                        {channel.channelIcon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{channel.channelName}</h3>
                        {publishNow ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="w-4 h-4 text-[#00B67A]" />
                            <span className="text-[#00B67A]">{t.publishingNow}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm">
                            {channel.validationState === 'valid' && <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />}
                            {channel.validationState === 'warning' && <AlertTriangle className={`w-4 h-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`} />}
                            {channel.validationState === 'error' && <XCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />}
                            <span className={`${
                              channel.validationState === 'valid' ? 'text-[#00B67A]' :
                              channel.validationState === 'warning' ? theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700' :
                              channel.validationState === 'error' ? theme === 'dark' ? 'text-red-400' : 'text-red-600' :
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {channel.validationMessage || t.scheduled}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Status Badge */}
                      {channel.scheduledDate && channel.scheduledTime && !publishNow && (
                        <div className={`px-3 py-1 rounded-full text-xs ${
                          channel.validationState === 'valid' 
                            ? 'bg-[#00B67A]/20 text-[#00B67A]' :
                          channel.validationState === 'warning' 
                            ? `bg-yellow-500/20 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}` :
                          `bg-red-500/20 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`
                        }`}>
                          {t.scheduled}
                        </div>
                      )}
                    </div>

                    {/* Social Media Platforms Tags */}
                    {channel.channelId === 'social-media' && documentData?.socialPlatforms && documentData.socialPlatforms.length > 0 && (
                      <div className="mb-4 flex items-center gap-2 flex-wrap">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {language === 'pl' ? 'Platformy:' : 'Platforms:'}
                        </span>
                        {documentData.socialPlatforms.map(platform => (
                          <span 
                            key={platform}
                            className="px-2 py-1 rounded text-xs bg-pink-500/20 text-pink-400 border border-pink-500/30"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Date/Time Pickers (only if not publishing now and not unified) */}
                    {!publishNow && !unifiedSchedule && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`text-sm mb-2 block flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <Calendar className="w-4 h-4" />
                            {t.selectDate}
                          </label>
                          <input
                            type="date"
                            value={channel.scheduledDate}
                            onChange={(e) => handleChannelDateChange(channel.channelId, e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full border border-[#00B67A]/30 rounded-[8px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                              theme === 'dark'
                                ? 'bg-[#0F1229] text-white'
                                : 'bg-white text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`text-sm mb-2 block flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <Clock className="w-4 h-4" />
                            {t.selectTime}
                          </label>
                          <input
                            type="time"
                            value={channel.scheduledTime}
                            onChange={(e) => handleChannelTimeChange(channel.channelId, e.target.value)}
                            className={`w-full border border-[#00B67A]/30 rounded-[8px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                              theme === 'dark'
                                ? 'bg-[#0F1229] text-white'
                                : 'bg-white text-gray-900'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Show scheduled time if unified or publish now */}
                    {!publishNow && unifiedSchedule && channel.scheduledDate && channel.scheduledTime && (
                      <div className={`flex items-center gap-4 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(channel.scheduledDate).toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{channel.scheduledTime}</span>
                        </div>
                        {timeUntil && (
                          <div className="flex items-center gap-2 text-[#00B67A]">
                            <TrendingUp className="w-4 h-4" />
                            <span>
                              {timeUntil.days > 0 && `${timeUntil.days} ${t.days} `}
                              {timeUntil.hours > 0 && `${timeUntil.hours} ${t.hours} `}
                              {timeUntil.minutes} {t.minutes}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Summary Panel */}
          <div className="lg:col-span-4">
            <div className={`rounded-2xl p-6 border border-[#00B67A]/30 sticky top-8 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                : 'bg-white'
            }`}>
              <h3 className={`text-xl mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Info className="w-5 h-5 text-[#00B67A]" />
                {t.summary}
              </h3>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className={`flex items-center justify-between pb-3 ${
                  theme === 'dark' ? 'border-b border-[#00B67A]/20' : 'border-b border-gray-200'
                }`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {t.scheduledChannels}
                  </span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {stats.scheduledCount} / {stats.selectedCount}
                  </span>
                </div>

                {stats.warnings > 0 && (
                  <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <span>{stats.warnings} {t.hasWarnings}</span>
                  </div>
                )}

                {stats.errors > 0 && (
                  <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="w-4 h-4" />
                    <span>{stats.errors} {t.hasErrors}</span>
                  </div>
                )}
              </div>

              {/* Next Publication */}
              {stats.nextPublish && !publishNow && (
                <div className="bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-xl p-4 mb-6">
                  <p className={`text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t.nextPublication}</p>
                  <p className={`mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{stats.nextPublish.channel}</p>
                  <p className="text-[#00B67A] text-sm">
                    {new Date(`${stats.nextPublish.date}T${stats.nextPublish.time}`).toLocaleString(language === 'pl' ? 'pl-PL' : 'en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {(() => {
                    const timeUntil = calculateTimeUntil(stats.nextPublish.date, stats.nextPublish.time);
                    if (timeUntil) {
                      return (
                        <div className="mt-3 pt-3 border-t border-[#00B67A]/20">
                          <p className={`text-xs mb-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{t.timeUntilPublish}</p>
                          <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            {timeUntil.days > 0 && `${timeUntil.days} ${t.days} `}
                            {timeUntil.hours > 0 && `${timeUntil.hours} ${t.hours} `}
                            {timeUntil.minutes} {t.minutes}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              {/* Scheduled Channels List */}
              {stats.scheduledCount > 0 && !publishNow && (
                <div>
                  <p className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t.scheduledChannels}</p>
                  <div className="space-y-2">
                    {selectedChannelsList
                      .filter(ch => ch.scheduledDate && ch.scheduledTime)
                      .map(ch => {
                        const colors = channelColors[ch.channelColor as keyof typeof channelColors];
                        return (
                          <div key={ch.channelId} className="flex items-center gap-3 text-sm">
                            <div className={`w-8 h-8 ${colors.light} rounded-lg flex items-center justify-center ${colors.text}`}>
                              {ch.channelIcon}
                            </div>
                            <div className="flex-1">
                              <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                {ch.channelName}
                              </p>
                              <p className={`text-xs ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {new Date(`${ch.scheduledDate}T${ch.scheduledTime}`).toLocaleString(language === 'pl' ? 'pl-PL' : 'en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            {ch.validationState === 'valid' && <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />}
                            {ch.validationState === 'warning' && <AlertTriangle className={`w-4 h-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`} />}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Publish Now Summary */}
              {publishNow && (
                <div className="bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#00B67A] mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">{t.publishingNow}</span>
                  </div>
                  <p className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t.publishNowDesc}</p>
                  <div className="space-y-1">
                    {selectedChannelsList.map(ch => {
                      const colors = channelColors[ch.channelColor as keyof typeof channelColors];
                      return (
                        <div key={ch.channelId} className="flex items-center gap-2 text-sm">
                          <div className={`w-6 h-6 ${colors.light} rounded flex items-center justify-center ${colors.text}`}>
                            {ch.channelIcon}
                          </div>
                          <span className="text-white">{ch.channelName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Validation Banner */}
        {stats.warnings > 0 && !publishNow && (
          <div className={`bg-yellow-500/20 border border-yellow-500 rounded-xl p-4 mb-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <p className="font-medium">{stats.warnings} {t.hasWarnings}</p>
                <p className="text-sm opacity-80">{t.outsideHours}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Action Bar */}
      <div className={`sticky bottom-0 left-0 right-0 border-t p-6 backdrop-blur-sm z-10 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
          : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <span className={`font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{stats.scheduledCount}</span> / {stats.selectedCount} {t.scheduledChannels.toLowerCase()}
            {stats.nextPublish && !publishNow && (
              <span className="ml-4 text-[#00B67A]">
                • {t.nextPublication}: {new Date(`${stats.nextPublish.date}T${stats.nextPublish.time}`).toLocaleString(language === 'pl' ? 'pl-PL' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              className={`px-6 py-3 rounded-[8px] transition-all border hover:border-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                theme === 'dark'
                  ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white border-[#00B67A]/30'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              {t.saveDraft}
            </button>
            <button
              onClick={handleSchedule}
              disabled={!stats.isValid}
              className={`px-6 py-3 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A] ${
                stats.isValid
                  ? 'bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white'
                  : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
              }`}
            >
              {publishNow ? t.publishNowBtn : t.schedule}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}