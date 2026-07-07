'use client';

import Image from 'next/image';
import { TarotCard } from '@/data/types';
import { useI18n } from '@/lib/i18n';
import { getCardName } from '@/data/card-names-i18n';

/**
 * Genera la ruta de imagen para cualquier carta del mazo (78 cartas).
 * Imágenes: Rider-Waite-Smith Tarot (1909), dominio público.
 */
function getCardImagePath(card: TarotCard): string {
  if (card.arcana === 'major') {
    const majorFiles: Record<number, string> = {
      0: '00-fool.webp', 1: '01-magician.webp', 2: '02-high-priestess.webp',
      3: '03-empress.webp', 4: '04-emperor.webp', 5: '05-hierophant.webp',
      6: '06-lovers.webp', 7: '07-chariot.webp', 8: '08-justice.webp',
      9: '09-hermit.webp', 10: '10-wheel.webp', 11: '11-strength.webp',
      12: '12-hanged-man.webp', 13: '13-death.webp', 14: '14-temperance.webp',
      15: '15-devil.webp', 16: '16-tower.webp', 17: '17-star.webp',
      18: '18-moon.webp', 19: '19-sun.webp', 20: '20-judgement.webp',
      21: '21-world.webp',
    };
    return `/cards/major/${majorFiles[card.number]}`;
  }

  const suitFolder = card.suit;
  let filename: string;

  // Pentacles têm PNGs novos
  if (card.suit === 'pentacles') {
    if (card.number <= 10) {
      filename = `${String(card.number).padStart(2, '0')}_${String(card.number).padStart(2, '0')}.png`;
    } else if (card.number === 11) {
      filename = 'page_02.png';
    } else if (card.number === 14) {
      filename = 'king_02.png';
    } else {
      filename = card.number === 12 ? 'knight.jpg' : 'queen.jpg';
    }
    return `/cards/pentacles/${filename}`;
  }

  if (card.number <= 10) {
    filename = `${String(card.number).padStart(2, '0')}.jpg`;
  } else if (card.number === 11) {
    filename = 'page.jpg';
  } else if (card.number === 12) {
    filename = 'knight.jpg';
  } else if (card.number === 13) {
    filename = 'queen.jpg';
  } else {
    filename = 'king.jpg';
  }
  return `/cards/${suitFolder}/${filename}`;
}

interface TarotCardDisplayProps {
  card: TarotCard;
  size?: 'sm' | 'md' | 'lg';
  isReversed?: boolean;
  showName?: boolean;
  className?: string;
}

export function TarotCardDisplay({ card, size = 'md', isReversed = false, showName = true, className = '' }: TarotCardDisplayProps) {
  const { locale } = useI18n();
  const imageSrc = getCardImagePath(card);
  const displayName = getCardName(card, locale);

  // Aspect ratio 2:3 (ancho:alto) — proporción estándar de cartas de tarot
  const sizes = {
    sm: { w: 96, h: 144 },
    md: { w: 128, h: 192 },
    lg: { w: 180, h: 270 },
  };

  const { w, h } = sizes[size];

  return (
    <div
      className={`rounded-xl border-2 border-[var(--gold)] overflow-hidden shadow-lg relative ${isReversed ? 'rotate-180' : ''} ${className}`}
      style={{ width: `${w}px`, height: `${h}px`, flexShrink: 0 }}
    >
      <Image
        src={imageSrc}
        alt={card.name}
        width={w}
        height={h}
        className="object-contain w-full h-full bg-[#1a0a2e]"
        sizes={`${w}px`}
      />
      {showName && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent ${isReversed ? 'rotate-180' : ''}`}
          style={{ padding: size === 'sm' ? '3px 4px' : '6px 8px' }}
        >
          <p className={`font-semibold text-center text-white leading-tight drop-shadow-lg ${size === 'sm' ? 'text-[0.55rem]' : size === 'md' ? 'text-xs' : 'text-xs'}`}>
            {displayName}
          </p>
        </div>
      )}
    </div>
  );
}

export function TarotCardBack({ size = 'md', onClick, className = '' }: { size?: 'sm' | 'md' | 'lg'; onClick?: () => void; className?: string }) {
  const sizes = {
    sm: { w: 96, h: 144 },
    md: { w: 128, h: 192 },
    lg: { w: 180, h: 270 },
  };

  const { w, h } = sizes[size];

  return (
    <div
      onClick={onClick}
      className={`tarot-card tarot-card-back flex items-center justify-center cursor-pointer group rounded-xl ${className}`}
      style={{ width: `${w}px`, height: `${h}px`, flexShrink: 0 }}
    >
      <div className="text-center">
        <span className="text-[var(--gold)] text-3xl block group-hover:animate-float">✦</span>
        {size !== 'sm' && (
          <p className="text-xs text-[var(--gold)]/60 mt-2">Toca para revelar</p>
        )}
      </div>
    </div>
  );
}
