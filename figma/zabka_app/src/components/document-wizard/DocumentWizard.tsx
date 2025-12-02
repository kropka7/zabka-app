import { useState } from 'react';
import { Language } from '../../App';
import { 
  FileText, 
  Paperclip, 
  Share2, 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Eye,
  Mail,
  Globe,
  Presentation,
  Linkedin,
  Facebook,
  Instagram,
  Send,
  Save,
  CalendarClock,
  Settings,
  Sparkles,
  CheckCircle2,
  X,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { ChannelConfigPanel, ChannelConfig } from './ChannelConfigPanel';
import { teamConfig, TeamName } from '../utils/teamIcons';
import { toast } from 'sonner@2.0.3';
import { TeamRecipientsSelector, allPeople } from './TeamRecipientsSelector';
import { CustomCheckbox } from '../ui/custom-checkbox';
import { Button, Card, CardHeader, CardBody, Input, Textarea, Badge } from '../ui';

interface DocumentWizardProps {
  language: Language;
  theme?: 'light' | 'dark';
  onComplete?: (data: {
    title: string;
    teams: string[];
    recipients: string[];
    content: string;
    channels: string[];
    socialPlatforms: string[];
    requiresApproval: boolean;
  }) => void;
  onSaveDraft?: (data: {
    title: string;
    teams: string[];
    recipients: string[];
    content: string;
    channels: string[];
    socialPlatforms: string[];
  }) => void;
  onSchedule?: (data: {
    title: string;
    teams: string[];
    recipients: string[];
    content: string;
    channels: string[];
    socialPlatforms: string[];
  }) => void;
  onCancel?: () => void;
  initialData?: {
    title: string;
    team?: string;  // For backward compatibility
    teams?: string[];  // New: support multiple teams
    recipients?: string[];  // New: support recipients
    content: string;
    channels: string[];
    socialPlatforms: string[];
  };
}

export function DocumentWizard({ language, theme = 'dark', onComplete, onSaveDraft, onSchedule, onCancel, initialData }: DocumentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    teams: initialData?.teams || (initialData?.team ? [initialData.team] : ['HR']),
    recipients: initialData?.recipients || [] as string[],
    content: initialData?.content || '',
    attachments: [] as File[],
    channels: initialData?.channels || [] as string[],
    socialPlatforms: initialData?.socialPlatforms || [] as string[],
    requiresApproval: true
  });
  const [channelConfigs, setChannelConfigs] = useState<Record<string, any>>({});
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [showTemplateImport, setShowTemplateImport] = useState(false);
  const [templateContent, setTemplateContent] = useState('');
  const [regenerationCount, setRegenerationCount] = useState(0);

  const translations = {
    pl: {
      title: 'Nowy Dokument',
      step1: 'Podstawowe dane',
      step2: 'Treść dokumentu',
      step3: 'Załączniki',
      step4: 'Kanały dystrybucji',
      step5: 'Konfiguracja kanałów',
      step6: 'Podsumowanie',
      step7: 'Podgląd',
      next: 'Dalej',
      back: 'Wstecz',
      finish: 'Zakończ',
      sendToApproval: 'Wyślij do akceptacji',
      publish: 'Opublikuj',
      publishNow: 'Opublikuj teraz',
      saveDraft: 'Zapisz szkic',
      schedulePublication: 'Zaplanuj publikację',
      cancel: 'Anuluj',
      documentTitle: 'Tytuł dokumentu',
      selectTeam: 'Wybierz zespoły albo konkretne osoby (opcjonalnie).',
      selectTeamDesc: 'Możesz wybrać więcej niż jeden zespół',
      selectRecipients: 'Wybierz konkretne osoby (opcjonalnie)',
      selectRecipientsDesc: 'Opcjonalnie możesz wybrać konkretne osoby do wysyłki',
      writeContent: 'Napisz treść dokumentu...',
      uploadFiles: 'Przeciągnij pliki lub kliknij aby dodać',
      selectChannels: 'Wybierz kanały publikacji',
      socialMedia: 'Media społecznościowe',
      selectPlatforms: 'Wybierz platformy:',
      channels: 'Kanały dystrybucji',
      platforms: 'Platformy',
      requiresApproval: 'Dokument wymaga akceptacji przełożonego',
      generalNote: '\"Ogólny\" wysyła do wszystkich zespołów',
      finalizeDocument: 'Finalizuj dokument',
      chooseAction: 'Wybierz co chcesz zrobić z dokumentem:',
      configureChannels: 'Skonfiguruj wybrane kanały',
      configureChannelsDesc: 'Dostosuj szczegóły dla każdego kanału lub użyj domyślnych ustawień',
      noChannelsSelected: 'Nie wybrano żadnych kanałów. Wróć do poprzedniego kroku.'
    },
    en: {
      title: 'New Document',
      step1: 'Basic info',
      step2: 'Document content',
      step3: 'Attachments',
      step4: 'Distribution channels',
      step5: 'Configure channels',
      step6: 'Summary',
      step7: 'Preview',
      next: 'Next',
      back: 'Back',
      finish: 'Finish',
      sendToApproval: 'Send for Approval',
      publish: 'Publish',
      publishNow: 'Publish now',
      saveDraft: 'Save draft',
      schedulePublication: 'Schedule publication',
      cancel: 'Cancel',
      documentTitle: 'Document title',
      selectTeam: 'Select teams',
      selectTeamDesc: 'You can select more than one team',
      selectRecipients: 'Select specific recipients (optional)',
      selectRecipientsDesc: 'Optionally select specific people to send to',
      writeContent: 'Write document content...',
      uploadFiles: 'Drag files or click to add',
      selectChannels: 'Select publication channels',
      socialMedia: 'Social Media',
      selectPlatforms: 'Select platforms:',
      channels: 'Distribution channels',
      platforms: 'Platforms',
      requiresApproval: 'Document requires manager approval',
      generalNote: '\"General\" sends to all teams',
      finalizeDocument: 'Finalize document',
      chooseAction: 'Choose what to do with your document:',
      configureChannels: 'Configure selected channels',
      configureChannelsDesc: 'Customize details for each channel or use default settings',
      noChannelsSelected: 'No channels selected. Go back to the previous step.'
    }
  };

  const t = translations[language];

  const steps = [
    { number: 1, title: t.step1, icon: FileText },
    { number: 2, title: t.step2, icon: FileText },
    { number: 3, title: t.step3, icon: Paperclip },
    { number: 4, title: t.step4, icon: Share2 },
    { number: 5, title: t.step5, icon: Settings },
    { number: 6, title: t.step6, icon: CheckCircle },
    { number: 7, title: t.step7, icon: Eye }
  ];

  const handleNext = () => {
    // Validate title on any step
    if (!formData.title.trim()) {
      toast.error(language === 'pl' ? 'Tytuł dokumentu jest wymagany' : 'Document title is required');
      return;
    }

    if (currentStep < 7) {
      // Initialize channel configs with defaults when moving to step 5
      if (currentStep === 4 && formData.channels.length > 0) {
        const newConfigs = { ...channelConfigs };
        formData.channels.forEach(channel => {
          if (!newConfigs[channel]) {
            newConfigs[channel] = { useDefaults: true };
          }
        });
        setChannelConfigs(newConfigs);
      }
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.({
        title: formData.title,
        teams: formData.teams,
        recipients: formData.recipients,
        content: formData.content,
        channels: formData.channels,
        socialPlatforms: formData.socialPlatforms,
        requiresApproval: formData.requiresApproval
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateAI = async (isRegeneration = false) => {
    if (!aiTopic.trim()) {
      toast.error(language === 'pl' ? 'Wprowadź temat lub wskazówki' : 'Enter topic or hints');
      return;
    }
    
    try {
      setIsGenerating(true);
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Variation index for regeneration
    const variation = isRegeneration ? regenerationCount : 0;
    
    // Generate content based on tone
    let content = '';
    
    if (language === 'pl') {
      switch(aiTone) {
        case 'formal':
          const formalVariations = [
            `Szanowni Państwo,

Niniejszym informujemy o ${aiTopic.toLowerCase()}. Decyzja ta została podjęta po szczegółowej analizie i konsultacjach z odpowiednimi działami.

Główne punkty dotyczące tej zmiany:
• Implementacja zostanie przeprowadzona zgodnie z obowiązującymi procedurami
• Wszystkie zainteresowane strony zostaną poinformowane z odpowiednim wyprzedzeniem
• W przypadku pytań prosimy o kontakt z właściwym działem

Szczegółowe informacje oraz harmonogram wdrożenia zostaną przekazane w osobnej korespondencji.

Dziękujemy za uwagę i zrozumienie.

Z poważaniem,
Zespół Zarządzający`,
            `Szanowni Państwo,

Z całą stanowczością pragniemy poinformować o ${aiTopic.toLowerCase()}. Niniejsza decyzja wynika z głębokiej analizy przeprowadzonej we współpracy z kluczowymi działami organizacji.

Kluczowe aspekty zmian:
• Wdrożenie nastąpi z zachowaniem wszystkich standardów i procedur
• Każda ze stron zaangażowanych otrzyma stosowne powiadomienie
• Dział odpowiedzialny pozostaje do dyspozycji w zakresie wyjaśnień

Dalsze szczegóły oraz precyzyjny harmonogram zostaną przekazane w odrębnym komunikacie.

Z wyrazami szacunku,
Zarząd`,
            `Szanowni Państwo,

Uprzejmie informujemy o wprowadzeniu ${aiTopic.toLowerCase()}. Powyższa inicjatywa została zatwierdzona po wielostopniowej analizie oraz szerokich konsultacjach.

Najważniejsze elementy:
• Proces realizacji będzie przebiegał zgodnie z ustalonymi wytycznymi
• Terminowa informacja zostanie przekazana wszystkim interesariuszom
• Wszelkie pytania prosimy kierować do odpowiednich jednostek organizacyjnych

Kompletna dokumentacja oraz plan działania zostaną udostępnione w najbliższym czasie.

Łączymy wyrazy szacunku,
Zespół Zarządzający`
          ];
          content = formalVariations[variation % formalVariations.length];
          break;
          
        case 'friendly':
          const friendlyVariations = [
            `Cześć Wszystkim! 👋

Mamy dla Was świetne wiadomości dotyczące ${aiTopic.toLowerCase()}!

Po wielu rozmowach i Waszym feedbacku, zdecydowaliśmy się wprowadzić kilka zmian, które - mamy nadzieję - ułatwią Wam życie:

✨ Co się zmienia:
�� Nowe rozwiązania, które uproszą codzienną pracę
• Większa elastyczność i wygoda dla całego zespołu
• Wsparcie na każdym etapie wdrażania

Jeśli macie jakiekolwiek pytania lub wątpliwości, śmiało do nas piszcie! Chętnie wszystko wyjaśnimy i pomożemy. 

Trzymajcie się ciepło i do usłyszenia wkrótce!

Pozdrawiamy serdecznie,
Wasz Team ��`,
            `Hej Ekipo! 🌟

Super wieści w temacie ${aiTopic.toLowerCase()}!

Słuchaliśmy Waszych głosów i uwag, więc postanowiliśmy wprowadzić zmiany, które mamy nadzieję, będą dla Was przydatne:

🚀 Nowości:
• Prostsze procesy w codziennej pracy
• Więcej swobody i komfortu dla wszystkich
• Pełne wsparcie od początku do końca

Pytania? Wątpliwości? Piszcie śmiało - jesteśmy tu dla Was i chętnie pomożemy!

Do zobaczenia!

Ciepło pozdrawiamy,
Zespół 💚`,
            `Siema Wszyscy! ✨

Świetna sprawa z ${aiTopic.toLowerCase()} - musieliśmy się tym z Wami podzielić!

Wzięliśmy pod uwagę Wasze sugestie i opinię, dlatego wdrażamy zmiany, które - jak wierzymy - będą super pomocne:

💡 Co nowego:
• Usprawnienia, które oszczędzą Wam czasu
• Większa elastyczność w działaniu
• Pomoc i wsparcie w każdej chwili

Jeśli cokolwiek jest niejasne, dajcie znać - z przyjemnością wyjaśnimy wszystkie szczegóły!

Buziaki i do usłyszenia!

Wasze Team 💚`
          ];
          content = friendlyVariations[variation % friendlyVariations.length];
          break;
          
        case 'professional':
          const professionalVariations = [
            `Witam,

Chciałbym poinformować o ${aiTopic.toLowerCase()}, która została zatwierdzona i wejdzie w życie w najbliższym czasie.

Kluczowe informacje:
• Zmiana została przygotowana w odpowiedzi na potrzeby zespołu
• Proces wdrożenia będzie monitorowany i optymalizowany
• Dostępne będzie pełne wsparcie oraz materiały szkoleniowe
• Terminy i szczegóły zostaną przekazane każdemu zespołowi indywidualnie

Zachęcam do zapoznania się z załączonymi materiałami. W razie pytań jestem do dyspozycji.

Pozdrawiam,
[Nazwa Zespołu]`,
            `Dzień dobry,

Pragnę zakomunikować wdrożenie ${aiTopic.toLowerCase()}, które otrzymało pełną akceptację i będzie realizowane w kolejnych tygodniach.

Najważniejsze punkty:
• Inicjatywa powstała jako odpowiedź na zgłaszane potrzeby
• Każdy etap wdrożenia będzie ściśle nadzorowany
• Zapewnimy kompletne wsparcie oraz dedykowane materiały
• Harmonogram zostanie przedstawiony poszczególnym zespołom

Proszę o zapoznanie się z dołączoną dokumentacją. Pozostaję do dyspozycji w razie pytań.

Z poważaniem,
[Nazwa Zespołu]`,
            `Witam Serdecznie,

Pragną poinformować o zaplanowanym ${aiTopic.toLowerCase()}, co zostało formalnie zatwierdzone i będzie wprowadzone w najbliższym okresie.

Główne założenia:
• Projekt odpowiada na konkretne zapotrzebowanie zespołów
• Implementacja będzie podlegać stałemu monitoringowi
• Przygotowane zostały pełne pakiety wsparcia i szkoleń
• Szczegó��owy plan działania trafi do każdego zespołu osobno

Polecam analizę dostarczonych materiałów. Chętnie odpowiem na wszelkie pytania.

Pozdrawiam,
[Nazwa Zespołu]`
          ];
          content = professionalVariations[variation % professionalVariations.length];
          break;
          
        case 'casual':
          const casualVariations = [
            `Hej!

Mamy news! ${aiTopic} - i myślimy, że się spodoba 😊

O co chodzi?
→ Kilka usprawnień, które ułatwią nam wszystkim pracę
�� Mniej formalności, więcej konkretów
→ Zmiany wchodzą stopniowo, więc będzie czas się przyzwyczaić

Jak będzie działać:
Dostaniecie dokładniejsze info w najbliższych dniach, ale już teraz możecie pytać jeśli coś jest niejasne. Nie ma głupich pytań!

Dajcie znać co myślicie - feedback mile widziany 💬

Cześć!
Team`,
            `Elo!

Mamy coś dla Was! ${aiTopic} - brzmi dobrze? 😎

Co to oznacza?
→ Parę fajnych zmian, które pomogą w codziennej robocie
→ Bez zbędnych ceregieli, tylko konkrety
→ Wszystko wchodzi powoli, więc luz - jest czas na adaptację

Co dalej:
Niebawem podeślemy szczegóły, ale jak coś jest niejasne, pytajcie już teraz. Zero stresu!

Czekamy na Wasze opinie - dajcie znać co sądzicie 💭

Pa!
Ekipa`,
            `Czołem!

Mamy newsa dla Was! ${aiTopic} - sądzimy, że to się przyda ���

Krótko:
→ Zmiany, które uproszczą codzienne zadania
→ Prostota zamiast biurokracji
→ Spokojne tempo wdrożenia - nikt nikogo nie pogania

A konkretnie:
Więcej info już wkrótce, ale teraz też możecie pytać jeśli macie wątpliwości. Każde pytanie jest ok!

Powiedzcie co o tym myślicie - uwagi super mile widziane 🗨️

Nara!
Team`
          ];
          content = casualVariations[variation % casualVariations.length];
          break;
          
        default:
          const defaultVariations = [
            `Dzień dobry,

Informujemy o ${aiTopic.toLowerCase()}.

Najważniejsze informacje:
• Zmiana obejmuje wszystkie wskazane obszary
• Szczeg��łowe wytyczne zostaną przekazane w osobnym komunikacie
• W razie pytań prosimy o kontakt

Dziękujemy za uwagę.

Pozdrawiam,
Zespół`,
            `Witam,

Przekazujemy informacje dotyczące ${aiTopic.toLowerCase()}.

Kluczowe punkty:
• Przedmiotowa zmiana dotyczy wszystkich wyznaczonych zakresów
• Pełne wytyczne otrzymacie w odrębnej wiadomości
• Pytania proszę kierować do zespołu

Dziękujemy.

Pozdrawiam,
Zespół`,
            `Dzień dobry,

Niniejszym komunikujemy sprawę ${aiTopic.toLowerCase()}.

Główne aspekty:
• Modyfikacja odnosi się do wszystkich określonych sfer
• Szczegółowa instrukcja zostanie dostarczona osobno
• W przypadku pytań jesteśmy do dyspozycji

Z poważaniem,
Zespół`
          ];
          content = defaultVariations[variation % defaultVariations.length];
      }
    } else {
      // English versions
      switch(aiTone) {
        case 'formal':
          const formalVariationsEn = [
            `Dear Colleagues,

We hereby inform you about ${aiTopic.toLowerCase()}. This decision has been made following detailed analysis and consultations with relevant departments.

Main points regarding this change:
• Implementation will be carried out in accordance with established procedures
• All stakeholders will be informed with appropriate notice
• For questions, please contact the relevant department

Detailed information and implementation schedule will be provided in separate correspondence.

Thank you for your attention and understanding.

Sincerely,
Management Team`,
            `Dear All,

We would like to officially announce ${aiTopic.toLowerCase()}. This initiative follows comprehensive evaluation and interdepartmental collaboration.

Key considerations:
• Execution will align with all organizational standards
• Relevant parties will receive timely notification
• The responsible department remains available for clarifications

Further details and precise timeline will be communicated separately.

Respectfully,
Executive Team`,
            `Dear Colleagues,

We wish to formally notify you regarding ${aiTopic.toLowerCase()}. The aforementioned decision was approved after thorough analysis and extensive consultations.

Essential elements:
• Implementation will proceed according to established guidelines
• Timely information will be provided to all stakeholders
• Please direct any inquiries to the appropriate departments

Complete documentation and action plan will be made available shortly.

Best regards,
Management Team`
          ];
          content = formalVariationsEn[variation % formalVariationsEn.length];
          break;
          
        case 'friendly':
          const friendlyVariationsEn = [
            `Hey Everyone! 👋

We have great news about ${aiTopic.toLowerCase()}!

After many discussions and your feedback, we've decided to introduce some changes that - we hope - will make your life easier:

✨ What's changing:
• New solutions that will simplify daily work
• More flexibility and convenience for the whole team
• Support at every stage of implementation

If you have any questions or concerns, feel free to reach out! We're happy to explain everything and help.

Take care and talk soon!

Warm regards,
Your Team 💚`,
            `Hi Team! 🌟

Exciting update regarding ${aiTopic.toLowerCase()}!

We've been listening to your suggestions and feedback, so we're rolling out changes that we believe will be really helpful:

��� What's new:
• Simplified processes for daily tasks
• Greater freedom and comfort for everyone
• Full support from start to finish

Questions? Concerns? Don't hesitate to reach out - we're here for you!

Talk soon!

Best wishes,
The Team 💚`,
            `Hello Everyone! ✨

Great news about ${aiTopic.toLowerCase()} - we had to share this with you!

We've taken your input into account, which is why we're implementing changes that - we believe - will be super useful:

💡 Coming up:
• Improvements that will save you time
• More flexibility in operations
• Help and support whenever you need it

If anything's unclear, let us know - we're happy to explain all the details!

Cheers!

Your Team 💚`
          ];
          content = friendlyVariationsEn[variation % friendlyVariationsEn.length];
          break;
          
        case 'professional':
          const professionalVariationsEn = [
            `Hello,

I would like to inform you about ${aiTopic.toLowerCase()}, which has been approved and will take effect soon.

Key information:
• The change has been prepared in response to team needs
• Implementation process will be monitored and optimized
• Full support and training materials will be available
• Timelines and details will be communicated to each team individually

I encourage you to review the attached materials. Please reach out if you have questions.

Best regards,
[Team Name]`,
            `Good day,

I wish to communicate the implementation of ${aiTopic.toLowerCase()}, which has received full approval and will be executed in the coming weeks.

Main points:
• This initiative addresses reported requirements
• Each implementation phase will be closely supervised
• We will provide complete support and dedicated materials
• The schedule will be presented to individual teams

Please review the attached documentation. I remain available for any questions.

Sincerely,
[Team Name]`,
            `Hello,

I would like to inform you about the planned ${aiTopic.toLowerCase()}, which has been formally approved and will be introduced soon.

Core assumptions:
• The project responds to specific team requirements
• Implementation will be subject to continuous monitoring
• Full support packages and training have been prepared
• Detailed action plans will be sent to each team separately

I recommend reviewing the provided materials. I'm happy to answer any questions.

Best regards,
[Team Name]`
          ];
          content = professionalVariationsEn[variation % professionalVariationsEn.length];
          break;
          
        case 'casual':
          const casualVariationsEn = [
            `Hey!

We've got news! ${aiTopic} - and we think you'll like it 😊

What's up?
→ A few improvements that'll make work easier for all of us
→ Less formality, more specifics
→ Changes rolling out gradually, so there's time to adjust

How it works:
You'll get more detailed info in the coming days, but feel free to ask now if anything's unclear. No such thing as a dumb question!

Let us know what you think - feedback is welcome 💬

Cheers!
Team`,
            `Hi there!

Got something for you! ${aiTopic} - sounds good? 😎

What does it mean?
→ Some cool changes that'll help with daily work
→ Skip the red tape, straight to the point
→ Everything's gradual, so chill - there's time to adapt

What's next:
We'll send details soon, but if anything's unclear, ask away. Zero stress!

We're waiting for your thoughts - let us know what you think 💭

Later!
Crew`,
            `Yo!

News for you all! ${aiTopic} - we think it'll come in handy 🎯

In short:
→ Changes that'll simplify everyday tasks
→ Simplicity over bureaucracy
→ Calm rollout pace - nobody's rushing anyone

More specifically:
More info coming soon, but you can ask now if you have doubts. Every question is fine!

Tell us what you think - comments super welcome 🗨️

Peace!
Team`
          ];
          content = casualVariationsEn[variation % casualVariationsEn.length];
          break;
          
        default:
          const defaultVariationsEn = [
            `Hello,

We inform you about ${aiTopic.toLowerCase()}.

Most important information:
• The change covers all indicated areas
• Detailed guidelines will be provided in a separate communication
• For questions, please contact us

Thank you for your attention.

Best regards,
Team`,
            `Greetings,

We are sharing information regarding ${aiTopic.toLowerCase()}.

Key points:
• The subject change applies to all designated scopes
• Full guidelines will be provided in a separate message
• Please direct questions to the team

Thank you.

Best regards,
Team`,
            `Hello,

We hereby communicate the matter of ${aiTopic.toLowerCase()}.

Main aspects:
• The modification relates to all specified areas
• Detailed instructions will be delivered separately
• We are available for any questions

Sincerely,
Team`
          ];
          content = defaultVariationsEn[variation % defaultVariationsEn.length];
      }
    }
    
      setGeneratedContent(content);
      
      if (isRegeneration) {
        setRegenerationCount(prev => prev + 1);
      } else {
        setRegenerationCount(0);
      }
    } catch (error) {
      toast.error(language === 'pl' ? 'Błąd generowania treści' : 'Error generating content');
      console.error('AI Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseGeneratedContent = () => {
    setFormData({ ...formData, content: generatedContent });
    setShowAIGenerator(false);
    setGeneratedContent('');
    setRegenerationCount(0);
    // Keep aiTopic and aiTone for potential future use
    toast.success(language === 'pl' ? 'Treść została dodana!' : 'Content added!');
  };

  const handleRegenerateContent = () => {
    handleGenerateAI(true);
  };

  const handleImportTemplate = () => {
    setFormData({ ...formData, content: templateContent });
    setShowTemplateImport(false);
    setTemplateContent('');
    toast.success(language === 'pl' ? 'Treść została dodana!' : 'Content added!');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Krok {currentStep} z 7</p>
        </div>

        {/* Steps Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1 min-w-0">
                  {/* Step Circle and Label */}
                  <button
                    onClick={() => {
                      // Allow navigation to current step or completed steps
                      if (step.number <= currentStep) {
                        setCurrentStep(step.number);
                      }
                    }}
                    disabled={step.number > currentStep}
                    className={`flex flex-col items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#0F1229] rounded-lg p-2 -m-2 transition-all ${
                      step.number <= currentStep ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-60'
                    }`}
                    aria-label={`${step.number <= currentStep ? 'Przejdź do' : ''} ${step.title}`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted ? 'bg-[#00B67A] text-white' :
                      isActive ? 'bg-[#00B67A]/20 text-[#00B67A] border-2 border-[#00B67A]' :
                      theme === 'dark' ? 'bg-[#1A1D3A] text-gray-300 border-2 border-gray-600' : 'bg-gray-200 text-gray-500 border-2 border-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>
                    <p className={`text-xs mt-2 text-center leading-tight max-w-[80px] ${
                      isActive
                        ? theme === 'dark' ? 'text-white font-medium' : 'text-gray-900 font-medium'
                        : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </p>
                  </button>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 flex items-center px-2 sm:px-4 min-w-[20px]">
                      <div className={`w-full h-0.5 transition-all ${
                        isCompleted ? 'bg-[#00B67A]' : 'bg-gray-600'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card 
          theme={theme}
          padding="lg"
          className={`mb-6 min-h-[400px] ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
              : 'shadow-sm'
          }`}
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.step1}</h2>
              
              {/* Document Title */}
              <div>
                <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.documentTitle} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="np. Nowa polityka urlopowa"
                  required
                  fullWidth
                  theme={theme}
                  className={theme === 'dark' ? 'bg-[#0F1229] border-[#00B67A]/30' : ''}
                />
              </div>
              
              {/* Team Selection - Multi-select */}
              

              {/* Recipients Selection */}
              <div>
                <label className={`text-sm mb-2 block ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>{t.selectTeam}</label>
                <p className={`text-xs mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>Możesz wybrać więcej niż jeden zespół. "Ogólny" wysyła do wszystkich zespołów. Opcjonalnie możesz wybrać konkretne osoby do wysyłki.</p>
                
                <TeamRecipientsSelector
                  selectedTeams={formData.teams}
                  onTeamsChange={(teams) => setFormData({ ...formData, teams })}
                  selectedRecipients={formData.recipients}
                  onRecipientsChange={(recipients) => setFormData({ ...formData, recipients })}
                  language={language}
                  theme={theme}
                />
              </div>
              
              {/* Requires Approval */}
              <div className={`border rounded-lg p-4 ${
                theme === 'dark'
                  ? 'bg-[#0F1229] border-[#00B67A]/20'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div 
                    onClick={() => setFormData({ ...formData, requiresApproval: !formData.requiresApproval })}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFormData({ ...formData, requiresApproval: !formData.requiresApproval });
                      }
                    }}
                    className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                      formData.requiresApproval
                        ? 'border-[#00B67A] bg-transparent hover:bg-[rgba(0,182,122,0.1)]'
                        : 'border-[#6B7280] bg-transparent hover:border-[rgba(0,182,122,0.4)] hover:bg-[rgba(0,182,122,0.1)]'
                    }`}
                  >
                    {formData.requiresApproval && (
                      <svg className="w-3 h-3 text-[#00B67A]" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.requiresApproval}</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Dokument zostanie wysłany do akceptacji przełożonego przed publikacją</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Treść Komunikatu</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAIGenerator(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-4 py-2 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Generuj Treść AI</span>
                  </button>
                  <button
                    onClick={() => toast.success(language === 'pl' ? 'Sprawdzanie pisowni...' : 'Checking spelling...')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[8px] transition-all border focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                      theme === 'dark'
                        ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white border-[#00B67A]/30'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Sprawdź Pisownię</span>
                  </button>
                  <button
                    onClick={() => setShowTemplateImport(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-4 py-2 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Importuj Szablon</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Treść</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={t.writeContent}
                  rows={12}
                  fullWidth
                  theme={theme}
                  className={theme === 'dark' ? 'bg-[#0F1229] border-[#00B67A]/30' : ''}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.step3}</h2>
              <div className="border-2 border-dashed border-[#00B67A]/30 rounded-xl p-12 text-center hover:border-[#00B67A] transition-all cursor-pointer">
                <Paperclip className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
                <p className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.uploadFiles}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>PDF, DOCX, PNG, JPG (max 10MB)</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.step4}</h2>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t.selectChannels}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['Email', 'Intranet', 'Release Notes', 'Presentation'].map(channel => (
                  <label
                    key={channel}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#00B67A] transition-all ${
                      theme === 'dark'
                        ? 'bg-[#0F1229] border-[#00B67A]/30'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <CustomCheckbox
                      checked={formData.channels.includes(channel)}
                      onChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, channels: [...formData.channels, channel] });
                        } else {
                          setFormData({ ...formData, channels: formData.channels.filter(c => c !== channel) });
                        }
                      }}
                    />
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{channel}</span>
                  </label>
                ))}
                
                {/* Social Media Channel */}
                <label
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.channels.includes('Social Media') 
                      ? 'border-[#00B67A] bg-[#00B67A]/10' 
                      : theme === 'dark'
                        ? 'bg-[#0F1229] border-[#00B67A]/30 hover:border-[#00B67A]'
                        : 'bg-white border-gray-300 hover:border-[#00B67A]'
                  }`}
                >
                  <CustomCheckbox
                    checked={formData.channels.includes('Social Media')}
                    onChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, channels: [...formData.channels, 'Social Media'] });
                      } else {
                        setFormData({ 
                          ...formData, 
                          channels: formData.channels.filter(c => c !== 'Social Media'),
                          socialPlatforms: []
                        });
                      }
                    }}
                  />
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{t.socialMedia}</span>
                </label>
              </div>

              {/* Social Media Platforms - Only show when Social Media is selected */}
              {formData.channels.includes('Social Media') && (
                <div className={`border rounded-xl p-6 ${
                  theme === 'dark'
                    ? 'bg-[#0F1229] border-[#00B67A]/30'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.selectPlatforms}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {['LinkedIn', 'Facebook', 'Instagram'].map(platform => (
                      <label
                        key={platform}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.socialPlatforms.includes(platform)
                            ? 'border-[#00B67A] bg-[#00B67A]/10'
                            : theme === 'dark'
                              ? 'border-[#00B67A]/20 hover:border-[#00B67A]'
                              : 'border-gray-300 hover:border-[#00B67A]'
                        }`}
                      >
                        <input 
                          type="checkbox"
                          checked={formData.socialPlatforms.includes(platform)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, socialPlatforms: [...formData.socialPlatforms, platform] });
                            } else {
                              setFormData({ ...formData, socialPlatforms: formData.socialPlatforms.filter(p => p !== platform) });
                            }
                          }}
                          className="w-5 h-5"
                        />
                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.step5}</h2>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>{t.configureChannels}</p>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}>{t.configureChannelsDesc}</p>
              {formData.channels.length > 0 ? (
                <div className="space-y-4">
                  {formData.channels.map(channel => (
                    <ChannelConfigPanel
                      key={channel}
                      channel={channel}
                      config={channelConfigs[channel] || { useDefaults: true }}
                      onChange={(newConfig) => {
                        setChannelConfigs({ ...channelConfigs, [channel]: newConfig });
                      }}
                      language={language}
                      theme={theme}
                      documentTitle={formData.title}
                      documentTeam={formData.teams[0]}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                  <p className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}>{t.noChannelsSelected}</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <h2 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.step6}</h2>
              <div className="space-y-4">
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                }`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Tytuł:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{formData.title || '—'}</span>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                }`}>
                  <span className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Odbiorcy:</span>
                  <div className="flex flex-wrap gap-2">
                    {/* Display teams */}
                    {formData.teams.map(team => {
                      // Check if all people from this team are selected in recipients
                      const teamPeopleIds = allPeople.filter(p => p.team === team).map(p => p.id);
                      const allTeamMembersSelected = teamPeopleIds.length > 0 && 
                        teamPeopleIds.every(id => formData.recipients.includes(id));
                      
                      // Only show team badge if all members are selected or no specific recipients from this team
                      const hasSpecificRecipientsFromTeam = formData.recipients.some(recipientId => {
                        const person = allPeople.find(p => p.id === recipientId);
                        return person?.team === team;
                      });
                      
                      // Show team badge if: all members selected OR no specific recipients at all OR no recipients from this team
                      if (allTeamMembersSelected || formData.recipients.length === 0 || !hasSpecificRecipientsFromTeam) {
                        const getTeamBadgeClass = (teamName: string) => {
                          const baseClasses = 'bg-blue-500/20 border-blue-500/30';
                          if (teamName === 'HR') {
                            return `bg-blue-500/20 border-blue-500/30 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`;
                          } else if (teamName === 'Dział Prawny') {
                            return `bg-purple-500/20 border-purple-500/30 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`;
                          } else if (teamName === 'IT & Tech') {
                            return `bg-green-500/20 border-green-500/30 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`;
                          } else if (teamName === 'Marketing') {
                            return `bg-orange-500/20 border-orange-500/30 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`;
                          }
                          return `bg-gray-500/20 border-gray-500/30 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`;
                        };
                        
                        return (
                          <span 
                            key={team}
                            className={`px-3 py-1 rounded-full text-sm border ${getTeamBadgeClass(team)}`}
                          >
                            {team}
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Display individual recipients only if they're NOT part of a fully-selected team */}
                    {formData.recipients.length > 0 && formData.recipients.map(recipientId => {
                      const person = allPeople.find(p => p.id === recipientId);
                      if (!person) return null;
                      
                      // Check if this person's team has ALL members selected
                      const teamPeopleIds = allPeople.filter(p => p.team === person.team).map(p => p.id);
                      const allTeamMembersSelected = teamPeopleIds.every(id => formData.recipients.includes(id));
                      
                      // Only show individual name if NOT all team members are selected
                      if (!allTeamMembersSelected) {
                        return (
                          <span 
                            key={recipientId}
                            className="px-3 py-1 bg-[#00B67A]/10 border border-[#00B67A]/50 text-white rounded-full text-sm"
                          >
                            {person.name}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                }`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Długość treści:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{formData.content.length} znaków</span>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                }`}>
                  <span className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Kanały dystrybucji:</span>
                  {formData.channels.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.channels.map(channel => (
                        <span 
                          key={channel}
                          className="px-3 py-1 bg-[#00B67A]/20 border border-[#00B67A] text-[#00B67A] rounded-full text-sm"
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Nie wybrano kanałów</span>
                  )}
                </div>
                {formData.channels.includes('Social Media') && formData.socialPlatforms.length > 0 && (
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                  }`}>
                    <span className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Platformy social media:</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.socialPlatforms.map(platform => (
                        <span 
                          key={platform}
                          className={`px-3 py-1 bg-[#00B67A]/10 border border-[#00B67A]/50 rounded-full text-sm ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              {/* Document Title */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className={`text-3xl mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formData.title || 'Bez tytułu'}</h1>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1 rounded-full text-sm border ${
                      formData.teams[0] === 'HR' 
                        ? `bg-blue-500/20 border-blue-500/30 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}` :
                      formData.teams[0] === 'Dział Prawny' 
                        ? `bg-purple-500/20 border-purple-500/30 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}` :
                      formData.teams[0] === 'IT & Tech' 
                        ? `bg-green-500/20 border-green-500/30 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}` :
                      formData.teams[0] === 'Marketing' 
                        ? `bg-orange-500/20 border-orange-500/30 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}` :
                      `bg-gray-500/20 border-gray-500/30 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                    }`}>
                      {formData.teams[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className={`border rounded-xl p-6 ${
                theme === 'dark'
                  ? 'bg-[#0F1229] border-[#00B67A]/20'
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Treść dokumentu:</h3>
                <div className={`whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {formData.content || 'Brak treści'}
                </div>
              </div>

              {/* Distribution Channels */}
              {formData.channels.length > 0 && (
                <div className={`border rounded-xl p-6 ${
                  theme === 'dark'
                    ? 'bg-[#0F1229] border-[#00B67A]/20'
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.channels}:</h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.channels.map(channel => {
                      const getChannelIcon = () => {
                        switch(channel) {
                          case 'Email': return <Mail className="w-4 h-4" />;
                          case 'Intranet': return <Globe className="w-4 h-4" />;
                          case 'Presentation': return <Presentation className="w-4 h-4" />;
                          case 'Release Notes': return <FileText className="w-4 h-4" />;
                          case 'Social Media': return <Share2 className="w-4 h-4" />;
                          default: return null;
                        }
                      };
                      
                      return (
                        <div 
                          key={channel}
                          className="flex items-center gap-2 px-4 py-2 bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-lg text-[#00B67A]"
                        >
                          {getChannelIcon()}
                          <span>{channel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Social Media Platforms */}
              {formData.channels.includes('Social Media') && formData.socialPlatforms.length > 0 && (
                <div className={`border rounded-xl p-6 ${
                  theme === 'dark'
                    ? 'bg-[#0F1229] border-[#00B67A]/20'
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.platforms}:</h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.socialPlatforms.map(platform => {
                      const getPlatformIcon = () => {
                        switch(platform) {
                          case 'LinkedIn': return <Linkedin className="w-4 h-4" />;
                          case 'Facebook': return <Facebook className="w-4 h-4" />;
                          case 'Instagram': return <Instagram className="w-4 h-4" />;
                          default: return null;
                        }
                      };
                      
                      return (
                        <div 
                          key={platform}
                          className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
                            theme === 'dark'
                              ? 'bg-[#1A1D3A] border-[#00B67A]/20 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {getPlatformIcon()}
                          <span>{platform}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {currentStep < 7 ? (
            <div className="flex items-center justify-between w-full">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="group h-[48px] relative rounded-[8px] shrink-0 px-6 transition-all hover:bg-[#212121]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2 dark:hover:bg-white/10"
                >
                  <div className="absolute border border-[#555555] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors group-active:border-[#212121] dark:border-[#d1d5dc] dark:group-active:border-white" />
                  <div className="flex items-center justify-center gap-2 h-full">
                    <ChevronRight className="w-4 h-4 rotate-180 text-[#555555] transition-colors group-active:text-[#212121] dark:text-[#d1d5dc] dark:group-active:text-white" />
                    <span className="text-[16px] leading-[24px] tracking-[-0.3125px] text-[#555555] whitespace-nowrap transition-colors group-active:text-[#212121] dark:text-[#d1d5dc] dark:group-active:text-white">
                      {t.back}
                    </span>
                  </div>
                </button>
              ) : (
                <div />
              )}
              <Button
                variant="primary"
                size="md"
                theme="dark"
                onClick={handleNext}
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {t.next}
              </Button>
            </div>
          ) : (
            // Step 7 - Final actions
            <div className="flex items-center justify-between w-full">
              {/* Left buttons group */}
              <div className="flex gap-[24px] bg-[rgba(183,183,183,0)]">
                {/* Wstecz - border only */}
                <button
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  disabled={currentStep === 1}
                  aria-label={t.back}
                  className="group h-[48px] relative rounded-[8px] shrink-0 px-6 transition-all hover:bg-[#212121]/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute border border-[#555555] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors group-active:border-[#212121] dark:border-[#a8b0bf] dark:group-active:border-white" />
                  <div className="flex items-center justify-center gap-2 h-full">
                    <ChevronRight className="w-4 h-4 rotate-180 text-[#555555] transition-colors group-active:text-[#212121] dark:text-[#a8b0bf] dark:group-active:text-white" />
                    <span className="text-[16px] leading-[24px] tracking-[-0.3125px] text-[#555555] whitespace-nowrap transition-colors group-active:text-[#212121] dark:text-[#a8b0bf] dark:group-active:text-white">
                      {t.back}
                    </span>
                  </div>
                </button>

                {/* Anuluj - border only */}
                <button
                  onClick={onCancel}
                  aria-label={t.cancel}
                  className="group h-[48px] relative rounded-[8px] shrink-0 px-6 transition-all hover:bg-[#212121]/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2"
                >
                  <div className="absolute border border-[#555555] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors group-active:border-[#212121] dark:border-[#a8b0bf] dark:group-active:border-white" />
                  <span className="text-[16px] leading-[24px] tracking-[-0.3125px] text-[#555555] whitespace-nowrap transition-colors group-active:text-[#212121] dark:text-[#a8b0bf] dark:group-active:text-white">
                    {t.cancel}
                  </span>
                </button>
              </div>

              {/* Action buttons group */}
              <div className="flex gap-[24px]">
                {/* Save Draft - gray background */}
                <button
                  onClick={() => {
                    if (!formData.title.trim()) {
                      toast.error(language === 'pl' ? 'Tytuł dokumentu jest wymagany' : 'Document title is required');
                      return;
                    }
                    onSaveDraft?.({
                      title: formData.title,
                      teams: formData.teams,
                      recipients: formData.recipients,
                      content: formData.content,
                      channels: formData.channels,
                      socialPlatforms: formData.socialPlatforms
                    });
                  }}
                  className="bg-[rgba(74,85,101,0.5)] flex gap-[8px] h-[48px] items-center justify-center rounded-[8px] shrink-0 px-6 transition-all hover:bg-[rgba(74,85,101,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span className="font-medium text-[16px] leading-[24px] tracking-[-0.3125px] text-white whitespace-nowrap">
                    {t.saveDraft}
                  </span>
                </button>

                {/* Schedule Publication - purple background */}
                <button
                  onClick={() => {
                    if (!formData.title.trim()) {
                      toast.error(language === 'pl' ? 'Tytuł dokumentu jest wymagany' : 'Document title is required');
                      return;
                    }
                    onSchedule?.({
                      title: formData.title,
                      teams: formData.teams,
                      recipients: formData.recipients,
                      content: formData.content,
                      channels: formData.channels,
                      socialPlatforms: formData.socialPlatforms
                    });
                  }}
                  className="bg-[rgba(152,16,250,0.5)] flex gap-[8px] h-[48px] items-center justify-center rounded-[8px] shrink-0 px-6 transition-all hover:bg-[rgba(152,16,250,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                >
                  <CalendarClock className="w-4 h-4 text-white" />
                  <span className="font-medium text-[16px] leading-[24px] tracking-[-0.3125px] text-white whitespace-nowrap">
                    {t.schedulePublication}
                  </span>
                </button>

                {/* Publish Now / Send to Approval - green gradient */}
                <button
                  onClick={() => {
                    if (!formData.title.trim()) {
                      toast.error(language === 'pl' ? 'Tytuł dokumentu jest wymagany' : 'Document title is required');
                      return;
                    }
                    onComplete?.({
                      title: formData.title,
                      teams: formData.teams,
                      recipients: formData.recipients,
                      content: formData.content,
                      channels: formData.channels,
                      socialPlatforms: formData.socialPlatforms,
                      requiresApproval: formData.requiresApproval
                    });
                  }}
                  className="bg-gradient-to-b from-[#10b981] to-[#059669] flex gap-[8px] h-[48px] items-center justify-center rounded-[8px] shrink-0 px-6 transition-all hover:from-[#059669] hover:to-[#047857] hover:shadow-lg hover:shadow-[#10b981]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span className="font-medium text-[16px] leading-[24px] tracking-[-0.3125px] text-white whitespace-nowrap">
                    {formData.requiresApproval ? t.sendToApproval : t.publishNow}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Generator Modal */}
      {showAIGenerator && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50">
            <div className={`rounded-2xl max-w-3xl w-full p-8 relative ${
              theme === 'dark' ? 'bg-[#1A1D3A]' : 'bg-white'
            }`}>
              <button
                onClick={() => setShowAIGenerator(false)}
                className={`absolute top-6 right-6 transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className={`text-2xl mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Generuj Treść za pomocą AI</h2>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Wpisz temat lub wskazówki, aby wygenerować profesjonalną treść komunikatu dostosowaną do wybranego tonu wypowiedzi.
              </p>

              <div className="space-y-6">
                {/* Topic Input */}
                <div>
                  <label className={`mb-2 block ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Temat lub Wskazówki</label>
                  <textarea
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="np. Nowa polityka urlopowa, zwiększenie dni wolnych, elastyczne godziny pracy..."
                    className={`w-full h-32 border rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:border-transparent resize-none ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-[#1A1D3A] text-white placeholder-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                {/* Tone Selector */}
                <div>
                  <label className={`mb-2 block ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Ton Wypowiedzi</label>
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className={`w-full border rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:border-transparent ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-[#1A1D3A] text-white'
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    <option value="">Wybierz ton</option>
                    <option value="formal">Formalny</option>
                    <option value="friendly">Przyjazny</option>
                    <option value="professional">Profesjonalny</option>
                    <option value="casual">Swobodny</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowAIGenerator(false);
                    setRegenerationCount(0);
                  }}
                  disabled={isGenerating}
                  aria-label="Anuluj generowanie AI"
                  className="group h-[48px] relative rounded-[8px] shrink-0 px-6 transition-all hover:bg-[#212121]/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute border border-[#555555] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors group-active:border-[#212121] dark:border-[#a8b0bf] dark:group-active:border-white" />
                  <span className="text-[16px] leading-[24px] tracking-[-0.3125px] text-[#555555] whitespace-nowrap transition-colors group-active:text-[#212121] dark:text-[#a8b0bf] dark:group-active:text-white">
                    Anuluj
                  </span>
                </button>
                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generowanie...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generuj Treść
                    </>
                  )}
                </button>
              </div>
            </div>
        </div>
      )}

      {/* Generated Content Modal */}
      {generatedContent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50">
            <div className={`rounded-2xl max-w-3xl w-full p-8 relative ${
              theme === 'dark' ? 'bg-[#1A1D3A]' : 'bg-white'
            }`}>
              <button
                onClick={() => {
                  setGeneratedContent('');
                  setRegenerationCount(0);
                }}
                className={`absolute top-6 right-6 transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className={`text-2xl mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Wygenerowana Treść</h2>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Oto treść wygenerowana przez AI. Możesz ją użyć bezpośrednio lub dostosować według potrzeb.
              </p>

              <div className="space-y-6">
                {/* Generated Content */}
                <div>
                  <label className={`mb-2 block ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Treść</label>
                  <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className={`w-full h-64 border rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:border-transparent resize-none ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-[#1A1D3A] text-white placeholder-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={() => {
                    setGeneratedContent('');
                    setRegenerationCount(0);
                  }}
                  aria-label="Anuluj i zamknij"
                  className="group h-[48px] relative rounded-[8px] shrink-0 px-6 transition-all hover:bg-[#212121]/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2"
                >
                  <div className="absolute border border-[#555555] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors group-active:border-[#212121] dark:border-[#a8b0bf] dark:group-active:border-white" />
                  <span className="text-[16px] leading-[24px] tracking-[-0.3125px] text-[#555555] whitespace-nowrap transition-colors group-active:text-[#212121] dark:text-[#a8b0bf] dark:group-active:text-white">
                    Anuluj
                  </span>
                </button>
                <button
                  onClick={handleRegenerateContent}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Regeneruj Treść
                </button>
                <button
                  onClick={handleUseGeneratedContent}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Użyj Treści
                </button>
              </div>
            </div>
        </div>
      )}

      {/* Template Import Modal */}
      {showTemplateImport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50">
            <div className={`rounded-2xl max-w-3xl w-full p-8 relative ${
              theme === 'dark' ? 'bg-[#1A1D3A]' : 'bg-white'
            }`}>
              <button
                onClick={() => setShowTemplateImport(false)}
                className={`absolute top-6 right-6 transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className={`text-2xl mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Importuj Szablon</h2>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Wklej treść szablonu, aby ją użyć w dokumencie.
              </p>

              <div className="space-y-6">
                {/* Template Content */}
                <div>
                  <label className={`mb-2 block ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Treść Szablonu</label>
                  <textarea
                    value={templateContent}
                    onChange={(e) => setTemplateContent(e.target.value)}
                    placeholder="Wklej treść szablonu tutaj..."
                    className={`w-full h-64 border rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:border-transparent resize-none ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-[#1A1D3A] text-white placeholder-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowTemplateImport(false);
                    setTemplateContent('');
                  }}
                  aria-label="Anuluj import szablonu"
                  className="group h-[48px] relative rounded-[8px] shrink-0 px-6 transition-all hover:bg-[#212121]/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2"
                >
                  <div className="absolute border border-[#555555] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors group-active:border-[#212121] dark:border-[#a8b0bf] dark:group-active:border-white" />
                  <span className="text-[16px] leading-[24px] tracking-[-0.3125px] text-[#555555] whitespace-nowrap transition-colors group-active:text-[#212121] dark:text-[#a8b0bf] dark:group-active:text-white">
                    Anuluj
                  </span>
                </button>
                <button
                  onClick={handleImportTemplate}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all"
                >
                  <FileText className="w-5 h-5" />
                  Importuj Treść
                </button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}