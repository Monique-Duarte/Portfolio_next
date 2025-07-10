'use client';

import AboutMe from '../components/AboutMe/AboutMe';
import Projects from '../components/Projects/Projects';
import Skills from '../components/AboutMe/Skills';
import { useState } from 'react';

export default function Page() {
  const [techSelecionada, setTechSelecionada] = useState<string | null>(null);
  const [modoLista, setModoLista] = useState(false);
  const [techSelecionadaNome, setTechSelecionadaNome] = useState<string | null>(null);

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

  const handleVoltar = () => {
    setTechSelecionada(null);
    setTechSelecionadaNome(null);
    setModoLista(false);
  };

  return (
    <main className="bg-theme-background text-theme-font min-h-screen transition-all duration-700 w-full overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-0">
        <AboutMe />
      </div>
      {/* Habilidades centralizadas sempre */}
      <section className="w-full flex flex-col items-center justify-center mt-4 md:mt-8 px-2 md:px-0">
        <Skills
          onTechSelect={handleTechSelect}
          selectedTech={techSelecionada || undefined}
          modoLista={modoLista}
        />
      </section>
      {/* Seção de projetos filtrável, centralizada */}
      <section className="w-full flex flex-col items-center justify-center mt-8 px-2 md:px-0">
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
                onClick={handleVoltar}
                className="mt-4 px-4 py-2 rounded bg-yellow-400 text-theme-font font-bold shadow hover:bg-yellow-500 transition text-base"
              >
                Ver todos
              </button>
            )}
          </div>
          <Projects techFilter={techSelecionadaNome || null} />
        </div>
      </section>
    </main>
  );
}