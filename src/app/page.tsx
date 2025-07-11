'use client';

import AboutMe from '../components/AboutMe/AboutMe';
import Projects from '../components/Projects/Projects';
import Skills from '../components/AboutMe/Skills';
import { useState } from 'react';

export default function Page() {
  const [techSelecionada, setTechSelecionada] = useState<string | null>(null);
  const [modoLista, setModoLista] = useState(false);
  const [techSelecionadaNome, setTechSelecionadaNome] = useState<string | null>(null);
  const [abrirDemaisProjetos, setAbrirDemaisProjetos] = useState(false);

  // Lista de skills para mapear id -> nome
  const skillsList = [
    { id: 'react', name: 'React' },
    { id: 'js', name: 'JavaScript' },
    { id: 'ts', name: 'TypeScript' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'node', name: 'Node.js' },
    { id: 'firebase', name: 'Firebase' },
    { id: 'i18n', name: 'i18n' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'ionic', name: 'Ionic' },
  ];

  const handleTechSelect = (techId: string) => {
    if (techSelecionada === techId) {
      setTechSelecionada(null);
      setTechSelecionadaNome(null);
      setModoLista(false);
      return;
    }
    setTechSelecionada(techId);
    setModoLista(true);
    const skill = skillsList.find(s => s.id === techId);
    setTechSelecionadaNome(skill ? skill.name.toLowerCase() : null);
  };

  const handleVerTodos = () => {
    setTechSelecionada(null);
    setTechSelecionadaNome(null);
    setModoLista(false);
    setAbrirDemaisProjetos(true);
    setTimeout(() => {
      const anchor = document.getElementById('demais-projetos');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <main className="bg-theme-background text-theme-font min-h-screen transition-all duration-700 w-full overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-0" id="about">
        <AboutMe />
      </div>
      {/* Habilidades centralizadas sempre */}
      <section id="skills" className="w-full flex flex-col items-center justify-center mt-4 md:mt-8 px-2 md:px-0">
        <Skills
          onTechSelect={handleTechSelect}
          selectedTech={techSelecionada || undefined}
          modoLista={modoLista}
        />
      </section>
      {/* Seção de projetos filtrável, centralizada */}
      <section id="projects" className="w-full flex flex-col items-center justify-center mt-8 px-2 md:px-0">
        <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
          <div className="flex flex-col items-center justify-center mb-8 w-full px-2 md:px-0">
            <h2 className="text-3xl font-bold text-theme-font drop-shadow text-center">
              <span className="section-title">
                {techSelecionadaNome && techSelecionadaNome.length > 0
                  ? `Destaques — ${techSelecionadaNome.charAt(0).toUpperCase() + techSelecionadaNome.slice(1)}`
                  : 'Destaques'}
              </span>
            </h2>
            {techSelecionada && (
              <button
                onClick={handleVerTodos}
                className="mt-4 px-4 py-2 rounded font-bold shadow transition text-base bg-[var(--color-font-primary)] text-[var(--color-bg-primary)] dark:bg-[var(--color-font-primary)] dark:text-[var(--color-bg-primary)] cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                Ver todos
              </button>
            )}
          </div>
          <Projects techFilter={techSelecionada || null} abrirDemaisProjetos={abrirDemaisProjetos} setAbrirDemaisProjetos={setAbrirDemaisProjetos} />
        </div>
      </section>
    </main>
  );
}