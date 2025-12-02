import { useState } from 'react';
import { Language } from '../../App';
import { 
  Mail, Globe, FileText, Presentation, MessageSquare, Share2,
  ChevronDown, ChevronUp, Check, Zap, Settings
} from 'lucide-react';
import { CustomCheckbox } from '../ui/custom-checkbox';

export interface ChannelConfig {
  useDefaults: boolean;
  // Email
  emailSubject?: string;
  emailSender?: string;
  emailPlainText?: boolean;
  emailFooter?: boolean;
  // Intranet
  seoTitle?: string;
  metaDescription?: string;
  category?: string;
  featuredImage?: boolean;
  // Release Notes
  version?: string;
  changeSummary?: string;
  impactLevel?: string;
  breakingChanges?: boolean;
  // Presentation
  slideCount?: number;
  visualStyle?: string;
  audienceType?: string;
  includeCharts?: boolean;
  // Teams/SharePoint
  teamsChannel?: string;
  permissions?: string;
  pushNotifications?: boolean;
  pinMessage?: boolean;
  // Social Media
  socialPlatforms?: string[];
  postLength?: string;
  hashtags?: string;
  scheduledPost?: boolean;
}

interface ChannelConfigPanelProps {
  channel: string;
  config: ChannelConfig;
  onChange: (config: ChannelConfig) => void;
  language: Language;
  theme: 'light' | 'dark';
  documentTitle?: string;
  documentTeam?: string;
}

