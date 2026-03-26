import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'elos-navy': '#1B3A7A',
        'elos-green': '#8DC11E',
        'elos-orange': '#E8A020',
        'elos-magenta': '#D4006C',
        'elos-cyan': '#00AEEF',
        'elos-dark': '#1A1A1A',
        'elos-light': '#F0F2F5',
        'elos-white': '#FFFFFF',
        'elos-gray': '#6B7A99',
        'elos-border': '#DDE3EE',
      },
    },
  },
  plugins: [],
}
export default config
