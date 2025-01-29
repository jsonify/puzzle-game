/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'square': '1 / 1',
      },
      gridTemplateColumns: {
        '5': 'repeat(5, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '5': 'repeat(5, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
