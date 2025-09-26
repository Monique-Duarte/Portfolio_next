// src/components/Header/Header.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../Navbar/Navbar';
import LanguageSwitcher from '../Navbar/LanguageSwitcher';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header: FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita renderização no servidor que pode causar inconsistência de tema

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? FaSun : FaMoon;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md transition-colors bg-theme-background/80 backdrop-blur-sm text-theme-font px-4 py-2">
      
      {/* ===== LAYOUT DESKTOP (acima de md) ===== */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between">
        <div className="flex-1 flex justify-start">
          <h2 className="font-bold text-2xl md:text-3xl whitespace-nowrap text-theme-h2">
            {t('header')}
          </h2>
        </div>
        
        <div className="flex-1 flex justify-center">
          <Navbar />
        </div>

        <div className="flex-1 flex items-center justify-end gap-4">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-full transition-colors hover:bg-theme-font/10 text-theme-font"
          >
            <Icon className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>

      {/* ===== LAYOUT MOBILE (abaixo de md) ===== */}
      <div className="flex flex-col md:hidden">
        {/* Primeira linha: Título e Seletor de Tema */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl whitespace-nowrap text-theme-h2">
            {t('header')}
          </h2>
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-full transition-colors hover:bg-theme-font/10 text-theme-font"
          >
            <Icon className="text-xl" />
          </button>
        </div>
        
        {/* Segunda linha: Navegação e Idiomas */}
        <div className="flex justify-between items-center mt-2">
          <Navbar />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;