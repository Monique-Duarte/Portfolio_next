'use client';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const tabs = [
  { key: 'quem', labelKey: 'sobre.sobre', contentKey: 'sobre.quemEuSou' },
  { key: 'oque', labelKey: 'sobre.oQueFaco', contentKey: 'sobre.atualmente' },
  { key: 'objetivos', labelKey: 'sobre.quaisObj', contentKey: 'sobre.objetivos' },
  { key: 'trajetoria', labelKey: 'sobre.qualtrajetoria', contentKey: 'sobre.trajetoria' },
];

export function AboutTabsTabs({ active, setActive }: { active: string, setActive: (key: string) => void }) {
  const { t } = useTranslation();
  return (
    <>
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
    </>
  );
}

export function AboutTabsContent() {
  const { t } = useTranslation();
  // Estado para controlar quais abas estão abertas
  const [openTab, setOpenTab] = useState<string | null>(null);
  // Estado para controlar quais blocos da trajetória estão abertos
  const [openTrajetoria, setOpenTrajetoria] = useState<number | null>(null);

  // Pega os blocos da trajetória
  const blocos = t('sobre.trajetoria.blocos', { returnObjects: true }) as Array<{ titulo: string, texto: string }>;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {tabs.map(tab => (
        <div key={tab.key} className="w-full">
          <button
            className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition-all duration-200 border-2 focus:outline-none flex justify-between items-center bg-theme-background/80 border-theme-accent-dark/30 text-theme-font/80 hover:scale-[1.01] hover:border-theme-accent-dark/60 ${openTab === tab.key ? 'border-theme-accent-dark bg-theme-background/95 text-theme-font shadow-lg' : ''}`}
            onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
            aria-expanded={openTab === tab.key}
          >
            <span>{t(tab.labelKey)}</span>
            <span
              className={`ml-2 transition-transform ${openTab === tab.key ? 'rotate-90' : 'rotate-0'}`}
              style={{ color: 'var(--color-seta-contraste)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <polygon points="6,4 15,10 6,16" />
              </svg>
            </span>
          </button>
          {/* Conteúdo da aba */}
          {openTab === tab.key && tab.key !== 'trajetoria' && (
            <div className="p-5 bg-gradient-to-br from-theme-background/90 to-theme-accent-dark/30 rounded-b-xl text-theme-text border border-theme-accent-dark/20 animate-fade-in">
              {t(tab.contentKey)}
            </div>
          )}
          {/* Conteúdo especial para trajetória */}
          {openTab === 'trajetoria' && tab.key === 'trajetoria' && (
            <div className="flex flex-col gap-3 mt-2">
              {blocos.map((bloco, idx) => (
                <div key={idx} className="w-full">
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 border focus:outline-none flex justify-between items-center bg-theme-background/70 border-theme-accent-dark/20 text-theme-font/80 hover:scale-[1.01] hover:border-theme-accent-dark/40 ${openTrajetoria === idx ? 'border-theme-accent-dark bg-theme-background/90 text-theme-font shadow' : ''}`}
                    onClick={() => setOpenTrajetoria(openTrajetoria === idx ? null : idx)}
                    aria-expanded={openTrajetoria === idx}
                  >
                    <span>{bloco.titulo}</span>
                    <span
                      className={`ml-2 transition-transform ${openTrajetoria === idx ? 'rotate-90' : 'rotate-0'}`}
                      style={{ color: 'var(--color-seta-contraste)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <polygon points="6,4 15,10 6,16" />
                      </svg>
                    </span>
                  </button>
                  {openTrajetoria === idx && (
                    <div className="p-4 bg-gradient-to-br from-theme-background/95 to-theme-accent-dark/20 rounded-b-lg text-theme-text border border-theme-accent-dark/10 animate-fade-in">
                      {bloco.texto}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 