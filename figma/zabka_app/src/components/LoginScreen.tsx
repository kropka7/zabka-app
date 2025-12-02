import { useState } from 'react';
import { Mail, Lock, ArrowRight, Sun, Moon } from 'lucide-react';
import { Language, Theme } from '../App';
import { Button, Card, Input } from './ui';

interface LoginScreenProps {
  onLogin: () => void;
  language: Language;
  theme: Theme;
  onToggleLanguage?: () => void;
  onToggleTheme?: () => void;
  onResetPassword?: () => void;
}

export function LoginScreen({ onLogin, language, theme, onToggleLanguage, onToggleTheme, onResetPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const translations = {
    pl: {
      welcome: 'Witaj w TeamMessage',
      subtitle: 'Zarządzaj komunikacją w zespole w jednym miejscu',
      email: 'Email',
      password: 'Hasło',
      login: 'Zaloguj się',
      demo: 'Użyj demo: demo@zabka.pl / demo123',
      forgotPassword: 'Zapomniałeś hasła?'
    },
    en: {
      welcome: 'Welcome to TeamMessage',
      subtitle: 'Manage team communication in one place',
      email: 'Email',
      password: 'Password',
      login: 'Sign in',
      demo: 'Use demo: demo@zabka.pl / demo123',
      forgotPassword: 'Forgot password?'
    }
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#1F2937]'
        : 'bg-gradient-to-br from-[#F9FAFB] via-[#FFFFFF] to-[#F3F4F6]'
    }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-[#10B981]/10' : 'bg-[#10B981]/5'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-[#059669]/10' : 'bg-[#059669]/5'
        }`}></div>
      </div>

      {/* Theme and Language toggles */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`p-3 rounded-[8px] flex items-center justify-center transition-all ${
              theme === 'dark'
                ? 'bg-[#374151] hover:bg-[#4B5563] text-white border border-[#4B5563]'
                : 'bg-white hover:bg-[#F3F4F6] text-gray-900 border border-[#E5E7EB] shadow-sm'
            }`}
            aria-label={`${language === 'pl' ? 'Przełącz na tryb' : 'Switch to'} ${theme === 'light' ? (language === 'pl' ? 'ciemny' : 'dark') : (language === 'pl' ? 'jasny' : 'light')}`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}
      </div>

      <div className="relative w-full max-w-md">
        <div className={`rounded-3xl p-8 md:p-10 shadow-2xl ${
          theme === 'dark'
            ? 'bg-[#1F2937]/90 backdrop-blur-xl border border-[#374151]'
            : 'bg-white/90 backdrop-blur-xl border border-[#E5E7EB]'
        }`}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg shadow-[#10B981]/30">
              <span className="text-white text-3xl font-semibold">TM</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className={`text-2xl mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.welcome}</h1>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{t.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t.email}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                placeholder="Wpisz email"
                required
                fullWidth
                theme={theme}
                className={theme === 'dark' ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F9FAFB] border-[#D1D5DB]'}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={`block text-sm mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t.password}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                placeholder="Wpisz hasło"
                required
                fullWidth
                theme={theme}
                className={theme === 'dark' ? 'bg-[#374151] border-[#4B5563]' : 'bg-[#F9FAFB] border-[#D1D5DB]'}
              />
            </div>

            {/* Forgot password */}
            {onResetPassword && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={onResetPassword}
                  className="text-[#059669] hover:text-[#047857] text-sm transition-colors"
                >
                  {t.forgotPassword}
                </button>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              theme={theme}
              iconPosition="right"
              icon={<ArrowRight className="w-5 h-5" />}
              fullWidth
              className="rounded-[8px]"
            >
              {t.login}
            </Button>

            {/* Demo credentials */}
            <p className={`text-xs text-center mt-4 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {t.demo}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
