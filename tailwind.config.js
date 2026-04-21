/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7C5DFA',
        'primary-light': '#9277FF',
        'dark-blue': '#1E2139',
        'dark-blue-light': '#252945',
        'light-grey': '#DFE3FA',
        grey: '#888EB0',
        'blue-grey': '#7E88C3',
        black: '#0C0E16',
        red: '#EC5757',
        'red-light': '#FF9797',
        'light-bg': '#F8F8FB',
        'dark-bg': '#141625',
        // Button specific colors
        'btn-edit-light': '#F9FAFE',
        'btn-edit-text': '#7E88C3',
        'btn-edit-hover': '#DFE3FA',
        'btn-edit-dark': '#252945',
        'btn-draft': '#373B53',
        'btn-draft-text': '#888EB0',
        'btn-draft-hover': '#0C0E16',
        'btn-draft-hover-dark': '#1E2139',
        'btn-delete': '#EC5757',
        'btn-delete-hover': '#FF9797',
        'btn-add-light': '#F9FAFE',
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        sans: ['League Spartan', 'sans-serif'],
      },
      fontSize: {
        'heading-l': ['36px', { lineHeight: '33px', letterSpacing: '-1.13px' }],
        'heading-m': ['24px', { lineHeight: '22px', letterSpacing: '-0.75px' }],
        'heading-s': ['15px', { lineHeight: '24px', letterSpacing: '-0.25px' }],
        'heading-s-variant': ['15px', { lineHeight: '15px', letterSpacing: '-0.25px' }],
        body: ['13px', { lineHeight: '18px', letterSpacing: '-0.1px' }],
        'body-variant': ['13px', { lineHeight: '15px', letterSpacing: '-0.25px' }],
      },
    },
  },
  plugins: [],
}


