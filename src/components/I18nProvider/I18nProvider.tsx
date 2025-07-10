'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { useEffect } from 'react';
import { ReactNode } from 'react';

const SUPPORTED_LANGS = ['pt', 'en', 'es', 'fr', 'it', 'de'];
const COUNTRY_TO_LANG: { [key: string]: string } = {
  'BR': 'pt',
  'PT': 'pt',
  'IT': 'it',
  'ES': 'es',
  'FR': 'fr',
  'DE': 'de',
};

function detectBrowserLang() {
  if (typeof window === 'undefined') return 'en';
  const navLang = navigator.language?.slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(navLang)) return navLang;
  // Tenta detectar pelo país
  const country = (navigator.language?.split('-')[1] || '').toUpperCase();
  if (COUNTRY_TO_LANG[country]) return COUNTRY_TO_LANG[country];
  return 'en';
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let preferredLang = localStorage.getItem('preferredLang');
    if (!preferredLang) {
      preferredLang = detectBrowserLang();
      localStorage.setItem('preferredLang', preferredLang);
    }
    if (i18n.language !== preferredLang) {
      i18n.changeLanguage(preferredLang);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}