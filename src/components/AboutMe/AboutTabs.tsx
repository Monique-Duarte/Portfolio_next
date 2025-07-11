'use client';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

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
  // Estado para controlar exibição do modal de trajetória
  const [showTrajetoriaModal, setShowTrajetoriaModal] = useState(false);

  // Fecha modal com ESC
  useEffect(() => {
    if (!showTrajetoriaModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowTrajetoriaModal(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showTrajetoriaModal]);

  // Pega os blocos da trajetória
  const blocos = t('sobre.trajetoria.blocos', { returnObjects: true }) as Array<{ titulo: string, texto: string }>;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {tabs.map(tab => (
        <div key={tab.key} className="w-full">
          <button
            className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition-all duration-200 border-2 focus:outline-none flex justify-between items-center bg-theme-background/80 border-theme-accent-dark/30 text-theme-font/80 hover:scale-[1.01] hover:border-theme-accent-dark/60 cursor-pointer md:text-lg text-base ${openTab === tab.key ? 'border-theme-accent-dark bg-theme-background/95 text-theme-font shadow-lg ring-2 ring-[var(--color-font-primary)]' : ''}`}
            onClick={() => {
              if (tab.key === 'trajetoria') {
                setShowTrajetoriaModal(true);
              } else {
                setOpenTab(openTab === tab.key ? null : tab.key);
              }
            }}
            aria-expanded={openTab === tab.key}
          >
            <span>{t(tab.labelKey)}</span>
            {tab.key !== 'trajetoria' && (
              <span
                className={`ml-2 transition-transform duration-300 ${openTab === tab.key ? 'rotate-90' : 'rotate-0'}`}
                style={{ color: 'var(--color-seta-contraste)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <polygon points="6,4 15,10 6,16" />
                </svg>
              </span>
            )}
          </button>
          {/* Conteúdo da aba */}
          {openTab === tab.key && tab.key !== 'trajetoria' && (
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out max-h-[300px] opacity-100 p-5 bg-gradient-to-br from-theme-background/90 to-theme-accent-dark/30 rounded-b-xl text-theme-text border-l-4 border-theme-accent-dark border border-theme-accent-dark/20 animate-fade-in md:text-base text-sm"
              style={{ borderLeftColor: 'var(--color-font-primary)' }}
            >
              {t(tab.contentKey)}
            </div>
          )}
          {/* Conteúdo especial para trajetória */}
          {openTab === 'trajetoria' && tab.key === 'trajetoria' && (
            <></>
          )}
        </div>
      ))}

      {/* Modal Trajetória - mostra todos os blocos lado a lado */}
      {showTrajetoriaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowTrajetoriaModal(false)}>
          <div
            className="relative rounded-2xl shadow-2xl p-8 max-w-6xl w-full border-2 border-[var(--color-font-primary)] animate-fade-in bg-[var(--color-bg-primary)] text-[var(--color-font-primary)] dark:bg-black/80 dark:text-theme-font"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-4 right-4 text-2xl font-bold hover:text-[var(--color-seta-contraste)] focus:outline-none"
              onClick={() => setShowTrajetoriaModal(false)}
              aria-label="Fechar"
            >
              &times;
            </button>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-theme-font text-center">Minha trajetória</h3>
            <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
              {blocos.map((bloco, idx) => (
                <div key={idx} className="flex-1 bg-gradient-to-br from-theme-background/90 to-theme-accent-dark/30 rounded-xl p-6 shadow-md border border-theme-accent-dark/20 flex flex-col items-center animate-fade-in">
                  <h4 className="text-lg md:text-xl font-bold mb-3 text-theme-font text-center">{bloco.titulo}</h4>
                  <p className="text-base md:text-lg text-theme-text text-center">{bloco.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 