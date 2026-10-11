/** @type {import('tailwindcss').Config} */
const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        white: v('white'),
        slate: { 50: v('s50'), 100: v('s100'), 200: v('s200'), 300: v('s300'), 400: v('s400'), 500: v('s500'), 600: v('s600'), 700: v('s700'), 800: v('s800'), 900: v('s900') },
        brand: { DEFAULT: '#10B981', dark: v('brand-dark'), soft: v('brand-soft') },
        corp: '#2563EB',
        surface: v('surface'),
      },
      fontFamily: { sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
