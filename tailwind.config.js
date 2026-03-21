/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ensure manual toggle works
  theme: {
    extend: {
      colors: {
        background: "#030014",
        surface: "#0a041f",
        primary: "#7c3aed",
        muted: "#94a3b8",
        accent: "#d8b4fe",
        cyanGlow: "#d8b4fe",
        borderColor: "rgba(124, 58, 237, 0.1)",
        neonPurple: "#7c3aed",
        neonPink: "#d8b4fe",
        neonCyan: "#7c3aed",
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}