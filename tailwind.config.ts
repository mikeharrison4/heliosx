import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-geist-sans)"],
      mono: ["var(--font-geist-mono)"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-yellow": "#fac828",
      },
      keyframes: {
        translate: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
          },
        },
      },
      animation: {
        translate: "translate .2s linear",
      },
    },
  },
  plugins: [],
} satisfies Config;
