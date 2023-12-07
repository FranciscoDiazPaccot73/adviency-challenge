/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "35-65": "35% 65%",
      },
      colors: {
        "white-50": "#ffffff50",
      },
    },
    plugins: [],
  },
};
