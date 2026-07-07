'use client';

import { TarotCard } from '@/data/types';
import { Locale } from '@/lib/i18n';
import { getCardMeanings } from '@/data/card-meanings-i18n';

interface TranslatedContent {
  general: string;
  love: string;
  work: string;
  money: string;
  spirituality: string;
  advice: string;
  warning: string;
  reversed_general: string;
  reversed_love: string;
  reversed_work: string;
}

/**
 * Retorna o conteúdo traduzido de uma carta — SEM IA.
 * Usa traduções fixas pré-definidas. Se não houver tradução, retorna o original (espanhol).
 */
export function useTranslatedCard(card: TarotCard | null, locale: Locale): { content: TranslatedContent | null; isTranslating: boolean } {
  if (!card) return { content: null, isTranslating: false };

  // Tentar obter tradução fixa
  const translated = getCardMeanings(card.id, locale);

  if (translated) {
    return { content: translated, isTranslating: false };
  }

  // Fallback: usar dados originais em espanhol
  return {
    content: {
      general: card.meaning.general,
      love: card.meaning.love,
      work: card.meaning.work,
      money: card.meaning.money,
      spirituality: card.meaning.spirituality,
      advice: card.meaning.advice,
      warning: card.meaning.warning,
      reversed_general: card.reversed.general,
      reversed_love: card.reversed.love,
      reversed_work: card.reversed.work,
    },
    isTranslating: false,
  };
}
