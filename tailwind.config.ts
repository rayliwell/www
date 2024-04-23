import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      primary: 'rgb(var(--primary) / <alpha-value>)',
      secondary: 'rgb(var(--secondary) / <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
} as Config
