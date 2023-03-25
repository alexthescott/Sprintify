/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in-from-below": {
          '0%': { transform: 'translate3d(0, 15px, 0)', opacity: '0%' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '100%' }
        },
        "fade-in": {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' }    
        }
      },
      animation: {
        "slide-in-from-below": 'slide-in-from-below 0.15s ease-in-out',
        "fade-in": 'fade-in 0.2s ease-in-out',
      }
    },
  },
  plugins: [],
}
