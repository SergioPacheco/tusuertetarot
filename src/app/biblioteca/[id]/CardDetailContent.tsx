'use client';

import { use } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getCardById, allCards } from '@/data';
import { useI18n } from '@/lib/i18n';
import { getCardName, getCardSubtitle } from '@/data/card-names-i18n';
import { getCardKeywords } from '@/data/card-keywords-i18n';
import { useTranslatedCard } from '@/hooks/useTranslatedCard';
import { getCombinationText } from '@/data/combinations-i18n';
import { IconHeart, IconNatal, IconSpark, IconCard, IconMoon, IconPremium, IconSun } from '@/components/AurevaIcons';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function getCardImagePath(card: { arcana: string; suit: string; number: number }): string {
  if (card.arcana === 'major') {
    const names: Record<number, string> = {
      0: '00-fool', 1: '01-magician', 2: '02-high-priestess', 3: '03-empress',
      4: '04-emperor', 5: '05-hierophant', 6: '06-lovers', 7: '07-chariot',
      8: '08-justice', 9: '09-hermit', 10: '10-wheel', 11: '11-strength',
      12: '12-hanged-man', 13: '13-death', 14: '14-temperance', 15: '15-devil',
      16: '16-tower', 17: '17-star', 18: '18-moon', 19: '19-sun',
      20: '20-judgement', 21: '21-world',
    };
    return `/cards/major/${names[card.number]}.webp`;
  }
  const n = card.number;
  if (card.suit === 'pentacles') {
    if (n <= 10) return `/cards/pentacles/${String(n).padStart(2, '0')}_${String(n).padStart(2, '0')}.png`;
    if (n === 11) return '/cards/pentacles/page_02.png';
    if (n === 14) return '/cards/pentacles/king_02.png';
    return `/cards/pentacles/${n === 12 ? 'knight' : 'queen'}.jpg`;
  }
  const file = n <= 10 ? `${String(n).padStart(2, '0')}.jpg` : n === 11 ? 'page.jpg' : n === 12 ? 'knight.jpg' : n === 13 ? 'queen.jpg' : 'king.jpg';
  return `/cards/${card.suit}/${file}`;
}

