/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackground: '#EDF1F6',
        mainPurple: '#6a33ac',
        mainBlack: '#1C1A1E'
      },
      fontFamily: {
        'pixelfy': ['Pixelify Sans', 'Sans-Serif'],
        'poppins': ['Poppins', 'Sans-Serif']
      }
    },
  },
  plugins: [],
}

