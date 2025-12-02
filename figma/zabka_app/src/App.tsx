import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { ResetPassword } from './components/auth/ResetPassword';
import { AppLayout, Screen } from './components/layout/AppLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { MessagesList } from './components/messages/MessagesList';
import { DocumentWizard } from './components/document-wizard/DocumentWizard';
import { AIDraftGenerator } from './components/ai-draft-generator/AIDraftGenerator';
import { TeamTemplatesLibrary } from './components/team-templates/TeamTemplatesLibrary';
import { DistributionChannels } from './components/distribution-channels/DistributionChannels';
import { PublicationScheduler } from './components/publication-scheduler/PublicationScheduler';
import { ApprovalFlow } from './components/approval/ApprovalFlow';
import { FullDocumentPreview } from './components/preview/FullDocumentPreview';
import { SlideDeckGenerator } from './components/slidedeck/SlideDeckGenerator';
import { Settings } from './components/settings/Settings';
import { Toaster, toast } from 'sonner@2.0.3';

export type Language = 'pl' | 'en';
export type Theme = 'light' | 'dark';

export interface Message {
  id: string;
  title: string;
  content: string;
  teams: string[];
  recipients?: string[];
  channels: string[];
  createdAt: Date;
  createdBy: string;
  status: 'draft' | 'published' | 'scheduled' | 'pending-approval' | 'ready-to-publish';
  tags?: string[];
  socialPlatforms?: string[];
}

export interface PendingDocument {
  id: number;
  title: string;
  team: string;
  submittedBy: string;
  submittedDate: string;
  content: string;
  channels: string[];
  socialPlatforms: string[];
  recipients?: string[];
  messageId?: string; // Link to Message.id
}

type AuthScreen = 'login' | 'reset-password';

