/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      backgroundColor: {
        mango: 'rgba(255,193,7, 0.95)'
      }
    },
  }
};
