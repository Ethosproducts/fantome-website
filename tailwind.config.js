/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fantome-black': '#050508',
        'fantome-cyan': '#00F0FF',
        'fantome-gold': '#FFD700',
        'fantome-glass': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
