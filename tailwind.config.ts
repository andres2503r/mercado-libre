// tailwind.config.js
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#091638',
        secondary: '#5AC8FB',
        background: '#fff',
        textColor: '#162127',
        backgrounds: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      screens: {
        '4KUltra': '3000px'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      defaultTheme: 'light',
      defaultExtendTheme: 'light'
    })
  ]
}
