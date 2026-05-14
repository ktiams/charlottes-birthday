import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(120, 80, 50, 0.13)",
      },
      colors: {
        blush: "#f7cbd4",
        cream: "#fff8e8",
        butter: "#ffe9a8",
        sky: "#cfe8f7",
        sage: "#b9cfaa",
        barn: "#ebb6bd",
        hay: "#ead2a2",
        cocoa: "#6d4b3b",
      },
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
