/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Merriweather', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      colors: {
        'paper': '#f8f5f1',
        'ink': '#2a2a2a',
        'accent': '#b91c1c', // red-800
        'dark-paper': '#1f2937', // gray-800
        'dark-ink': '#e5e7eb', // gray-200
        'dark-accent': '#f59e0b', // amber-500
      }
    }
  },
  plugins: [],
}