'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const tabs = [
  { key: 'quem', labelKey: 'sobre.sobre', contentKey: 'sobre.quemEuSou' },
  { key: 'oque', labelKey: 'sobre.oQueFaco', contentKey: 'sobre.atualmente' },
  { key: 'objetivos', labelKey: 'sobre.quaisObj', contentKey: 'sobre.objetivos' },
  { key: 'trajetoria', labelKey: 'sobre.qualtrajetoria', contentKey: 'sobre.trajetoria' },
];

export default function AboutTabs() {
  const [active, setActive] = useState('quem');
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs em linha, pill, centralizadas */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border-2 focus:outline-none
              ${active === tab.key
                ? 'bg-theme-background/90 border-theme-accent-dark text-theme-font shadow-lg scale-105'
                : 'bg-theme-background/60 border-theme-accent-dark/30 text-theme-font/60 hover:scale-105 hover:border-theme-accent-dark/60'}
            `}
            style={{boxShadow: active === tab.key ? '0 2px 16px 0 rgba(0,0,0,0.08)' : undefined}}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>
      {/* Box animado, gradiente, sombra, sem max-height ou scroll */}
      <div className="w-full max-w-2xl min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {tabs.map(tab => (
            active === tab.key && (
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-gradient-to-br from-theme-background/90 to-theme-accent-dark/30 rounded-2xl p-8 shadow-xl text-theme-text border border-theme-accent-dark/20"
                style={{backdropFilter: 'blur(2px)'}}
              >
                {t(tab.contentKey)}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 