import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07090F',
        surface: '#0E1320',
        border: '#182030',
        primary: '#F0EDE6',
        secondary: '#6A7D98',
        accent: '#1C3EC4',
        'accent-light': '#5578FF',
        warm: '#F0B83C',
        'warm-dim': '#6B5018',
      },
      fontFamily: {
        display: ['var(--font-oswald)', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-quattrocento)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
