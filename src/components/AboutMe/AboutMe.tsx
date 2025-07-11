'use client';

import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from "react-i18next";
import CardContainer from "../Flip/Flip";
import { AboutTabsContent } from "./AboutTabs";

const WelcomeMessage = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-500 flex justify-center w-full ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
      }`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-theme-font dark:text-white text-center drop-shadow">
        <Typewriter
          words={[t('welcome')]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
    </div>
  );
};

const AboutMe = () => {
  return (
    <section className="w-full overflow-hidden bg-theme-background text-theme-font mt-[-80px] min-h-[90vh] pt-8">
      <div className="w-full max-w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="col-span-1 lg:col-span-3 flex justify-center sm:mt-10">
          <WelcomeMessage />
        </div>
        {/* Imagem/CardContainer */}
        <div className="flex justify-center sm:my-10 xl:my-20 col-span-1">
          <CardContainer />
        </div>
        {/* AboutTabsContent ao lado da imagem só em lg+ */}
        <div className="flex mb-10 xl:my-20 items-center justify-center w-full col-span-1 lg:col-span-2">
          <AboutTabsContent />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;