/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        rwBlack: '#0F1A20',
        rwSalmon: '#E2856E',
        rwScarlet: '#F42C04',
        rwKhaki: '#ADA296',
        rwCadetGray: '#88A2AA',
      },
    },
  },
  plugins: [],
}
