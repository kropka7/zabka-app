import { Language } from '../../App';
import { Presentation, Upload, Download, Eye } from 'lucide-react';
import { Button, Card } from '../ui';

interface SlideDeckGeneratorProps {
  language: Language;
  theme?: 'light' | 'dark';
}

export function SlideDeckGenerator({ language, theme = 'dark' }: SlideDeckGeneratorProps) {
  const translations = {
    pl: {
      title: 'Generator Prezentacji',
      description: 'Automatycznie generuj slajdy z dokumentu',
      upload: 'Prześlij dokument',
      generate: 'Generuj prezentację',
      preview: 'Podgląd',
      download: 'Pobierz PPTX'
    },
    en: {
      title: 'SlideDeck Generator',
      description: 'Automatically generate slides from document',
      upload: 'Upload document',
      generate: 'Generate presentation',
      preview: 'Preview',
      download: 'Download PPTX'
    }
  };

  const t = translations[language];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Presentation className="w-8 h-8 text-[#00B67A]" />
            {t.title}
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            {t.description}
          </p>
        </div>

        <Card 
          theme={theme}
          padding="lg"
          className={theme === 'dark' ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]' : ''}
        >
          <div className="border-2 border-dashed border-[#00B67A]/30 rounded-xl p-12 text-center hover:border-[#00B67A] transition-all cursor-pointer mb-8">
            <Upload className={`w-12 h-12 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`} />
            <p className={`mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.upload}</p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>DOCX, PDF (max 10MB)</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              theme={theme}
              icon={<Presentation className="w-5 h-5" />}
              className="flex-1"
            >
              {t.generate}
            </Button>
            <Button
              variant="outline"
              size="md"
              theme={theme}
              icon={<Eye className="w-5 h-5" />}
              className={theme === 'dark' ? 'bg-[#1A1D3A] hover:bg-[#252840]' : ''}
            >
              {t.preview}
            </Button>
            <Button
              variant="outline"
              size="md"
              theme={theme}
              icon={<Download className="w-5 h-5" />}
              className={theme === 'dark' ? 'bg-[#1A1D3A] hover:bg-[#252840]' : ''}
            >
              {t.download}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
