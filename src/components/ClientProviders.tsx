'use client';

import { I18nProvider } from '@/lib/i18n';
import { BottomNav } from '@/components/BottomNav';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      {children}
      <BottomNav />
    </I18nProvider>
  );
}
