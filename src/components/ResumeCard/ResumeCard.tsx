'use client';

import { useTranslation } from 'react-i18next';
import { FaEye, FaDownload, FaFilePdf } from 'react-icons/fa';

const ResumeCard = () => {
  const { t } = useTranslation();

  const handleDownload = (filePath: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = filePath;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="w-full flex justify-center py-12">
      <div className="w-full max-w-4xl mx-auto bg-surface p-6 md:p-8 rounded-2xl shadow-lg border border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Lado Esquerdo: Título e Status */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              {t('resumeCard.title')}
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span>{t('resumeCard.status')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <a
              href="/curriculo-pt.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-primary font-semibold shadow-sm hover:bg-theme-font/5 transition-all duration-200"
            >
              <FaEye />
              {t('resumeCard.viewPT')}
            </a>
            <a
              href="/curriculo-en.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-primary font-semibold shadow-sm hover:bg-theme-font/5 transition-all duration-200"
            >
              <FaEye />
              {t('resumeCard.viewEN')}
            </a>

             <button
              onClick={() => handleDownload('/curriculo-pt.pdf', 'curriculo-monique-duarte-pt.pdf')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent font-semibold shadow-md hover:bg-accent-hover transition-all duration-200 cursor-pointer"
              style={{ color: 'var(--color-button-text)' }}
            >
              <FaDownload />
              {t('resumeCard.downloadPT')}
            </button>
            <button
              onClick={() => handleDownload('/curriculo-en.pdf', 'curriculum-monique-duarte-en.pdf')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent font-semibold shadow-md hover:bg-accent-hover transition-all duration-200 cursor-pointer"
              style={{ color: 'var(--color-button-text)' }}
            >
              <FaDownload />
              {t('resumeCard.downloadEN')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeCard;