/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'components/**/*.ts',
      'plugins/**/*.ts',
      'nuxt.config.ts',
    ],
  },
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: '#4b7cf3',
      kit: {
        white: '#ffffff',
        black: '#141322',
        'gray-1': '#f0f2f4',
        'gray-2': '#e4e9f0',
        'gray-3': '#d9dee9',
        'gray-4': '#c8c4db',
        'gray-6': '#595c97',
        'gray-dark-1': '#aeaee0',
        'gray-dark-2': '#7575a3',
        'gray-dark-4': '#232135',
        blue: '#4b7cf3',
        'blue-light': '#42baf9',
        red: '#f5222e',
        green: '#41b883',
        orange: '#faad15',
      },
    },
    fontFamily: {
      sans: [
        'Prompt',
        'ui-sans-serif',
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
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
