import type { Config } from 'tailwindcss'
import typographyPlugin from '@tailwindcss/typography'
import scrollerPlugin from 'tailwindcss-scroller'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    scroller: {
      title: {
        stopTime: 1000,
        moveTime: 500,
        direction: 'down',
      },
    },
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
      },
      fontFamily: {
        title: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [typographyPlugin, scrollerPlugin],
} as Config
