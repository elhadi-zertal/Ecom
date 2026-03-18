/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["Tajawal", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fdf4ff",
          100: "#fae8ff",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        dark: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1a1a26",
          600: "#22222f",
          500: "#2d2d3d",
          400: "#3d3d52",
        },
      },
    },
  },
  plugins: [],
};
