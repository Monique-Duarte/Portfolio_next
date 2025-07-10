import { useTranslation } from "react-i18next";
import projectsData from '../Cards/Cards';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

interface Project {
  id: string;
  titleKey: string;
  descKey?: string;
  altKey?: string;
  imgSrc: string;
  tags?: string;
  siteLink?: string;
  githubLink?: string;
}

interface ProjectsProps {
  techFilter?: string | null;
}

const Projects: React.FC<ProjectsProps> = ({ techFilter }) => {
  const { t } = useTranslation();
  const [modalProjeto, setModalProjeto] = useState<Project | null>(null);
  const filteredProjects = techFilter
    ? (projectsData as Project[]).filter((project) => {
        if (!project.tags) return false;
        return project.tags.split(',').map(tag => tag.trim().toLowerCase()).includes((techFilter || '').toLowerCase());
      })
    : (projectsData as Project[]);

  const theme = typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-theme-background text-theme-font"
      aria-label={t("projects.sectionAriaLabel")}
    >
      <div className="relative mx-auto w-full max-w-6xl z-10 flex flex-col items-center justify-center">
        <div className="flex flex-wrap gap-8 justify-center mb-20 w-full items-start overflow-visible px-8 py-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.4, 0, 0.2, 1] }}
                className="relative group rounded-2xl overflow-hidden shadow-xl border border-theme-font/20 bg-theme-background/80 transition-transform duration-500 hover:scale-120 hover:z-50 w-[320px] h-[340px] flex flex-col justify-end cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${project.imgSrc})` }} />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/10 transition-all duration-500 z-10" />
                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-4 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
                  <h3 className="text-2xl font-extrabold text-white text-center whitespace-nowrap drop-shadow-lg mb-3" style={{textShadow: '0 2px 8px #000, 0 1px 0 #fff'}}>
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
                  className="absolute z-30 left-1/2 bottom-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 px-5 py-2 rounded-lg bg-yellow-400 text-theme-font font-bold shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 cursor-pointer"
                  onClick={() => setModalProjeto(project)}
                  tabIndex={-1}
                >
                  Ver mais
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
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
                  <a href={modalProjeto.siteLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-yellow-400 text-theme-font font-bold hover:bg-yellow-500 transition">SITE</a>
                )}
                {modalProjeto.githubLink && modalProjeto.githubLink.trim() !== '' && (
                  <a href={modalProjeto.githubLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-yellow-400 text-theme-font font-bold hover:bg-yellow-500 transition">GITHUB</a>
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