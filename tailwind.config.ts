import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import typographyPlugin from '@tailwindcss/typography'
import scrollerPlugin from 'tailwindcss-scroller'

import { join } from 'path'

const maskPlugin = plugin(({ matchUtilities, theme }) => {
  matchUtilities({
    mask: (value) => ({
      maskImage: `url(${join(theme('assetsPath'), value + '.svg')});`,
      maskSize: '100% 100%',
    }),
  })
})

export default {
  content: ['./src/**/*.{,js,jsx,mdx,tsx}'],
  theme: {
    assetsPath: '/',
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
  plugins: [maskPlugin, typographyPlugin, scrollerPlugin],
} as Config
