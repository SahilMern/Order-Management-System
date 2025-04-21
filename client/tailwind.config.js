/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        crimson: ['"Crimson Text"', 'serif'],
        gothic: ['"Special Gothic Expanded One"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        baloo: ['"Baloo 2"', 'cursive'],
      },
    },
  },
  plugins: [],
}
