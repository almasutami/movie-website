/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

const colorShades = (colorName: string) => {
  return Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((stop) => {
      return [stop, `var(--color-${colorName}-${stop})`]
    })
  )
}

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colorShades('primary'),
        secondary: colorShades('secondary'),
        success: colorShades('success'),
        warning: colorShades('warning'),
        error: colorShades('error'),
        info: colorShades('info'),
        gray: colorShades('gray'),
      },
    },
    fontFamily: {
      body: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      monospace: ['Fira Mono', 'monospace'],
    },
  },
}
