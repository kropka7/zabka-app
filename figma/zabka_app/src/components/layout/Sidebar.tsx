import { Language, Theme } from '../../App';
import { Screen } from './AppLayout';
import {
  LayoutDashboard,
  MessageSquare,
  FilePlus,
  FolderOpen,
  Sparkles,
  Share2,
  CalendarClock,
  CheckCircle,
  Presentation,
  Settings2,
  X
} from 'lucide-react';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  language: Language;
  theme: Theme;
  onClose?: () => void;
  pendingDocumentsCount?: number;
  totalDocumentsCount?: number;
  onCreateDocument?: () => void;
}

export function Sidebar({ currentScreen, onNavigate, language, theme, onClose, pendingDocumentsCount = 0, totalDocumentsCount = 0, onCreateDocument }: SidebarProps) {
  const translations = {
    pl: {
      dashboard: 'Dashboard',
      messages: 'Lista Dokumentów',
      newDocument: 'Nowy dokument',
      templates: 'Szablony',
      aiGenerator: 'AI Generator',
      channels: 'Kanały dystrybucji',
      scheduler: 'Harmonogram',
      approval: 'Akceptacja Dokumentów',
      slidedeck: 'SlideDeck',
      settings: 'Ustawienia'
    },
    en: {
      dashboard: 'Dashboard',
      messages: 'Documents List',
      newDocument: 'New document',
      templates: 'Templates',
      aiGenerator: 'AI Generator',
      channels: 'Distribution',
      scheduler: 'Scheduler',
      approval: 'Document Approval',
      slidedeck: 'SlideDeck',
      settings: 'Settings'
    }
  };

  const t = translations[language];

  const navItems = [
    {
      id: 'dashboard' as Screen,
      label: t.dashboard,
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'messages-list' as Screen,
      label: t.messages,
      icon: MessageSquare,
      badge: totalDocumentsCount > 0 ? totalDocumentsCount.toString() : null
    },
    {
      id: 'team-templates' as Screen,
      label: t.templates,
      icon: FolderOpen,
      badge: null
    },
    {
      id: 'ai-draft-generator' as Screen,
      label: t.aiGenerator,
      icon: Sparkles,
      badge: 'AI'
    },
    {
      id: 'distribution-channels' as Screen,
      label: t.channels,
      icon: Share2,
      badge: null
    },
    {
      id: 'publication-scheduler' as Screen,
      label: t.scheduler,
      icon: CalendarClock,
      badge: null
    },
    {
      id: 'approval-flow' as Screen,
      label: t.approval,
      icon: CheckCircle,
      badge: pendingDocumentsCount > 0 ? pendingDocumentsCount.toString() : null
    },
    {
      id: 'slidedeck-generator' as Screen,
      label: t.slidedeck,
      icon: Presentation,
      badge: null
    }
  ];

  return (
    <div className={`w-72 flex flex-col h-screen border-r ${
      theme === 'dark'
        ? 'bg-[#1F2937] border-[#374151]'
        : 'bg-white border-[#E5E7EB]'
    }`}>
      {/* Logo */}
      <div className={`p-6 border-b ${
        theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-[8px] flex items-center justify-center shadow-lg shadow-[#10B981]/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>TeamMessage</h1>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{language === 'pl' ? 'Komunikacja zespołowa' : 'Team Communication'}</p>
          </div>
        </div>
        
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className={`lg:hidden absolute top-4 right-4 transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center justify-between gap-3 px-4 h-[44px] rounded-[8px] transition-all
                  ${theme === 'dark'
                    ? isActive 
                      ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30' 
                      : 'text-gray-300 hover:bg-[#374151] hover:text-white border border-transparent'
                    : isActive
                      ? 'bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30'
                      : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900 border border-transparent'
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 ${
                    theme === 'dark' ? 'focus:ring-offset-[#1F2937]' : 'focus:ring-offset-white'
                  }
                `}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-left whitespace-nowrap truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 min-w-[2rem] text-center
                    ${item.badge === 'AI' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : theme === 'dark'
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#059669] text-white'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Settings - bottom of navigation */}
        <div className={`mt-6 pt-4 border-t ${
          theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
        }`}>
          <button
            onClick={() => onNavigate('settings')}
            className={`
              w-full flex items-center gap-3 px-4 h-[44px] rounded-[8px] transition-all
              ${theme === 'dark'
                ? currentScreen === 'settings'
                  ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30' 
                  : 'text-gray-300 hover:bg-[#374151] hover:text-white border border-transparent'
                : currentScreen === 'settings'
                  ? 'bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30'
                  : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900 border border-transparent'
              }
              focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 ${
                theme === 'dark' ? 'focus:ring-offset-[#1F2937]' : 'focus:ring-offset-white'
              }
            `}
          >
            <Settings2 className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-left whitespace-nowrap">{t.settings}</span>
          </button>
        </div>
      </nav>

      {/* Footer - Create New Document Button */}
      <div className={`p-6 border-t flex-shrink-0 ${
        theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
      }`}>
        {onCreateDocument && (
          <button 
            onClick={onCreateDocument}
            className={`
              w-full flex items-center justify-center gap-2 text-white px-4 h-[44px] rounded-[8px] transition-all shadow-lg
              bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857]
              focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 ${
                theme === 'dark' ? 'focus:ring-offset-[#1F2937]' : 'focus:ring-offset-white'
              }
              shadow-[#10B981]/20
            `}
          >
            <FilePlus className="w-5 h-5" />
            <span className="font-medium">{language === 'pl' ? 'Nowy dokument' : 'New document'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
