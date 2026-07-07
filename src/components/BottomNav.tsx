'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Sparkles, NotebookPen, GraduationCap } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: '/', icon: Home, label: t('nav.home') },
    { href: '/biblioteca', icon: BookOpen, label: t('nav.cards') },
    { href: '/tirada', icon: Sparkles, label: t('nav.reading') },
    { href: '/diario', icon: NotebookPen, label: t('nav.diary') },
    { href: '/estudio', icon: GraduationCap, label: t('nav.study') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-[rgba(201,168,76,0.2)] z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'text-[var(--gold)]'
                  : 'text-[var(--cream)]/60 hover:text-[var(--cream)]'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
