'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'es' | 'en' | 'pt';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'es',
  setLocale: () => {},
  t: (key) => key,
});

export function useI18n() {
  return useContext(I18nContext);
}

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  pt: '🇧🇷',
};

// ═══════════════ TRADUÇÕES ═══════════════
const translations: Record<Locale, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio', 'nav.cards': 'Cartas', 'nav.reading': 'Tirada', 'nav.diary': 'Diario', 'nav.study': 'Estudio',
    'home.title': '✦ Tu Suerte Tarot ✦', 'home.subtitle': 'Tarot de Marsella',
    'home.daily': 'Carta del Día', 'home.loading': 'Preparando tu lectura...',
    'home.advice': '💡 Consejo del día:', 'home.newReading': 'Nueva Tirada',
    'home.newReading.sub': '8 tipos de lectura', 'home.library': '78 Cartas',
    'home.library.sub': 'Biblioteca completa', 'home.disclaimer': 'Aviso de uso',
    'home.disclaimer.text': 'Tu Suerte Tarot es una herramienta de autoconocimiento y entretenimiento. Las lecturas no sustituyen consejo profesional médico, legal o financiero. Tú eres siempre dueño de tus decisiones.',
    'library.title': 'Biblioteca de Cartas', 'library.subtitle': '78 cartas del Tarot de Marsella',
    'library.search': 'Buscar carta, palabra clave...', 'library.all': 'Todas',
    'card.general': 'Significado General', 'card.love': 'Amor', 'card.work': 'Trabajo',
    'card.money': 'Dinero', 'card.spirituality': 'Espiritualidad', 'card.advice': 'Consejo',
    'card.warning': 'Advertencia', 'card.reversed': 'Carta Invertida', 'card.combinations': 'Combinaciones',
    'reading.choose': 'Elige tu Tirada', 'reading.cards': 'cartas',
    'reading.question.intro': 'Concéntrate en tu pregunta. La IA interpretará las cartas en conjunto.',
    'reading.question.placeholder': '¿Qué quieres saber?',
    'reading.freeCount': 'Número de cartas:', 'reading.shuffle': 'Mezclar y Sacar Cartas',
    'reading.reveal': 'Revelar siguiente carta', 'reading.interpretation': 'Interpretación de la Lectura',
    'reading.interpreting': 'Las cartas hablan... interpretando tu lectura...',
    'reading.retry': 'Reintentar', 'reading.details': 'Detalle de cada carta',
    'reading.save': 'Guardar', 'reading.saved': 'Guardada ✓', 'reading.share': 'Compartir', 'reading.reversed': 'Invertida',
    'diary.title': 'Diario de Lecturas', 'diary.subtitle': 'Tu historial personal de tiradas',
    'diary.all': 'Todas', 'diary.favorites': 'Favoritas',
    'diary.empty': 'No tienes lecturas guardadas.', 'diary.emptyFav': 'No tienes lecturas favoritas aún.',
    'diary.firstReading': 'Hacer tu primera tirada →',
    'study.title': 'Modo Estudio', 'study.subtitle': 'Aprende a leer el Tarot de Marsella',
    'study.techniques': 'Técnicas', 'study.combinations': 'Combinar', 'study.practice': 'Practicar',
    'study.combineIntro': 'Selecciona dos cartas para ver su significado combinado.',
    'study.select': 'Seleccionar...', 'study.noCombination': 'No hay combinación específica registrada.',
    'study.knownCombinations': 'Combinaciones conocidas de',
    'study.practiceIntro': 'Saca una carta al azar e intenta describirla antes de ver su significado.',
    'study.drawPractice': 'Sacar Carta de Práctica',
    'study.showMeaning': 'Ver significado →', 'study.hideMeaning': 'Ocultar significado',
    'study.fullCard': 'Ver ficha completa →', 'study.spreads': 'Tiradas Disponibles',
    'onboarding.step1.title': 'Carta del Día', 'onboarding.step1.desc': 'Cada día una carta diferente te espera con un mensaje personal. Tócala para revelarla.',
    'onboarding.step2.title': '78 Cartas Completas', 'onboarding.step2.desc': 'Explora la biblioteca con todos los Arcanos Mayores y Menores, sus significados y combinaciones.',
    'onboarding.step3.title': '8 Tipos de Tirada', 'onboarding.step3.desc': 'Desde la carta del día hasta la Cruz Celta. Guarda tus lecturas favoritas en el diario.',
    'onboarding.step4.title': 'Modo Estudio', 'onboarding.step4.desc': 'Aprende técnicas de lectura, practica con cartas al azar y descubre combinaciones entre ellas.',
    'onboarding.next': 'Siguiente', 'onboarding.back': 'Atrás', 'onboarding.start': '✦ Comenzar',
  },
  en: {
    'nav.home': 'Home', 'nav.cards': 'Cards', 'nav.reading': 'Reading', 'nav.diary': 'Diary', 'nav.study': 'Study',
    'home.title': '✦ Tu Suerte Tarot ✦', 'home.subtitle': 'Tarot de Marseille',
    'home.daily': 'Card of the Day', 'home.loading': 'Preparing your reading...',
    'home.advice': '💡 Today\'s advice:', 'home.newReading': 'New Reading',
    'home.newReading.sub': '8 spread types', 'home.library': '78 Cards',
    'home.library.sub': 'Full library', 'home.disclaimer': 'Disclaimer',
    'home.disclaimer.text': 'Tu Suerte Tarot is a tool for self-knowledge and entertainment. Readings do not replace professional medical, legal, or financial advice. You are always in charge of your decisions.',
    'library.title': 'Card Library', 'library.subtitle': '78 Tarot de Marseille cards',
    'library.search': 'Search card, keyword...', 'library.all': 'All',
    'card.general': 'General Meaning', 'card.love': 'Love', 'card.work': 'Work',
    'card.money': 'Money', 'card.spirituality': 'Spirituality', 'card.advice': 'Advice',
    'card.warning': 'Warning', 'card.reversed': 'Reversed Card', 'card.combinations': 'Combinations',
    'reading.choose': 'Choose Your Spread', 'reading.cards': 'cards',
    'reading.question.intro': 'Focus on your question. AI will interpret the cards together.',
    'reading.question.placeholder': 'What do you want to know?',
    'reading.freeCount': 'Number of cards:', 'reading.shuffle': 'Shuffle & Draw Cards',
    'reading.reveal': 'Reveal next card', 'reading.interpretation': 'Reading Interpretation',
    'reading.interpreting': 'The cards speak... interpreting your reading...',
    'reading.retry': 'Retry', 'reading.details': 'Each card detail',
    'reading.save': 'Save', 'reading.saved': 'Saved ✓', 'reading.share': 'Share', 'reading.reversed': 'Reversed',
    'diary.title': 'Reading Diary', 'diary.subtitle': 'Your personal reading history',
    'diary.all': 'All', 'diary.favorites': 'Favorites',
    'diary.empty': 'No saved readings yet.', 'diary.emptyFav': 'No favorite readings yet.',
    'diary.firstReading': 'Do your first reading →',
    'study.title': 'Study Mode', 'study.subtitle': 'Learn to read Tarot de Marseille',
    'study.techniques': 'Techniques', 'study.combinations': 'Combine', 'study.practice': 'Practice',
    'study.combineIntro': 'Select two cards to see their combined meaning.',
    'study.select': 'Select...', 'study.noCombination': 'No specific combination registered.',
    'study.knownCombinations': 'Known combinations of',
    'study.practiceIntro': 'Draw a random card and try to describe it before seeing its meaning.',
    'study.drawPractice': 'Draw Practice Card',
    'study.showMeaning': 'Show meaning →', 'study.hideMeaning': 'Hide meaning',
    'study.fullCard': 'See full card →', 'study.spreads': 'Available Spreads',
    'onboarding.step1.title': 'Card of the Day', 'onboarding.step1.desc': 'A different card awaits you every day with a personal message. Tap to reveal it.',
    'onboarding.step2.title': '78 Full Cards', 'onboarding.step2.desc': 'Explore the library with all Major and Minor Arcana, their meanings and combinations.',
    'onboarding.step3.title': '8 Spread Types', 'onboarding.step3.desc': 'From the daily card to the Celtic Cross. Save your favorite readings in your diary.',
    'onboarding.step4.title': 'Study Mode', 'onboarding.step4.desc': 'Learn reading techniques, practice with random cards, and discover card combinations.',
    'onboarding.next': 'Next', 'onboarding.back': 'Back', 'onboarding.start': '✦ Let\'s begin',
  },
  pt: {
    'nav.home': 'Início', 'nav.cards': 'Cartas', 'nav.reading': 'Tiragem', 'nav.diary': 'Diário', 'nav.study': 'Estudo',
    'home.title': '✦ Tu Suerte Tarot ✦', 'home.subtitle': 'Tarot de Marselha',
    'home.daily': 'Carta do Dia', 'home.loading': 'Preparando sua leitura...',
    'home.advice': '💡 Conselho do dia:', 'home.newReading': 'Nova Tiragem',
    'home.newReading.sub': '8 tipos de leitura', 'home.library': '78 Cartas',
    'home.library.sub': 'Biblioteca completa', 'home.disclaimer': 'Aviso de uso',
    'home.disclaimer.text': 'Tu Suerte Tarot é uma ferramenta de autoconhecimento e entretenimento. As leituras não substituem aconselhamento profissional médico, jurídico ou financeiro. Você é sempre dono das suas decisões.',
    'library.title': 'Biblioteca de Cartas', 'library.subtitle': '78 cartas do Tarot de Marselha',
    'library.search': 'Buscar carta, palavra-chave...', 'library.all': 'Todas',
    'card.general': 'Significado Geral', 'card.love': 'Amor', 'card.work': 'Trabalho',
    'card.money': 'Dinheiro', 'card.spirituality': 'Espiritualidade', 'card.advice': 'Conselho',
    'card.warning': 'Advertência', 'card.reversed': 'Carta Invertida', 'card.combinations': 'Combinações',
    'reading.choose': 'Escolha sua Tiragem', 'reading.cards': 'cartas',
    'reading.question.intro': 'Concentre-se na sua pergunta. A IA interpretará as cartas em conjunto.',
    'reading.question.placeholder': 'O que você quer saber?',
    'reading.freeCount': 'Número de cartas:', 'reading.shuffle': 'Embaralhar e Tirar Cartas',
    'reading.reveal': 'Revelar próxima carta', 'reading.interpretation': 'Interpretação da Leitura',
    'reading.interpreting': 'As cartas falam... interpretando sua leitura...',
    'reading.retry': 'Tentar novamente', 'reading.details': 'Detalhe de cada carta',
    'reading.save': 'Salvar', 'reading.saved': 'Salva ✓', 'reading.share': 'Compartilhar', 'reading.reversed': 'Invertida',
    'diary.title': 'Diário de Leituras', 'diary.subtitle': 'Seu histórico pessoal de tiragens',
    'diary.all': 'Todas', 'diary.favorites': 'Favoritas',
    'diary.empty': 'Nenhuma leitura salva.', 'diary.emptyFav': 'Nenhuma leitura favorita ainda.',
    'diary.firstReading': 'Fazer sua primeira tiragem →',
    'study.title': 'Modo Estudo', 'study.subtitle': 'Aprenda a ler o Tarot de Marselha',
    'study.techniques': 'Técnicas', 'study.combinations': 'Combinar', 'study.practice': 'Praticar',
    'study.combineIntro': 'Selecione duas cartas para ver seu significado combinado.',
    'study.select': 'Selecionar...', 'study.noCombination': 'Não há combinação específica registrada.',
    'study.knownCombinations': 'Combinações conhecidas de',
    'study.practiceIntro': 'Tire uma carta aleatória e tente descrevê-la antes de ver seu significado.',
    'study.drawPractice': 'Tirar Carta de Prática',
    'study.showMeaning': 'Ver significado →', 'study.hideMeaning': 'Ocultar significado',
    'study.fullCard': 'Ver ficha completa →', 'study.spreads': 'Tiragens Disponíveis',
    'onboarding.step1.title': 'Carta do Dia', 'onboarding.step1.desc': 'Todo dia uma carta diferente te espera com uma mensagem pessoal. Toque para revelá-la.',
    'onboarding.step2.title': '78 Cartas Completas', 'onboarding.step2.desc': 'Explore a biblioteca com todos os Arcanos Maiores e Menores, seus significados e combinações.',
    'onboarding.step3.title': '8 Tipos de Tiragem', 'onboarding.step3.desc': 'Da carta do dia à Cruz Celta. Salve suas leituras favoritas no diário.',
    'onboarding.step4.title': 'Modo Estudo', 'onboarding.step4.desc': 'Aprenda técnicas de leitura, pratique com cartas aleatórias e descubra combinações entre elas.',
    'onboarding.next': 'Próximo', 'onboarding.back': 'Voltar', 'onboarding.start': '✦ Começar',
  },
};

// ═══════════════ PROVIDER ═══════════════
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tarot-locale') as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    }
    setReady(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('tarot-locale', newLocale);
    // Reload garante que TUDO re-renderiza — solução definitiva
    window.location.reload();
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations['es'][key] || key;
  };

  // Não renderizar nada até ler o locale do localStorage
  // Isso evita flash de espanhol quando o idioma é outro
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-[var(--gold)] animate-pulse text-2xl">✦</span>
      </div>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
