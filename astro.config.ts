import { defineConfig, passthroughImageService } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import icons from 'vite-icon-loader'

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
    plugins: [icons({ cssTemplate: (url: string) => `--url: url(${url});` })],
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/.direnv/**'],
      },
    },
  },
})
