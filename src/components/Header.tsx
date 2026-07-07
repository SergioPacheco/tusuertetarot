'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n, Locale, localeFlags } from '@/lib/i18n';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: '/biblioteca', label: t('nav.cards') },
    { href: '/tirada', label: t('nav.reading') },
    { href: '/diario', label: t('nav.diary') },
    { href: '/estudio', label: t('nav.study') },
  ];

  const locales: { code: Locale; label: string }[] = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-dark">
      <div className="container-app mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-16">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Tu Suerte Tarot" className="w-9 h-9 md:w-10 md:h-10" />
          <span className="font-bold text-base md:text-lg text-[var(--cream)] hidden sm:inline font-[Cormorant_Garamond]">Tu Suerte Tarot</span>
        </Link>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm md:text-base font-medium transition-colors ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-[var(--gold)]'
                  : 'text-[var(--cream)]/60 hover:text-[var(--cream)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-[var(--cream)]/70 hover:text-[var(--cream)] transition-colors"
          >
            <Globe size={16} />
            <span className="text-base">{localeFlags[locale]}</span>
          </button>

          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-50 glass-card rounded-xl py-1.5 min-w-[150px] shadow-xl">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      setLocale(loc.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                      locale === loc.code
                        ? 'text-[var(--gold)]'
                        : 'text-[var(--cream)]/70 hover:text-[var(--cream)] hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{localeFlags[loc.code]}</span> {loc.label}
                    </span>
                    {locale === loc.code && <span className="text-[var(--gold)]">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
