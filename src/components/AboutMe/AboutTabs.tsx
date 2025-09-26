// src/components/AboutMe/AboutTabs.tsx
'use client';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TFunction } from 'i18next'; // 1. IMPORTE O TIPO TFunction

const tabs = [
  { key: 'quem', labelKey: 'sobre.sobre', contentKey: 'sobre.quemEuSou' },
  { key: 'oque', labelKey: 'sobre.oQueFaco', contentKey: 'sobre.atualmente' },
  { key: 'objetivos', labelKey: 'sobre.quaisObj', contentKey: 'sobre.objetivos' },
  { key: 'trajetoria', labelKey: 'sobre.qualtrajetoria', contentKey: 'sobre.trajetoria' },
];

// 2. USE O TIPO CORRETO (TFunction) PARA A PROP t
const TrajectoryModal = ({ onClose, t }: { onClose: () => void, t: TFunction }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const blocosRaw = t('sobre.trajetoria.blocos', { returnObjects: true });
  const blocos = Array.isArray(blocosRaw) ? blocosRaw : [];

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div
        className="relative rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl w-full border animate-fade-in"
        style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderColor: 'var(--color-border)', 
          color: 'var(--color-text-primary)' 
        }}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="absolute top-4 right-4 text-2xl font-bold transition-colors cursor-pointer"
          style={{ color: 'var(--color-text-secondary)' }}
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: 'var(--color-text-primary)' }}>
          {t('sobre.qualtrajetoria')}
        </h3>
        <div className="flex flex-col md:flex-row md:gap-6 gap-4 items-stretch justify-center">
          {blocos.map((bloco: { titulo: string; texto: string }, idx: number) => (
            <div 
              key={idx} 
              className="flex-1 rounded-xl p-6 shadow-md border flex flex-col items-center"
              style={{ 
                backgroundColor: 'var(--color-background)', 
                borderColor: 'var(--color-border)' 
              }}
            >
              <h4 className="text-lg md:text-xl font-bold mb-3 text-center" style={{ color: 'var(--color-text-primary)' }}>{bloco.titulo}</h4>
              <p className="text-base text-center" style={{ color: 'var(--color-text-secondary)' }}>{bloco.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return modalRoot ? createPortal(modalContent, modalRoot) : null;
};


export function AboutTabsContent() {
  const { t } = useTranslation();
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [showTrajetoriaModal, setShowTrajetoriaModal] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {tabs.map(tab => (
        <div key={tab.key} className="w-full">
          <button
            className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition-all duration-200 border-2 focus:outline-none flex justify-between items-center bg-surface border-border text-text-secondary hover:scale-[1.01] hover:border-accent/60 cursor-pointer md:text-lg text-base ${openTab === tab.key ? 'border-accent text-text-primary shadow-lg' : ''}`}
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
              <span className={`ml-2 transition-transform duration-300 ${openTab === tab.key ? 'rotate-90' : 'rotate-0'}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><polygon points="6,4 15,10 6,16" /></svg>
              </span>
            )}
          </button>
          {openTab === tab.key && tab.key !== 'trajetoria' && (
            <div className="overflow-hidden p-5 bg-surface rounded-b-xl text-text-secondary border-l-4 border-accent animate-fade-in md:text-base text-sm">
              {t(tab.contentKey)}
            </div>
          )}
        </div>
      ))}

      {showTrajetoriaModal && <TrajectoryModal onClose={() => setShowTrajetoriaModal(false)} t={t} />}
    </div>
  );
}