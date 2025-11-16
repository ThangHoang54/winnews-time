import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Merriweather', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",

        "dark-paper": "rgb(var(--dark-paper) / <alpha-value>)",
        "dark-ink": "rgb(var(--dark-ink) / <alpha-value>)",
        "dark-accent": "rgb(var(--dark-accent) / <alpha-value>)",
      }
    }
  },
  plugins: [
    typography,
  ],
}