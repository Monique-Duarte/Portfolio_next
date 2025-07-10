// src/app/layout.tsx
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import I18nProvider from '../components/I18nProvider/I18nProvider';
import { ThemeProvider } from '../components/ThemeProvider/ThemeProvider';
import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Monique Duarte | Portfólio',
    template: '%s | Monique Duarte',
  },
  description: 'Portfólio moderno de Monique Duarte, desenvolvedora apaixonada por tecnologia, automação, IA e inovação. Veja projetos, habilidades e entre em contato.',
  keywords: 'Monique Duarte, portfólio, desenvolvedora, frontend, tecnologia, projetos, IA, inovação, React, Next.js',
  openGraph: {
    title: 'Monique Duarte | Portfólio',
    description: 'Portfólio moderno de Monique Duarte, desenvolvedora apaixonada por tecnologia, automação, IA e inovação.',
    url: 'https://portfolio-moniquead-dev.vercel.app/',
    siteName: 'Monique Duarte | Portfólio',
    images: [
      {
        url: '/images/favicon.svg',
        width: 800,
        height: 600,
        alt: 'Monique Duarte',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monique Duarte | Portfólio',
    description: 'Portfólio moderno de Monique Duarte, desenvolvedora apaixonada por tecnologia, automação, IA e inovação.',
    images: ['/images/favicon.svg'],
    creator: '@seu_twitter',
  },
  alternates: {
    canonical: 'https://portfolio-moniquead-dev.vercel.app/',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning style={{ overflow: 'visible' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`font-comfortaa bg-[#FFEDBF] min-h-screen overflow-visible`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider>
            <header className="w-full bg-gradient-to-r from-[#FFE08C] to-[#FFEDBF] shadow-md">
              <Header />
            </header>
            {/* Divisor SVG ondulado entre header e conteúdo principal */}
            <div className="w-full -mb-1 bg-transparent">
              <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block h-[200px]" style={{height: '200px', display: 'block'}}>
                <path className="ondulacao-detalhe" d="M0,0 C480,200 960,0 1440,200 L1440,0 L0,0 Z" />
              </svg>
            </div>
            {/* Conteúdo principal (AboutMe, Skills, Projects) */}
            <main className="w-full">
              {children}
            </main>
            {/* Divisor SVG ondulado entre conteúdo principal e footer */}
            <div className="w-full overflow-hidden -mt-1">
              <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path className="ondulacao-detalhe" d="M0,60 C480,0 960,60 1440,0 L1440,60 L0,60 Z" />
              </svg>
            </div>
            {/* Footer com gradiente azul para amarelo claro */}
            <footer className="w-full bg-gradient-to-r from-[#A7D9ED] to-[#FFEDBF]">
              <Footer />
            </footer>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}