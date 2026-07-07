'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Star, GraduationCap, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const ONBOARDING_KEY = 'tarot-onboarding-done';

interface Step {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}

const steps: Step[] = [
  { icon: <Sparkles size={36} />, titleKey: 'onboarding.step1.title', descKey: 'onboarding.step1.desc' },
  { icon: <BookOpen size={36} />, titleKey: 'onboarding.step2.title', descKey: 'onboarding.step2.desc' },
  { icon: <Star size={36} />, titleKey: 'onboarding.step3.title', descKey: 'onboarding.step3.desc' },
  { icon: <GraduationCap size={36} />, titleKey: 'onboarding.step4.title', descKey: 'onboarding.step4.desc' },
];

export function Onboarding() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY);
    if (!done) {
      setVisible(true);
    }
  }, []);

  const finish = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setVisible(false);
  };

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      finish();
    }
  };

  const skip = () => {
    finish();
  };

  if (!visible) return null;

  const step = steps[current];

  return (
    <AnimatePresence>
      <motion.div
        key="onboarding-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: 'rgba(5, 3, 26, 0.92)', backdropFilter: 'blur(8px)' }}
      >
        {/* Skip button */}
        <button
          onClick={skip}
          className="absolute top-5 right-5 text-[var(--cream)]/40 hover:text-[var(--cream)]/70 transition-colors"
          aria-label="Skip"
        >
          <X size={24} />
        </button>

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-card rounded-3xl p-8 max-w-sm w-full text-center space-y-6"
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--gold)]/10 border border-[var(--gold-line-soft)] flex items-center justify-center text-[var(--gold)]">
            {step.icon}
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--cream)]">{t(step.titleKey)}</h2>
            <p className="text-sm text-[var(--cream)]/70 leading-relaxed">{t(step.descKey)}</p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-[var(--gold)] w-6' : 'bg-[var(--cream)]/20'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {current > 0 && (
              <button
                onClick={() => setCurrent(current - 1)}
                className="flex-1 py-3 rounded-xl border border-[var(--gold-line-soft)] text-[var(--cream)]/70 text-sm font-medium hover:bg-[var(--gold)]/5 transition-colors"
              >
                {t('onboarding.back')}
              </button>
            )}
            <button
              onClick={next}
              className="flex-1 py-3 rounded-xl bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold)] text-sm font-semibold hover:bg-[var(--gold)]/30 transition-colors"
            >
              {current < steps.length - 1 ? t('onboarding.next') : t('onboarding.start')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
