/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        // 'doodle-pattern': "url('public/star-doodle-bg.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
