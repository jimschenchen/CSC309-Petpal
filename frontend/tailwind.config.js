/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8C4F2B',
        'background': '#F2D4C2',
        'sencond_background': '#56BFAC',
        'guest': '#30BFA5',
        'seeker': '#F29D52',
        'shelter': '#67A9AB'
      },
      fontFamily: {
        sans: ['Lato'],
        serif: ['Lato'],
      },
    }
  },
  plugins: [],
}

