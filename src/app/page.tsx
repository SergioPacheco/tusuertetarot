'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Info, BookOpen, GraduationCap } from 'lucide-react';
import { allCards } from '@/data';
import { TarotCard } from '@/data/types';
import { TarotCardDisplay, TarotCardBack } from '@/components/TarotCard';
import { useI18n } from '@/lib/i18n';
import { useTranslatedCard } from '@/hooks/useTranslatedCard';
import { getCardName } from '@/data/card-names-i18n';
import { getCardKeywords } from '@/data/card-keywords-i18n';
import Link from 'next/link';

function getDailyCard(): TarotCard {
  const today = new Date().toISOString().slice(0, 10);
  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0);
  const index = seed % allCards.length;
  return allCards[index];
}

export default function HomePage() {
  const { t, locale } = useI18n();
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const { content } = useTranslatedCard(dailyCard, locale);

  useEffect(() => {
    const card = getDailyCard();
    setDailyCard(card);
    const revealed = localStorage.getItem('dailyCardRevealed');
    const savedDate = localStorage.getItem('dailyCardDate');
    const today = new Date().toISOString().slice(0, 10);
    if (revealed === 'true' && savedDate === today) {
      setIsRevealed(true);
    }
  }, []);

  const revealCard = () => {
    setIsRevealed(true);
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('dailyCardRevealed', 'true');
    localStorage.setItem('dailyCardDate', today);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  if (!dailyCard) return (
    <div className="text-center py-20">
      <Sparkles size={32} className="mx-auto animate-pulse text-[var(--gold)]" />
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero */}
      <section className="text-center pt-6 space-y-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-4xl md:text-5xl font-bold animate-shimmer">{t('home.title')}</h1>
          <p className="text-base text-[var(--cream)]/50 mt-2">{t('home.subtitle')}</p>
        </motion.div>
      </section>

      {/* Daily Card */}
      <section className="space-y-5">
        <div className="flex items-center justify-center gap-2">
          <Star size={16} className="text-[var(--gold)] animate-mystic-pulse" />
          <h2 className="text-xl font-semibold text-[var(--gold)]">{t('home.daily')}</h2>
          <Star size={16} className="text-[var(--gold)] animate-mystic-pulse" />
        </div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div key="back" exit={{ rotateY: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="cursor-pointer card-hover-float" onClick={revealCard}>
                  <TarotCardBack size="lg" onClick={revealCard} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="front" initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.5, type: 'spring' }}>
                <Link href={`/biblioteca/${dailyCard.id}`} className="block animate-reveal-glow rounded-xl">
                  <TarotCardDisplay card={dailyCard} size="lg" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isRevealed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-5 space-y-4 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-[var(--cream)] text-center">{getCardName(dailyCard, locale)}</h3>
            <div className="flex flex-wrap justify-center gap-1.5">
              {getCardKeywords(dailyCard, locale).map((kw) => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold-line-soft)]">
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[var(--cream)]/85 text-center">{content?.general}</p>
            <div className="pt-3 border-t border-[var(--gold)]/10 text-center">
              <p className="text-xs text-[var(--gold)] font-medium">{t('home.advice')}</p>
              <p className="text-sm text-[var(--cream)]/75 mt-1">{content?.advice}</p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickAction href="/tirada" icon={<Sparkles size={22} />} title={t('home.newReading')} sub={t('home.newReading.sub')} />
        <QuickAction href="/biblioteca" icon={<BookOpen size={22} />} title={t('home.library')} sub={t('home.library.sub')} />
        <QuickAction href="/estudio" icon={<GraduationCap size={22} />} title={t('study.title')} sub={t('study.subtitle')} />
        <QuickAction href="/diario" icon={<Star size={22} />} title={t('diary.title')} sub={t('diary.subtitle')} />
      </section>

      {/* Disclaimer */}
      <section className="text-center pb-4">
        <button onClick={() => setShowDisclaimer(!showDisclaimer)} className="text-xs text-[var(--cream)]/30 flex items-center gap-1 mx-auto hover:text-[var(--cream)]/50">
          <Info size={12} /> {t('home.disclaimer')}
        </button>
        {showDisclaimer && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[var(--cream)]/30 mt-2 max-w-sm mx-auto">
            {t('home.disclaimer.text')}
          </motion.p>
        )}
      </section>
    </div>
  );
}

function QuickAction({ href, icon, title, sub }: { href: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <Link href={href} className="glass-card rounded-2xl p-4 text-center hover:card-glow transition-all group">
      <div className="text-[var(--gold)] mb-2 group-hover:scale-110 transition-transform inline-block">{icon}</div>
      <p className="text-sm font-semibold text-[var(--cream)]">{title}</p>
      <p className="text-xs text-[var(--cream)]/40 mt-0.5">{sub}</p>
    </Link>
  );
}
