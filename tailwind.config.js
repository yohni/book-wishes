module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        primary_gradient:
          'linear-gradient(90deg, hsla(13, 86%, 55%, 1) 0%, hsla(13, 75%, 60%, 1) 100%)',
        secondary_gradient:
          'linear-gradient(90deg, hsla(274, 32%, 58%, 1) 0%, hsla(256, 57%, 34%, 1) 0%, hsla(269, 38%, 28%, 1) 100%)',
        tersier_gradient:
          'linear-gradient(90deg, hsla(274, 32%, 58%, 1) 0%, hsla(274, 32%, 58%, 1) 0%, hsla(269, 38%, 28%, 1) 100%, hsla(260, 50%, 31%, 1) 100%)',
      },
      minHeight: {
        splash: '666px',
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'],
    },
  },
  plugins: [require('daisyui')],
};
