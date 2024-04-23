import { defineConfig, passthroughImageService } from 'astro/config'

import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [tailwind()],
  devToolbar: {
    enabled: false,
  },
  image: {
    service: passthroughImageService(),
  },
  build: {
    assets: 'assets',
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/.direnv/**'],
      },
    },
  },
})
