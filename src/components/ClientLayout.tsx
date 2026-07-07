'use client';

import { Suspense } from 'react';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { BottomNav } from '@/components/BottomNav';
import { Header } from '@/components/Header';
import { Onboarding } from '@/components/Onboarding';
import { PageTransition } from '@/components/PageTransition';
import { Analytics } from '@/components/Analytics';

function LayoutInner({ children }: { children: React.ReactNode }) {
  useI18n();

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-app mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 w-full">
        <PageTransition>{children}</PageTransition>
      </main>
      {/* BottomNav só no mobile */}
      <div className="md:hidden">
        <BottomNav />
      </div>
      {/* Onboarding para primeira visita */}
      <Onboarding />
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <LayoutInner>{children}</LayoutInner>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </I18nProvider>
  );
}
