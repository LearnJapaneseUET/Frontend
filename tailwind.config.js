/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        'light-white': 'rgba(255,255,255,0.18)',
        "red-orange" : "#ff6f5b",
        "dark-yellow": "#F6BB00",
      },
      spacing: {
        '25': '6.25rem', // Hoặc giá trị bạn muốn
      },
    },
  },
  plugins: [],
}

