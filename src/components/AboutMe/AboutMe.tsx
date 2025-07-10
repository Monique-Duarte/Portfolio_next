'use client';

import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from "react-i18next";
import CardContainer from "../Flip/Flip";
import AboutTabs from "./AboutTabs";

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
      className={`transition-all duration-500 flex justify-center w-full mb-8 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-theme-font dark:text-white text-center drop-shadow">
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
    <section className="w-full overflow-hidden bg-theme-background text-theme-font mt-[-80px]">
      <div className="w-[90vw] lg:w-[80vw] mx-auto px-4">
        <WelcomeMessage />
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 w-full">
          <CardContainer />
          <div className="flex-1 w-full max-w-[90vw] md:max-w-full mx-auto px-2 md:px-0">
            <AboutTabs />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;