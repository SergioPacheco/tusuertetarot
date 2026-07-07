'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Save, Share2, Wand2, ChevronDown, ChevronUp, Heart, Briefcase, Coins, Star, Moon, Flame, Compass, Scale, Users, Zap } from 'lucide-react';
import { drawRandomCards, getCardById } from '@/data';
import { SpreadType, DrawnCard, Reading, Spread } from '@/data/types';
import { TarotCardDisplay, TarotCardBack } from '@/components/TarotCard';
import { FlipCard } from '@/components/FlipCard';
import { useI18n } from '@/lib/i18n';
import { saveReading } from '@/lib/db';
import { getTranslatedSpreads } from '@/data/spreads-i18n';
import { getCardName } from '@/data/card-names-i18n';
import { getCardMeanings } from '@/data/card-meanings-i18n';

type Phase = 'select' | 'question' | 'drawing' | 'reading';

const spreadIcons: Record<string, React.ReactNode> = {
  daily: <Star size={20} />,
  'three-cards': <Compass size={20} />,
  'simple-cross': <Zap size={20} />,
  'celtic-cross': <Moon size={20} />,
  love: <Heart size={20} />,
  career: <Briefcase size={20} />,
  decision: <Scale size={20} />,
  free: <Flame size={20} />,
};

export default function TiradaPage() {
  const { t, locale } = useI18n();
  const spreads = getTranslatedSpreads(locale);
  const [phase, setPhase] = useState<Phase>('select');
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [freeCardCount, setFreeCardCount] = useState(3);
  const [saved, setSaved] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretError, setInterpretError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const selectSpread = (spread: Spread) => {
    setSelectedSpread(spread);
    setPhase('question');
  };

  const startDrawing = () => {
    if (!selectedSpread) return;
    const count = selectedSpread.id === 'free' ? freeCardCount : selectedSpread.numCards;
    const cards = drawRandomCards(count);
    setDrawnCards(cards.map((c, i) => ({ ...c, position: i + 1 })));
    setRevealedCount(0);
    setAiInterpretation(null);
    setInterpretError(null);
    setExpandedCard(null);
    setPhase('drawing');
  };

  const revealNext = () => {
    if (revealedCount < drawnCards.length) {
      setRevealedCount((prev) => prev + 1);
    }
    if (revealedCount + 1 >= drawnCards.length) {
      setPhase('reading');
      requestAiInterpretation();
    }
  };

  const revealAll = () => {
    setRevealedCount(drawnCards.length);
    setPhase('reading');
    requestAiInterpretation();
  };

  const requestAiInterpretation = async () => {
    if (!selectedSpread) return;
    setIsInterpreting(true);
    setInterpretError(null);

    const cardsForApi = drawnCards.map((drawn, i) => ({
      cardId: drawn.cardId,
      position: selectedSpread.positions[i]?.name || `Carta ${i + 1}`,
      isReversed: drawn.isReversed,
    }));

    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: cardsForApi, spread: selectedSpread.name, question: question || null, locale }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error');
      const data = await res.json();
      setAiInterpretation(data.interpretation);
    } catch (err: unknown) {
      setInterpretError(err instanceof Error ? err.message : 'Error');
    } finally {
      setIsInterpreting(false);
    }
  };

  const handleSave = async () => {
    const reading: Reading = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      spread: selectedSpread?.id as SpreadType,
      question: question || undefined,
      cards: drawnCards,
      notes: aiInterpretation || undefined,
      isFavorite: false,
    };
    await saveReading(reading);
    setSaved(true);
  };

  const shareReading = () => {
    const cardNames = drawnCards.map((d, i) => {
      const c = getCardById(d.cardId);
      const pos = selectedSpread?.positions[i]?.name || `Carta ${i + 1}`;
      return `${pos}: ${c ? getCardName(c, locale) : '?'}${d.isReversed ? ' ↓' : ''}`;
    }).join('\n');
    const text = `✦ Tu Suerte Tarot — ${selectedSpread?.name}\n${question ? `${question}\n\n` : '\n'}${cardNames}${aiInterpretation ? `\n\n🔮 ${aiInterpretation}` : ''}`;
    navigator.clipboard?.writeText(text);
  };

  const reset = () => {
    setPhase('select');
    setSelectedSpread(null);
    setQuestion('');
    setDrawnCards([]);
    setRevealedCount(0);
    setSaved(false);
    setAiInterpretation(null);
    setInterpretError(null);
    setExpandedCard(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatePresence mode="wait">
        {/* ═══════════════ SELECT SPREAD ═══════════════ */}
        {phase === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Hero */}
            <div className="text-center space-y-3 pt-4">
              {/* Floating cards fan */}
              <div className="card-fan mx-auto mb-6">
                <div className="fan-card fc-left">
                  <img src="/cards/major/17-star.webp" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="fan-card fc-right">
                  <img src="/cards/major/19-sun.webp" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="fan-card fc-center">
                  <img src="/cards/major/18-moon.webp" alt="" className="w-full h-full object-cover" />
                </div>
                {/* Sparks */}
                <svg className="spark" style={{ bottom: '10%', left: '8%' }} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z"/></svg>
                <svg className="spark" style={{ top: '46%', right: '2%' }} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z"/></svg>
              </div>

              <h1 className="text-2xl font-bold text-[var(--cream)]">{t('reading.choose')}</h1>
              <p className="text-sm text-[var(--cream)]/50 max-w-xs mx-auto">
                {locale === 'pt' ? 'Escolha o tipo de tiragem que ressoa com sua pergunta' : locale === 'en' ? 'Choose the spread that resonates with your question' : 'Elige la tirada que resuene con tu pregunta'}
              </p>
            </div>

            {/* Spread Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {spreads.map((spread) => (
                <motion.button
                  key={spread.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectSpread(spread)}
                  className="glass-card rounded-2xl p-4 text-left hover:card-glow transition-all group relative overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/0 to-[var(--gold)]/0 group-hover:from-[var(--gold)]/5 group-hover:to-transparent transition-all rounded-2xl" />
                  
                  <div className="relative space-y-2">
                    <div className="text-[var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity">
                      {spreadIcons[spread.id] || <Sparkles size={20} />}
                    </div>
                    <h3 className="text-sm font-bold text-[var(--cream)] leading-tight">{spread.name}</h3>
                    <p className="text-xs text-[var(--cream)]/40 leading-relaxed line-clamp-2">{spread.description}</p>
                    <div className="flex items-center gap-1 pt-1">
                      <span className="text-xs font-medium text-[var(--gold)]/80">
                        {spread.numCards === 0 ? '∞' : spread.numCards} {t('reading.cards')}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══════════════ QUESTION ═══════════════ */}
        {phase === 'question' && (
          <motion.div key="question" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button onClick={reset} className="text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors text-xs flex items-center gap-1">
                ← {t('reading.choose')}
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--violet-mid)] border border-[var(--gold-line)]">
                {spreadIcons[selectedSpread?.id || ''] || <Sparkles size={20} />}
              </div>
              <h2 className="text-xl font-bold text-[var(--cream)]">{selectedSpread?.name}</h2>
              <p className="text-xs text-[var(--cream)]/50">{selectedSpread?.description}</p>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-4">
              <p className="text-sm text-[var(--cream)]/70 text-center">{t('reading.question.intro')}</p>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('reading.question.placeholder')}
                className="w-full p-4 rounded-xl bg-[var(--ink)]/60 border border-[var(--gold-line-soft)] text-sm text-[var(--cream)] placeholder-[var(--cream)]/25 resize-none h-28 focus:border-[var(--gold)]/50 focus:outline-none transition-colors"
              />
              {selectedSpread?.id === 'free' && (
                <div className="space-y-2">
                  <label className="text-xs text-[var(--cream)]/50">{t('reading.freeCount')}</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={1} max={10} value={freeCardCount} onChange={(e) => setFreeCardCount(parseInt(e.target.value))} className="flex-1" />
                    <span className="text-sm font-bold text-[var(--gold)] w-6 text-center">{freeCardCount}</span>
                  </div>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={startDrawing}
              className="btn-gold w-full"
            >
              <span className="shimmer"></span>
              <Sparkles size={18} /> {t('reading.shuffle')}
            </motion.button>
          </motion.div>
        )}

        {/* ═══════════════ DRAWING & READING ═══════════════ */}
        {(phase === 'drawing' || phase === 'reading') && (
          <motion.div key="cards" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--cream)]">{selectedSpread?.name}</h2>
              <button onClick={reset} className="p-2 rounded-lg hover:bg-white/5 text-[var(--cream)]/50 hover:text-[var(--gold)] transition-all">
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Cards spread display */}
            <div className="glass-card rounded-2xl p-4">
              <div className={`grid gap-3 ${drawnCards.length <= 3 ? 'grid-cols-3' : drawnCards.length <= 6 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {drawnCards.map((drawn, index) => {
                  const card = getCardById(drawn.cardId);
                  const isRevealed = index < revealedCount;
                  const posName = selectedSpread?.positions[index]?.name || `#${index + 1}`;
                  if (!card) return null;
                  return (
                    <FlipCard
                      key={index}
                      card={card}
                      isReversed={drawn.isReversed}
                      isRevealed={isRevealed}
                      onReveal={revealNext}
                      positionName={posName}
                      delay={index * 100}
                    />
                  );
                })}
              </div>

              {phase === 'drawing' && (
                <div className="flex gap-2 mt-4">
                  <button onClick={revealNext} className="flex-1 py-2.5 rounded-xl border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-medium hover:bg-[var(--gold)]/5 transition-colors">
                    {t('reading.reveal')} ({revealedCount}/{drawnCards.length})
                  </button>
                  <button onClick={revealAll} className="px-4 py-2.5 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-medium hover:bg-[var(--gold)]/20 transition-colors">
                    {locale === 'pt' ? 'Revelar todas' : locale === 'en' ? 'Reveal all' : 'Revelar todas'}
                  </button>
                </div>
              )}
            </div>

            {/* ═══════════════ INTERPRETATION ═══════════════ */}
            {phase === 'reading' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-5">

                {/* AI Interpretation */}
                <div className="relative glass-card rounded-2xl p-5 border border-[var(--gold)]/20 overflow-hidden">
                  {/* Decorative glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[radial-gradient(circle,rgba(232,184,82,0.08),transparent)] pointer-events-none" />
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-2">
                      <Wand2 size={16} className="text-[var(--gold)]" />
                      <h3 className="text-sm font-bold text-[var(--gold)]">{t('reading.interpretation')}</h3>
                    </div>

                    {isInterpreting && (
                      <div className="text-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="inline-block"
                        >
                          <Sparkles size={24} className="text-[var(--gold)]" />
                        </motion.div>
                        <p className="text-xs text-[var(--cream)]/50 mt-3">{t('reading.interpreting')}</p>
                      </div>
                    )}

                    {aiInterpretation && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[var(--cream)]/85 leading-relaxed whitespace-pre-line">
                        {aiInterpretation}
                      </motion.div>
                    )}

                    {interpretError && (
                      <div className="text-center space-y-2 py-4">
                        <p className="text-xs text-[var(--mystic-red)]">⚠️ {interpretError}</p>
                        <button onClick={requestAiInterpretation} className="text-xs text-[var(--gold)] hover:underline">
                          {t('reading.retry')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Details Accordion */}
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-[var(--cream)]/40 uppercase tracking-wide">{t('reading.details')}</h3>
                  {drawnCards.map((drawn, index) => {
                    const card = getCardById(drawn.cardId);
                    if (!card) return null;
                    const posName = selectedSpread?.positions[index]?.name || `#${index + 1}`;
                    const isExpanded = expandedCard === index;

                    return (
                      <div key={index} className="glass-card rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedCard(isExpanded ? null : index)}
                          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[var(--gold)]/60 font-medium uppercase w-16 truncate">{posName}</span>
                            <span className="text-sm font-medium text-[var(--cream)]">{getCardName(card, locale)}</span>
                            {drawn.isReversed && (
                              <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full bg-[var(--mystic-red)]/15 text-[var(--mystic-red)] border border-[var(--mystic-red)]/20">{t('reading.reversed')}</span>
                            )}
                          </div>
                          {isExpanded ? <ChevronUp size={14} className="text-[var(--gold)]" /> : <ChevronDown size={14} className="text-[var(--cream)]/30" />}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3.5 pb-4 border-t border-[var(--gold)]/10 pt-3 space-y-3">
                                {(() => {
                                  const tr = getCardMeanings(card.id, locale);
                                  const general = drawn.isReversed ? (tr?.reversed_general || card.reversed.general) : (tr?.general || card.meaning.general);
                                  const love = drawn.isReversed ? (tr?.reversed_love || card.reversed.love) : (tr?.love || card.meaning.love);
                                  const work = drawn.isReversed ? (tr?.reversed_work || card.reversed.work) : (tr?.work || card.meaning.work);
                                  const advice = tr?.advice || card.meaning.advice;
                                  return (
                                    <>
                                      <div>
                                        <p className="text-xs font-medium text-[var(--gold)] mb-1">✦ {t('card.general')}</p>
                                        <p className="text-xs text-[var(--cream)]/75 leading-relaxed">{general}</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <p className="text-xs text-[var(--cream)]/50 flex items-center gap-1"><Heart size={9} /> {t('card.love')}</p>
                                          <p className="text-xs text-[var(--cream)]/65 mt-0.5">{love}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-[var(--cream)]/50 flex items-center gap-1"><Briefcase size={9} /> {t('card.work')}</p>
                                          <p className="text-xs text-[var(--cream)]/65 mt-0.5">{work}</p>
                                        </div>
                                      </div>
                                      <div className="pt-2 border-t border-[var(--gold)]/5">
                                        <p className="text-xs text-[var(--gold)]/80">💡 {advice}</p>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saved}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      saved ? 'bg-green-900/20 text-green-400 border border-green-500/30' : 'glass-card border border-[var(--gold)]/30 text-[var(--gold)] hover:bg-[var(--gold)]/5'
                    }`}
                  >
                    <Save size={15} /> {saved ? t('reading.saved') : t('reading.save')}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={shareReading}
                    className="flex-1 py-3 rounded-xl glass-card border border-[var(--gold)]/30 text-[var(--gold)] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[var(--gold)]/5 transition-all"
                  >
                    <Share2 size={15} /> {t('reading.share')}
                  </motion.button>
                </div>

                {/* New reading */}
                <button onClick={reset} className="w-full py-3 rounded-xl border border-dashed border-[var(--cream)]/20 text-[var(--cream)]/40 text-xs hover:border-[var(--gold)]/30 hover:text-[var(--gold)] transition-all">
                  ✦ {locale === 'pt' ? 'Nova tiragem' : locale === 'en' ? 'New reading' : 'Nueva tirada'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
