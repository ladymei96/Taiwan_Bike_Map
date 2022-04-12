module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          600: '#E5E5E5',
          700: '#CFCFCF',
          800: '#B6B6B6',
          900: '#7D7D7D',
          1000: '#363636'
        },
        default: '#28C0F0',
        dark01: '#039ECF',
        alert: '#FFDE3F',
        tint: '#DCDCDC'
      },
      fontSize: {
        '3.5xl': ['32px', '37.5px']
      },
      padding: {
        '15%': '15%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
