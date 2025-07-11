'use client';

import { useTranslation } from "react-i18next";
import { useMemo, useState, useEffect } from "react";
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { useRef } from 'react';
import React from 'react';

interface NavbarProps {
  onlyContactMobile?: boolean;
  hideContactMobile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onlyContactMobile = false, hideContactMobile = false }) => {
  const { t, ready } = useTranslation();

  const menuItems = useMemo(() => [
    { link: '#about', labelKey: 'navBar.aboutMe' },
    { link: '#skills', labelKey: 'navBar.skills' },
    { link: '#projects', labelKey: 'navBar.projects' },
  ], []);

  const [mounted, setMounted] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowContact(false);
    }
    if (showContact) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showContact]);

  if (!mounted || !ready) {
    return (
      <nav className="flex items-center space-x-4">
        {(!onlyContactMobile && !hideContactMobile) && menuItems.map((_, index) => (
          <div key={index} className="w-16 h-6 bg-gray-200 animate-pulse rounded dark:bg-dark-background"></div>
        ))}
        <div className="w-16 h-6 bg-gray-200 animate-pulse rounded dark:bg-dark-background"></div>
      </nav>
    );
  }

  // Renderização condicional
  if (onlyContactMobile) {
    return (
      <>
        <button
          onClick={() => setShowContact(true)}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-yellow-100/60 transition text-theme-font focus:outline-none"
          aria-label={t('navBar.contact')}
        >
          <FaEnvelope className="text-xl" />
        </button>
        {showContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm" onClick={() => setShowContact(false)}>
            <div
              ref={modalRef}
              className="relative bg-zinc-100 dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center animate-fade-in"
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-2xl font-bold hover:text-yellow-400" onClick={() => setShowContact(false)}>&times;</button>
              <h2 className="text-2xl font-extrabold mb-4 section-title text-theme-font dark:text-white" style={{textShadow: '0 1px 2px rgba(0,0,0,0.08)'}}>Entre em contato</h2>
              <div className="flex gap-6 mb-6">
                <a href="mailto:seuemail@email.com" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="Email"><FaEnvelope /></a>
                <a href="https://www.linkedin.com/in/seulinkedin" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="LinkedIn"><FaLinkedin /></a>
                <a href="https://github.com/seugithub" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="GitHub"><FaGithub /></a>
                <a href="https://wa.me/5599999999999" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="WhatsApp"><FaWhatsapp /></a>
              </div>
              <div className="flex flex-col gap-2 mt-4 w-full items-center">
                <a
                  href="https://www.canva.com/design/DAGbFqVCpZY/tr96-RNeOi9pec17bPFPuA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-blue-100 text-blue-800 dark:bg-zinc-800 dark:text-blue-200 font-bold shadow hover:bg-blue-200 dark:hover:bg-zinc-700 transition w-full justify-center"
                >
                  {t('contact.viewResume')}
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded bg-yellow-400 text-theme-font dark:text-zinc-900 font-bold shadow hover:bg-yellow-500 transition w-full justify-center"
                >
                  {t('contact.downloadResume')}
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (hideContactMobile) {
    return (
      <nav className="flex items-center space-x-2">
        <div className="hidden sm:flex items-center space-x-2">
          {menuItems.map(({ link, labelKey }) => (
            <Link
              key={link}
              href={link}
              className="flex items-center space-x-1 font-medium px-1 py-1 transition-colors duration-200
                         text-light-text hover:text-link-hover /* Cores Defonic Light */
                         dark:text-dark-text dark:hover:text-link-hover"
            >
              <span className='sm:text-lg section-title' suppressHydrationWarning>{t(labelKey)}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="flex items-center space-x-2">
        <div className="hidden sm:flex items-center space-x-2">
          {menuItems.map(({ link, labelKey }) => (
            <Link
              key={link}
              href={link}
              className="flex items-center space-x-1 font-medium px-1 py-1 transition-colors duration-200
                         text-light-text hover:text-link-hover /* Cores Defonic Light */
                         dark:text-dark-text dark:hover:text-link-hover"
            >
              <span className='sm:text-lg section-title' suppressHydrationWarning>{t(labelKey)}</span>
            </Link>
          ))}
        </div>
        {/* Botão de contato */}
        <button
          onClick={() => setShowContact(true)}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-yellow-100/60 transition text-theme-font focus:outline-none"
          aria-label={t('navBar.contact')}
        >
          <FaEnvelope className="text-xl" />
          <span className="hidden sm:inline section-title">{t('navBar.contact')}</span>
        </button>
      </nav>
      {/* Modal de contato */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm" onClick={() => setShowContact(false)}>
          <div
            ref={modalRef}
            className="relative bg-zinc-100 dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 text-2xl font-bold hover:text-yellow-400" onClick={() => setShowContact(false)}>&times;</button>
            <h2 className="text-2xl font-extrabold mb-4 section-title text-theme-font dark:text-white" style={{textShadow: '0 1px 2px rgba(0,0,0,0.08)'}}>{t('navBar.contact')}</h2>
            <div className="flex gap-6 mb-6">
              <a href="mailto:moniquead95@gmail.com" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="Email"><FaEnvelope /></a>
              <a href="https://www.linkedin.com/in/moniquead" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com/Monique-Duarte" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="GitHub"><FaGithub /></a>
              <a href="https://wa.me/19998000818" target="_blank" rel="noopener noreferrer" className="text-theme-font dark:text-blue-200 hover:text-yellow-500 text-2xl" title="WhatsApp"><FaWhatsapp /></a>
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full items-center">
              <a
                href="https://www.canva.com/design/DAGbFqVCpZY/tr96-RNeOi9pec17bPFPuA/view"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded bg-blue-100 text-blue-800 dark:bg-zinc-800 dark:text-blue-200 font-bold shadow hover:bg-blue-200 dark:hover:bg-zinc-700 transition w-full justify-center"
              >
                {t('contact.viewResume')}
              </a>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded bg-yellow-400 text-theme-font dark:text-zinc-900 font-bold shadow hover:bg-yellow-500 transition w-full justify-center"
              >
                {t('contact.downloadResume')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;