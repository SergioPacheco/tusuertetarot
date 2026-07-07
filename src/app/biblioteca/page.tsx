'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { allCards } from '@/data';
import { CardSuit } from '@/data/types';
import { useI18n } from '@/lib/i18n';
import { getCardName, getCardSubtitle } from '@/data/card-names-i18n';
import { getCardKeywords } from '@/data/card-keywords-i18n';
import Image from 'next/image';
import Link from 'next/link';

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
  // Pentacles têm PNGs
  if (card.suit === 'pentacles') {
    if (n <= 10) return `/cards/pentacles/${String(n).padStart(2, '0')}_${String(n).padStart(2, '0')}.png`;
    if (n === 11) return '/cards/pentacles/page_02.png';
    if (n === 14) return '/cards/pentacles/king_02.png';
    return `/cards/pentacles/${n === 12 ? 'knight' : 'queen'}.jpg`;
  }
  const file = n <= 10 ? `${String(n).padStart(2, '0')}.jpg` : n === 11 ? 'page.jpg' : n === 12 ? 'knight.jpg' : n === 13 ? 'queen.jpg' : 'king.jpg';
  return `/cards/${card.suit}/${file}`;
}

const suitLabels: Record<string, Record<CardSuit, string>> = {
  es: { major: 'Arcanos Mayores', wands: 'Bastos', cups: 'Copas', swords: 'Espadas', pentacles: 'Oros' },
  en: { major: 'Major Arcana', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
  pt: { major: 'Arcanos Maiores', wands: 'Paus', cups: 'Copas', swords: 'Espadas', pentacles: 'Ouros' },
};

export default function BibliotecaPage() {
  const { t, locale } = useI18n();
  const [search, setSearch] = useState('');
  const [filterSuit, setFilterSuit] = useState<CardSuit | 'all'>('all');

  const labels = suitLabels[locale] || suitLabels.es;

  const filteredCards = useMemo(() => {
    let cards = allCards;
    if (filterSuit !== 'all') cards = cards.filter((c) => c.suit === filterSuit);
    if (search.trim()) {
      const q = search.toLowerCase();
      cards = cards.filter((c) => {
        const name = getCardName(c, locale).toLowerCase();
        return name.includes(q) || c.name.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q) || getCardKeywords(c, locale).some((k) => k.toLowerCase().includes(q));
      });
    }
    return cards;
  }, [search, filterSuit, locale]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-[3px] text-[var(--gold-light)]">✦ {t('library.subtitle')}</p>
        <h1 className="text-2xl font-bold text-[var(--cream)]">{t('library.title')}</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mx-auto">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cream)]/30" />
        <input
          type="text"
          placeholder={t('library.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--violet)]/60 border border-[var(--gold-line-soft)] text-sm text-[var(--cream)] placeholder-[var(--cream)]/30 focus:border-[var(--gold)]/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
        <FilterBtn active={filterSuit === 'all'} onClick={() => setFilterSuit('all')}>
          {t('library.all')}
        </FilterBtn>
        {(['major', 'wands', 'cups', 'swords', 'pentacles'] as CardSuit[]).map((suit) => (
          <FilterBtn key={suit} active={filterSuit === suit} onClick={() => setFilterSuit(suit)}>
            {labels[suit]}
          </FilterBtn>
        ))}
      </div>

      {/* Grid estilo Aureva */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <Link key={card.id} href={`/biblioteca/${card.id}`} className="group">
            <div className="flex flex-col gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
              {/* Card art */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--violet-mid)] to-[var(--night-deep)] shadow-[0_22px_44px_-26px_rgba(0,0,0,0.85)] border border-[var(--gold-line-soft)] transition-shadow duration-300 group-hover:shadow-[0_32px_60px_-22px_rgba(124,77,219,0.7)] group-hover:border-[var(--gold-line)]" style={{ aspectRatio: '520/910' }}>
                <Image
                  src={getCardImagePath(card)}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
                  loading="lazy"
                />
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(232,184,82,0.14)] pointer-events-none" />
              </div>
              {/* Caption */}
              <div className="text-center px-1">
                <p className="text-sm font-serif text-[var(--cream)] leading-tight">{getCardName(card, locale)}</p>
                <p className="text-[0.6rem] uppercase tracking-[1.5px] text-[var(--gold-light)] mt-0.5">
                  {getCardSubtitle(card, locale)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? 'bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/40'
          : 'text-[var(--cream)]/50 border border-transparent hover:text-[var(--cream)]/80 hover:border-[var(--gold-line-soft)]'
      }`}
    >
      {children}
    </button>
  );
}
