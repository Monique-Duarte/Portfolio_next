import { useTranslation } from "react-i18next";
import projectsData from '../Cards/Cards';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import ModalButton from './ModalButton';

interface Project {
  id: string;
  titleKey: string;
  descKey?: string;
  altKey?: string;
  imgSrc: string;
  tags?: string;
  siteLink?: string;
  githubLink?: string;
  linkedin?: string;
}

interface ProjectsProps {
  techFilter?: string | null;
}

const Projects: React.FC<ProjectsProps> = ({ techFilter }) => {
  const { t } = useTranslation();
  const [modalProjeto, setModalProjeto] = useState<Project | null>(null);
  const [showDemais, setShowDemais] = useState(false);
  // Separar os projetos em destaques e demais
  const restaurantIdx = (projectsData as Project[]).findIndex(p => p.id === 'restaurant');
  const destaques = (projectsData as Project[]).slice(0, restaurantIdx + 1);
  const demais = (projectsData as Project[]).slice(restaurantIdx + 1);

  // Filtro só afeta os destaques
  const filteredDestaques = techFilter
    ? destaques.filter((project) => {
        if (!project.tags) return false;
        return project.tags.split(',').map(tag => tag.trim().toLowerCase()).includes((techFilter || '').toLowerCase());
      })
    : destaques;

  const theme = typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-theme-background text-theme-font"
      aria-label={t("projects.sectionAriaLabel")}
    >
      <div className="relative mx-auto w-full max-w-6xl z-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-center mb-20 items-start overflow-visible px-8 py-8">
          <AnimatePresence mode="wait">
            {filteredDestaques.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.4, 0, 0.2, 1] }}
                className="relative group rounded-2xl overflow-hidden shadow-xl border border-theme-font/20 bg-theme-background/80 transition-transform duration-500 hover:scale-105 hover:z-50 w-full min-h-[340px] h-[360px] flex flex-col justify-end cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${project.imgSrc})` }} />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/10 transition-all duration-500 z-10" />
                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-4 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
                  <h3 className="text-2xl font-extrabold text-white text-center whitespace-nowrap drop-shadow-lg my-3 section-title" style={{textShadow: '0 2px 8px #000, 0 1px 0 #fff'}}>
                    {t(project.titleKey)}
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center w-full">
                    {project.tags && project.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-[11px] font-semibold max-w-full truncate shadow-sm cursor-pointer">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute z-30 left-1/2 bottom-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  onClick={() => setModalProjeto(project)}
                  tabIndex={-1}
                >
                  <ModalButton className="px-5 py-2 rounded-lg w-full">Ver mais</ModalButton>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Demais projetos - Accordion */}
        <button
          className="text-3xl font-extrabold mb-8 mt-8 text-center section-title relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-yellow-400 after:mx-auto after:mt-2 focus:outline-none transition-colors duration-300 flex items-center justify-center gap-2"
          style={{ outline: 'none' }}
          onClick={() => setShowDemais((prev) => !prev)}
          aria-expanded={showDemais}
        >
          Demais projetos
          <span className={`transition-transform duration-300 ${showDemais ? 'rotate-180' : ''} flex items-center`} style={{lineHeight:0}}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline align-middle">
              <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {showDemais && (
          <ul className="w-full max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-16 animate-fade-in">
            {demais.map((project) => (
              <li key={project.id} className="flex justify-center">
                <button
                  className="relative text-lg font-bold text-theme-font section-title transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center group"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setModalProjeto(project)}
                >
                  {t(project.titleKey)}
                  <span className="block h-1 w-0 group-hover:w-full transition-all duration-300 bg-yellow-400 mx-auto mt-1"></span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Modal */}
        {modalProjeto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalProjeto(null)}>
            <div
              className={`relative max-w-2xl w-full rounded-2xl shadow-2xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-zinc-900'} text-white animate-fade-in`}
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-2xl font-bold hover:text-yellow-400" onClick={() => setModalProjeto(null)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 section-title">{t(modalProjeto.titleKey)}</h2>
              <Image src={modalProjeto.imgSrc} alt={t(modalProjeto.altKey || '')} width={600} height={192} className="w-full h-48 object-cover rounded mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                {modalProjeto.tags && modalProjeto.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold inline-block">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="mb-4">
                {modalProjeto.descKey && (
                  <p className="text-base">{t(modalProjeto.descKey)}</p>
                )}
              </div>
              <div className="flex gap-4">
                {modalProjeto.siteLink && modalProjeto.siteLink.trim() !== '' && (
                  <ModalButton href={modalProjeto.siteLink}>SITE</ModalButton>
                )}
                {modalProjeto.githubLink && modalProjeto.githubLink.trim() !== '' && (
                  <ModalButton href={modalProjeto.githubLink}>GITHUB</ModalButton>
                )}
                {modalProjeto.linkedin && modalProjeto.linkedin.trim() !== '' && (
                  <ModalButton href={modalProjeto.linkedin}>Post LinkedIn</ModalButton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 