export default function CardDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, locale } = useI18n();
  const card = getCardById(parseInt(id));
  const { content, isTranslating } = useTranslatedCard(card || null, locale);

  if (!card) return notFound();

  const combinations = card.combinations.map((c) => ({
    ...c,
    card: allCards.find((ac) => ac.id === c.cardId),
  }));

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--cream)]/50">
        <Link href="/biblioteca" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1">
          <ArrowLeft size={12} /> {t('nav.cards')}
        </Link>
        <span className="text-[var(--gold)]">✦</span>
        <span className="text-[var(--cream)]/70">{getCardName(card, locale)}</span>
      </nav>

      {/* Hero: imagem + info */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start">
        <div className="mx-auto sm:mx-0">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] border border-[var(--gold-line)] w-[200px] sm:w-[240px] md:w-[280px]" style={{ aspectRatio: '520/910' }}>
            <div className="absolute inset-[-12%] bg-[radial-gradient(circle,rgba(232,184,82,0.08),transparent_62%)] blur-[40px] -z-10" />
            <Image
              src={getCardImagePath(card)}
              alt={getCardName(card, locale)}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
              priority
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-[var(--gold-light)]">
              {getCardSubtitle(card, locale)}
            </p>
            <h1 className="text-2xl font-bold text-[var(--cream)] mt-1">{getCardName(card, locale)}</h1>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {getCardKeywords(card, locale).map((kw) => (
              <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-[var(--violet)]/60 text-[var(--gold-light)] border border-[var(--gold-line-soft)]">
                {kw}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[var(--gold)]">↑</span>
                <h3 className="text-sm font-bold text-[var(--cream)]">{t('card.general')}</h3>
              </div>
              {isTranslating ? (
                <p className="text-sm text-[var(--cream)]/50 animate-pulse">✦ ✦ ✦</p>
              ) : (
                <p className="text-sm text-[var(--cream)]/80 leading-relaxed">{content?.general}</p>
              )}
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[var(--mystic-red)]">↓</span>
                <h3 className="text-sm font-bold text-[var(--cream)]">{t('card.reversed')}</h3>
              </div>
              {isTranslating ? (
                <p className="text-sm text-[var(--cream)]/50 animate-pulse">✦ ✦ ✦</p>
              ) : (
                <p className="text-sm text-[var(--cream)]/80 leading-relaxed">{content?.reversed_general}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid: Love, Work, Money */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <InfoCard icon={<IconHeart size={22} />} title={t('card.love')} text={content?.love || ''} loading={isTranslating} />
        <InfoCard icon={<IconNatal size={22} />} title={t('card.work')} text={content?.work || ''} loading={isTranslating} />
        <InfoCard icon={<IconPremium size={22} />} title={t('card.money')} text={content?.money || ''} loading={isTranslating} />
      </div>

      <div className="space-y-3">
        <BlockCard icon={<IconSpark size={18} />} title={t('card.spirituality')} text={content?.spirituality || ''} loading={isTranslating} />
        <BlockCard icon={<IconMoon size={18} />} title={t('card.advice')} text={content?.advice || ''} accent loading={isTranslating} />
        <BlockCard icon={<IconSun size={18} />} title={t('card.warning')} text={content?.warning || ''} warning loading={isTranslating} />
      </div>

      {/* Reversed details */}
      <div className="glass-card rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <IconCard size={18} />
          <h2 className="text-sm font-bold text-[var(--cream)]">{t('card.reversed')} — {t('card.love')} & {t('card.work')}</h2>
        </div>
        {isTranslating ? (
          <p className="text-sm text-[var(--cream)]/50 animate-pulse">✦ ✦ ✦</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[var(--cream)]/75">
            <div>
              <p className="text-xs text-[var(--gold)] font-medium mb-1">{t('card.love')}</p>
              <p>{content?.reversed_love}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--gold)] font-medium mb-1">{t('card.work')}</p>
              <p>{content?.reversed_work}</p>
            </div>
          </div>
        )}
      </div>

      {/* Combinations */}
      {combinations.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-[var(--gold)]">{t('card.combinations')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {combinations.map((comb) => (
              <Link key={comb.cardId} href={`/biblioteca/${comb.cardId}`} className="glass-card rounded-xl p-3 hover:card-glow transition-all group">
                <p className="text-xs text-[var(--gold)] font-medium group-hover:underline">+ {comb.card ? getCardName(comb.card, locale) : '?'}</p>
                <p className="text-xs text-[var(--cream)]/60 mt-1 leading-relaxed">{getCombinationText(card.id, comb.cardId, comb.meaning, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, title, text, loading }: { icon: React.ReactNode; title: string; text: string; loading?: boolean }) {
  return (
    <div className="glass-card rounded-xl p-4 hover:card-glow transition-all">
      <div className="text-[var(--gold)] mb-3">{icon}</div>
      <h3 className="text-xs font-bold text-[var(--gold)] uppercase tracking-wide mb-1.5">{title}</h3>
      {loading ? (
        <p className="text-sm text-[var(--cream)]/50 animate-pulse">✦ ✦ ✦</p>
      ) : (
        <p className="text-sm text-[var(--cream)]/70 leading-relaxed">{text}</p>
      )}
    </div>
  );
}

function BlockCard({ icon, title, text, accent, warning, loading }: { icon: React.ReactNode; title: string; text: string; accent?: boolean; warning?: boolean; loading?: boolean }) {
  const borderColor = warning ? 'border-[var(--mystic-red)]/30' : accent ? 'border-[var(--gold)]/30' : 'border-[var(--gold-line-soft)]';
  const iconColor = warning ? 'text-[var(--mystic-red)]' : 'text-[var(--gold)]';
  const titleColor = warning ? 'text-[var(--mystic-red)]' : accent ? 'text-[var(--gold)]' : 'text-[var(--cream)]';
  return (
    <div className={`glass-card rounded-xl p-4 border ${borderColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={iconColor}>{icon}</span>
        <h3 className={`text-sm font-bold ${titleColor}`}>{title}</h3>
      </div>
      {loading ? (
        <p className="text-sm text-[var(--cream)]/50 animate-pulse">✦ ✦ ✦</p>
      ) : (
        <p className="text-sm text-[var(--cream)]/80 leading-relaxed">{text}</p>
      )}
    </div>
  );
}
