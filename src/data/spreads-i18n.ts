import { Locale } from '@/lib/i18n';
import { Spread } from '@/data/types';

type SpreadTranslation = {
  name: string;
  description: string;
  positions: { name: string; description: string }[];
};

const spreadTranslations: Record<Locale, Record<string, SpreadTranslation>> = {
  es: {
    daily: { name: 'Carta del Día', description: 'Una carta para guiar tu jornada. Simple pero poderosa.', positions: [{ name: 'Tu día', description: 'Energía principal que guiará tu jornada' }] },
    'three-cards': { name: 'Pasado - Presente - Futuro', description: 'Tres cartas que revelan la línea del tiempo.', positions: [{ name: 'Pasado', description: 'Lo que ha quedado atrás' }, { name: 'Presente', description: 'Tu situación actual' }, { name: 'Futuro', description: 'Hacia dónde te diriges' }] },
    'simple-cross': { name: 'Cruz Simple', description: 'Cinco cartas para una visión equilibrada.', positions: [{ name: 'Centro', description: 'El tema central' }, { name: 'Cruce', description: 'Lo que desafía' }, { name: 'Base', description: 'La raíz del asunto' }, { name: 'Pasado', description: 'Influencia del pasado' }, { name: 'Futuro', description: 'Resultado probable' }] },
    'celtic-cross': { name: 'Cruz Celta', description: 'La tirada más completa. Diez cartas para una lectura profunda.', positions: [{ name: 'Presente', description: 'Situación actual' }, { name: 'Desafío', description: 'Lo que se cruza' }, { name: 'Corona', description: 'Meta consciente' }, { name: 'Base', description: 'Raíz inconsciente' }, { name: 'Pasado', description: 'Influencia que se aleja' }, { name: 'Futuro', description: 'Lo que viene' }, { name: 'Tú mismo', description: 'Cómo te ves' }, { name: 'Entorno', description: 'Cómo te ven' }, { name: 'Esperanzas', description: 'Lo que deseas o temes' }, { name: 'Resultado', description: 'El desenlace' }] },
    love: { name: 'Tirada del Amor', description: 'Seis cartas para explorar tu vida sentimental.', positions: [{ name: 'Tú', description: 'Tu energía en el amor' }, { name: 'El otro', description: 'Energía de la otra persona' }, { name: 'Conexión', description: 'Lo que os une' }, { name: 'Desafío', description: 'Lo que debéis superar' }, { name: 'Consejo', description: 'Qué hacer' }, { name: 'Destino', description: 'Hacia dónde va' }] },
    career: { name: 'Tirada Profesional', description: 'Cinco cartas sobre tu carrera y vida laboral.', positions: [{ name: 'Situación', description: 'Dónde estás' }, { name: 'Fortaleza', description: 'Tu mayor recurso' }, { name: 'Obstáculo', description: 'Lo que te frena' }, { name: 'Acción', description: 'Lo que debes hacer' }, { name: 'Resultado', description: 'A dónde te lleva' }] },
    decision: { name: 'Tirada de Decisión', description: 'Siete cartas para elegir entre dos caminos.', positions: [{ name: 'Situación', description: 'Dónde estás' }, { name: 'Opción A', description: 'Primer camino' }, { name: 'Opción B', description: 'Segundo camino' }, { name: 'Ventaja A', description: 'Lo mejor de A' }, { name: 'Ventaja B', description: 'Lo mejor de B' }, { name: 'Riesgo A', description: 'Lo que arriesgas en A' }, { name: 'Riesgo B', description: 'Lo que arriesgas en B' }] },
    free: { name: 'Lectura Libre', description: 'Elige cuántas cartas y asigna tus posiciones.', positions: [] },
  },
  en: {
    daily: { name: 'Card of the Day', description: 'One card to guide your day. Simple but powerful.', positions: [{ name: 'Your day', description: 'Main energy guiding your day' }] },
    'three-cards': { name: 'Past - Present - Future', description: 'Three cards revealing your timeline.', positions: [{ name: 'Past', description: 'What\'s behind you' }, { name: 'Present', description: 'Your current situation' }, { name: 'Future', description: 'Where you\'re heading' }] },
    'simple-cross': { name: 'Simple Cross', description: 'Five cards for a balanced view.', positions: [{ name: 'Center', description: 'The core issue' }, { name: 'Cross', description: 'What challenges you' }, { name: 'Foundation', description: 'Root of the matter' }, { name: 'Past', description: 'Past influence' }, { name: 'Future', description: 'Likely outcome' }] },
    'celtic-cross': { name: 'Celtic Cross', description: 'The most complete spread. Ten cards for a deep reading.', positions: [{ name: 'Present', description: 'Current situation' }, { name: 'Challenge', description: 'What crosses you' }, { name: 'Crown', description: 'Conscious goal' }, { name: 'Foundation', description: 'Unconscious root' }, { name: 'Past', description: 'Receding influence' }, { name: 'Future', description: 'What\'s coming' }, { name: 'Self', description: 'How you see yourself' }, { name: 'Environment', description: 'How others see you' }, { name: 'Hopes', description: 'What you desire or fear' }, { name: 'Outcome', description: 'The final result' }] },
    love: { name: 'Love Spread', description: 'Six cards to explore your love life.', positions: [{ name: 'You', description: 'Your energy in love' }, { name: 'The other', description: 'The other person\'s energy' }, { name: 'Connection', description: 'What unites you' }, { name: 'Challenge', description: 'What to overcome' }, { name: 'Advice', description: 'What to do' }, { name: 'Destiny', description: 'Where it\'s going' }] },
    career: { name: 'Career Spread', description: 'Five cards about your professional life.', positions: [{ name: 'Situation', description: 'Where you are' }, { name: 'Strength', description: 'Your best resource' }, { name: 'Obstacle', description: 'What holds you back' }, { name: 'Action', description: 'What you must do' }, { name: 'Outcome', description: 'Where it leads' }] },
    decision: { name: 'Decision Spread', description: 'Seven cards to choose between two paths.', positions: [{ name: 'Situation', description: 'Where you are' }, { name: 'Option A', description: 'First path' }, { name: 'Option B', description: 'Second path' }, { name: 'Advantage A', description: 'Best of A' }, { name: 'Advantage B', description: 'Best of B' }, { name: 'Risk A', description: 'What you risk in A' }, { name: 'Risk B', description: 'What you risk in B' }] },
    free: { name: 'Free Reading', description: 'Choose how many cards and assign your own positions.', positions: [] },
  },
  pt: {
    daily: { name: 'Carta do Dia', description: 'Uma carta para guiar seu dia. Simples mas poderosa.', positions: [{ name: 'Seu dia', description: 'Energia principal do seu dia' }] },
    'three-cards': { name: 'Passado - Presente - Futuro', description: 'Três cartas revelando sua linha do tempo.', positions: [{ name: 'Passado', description: 'O que ficou para trás' }, { name: 'Presente', description: 'Sua situação atual' }, { name: 'Futuro', description: 'Para onde você vai' }] },
    'simple-cross': { name: 'Cruz Simples', description: 'Cinco cartas para uma visão equilibrada.', positions: [{ name: 'Centro', description: 'O tema central' }, { name: 'Cruzamento', description: 'O que desafia' }, { name: 'Base', description: 'A raiz do assunto' }, { name: 'Passado', description: 'Influência do passado' }, { name: 'Futuro', description: 'Resultado provável' }] },
    'celtic-cross': { name: 'Cruz Celta', description: 'A tiragem mais completa. Dez cartas para leitura profunda.', positions: [{ name: 'Presente', description: 'Situação atual' }, { name: 'Desafio', description: 'O que cruza' }, { name: 'Coroa', description: 'Meta consciente' }, { name: 'Base', description: 'Raiz inconsciente' }, { name: 'Passado', description: 'Influência que se afasta' }, { name: 'Futuro', description: 'O que vem' }, { name: 'Você', description: 'Como se vê' }, { name: 'Ambiente', description: 'Como te veem' }, { name: 'Esperanças', description: 'O que deseja ou teme' }, { name: 'Resultado', description: 'O desfecho' }] },
    love: { name: 'Tiragem do Amor', description: 'Seis cartas para explorar sua vida sentimental.', positions: [{ name: 'Você', description: 'Sua energia no amor' }, { name: 'O outro', description: 'Energia da outra pessoa' }, { name: 'Conexão', description: 'O que une vocês' }, { name: 'Desafio', description: 'O que superar' }, { name: 'Conselho', description: 'O que fazer' }, { name: 'Destino', description: 'Para onde vai' }] },
    career: { name: 'Tiragem Profissional', description: 'Cinco cartas sobre sua carreira.', positions: [{ name: 'Situação', description: 'Onde você está' }, { name: 'Força', description: 'Seu maior recurso' }, { name: 'Obstáculo', description: 'O que te freia' }, { name: 'Ação', description: 'O que deve fazer' }, { name: 'Resultado', description: 'Para onde leva' }] },
    decision: { name: 'Tiragem de Decisão', description: 'Sete cartas para escolher entre dois caminhos.', positions: [{ name: 'Situação', description: 'Onde você está' }, { name: 'Opção A', description: 'Primeiro caminho' }, { name: 'Opção B', description: 'Segundo caminho' }, { name: 'Vantagem A', description: 'O melhor de A' }, { name: 'Vantagem B', description: 'O melhor de B' }, { name: 'Risco A', description: 'O que arrisca em A' }, { name: 'Risco B', description: 'O que arrisca em B' }] },
    free: { name: 'Leitura Livre', description: 'Escolha quantas cartas e defina suas posições.', positions: [] },
  },
};

export function getTranslatedSpreads(locale: Locale): Spread[] {
  const trans = spreadTranslations[locale] || spreadTranslations.es;
  const spreadIds = ['daily', 'three-cards', 'simple-cross', 'celtic-cross', 'love', 'career', 'decision', 'free'] as const;
  const numCards = [1, 3, 5, 10, 6, 5, 7, 0];

  return spreadIds.map((id, idx) => {
    const t = trans[id];
    return {
      id,
      name: t.name,
      description: t.description,
      numCards: numCards[idx],
      positions: t.positions.map((p, i) => ({
        id: i + 1,
        name: p.name,
        description: p.description,
        x: 50,
        y: 50,
      })),
    };
  });
}
