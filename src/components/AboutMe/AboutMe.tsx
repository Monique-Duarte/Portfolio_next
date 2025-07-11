'use client';

import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from "react-i18next";
import CardContainer from "../Flip/Flip";
import { AboutTabsTabs, AboutTabsContent } from "./AboutTabs";

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
  const [activeTab, setActiveTab] = useState('quem');
  return (
    <section className="w-full overflow-hidden bg-theme-background text-theme-font mt-[-80px] min-h-[90vh] pt-8">
      <div className="w-full max-w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="col-span-1 lg:col-span-3 flex justify-center sm:my-10">
          <WelcomeMessage />
        </div>
        <div className="flex justify-center sm:my-10 xl:my-20">
          <CardContainer />
        </div>
        <div className="flex sm:my-15 xl:my-25 flex-col gap-4 items-center text-base md:text-lg lg:text-xl xl:text-2xl">
          <AboutTabsTabs active={activeTab} setActive={setActiveTab} />
        </div>
        {/* Resposta (AboutTabsContent) */}
        <div className="flex my-10 xl:my-20 items-center justify-center text-base md:text-lg lg:text-xl xl:text-2xl">
          <AboutTabsContent active={activeTab} />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;