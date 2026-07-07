import { Locale } from '@/lib/i18n';
import { TarotCard } from '@/data/types';

// Nomes traduzidos para os 22 Arcanos Maiores
const majorNames: Record<Locale, string[]> = {
  es: ['El Loco', 'El Mago', 'La Papisa', 'La Emperatriz', 'El Emperador', 'El Papa', 'Los Enamorados', 'El Carro', 'La Justicia', 'El Ermitaño', 'La Rueda de la Fortuna', 'La Fuerza', 'El Colgado', 'La Muerte', 'La Templanza', 'El Diablo', 'La Torre', 'La Estrella', 'La Luna', 'El Sol', 'El Juicio', 'El Mundo'],
  en: ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Justice', 'The Hermit', 'Wheel of Fortune', 'Strength', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'],
  pt: ['O Louco', 'O Mago', 'A Papisa', 'A Imperatriz', 'O Imperador', 'O Papa', 'Os Enamorados', 'O Carro', 'A Justiça', 'O Eremita', 'A Roda da Fortuna', 'A Força', 'O Enforcado', 'A Morte', 'A Temperança', 'O Diabo', 'A Torre', 'A Estrela', 'A Lua', 'O Sol', 'O Julgamento', 'O Mundo'],
};

// Nomes dos palos
const suitCardNames: Record<Locale, Record<string, { numbers: string[]; court: string[] }>> = {
  es: {
    wands: { numbers: ['As de Bastos', 'Dos de Bastos', 'Tres de Bastos', 'Cuatro de Bastos', 'Cinco de Bastos', 'Seis de Bastos', 'Siete de Bastos', 'Ocho de Bastos', 'Nueve de Bastos', 'Diez de Bastos'], court: ['Sota de Bastos', 'Caballero de Bastos', 'Reina de Bastos', 'Rey de Bastos'] },
    cups: { numbers: ['As de Copas', 'Dos de Copas', 'Tres de Copas', 'Cuatro de Copas', 'Cinco de Copas', 'Seis de Copas', 'Siete de Copas', 'Ocho de Copas', 'Nueve de Copas', 'Diez de Copas'], court: ['Sota de Copas', 'Caballero de Copas', 'Reina de Copas', 'Rey de Copas'] },
    swords: { numbers: ['As de Espadas', 'Dos de Espadas', 'Tres de Espadas', 'Cuatro de Espadas', 'Cinco de Espadas', 'Seis de Espadas', 'Siete de Espadas', 'Ocho de Espadas', 'Nueve de Espadas', 'Diez de Espadas'], court: ['Sota de Espadas', 'Caballero de Espadas', 'Reina de Espadas', 'Rey de Espadas'] },
    pentacles: { numbers: ['As de Oros', 'Dos de Oros', 'Tres de Oros', 'Cuatro de Oros', 'Cinco de Oros', 'Seis de Oros', 'Siete de Oros', 'Ocho de Oros', 'Nueve de Oros', 'Diez de Oros'], court: ['Sota de Oros', 'Caballero de Oros', 'Reina de Oros', 'Rey de Oros'] },
  },
  en: {
    wands: { numbers: ['Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands', 'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands'], court: ['Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands'] },
    cups: { numbers: ['Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups', 'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups'], court: ['Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups'] },
    swords: { numbers: ['Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords', 'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords'], court: ['Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords'] },
    pentacles: { numbers: ['Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles', 'Five of Pentacles', 'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles', 'Nine of Pentacles', 'Ten of Pentacles'], court: ['Page of Pentacles', 'Knight of Pentacles', 'Queen of Pentacles', 'King of Pentacles'] },
  },
  pt: {
    wands: { numbers: ['Ás de Paus', 'Dois de Paus', 'Três de Paus', 'Quatro de Paus', 'Cinco de Paus', 'Seis de Paus', 'Sete de Paus', 'Oito de Paus', 'Nove de Paus', 'Dez de Paus'], court: ['Pajem de Paus', 'Cavaleiro de Paus', 'Rainha de Paus', 'Rei de Paus'] },
    cups: { numbers: ['Ás de Copas', 'Dois de Copas', 'Três de Copas', 'Quatro de Copas', 'Cinco de Copas', 'Seis de Copas', 'Sete de Copas', 'Oito de Copas', 'Nove de Copas', 'Dez de Copas'], court: ['Pajem de Copas', 'Cavaleiro de Copas', 'Rainha de Copas', 'Rei de Copas'] },
    swords: { numbers: ['Ás de Espadas', 'Dois de Espadas', 'Três de Espadas', 'Quatro de Espadas', 'Cinco de Espadas', 'Seis de Espadas', 'Sete de Espadas', 'Oito de Espadas', 'Nove de Espadas', 'Dez de Espadas'], court: ['Pajem de Espadas', 'Cavaleiro de Espadas', 'Rainha de Espadas', 'Rei de Espadas'] },
    pentacles: { numbers: ['Ás de Ouros', 'Dois de Ouros', 'Três de Ouros', 'Quatro de Ouros', 'Cinco de Ouros', 'Seis de Ouros', 'Sete de Ouros', 'Oito de Ouros', 'Nove de Ouros', 'Dez de Ouros'], court: ['Pajem de Ouros', 'Cavaleiro de Ouros', 'Rainha de Ouros', 'Rei de Ouros'] },
  },
};

/**
 * Retorna o nome traduzido de uma carta.
 */
export function getCardName(card: TarotCard, locale: Locale): string {
  if (card.arcana === 'major') {
    return majorNames[locale]?.[card.number] || card.name;
  }

  const suitData = suitCardNames[locale]?.[card.suit];
  if (!suitData) return card.name;

  if (card.number <= 10) {
    return suitData.numbers[card.number - 1] || card.name;
  }
  // Court: 11=page, 12=knight, 13=queen, 14=king
  return suitData.court[card.number - 11] || card.name;
}

/**
 * Retorna o subtítulo (tipo + número) traduzido.
 */
export function getCardSubtitle(card: TarotCard, locale: Locale): string {
  const suitNames: Record<Locale, Record<string, string>> = {
    es: { major: 'Arcano Mayor', wands: 'Bastos', cups: 'Copas', swords: 'Espadas', pentacles: 'Oros' },
    en: { major: 'Major Arcana', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
    pt: { major: 'Arcano Maior', wands: 'Paus', cups: 'Copas', swords: 'Espadas', pentacles: 'Ouros' },
  };
  const suit = suitNames[locale]?.[card.suit] || card.suit;
  return `${suit} · ${card.number}`;
}
