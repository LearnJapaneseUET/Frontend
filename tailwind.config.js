/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
      }
    },
  },
  plugins: [],
}

