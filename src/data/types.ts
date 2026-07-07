export type CardSuit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit: CardSuit;
  number: number;
  image: string;
  keywords: string[];
  meaning: {
    general: string;
    love: string;
    work: string;
    money: string;
    spirituality: string;
    advice: string;
    warning: string;
  };
  reversed: {
    general: string;
    love: string;
    work: string;
  };
  combinations: {
    cardId: number;
    meaning: string;
  }[];
}

export type SpreadType =
  | 'daily'
  | 'three-cards'
  | 'simple-cross'
  | 'celtic-cross'
  | 'love'
  | 'career'
  | 'decision'
  | 'free';

export interface SpreadPosition {
  id: number;
  name: string;
  description: string;
  x: number;
  y: number;
}

export interface Spread {
  id: SpreadType;
  name: string;
  description: string;
  numCards: number;
  positions: SpreadPosition[];
}

export interface Reading {
  id: string;
  date: string;
  spread: SpreadType;
  question?: string;
  cards: DrawnCard[];
  notes?: string;
  isFavorite: boolean;
}

export interface DrawnCard {
  cardId: number;
  position: number;
  isReversed: boolean;
}
