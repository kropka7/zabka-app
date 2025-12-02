import { useState } from 'react';
import { Language, Theme } from '../../App';
import { 
  Bell, 
  Search, 
  Globe, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  Menu,
  Sun,
  Moon
} from 'lucide-react';

interface TopNavProps {
  language: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  userName: string;
  userRole: string;
  onMenuClick?: () => void;
  onNotificationClick?: (route: string) => void;
  pendingDocumentsCount?: number;
  onCreateDocument?: () => void;
}

export function TopNav({ language, theme, onToggleLanguage, onToggleTheme, userName, userRole, onMenuClick, onNotificationClick }: TopNavProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: '1',
      title: language === 'pl' ? 'Nowy dokument do akceptacji' : 'New document to approve',
      message: language === 'pl' ? 'Polityka urlopowa wymaga Twojej akceptacji' : 'Leave policy requires your approval',
      time: '5 min',
      unread: true
    },
    {
      id: '2',
      title: language === 'pl' ? 'Dokument opublikowany' : 'Document published',
      message: language === 'pl' ? 'Aktualizacja RODO została opublikowana' : 'GDPR update has been published',
      time: '1 godz',
      unread: true
    },
    {
      id: '3',
      title: language === 'pl' ? 'Komentarz w dokumencie' : 'Comment on document',
      message: language === 'pl' ? 'Jan Nowak dodał komentarz' : 'Jan Nowak added a comment',
      time: '2 godz',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={`h-16 flex items-center justify-between px-4 sm:px-6 border-b ${
      theme === 'dark'
        ? 'bg-[#1F2937] border-[#374151]'
        : 'bg-white border-[#E5E7EB]'
    }`}>
      {/* Mobile Menu Button */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-[8px] transition-all focus:outline-none focus:ring-2 mr-4 ${
            theme === 'dark'
              ? 'bg-[#374151] hover:bg-[#4B5563] text-gray-300 hover:text-white focus:ring-[#10B981] border border-[#4B5563]'
              : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-600 hover:text-gray-900 focus:ring-[#10B981] border border-[#D1D5DB]'
          }`}
          aria-label={language === 'pl' ? 'Otwórz menu' : 'Open menu'}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
          }`} aria-hidden="true" />
          <input
            type="text"
            placeholder={language === 'pl' ? 'Szukaj...' : 'Search...'}
            className={`w-full rounded-[8px] pl-10 pr-3 py-2 min-h-[44px] text-[14px] transition-colors focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'bg-[#374151] border border-[#4B5563] text-white placeholder-gray-500 focus:ring-[#10B981] focus:border-[#10B981]'
                : 'bg-[#F9FAFB] border border-[#D1D5DB] text-gray-900 placeholder-gray-400 focus:ring-[#10B981] focus:border-[#10B981]'
            }`}
            aria-label={language === 'pl' ? 'Szukaj dokumentów, szablonów' : 'Search documents, templates'}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`flex items-center justify-center w-10 h-10 rounded-[8px] transition-all focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-[#374151] hover:bg-[#4B5563] text-gray-300 hover:text-white focus:ring-[#10B981] border border-[#4B5563]'
              : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-600 hover:text-gray-900 focus:ring-[#10B981] border border-[#D1D5DB]'
          }`}
          aria-label={`${language === 'pl' ? 'Przełącz na tryb' : 'Switch to'} ${theme === 'light' ? (language === 'pl' ? 'ciemny' : 'dark') : (language === 'pl' ? 'jasny' : 'light')}`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLanguage}
          className={`flex items-center gap-2 rounded-[8px] px-3 py-2 transition-all focus:outline-none focus:ring-2 min-h-[44px] ${
            theme === 'dark'
              ? 'bg-[#374151] hover:bg-[#4B5563] text-gray-300 hover:text-white focus:ring-[#10B981] border border-[#4B5563]'
              : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-600 hover:text-gray-900 focus:ring-[#10B981] border border-[#D1D5DB]'
          }`}
          aria-label={`${language === 'pl' ? 'Zmień język na' : 'Change language to'} ${language === 'pl' ? 'EN' : 'PL'}`}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">{language.toUpperCase()}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className={`relative rounded-[8px] p-2 transition-all focus:outline-none focus:ring-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-[#374151] hover:bg-[#4B5563] text-gray-300 hover:text-white focus:ring-[#10B981] border border-[#4B5563]'
                : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-600 hover:text-gray-900 focus:ring-[#10B981] border border-[#D1D5DB]'
            }`}
            aria-label={`${language === 'pl' ? 'Powiadomienia' : 'Notifications'}${unreadCount > 0 ? ` (${unreadCount} ${language === 'pl' ? 'nieprzeczytane' : 'unread'})` : ''}`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium" aria-hidden="true">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className={`absolute right-0 top-12 w-80 rounded-xl shadow-xl z-50 ${
              theme === 'dark'
                ? 'bg-[#1F2937] border border-[#374151]'
                : 'bg-white border border-[#E5E7EB] shadow-lg'
            }`}>
              <div className={`p-4 border-b ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
              }`}>
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'pl' ? 'Powiadomienia' : 'Notifications'}
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setShowNotifications(false);
                      if (onNotificationClick) {
                        if (notif.id === '1') {
                          onNotificationClick('approval-flow');
                        } else if (notif.id === '2') {
                          onNotificationClick('messages-list');
                        } else if (notif.id === '3') {
                          onNotificationClick('messages-list');
                        }
                      }
                    }}
                    className={`p-4 cursor-pointer transition-all border-b ${
                      theme === 'dark'
                        ? `border-[#374151] hover:bg-[#374151] ${notif.unread ? 'bg-[#10B981]/10' : ''}`
                        : `border-[#F3F4F6] hover:bg-[#F9FAFB] ${notif.unread ? 'bg-[#ECFDF5]' : ''}`
                    }`}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-start gap-3">
                      {notif.unread && (
                        <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2" aria-label={language === 'pl' ? 'Nieprzeczytane' : 'Unread'} />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{notif.title}</p>
                        <p className={`text-xs mb-1 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>{notif.message}</p>
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        }`}>{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`p-3 border-t ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
              }`}>
                <button className={`w-full text-sm text-center transition-all ${
                  theme === 'dark' ? 'text-[#10B981] hover:text-[#059669]' : 'text-[#059669] hover:text-[#047857]'
                }`}>
                  {language === 'pl' ? 'Zobacz wszystkie' : 'View all'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-3 rounded-[8px] px-3 py-2 transition-all focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'bg-[#374151] hover:bg-[#4B5563] focus:ring-[#10B981] border border-[#4B5563]'
                : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] focus:ring-[#10B981] border border-[#D1D5DB]'
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{userName}</p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>{userRole}</p>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''} ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`} />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className={`absolute right-0 top-12 w-56 rounded-xl shadow-xl z-50 ${
              theme === 'dark'
                ? 'bg-[#1F2937] border border-[#374151]'
                : 'bg-white border border-[#E5E7EB] shadow-lg'
            }`}>
              <div className={`p-4 border-b ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
              }`}>
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{userName}</p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{userRole}</p>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>anna.kowalska@zabka.pl</p>
              </div>
              <div className="p-2">
                <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all text-left ${
                  theme === 'dark'
                    ? 'hover:bg-[#374151] text-gray-300 hover:text-white'
                    : 'hover:bg-[#F3F4F6] text-gray-600 hover:text-gray-900'
                }`}>
                  <User className="w-4 h-4" />
                  <span className="text-sm">{language === 'pl' ? 'Mój profil' : 'My profile'}</span>
                </button>
                <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all text-left ${
                  theme === 'dark'
                    ? 'hover:bg-[#374151] text-gray-300 hover:text-white'
                    : 'hover:bg-[#F3F4F6] text-gray-600 hover:text-gray-900'
                }`}>
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">{language === 'pl' ? 'Ustawienia' : 'Settings'}</span>
                </button>
              </div>
              <div className={`p-2 border-t ${
                theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]'
              }`}>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-all text-left">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{language === 'pl' ? 'Wyloguj' : 'Logout'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
}
