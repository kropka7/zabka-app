import { Language } from '../../App';
import { Settings as SettingsIcon, User, Bell, Globe, Shield, Palette } from 'lucide-react';
import { Button, Card } from '../ui';

interface SettingsProps {
  language: Language;
  theme?: 'light' | 'dark';
  onToggleLanguage?: () => void;
}

export function Settings({ language, theme = 'dark', onToggleLanguage }: SettingsProps) {
  const translations = {
    pl: {
      title: 'Ustawienia',
      description: 'Zarządzaj swoim kontem i preferencjami',
      profile: 'Profil',
      notifications: 'Powiadomienia',
      language: 'Język',
      security: 'Bezpieczeństwo',
      appearance: 'Wygląd',
      save: 'Zapisz zmiany'
    },
    en: {
      title: 'Settings',
      description: 'Manage your account and preferences',
      profile: 'Profile',
      notifications: 'Notifications',
      language: 'Language',
      security: 'Security',
      appearance: 'Appearance',
      save: 'Save changes'
    }
  };

  const t = translations[language];

  const sections = [
    { icon: User, title: t.profile, description: 'Zarządzaj swoimi danymi osobowymi' },
    { icon: Bell, title: t.notifications, description: 'Konfiguruj powiadomienia' },
    { icon: Globe, title: t.language, description: 'Zmień język aplikacji' },
    { icon: Shield, title: t.security, description: 'Bezpieczeństwo i prywatność' },
    { icon: Palette, title: t.appearance, description: 'Personalizacja wyglądu' }
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl mb-2 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <SettingsIcon className="w-8 h-8 text-[#00B67A]" />
            {t.title}
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{t.description}</p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                theme={theme}
                padding="lg"
                hover
                className={`cursor-pointer group ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
                    : 'bg-gradient-to-br from-white to-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00B67A]/20 rounded-xl flex items-center justify-center text-[#00B67A] group-hover:bg-[#00B67A]/30 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{section.title}</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{section.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8">
          <Button
            variant="primary"
            size="md"
            theme={theme}
          >
            {t.save}
          </Button>
        </div>
      </div>
    </div>
  );
}
