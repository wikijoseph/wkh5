/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'okx-dark': '#0B0E11',
          'okx-gray': '#1E2329',
          'okx-light-gray': '#2B3139',
          'okx-text': '#F0F0F0',
          'okx-text-secondary': '#848E9C',
          'okx-green': '#02C076',
          'okx-red': '#F84960',
          'okx-blue': '#1890FF'
        }
      },
    },
    plugins: [],
  }