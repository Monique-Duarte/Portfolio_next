'use client';

import { useTranslation } from "react-i18next";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiFirebase, SiI18Next, SiNextdotjs } from "react-icons/si";
import { SiIonic } from "react-icons/si";
import { useMemo, useState, useRef, useEffect } from "react";

type SkillsProps = {
  onTechSelect?: (techId: string) => void;
  selectedTech?: string;
  modoLista?: boolean;
};

export default function Skills({ onTechSelect, selectedTech, modoLista }: SkillsProps) {
  const { t } = useTranslation();

  const techs = useMemo(() => [
    { name: "React", icon: <FaReact size={32} color="#61dafb" />, id: "react", level: t("advanced") },
    { name: "Next.js", icon: <SiNextdotjs size={32} color="#000" />, id: "nextjs", level: t("basic") },
    { name: "JavaScript", icon: <FaJsSquare size={32} color="#f7df1e" />, id: "js", level: t("intermediate") },
    { name: "TypeScript", icon: <SiTypescript size={32} color="#3178c6" />, id: "ts", level: t("intermediate") },
    { name: "HTML", icon: <FaHtml5 size={32} color="#e34c26" />, id: "html", level: t("advanced") },
    { name: "CSS", icon: <FaCss3Alt size={32} color="#1572b6" />, id: "css", level: t("advanced") },
    { name: "Node.js", icon: <FaNodeJs size={32} color="#3c873a" />, id: "node", level: t("intermediate") },
    { name: "Firebase", icon: <SiFirebase size={32} color="#ffa000" />, id: "firebase", level: t("intermediate") },
    { name: "i18n", icon: <SiI18Next size={32} color="#0066cc" />, id: "i18n", level: t("intermediate") },
    { name: "Ionic", icon: <SiIonic size={32} color="#3880ff" />, id: "ionic", level: t("basic") },
  ], [t]);

  const [baseAngle, setBaseAngle] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (selectedTech) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      setBaseAngle((prev) => prev + (delta * 0.01));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [selectedTech]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  if (modoLista) {
    // Mobile: mostrar só o ícone selecionado
    if (isMobile && selectedTech) {
      const tech = techs.find(t => t.id === selectedTech);
      return (
        <div className="w-full flex flex-row items-center justify-center gap-3 px-1">
          {tech && (
            <div
              className={`flex flex-col items-center justify-center min-w-[80px] border-yellow-300 bg-yellow-100/80 shadow-lg scale-110 h-14 rounded-full border-[1.5px] mx-1 bg-theme-background/90`}
            >
              <div className="mb-0.5 text-xl">{tech.icon}</div>
              <p className="text-[10px] text-theme-text text-center whitespace-nowrap">{tech.level}</p>
            </div>
          )}
        </div>
      );
    }
    // Desktop ou mobile sem seleção: mostrar todos
    return (
      <div
        className={
          `w-full max-w-full px-1 md:justify-center md:flex-wrap md:overflow-visible flex flex-row flex-nowrap gap-3 ` +
          (isMobile ? 'flex-wrap overflow-visible' : 'overflow-x-auto')
        }
      >
        {techs.map((tech) => {
          const isSelected = selectedTech === tech.id;
          return (
            <div
              key={tech.id}
              className={`flex flex-col items-center justify-center ${isSelected ? 'min-w-[80px] border-yellow-300 bg-yellow-100/80 shadow-lg scale-110' : 'min-w-[56px] border-theme-font/40'} h-14 rounded-full border-[1.5px] shadow-sm hover:scale-105 transition-transform cursor-pointer mx-1 bg-theme-background/90`}
              onClick={() => onTechSelect && onTechSelect(tech.id)}
            >
              <div className="mb-0.5 text-xl">{tech.icon}</div>
              {isSelected && <p className="text-[10px] text-theme-text text-center whitespace-nowrap">{tech.level}</p>}
            </div>
          );
        })}
      </div>
    );
  }

  // Responsividade para o raio do círculo
  const radius = isMobile ? 140 : 180;

  return (
    <section className="bg-theme-background w-full md:mb-10">
      {/* SVG de ondulação/divisor no topo */}
      <svg viewBox="0 0 1440 100" className="w-full h-[60px] -mb-2 scale-x-[-1] mt-[-20]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path className="ondulacao-detalhe" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z" />
      </svg>
      <div className="relative z-10 w-[90vw] lg:w-[80vw] mx-auto my-10 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-theme-font flex items-center justify-center gap-4">
          <span className="section-title mb-5 md:mb-15">{t("meusConhecimentos")}</span>
          {modoLista && (
            <span className="ml-4 text-2xl font-bold text-yellow-500 drop-shadow section-title">Destaque</span>
          )}
        </h2>
        {/* Animação circular/orbit das habilidades */}
        <div className={`relative flex items-center justify-center h-[340px] w-full md:my-10 transition-all duration-700`}>
          {/* Chamada central */}
          {!selectedTech && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-theme-font animate-pulse text-center select-none" style={{ textShadow: '0 2px 8px var(--color-accent-light), 0 1px 0 #fff' }}>
                Clique e confira os projetos
              </span>
            </div>
          )}
          {techs.map((tech, i) => {
            const angle = (360 / techs.length) * i + baseAngle;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const isSelected = selectedTech === tech.id;
            return (
              <div
                key={tech.id}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px - ${isMobile ? 32 : 40}px)`,
                  top: `calc(50% + ${y}px - ${isMobile ? 32 : 40}px)`,
                  transition: 'transform 0.5s',
                  zIndex: isSelected ? 10 : 1,
                }}
                className={`flex flex-col items-center justify-center ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-full border-2 ${isSelected ? 'border-yellow-400 bg-yellow-100/80 shadow-lg scale-110' : 'border-theme-font/20 bg-theme-background/90'} shadow-sm hover:scale-110 transition-transform cursor-pointer relative`}
                onClick={() => onTechSelect && onTechSelect(tech.id)}
              >
                <div className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10 pointer-events-none" />
                <div className={`mb-1 ${isMobile ? 'text-xl' : 'text-2xl'}`}>{tech.icon}</div>
                <h4 className="text-[10px] font-semibold text-theme-font text-center whitespace-nowrap">{tech.name}</h4>
                {isSelected && <p className="text-[9px] text-theme-text text-center whitespace-nowrap">{tech.level}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}