/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Essencial para alternar com o botão
  theme: {
    extend: {
        colors: {
        // Cores do modo LIGHT
        light: {
          'background': '#FDC96C',
          'font': '#31456A',
          'text': '#31456A',
          'icons': '#31456A',
          'button': '#31456A',
          'accent-light': '#e4b561',
          'accent-dark': '#FFDC73',
          'h1': '#D1A55A',
          'rgb-r': '255',
          'rgb-g': '221',
          'rgb-b': '119',
        },
        dark: {
          'background': '#2E343B',
          'font': '#9F7DEA',
          'text': '#7B8499',
          'icons': '#9F7DEA',
          'button': '#9F7DEA',
          'accent-light': '#292f35',
          'accent-dark': '#333941',
          'h1': '#464E59',
          'rgb-r': '51',
          'rgb-g': '57',
          'rgb-b': '65',
        },
        'link-hover': '#FF2A4F',
      },
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
      },
      boxShadow: {
        'neumorphic-light': '-4px -4px 7px 0px var(--tw-colors-light-accent-dark), 4px 4px 7px 0px var(--tw-colors-light-accent-light)',
        'neumorphic-dark': '-4px -4px 7px 0px var(--tw-colors-dark-accent-dark), 4px 4px 7px 0px var(--tw-colors-dark-accent-light)',
        'neumorphic-inset-light': 'inset 0px 0px 0px 0px var(--tw-colors-light-accent-dark), inset 0px 0px 0px 0px var(--tw-colors-light-accent-light)',
        'neumorphic-inset-dark': 'inset 0px 0px 0px 0px var(--tw-colors-dark-accent-dark), inset 0px 0px 0px 0px var(--tw-colors-dark-accent-light)',
        'neumorphic-hover-light': '4px 4px 6px 0px rgba(var(--tw-colors-light-rgb-r),var(--tw-colors-light-rgb-g),var(--tw-colors-light-rgb-b),.5), -4px -4px 6px 0px var(--tw-colors-light-accent-light), inset -4px -4px 6px 0px rgba(var(--tw-colors-light-rgb-r),var(--tw-colors-light-rgb-g),var(--tw-colors-light-rgb-b),.5), inset 4px 4px 6px 0px var(--tw-colors-light-accent-light)',
        'neumorphic-hover-dark': '4px 4px 6px 0px rgba(var(--tw-colors-dark-rgb-r),var(--tw-colors-dark-rgb-g),var(--tw-colors-dark-rgb-b),.5), -4px -4px 6px 0px var(--tw-colors-dark-accent-light), inset -4px -4px 6px 0px rgba(var(--tw-colors-dark-rgb-r),var(--tw-colors-dark-rgb-g),var(--tw-colors-dark-rgb-b),.5), inset 4px 4px 6px 0px var(--tw-colors-dark-accent-light)',
      }
    },
  },
  plugins: [],
}