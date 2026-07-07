import { majorArcana } from './major-arcana';
import { wands } from './minor-wands';
import { cups } from './minor-cups';
import { swords } from './minor-swords';
import { pentacles } from './minor-pentacles';
import { TarotCard, Spread } from './types';

export const allCards: TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles,
];

export const getCardById = (id: number): TarotCard | undefined =>
  allCards.find((c) => c.id === id);

export const getMajorArcana = (): TarotCard[] =>
  allCards.filter((c) => c.arcana === 'major');

export const getMinorArcana = (): TarotCard[] =>
  allCards.filter((c) => c.arcana === 'minor');

export const getCardsBySuit = (suit: string): TarotCard[] =>
  allCards.filter((c) => c.suit === suit);

export const searchCards = (query: string): TarotCard[] => {
  const q = query.toLowerCase();
  return allCards.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q))
  );
};

export const drawRandomCards = (count: number): { cardId: number; isReversed: boolean }[] => {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    cardId: card.id,
    isReversed: Math.random() > 0.7,
  }));
};

export const spreads: Spread[] = [
  {
    id: 'daily',
    name: 'Carta del Día',
    description: 'Una carta para guiar tu jornada. Simple pero poderosa.',
    numCards: 1,
    positions: [
      { id: 1, name: 'Tu día', description: 'Energía principal que guiará tu jornada', x: 50, y: 50 },
    ],
  },
  {
    id: 'three-cards',
    name: 'Pasado - Presente - Futuro',
    description: 'Tres cartas que revelan la línea del tiempo de tu situación.',
    numCards: 3,
    positions: [
      { id: 1, name: 'Pasado', description: 'Lo que ha quedado atrás e influye aún', x: 20, y: 50 },
      { id: 2, name: 'Presente', description: 'Tu situación actual', x: 50, y: 50 },
      { id: 3, name: 'Futuro', description: 'Hacia dónde te diriges', x: 80, y: 50 },
    ],
  },
  {
    id: 'simple-cross',
    name: 'Cruz Simple',
    description: 'Cinco cartas en forma de cruz para una visión equilibrada.',
    numCards: 5,
    positions: [
      { id: 1, name: 'Centro', description: 'El tema central', x: 50, y: 50 },
      { id: 2, name: 'Cruce', description: 'Lo que cruza o desafía', x: 50, y: 30 },
      { id: 3, name: 'Base', description: 'La raíz del asunto', x: 50, y: 70 },
      { id: 4, name: 'Pasado', description: 'Influencia del pasado', x: 25, y: 50 },
      { id: 5, name: 'Futuro', description: 'Resultado probable', x: 75, y: 50 },
    ],
  },
  {
    id: 'celtic-cross',
    name: 'Cruz Celta',
    description: 'La tirada más completa y tradicional. Diez cartas para una lectura profunda.',
    numCards: 10,
    positions: [
      { id: 1, name: 'Presente', description: 'Tu situación actual', x: 30, y: 50 },
      { id: 2, name: 'Desafío', description: 'Lo que se cruza en tu camino', x: 30, y: 35 },
      { id: 3, name: 'Corona', description: 'Tu meta o ideal consciente', x: 30, y: 15 },
      { id: 4, name: 'Base', description: 'Raíz inconsciente del asunto', x: 30, y: 70 },
      { id: 5, name: 'Pasado reciente', description: 'Influencia que se aleja', x: 10, y: 50 },
      { id: 6, name: 'Futuro cercano', description: 'Lo que viene pronto', x: 50, y: 50 },
      { id: 7, name: 'Tú mismo', description: 'Cómo te ves en esta situación', x: 75, y: 80 },
      { id: 8, name: 'Entorno', description: 'Cómo te ven los demás', x: 75, y: 60 },
      { id: 9, name: 'Esperanzas y miedos', description: 'Lo que deseas o temes', x: 75, y: 40 },
      { id: 10, name: 'Resultado', description: 'El desenlace final', x: 75, y: 20 },
    ],
  },
  {
    id: 'love',
    name: 'Tirada del Amor',
    description: 'Seis cartas para explorar tu vida sentimental en profundidad.',
    numCards: 6,
    positions: [
      { id: 1, name: 'Tú', description: 'Tu energía en el amor ahora', x: 25, y: 30 },
      { id: 2, name: 'El otro', description: 'La energía de la otra persona', x: 75, y: 30 },
      { id: 3, name: 'La conexión', description: 'Lo que os une', x: 50, y: 50 },
      { id: 4, name: 'El desafío', description: 'Lo que debéis superar', x: 50, y: 70 },
      { id: 5, name: 'El consejo', description: 'Qué hacer para mejorar', x: 25, y: 70 },
      { id: 6, name: 'El destino', description: 'Hacia dónde va esta relación', x: 75, y: 70 },
    ],
  },
  {
    id: 'career',
    name: 'Tirada Profesional',
    description: 'Cinco cartas enfocadas en tu carrera y vida laboral.',
    numCards: 5,
    positions: [
      { id: 1, name: 'Situación actual', description: 'Dónde estás profesionalmente', x: 50, y: 20 },
      { id: 2, name: 'Fortaleza', description: 'Tu mayor recurso ahora', x: 25, y: 50 },
      { id: 3, name: 'Obstáculo', description: 'Lo que te frena', x: 75, y: 50 },
      { id: 4, name: 'Acción', description: 'Lo que debes hacer', x: 35, y: 75 },
      { id: 5, name: 'Resultado', description: 'A dónde te lleva este camino', x: 65, y: 75 },
    ],
  },
  {
    id: 'decision',
    name: 'Tirada de Decisión',
    description: 'Siete cartas para cuando debes elegir entre dos caminos.',
    numCards: 7,
    positions: [
      { id: 1, name: 'Tu situación', description: 'Dónde estás ahora', x: 50, y: 20 },
      { id: 2, name: 'Opción A', description: 'Primer camino posible', x: 25, y: 40 },
      { id: 3, name: 'Opción B', description: 'Segundo camino posible', x: 75, y: 40 },
      { id: 4, name: 'Ventaja A', description: 'Lo mejor del camino A', x: 15, y: 60 },
      { id: 5, name: 'Ventaja B', description: 'Lo mejor del camino B', x: 85, y: 60 },
      { id: 6, name: 'Riesgo A', description: 'Lo que arriesgas en A', x: 25, y: 80 },
      { id: 7, name: 'Riesgo B', description: 'Lo que arriesgas en B', x: 75, y: 80 },
    ],
  },
  {
    id: 'free',
    name: 'Lectura Libre',
    description: 'Elige cuántas cartas quieres sacar y asigna tus propias posiciones.',
    numCards: 0,
    positions: [],
  },
];

export { majorArcana } from './major-arcana';
export { wands } from './minor-wands';
export { cups } from './minor-cups';
export { swords } from './minor-swords';
export { pentacles } from './minor-pentacles';
export * from './types';
