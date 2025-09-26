/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
          // Mapeando nossas variáveis CSS para o Tailwind
          background: 'var(--color-background)',
          surface: 'var(--color-surface)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          border: 'var(--color-border)',
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
          },
          // Mantendo as cores antigas para compatibilidade se necessário
          theme: {
            background: 'var(--color-background)',
            font: 'var(--color-text-primary)',
            h2: 'var(--color-text-primary)',
          }
        },
        fontFamily: {
          comfortaa: ['Comfortaa', 'sans-serif'],
        },
    },
  },
  plugins: [],
}