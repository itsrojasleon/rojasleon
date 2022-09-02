const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              lineHeight: 1.6,
              fontSize: '0.85rem'
            },
            code: {
              backgroundColor: '#30363c',
              fontSize: '0.9rem'
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
