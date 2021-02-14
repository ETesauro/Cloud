// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      dosis: ["Dosis"]
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
      float: 'float 3s infinite',
      refloat: 'refloat 3s infinite'
    },
    keyframes: {
      spin: {
        to: { transform: 'rotate(360deg)' },
      },
      ping: {
        '75%, 100%': { transform: 'scale(2)', opacity: '0' },
      },
      pulse: {
        '50%': { opacity: '.5' },
      },
      bounce: {
        '0%, 100%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
        '50%': {
          transform: 'translateY(-15%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
      },
      float: {
        '0%': {
          transform: 'translateY(0px)',
          animationTimingFunction: 'ease-in-out',
        },
        '50%': {
          transform: 'translateY(-20px)',
          animationTimingFunction: 'ease-in-out',
        },
        '100%': {
          transform: 'translateY(0px)',
          animationTimingFunction: 'ease-in-out',
        },
      },
      refloat: {
        '0%': {
          transform: 'translateY(-20px)',
          animationTimingFunction: 'ease-in-out',
        },
        '50%': {
          transform: 'translateY(0px)',
          animationTimingFunction: 'ease-in-out',
        },
        '100%': {
          transform: 'translateY(-20px)',
          animationTimingFunction: 'ease-in-out',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}