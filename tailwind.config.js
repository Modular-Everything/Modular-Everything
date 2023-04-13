const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./helpers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-mono)", ...fontFamily.sans],
      },
      colors: {
        "pure-white": "#fff",
        "pure-black": "#000",
        black: "#141414",
        white: "#F9F9F7",
        "mid-grey": "#B2B2B2",
        "dark-grey": "#2B2B2B",
        "light-grey": "#F9F9F7",
        blue: "#9FF1FF",
      },
      gridTemplateColumns: {
        "dragon-drop": "repeat(var(--columns), 1fr)",
      },
      gridTemplateRows: {
        "dragon-drop": "repeat(var(--rows), 1fr)",
        12: "repeat(12, 1fr)",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
