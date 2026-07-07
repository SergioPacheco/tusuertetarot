import { TarotCard } from '@/data/types';
import { Locale } from '@/lib/i18n';
import { getCardName } from '@/data/card-names-i18n';

/**
 * Gera uma interpretação genérica para combinações não cadastradas.
 * Baseada nos elementos/palos e na numerologia das cartas.
 */
export function generateCombinationMeaning(card1: TarotCard, card2: TarotCard, locale: Locale): string {
  const templates = combinationTemplates[locale] || combinationTemplates.es;

  // Duas cartas maiores
  if (card1.arcana === 'major' && card2.arcana === 'major') {
    return templates.twoMajor(getCardName(card1, locale), getCardName(card2, locale));
  }

  // Uma maior + uma menor
  if (card1.arcana === 'major' && card2.arcana === 'minor') {
    return templates.majorMinor(getCardName(card1, locale), getCardName(card2, locale), card2.suit);
  }
  if (card2.arcana === 'major' && card1.arcana === 'minor') {
    return templates.majorMinor(getCardName(card2, locale), getCardName(card1, locale), card1.suit);
  }

  // Dois menores — mismo palo
  if (card1.suit === card2.suit) {
    return templates.sameSuit(card1.suit, card1.number, card2.number);
  }

  // Dois menores — palos diferentes (elementos)
  return templates.differentSuits(card1.suit, card2.suit);
}

const suitElements: Record<Locale, Record<string, string>> = {
  es: { wands: 'Fuego', cups: 'Agua', swords: 'Aire', pentacles: 'Tierra' },
  en: { wands: 'Fire', cups: 'Water', swords: 'Air', pentacles: 'Earth' },
  pt: { wands: 'Fogo', cups: 'Água', swords: 'Ar', pentacles: 'Terra' },
};

const suitThemes: Record<Locale, Record<string, string>> = {
  es: { wands: 'acción y creatividad', cups: 'emociones y relaciones', swords: 'mente y comunicación', pentacles: 'trabajo y materialidad' },
  en: { wands: 'action and creativity', cups: 'emotions and relationships', swords: 'mind and communication', pentacles: 'work and materiality' },
  pt: { wands: 'ação e criatividade', cups: 'emoções e relacionamentos', swords: 'mente e comunicação', pentacles: 'trabalho e materialidade' },
};

const elementInteractions: Record<Locale, Record<string, string>> = {
  es: {
    'wands-cups': 'Fuego y Agua: la pasión se encuentra con la emoción. Tensión creativa entre actuar y sentir. Busca el equilibrio entre impulso y profundidad emocional.',
    'wands-swords': 'Fuego y Aire: la acción se une al pensamiento. Gran capacidad de planificar Y ejecutar. Cuidado con la impulsividad mental.',
    'wands-pentacles': 'Fuego y Tierra: la pasión se materializa. Proyectos creativos que generan resultados concretos. Energía canalizada productivamente.',
    'cups-swords': 'Agua y Aire: el corazón dialoga con la mente. Necesidad de integrar lo que sientes con lo que piensas. No racionalices tus emociones.',
    'cups-pentacles': 'Agua y Tierra: las emociones se concretan. Relaciones que construyen algo sólido. El amor se traduce en seguridad.',
    'swords-pentacles': 'Aire y Tierra: las ideas se materializan. Planes mentales que se convierten en realidad tangible. Estrategia que produce resultados.',
  },
  en: {
    'wands-cups': 'Fire and Water: passion meets emotion. Creative tension between acting and feeling. Seek balance between impulse and emotional depth.',
    'wands-swords': 'Fire and Air: action joins thought. Great capacity to plan AND execute. Beware of mental impulsiveness.',
    'wands-pentacles': 'Fire and Earth: passion materializes. Creative projects generating concrete results. Energy channeled productively.',
    'cups-swords': 'Water and Air: the heart dialogues with the mind. Need to integrate what you feel with what you think. Don\'t rationalize your emotions.',
    'cups-pentacles': 'Water and Earth: emotions become concrete. Relationships that build something solid. Love translates into security.',
    'swords-pentacles': 'Air and Earth: ideas materialize. Mental plans becoming tangible reality. Strategy that produces results.',
  },
  pt: {
    'wands-cups': 'Fogo e Água: a paixão encontra a emoção. Tensão criativa entre agir e sentir. Busque equilíbrio entre impulso e profundidade emocional.',
    'wands-swords': 'Fogo e Ar: a ação se une ao pensamento. Grande capacidade de planejar E executar. Cuidado com a impulsividade mental.',
    'wands-pentacles': 'Fogo e Terra: a paixão se materializa. Projetos criativos que geram resultados concretos. Energia canalizada produtivamente.',
    'cups-swords': 'Água e Ar: o coração dialoga com a mente. Necessidade de integrar o que sente com o que pensa. Não racionalize suas emoções.',
    'cups-pentacles': 'Água e Terra: as emoções se concretizam. Relacionamentos que constroem algo sólido. O amor se traduz em segurança.',
    'swords-pentacles': 'Ar e Terra: as ideias se materializam. Planos mentais que se tornam realidade tangível. Estratégia que produz resultados.',
  },
};

