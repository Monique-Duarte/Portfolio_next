"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface Language {
  value: string;
  img: string;
  label: string;
}

const languages: Language[] = [
  { value: "pt", img: "/images/assets/br.svg", label: "PT" },
  { value: "en", img: "/images/assets/en.svg", label: "US" },
  { value: "es", img: "/images/assets/es.svg", label: "ES" },
  { value: "fr", img: "/images/assets/fr.svg", label: "FR" },
  { value: "it", img: "/images/assets/it.svg", label: "IT" },
  { value: "de", img: "/images/assets/de.svg", label: "DU" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = useMemo<Language>(() => {
    return languages.find((lang) => lang.value === i18n.language) || languages[0];
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    if (lang !== currentLang.value) {
      i18n.changeLanguage(lang);
      localStorage.setItem("preferredLang", lang);
    }
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="inline-flex items-center space-x-2"
      ref={dropdownRef}
      style={{ minWidth: "100px" }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Idioma atual: ${currentLang.label}`}
        className="flex items-center focus:outline-none"
      >
        <Image
          src={currentLang.img}
          alt={currentLang.label}
          width={20}
          height={20}
          className="w-5 h-5 md:w-6 md:h-6 rounded cursor-pointer m-1"
        />
      </button>

      {open &&
        languages
          .filter((lang) => lang.value !== currentLang.value)
          .map((lang) => (
            <button
              key={lang.value}
              onClick={() => changeLanguage(lang.value)}
              className="focus:outline-none"
              aria-label={`Mudar para ${lang.label}`}
            >
              <Image
                src={lang.img}
                alt={lang.label}
                width={20}
                height={20}
                className="w-5 h-5 md:w-6 md:h-6 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
              />
            </button>
          ))}
    </div>
  );
};

export default LanguageSwitcher; 