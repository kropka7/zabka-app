import { ReactNode, useState } from 'react';
import { Language, Theme } from '../../App';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export type Screen = 
  | 'dashboard'
  | 'messages-list'
  | 'document-wizard'
  | 'team-templates'
  | 'ai-draft-generator'
  | 'distribution-channels'
  | 'publication-scheduler'
  | 'approval-flow'
  | 'full-preview'
  | 'slidedeck-generator'
  | 'settings';

interface AppLayoutProps {
  children: ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  language: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  userName?: string;
  userRole?: string;
  pendingDocumentsCount?: number;
  totalDocumentsCount?: number;
  onCreateDocument?: () => void;
}

export function AppLayout({ 
  children, 
  currentScreen, 
  onNavigate, 
  language,
  theme,
  onToggleLanguage,
  onToggleTheme,
  userName = 'Anna Kowalska',
  userRole = 'HR Manager',
  pendingDocumentsCount = 0,
  totalDocumentsCount = 0,
  onCreateDocument
}: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    setIsMobileMenuOpen(false); // Close mobile sidebar after navigation
  };

  return (
    <div className={`h-screen flex overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#1F2937]'
        : 'bg-gradient-to-br from-[#F9FAFB] via-[#FFFFFF] to-[#F3F4F6]'
    }`}>
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          language={language}
          theme={theme}
          pendingDocumentsCount={pendingDocumentsCount}
          totalDocumentsCount={totalDocumentsCount}
          onCreateDocument={onCreateDocument}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar 
              currentScreen={currentScreen} 
              onNavigate={(screen) => {
                onNavigate(screen);
                setIsMobileMenuOpen(false);
              }} 
              language={language}
              theme={theme}
              onClose={() => setIsMobileMenuOpen(false)}
              pendingDocumentsCount={pendingDocumentsCount}
              totalDocumentsCount={totalDocumentsCount}
              onCreateDocument={onCreateDocument}
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="flex-shrink-0">
          <TopNav 
            language={language}
            theme={theme}
            onToggleLanguage={onToggleLanguage}
            onToggleTheme={onToggleTheme}
            userName={userName}
            userRole={userRole}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onNotificationClick={(route) => handleNavigate(route as Screen)}
            pendingDocumentsCount={pendingDocumentsCount}
            onCreateDocument={onCreateDocument}
          />
        </div>

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}