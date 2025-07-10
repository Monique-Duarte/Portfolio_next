'use client';

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from 'next/navigation';

const Translate = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const supportedLanguages = useMemo(() => ['pt', 'en', 'es', 'fr', 'it', 'de'], []);

  useEffect(() => {
    let initialLanguage = i18n.language;

    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      initialLanguage = savedLanguage;
    } else {
      if (typeof window !== 'undefined' && navigator.language) {
        const browserLanguage = navigator.language.split('-')[0];
        if (supportedLanguages.includes(browserLanguage)) {
          initialLanguage = browserLanguage;
        }
      }
      const pathSegments = pathname.split("/");
      const pathLanguage = pathSegments[1];
      if (pathLanguage && supportedLanguages.includes(pathLanguage) && supportedLanguages.includes(pathLanguage) && pathLanguage !== initialLanguage) {
        initialLanguage = pathLanguage;
      }
    }

    if (initialLanguage && initialLanguage !== i18n.language) {
      i18n.changeLanguage(initialLanguage);
      setCurrentLanguage(initialLanguage);
    } else {
      setCurrentLanguage(i18n.language);
    }

  }, [i18n, pathname, supportedLanguages]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem('userLanguage', newLanguage);

    const segments = pathname.split('/');
    if (segments[1] && supportedLanguages.includes(segments[1])) {
      segments[1] = newLanguage;
    } else {
      segments.splice(1, 0, newLanguage);
    }
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <div>
      <select onChange={handleLanguageChange} value={currentLanguage}>
        {supportedLanguages.map(lang => (
          <option key={lang} value={lang}>
            {t(`common:language_${lang}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Translate;