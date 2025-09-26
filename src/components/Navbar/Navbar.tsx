// src/components/Navbar/Navbar.tsx
'use client';

import { useTranslation } from "react-i18next";
import { useMemo, useState, useEffect } from "react";
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp, FaDownload, FaEye } from 'react-icons/fa';
import React from 'react';
import { createPortal } from 'react-dom';

interface NavbarProps {
  onlyContactMobile?: boolean;
  hideContactMobile?: boolean;
}

const ContactModal = ({ onClose, t }: { onClose: () => void, t: (key: string) => string }) => {
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

  const handleDownload = (filePath: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = filePath;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full flex flex-col items-center animate-fade-in"
        style={{ 
          backgroundColor: 'var(--color-surface)', 
          border: '1px solid var(--color-border)' 
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-2xl font-bold transition-colors cursor-pointer" 
          style={{ color: 'var(--color-text-secondary)' }}
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          {t('navBar.contact')}
        </h2>
        
        <div className="flex gap-6 mb-6">
          <a href="mailto:moniquead95@gmail.com" target="_blank" rel="noopener noreferrer" className="text-3xl transition-colors" style={{ color: 'var(--color-text-secondary)' }} title="Email"><FaEnvelope /></a>
          <a href="https://www.linkedin.com/in/moniquead" target="_blank" rel="noopener noreferrer" className="text-3xl transition-colors" style={{ color: 'var(--color-text-secondary)' }} title="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com/Monique-Duarte" target="_blank" rel="noopener noreferrer" className="text-3xl transition-colors" style={{ color: 'var(--color-text-secondary)' }} title="GitHub"><FaGithub /></a>
          <a href="https://wa.me/19998000818" target="_blank" rel="noopener noreferrer" className="text-3xl transition-colors" style={{ color: 'var(--color-text-secondary)' }} title="WhatsApp"><FaWhatsapp /></a>
        </div>
        
        <div className="w-full pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="grid grid-cols-2 gap-3 w-full">
            <a href="/curriculo-pt.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold shadow-sm transition-colors cursor-pointer" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)'}}>
              <FaEye /> {t('resumeCard.viewPT')}
            </a>
            <a href="/curriculo-en.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold shadow-sm transition-colors cursor-pointer" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)'}}>
              <FaEye /> {t('resumeCard.viewEN')}
            </a>
            <button onClick={() => handleDownload('/curriculo-pt.pdf', 'curriculo-monique-duarte-pt.pdf')} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white font-semibold shadow-md transition-colors cursor-pointer" style={{ backgroundColor: 'var(--color-accent)'}}>
              <FaDownload /> {t('resumeCard.downloadPT')}
            </button>
            <button onClick={() => handleDownload('/curriculo-en.pdf', 'curriculum-monique-duarte-en.pdf')} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white font-semibold shadow-md transition-colors cursor-pointer" style={{ backgroundColor: 'var(--color-accent)'}}>
              <FaDownload /> {t('resumeCard.downloadEN')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return modalRoot ? createPortal(modalContent, modalRoot) : null;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  // O resto do componente Navbar continua exatamente o mesmo...
  const { t, ready } = useTranslation();
  const menuItems = useMemo(() => [
    { link: '#about', labelKey: 'navBar.aboutMe' },
    { link: '#skills', labelKey: 'navBar.skills' },
    { link: '#projects', labelKey: 'navBar.projects' },
  ], []);

  const [mounted, setMounted] = useState(false);
  const [showContact, setShowContact] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !ready) {
    return <nav className="flex items-center space-x-4 h-[28px] animate-pulse"></nav>;
  }

  return (
    <>
      <nav className="flex items-center space-x-2">
        {!props.hideContactMobile && (
          <div className="hidden sm:flex items-center space-x-2">
            {menuItems.map(({ link, labelKey }) => (
              <Link key={link} href={link} className="flex items-center space-x-1 font-medium px-1 py-1 transition-colors duration-200" style={{ color: 'var(--color-text-secondary)'}}>
                <span className='sm:text-lg section-title' suppressHydrationWarning>{t(labelKey)}</span>
              </Link>
            ))}
          </div>
        )}
        {!props.onlyContactMobile && (
          <button onClick={() => setShowContact(true)} className="flex items-center gap-1 px-2 py-1 rounded transition-colors" style={{ color: 'var(--color-text-primary)'}} aria-label={t('navBar.contact')}>
            <FaEnvelope className="text-xl" />
            <span className="hidden sm:inline section-title">{t('navBar.contact')}</span>
          </button>
        )}
         {props.onlyContactMobile && (
          <button onClick={() => setShowContact(true)} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-theme-font/10 transition text-theme-font focus:outline-none" aria-label={t('navBar.contact')}>
            <FaEnvelope className="text-xl" />
          </button>
         )}
      </nav>
      
      {showContact && <ContactModal onClose={() => setShowContact(false)} t={t} />}
    </>
  );
};

export default Navbar;