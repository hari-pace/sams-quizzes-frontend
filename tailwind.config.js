/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        "button-hover-pokemon": "url(./src/assets/pikachu.jpg)",
        "button-hover-countries": "url(./src/assets/world.png)",
      }),
    },
  },
  plugins: [],
  darkMode: "class",
};
