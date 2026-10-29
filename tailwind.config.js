/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#06080c',
          900: '#0b0e14',
          850: '#10141d',
          800: '#161c28',
          750: '#1d2433',
          700: '#262f42',
        },
        terracotta: {
          400: '#f87171',
          500: '#e05d52',
          600: '#c5493f',
          dark: '#381c1c',
        },
        cream: {
          100: '#fdfbf7',
          200: '#f7f4ed',
          300: '#eae5d8',
        },
        cyber: {
          cyan: '#38bdf8',
          sky: '#0ea5e9',
          amber: '#f59e0b',
          emerald: '#10b981',
          teal: '#2dd4bf',
        },
      },
      fontFamily: {
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