export default function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  
  // App state
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [language, setLanguage] = useState<Language>('pl');
  const [theme, setTheme] = useState<Theme>('dark');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [messageStatusFilter, setMessageStatusFilter] = useState<'all' | 'draft' | 'published' | 'scheduled'>('all');
  const [templateData, setTemplateData] = useState<{
    title: string;
    team: string;
    content: string;
    channels: string[];
  } | null>(null);
  
  // Document being scheduled
  const [schedulingDocument, setSchedulingDocument] = useState<{
    title: string;
    teams: string[];
    content: string;
    channels: string[];
    socialPlatforms?: string[];
    createdBy: string;
  } | null>(null);
  
  // Document for preview
  const [previewDocument, setPreviewDocument] = useState<{
    title: string;
    team: string;
    content: string;
    date: string;
    messageId: string;
    status: 'draft' | 'published' | 'scheduled' | 'pending-approval' | 'ready-to-publish';
  } | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      title: '[OPUBLIKOWANY] Nowa polityka urlopowa',
      content: 'Informujemy o zmianach w polityce urlopowej obowiązujących od Q2 2024. Wszyscy pracownicy będą mieli możliwość wykorzystania dodatkowych dni urlopowych.',
      teams: ['HR'],
      channels: ['email', 'intranet'],
      createdAt: new Date('2024-11-15'),
      createdBy: 'Anna Kowalska',
      status: 'published',
      tags: ['polityka', 'urlopy']
    },
    {
      id: '2',
      title: '[GOTOWY DO PUBLIKACJI] Aktualizacja RODO',
      content: 'Zgodnie z najnowszymi wytycznymi RODO wprowadzamy zmiany w procedurach bezpieczeństwa danych osobowych. Dokument został zatwierdzony przez kierownictwo.',
      teams: ['Dział Prawny', 'HR'],
      channels: ['email', 'intranet', 'release-notes'],
      createdAt: new Date('2024-11-20'),
      createdBy: 'Jan Nowak',
      status: 'ready-to-publish',
      tags: ['RODO', 'bezpieczeństwo']
    },
    {
      id: '3',
      title: '[WYSŁANY DO AKCEPTACJI] Nowy system IT',
      content: 'Wdrażamy nowy system zarządzania projektami który usprawni naszą pracę i komunikację wewnętrzną. Dokument oczekuje na akceptację kierownictwa.',
      teams: ['IT & Tech', 'Ogólny'],
      channels: ['email', 'presentation'],
      createdAt: new Date('2024-11-25'),
      createdBy: 'Piotr Wiśniewski',
      status: 'pending-approval',
      tags: ['IT', 'wdrożenie']
    },
    {
      id: '4',
      title: '[SZKIC] Kampania marketingowa Q1',
      content: 'Planowanie nowej kampanii marketingowej na Q1 2025. Dokument w fazie szkicu, wymaga uzupełnienia.',
      teams: ['Marketing'],
      channels: ['email'],
      createdAt: new Date('2024-11-28'),
      createdBy: 'Maria Nowacka',
      status: 'draft',
      tags: ['marketing', 'kampania']
    },
    {
      id: '5',
      title: '[ZAPLANOWANY] Polityka pracy zdalnej',
      content: 'Nowe zasady pracy zdalnej obowiązujące od stycznia 2025. Publikacja zaplanowana na 15 grudnia 2024.',
      teams: ['HR'],
      channels: ['email', 'intranet'],
      createdAt: new Date('2024-12-01'),
      createdBy: 'Anna Kowalska',
      status: 'scheduled',
      tags: ['praca zdalna', 'polityka']
    },
    {
      id: '6',
      title: '[WYSŁANY DO AKCEPTACJI] Nowa polityka urlopowa 2025',
      content: 'Informujemy o zmianie w polityce urlopowej obowiązującej od 1 stycznia 2025.\n\nWszyscy pracownicy będą mieli możliwość wykorzystania dni urlopowych w bardziej elastyczny sposób, zgodnie z nowymi wytycznymi HR.\n\nGłówne zmiany:\n• Elastyczne planowanie urlopu z wyprzedzeniem 2 tygodni\n• Możliwość dzielenia urlopu na pojedyncze dni\n• Nowy system zgłaszania wniosków urlopowych przez intranet\n• Przedłużenie terminu wykorzystania urlopu do końca marca następnego roku\n\nZmiany wchodzą w życie z dniem 1 stycznia 2025 i dotyczą wszystkich pracowników zatrudnionych na umowę o pracę.',
      teams: ['HR'],
      channels: ['email', 'intranet'],
      socialPlatforms: ['LinkedIn', 'Facebook'],
      createdAt: new Date('2024-11-28'),
      createdBy: 'Anna Kowalska',
      status: 'pending-approval',
      tags: ['polityka', 'urlopy', '2025']
    },
    {
      id: '7',
      title: '[WYSŁANY DO AKCEPTACJI] Aktualizacja zabezpieczeń systemów IT',
      content: 'W związku z nowymi wymaganiami bezpieczeństwa, informujemy o planowanej aktualizacji systemów IT.\n\nZmiany obejmują:\n• Wdrożenie dwuetapowej autoryzacji dla wszystkich pracowników\n• Aktualizacja polityki haseł - minimalna długość 12 znaków\n• Obligatoryjne szkolenia z cyberbezpieczeństwa\n• Nowe procedury zgłaszania incydentów bezpieczeństwa\n\nAktualizacja zostanie przeprowadzona w weekend 15-17 grudnia 2024.',
      teams: ['IT & Tech'],
      channels: ['email', 'intranet'],
      createdAt: new Date('2024-11-29'),
      createdBy: 'Tomasz Wiśniewski',
      status: 'pending-approval',
      tags: ['IT', 'bezpieczeństwo', 'aktualizacja']
    }
  ]);

  // Pending documents for approval
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([
    {
      id: 1,
      title: '[WYSŁANY DO AKCEPTACJI] Nowy system IT',
      team: 'IT & Tech',
      submittedBy: 'Piotr Wiśniewski',
      submittedDate: '2024-11-25',
      content: 'Wdrażamy nowy system zarządzania projektami który usprawni naszą pracę i komunikację wewnętrzną. Dokument oczekuje na akceptację kierownictwa.',
      channels: ['Email', 'Presentation'],
      socialPlatforms: [],
      messageId: '3'
    },
    {
      id: 2,
      title: '[WYSŁANY DO AKCEPTACJI] Nowa polityka urlopowa 2025',
      team: 'HR',
      submittedBy: 'Anna Kowalska',
      submittedDate: '2024-11-28',
      content: 'Informujemy o zmianie w polityce urlopowej obowiązującej od 1 stycznia 2025.\n\nWszyscy pracownicy będą mieli możliwość wykorzystania dni urlopowych w bardziej elastyczny sposób, zgodnie z nowymi wytycznymi HR.\n\nGłówne zmiany:\n• Elastyczne planowanie urlopu z wyprzedzeniem 2 tygodni\n• Możliwość dzielenia urlopu na pojedyncze dni\n• Nowy system zgłaszania wniosków urlopowych przez intranet\n• Przedłużenie terminu wykorzystania urlopu do końca marca następnego roku\n\nZmiany wchodzą w życie z dniem 1 stycznia 2025 i dotyczą wszystkich pracowników zatrudnionych na umowę o pracę.',
      channels: ['Email', 'Intranet', 'Social Media'],
      socialPlatforms: ['LinkedIn', 'Facebook'],
      messageId: '6'
    },
    {
      id: 3,
      title: '[WYSŁANY DO AKCEPTACJI] Aktualizacja zabezpieczeń systemów IT',
      team: 'IT & Tech',
      submittedBy: 'Tomasz Wiśniewski',
      submittedDate: '2024-11-29',
      content: 'W związku z nowymi wymaganiami bezpieczeństwa, informujemy o planowanej aktualizacji systemów IT.\n\nZmiany obejmują:\n• Wdrożenie dwuetapowej autoryzacji dla wszystkich pracowników\n• Aktualizacja polityki haseł - minimalna długość 12 znaków\n• Obligatoryjne szkolenia z cyberbezpieczeństwa\n• Nowe procedury zgłaszania incydentów bezpieczeństwa\n\nAktualizacja zostanie przeprowadzona w weekend 15-17 grudnia 2024.',
      channels: ['Email', 'Intranet'],
      socialPlatforms: [],
      messageId: '7'
    }
  ]);

  // Calculate total documents count (messages + unique pending documents not yet in messages)
  const totalDocumentsCount = messages.length + pendingDocuments.filter(pd => !pd.messageId).length;

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    toast.success(language === 'pl' ? 'Zalogowano pomyślnie' : 'Logged in successfully');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pl' ? 'en' : 'pl');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleViewMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setPreviewDocument({
        title: message.title,
        team: message.teams[0] || 'Ogólny',
        content: message.content,
        date: message.createdAt.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        messageId: message.id,
        status: message.status
      });
    }
    setCurrentScreen('full-preview');
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    
    // Block editing for published, ready-to-publish, and pending-approval documents
    if (message && (message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval')) {
      toast.error(language === 'pl' 
        ? 'Nie można edytować tego dokumentu. Wymagana prośba o odblokowanie.' 
        : 'Cannot edit this document. Edit request required.');
      return;
    }
    
    setEditingMessageId(messageId);
    setTemplateData(null); // Clear template mode
    setCurrentScreen('document-wizard');
    toast.info(language === 'pl' ? 'Edycja dokumentu' : 'Editing document');
  };

  const handleScheduleMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setSchedulingDocument({
        title: message.title,
        teams: message.teams,
        content: message.content,
        channels: message.channels,
        socialPlatforms: message.socialPlatforms,
        createdBy: message.createdBy
      });
      setCurrentScreen('publication-scheduler');
      toast.info(language === 'pl' ? 'Planowanie publikacji' : 'Scheduling publication');
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(m => m.id !== messageId));
    toast.success(language === 'pl' ? 'Dokument usunięty' : 'Document deleted');
  };

  const handleWizardComplete = (data: { 
    title: string; 
    teams: string[];
    recipients: string[];
    content: string;
    channels: string[];
    socialPlatforms: string[];
    requiresApproval: boolean;
  }) => {
    if (data) {
      if (editingMessageId) {
        // Update existing message
        const updatedMessage = messages.find(m => m.id === editingMessageId);
        
        setMessages(messages.map(m => 
          m.id === editingMessageId 
            ? {
                ...m,
                title: data.title,
                content: data.content,
                teams: data.teams,
                recipients: data.recipients,
                channels: data.channels,
                socialPlatforms: data.socialPlatforms,
                status: data.requiresApproval ? 'pending-approval' : 'published', // Update status based on action
              }
            : m
        ));
        
        if (data.requiresApproval) {
          // Add to pending documents for approval
          const pendingDoc: PendingDocument = {
            id: Date.now(),
            title: data.title,
            team: data.teams[0] || 'HR',
            submittedBy: updatedMessage?.createdBy || 'Jan Nowak',
            submittedDate: new Date().toISOString().split('T')[0],
            content: data.content,
            channels: data.channels,
            socialPlatforms: data.socialPlatforms,
            messageId: editingMessageId
          };
          setPendingDocuments(prev => [pendingDoc, ...prev]);
          
          toast.success(language === 'pl' ? 'Dokument wysłany do akceptacji!' : 'Document sent for approval!');
          setCurrentScreen('approval-flow');
        } else {
          toast.success(language === 'pl' ? 'Dokument opublikowany!' : 'Document published!');
          setCurrentScreen('messages-list');
        }
      } else {
        // Create new message
        const newMessage: Message = {
          id: Date.now().toString(),
          title: data.title,
          content: data.content,
          teams: data.teams,
          recipients: data.recipients,
          channels: data.channels,
          socialPlatforms: data.socialPlatforms,
          createdAt: new Date(),
          createdBy: 'Jan Nowak', // Current user
          status: data.requiresApproval ? 'pending-approval' : 'published',
          tags: []
        };

        // Add to messages list
        setMessages([newMessage, ...messages]);

        if (data.requiresApproval) {
          // Add to pending documents for approval
          const pendingDoc: PendingDocument = {
            id: Date.now(),
            title: data.title,
            team: data.teams[0] || 'HR',
            submittedBy: 'Jan Nowak',
            submittedDate: new Date().toISOString().split('T')[0],
            content: data.content,
            channels: data.channels,
            socialPlatforms: data.socialPlatforms,
            messageId: newMessage.id
          };
          setPendingDocuments(prev => [pendingDoc, ...prev]);
          
          toast.success(language === 'pl' ? 'Dokument wysłany do akceptacji!' : 'Document sent for approval!');
          setCurrentScreen('approval-flow');
        } else {
          toast.success(language === 'pl' ? 'Dokument opublikowany!' : 'Document published!');
          setCurrentScreen('messages-list');
        }
      }
    } else {
      // Fallback for old behavior
      toast.success(language === 'pl' ? 'Dokument utworzony!' : 'Document created!');
      setCurrentScreen('approval-flow');
    }
    
    // Reset wizard state
    setEditingMessageId(null);
    setTemplateData(null);
  };

  const handleUseTemplate = (templateData: { title: string; team: string; content: string; channels: string[] }) => {
    setTemplateData(templateData);
    setEditingMessageId(null); // Clear editing mode
    setCurrentScreen('document-wizard');
    toast.success(language === 'pl' ? 'Szablon załadowany' : 'Template loaded');
  };

  const handleUseDraft = () => {
    setCurrentScreen('document-wizard');
    toast.success(language === 'pl' ? 'Draft załadowany do kreatora' : 'Draft loaded to wizard');
  };

  const handleApproveDocument = (documentId: number) => {
    const pendingDoc = pendingDocuments.find(doc => doc.id === documentId);
    if (!pendingDoc) return;

    if (pendingDoc.messageId) {
      // Update existing message status to 'ready-to-publish'
      setMessages(messages.map(m =>
        m.id === pendingDoc.messageId
          ? { ...m, status: 'ready-to-publish' }
          : m
      ));
    } else {
      // Create new message with 'ready-to-publish' status if no messageId exists
      const newMessage: Message = {
        id: String(Date.now()),
        title: pendingDoc.title,
        content: pendingDoc.content,
        teams: [pendingDoc.team],
        recipients: pendingDoc.recipients,
        channels: pendingDoc.channels,
        socialPlatforms: pendingDoc.socialPlatforms,
        createdAt: new Date(pendingDoc.submittedDate),
        createdBy: pendingDoc.submittedBy,
        status: 'ready-to-publish',
        tags: []
      };
      setMessages([newMessage, ...messages]);
    }

    // Remove from pending documents
    setPendingDocuments(pendingDocuments.filter(doc => doc.id !== documentId));

    toast.success(language === 'pl' ? 'Dokument zaakceptowany! Gotowy do publikacji.' : 'Document approved! Ready to publish.');
  };

  const handleRejectDocument = (documentId: number, reason?: string) => {
    const pendingDoc = pendingDocuments.find(doc => doc.id === documentId);
    if (!pendingDoc) return;

    // Update message status back to 'draft' if messageId exists
    if (pendingDoc.messageId) {
      setMessages(messages.map(m =>
        m.id === pendingDoc.messageId
          ? { ...m, status: 'draft' }
          : m
      ));
    }
    // If no messageId, the document was never in messages, so just remove from pending

    // Remove from pending documents
    setPendingDocuments(pendingDocuments.filter(doc => doc.id !== documentId));

    toast.error(language === 'pl' ? 'Dokument odrzucony' : 'Document rejected');
  };

  const handlePublishDocument = (messageId: string) => {
    setMessages(messages.map(m =>
      m.id === messageId
        ? { ...m, status: 'published' }
        : m
    ));
    toast.success(language === 'pl' ? 'Dokument opublikowany!' : 'Document published!');
    setCurrentScreen('messages-list');
  };

  const handleRequestEdit = (messageId: string) => {
    // Change document status back to 'draft' to unlock editing
    setMessages(messages.map(m =>
      m.id === messageId
        ? { ...m, status: 'draft' }
        : m
    ));
    
    toast.success(language === 'pl' 
      ? 'Dokument został odblokowany do edycji.' 
      : 'Document unlocked for editing.');
    
    // Refresh preview to show updated status
    const message = messages.find(m => m.id === messageId);
    if (message && previewDocument) {
      setPreviewDocument({
        ...previewDocument,
        status: 'draft'
      });
    }
  };

  // Auth screens
  if (!isLoggedIn) {
    return resetMode ? (
      <ResetPassword
        language={language}
        theme={theme}
        onBack={() => setResetMode(false)}
        onResetSuccess={() => {
          setResetMode(false);
        }}
      />
    ) : (
      <LoginScreen
        language={language}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        onLogin={(email, password) => {
          setIsLoggedIn(true);
          setResetMode(false);
        }}
        onResetPassword={() => setResetMode(true)}
      />
    );
  }

  // Render current screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard 
          language={language}
          theme={theme}
          messages={messages}
          onNavigate={handleNavigate}
          onStatClick={(filter) => {
            setMessageStatusFilter(filter);
            setCurrentScreen('messages-list');
          }}
        />;

      case 'messages-list':
        return (
          <MessagesList 
            language={language}
            theme={theme}
            messages={messages}
            onViewMessage={handleViewMessage}
            onEditMessage={handleEditMessage}
            onScheduleMessage={handleScheduleMessage}
            onDeleteMessage={handleDeleteMessage}
            statusFilter={messageStatusFilter}
            onStatusFilterChange={setMessageStatusFilter}
          />
        );

      case 'document-wizard':
        const editingMessage = editingMessageId ? messages.find(m => m.id === editingMessageId) : null;
        const initialWizardData = editingMessage ? {
          title: editingMessage.title,
          teams: editingMessage.teams,  // Pass array of teams
          recipients: editingMessage.recipients || [],  // Pass recipients
          content: editingMessage.content,
          channels: editingMessage.channels,
          socialPlatforms: editingMessage.socialPlatforms || []
        } : templateData ? {
          title: templateData.title,
          team: templateData.team,  // Backward compatibility for templates
          content: templateData.content,
          channels: templateData.channels,
          socialPlatforms: []
        } : undefined;
        
        return (
          <DocumentWizard 
            language={language}
            theme={theme}
            onComplete={handleWizardComplete}
            onSaveDraft={(data) => {
              if (editingMessageId) {
                // Update existing message as draft
                setMessages(messages.map(m => 
                  m.id === editingMessageId 
                    ? {
                        ...m,
                        title: data.title,
                        content: data.content,
                        teams: data.teams,
                        recipients: data.recipients,
                        channels: data.channels,
                        socialPlatforms: data.socialPlatforms,
                        status: 'draft'
                      }
                    : m
                ));
                toast.success(language === 'pl' ? 'Zmiany zapisane!' : 'Changes saved!');
              } else {
                // Save as new draft
                const newMessage: Message = {
                  id: Date.now().toString(),
                  title: data.title,
                  content: data.content,
                  teams: data.teams,
                  recipients: data.recipients,
                  channels: data.channels,
                  socialPlatforms: data.socialPlatforms,
                  createdAt: new Date(),
                  createdBy: 'Jan Nowak',
                  status: 'draft',
                  tags: []
                };
                setMessages([newMessage, ...messages]);
                toast.success(language === 'pl' ? 'Szkic zapisany!' : 'Draft saved!');
              }
              setCurrentScreen('messages-list');
              setEditingMessageId(null);
              setTemplateData(null);
            }}
            onSchedule={(data) => {
              // Go to publication scheduler with document data
              setSchedulingDocument({
                title: data.title,
                teams: data.teams,
                content: data.content,
                channels: data.channels,
                socialPlatforms: data.socialPlatforms,
                createdBy: 'Jan Nowak'
              });
              setCurrentScreen('publication-scheduler');
              toast.info(language === 'pl' ? 'Planowanie publikacji' : 'Scheduling publication');
              setEditingMessageId(null);
              setTemplateData(null);
            }}
            onCancel={() => {
              setCurrentScreen('dashboard');
              setEditingMessageId(null);
              setTemplateData(null);
            }}
            initialData={initialWizardData}
          />
        );

      case 'team-templates':
        return (
          <TeamTemplatesLibrary 
            language={language}
            theme={theme}
            onToggleLanguage={toggleLanguage}
            onUseTemplate={handleUseTemplate}
          />
        );

      case 'ai-draft-generator':
        return (
          <AIDraftGenerator 
            language={language}
            theme={theme}
            onToggleLanguage={toggleLanguage}
            onUseDraft={handleUseDraft}
          />
        );

      case 'distribution-channels':
        return (
          <DistributionChannels 
            language={language}
            theme={theme}
            onToggleLanguage={toggleLanguage}
            onContinue={() => setCurrentScreen('publication-scheduler')}
          />
        );

      case 'publication-scheduler':
        return (
          <PublicationScheduler 
            language={language}
            theme={theme}
            onToggleLanguage={toggleLanguage}
            documentData={schedulingDocument || undefined}
            selectedChannels={schedulingDocument?.channels}
            onSchedule={(schedules) => {
              if (schedulingDocument) {
                // Create new message with scheduled status
                const newMessage: Message = {
                  id: Date.now().toString(),
                  title: schedulingDocument.title,
                  content: schedulingDocument.content,
                  teams: schedulingDocument.teams,
                  recipients: [],
                  channels: schedulingDocument.channels,
                  socialPlatforms: schedulingDocument.socialPlatforms || [],
                  createdAt: new Date(),
                  createdBy: schedulingDocument.createdBy,
                  status: 'scheduled',
                  tags: []
                };
                
                setMessages(prev => [newMessage, ...prev]);
              }
              
              toast.success(language === 'pl' ? 'Harmonogram zapisany' : 'Schedule saved');
              setSchedulingDocument(null);
              setCurrentScreen('messages-list');
            }}
            onSaveDraft={(schedules) => {
              if (schedulingDocument) {
                // Create new draft message
                const newMessage: Message = {
                  id: Date.now().toString(),
                  title: schedulingDocument.title,
                  content: schedulingDocument.content,
                  teams: schedulingDocument.teams,
                  recipients: [],
                  channels: schedulingDocument.channels,
                  socialPlatforms: schedulingDocument.socialPlatforms || [],
                  createdAt: new Date(),
                  createdBy: schedulingDocument.createdBy,
                  status: 'draft',
                  tags: []
                };
                
                setMessages(prev => [newMessage, ...prev]);
              }
              
              toast.success(language === 'pl' ? 'Szkic zapisany' : 'Draft saved');
              setSchedulingDocument(null);
              setCurrentScreen('dashboard');
            }}
            onCancel={() => {
              setSchedulingDocument(null);
              setCurrentScreen('dashboard');
            }}
          />
        );

      case 'approval-flow':
        return <ApprovalFlow language={language} theme={theme} pendingDocuments={pendingDocuments} onApprove={handleApproveDocument} onReject={handleRejectDocument} />;

      case 'full-preview':
        return (
          <FullDocumentPreview 
            language={language}
            theme={theme}
            team={previewDocument?.team}
            title={previewDocument?.title}
            date={previewDocument?.date}
            content={previewDocument?.content}
            messageId={previewDocument?.messageId}
            status={previewDocument?.status}
            onEdit={() => {
              if (previewDocument?.messageId) {
                handleEditMessage(previewDocument.messageId);
              }
            }}
            onPublish={handlePublishDocument}
            onRequestEdit={handleRequestEdit}
            onClose={() => setCurrentScreen('messages-list')}
          />
        );

      case 'slidedeck-generator':
        return <SlideDeckGenerator language={language} theme={theme} />;

      case 'settings':
        return (
          <Settings 
            language={language}
            theme={theme}
            onToggleLanguage={toggleLanguage}
          />
        );

      default:
        return <Dashboard language={language} theme={theme} messages={messages} onNavigate={handleNavigate} onStatClick={(filter) => {
          setCurrentScreen('messages-list');
        }} />;
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppLayout
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        language={language}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        userName="Anna Kowalska"
        userRole="HR Manager"
        pendingDocumentsCount={pendingDocuments.length}
        totalDocumentsCount={totalDocumentsCount}
        onCreateDocument={() => {
          setEditingMessageId(null);
          setTemplateData(null);
          setCurrentScreen('document-wizard');
          toast.info(language === 'pl' ? 'Tworzenie nowego dokumentu' : 'Creating new document');
        }}
      >
        {renderScreen()}
      </AppLayout>
      
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
      />
    </div>
  );
}