import { useState, useMemo } from 'react';
import { Language } from '../../App';
import { 
  Mail, Globe, FileText, Presentation, MessageSquare, Share2,
  Check, Settings, AlertTriangle, ChevronRight, ChevronLeft, Eye,
  CheckCircle2, XCircle, Info, X
} from 'lucide-react';
import { CustomCheckbox } from '../ui/custom-checkbox';
import { toast } from 'sonner';

type ValidationState = 'valid' | 'warning' | 'error' | 'pending';

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
  options?: string[];
  errorMessage?: string;
  helperText?: string;
}

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  required: boolean;
  requirements: Requirement[];
  validationState: ValidationState;
  color: string;
}

interface DistributionChannelsProps {
  language: Language;
  onToggleLanguage?: () => void;
  onContinue?: () => void;
  theme?: 'light' | 'dark';
}

export function DistributionChannels({ language, onToggleLanguage, onContinue, theme = 'dark' }: DistributionChannelsProps) {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'email',
      name: language === 'pl' ? 'Email' : 'Email',
      icon: <Mail className="w-6 h-6" />,
      description: language === 'pl' 
        ? 'Wysyłka komunikatu bezpośrednio na skrzynki pocztowe pracowników'
        : 'Send message directly to employee inboxes',
      selected: false,
      required: false,
      color: 'blue',
      validationState: 'pending',
      requirements: [
        {
          id: 'subject',
          label: language === 'pl' ? 'Temat wiadomości' : 'Subject line',
          type: 'text',
          required: true,
          fulfilled: false,
          value: '',
          validation: { min: 10, max: 120 },
          helperText: language === 'pl' ? 'Optymalnie 40-60 znaków' : 'Optimal 40-60 characters'
        },
        {
          id: 'plainText',
          label: language === 'pl' ? 'Wersja tekstowa (plain text)' : 'Plain text version',
          type: 'boolean',
          required: true,
          fulfilled: false,
          value: false
        },
        {
          id: 'sender',
          label: language === 'pl' ? 'Nadawca i podpis' : 'Sender information',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: ['HR Team', 'IT Department', 'Legal Team', 'Marketing', 'Management']
        },
        {
          id: 'footer',
          label: language === 'pl' ? 'Stopka z danymi kontaktowymi' : 'Contact footer',
          type: 'boolean',
          required: false,
          fulfilled: true,
          value: true
        }
      ]
    },
    {
      id: 'intranet',
      name: language === 'pl' ? 'Portal Intranet' : 'Intranet Portal',
      icon: <Globe className="w-6 h-6" />,
      description: language === 'pl'
        ? 'Publikacja na portalu wewnętrznym widoczna dla wszystkich'
        : 'Publish to internal portal visible to everyone',
      selected: false,
      required: false,
      color: 'green',
      validationState: 'pending',
      requirements: [
        {
          id: 'seoTitle',
          label: language === 'pl' ? 'Tytuł SEO' : 'SEO Title',
          type: 'text',
          required: true,
          fulfilled: false,
          value: '',
          validation: { min: 30, max: 60 },
          helperText: language === 'pl' ? 'Widoczny w wynikach wyszukiwania' : 'Visible in search results'
        },
        {
          id: 'metaDescription',
          label: language === 'pl' ? 'Meta opis' : 'Meta description',
          type: 'text',
          required: true,
          fulfilled: false,
          value: '',
          validation: { min: 120, max: 160 }
        },
        {
          id: 'category',
          label: language === 'pl' ? 'Kategoria' : 'Category',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: [
            language === 'pl' ? 'Aktualności' : 'News',
            language === 'pl' ? 'Polityka' : 'Policy',
            language === 'pl' ? 'IT & Tech' : 'IT & Tech',
            language === 'pl' ? 'HR' : 'HR',
            language === 'pl' ? 'Bezpieczeństwo' : 'Security'
          ]
        },
        {
          id: 'featuredImage',
          label: language === 'pl' ? 'Obrazek wyróżniający' : 'Featured image',
          type: 'boolean',
          required: false,
          fulfilled: false,
          value: false
        }
      ]
    },
    {
      id: 'release-notes',
      name: language === 'pl' ? 'Release Notes' : 'Release Notes',
      icon: <FileText className="w-6 h-6" />,
      description: language === 'pl'
        ? 'Techniczny dokument zmian dla developerów i IT'
        : 'Technical change document for developers and IT',
      selected: false,
      required: false,
      color: 'purple',
      validationState: 'pending',
      requirements: [
        {
          id: 'version',
          label: language === 'pl' ? 'Numer wersji' : 'Version number',
          type: 'text',
          required: true,
          fulfilled: false,
          value: '',
          helperText: 'e.g., v2.5.1 or 2024.11.30'
        },
        {
          id: 'changeSummary',
          label: language === 'pl' ? 'Podsumowanie zmian' : 'Change summary',
          type: 'text',
          required: true,
          fulfilled: false,
          value: '',
          validation: { min: 50, max: 500 }
        },
        {
          id: 'impactLevel',
          label: language === 'pl' ? 'Poziom wpływu' : 'Impact level',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: [
            language === 'pl' ? 'Niski (Minor)' : 'Low (Minor)',
            language === 'pl' ? 'Średni (Major)' : 'Medium (Major)',
            language === 'pl' ? 'Wysoki (Critical)' : 'High (Critical)'
          ]
        },
        {
          id: 'breakingChanges',
          label: language === 'pl' ? 'Zmiany krytyczne (breaking)' : 'Breaking changes',
          type: 'boolean',
          required: false,
          fulfilled: false,
          value: false
        }
      ]
    },
    {
      id: 'presentation',
      name: language === 'pl' ? 'Prezentacja' : 'Presentation',
      icon: <Presentation className="w-6 h-6" />,
      description: language === 'pl'
        ? 'Slajdy do prezentacji na spotkaniach i wydarzeniach'
        : 'Slides for meetings and events',
      selected: false,
      required: false,
      color: 'orange',
      validationState: 'pending',
      requirements: [
        {
          id: 'slideCount',
          label: language === 'pl' ? 'Liczba slajdów' : 'Slide count',
          type: 'number',
          required: true,
          fulfilled: false,
          value: 10,
          validation: { min: 5, max: 50 },
          helperText: language === 'pl' ? 'Optymalna długość: 10-20 slajdów' : 'Optimal length: 10-20 slides'
        },
        {
          id: 'visualStyle',
          label: language === 'pl' ? 'Styl wizualny' : 'Visual style',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: [
            language === 'pl' ? 'Korporacyjny' : 'Corporate',
            language === 'pl' ? 'Minimalistyczny' : 'Minimalist',
            language === 'pl' ? 'Nowoczesny' : 'Modern',
            language === 'pl' ? 'Żabka Brand' : 'Zabka Brand'
          ]
        },
        {
          id: 'audienceType',
          label: language === 'pl' ? 'Typ odbiorców' : 'Audience type',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: [
            language === 'pl' ? 'Kierownictwo (C-level)' : 'C-level executives',
            language === 'pl' ? 'Zespoły operacyjne' : 'Operational teams',
            language === 'pl' ? 'Wszyscy pracownicy' : 'All employees',
            language === 'pl' ? 'Zewnętrzni partnerzy' : 'External partners'
          ]
        },
        {
          id: 'charts',
          label: language === 'pl' ? 'Wykresy i statystyki' : 'Charts and statistics',
          type: 'boolean',
          required: false,
          fulfilled: false,
          value: false
        }
      ]
    },
    {
      id: 'teams-sharepoint',
      name: language === 'pl' ? 'Teams/SharePoint' : 'Teams/SharePoint',
      icon: <MessageSquare className="w-6 h-6" />,
      description: language === 'pl'
        ? 'Publikacja w kanałach Microsoft Teams i SharePoint'
        : 'Publish to Microsoft Teams channels and SharePoint',
      selected: false,
      required: false,
      color: 'indigo',
      validationState: 'pending',
      requirements: [
        {
          id: 'channelName',
          label: language === 'pl' ? 'Nazwa kanału Teams' : 'Teams channel name',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: ['General', 'HR Announcements', 'IT Updates', 'Marketing', 'Company News']
        },
        {
          id: 'permissions',
          label: language === 'pl' ? 'Uprawnienia dostępu' : 'Access permissions',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: [
            language === 'pl' ? 'Wszyscy pracownicy' : 'All employees',
            language === 'pl' ? 'Tylko zespół' : 'Team only',
            language === 'pl' ? 'Wybrane osoby' : 'Specific people'
          ]
        },
        {
          id: 'notifications',
          label: language === 'pl' ? 'Powiadomienia push' : 'Push notifications',
          type: 'boolean',
          required: false,
          fulfilled: true,
          value: true
        },
        {
          id: 'pinMessage',
          label: language === 'pl' ? 'Przypnij wiadomość' : 'Pin message',
          type: 'boolean',
          required: false,
          fulfilled: false,
          value: false
        }
      ]
    },
    {
      id: 'social-media',
      name: language === 'pl' ? 'Social Media' : 'Social Media',
      icon: <Share2 className="w-6 h-6" />,
      description: language === 'pl'
        ? 'Publikacja na platformach społecznościowych (LinkedIn, Facebook)'
        : 'Publish to social media platforms (LinkedIn, Facebook)',
      selected: false,
      required: false,
      color: 'pink',
      validationState: 'pending',
      requirements: [
        {
          id: 'platforms',
          label: language === 'pl' ? 'Platformy' : 'Platforms',
          type: 'select',
          required: true,
          fulfilled: false,
          value: '',
          options: ['LinkedIn', 'Facebook', 'Instagram', language === 'pl' ? 'Wszystkie' : 'All']
        },
        {
          id: 'postLength',
          label: language === 'pl' ? 'Długość posta' : 'Post length',
          type: 'text',
          required: true,
          fulfilled: false,
          value: '',
          validation: { min: 50, max: 280 },
          helperText: language === 'pl' ? 'LinkedIn: do 3000, Twitter/X: 280' : 'LinkedIn: up to 3000, Twitter/X: 280'
        },
        {
          id: 'hashtags',
          label: language === 'pl' ? 'Hashtagi' : 'Hashtags',
          type: 'text',
          required: false,
          fulfilled: false,
          value: '',
          helperText: language === 'pl' ? 'Optymalne 3-5 hashtagów' : 'Optimal 3-5 hashtags'
        },
        {
          id: 'scheduledPost',
          label: language === 'pl' ? 'Zaplanowana publikacja' : 'Scheduled post',
          type: 'boolean',
          required: false,
          fulfilled: false,
          value: false
        }
      ]
    }
  ]);

  const translations = {
    pl: {
      title: 'Wybierz Kanały Dystrybucji',
      description: 'Wybierz kanały, którymi chcesz wysłać komunikat. Każdy kanał ma różne wymagania treści.',
      selectedCount: 'Wybrano kanałów',
      of: 'z',
      validationSuccess: 'Wszystkie wymagania spełnione',
      validationWarning: 'wymagań do uzupełnienia',
      validationError: 'błędów do naprawienia',
      requirementsTitle: 'Wymagania dla kanału',
      required: 'Wymagane',
      optional: 'Opcjonalne',
      fulfilled: 'Spełnione',
      pending: 'Oczekujące',
      characters: 'znaków',
      cancel: 'Anuluj',
      saveAndContinue: 'Zapisz i kontynuuj',
      selectChannel: 'Wybierz kanał aby zobaczyć wymagania',
      channelSelected: 'Kanał wybrany',
      channelDeselected: 'Kanał odznaczony',
      fillRequirements: 'Uzupełnij wymagania',
      allValid: 'Wszystkie kanały poprawnie skonfigurowane',
      validState: 'Poprawnie',
      warningState: 'Ostrzeżenia',
      errorState: 'Błędy'
    },
    en: {
      title: 'Select Distribution Channels',
      description: 'Choose the channels for your message. Each channel has different content requirements.',
      selectedCount: 'Selected channels',
      of: 'of',
      validationSuccess: 'All requirements met',
      validationWarning: 'requirements to complete',
      validationError: 'errors to fix',
      requirementsTitle: 'Requirements for channel',
      required: 'Required',
      optional: 'Optional',
      fulfilled: 'Fulfilled',
      pending: 'Pending',
      characters: 'characters',
      cancel: 'Cancel',
      saveAndContinue: 'Save & Continue',
      selectChannel: 'Select a channel to see requirements',
      channelSelected: 'Channel selected',
      channelDeselected: 'Channel deselected',
      fillRequirements: 'Fill requirements',
      allValid: 'All channels configured correctly',
      validState: 'Valid',
      warningState: 'Warnings',
      errorState: 'Errors'
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

  const stats = useMemo(() => {
    const selected = channels.filter(c => c.selected);
    const totalRequirements = selected.reduce((acc, ch) => 
      acc + ch.requirements.filter(r => r.required).length, 0
    );
    const fulfilledRequirements = selected.reduce((acc, ch) => 
      acc + ch.requirements.filter(r => r.required && r.fulfilled).length, 0
    );
    const warnings = selected.reduce((acc, ch) => 
      acc + ch.requirements.filter(r => r.required && !r.fulfilled).length, 0
    );
    const errors = selected.reduce((acc, ch) => 
      acc + ch.requirements.filter(r => r.required && r.errorMessage).length, 0
    );

    return {
      selectedCount: selected.length,
      totalChannels: channels.length,
      totalRequirements,
      fulfilledRequirements,
      warnings,
      errors,
      isValid: warnings === 0 && errors === 0 && selected.length > 0
    };
  }, [channels]);

  const toggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(ch => {
      if (ch.id === channelId) {
        const newSelected = !ch.selected;
        toast.success(newSelected ? t.channelSelected : t.channelDeselected);
        return { ...ch, selected: newSelected };
      }
      return ch;
    }));
    setSelectedChannelId(channelId);
  };

  const updateRequirement = (channelId: string, requirementId: string, value: any) => {
    setChannels(prev => prev.map(ch => {
      if (ch.id === channelId) {
        const updatedRequirements = ch.requirements.map(req => {
          if (req.id === requirementId) {
            let fulfilled = false;
            let errorMessage: string | undefined;

            // Validation logic
            if (req.type === 'text' && typeof value === 'string') {
              if (req.validation?.min && value.length < req.validation.min) {
                errorMessage = `Minimum ${req.validation.min} ${t.characters}`;
              } else if (req.validation?.max && value.length > req.validation.max) {
                errorMessage = `Maximum ${req.validation.max} ${t.characters}`;
              } else if (req.required && value.trim()) {
                fulfilled = true;
              }
            } else if (req.type === 'boolean') {
              fulfilled = req.required ? value === true : true;
            } else if (req.type === 'select') {
              fulfilled = req.required ? !!value : true;
            } else if (req.type === 'number') {
              fulfilled = req.required ? value > 0 : true;
            }

            return { ...req, value, fulfilled, errorMessage };
          }
          return req;
        });

        // Update channel validation state
        const requiredReqs = updatedRequirements.filter(r => r.required);
        const hasErrors = requiredReqs.some(r => r.errorMessage);
        const allFulfilled = requiredReqs.every(r => r.fulfilled);
        const hasWarnings = requiredReqs.some(r => !r.fulfilled && !r.errorMessage);

        let validationState: ValidationState = 'pending';
        if (hasErrors) validationState = 'error';
        else if (hasWarnings) validationState = 'warning';
        else if (allFulfilled) validationState = 'valid';

        return { ...ch, requirements: updatedRequirements, validationState };
      }
      return ch;
    }));
  };

  const handleContinue = () => {
    const selectedChannels = channels.filter(ch => ch.selected);
    
    if (stats.errors > 0) {
      toast.error(language === 'pl' ? 'Napraw błędy przed kontynuowaniem' : 'Fix errors before continuing');
      return;
    }

    if (stats.warnings > 0) {
      toast.warning(language === 'pl' ? 'Uzupełnij wszystkie wymagane pola' : 'Complete all required fields');
      return;
    }

    if (selectedChannels.length === 0) {
      toast.error(language === 'pl' ? 'Wybierz przynajmniej jeden kanał' : 'Select at least one channel');
      return;
    }

    toast.success(t.allValid);
    if (onContinue) {
      onContinue();
    }
  };

  const selectedChannel = channels.find(ch => ch.id === selectedChannelId);

  return (
    <div className="p-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Validation Banner */}
        {stats.selectedCount > 0 && (
          <div className={`mb-8 rounded-xl p-4 border ${
            stats.isValid
              ? 'bg-[#00B67A]/20 border-[#00B67A] text-[#00B67A]'
              : stats.errors > 0
              ? theme === 'dark' 
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'bg-red-500/20 border-red-500 text-red-700'
              : theme === 'dark'
                ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                : 'bg-yellow-500/20 border-yellow-500 text-yellow-700'
          }`}>
            <div className="flex items-center gap-3">
              {stats.isValid ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : stats.errors > 0 ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              <div className="flex-1">
                <p className="font-medium">
                  {stats.isValid
                    ? t.validationSuccess
                    : stats.errors > 0
                    ? `${stats.errors} ${t.validationError}`
                    : `${stats.warnings} ${t.validationWarning}`
                  }
                </p>
                <p className="text-sm opacity-80">
                  {stats.fulfilledRequirements} / {stats.totalRequirements} {t.required.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Share2 className="w-8 h-8 text-[#00B67A]" />
            {t.title}
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{t.description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
              {t.selectedCount}: <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.selectedCount}</span> {t.of} {stats.totalChannels}
            </span>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {channels.map((channel) => {
            const colors = channelColors[channel.color as keyof typeof channelColors];
            return (
              <button
                key={channel.id}
                onClick={() => toggleChannel(channel.id)}
                className={`relative rounded-xl p-6 border-2 transition-all text-left group hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                    : 'bg-gradient-to-br from-gray-50 to-white'
                } ${
                  channel.selected
                    ? `${colors.border} shadow-lg`
                    : theme === 'dark' ? 'border-[#00B67A]/30 hover:border-[#00B67A]' : 'border-gray-200 hover:border-[#00B67A]'
                }`}
              >
                {/* Selected Checkmark */}
                {channel.selected && (
                  <div className={`absolute top-4 right-4 w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Validation Badge */}
                {channel.selected && channel.validationState !== 'pending' && (
                  <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                    channel.validationState === 'valid'
                      ? 'bg-[#00B67A]/20 text-[#00B67A]'
                      : channel.validationState === 'warning'
                      ? theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-500/20 text-yellow-700'
                      : theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-500/20 text-red-700'
                  }`}>
                    {channel.validationState === 'valid' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : channel.validationState === 'warning' ? (
                      <AlertTriangle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    <span>
                      {channel.validationState === 'valid' ? t.validState :
                       channel.validationState === 'warning' ? t.warningState : t.errorState}
                    </span>
                  </div>
                )}

                {/* Channel Icon */}
                <div className={`w-16 h-16 ${colors.light} rounded-xl flex items-center justify-center ${colors.text} mb-4 ${
                  channel.selected ? 'mt-6' : ''
                }`}>
                  {channel.icon}
                </div>

                {/* Channel Name */}
                <h3 className={`text-lg mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{channel.name}</h3>

                {/* Channel Description */}
                <p className={`text-sm mb-4 line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {channel.description}
                </p>

                {/* Requirements Count */}
                {channel.selected && (
                  <div className="flex items-center gap-4 text-xs pt-4 border-t border-[#00B67A]/20">
                    <div className={`flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      <Info className="w-3 h-3" />
                      <span>
                        {channel.requirements.filter(r => r.required && r.fulfilled).length} / {channel.requirements.filter(r => r.required).length} {t.required.toLowerCase()}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Requirements Panel */}
        {selectedChannel && selectedChannel.selected && (
          <div className={`rounded-2xl p-8 border mb-8 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
              : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 ${channelColors[selectedChannel.color as keyof typeof channelColors].light} rounded-xl flex items-center justify-center ${channelColors[selectedChannel.color as keyof typeof channelColors].text}`}>
                {selectedChannel.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-white text-2xl">{t.requirementsTitle}: {selectedChannel.name}</h2>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{selectedChannel.description}</p>
              </div>
            </div>

            {/* Requirements List */}
            <div className="space-y-4">
              {selectedChannel.requirements.map((req) => (
                <div
                  key={req.id}
                  className={`rounded-xl p-4 border ${
                    theme === 'dark'
                      ? 'bg-[#0F1229]/50 border-[#00B67A]/20'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      req.fulfilled
                        ? 'bg-[#00B67A]/20 text-[#00B67A]'
                        : req.errorMessage
                        ? theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                        : theme === 'dark' ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {req.fulfilled ? (
                        <Check className="w-4 h-4" />
                      ) : req.errorMessage ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <label className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                          {req.label}
                        </label>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          req.required
                            ? theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                            : theme === 'dark' ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {req.required ? t.required : t.optional}
                        </span>
                      </div>

                      {/* Input Field */}
                      {req.type === 'text' && (
                        <div>
                          <input
                            type="text"
                            value={req.value as string || ''}
                            onChange={(e) => updateRequirement(selectedChannel.id, req.id, e.target.value)}
                            placeholder={req.helperText}
                            className={`w-full border rounded-[8px] pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] text-[14px] ${
                              theme === 'dark'
                                ? 'bg-[#1A1D3A] border-[#00B67A]/30 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                          />
                          {req.validation && (
                            <div className="flex items-center justify-between mt-2 text-xs">
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>{req.helperText}</span>
                              <span className={`${
                                req.errorMessage 
                                  ? theme === 'dark' ? 'text-red-400' : 'text-red-700'
                                  : req.value && (req.value as string).length > 0 
                                    ? 'text-[#00B67A]' 
                                    : theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                                {(req.value as string || '').length} / {req.validation.max} {t.characters}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {req.type === 'number' && (
                        <div>
                          <input
                            type="number"
                            value={req.value as number || 0}
                            onChange={(e) => updateRequirement(selectedChannel.id, req.id, parseInt(e.target.value))}
                            min={req.validation?.min}
                            max={req.validation?.max}
                            className={`w-full border rounded-[8px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                              theme === 'dark'
                                ? 'bg-[#1A1D3A] border-[#00B67A]/30 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                          {req.helperText && (
                            <p className={`text-xs mt-2 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            }`}>{req.helperText}</p>
                          )}
                        </div>
                      )}

                      {req.type === 'select' && (
                        <select
                          value={req.value as string || ''}
                          onChange={(e) => updateRequirement(selectedChannel.id, req.id, e.target.value)}
                          className={`w-full border rounded-[8px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                            theme === 'dark'
                              ? 'bg-[#1A1D3A] border-[#00B67A]/30 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="" disabled>
                            {language === 'pl' ? 'Wybierz...' : 'Select...'}
                          </option>
                          {req.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {req.type === 'boolean' && (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div 
                            onClick={() => updateRequirement(selectedChannel.id, req.id, !(req.value as boolean || false))}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                updateRequirement(selectedChannel.id, req.id, !(req.value as boolean || false));
                              }
                            }}
                            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                              req.value as boolean
                                ? 'border-[#00B67A] bg-transparent hover:bg-[rgba(0,182,122,0.1)]'
                                : 'border-[#6B7280] bg-transparent hover:border-[rgba(0,182,122,0.4)] hover:bg-[rgba(0,182,122,0.1)]'
                            }`}
                          >
                            {req.value as boolean && (
                              <svg className="w-3 h-3 text-[#00B67A]" viewBox="0 0 12 12" fill="none">
                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{req.helperText || (language === 'pl' ? 'Włącz opcję' : 'Enable option')}</span>
                        </label>
                      )}

                      {/* Error Message */}
                      {req.errorMessage && (
                        <p className={`text-xs mt-2 flex items-center gap-1 ${
                          theme === 'dark' ? 'text-red-400' : 'text-red-700'
                        }`}>
                          <AlertTriangle className="w-3 h-3" />
                          {req.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {stats.selectedCount === 0 && (
          <div className={`rounded-2xl p-12 border text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
              : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
          }`}>
            <Share2 className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`} />
            <h3 className={`text-xl mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.selectChannel}</h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{language === 'pl' ? 'Kliknij na kartę kanału aby go wybrać' : 'Click on a channel card to select it'}</p>
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
            }`}>{stats.selectedCount}</span> {t.of} {stats.totalChannels} {t.selectedCount.toLowerCase()}
            {stats.warnings > 0 && (
              <span className={`ml-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>• {stats.warnings} {t.validationWarning}</span>
            )}
            {stats.errors > 0 && (
              <span className={`ml-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>• {stats.errors} {t.validationError}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onContinue}
              className={`px-6 py-3 rounded-[8px] transition-all border hover:border-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                theme === 'dark'
                  ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white border-[#00B67A]/30'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              {t.cancel}
            </button>
            <button
              onClick={handleContinue}
              disabled={!stats.isValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A] ${
                stats.isValid
                  ? 'bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white'
                  : theme === 'dark' 
                    ? 'bg-gray-500/20 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t.saveAndContinue}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}