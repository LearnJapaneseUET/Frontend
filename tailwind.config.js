/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        'light-white': 'rgba(255,255,255,0.18)',
        "red-orange" : "#ff6f5b",
        "dark-yellow": "#fdce39",
        "dark-green": "#57BAAB"
      },
      spacing: {
        '25': '6.25rem',
      },
      boxShadow: {
        'card': 'inset 5px 5px 5px rgba(0, 0, 0, 0.05), inset -5px -5px 5px rgba(255, 255, 255, 0.5), 5px 5px 5px rgba(0, 0, 0, 0.05), -5px -5px 5px rgba(255, 255, 255, 0.5)',
        'box': '0 10px 20px rgba(0, 0, 0, 0.1)',
        'box-hover': '0 10px 40px rgba(0, 0, 0, 0.2)'
      },
      rotate: {
        'y-180': '180deg',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.rotate-y-0': {
          transform: 'rotateY(0deg)',
        },
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

