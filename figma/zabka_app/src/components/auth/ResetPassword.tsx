import { useState } from 'react';
import { Language } from '../../App';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ResetPasswordProps {
  onBack: () => void;
  language: Language;
  theme?: 'light' | 'dark';
}

export function ResetPassword({ onBack, language, theme = 'dark' }: ResetPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translations = {
    pl: {
      title: 'Resetuj hasło',
      description: 'Podaj adres email, a wyślemy Ci link do zresetowania hasła',
      email: 'Adres email',
      emailPlaceholder: 'twoj.email@zabka.pl',
      send: 'Wyślij link',
      backToLogin: 'Wróć do logowania',
      successTitle: 'Email wysłany!',
      successMessage: 'Sprawdź swoją skrzynkę pocztową. Link do resetowania hasła jest ważny przez 1 godzinę.',
      backToLoginBtn: 'Wróć do logowania',
      invalidEmail: 'Podaj prawidłowy adres email'
    },
    en: {
      title: 'Reset Password',
      description: 'Enter your email and we will send you a link to reset your password',
      email: 'Email address',
      emailPlaceholder: 'your.email@zabka.pl',
      send: 'Send link',
      backToLogin: 'Back to login',
      successTitle: 'Email sent!',
      successMessage: 'Check your inbox. The password reset link is valid for 1 hour.',
      backToLoginBtn: 'Back to login',
      invalidEmail: 'Please enter a valid email'
    }
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error(t.invalidEmail);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success(t.successTitle);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#0F1229] via-[#1A1D3A] to-[#0F1229]'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-md w-full">
          {/* Success Card */}
          <div className={`rounded-2xl border border-[#00B67A]/30 p-8 text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
              : 'bg-white'
          }`}>
            {/* Success Icon */}
            <div className="w-16 h-16 bg-[#00B67A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#00B67A]" />
            </div>

            <h2 className={`text-2xl mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.successTitle}</h2>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{t.successMessage}</p>

            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A]"
            >
              {t.backToLoginBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-[#0F1229] via-[#1A1D3A] to-[#0F1229]'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00B67A] to-[#00A066] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>TeamMessage</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Żabka Internal Communications
          </p>
        </div>

        {/* Reset Form */}
        <div className={`rounded-2xl border border-[#00B67A]/30 p-8 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840]'
            : 'bg-white'
        }`}>
          <h2 className={`text-2xl mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{t.title}</h2>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>{t.description}</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className={`text-sm mb-2 block ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t.email}
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={`w-full border border-[#00B67A]/30 rounded-[8px] pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                    theme === 'dark'
                      ? 'bg-[#0F1229] text-white placeholder-gray-500'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-400'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2 focus:ring-offset-[#1A1D3A] mb-4"
            >
              {t.send}
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={onBack}
              className={`w-full flex items-center justify-center gap-2 transition-all ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToLogin}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}