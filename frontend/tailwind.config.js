/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta monocromática (preto, branco, cinzas)
        black: '#0B0B0B',
        white: '#F5F5F5',
        gray: {
          100: '#F7F7F7',
          200: '#E0E0E0',
          300: '#B0B0B0',
          400: '#808080',
          500: '#555555',
          600: '#333333',
          700: '#222222',
          800: '#181818',
          900: '#0B0B0B',
        },
        // Opcional: um dourado bem suave (pode remover)
        gold: '#C9A227',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}