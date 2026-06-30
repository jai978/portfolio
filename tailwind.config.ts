import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0C0F16',
        surface: '#151923',
        border: '#1E2535',
        primary: '#E9E6DF',
        secondary: '#6B7385',
        accent: '#3B6FD4',
        'accent-dim': '#1A3A7A',
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
