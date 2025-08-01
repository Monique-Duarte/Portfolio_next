import { useTranslation } from "react-i18next";
import projectsData from '../Cards/Cards';
import React, { useState, useEffect } from 'react';
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
  techs?: string[];
  featured?: boolean;
  videoSrc?: string;
  additionalImages?: string[];
}

interface ProjectsProps {
  techFilter?: string | null;
  abrirDemaisProjetos?: boolean;
  setAbrirDemaisProjetos?: (v: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ techFilter, abrirDemaisProjetos, setAbrirDemaisProjetos }) => {
  const { t } = useTranslation();
  const [modalProjeto, setModalProjeto] = useState<Project | null>(null);
  const [showDemais, setShowDemais] = useState(false);
  const [focusedMedia, setFocusedMedia] = useState<{ type: 'video' | 'image', src: string } | null>(null);
  
  // --- 1. NOVO ESTADO ---
  // Controla a visibilidade dos detalhes (descrição e links) no mobile.
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  useEffect(() => {
    if (abrirDemaisProjetos) {
      setShowDemais(true);
      if (setAbrirDemaisProjetos) setAbrirDemaisProjetos(false);
    }
  }, [abrirDemaisProjetos, setAbrirDemaisProjetos]);

  useEffect(() => {
    if (modalProjeto) {
      if (modalProjeto.videoSrc) {
        setFocusedMedia({ type: 'video', src: modalProjeto.videoSrc });
      } else if (modalProjeto.additionalImages && modalProjeto.additionalImages.length > 0) {
        setFocusedMedia({ type: 'image', src: modalProjeto.additionalImages[0] });
      } else {
        setFocusedMedia({ type: 'image', src: modalProjeto.imgSrc });
      }
    } else {
      setFocusedMedia(null);
    }
  }, [modalProjeto]);

  const filteredDestaques = techFilter
    ? (projectsData as Project[]).filter((project) => project.techs?.includes(techFilter))
    : (projectsData as Project[]).filter((project) => project.featured);

  const todosProjetos = (projectsData as Project[]);

  const theme = typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  // --- 2. NOVA FUNÇÃO HELPER ---
  // Função para abrir o modal e resetar o estado dos detalhes mobile.
  const handleOpenModal = (project: Project) => {
    setModalProjeto(project);
    setShowMobileDetails(false); // Garante que os detalhes estarão ocultos ao abrir um novo modal
  };

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
                // --- 3. ALTERAÇÃO NO ONCLICK ---
                onClick={() => handleOpenModal(project)}
              >
                {/* ... (código do card inalterado) ... */}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          id="demais-projetos"
          className="text-3xl font-extrabold mb-8 mt-8 text-center section-title relative after:content-[''] after:block after:w-16 after:h-1 after:bg-yellow-400 after:mx-auto after:mt-2 focus:outline-none transition-colors duration-300 flex items-center justify-center gap-2"
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
            {todosProjetos.map((project) => (
              <li key={project.id} className="flex justify-center">
                <button
                  className="relative text-lg font-bold text-theme-font section-title transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center group"
                  style={{ textDecoration: 'none' }}
                  // --- 3. ALTERAÇÃO NO ONCLICK ---
                  onClick={() => handleOpenModal(project)}
                >
                  {t(project.titleKey)}
                  <span className="block h-1 w-0 group-hover:w-full transition-all duration-300 bg-yellow-400 mx-auto mt-1"></span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* --- 4. ALTERAÇÕES NO MODAL PRINCIPAL --- */}
        <AnimatePresence>
          {modalProjeto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
              onClick={() => setModalProjeto(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className={`relative max-w-5xl w-full rounded-2xl shadow-2xl p-4 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-zinc-900'} text-white flex flex-col`}
                onClick={e => e.stopPropagation()}
              >
                {/* --- Cabeçalho com Título e Botão de Fechar --- */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold section-title">{t(modalProjeto.titleKey)}</h2>
                  <button className="text-3xl font-bold hover:text-yellow-400" onClick={() => setModalProjeto(null)}>&times;</button>
                </div>

                {/* --- Corpo do Modal (Layout alterado) --- */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 flex-grow min-h-0">
                  
                  {/* --- Coluna da Esquerda: Mídia (Sempre visível) --- */}
                  <div className="md:flex-1 flex flex-col items-center justify-start min-w-0">
                    {/* ... (código da galeria de imagem/video - sem alterações) ... */}
                    {focusedMedia && focusedMedia.type === 'video' ? (
                        <video src={focusedMedia.src} controls autoPlay muted loop className="w-full h-auto max-h-[450px] object-contain rounded mb-4 shadow-lg" style={{ aspectRatio: '10/8' }}>
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                    ) : focusedMedia && focusedMedia.type === 'image' ? (
                        <Image src={focusedMedia.src} alt={t(modalProjeto.altKey || '')} width={800} height={450} className="w-full h-auto max-h-[450px] object-contain rounded mb-4 shadow-lg" />
                    ) : (
                        <div className="w-full h-[450px] bg-gray-700 flex items-center justify-center rounded mb-4"><p>Nenhuma mídia disponível.</p></div>
                    )}
                    <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-full overflow-hidden">
                        {modalProjeto.videoSrc && (<div className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${focusedMedia?.src === modalProjeto.videoSrc ? 'border-yellow-400 scale-105' : 'border-gray-600 hover:border-yellow-300'}`} onClick={() => setFocusedMedia({ type: 'video', src: modalProjeto.videoSrc! })}><video src={modalProjeto.videoSrc} className="w-20 h-16 object-cover rounded-md" muted preload="metadata" playsInline /><div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"><div className="w-7 h-7 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"></path></svg></div></div></div>)}
                        {modalProjeto.additionalImages?.map((imgSrc, idx) => (<div key={`img-thumb-${idx}`} className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${focusedMedia?.src === imgSrc ? 'border-yellow-400 scale-105' : 'border-gray-600 hover:border-yellow-300'}`} onClick={() => setFocusedMedia({ type: 'image', src: imgSrc })}><Image src={imgSrc} alt={`${t(modalProjeto.altKey || '')} - ${idx + 1}`} width={80} height={64} className="w-20 h-16 object-cover rounded-md" /></div>))}
                    </div>
                  </div>

                  {/* --- Conteúdo da Direita (Desktop) / Seção Oculta (Mobile) --- */}
                  <div className={`flex-col md:flex-1 min-w-0 ${showMobileDetails ? 'flex' : 'hidden md:flex'}`}>
                    <div className="flex flex-wrap gap-2 mb-4 justify-start">
                      {modalProjeto.tags && modalProjeto.tags.split(',').map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold inline-block">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                      {modalProjeto.descKey && (
                        <p className="text-base leading-relaxed text-gray-200">{t(modalProjeto.descKey)}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-auto justify-start">
                      {modalProjeto.siteLink && <ModalButton href={modalProjeto.siteLink}>SITE</ModalButton>}
                      {modalProjeto.githubLink && <ModalButton href={modalProjeto.githubLink}>GITHUB</ModalButton>}
                      {modalProjeto.linkedin && <ModalButton href={modalProjeto.linkedin}>Post LinkedIn</ModalButton>}
                    </div>
                  </div>
                </div>
                
                {/* --- Botão "Ver Detalhes" (Apenas Mobile) --- */}
                <div className="mt-6 md:hidden flex justify-center">
                  <button
                    onClick={() => setShowMobileDetails(prev => !prev)}
                    className="w-full text-center py-3 px-4 bg-yellow-400 text-zinc-900 font-bold rounded-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    {showMobileDetails ? 'Ocultar Detalhes' : 'Ver Descrição e Links'}
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;