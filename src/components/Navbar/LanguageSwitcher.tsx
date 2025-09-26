"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface Language {
  value: string;
  img: string;
  label: string;
}

const languages: Language[] = [
  { value: "pt", img: "/images/assets/br.svg", label: "PT" },
  { value: "en", img: "/images/assets/en.svg", label: "EN" },
  { value: "es", img: "/images/assets/es.svg", label: "ES" },
  { value: "fr", img: "/images/assets/fr.svg", label: "FR" },
  { value: "it", img: "/images/assets/it.svg", label: "IT" },
  { value: "de", img: "/images/assets/de.svg", label: "DE" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLang = useMemo<Language>(() => {
    return languages.find((lang) => lang.value === i18n.language) || languages[0];
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    if (lang !== currentLang.value) {
      i18n.changeLanguage(lang);
      localStorage.setItem("preferredLang", lang);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {languages.map((lang) => (
        <button
          key={lang.value}
          onClick={() => changeLanguage(lang.value)}
          className={`flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent-dark focus:ring-offset-theme-background ${
            currentLang.value === lang.value
              ? "bg-theme-font/10 ring-2 ring-theme-font/50"
              : "opacity-60 hover:opacity-100 hover:bg-theme-font/10"
          }`}
          aria-label={`Mudar para ${lang.label}`}
        >
          <div className="hidden md:flex items-center gap-1.5">
          <Image
            src={lang.img}
            alt={lang.label}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
          />
          <span className={`font-semibold text-sm pr-1 transition-all duration-300 ${currentLang.value === lang.value ? 'block' : 'hidden md:group-hover:block'}`}>
             {lang.label}
          </span>
        </div>

        {/* Apenas Texto - VISÍVEL APENAS EM MOBILE (abaixo de md) */}
          <div className="flex md:hidden items-center justify-center">
            <span className="font-bold text-sm">
              {lang.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;