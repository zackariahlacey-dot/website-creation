import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#6C63FF",
        "accent-light": "#EEECff",
        "accent-dark": "#5549e0",
        dark: "#0D0D1A",
        "dark-mid": "#1A1A2E",
        "dark-card": "#22223A",
        green: "#00C896",
        "green-light": "#E6FBF5",
        gold: "#F5A623",
        "gold-light": "#FFF8EC",
        red: "#E84545",
        "red-light": "#FEF0F0",
        text: "#333344",
        muted: "#7B7B9D",
        border: "#DDDDE8",
        "off-white": "#F7F8FC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 50%, #0f0f22 100%)",
        "accent-gradient": "linear-gradient(135deg, #6C63FF 0%, #4F46E5 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(108, 99, 255, 0.3)",
        "glow-sm": "0 0 20px rgba(108, 99, 255, 0.2)",
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
