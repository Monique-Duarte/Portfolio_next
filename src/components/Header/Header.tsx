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

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? FaSun : FaMoon;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md transition-colors bg-theme-background text-theme-font px-4">
      <div className="hidden md:grid grid-cols-3 items-center">
        <div className="flex items-center justify-start gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-full transition-colors bg-light-background hover:bg-light-accent-light/30 dark:bg-dark-background dark:hover:bg-dark-accent-light/30 text-light-icons dark:text-dark-icons"
          >
            <Icon className="text-xl md:text-2xl" />
          </button>
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center">
          <h2 className="font-bold text-3xl whitespace-nowrap text-theme-h2">
            {t('header')}
          </h2>
        </div>

        <div className="flex justify-end">
          <Navbar />
        </div>
      </div>

      <div className="flex flex-col md:hidden gap-2">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold whitespace-nowrap text-theme-h1">
            {t('header')}
          </h2>
        </div>

        <div className="flex items-center gap-4 w-full">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-full transition-colors bg-light-background hover:bg-light-accent-light/30 dark:bg-dark-background dark:hover:bg-dark-accent-light/30 text-light-icons dark:text-dark-icons"
          >
            <Icon className="text-xl" />
          </button>
          <LanguageSwitcher />
          <div className="flex-1" />
          {/* Botão de contato mobile */}
          <Navbar onlyContactMobile />
        </div>

        <div className="flex justify-center">
          <Navbar hideContactMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;