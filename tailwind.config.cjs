/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0084FF',
        'primary-hover': '#00509C',
      },
    },
  },
  plugins: [],
};
