'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Shuffle, ChevronDown, ChevronUp } from 'lucide-react';
import { allCards, getCardById } from '@/data';
import { useI18n } from '@/lib/i18n';
import { getCardName } from '@/data/card-names-i18n';
import { getCardKeywords } from '@/data/card-keywords-i18n';
import { getCardMeanings } from '@/data/card-meanings-i18n';
import { getCombinationText } from '@/data/combinations-i18n';
import { generateCombinationMeaning } from '@/data/combination-generator';
import { getTechniques } from '@/data/study-i18n';
import { getTranslatedSpreads } from '@/data/spreads-i18n';
import { TarotCardDisplay } from '@/components/TarotCard';
import { IconSpark, IconHeart, IconCard } from '@/components/AurevaIcons';
import Link from 'next/link';

type Tab = 'techniques' | 'combinations' | 'practice';

export default function EstudioPage() {
  const { t, locale } = useI18n();
  const techniques = getTechniques(locale);
  const spreads = getTranslatedSpreads(locale);

  const [activeTab, setActiveTab] = useState<Tab>('techniques');
  const [expandedTechnique, setExpandedTechnique] = useState<number | null>(0);
  const [selectedCard1, setSelectedCard1] = useState<number | null>(null);
  const [selectedCard2, setSelectedCard2] = useState<number | null>(null);
  const [practiceCard, setPracticeCard] = useState<number | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);

  const card1 = selectedCard1 !== null ? getCardById(selectedCard1) : null;
  const card2 = selectedCard2 !== null ? getCardById(selectedCard2) : null;
  const combinationFromCard1 = card1?.combinations.find((c) => c.cardId === selectedCard2);
  const combinationFromCard2 = card2?.combinations.find((c) => c.cardId === selectedCard1);
  const combination = combinationFromCard1 || combinationFromCard2;
  const combinationOwnerId = combinationFromCard1 ? card1!.id : card2?.id ?? 0;
  const combinationTargetId = combinationFromCard1 ? (selectedCard2 ?? 0) : (selectedCard1 ?? 0);
  const pCard = practiceCard !== null ? getCardById(practiceCard) : null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero header */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gold)]/20 to-[var(--violet-mid)] border border-[var(--gold-line)]">
          <IconSpark size={28} />
        </div>
        <h1 className="text-3xl font-bold text-[var(--cream)]">{t('study.title')}</h1>
        <p className="text-base text-[var(--cream)]/50 max-w-md mx-auto">{t('study.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-[var(--violet)]/40 rounded-2xl p-1.5">
        <TabBtn active={activeTab === 'techniques'} onClick={() => setActiveTab('techniques')} icon={<BookOpen size={16} />}>{t('study.techniques')}</TabBtn>
        <TabBtn active={activeTab === 'combinations'} onClick={() => setActiveTab('combinations')} icon={<Layers size={16} />}>{t('study.combinations')}</TabBtn>
        <TabBtn active={activeTab === 'practice'} onClick={() => setActiveTab('practice')} icon={<Shuffle size={16} />}>{t('study.practice')}</TabBtn>
      </div>

      {/* ═══ TECHNIQUES ═══ */}
      {activeTab === 'techniques' && (
        <div className="space-y-4">
          {techniques.map((tech, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button onClick={() => setExpandedTechnique(expandedTechnique === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left">
                <span className="text-base font-semibold text-[var(--cream)]">{tech.title}</span>
                {expandedTechnique === i ? <ChevronUp size={18} className="text-[var(--gold)]" /> : <ChevronDown size={18} className="text-[var(--cream)]/40" />}
              </button>
              {expandedTechnique === i && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 text-sm text-[var(--cream)]/80 leading-relaxed whitespace-pre-line border-t border-[var(--gold)]/10 pt-4">
                  {tech.content}
                </motion.div>
              )}
            </div>
          ))}

          {/* Spreads list */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <IconCard size={20} />
              <h3 className="text-lg font-bold text-[var(--gold)]">{t('study.spreads')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {spreads.filter(s => s.id !== 'free').map((spread) => (
                <div key={spread.id} className="p-3 rounded-xl bg-[var(--ink)]/40 border border-[var(--gold-line-soft)]">
                  <p className="text-sm font-semibold text-[var(--cream)]">{spread.name}</p>
                  <p className="text-xs text-[var(--cream)]/50 mt-1">{spread.description}</p>
                  <span className="text-xs text-[var(--gold)] mt-2 inline-block">{spread.numCards} {t('reading.cards')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ COMBINATIONS ═══ */}
      {activeTab === 'combinations' && (
        <div className="space-y-5">
          <p className="text-base text-[var(--cream)]/60 text-center">{t('study.combineIntro')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-[var(--gold)] font-medium uppercase tracking-wide">
                {locale === 'pt' ? 'Carta 1' : locale === 'en' ? 'Card 1' : 'Carta 1'}
              </label>
              <select value={selectedCard1 ?? ''} onChange={(e) => setSelectedCard1(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-3 rounded-xl bg-[var(--ink)]/60 border border-[var(--gold)]/20 text-sm text-[var(--cream)] focus:border-[var(--gold)]/50 focus:outline-none">
                <option value="">{t('study.select')}</option>
                {allCards.map((c) => <option key={c.id} value={c.id}>{getCardName(c, locale)}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[var(--gold)] font-medium uppercase tracking-wide">
                {locale === 'pt' ? 'Carta 2' : locale === 'en' ? 'Card 2' : 'Carta 2'}
              </label>
              <select value={selectedCard2 ?? ''} onChange={(e) => setSelectedCard2(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-3 rounded-xl bg-[var(--ink)]/60 border border-[var(--gold)]/20 text-sm text-[var(--cream)] focus:border-[var(--gold)]/50 focus:outline-none">
                <option value="">{t('study.select')}</option>
                {allCards.map((c) => <option key={c.id} value={c.id}>{getCardName(c, locale)}</option>)}
              </select>
            </div>
          </div>

          {card1 && card2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-center gap-4">
                <TarotCardDisplay card={card1} size="sm" />
                <span className="text-2xl text-[var(--gold)]">+</span>
                <TarotCardDisplay card={card2} size="sm" />
              </div>
              <div className="text-center">
                <p className="text-lg text-[var(--gold)] font-semibold">{getCardName(card1, locale)} + {getCardName(card2, locale)}</p>
                <p className="text-sm text-[var(--cream)]/80 leading-relaxed mt-2">{combination ? getCombinationText(combinationOwnerId, combinationTargetId, combination.meaning, locale) : generateCombinationMeaning(card1, card2, locale)}</p>
              </div>
            </motion.div>
          )}

          {card1 && card1.combinations.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--cream)]/60">{t('study.knownCombinations')} {getCardName(card1, locale)}:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {card1.combinations.map((comb) => {
                  const other = getCardById(comb.cardId);
                  return (
                    <div key={comb.cardId} className="glass-card rounded-xl p-3">
                      <p className="text-xs text-[var(--gold)] font-medium">+ {other ? getCardName(other, locale) : '?'}</p>
                      <p className="text-xs text-[var(--cream)]/60 mt-1 leading-relaxed">{getCombinationText(card1.id, comb.cardId, comb.meaning, locale)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ PRACTICE ═══ */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 text-center space-y-4">
            <IconHeart size={32} />
            <p className="text-base text-[var(--cream)]/70 max-w-sm mx-auto">{t('study.practiceIntro')}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setPracticeCard(Math.floor(Math.random() * allCards.length)); setShowMeaning(false); }}
              className="btn-gold"
            >
              <span className="shimmer"></span>
              <Shuffle size={16} />{t('study.drawPractice')}
            </motion.button>
          </div>

          {pCard && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <TarotCardDisplay card={pCard} size="md" />
                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-xl font-bold text-[var(--cream)]">{getCardName(pCard, locale)}</h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                    {getCardKeywords(pCard, locale).map((kw) => (
                      <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold-line-soft)]">{kw}</span>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--cream)]/50 italic">
                    {locale === 'pt' ? 'O que esta carta transmite para você?' : locale === 'en' ? 'What does this card convey to you?' : '¿Qué te transmite esta carta?'}
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <button onClick={() => setShowMeaning(!showMeaning)} className="text-sm text-[var(--gold)] hover:underline font-medium">
                  {showMeaning ? t('study.hideMeaning') : t('study.showMeaning')}
                </button>
              </div>

              {showMeaning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-[var(--gold)]/10 pt-4 space-y-3">
                  <p className="text-sm text-[var(--cream)]/85 leading-relaxed">{(() => { const tr = getCardMeanings(pCard.id, locale); return tr?.general || pCard.meaning.general; })()}</p>
                  <Link href={`/biblioteca/${pCard.id}`} className="text-sm text-[var(--gold)] hover:underline inline-block">{t('study.fullCard')}</Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[var(--gold)]/15 text-[var(--gold)] shadow-sm' : 'text-[var(--cream)]/50 hover:text-[var(--cream)]/80'}`}>
      {icon} {children}
    </button>
  );
}
