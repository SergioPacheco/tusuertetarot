'use client';

import { useState } from 'react';
import { TarotCard } from '@/data/types';
import { TarotCardDisplay } from '@/components/TarotCard';
import { useI18n } from '@/lib/i18n';
import { getCardName } from '@/data/card-names-i18n';

interface FlipCardProps {
  card: TarotCard;
  isReversed: boolean;
  isRevealed: boolean;
  onReveal: () => void;
  positionName: string;
  delay?: number;
}

export function FlipCard({ card, isReversed, isRevealed, onReveal, positionName, delay = 0 }: FlipCardProps) {
  const { locale } = useI18n();
  const [hasFlipped, setHasFlipped] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const handleClick = () => {
    if (isRevealed) return;
    onReveal();
    setHasFlipped(true);
    setShowSparkle(true);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Sparkle disappears after animation
    setTimeout(() => setShowSparkle(false), 800);
  };

  return (
    <div className="text-center animate-deal" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[0.6rem] text-[var(--gold)]/60 mb-1.5 truncate font-medium uppercase tracking-wide">
        {positionName}
      </p>
      <div className="flip-container relative" onClick={handleClick}>
        <div className={`flip-card ${isRevealed ? 'flipped' : ''}`} style={{ width: '96px', height: '144px' }}>
          {/* Back */}
          <div className="flip-card-front">
            <div className="tarot-card tarot-card-back w-full h-full flex items-center justify-center cursor-pointer group">
              <span className="text-[var(--gold)] text-xl group-hover:animate-float">✦</span>
            </div>
          </div>
          {/* Front */}
          <div className="flip-card-back">
            <div className={`w-full h-full ${hasFlipped ? 'animate-reveal-glow' : ''}`}>
              <TarotCardDisplay card={card} size="sm" isReversed={isReversed} showName={true} />
            </div>
          </div>
        </div>

        {/* Sparkle burst effect */}
        {showSparkle && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="sparkle-burst text-[var(--gold)]" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z"/>
            </svg>
          </div>
        )}
      </div>
      {isRevealed && (
        <p className="text-[0.55rem] text-[var(--cream)]/50 mt-1 truncate">
          {getCardName(card, locale)}{isReversed ? ' ↓' : ''}
        </p>
      )}
    </div>
  );
}
