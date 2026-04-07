export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        accent: "var(--accent)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.4s ease forwards",
        "scale-in": "scaleIn 0.3s ease forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(74,144,217, 0.5)" },
          "70%": { boxShadow: "0 0 0 10px rgba(74,144,217, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(74,144,217, 0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        "card": "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
        "xl-colored": "0 32px 80px rgba(74,144,217,0.25), 0 8px 24px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
