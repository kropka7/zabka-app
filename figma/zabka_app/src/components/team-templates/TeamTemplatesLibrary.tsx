import { useState, useMemo } from 'react';
import { Language } from '../../App';
import { Search, Heart, Eye, FileText, Mail, Globe, Presentation, FileCheck, Users, Clock, Star, Copy, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type TeamType = 'HR' | 'Dział Prawny' | 'IT & Tech' | 'Marketing' | 'Ogólny' | 'All';

interface Template {
  id: string;
  title: string;
  content: string;
  description: string;
  team: Exclude<TeamType, 'All'>;
  channels: string[];
  usageCount: number;
  lastUsed: Date;
  isFavourite: boolean;
  category: string;
}

interface TeamTemplatesLibraryProps {
  language: Language;
  theme?: 'light' | 'dark';
  onToggleLanguage?: () => void;
  onUseTemplate?: (templateData: { title: string; team: string; content: string; channels: string[] }) => void;
}

export function TeamTemplatesLibrary({ language, theme = 'dark', onToggleLanguage, onUseTemplate }: TeamTemplatesLibraryProps) {
  const [selectedTeam, setSelectedTeam] = useState<TeamType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      title: language === 'pl' ? 'Ogłoszenie nowej polityki urlopowej' : 'New Leave Policy Announcement',
      description: language === 'pl' 
        ? 'Szablon komunikatu o zmianach w polityce urlopowej dla wszystkich pracowników'
        : 'Template for communicating changes in leave policy to all employees',
      content: language === 'pl'
        ? 'Szanowni Państwo,\n\nZ przyjemnością informujemy o aktualizacji polityki urlopowej obowiązującej od [DATA].\n\nKluczowe zmiany:\n• Zwiększenie limitu dni urlopowych o [LICZBA]\n• Nowe zasady wnioskowania o urlop\n• Uproszczony proces zatwierdzania\n\nPełna dokumentacja dostępna w portalu HR.\n\nW razie pytań, prosimy o kontakt z działem HR.\n\nPozdrawiam,\nDział HR'
        : 'Dear Team,\n\nWe are pleased to announce an update to our leave policy effective [DATE].\n\nKey changes:\n• Increased vacation days by [NUMBER]\n• New leave request procedures\n• Simplified approval process\n\nFull documentation available on HR portal.\n\nFor questions, please contact HR department.\n\nBest regards,\nHR Team',
      team: 'HR',
      channels: ['email', 'intranet'],
      usageCount: 45,
      lastUsed: new Date('2024-11-20'),
      isFavourite: true,
      category: 'Policy'
    },
    {
      id: '2',
      title: language === 'pl' ? 'Komunikat o zmianach RODO' : 'GDPR Update Notice',
      description: language === 'pl'
        ? 'Oficjalny szablon dla komunikacji zmian w regulacjach RODO'
        : 'Official template for GDPR regulation updates',
      content: language === 'pl'
        ? 'KOMUNIKAT PRAWNY\n\nDotyczy: Aktualizacja procedur RODO\n\nZgodnie z najnowszymi wytycznymi RODO, wprowadzamy następujące zmiany:\n\n1. Rozszerzone prawa dostępu do danych\n2. Nowe procedury zgłaszania incydentów\n3. Zaktualizowane formularze zgody\n\nWszyscy pracownicy zobowiązani są do zapoznania się z nowymi procedurami do [DATA].\n\nSzkolenie online dostępne: [LINK]\n\nDział Prawny'
        : 'LEGAL NOTICE\n\nRe: GDPR Procedures Update\n\nIn accordance with latest GDPR guidelines, we are implementing the following changes:\n\n1. Extended data access rights\n2. New incident reporting procedures\n3. Updated consent forms\n\nAll employees are required to review new procedures by [DATE].\n\nOnline training available: [LINK]\n\nLegal Department',
      team: 'Dział Prawny',
      channels: ['email', 'intranet', 'release-notes'],
      usageCount: 23,
      lastUsed: new Date('2024-11-25'),
      isFavourite: false,
      category: 'Compliance'
    },
    {
      id: '3',
      title: language === 'pl' ? 'Wdrożenie nowego systemu IT' : 'New IT System Deployment',
      description: language === 'pl'
        ? 'Szablon ogłoszenia o wdrożeniu nowego systemu lub narzędzia IT'
        : 'Template for announcing new IT system or tool deployment',
      content: language === 'pl'
        ? '🚀 Nowy System IT\n\nWitajcie!\n\nOd [DATA] wdrażamy nowy system [NAZWA SYSTEMU].\n\nCo się zmienia?\n✓ [FUNKCJA 1]\n✓ [FUNKCJA 2]\n✓ [FUNKCJA 3]\n\nPlan wdrożenia:\n• [DATA] - Środowisko testowe\n• [DATA] - Szkolenia\n• [DATA] - Start produkcyjny\n\nDostęp:\nLink: [URL]\nInstrukcja: [LINK]\n\nWsparcie:\nIT Helpdesk: [EMAIL]\nTel: [NUMER]\n\nTeam IT'
        : '🚀 New IT System\n\nHello team!\n\nStarting [DATE], we are deploying [SYSTEM NAME].\n\nWhat\'s changing?\n✓ [FEATURE 1]\n✓ [FEATURE 2]\n✓ [FEATURE 3]\n\nDeployment plan:\n• [DATE] - Test environment\n• [DATE] - Training sessions\n• [DATE] - Production launch\n\nAccess:\nLink: [URL]\nGuide: [LINK]\n\nSupport:\nIT Helpdesk: [EMAIL]\nPhone: [NUMBER]\n\nIT Team',
      team: 'IT & Tech',
      channels: ['email', 'intranet', 'presentation'],
      usageCount: 67,
      lastUsed: new Date('2024-11-28'),
      isFavourite: true,
      category: 'System'
    },
    {
      id: '4',
      title: language === 'pl' ? 'Kampania marketingowa Q1' : 'Q1 Marketing Campaign',
      description: language === 'pl'
        ? 'Szablon briefu kampanii marketingowej dla zespołów wewnętrznych'
        : 'Marketing campaign brief template for internal teams',
      content: language === 'pl'
        ? 'BRIEF KAMPANII\n\nNazwa kampanii: [NAZWA]\nOkres: [Q1/Q2/Q3/Q4] [ROK]\n\nCele:\n• Cel 1: [OPIS]\n• Cel 2: [OPIS]\n• Cel 3: [OPIS]\n\nGrupa docelowa:\n[OPIS GRUPY]\n\nKanały:\n☑ Social Media (Facebook, LinkedIn, Instagram)\n☑ Email Marketing\n☑ Landing Page\n☑ Event\n\nBudżet: [KWOTA]\nKPI: [METRYKI]\n\nTimeline:\n[DATA] - Kick-off\n[DATA] - Kreacje gotowe\n[DATA] - Start kampanii\n[DATA] - Raport końcowy\n\nTeam Marketing'
        : 'CAMPAIGN BRIEF\n\nCampaign name: [NAME]\nPeriod: [Q1/Q2/Q3/Q4] [YEAR]\n\nObjectives:\n• Goal 1: [DESCRIPTION]\n• Goal 2: [DESCRIPTION]\n• Goal 3: [DESCRIPTION]\n\nTarget audience:\n[AUDIENCE DESCRIPTION]\n\nChannels:\n☑ Social Media (Facebook, LinkedIn, Instagram)\n☑ Email Marketing\n☑ Landing Page\n☑ Event\n\nBudget: [AMOUNT]\nKPIs: [METRICS]\n\nTimeline:\n[DATE] - Kick-off\n[DATE] - Creatives ready\n[DATE] - Campaign launch\n[DATE] - Final report\n\nMarketing Team',
      team: 'Marketing',
      channels: ['email', 'presentation'],
      usageCount: 34,
      lastUsed: new Date('2024-11-15'),
      isFavourite: true,
      category: 'Campaign'
    },
    {
      id: '5',
      title: language === 'pl' ? 'Ogłoszenie firmowe' : 'Company Announcement',
      description: language === 'pl'
        ? 'Uniwersalny szablon ogłoszenia dla wszystkich zespołów'
        : 'Universal announcement template for all teams',
      content: language === 'pl'
        ? 'OGŁOSZENIE FIRMOWE\n\nDotyczy: [TEMAT]\n\nSzanowni Państwo,\n\n[WPROWADZENIE - 2-3 zdania]\n\nSzczegóły:\n[PUNKT 1]\n[PUNKT 2]\n[PUNKT 3]\n\nDalsze kroki:\n1. [KROK 1]\n2. [KROK 2]\n3. [KROK 3]\n\nW razie pytań, prosimy o kontakt: [EMAIL]\n\nDziękujemy za uwagę.\n\n[NAZWISKO]\n[STANOWISKO]'
        : 'COMPANY ANNOUNCEMENT\n\nRe: [SUBJECT]\n\nDear Team,\n\n[INTRODUCTION - 2-3 sentences]\n\nDetails:\n[POINT 1]\n[POINT 2]\n[POINT 3]\n\nNext steps:\n1. [STEP 1]\n2. [STEP 2]\n3. [STEP 3]\n\nFor questions, please contact: [EMAIL]\n\nThank you for your attention.\n\n[NAME]\n[POSITION]',
      team: 'Ogólny',
      channels: ['email', 'intranet'],
      usageCount: 89,
      lastUsed: new Date('2024-11-29'),
      isFavourite: false,
      category: 'General'
    },
    {
      id: '6',
      title: language === 'pl' ? 'Rekrutacja nowego członka zespołu' : 'New Team Member Recruitment',
      description: language === 'pl'
        ? 'Ogłoszenie o otwarciu nowej pozycji w firmie'
        : 'Job opening announcement template',
      content: language === 'pl'
        ? '👥 REKRUTACJA\n\nPoszukujemy: [NAZWA STANOWISKA]\nDział: [NAZWA DZIAŁU]\nLokalizacja: [MIASTO / REMOTE]\n\nO stanowisku:\n[OPIS 2-3 zdania]\n\nObowiązki:\n• [OBOWIĄZEK 1]\n• [OBOWIĄZEK 2]\n• [OBOWIĄZEK 3]\n\nWymagania:\n• [WYMAGANIE 1]\n• [WYMAGANIE 2]\n• [WYMAGANIE 3]\n\nOferujemy:\n• [BENEFIT 1]\n• [BENEFIT 2]\n• [BENEFIT 3]\n\nAplikuj: [LINK]\nKontakt: [EMAIL]\n\nDział HR'
        : '👥 WE\'RE HIRING\n\nPosition: [JOB TITLE]\nDepartment: [DEPARTMENT]\nLocation: [CITY / REMOTE]\n\nAbout the role:\n[DESCRIPTION 2-3 sentences]\n\nResponsibilities:\n• [RESPONSIBILITY 1]\n• [RESPONSIBILITY 2]\n• [RESPONSIBILITY 3]\n\nRequirements:\n• [REQUIREMENT 1]\n• [REQUIREMENT 2]\n• [REQUIREMENT 3]\n\nWe offer:\n• [BENEFIT 1]\n• [BENEFIT 2]\n• [BENEFIT 3]\n\nApply: [LINK]\nContact: [EMAIL]\n\nHR Team',
      team: 'HR',
      channels: ['email', 'intranet'],
      usageCount: 28,
      lastUsed: new Date('2024-11-10'),
      isFavourite: false,
      category: 'Recruitment'
    },
    {
      id: '7',
      title: language === 'pl' ? 'Incydent bezpieczeństwa - komunikat' : 'Security Incident Notice',
      description: language === 'pl'
        ? 'Szablon komunikatu o incydencie bezpieczeństwa'
        : 'Security incident communication template',
      content: language === 'pl'
        ? '⚠️ KOMUNIKAT BEZPIECZEŃSTWA\n\nPriorytet: WYSOKI\nData: [DATA]\n\nInformujemy o wykryciu incydentu bezpieczeństwa:\n\nCo się stało?\n[OPIS INCYDENTU]\n\nKogo dotyczy?\n[GRUPA UŻYTKOWNIKÓW]\n\nDziałania podjęte:\n✓ [DZIAŁANIE 1]\n✓ [DZIAŁANIE 2]\n✓ [DZIAŁANIE 3]\n\nCo musisz zrobić?\n1. [KROK 1]\n2. [KROK 2]\n3. [KROK 3]\n\nTermin: [DATA]\n\nPytania? Kontakt:\nIT Security: [EMAIL]\nTel: [NUMER]\n\nDział IT & Bezpieczeństwa'
        : '⚠️ SECURITY NOTICE\n\nPriority: HIGH\nDate: [DATE]\n\nWe are informing you about a detected security incident:\n\nWhat happened?\n[INCIDENT DESCRIPTION]\n\nWho is affected?\n[USER GROUP]\n\nActions taken:\n✓ [ACTION 1]\n✓ [ACTION 2]\n✓ [ACTION 3]\n\nWhat you need to do:\n1. [STEP 1]\n2. [STEP 2]\n3. [STEP 3]\n\nDeadline: [DATE]\n\nQuestions? Contact:\nIT Security: [EMAIL]\nPhone: [NUMBER]\n\nIT & Security Team',
      team: 'IT & Tech',
      channels: ['email', 'intranet'],
      usageCount: 12,
      lastUsed: new Date('2024-10-15'),
      isFavourite: false,
      category: 'Security'
    },
    {
      id: '8',
      title: language === 'pl' ? 'Newsletter miesięczny' : 'Monthly Newsletter',
      description: language === 'pl'
        ? 'Szablon newslettera wewnętrznego dla marketingu'
        : 'Internal newsletter template for marketing',
      content: language === 'pl'
        ? '📰 NEWSLETTER [MIESIĄC]\n\n🎯 Najważniejsze wydarzenia:\n\n1. [WYDARZENIE 1]\n   [Krótki opis 1-2 zdania]\n\n2. [WYDARZENIE 2]\n   [Krótki opis 1-2 zdania]\n\n3. [WYDARZENIE 3]\n   [Krótki opis 1-2 zdania]\n\n📊 Liczby miesiąca:\n• Metric 1: [WARTOŚĆ]\n• Metric 2: [WARTOŚĆ]\n• Metric 3: [WARTOŚĆ]\n\n⭐ Wyróżnienie miesiąca:\n[NAZWISKO] - [OSIĄGNIĘCIE]\n\n📅 Nadchodzące wydarzenia:\n• [DATA] - [WYDARZENIE]\n• [DATA] - [WYDARZENIE]\n\nCzytaj więcej: [LINK]\n\nMarketing Team'
        : '📰 NEWSLETTER [MONTH]\n\n🎯 Top highlights:\n\n1. [EVENT 1]\n   [Short description 1-2 sentences]\n\n2. [EVENT 2]\n   [Short description 1-2 sentences]\n\n3. [EVENT 3]\n   [Short description 1-2 sentences]\n\n📊 Month in numbers:\n• Metric 1: [VALUE]\n• Metric 2: [VALUE]\n• Metric 3: [VALUE]\n\n⭐ Employee of the month:\n[NAME] - [ACHIEVEMENT]\n\n📅 Upcoming events:\n• [DATE] - [EVENT]\n• [DATE] - [EVENT]\n\nRead more: [LINK]\n\nMarketing Team',
      team: 'Marketing',
      channels: ['email'],
      usageCount: 56,
      lastUsed: new Date('2024-11-01'),
      isFavourite: true,
      category: 'Newsletter'
    }
  ]);

  const translations = {
    pl: {
      title: 'Biblioteka Szablonów Zespołów',
      description: 'Wybierz szablon dostosowany do Twojego zespołu i kanału komunikacji',
      search: 'Szukaj szablonów...',
      allTeams: 'Wszystkie',
      stats: {
        templates: 'Szablonów',
        favourites: 'Ulubionych',
        lastUsed: 'Ostatnio użyto'
      },
      noResults: 'Nie znaleziono szablonów',
      noResultsDesc: 'Spróbuj zmienić kryteria wyszukiwania lub wybrać inny zespół',
      usedTimes: 'razy',
      useTemplate: 'Użyj szablonu',
      preview: 'Podgląd',
      copyContent: 'Kopiuj treść',
      close: 'Zamknij',
      channels: 'Kanały',
      usage: 'Użycia',
      lastUsedOn: 'Ostatnio użyto',
      favouriteAdded: 'Dodano do ulubionych',
      favouriteRemoved: 'Usunięto z ulubionych',
      contentCopied: 'Treść skopiowana do schowka',
      templateUsed: 'Szablon został użyty',
      daysAgo: 'dni temu',
      teams: {
        All: 'Wszystkie',
        HR: 'HR',
        Legal: 'Prawny',
        IT: 'IT & Tech',
        Marketing: 'Marketing',
        General: 'Ogólny'
      }
    },
    en: {
      title: 'Team Templates Library',
      description: 'Choose a template tailored to your team and communication channel',
      search: 'Search templates...',
      allTeams: 'All Teams',
      stats: {
        templates: 'Templates',
        favourites: 'Favourites',
        lastUsed: 'Last used'
      },
      noResults: 'No templates found',
      noResultsDesc: 'Try changing search criteria or selecting a different team',
      usedTimes: 'times',
      useTemplate: 'Use Template',
      preview: 'Preview',
      copyContent: 'Copy Content',
      close: 'Close',
      channels: 'Channels',
      usage: 'Usage',
      lastUsedOn: 'Last used',
      favouriteAdded: 'Added to favourites',
      favouriteRemoved: 'Removed from favourites',
      contentCopied: 'Content copied to clipboard',
      templateUsed: 'Template has been used',
      daysAgo: 'days ago',
      teams: {
        All: 'All Teams',
        HR: 'HR',
        Legal: 'Legal',
        IT: 'IT & Tech',
        Marketing: 'Marketing',
        General: 'General'
      }
    }
  };

  const t = translations[language];

  const teamConfig = {
    'HR': { color: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-500', bgLight: 'bg-blue-500/20' },
    'Dział Prawny': { color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-500', bgLight: 'bg-red-500/20' },
    'IT & Tech': { color: 'bg-purple-500', borderColor: 'border-purple-500', textColor: 'text-purple-500', bgLight: 'bg-purple-500/20' },
    'Marketing': { color: 'bg-orange-500', borderColor: 'border-orange-500', textColor: 'text-orange-500', bgLight: 'bg-orange-500/20' },
    'Ogólny': { color: 'bg-green-500', borderColor: 'border-green-500', textColor: 'text-green-500', bgLight: 'bg-green-500/20' }
  };

  const channelIcons: Record<string, React.ReactNode> = {
    email: <Mail className="w-4 h-4" />,
    intranet: <Globe className="w-4 h-4" />,
    presentation: <Presentation className="w-4 h-4" />,
    'release-notes': <FileCheck className="w-4 h-4" />
  };

  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Filter by team
    if (selectedTeam !== 'All') {
      filtered = filtered.filter(t => t.team === selectedTeam);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [templates, selectedTeam, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredTemplates.length;
    const favourites = filteredTemplates.filter(t => t.isFavourite).length;
    const lastUsedTemplate = [...filteredTemplates].sort((a, b) => 
      b.lastUsed.getTime() - a.lastUsed.getTime()
    )[0];
    
    const daysAgo = lastUsedTemplate 
      ? Math.floor((new Date().getTime() - lastUsedTemplate.lastUsed.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return { total, favourites, daysAgo };
  }, [filteredTemplates]);

  const toggleFavourite = (templateId: string) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === templateId) {
        const newFavStatus = !t.isFavourite;
        toast.success(newFavStatus ? t.favouriteAdded : t.favouriteRemoved);
        return { ...t, isFavourite: newFavStatus };
      }
      return t;
    }));
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success(t.contentCopied);
      })
      .catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success(t.contentCopied);
        } catch (err) {
          toast.error(language === 'pl' ? 'Nie udało się skopiować' : 'Failed to copy');
        }
        document.body.removeChild(textArea);
      });
  };

  const handleUseTemplate = (template: Template) => {
    toast.success(t.templateUsed);
    if (onUseTemplate) {
      onUseTemplate({ title: template.title, team: template.team, content: template.content, channels: template.channels });
    }
    setPreviewTemplate(null);
  };

  return (
    <div className="p-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-3xl mb-2 flex items-center gap-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <FileText className="w-8 h-8 text-[#00B67A]" />
                {t.title}
              </h1>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.description}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border border-[#00B67A]/30 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00B67A] text-[14px] ${
                  theme === 'dark'
                    ? 'bg-[#0F1229] text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Team Selector Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedTeam('All')}
              className={`px-6 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                selectedTeam === 'All'
                  ? 'bg-gradient-to-r from-[#00B67A] to-[#00A066] text-white'
                  : theme === 'dark'
                    ? 'bg-[#1A1D3A] border border-[#00B67A]/30 text-gray-300 hover:border-[#00B67A] hover:text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#00B67A] hover:text-gray-900'
              }`}
            >
              {t.teams.All}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedTeam === 'All' ? 'bg-white/20' : 'bg-[#00B67A]/20 text-[#00B67A]'
              }`}>
                {templates.length}
              </span>
            </button>
            {(['HR', 'Dział Prawny', 'IT & Tech', 'Marketing', 'Ogólny'] as const).map((team) => {
              const config = teamConfig[team];
              const displayName = team === 'Dział Prawny' ? t.teams.Legal : team === 'IT & Tech' ? t.teams.IT : team === 'Ogólny' ? t.teams.General : t.teams[team as 'HR' | 'Marketing'];
              const count = templates.filter(t => t.team === team).length;
              return (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-6 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                    selectedTeam === team
                      ? `${config.color} text-white`
                      : theme === 'dark'
                        ? `bg-[#1A1D3A] border ${config.borderColor}/30 ${config.textColor} hover:${config.borderColor}`
                        : `bg-white border border-gray-300 ${config.textColor} hover:border-[#00B67A]`
                  }`}
                >
                  {displayName}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedTeam === team ? 'bg-white/20' : config.bgLight
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="hidden">
          <div className={`rounded-xl p-6 border border-[#00B67A]/30 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
              : 'bg-white'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#00B67A]/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#00B67A]" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.stats.templates}
                </p>
                <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 border border-[#00B67A]/30 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
              : 'bg-white'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.stats.favourites}
                </p>
                <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.favourites}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 border border-[#00B67A]/30 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
              : 'bg-white'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.stats.lastUsed}
                </p>
                <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.daysAgo} {t.daysAgo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const config = teamConfig[template.team];
              const displayName = template.team === 'Dział Prawny' ? t.teams.Legal : template.team === 'IT & Tech' ? t.teams.IT : template.team === 'Ogólny' ? t.teams.General : template.team;
              return (
                <div
                  key={template.id}
                  className={`rounded-xl p-6 border border-[#00B67A]/30 hover:border-[#00B67A] transition-all group relative ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                      : 'bg-white'
                  }`}
                >
                  {/* Favourite Toggle */}
                  <button
                    onClick={() => toggleFavourite(template.id)}
                    className="hidden"
                    aria-label={template.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        template.isFavourite
                          ? 'fill-pink-500 text-pink-500'
                          : theme === 'dark' 
                            ? 'text-gray-300 hover:text-pink-500'
                            : 'text-gray-500 hover:text-pink-500'
                      }`}
                    />
                  </button>

                  {/* Team Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgLight} ${config.textColor} mb-4`}>
                    <Users className="w-3 h-3" />
                    <span className="text-xs">{displayName}</span>
                  </div>

                  {/* Template Title */}
                  <h3 className={`text-lg mb-2 pr-8 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {template.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {template.description}
                  </p>

                  {/* Channels */}
                  <div className="flex items-center gap-2 mb-4">
                    {template.channels.map((channel) => (
                      <div
                        key={channel}
                        className="w-8 h-8 bg-[#00B67A]/20 rounded-lg flex items-center justify-center text-[#00B67A]"
                        title={channel}
                      >
                        {channelIcons[channel]}
                      </div>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className={`flex items-center justify-between text-xs mb-4 pb-4 border-b border-[#00B67A]/20 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{template.usageCount} {t.usedTimes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{Math.floor((new Date().getTime() - template.lastUsed.getTime()) / (1000 * 60 * 60 * 24))} {t.daysAgo}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{t.preview}</span>
                    </button>
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">{t.useTemplate}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className={`rounded-2xl p-12 border border-[#00B67A]/30 text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
              : 'bg-white'
          }`}>
            <FileText className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`} />
            <h3 className={`text-xl mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.noResults}</h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {t.noResultsDesc}
            </p>
          </div>
        )}

        {/* Preview Modal */}
        {previewTemplate && (
          <div className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center p-8 z-50 ${
            theme === 'dark' ? 'bg-black/80' : 'bg-gray-900/50'
          }`}>
            <div className={`rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-[#00B67A]/30 shadow-2xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                : 'bg-white'
            }`}>
              {/* Modal Header */}
              <div className={`p-6 flex items-start justify-between ${
                theme === 'dark' ? 'border-b border-[#00B67A]/20' : 'border-b border-gray-200'
              }`}>
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-3 py-1 rounded-full ${teamConfig[previewTemplate.team].bgLight} ${teamConfig[previewTemplate.team].textColor} text-xs flex items-center gap-2`}>
                      <Users className="w-3 h-3" />
                      {previewTemplate.team === 'Dział Prawny' ? t.teams.Legal : previewTemplate.team === 'IT & Tech' ? t.teams.IT : previewTemplate.team === 'Ogólny' ? t.teams.General : previewTemplate.team}
                    </div>
                    <div className="flex items-center gap-2">
                      {previewTemplate.channels.map((channel) => (
                        <div
                          key={channel}
                          className="w-7 h-7 bg-[#00B67A]/20 rounded-lg flex items-center justify-center text-[#00B67A]"
                        >
                          {channelIcons[channel]}
                        </div>
                      ))}
                    </div>
                  </div>
                  <h2 className={`text-2xl mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{previewTemplate.title}</h2>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{previewTemplate.description}</p>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B67A] rounded-lg p-2 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={t.close}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-250px)]">
                <pre className={`whitespace-pre-wrap font-sans leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {previewTemplate.content}
                </pre>
              </div>

              {/* Modal Footer */}
              <div className={`p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                theme === 'dark' ? 'border-t border-[#00B67A]/20' : 'border-t border-gray-200'
              }`}>
                <div className={`flex items-center gap-4 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{previewTemplate.usageCount} {t.usedTimes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t.lastUsedOn}: {previewTemplate.lastUsed.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyContent(previewTemplate.content)}
                    className={`px-6 py-3 rounded-[8px] flex items-center gap-2 transition-all border border-[#00B67A]/30 hover:border-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                      theme === 'dark'
                        ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    <Copy className="w-5 h-5" />
                    {t.copyContent}
                  </button>
                  <button
                    onClick={() => handleUseTemplate(previewTemplate)}
                    className="bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A]"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    {t.useTemplate}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}