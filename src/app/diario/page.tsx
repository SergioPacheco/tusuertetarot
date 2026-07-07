'use client';

import { useState, useEffect } from 'react';
import { Heart, Trash2, Calendar, Sparkles } from 'lucide-react';
import { getCardById, spreads } from '@/data';
import { Reading } from '@/data/types';
import { getAllReadings, updateReading, deleteReading as dbDeleteReading, migrateFromLocalStorage } from '@/lib/db';
import { useI18n } from '@/lib/i18n';
import { getCardName } from '@/data/card-names-i18n';
import Link from 'next/link';

export default function DiarioPage() {
  const { t, locale } = useI18n();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await migrateFromLocalStorage();
      const data = await getAllReadings();
      setReadings(data);
      setLoading(false);
    }
    load();
  }, []);

  const toggleFavorite = async (id: string) => {
    const reading = readings.find(r => r.id === id);
    if (!reading) return;
    const updated = { ...reading, isFavorite: !reading.isFavorite };
    await updateReading(updated);
    setReadings(readings.map(r => r.id === id ? updated : r));
  };

  const handleDelete = async (id: string) => {
    await dbDeleteReading(id);
    setReadings(readings.filter(r => r.id !== id));
  };

  const filtered = filter === 'favorites' ? readings.filter(r => r.isFavorite) : readings;

  if (loading) {
    return (
      <div className="text-center py-12">
        <Sparkles size={24} className="mx-auto animate-pulse text-[var(--gold)]" />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in pb-6">
      <header className="text-center">
        <h1 className="text-xl font-bold text-[var(--gold)]">{t('diary.title')}</h1>
        <p className="text-xs text-[var(--cream)]/50">{t('diary.subtitle')}</p>
      </header>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filter === 'all' ? 'bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40' : 'text-[var(--cream)]/60 border border-transparent'}`}
        >
          {t('diary.all')} ({readings.length})
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${filter === 'favorites' ? 'bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40' : 'text-[var(--cream)]/60 border border-transparent'}`}
        >
          <Heart size={12} /> {t('diary.favorites')}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <Sparkles size={32} className="text-[var(--gold)]/30 mx-auto mb-3" />
          <p className="text-sm text-[var(--cream)]/60">
            {filter === 'favorites' ? t('diary.emptyFav') : t('diary.empty')}
          </p>
          <Link href="/tirada" className="inline-block mt-3 text-xs text-[var(--gold)] hover:underline">
            {t('diary.firstReading')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((reading) => {
            const spread = spreads.find(s => s.id === reading.spread);
            const date = new Date(reading.date);
            return (
              <div key={reading.id} className="glass-card rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-[var(--cream)]/40" />
                    <span className="text-xs text-[var(--cream)]/50">
                      {date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => toggleFavorite(reading.id)} className="p-1 hover:scale-110 transition-transform">
                      <Heart size={14} className={reading.isFavorite ? 'fill-[var(--gold)] text-[var(--gold)]' : 'text-[var(--cream)]/30'} />
                    </button>
                    <button onClick={() => handleDelete(reading.id)} className="p-1 hover:scale-110 transition-transform">
                      <Trash2 size={14} className="text-[var(--cream)]/30 hover:text-red-400" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-[var(--cream)]">{spread?.name || reading.spread}</h3>
                {reading.question && (
                  <p className="text-xs text-[var(--cream)]/50 italic">&ldquo;{reading.question}&rdquo;</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {reading.cards.map((drawn, i) => {
                    const card = getCardById(drawn.cardId);
                    return (
                      <span key={i} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-[var(--purple-light)]/40 text-[var(--cream)]/70 border border-[var(--gold)]/10">
                        {card ? getCardName(card, locale) : '?'}{drawn.isReversed ? ' ↓' : ''}
                      </span>
                    );
                  })}
                </div>
                {reading.notes && (
                  <details className="pt-1">
                    <summary className="text-xs text-[var(--gold)]/70 cursor-pointer hover:text-[var(--gold)]">
                      Ver interpretación guardada
                    </summary>
                    <p className="text-xs text-[var(--cream)]/70 mt-1.5 leading-relaxed whitespace-pre-line">
                      {reading.notes}
                    </p>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
