/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      mytheme: {

        "primary": "#9d174d",

        "secondary": "#fca5a5",

        "accent": "#f472b6",

        "neutral": "#1a2d3e",

        "base-100": "#f8ffff",

        "info": "#fcd34d",

        "success": "#a3e635",

        "warning": "#eab308",

        "error": "#e11d48",
      },
    },],
  },

  plugins: [require("daisyui")],
}

