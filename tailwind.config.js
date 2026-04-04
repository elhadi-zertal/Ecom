/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Tajawal", "Cairo", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f9f9f9",
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#bbbbbb",
          400: "#999999",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#1a1a1a",
          900: "#111111",
        },
        dark: {
          50:  "#888888",
          100: "#555555",
          200: "#333333",
          300: "#222222",
          400: "#1a1a1a",
          500: "#111111",
          600: "#0a0a0a",
          700: "#050505",
          800: "#020202",
          900: "#000000",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        wide: "0.04em",
      },
    },
  },
  plugins: [],
};