export function ChannelConfigPanel({ 
  channel, 
  config, 
  onChange, 
  language,
  theme,
  documentTitle,
  documentTeam 
}: ChannelConfigPanelProps) {
  const [isExpanded, setIsExpanded] = useState(!config.useDefaults);

  const translations = {
    pl: {
      useDefaults: 'Użyj standardowych ustawień',
      customize: 'Dostosuj szczegóły',
      express: 'Express',
      custom: 'Custom',
      // Email
      emailSubject: 'Temat wiadomości',
      emailSender: 'Nadawca',
      emailPlainText: 'Wersja tekstowa (plain text)',
      emailFooter: 'Dodaj stopkę',
      // Intranet
      seoTitle: 'Tytuł SEO',
      metaDescription: 'Meta opis',
      category: 'Kategoria',
      featuredImage: 'Obrazek wyróżniający',
      // Release Notes
      version: 'Numer wersji',
      changeSummary: 'Podsumowanie zmian',
      impactLevel: 'Poziom wpływu',
      breakingChanges: 'Zmiany krytyczne',
      // Presentation
      slideCount: 'Liczba slajdów',
      visualStyle: 'Styl wizualny',
      audienceType: 'Typ odbiorców',
      includeCharts: 'Wykresy i statystyki',
      // Teams
      teamsChannel: 'Kanał Teams',
      permissions: 'Uprawnienia',
      pushNotifications: 'Powiadomienia push',
      pinMessage: 'Przypnij wiadomość',
      // Social
      socialPlatforms: 'Platformy',
      postLength: 'Długość posta (znaki)',
      hashtags: 'Hashtagi',
      scheduledPost: 'Zaplanowana publikacja',
      // Categories
      news: 'Aktualności',
      policy: 'Polityka',
      itTech: 'IT & Tech',
      hr: 'HR',
      security: 'Bezpieczeństwo',
      // Impact
      low: 'Niski (Minor)',
      medium: 'Średni (Major)',
      high: 'Wysoki (Critical)',
      // Visual styles
      corporate: 'Korporacyjny',
      minimalist: 'Minimalistyczny',
      modern: 'Nowoczesny',
      zabka: 'Żabka Brand',
      // Audience
      cLevel: 'Kierownictwo (C-level)',
      operational: 'Zespoły operacyjne',
      allEmployees: 'Wszyscy pracownicy',
      external: 'Zewnętrzni partnerzy',
      // Permissions
      allEmp: 'Wszyscy pracownicy',
      teamOnly: 'Tylko zespół',
      specific: 'Wybrane osoby'
    },
    en: {
      useDefaults: 'Use standard settings',
      customize: 'Customize details',
      express: 'Express',
      custom: 'Custom',
      // Email
      emailSubject: 'Subject line',
      emailSender: 'Sender',
      emailPlainText: 'Plain text version',
      emailFooter: 'Add footer',
      // Intranet
      seoTitle: 'SEO Title',
      metaDescription: 'Meta description',
      category: 'Category',
      featuredImage: 'Featured image',
      // Release Notes
      version: 'Version number',
      changeSummary: 'Change summary',
      impactLevel: 'Impact level',
      breakingChanges: 'Breaking changes',
      // Presentation
      slideCount: 'Slide count',
      visualStyle: 'Visual style',
      audienceType: 'Audience type',
      includeCharts: 'Charts and statistics',
      // Teams
      teamsChannel: 'Teams channel',
      permissions: 'Permissions',
      pushNotifications: 'Push notifications',
      pinMessage: 'Pin message',
      // Social
      socialPlatforms: 'Platforms',
      postLength: 'Post length (characters)',
      hashtags: 'Hashtags',
      scheduledPost: 'Scheduled post',
      // Categories
      news: 'News',
      policy: 'Policy',
      itTech: 'IT & Tech',
      hr: 'HR',
      security: 'Security',
      // Impact
      low: 'Low (Minor)',
      medium: 'Medium (Major)',
      high: 'High (Critical)',
      // Visual styles
      corporate: 'Corporate',
      minimalist: 'Minimalist',
      modern: 'Modern',
      zabka: 'Zabka Brand',
      // Audience
      cLevel: 'C-level executives',
      operational: 'Operational teams',
      allEmployees: 'All employees',
      external: 'External partners',
      // Permissions
      allEmp: 'All employees',
      teamOnly: 'Team only',
      specific: 'Specific people'
    }
  };

  const t = translations[language];

  const getChannelIcon = () => {
    switch(channel) {
      case 'Email': return <Mail className="w-5 h-5" />;
      case 'Intranet': return <Globe className="w-5 h-5" />;
      case 'Release Notes': return <FileText className="w-5 h-5" />;
      case 'Presentation': return <Presentation className="w-5 h-5" />;
      case 'Teams/SharePoint': return <MessageSquare className="w-5 h-5" />;
      case 'Social Media': return <Share2 className="w-5 h-5" />;
      default: return null;
    }
  };

  const toggleMode = () => {
    const newUseDefaults = !config.useDefaults;
    onChange({ ...config, useDefaults: newUseDefaults });
    setIsExpanded(!newUseDefaults);
  };

  const renderEmailConfig = () => (
    <div className="space-y-4">
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.emailSubject}</label>
        <input
          type="text"
          value={config.emailSubject || documentTitle || ''}
          onChange={(e) => onChange({ ...config, emailSubject: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder={documentTitle}
        />
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.emailSender}</label>
        <select
          value={config.emailSender || documentTeam || 'HR Team'}
          onChange={(e) => onChange({ ...config, emailSender: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option>HR Team</option>
          <option>IT Department</option>
          <option>Legal Team</option>
          <option>Marketing</option>
          <option>Management</option>
        </select>
      </div>
      <CustomCheckbox
        label={t.emailPlainText}
        checked={config.emailPlainText}
        onChange={() => onChange({ ...config, emailPlainText: !config.emailPlainText })}
      />
      <CustomCheckbox
        label={t.emailFooter}
        checked={config.emailFooter !== false}
        onChange={() => onChange({ ...config, emailFooter: config.emailFooter === false ? true : false })}
      />
    </div>
  );

  const renderIntranetConfig = () => (
    <div className="space-y-4">
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.seoTitle}</label>
        <input
          type="text"
          value={config.seoTitle || documentTitle || ''}
          onChange={(e) => onChange({ ...config, seoTitle: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder={documentTitle}
        />
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.metaDescription}</label>
        <textarea
          value={config.metaDescription || ''}
          onChange={(e) => onChange({ ...config, metaDescription: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          rows={2}
        />
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.category}</label>
        <select
          value={config.category || ''}
          onChange={(e) => onChange({ ...config, category: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">{language === 'pl' ? 'Wybierz kategorię' : 'Select category'}</option>
          <option>{t.news}</option>
          <option>{t.policy}</option>
          <option>{t.itTech}</option>
          <option>{t.hr}</option>
          <option>{t.security}</option>
        </select>
      </div>
      <CustomCheckbox
        label={t.featuredImage}
        checked={config.featuredImage}
        onChange={() => onChange({ ...config, featuredImage: !config.featuredImage })}
      />
    </div>
  );

  const renderReleaseNotesConfig = () => (
    <div className="space-y-4">
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.version}</label>
        <input
          type="text"
          value={config.version || ''}
          onChange={(e) => onChange({ ...config, version: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="v2.5.1"
        />
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.changeSummary}</label>
        <textarea
          value={config.changeSummary || ''}
          onChange={(e) => onChange({ ...config, changeSummary: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          rows={3}
        />
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.impactLevel}</label>
        <select
          value={config.impactLevel || ''}
          onChange={(e) => onChange({ ...config, impactLevel: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">{language === 'pl' ? 'Wybierz poziom' : 'Select level'}</option>
          <option>{t.low}</option>
          <option>{t.medium}</option>
          <option>{t.high}</option>
        </select>
      </div>
      <CustomCheckbox
        label={t.breakingChanges}
        checked={config.breakingChanges}
        onChange={() => onChange({ ...config, breakingChanges: !config.breakingChanges })}
      />
    </div>
  );

  const renderPresentationConfig = () => (
    <div className="space-y-4">
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.slideCount}</label>
        <input
          type="number"
          value={config.slideCount || 10}
          onChange={(e) => onChange({ ...config, slideCount: parseInt(e.target.value) })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          min="5"
          max="50"
        />
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.visualStyle}</label>
        <select
          value={config.visualStyle || ''}
          onChange={(e) => onChange({ ...config, visualStyle: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">{language === 'pl' ? 'Wybierz styl' : 'Select style'}</option>
          <option>{t.corporate}</option>
          <option>{t.minimalist}</option>
          <option>{t.modern}</option>
          <option>{t.zabka}</option>
        </select>
      </div>
      <div>
        <label className={`text-sm mb-2 block ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t.audienceType}</label>
        <select
          value={config.audienceType || ''}
          onChange={(e) => onChange({ ...config, audienceType: e.target.value })}
          className={`w-full border rounded-[8px] px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
            theme === 'dark'
              ? 'bg-[#0F1229] border-[#00B67A]/30 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">{language === 'pl' ? 'Wybierz odbiorców' : 'Select audience'}</option>
          <option>{t.cLevel}</option>
          <option>{t.operational}</option>
          <option>{t.allEmployees}</option>
          <option>{t.external}</option>
        </select>
      </div>
      <CustomCheckbox
        label={t.includeCharts}
        checked={config.includeCharts}
        onChange={() => onChange({ ...config, includeCharts: !config.includeCharts })}
      />
    </div>
  );

  const renderChannelContent = () => {
    switch(channel) {
      case 'Email':
        return renderEmailConfig();
      case 'Intranet':
        return renderIntranetConfig();
      case 'Release Notes':
        return renderReleaseNotesConfig();
      case 'Presentation':
        return renderPresentationConfig();
      default:
        return (
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'pl' ? 'Konfiguracja dla tego kanału będzie dostępna wkrótce.' : 'Configuration for this channel coming soon.'}
          </p>
        );
    }
  };

  return (
    <div className={`border rounded-xl overflow-hidden ${
      theme === 'dark'
        ? 'bg-[#0F1229]/50 border-[#00B67A]/30'
        : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-4 flex items-center justify-between ${
        theme === 'dark'
          ? 'bg-[#1A1D3A]/50'
          : 'bg-gray-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00B67A]/20 rounded-lg flex items-center justify-center text-[#00B67A]">
            {getChannelIcon()}
          </div>
          <div>
            <h3 className="text-white">{channel}</h3>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {config.useDefaults ? (
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {t.express}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  {t.custom}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Express/Custom */}
          <button
            onClick={toggleMode}
            className={`text-xs px-3 py-1 rounded-lg transition-all ${
              config.useDefaults
                ? 'bg-[#00B67A]/20 text-[#00B67A] border border-[#00B67A]/50'
                : theme === 'dark' 
                  ? 'bg-[#1A1D3A] text-gray-300 border border-[#00B67A]/30 hover:border-[#00B67A]'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-[#00B67A]'
            }`}
          >
            {config.useDefaults ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                {t.useDefaults}
              </span>
            ) : (
              t.customize
            )}
          </button>

          {/* Expand/Collapse */}
          {!config.useDefaults && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-8 h-8 flex items-center justify-center transition-all ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!config.useDefaults && isExpanded && (
        <div className="p-4">
          {renderChannelContent()}
        </div>
      )}

      {/* Express mode info */}
      {config.useDefaults && (
        <div className="p-4 bg-[#00B67A]/5 border-t border-[#00B67A]/20">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'pl' 
              ? '✓ Używa domyślnych ustawień na podstawie tytułu i zespołu dokumentu'
              : '✓ Uses default settings based on document title and team'}
          </p>
        </div>
      )}
    </div>
  );
}