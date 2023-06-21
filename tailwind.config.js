/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: 
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      {
        fontFamily: {
          gtSuperBold: ['GT Super Bold', 'sans-serif'],
          circularMedium: ['Circular Medium', 'sans-serif'],
          faktProBlack: ['Fakt Pro Black', 'sans-serif'],
          faktProBlond: ['Fakt Pro Blond', 'sans-serif'],
          faktProNormal: ['Fakt Pro Normal', 'sans-serif'],
        },
        colors: {
          'meta': '#4B587C',
          'gray': "#EEF2FF",
          'separator': '#E3ECFF',
          'question-fill': '#ECF3FF',
          'question-fill-hover': '#deeaff',
          'question-fill-selected': '#d0e1ff',
          'question-b': '#9CC7FA',
          'question': '#76ADE9',
          'disabled': '#a2a2a2',
          'question-answer': '#00C950',
          'question-answer-fill': '#C5FDDB',
          'queston-answer-b': '#00DF59'
        },
        maxHeight: {
          '128': '48rem'
        }
      }
  },
  plugins: [],
}
