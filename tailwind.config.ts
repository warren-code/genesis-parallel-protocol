import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0F14", // Deep space black
        accent: "#FFD700", // Glowing gold
        signal: "#00D4FF", // Vibrant cyan
        danger: "#D9534F", // Keep existing danger color
        ink: "#FFFFFF", // Pure white
        gray: "#A9A6A0", // Warm dove gray
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