interface Templates {
  twoMajor: (name1: string, name2: string) => string;
  majorMinor: (majorName: string, minorName: string, suit: string) => string;
  sameSuit: (suit: string, num1: number, num2: number) => string;
  differentSuits: (suit1: string, suit2: string) => string;
}

const combinationTemplates: Record<Locale, Templates> = {
  es: {
    twoMajor: (n1, n2) => `${n1} junto a ${n2} indica fuerzas del destino en juego. Dos Arcanos Mayores señalan un momento significativo donde las energías arquetípicas se combinan para crear una transformación profunda en tu vida.`,
    majorMinor: (major, minor, suit) => `${major} ilumina y amplifica la energía de ${minor}. El Arcano Mayor da contexto espiritual y profundidad al tema de ${suitThemes.es[suit]}.`,
    sameSuit: (suit, n1, n2) => `Dos cartas de ${suitElements.es[suit]} (${n1} y ${n2}): el tema de ${suitThemes.es[suit]} está muy presente. La energía del ${suitElements.es[suit]} domina la situación y pide atención especial.`,
    differentSuits: (s1, s2) => {
      const key = [s1, s2].sort().join('-');
      return elementInteractions.es[key] || `La combinación de ${suitElements.es[s1]} y ${suitElements.es[s2]} crea una dinámica complementaria. Integra ambas energías para una visión completa.`;
    },
  },
  en: {
    twoMajor: (n1, n2) => `${n1} alongside ${n2} indicates forces of destiny at play. Two Major Arcana signal a significant moment where archetypal energies combine to create profound transformation in your life.`,
    majorMinor: (major, minor, suit) => `${major} illuminates and amplifies the energy of ${minor}. The Major Arcana provides spiritual context and depth to the theme of ${suitThemes.en[suit]}.`,
    sameSuit: (suit, n1, n2) => `Two ${suitElements.en[suit]} cards (${n1} and ${n2}): the theme of ${suitThemes.en[suit]} is very present. ${suitElements.en[suit]} energy dominates the situation and demands special attention.`,
    differentSuits: (s1, s2) => {
      const key = [s1, s2].sort().join('-');
      return elementInteractions.en[key] || `The combination of ${suitElements.en[s1]} and ${suitElements.en[s2]} creates a complementary dynamic. Integrate both energies for a complete vision.`;
    },
  },
  pt: {
    twoMajor: (n1, n2) => `${n1} junto a ${n2} indica forças do destino em jogo. Dois Arcanos Maiores sinalizam um momento significativo onde energias arquetípicas se combinam para criar uma transformação profunda na sua vida.`,
    majorMinor: (major, minor, suit) => `${major} ilumina e amplifica a energia de ${minor}. O Arcano Maior dá contexto espiritual e profundidade ao tema de ${suitThemes.pt[suit]}.`,
    sameSuit: (suit, n1, n2) => `Duas cartas de ${suitElements.pt[suit]} (${n1} e ${n2}): o tema de ${suitThemes.pt[suit]} está muito presente. A energia de ${suitElements.pt[suit]} domina a situação e pede atenção especial.`,
    differentSuits: (s1, s2) => {
      const key = [s1, s2].sort().join('-');
      return elementInteractions.pt[key] || `A combinação de ${suitElements.pt[s1]} e ${suitElements.pt[s2]} cria uma dinâmica complementar. Integre ambas as energias para uma visão completa.`;
    },
  },
};
