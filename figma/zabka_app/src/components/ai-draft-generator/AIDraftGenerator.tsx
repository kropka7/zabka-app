import { useState } from 'react';
import { Language } from '../../App';
import { Upload, FileText, X, Sparkles, Loader2, Eye, Copy, Download, RotateCcw, CheckCircle, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DraftVersion {
  id: string;
  type: 'summary' | 'executive' | 'intranet' | 'email' | 'release';
  content: string;
  label: string;
  color: string;
  icon: string;
}

interface AIDraftGeneratorProps {
  language: Language;
  theme?: 'light' | 'dark';
  onToggleLanguage?: () => void;
  onUseDraft?: () => void;
}

export function AIDraftGenerator({ language, theme = 'dark', onToggleLanguage, onUseDraft }: AIDraftGeneratorProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [drafts, setDrafts] = useState<DraftVersion[]>([]);
  const [previewDraft, setPreviewDraft] = useState<DraftVersion | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const translations = {
    pl: {
      title: 'Generator AI Wersji Dokumentu',
      description: 'Prześlij dokument i wygeneruj automatycznie 5 wersji komunikacji dostosowanych do różnych kanałów.',
      uploadTitle: 'Prześlij dokument źródłowy',
      dragDrop: 'Przeciągnij i upuść plik tutaj',
      or: 'lub',
      browse: 'wybierz plik',
      supportedFormats: 'Wspierane formaty: PDF, DOCX, TXT',
      remove: 'Usuń',
      generateAll: 'Generuj wszystkie wersje',
      processing: 'AI analizuje dokument...',
      processingDesc: 'Tworzenie wersji dla różnych kanałów komunikacji',
      draftsReady: 'Wersje gotowe do użycia',
      preview: 'Podgląd',
      copy: 'Kopiuj',
      export: 'Eksportuj',
      regenerate: 'Regeneruj',
      copied: 'Skopiowano do schowka!',
      exported: 'Wyeksportowano plik!',
      regenerated: 'Wersja została wygenerowana ponownie!',
      close: 'Zamknij',
      types: {
        summary: 'Streszczenie',
        executive: 'Wersja dla kadry',
        intranet: 'Wpis intranetowy',
        email: 'E-mail',
        release: 'Release Notes'
      }
    },
    en: {
      title: 'AI Draft Generator',
      description: 'Upload a document and automatically generate 5 versions of communication tailored to different channels.',
      uploadTitle: 'Upload source document',
      dragDrop: 'Drag and drop file here',
      or: 'or',
      browse: 'browse files',
      supportedFormats: 'Supported formats: PDF, DOCX, TXT',
      remove: 'Remove',
      generateAll: 'Generate All Drafts',
      processing: 'AI is analyzing document...',
      processingDesc: 'Creating versions for different communication channels',
      draftsReady: 'Drafts ready to use',
      preview: 'Preview',
      copy: 'Copy',
      export: 'Export',
      regenerate: 'Regenerate',
      copied: 'Copied to clipboard!',
      exported: 'File exported!',
      regenerated: 'Version regenerated!',
      close: 'Close',
      types: {
        summary: 'Summary',
        executive: 'Executive Version',
        intranet: 'Intranet Post',
        email: 'Email',
        release: 'Release Notes'
      }
    }
  };

  const t = translations[language];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const readFileContent = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      setDrafts([]);
      readFileContent(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setDrafts([]);
      readFileContent(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setDrafts([]);
    setFileContent('');
  };

  const generateSummary = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const firstSentences = sentences.slice(0, 3).join('. ') + '.';
    
    const keyPoints = sentences
      .slice(0, 5)
      .map(s => s.trim())
      .filter(s => s.length > 20)
      .slice(0, 4);
    
    if (language === 'pl') {
      return `Krótkie podsumowanie:\n\n${firstSentences}\n\nKluczowe punkty:\n${keyPoints.map(p => `• ${p}`).join('\n')}`;
    } else {
      return `Brief Summary:\n\n${firstSentences}\n\nKey Points:\n${keyPoints.map(p => `• ${p}`).join('\n')}`;
    }
  };

  const generateExecutive = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const mainContent = sentences.slice(0, 2).join('. ') + '.';
    
    if (language === 'pl') {
      return `Szanowni Państwo,\n\nMam przyjemność przedstawić następujące informacje:\n\n${mainContent}\n\nKluczowe aspekty:\n• ${sentences[0]?.trim() || 'Wdrożenie nowego rozwiązania'}\n• ${sentences[1]?.trim() || 'Poprawa efektywności procesów'}\n• ${sentences[2]?.trim() || 'Wsparcie dla zespołów'}\n\nDokument został przygotowany zgodnie z najwyższymi standardami i oczekuje Państwa decyzji.\n\nZ poważaniem,\nZespół Komunikacji`;
    } else {
      return `Dear Executives,\n\nI am pleased to present the following information:\n\n${mainContent}\n\nKey Aspects:\n• ${sentences[0]?.trim() || 'Implementation of new solution'}\n• ${sentences[1]?.trim() || 'Process efficiency improvement'}\n• ${sentences[2]?.trim() || 'Team support'}\n\nThe document has been prepared according to the highest standards and awaits your decision.\n\nBest regards,\nCommunication Team`;
    }
  };

  const generateIntranet = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const mainPoint = sentences[0]?.trim() || '';
    
    if (language === 'pl') {
      return `🎉 Ważna informacja!\n\nWitajcie!\n\n${mainPoint}.\n\n${sentences[1]?.trim() || 'Mamy dla Was istotne informacje'}.\n\nCo warto wiedzieć?\n✨ ${sentences[0]?.trim() || 'Nowe możliwości'}\n🚀 ${sentences[1]?.trim() || 'Usprawnienia procesów'}\n📊 ${sentences[2]?.trim() || 'Lepsze wyniki'}\n\nJak zacząć?\n1. Zapoznaj się z dokumentacją\n2. Skontaktuj się z zespołem\n3. Rozpocznij korzystanie!\n\nMacie pytania? Zespół zawsze służy pomocą!\n\n#NowośćWFirmie #WażnaInformacja #Komunikacja`;
    } else {
      return `🎉 Important News!\n\nHello everyone!\n\n${mainPoint}.\n\n${sentences[1]?.trim() || 'We have important information for you'}.\n\nWhat's worth knowing?\n✨ ${sentences[0]?.trim() || 'New opportunities'}\n🚀 ${sentences[1]?.trim() || 'Process improvements'}\n📊 ${sentences[2]?.trim() || 'Better results'}\n\nHow to start?\n1. Review the documentation\n2. Contact the team\n3. Start using it!\n\nQuestions? The team is always here to help!\n\n#CompanyNews #ImportantInfo #Communication`;
    }
  };

  const generateEmail = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const subject = sentences[0]?.trim().substring(0, 80) || '';
    
    if (language === 'pl') {
      return `Temat: ${subject}\n\nDzień dobry,\n\n${content.substring(0, 400)}${content.length > 400 ? '...' : ''}\n\nNajważniejsze informacje:\n• ${sentences[0]?.trim() || 'Główna informacja'}\n• ${sentences[1]?.trim() || 'Dodatkowe szczegóły'}\n• ${sentences[2]?.trim() || 'Dalsze kroki'}\n\nW razie pytań, proszę o kontakt.\n\nPozdrawiam,\nZespół Komunikacji`;
    } else {
      return `Subject: ${subject}\n\nHello,\n\n${content.substring(0, 400)}${content.length > 400 ? '...' : ''}\n\nKey Information:\n• ${sentences[0]?.trim() || 'Main information'}\n• ${sentences[1]?.trim() || 'Additional details'}\n• ${sentences[2]?.trim() || 'Next steps'}\n\nFor questions, please contact us.\n\nBest regards,\nCommunication Team`;
    }
  };

  const generateRelease = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const today = new Date().toISOString().split('T')[0];
    
    if (language === 'pl') {
      return `# Release Notes\n\n## 🎉 Zmiany i nowości\n\n### Główne informacje\n${sentences.slice(0, 3).map(s => `- ${s.trim()}`).join('\n')}\n\n### Szczegóły\n${content.substring(0, 300)}${content.length > 300 ? '...' : ''}\n\n### Kluczowe punkty\n${sentences.slice(0, 4).map((s, i) => `${i + 1}. ${s.trim()}`).join('\n')}\n\n## 📚 Dokumentacja\nPełna dokumentacja dostępna w intranecie\n\n---\nData: ${today}\nWersja: 1.0.0`;
    } else {
      return `# Release Notes\n\n## 🎉 Changes and Updates\n\n### Main Information\n${sentences.slice(0, 3).map(s => `- ${s.trim()}`).join('\n')}\n\n### Details\n${content.substring(0, 300)}${content.length > 300 ? '...' : ''}\n\n### Key Points\n${sentences.slice(0, 4).map((s, i) => `${i + 1}. ${s.trim()}`).join('\n')}\n\n## 📚 Documentation\nFull documentation available on intranet\n\n---\nDate: ${today}\nVersion: 1.0.0`;
    }
  };

  const generateAllDrafts = () => {
    if (!fileContent || fileContent.trim().length === 0) {
      toast.error(language === 'pl' ? 'Nie można odczytać pliku' : 'Cannot read file');
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const generatedDrafts: DraftVersion[] = [
        {
          id: '1',
          type: 'summary',
          label: t.types.summary,
          color: 'bg-blue-500',
          icon: '📝',
          content: generateSummary(fileContent)
        },
        {
          id: '2',
          type: 'executive',
          label: t.types.executive,
          color: 'bg-purple-500',
          icon: '👔',
          content: generateExecutive(fileContent)
        },
        {
          id: '3',
          type: 'intranet',
          label: t.types.intranet,
          color: 'bg-orange-500',
          icon: '🌐',
          content: generateIntranet(fileContent)
        },
        {
          id: '4',
          type: 'email',
          label: t.types.email,
          color: 'bg-green-500',
          icon: '📧',
          content: generateEmail(fileContent)
        },
        {
          id: '5',
          type: 'release',
          label: t.types.release,
          color: 'bg-pink-500',
          icon: '📋',
          content: generateRelease(fileContent)
        }
      ];

      setDrafts(generatedDrafts);
      setIsProcessing(false);
      toast.success(language === 'pl' ? 'Wersje wygenerowane!' : 'Versions generated!');
    }, 3000);
  };

  const handleCopy = (draft: DraftVersion) => {
    navigator.clipboard.writeText(draft.content)
      .then(() => {
        toast.success(t.copied);
      })
      .catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = draft.content;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success(t.copied);
        } catch (err) {
          toast.error(language === 'pl' ? 'Nie udało się skopiować' : 'Failed to copy');
        }
        document.body.removeChild(textArea);
      });
  };

  const handleExport = (draft: DraftVersion) => {
    const blob = new Blob([draft.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.type}-draft.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t.exported);
  };

  const handleRegenerate = (draftId: string) => {
    if (!fileContent) {
      toast.error(language === 'pl' ? 'Brak zawartości pliku' : 'No file content');
      return;
    }

    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;

    // Regenerate specific draft with slight variation
    let newContent = '';
    switch (draft.type) {
      case 'summary':
        newContent = generateSummary(fileContent);
        break;
      case 'executive':
        newContent = generateExecutive(fileContent);
        break;
      case 'intranet':
        newContent = generateIntranet(fileContent);
        break;
      case 'email':
        newContent = generateEmail(fileContent);
        break;
      case 'release':
        newContent = generateRelease(fileContent);
        break;
    }

    setDrafts(drafts.map(d => 
      d.id === draftId ? { ...d, content: newContent } : d
    ));
    
    toast.success(t.regenerated);
  };

  const handleUseTemplateInWizard = (draft: DraftVersion) => {
    if (onUseDraft) {
      onUseDraft();
    }
    toast.success(t.copied);
  };

  const handleDownloadDraft = (draft: DraftVersion) => {
    const blob = new Blob([draft.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.type}-draft.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t.exported);
  };

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(drafts.filter(draft => draft.id !== draftId));
    toast.success(t.regenerated);
  };

  return (
    <div className="p-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl mb-3 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Sparkles className="w-8 h-8 text-[#00B67A]" />
            {t.title}
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t.description}</p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <h2 className={`text-xl mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{t.uploadTitle}</h2>
          
          {!uploadedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-[#00B67A] bg-[#00B67A]/10'
                  : theme === 'dark'
                    ? 'border-[#00B67A]/30 bg-[#1A1D3A]/50'
                    : 'border-gray-300 bg-gray-50'
              }`}
            >
              <Upload className="w-16 h-16 text-[#00B67A] mx-auto mb-4" />
              <p className={`text-lg mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.dragDrop}
              </p>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t.or}{' '}
                <label className="text-[#00B67A] cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-[#00B67A] rounded">
                  {t.browse}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.docx,.doc,.txt"
                  />
                </label>
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}>{t.supportedFormats}</p>
            </div>
          ) : (
            <div className={`backdrop-blur-sm rounded-2xl p-6 border border-[#00B67A]/30 ${
              theme === 'dark' ? 'bg-[#1A1D3A]/50' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#00B67A]/20 rounded-[8px] flex items-center justify-center">
                    <FileText className="w-7 h-7 text-[#00B67A]" />
                  </div>
                  <div>
                    <p className={`text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{uploadedFile.name}</p>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className={`transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-[8px] p-2 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-red-400 focus:text-red-400' 
                      : 'text-gray-600 hover:text-red-600 focus:text-red-600'
                  }`}
                  aria-label={t.remove}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {drafts.length === 0 && !isProcessing && (
                <button
                  onClick={generateAllDrafts}
                  className="w-full bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-8 py-4 rounded-[8px] transition-all flex items-center justify-center gap-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A]"
                >
                  <Sparkles className="w-6 h-6" />
                  {t.generateAll}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className={`mb-8 rounded-2xl p-8 border border-[#00B67A]/30 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#1A1D3A] to-[#252840]'
              : 'bg-gradient-to-r from-white to-gray-50'
          }`}>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-[#00B67A] animate-spin" />
                <div className="absolute inset-0 blur-xl bg-[#00B67A]/30 rounded-full"></div>
              </div>
              <div>
                <h3 className={`text-xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{t.processing}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{t.processingDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* Drafts Grid */}
        {drafts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-[#00B67A]" />
              <h2 className={`text-2xl ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{t.draftsReady}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className={`rounded-2xl p-6 border border-[#00B67A]/30 hover:border-[#00B67A] transition-all group ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                      : 'bg-gradient-to-br from-white to-gray-50'
                  }`}
                >
                  {/* Draft Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{draft.icon}</span>
                    <div>
                      <h3 className={`text-lg ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{draft.label}</h3>
                      <div className={`h-1 w-16 ${draft.color} rounded-full mt-1`}></div>
                    </div>
                  </div>

                  {/* Draft Preview */}
                  <p className={`text-sm mb-6 line-clamp-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {draft.content}
                  </p>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewDraft(draft)}
                      className="bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{t.preview}</span>
                    </button>
                    <button
                      onClick={() => handleUseTemplateInWizard(draft)}
                      className={`px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 transition-all border focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                        theme === 'dark'
                          ? 'bg-[#1A1D3A] hover:bg-[#252840] text-gray-300 hover:text-white border-[#00B67A]/20 hover:border-[#00B67A]/40'
                          : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">{t.copy}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDraft(draft)}
                      className={`px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 transition-all border focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                        theme === 'dark'
                          ? 'bg-[#1A1D3A] hover:bg-[#252840] text-gray-300 hover:text-white border-[#00B67A]/20 hover:border-[#00B67A]/40'
                          : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm">{t.export}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className={`px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 transition-all border focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                        theme === 'dark'
                          ? 'bg-[#1A1D3A] hover:bg-[#252840] text-gray-300 hover:text-white border-[#00B67A]/20 hover:border-[#00B67A]/40'
                          : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-sm">{t.regenerate}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewDraft && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50">
            <div className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#00B67A]/30 shadow-2xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                : 'bg-gradient-to-br from-white to-gray-50'
            }`}>
              {/* Modal Header */}
              <div className="p-6 border-b border-[#00B67A]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{previewDraft.icon}</span>
                  <div>
                    <h3 className={`text-2xl ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{previewDraft.label}</h3>
                    <div className={`h-1 w-20 ${previewDraft.color} rounded-full mt-2`}></div>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDraft(null)}
                  className={`transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B67A] rounded-[8px] p-2 ${
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
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                <pre className={`whitespace-pre-wrap font-sans leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {previewDraft.content}
                </pre>
              </div>

              {/* Modal Actions */}
              <div className="p-6 border-t border-[#00B67A]/20 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleCopy(previewDraft)}
                  className={`px-6 py-3 rounded-[8px] flex items-center gap-2 transition-all border hover:border-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                    theme === 'dark'
                      ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white border-[#00B67A]/30'
                      : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-300'
                  }`}
                >
                  <Copy className="w-5 h-5" />
                  {t.copy}
                </button>
                <button
                  onClick={() => handleDownloadDraft(previewDraft)}
                  className="bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A]"
                >
                  <Download className="w-5 h-5" />
                  {t.export}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}