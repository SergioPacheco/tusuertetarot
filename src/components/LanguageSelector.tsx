'use client';

import { useI18n, Locale, localeFlags } from '@/lib/i18n';

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  const locales: Locale[] = ['es', 'en', 'pt'];

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`text-lg px-1.5 py-0.5 rounded-md transition-all ${
            locale === loc
              ? 'bg-[var(--gold)]/20 scale-110 ring-1 ring-[var(--gold)]/50'
              : 'opacity-50 hover:opacity-80 hover:scale-105'
          }`}
        >
          {localeFlags[loc]}
        </button>
      ))}
    </div>
  );
}
