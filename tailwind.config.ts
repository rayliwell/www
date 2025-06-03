import typographyPlugin from '@tailwindcss/typography'
import formsPlugin from '@tailwindcss/forms'
import scrollerPlugin from 'tailwindcss-scroller'

import plugin from 'tailwindcss/plugin'
import { join, relative, basename, extname } from 'node:path'
import { readdirSync } from 'node:fs'

function iconPlugin(
  utilityName: string,
  resolvePath: string,
  options?: {
    property?: string
    extraRules?: object
    filesystemPath?: string
    webpackModule?: boolean
  }
) {
  return plugin(({ matchUtilities }) => {
    let { property, extraRules, filesystemPath, webpackModule } = {
      property: 'maskImage',
      extraRules: {
        maskSize: '100% 100%',
      },
      filesystemPath: `node_modules/${resolvePath}`,
      webpackModule: false,
      ...options,
    }

    matchUtilities(
      {
        [utilityName]: (iconPath) => ({
          [property]: `url(${webpackModule ? '~' : ''}${join(resolvePath, iconPath)})`,
          ...extraRules,
        }),
      },
      {
        values: Object.fromEntries(
          readdirSync(filesystemPath, { recursive: true, withFileTypes: true })
            .map((f) => join(f.parentPath, f.name))
            .filter((f) => extname(f) === '.svg')
            .map((f) => [basename(f, '.svg'), relative(filesystemPath, f)])
        ),
      }
    )
  })
}

function containerPlugin() {
  return plugin(({ addComponents, theme }) => {
    let containerSize = (size: string, spacing: number) =>
      size === '100%'
        ? `calc(100% - ${theme(`spacing.${spacing}`)})`
        : `calc(${theme(`screens.${size}`)} - ${theme(`spacing.${spacing}`)})`

    let zeroSize = containerSize('100%', 4)
    let minSize = containerSize('sm', 4)
    let midSize = containerSize('md', 4)
    let maxSize = containerSize('lg', 4)
    let maxmaxSize = containerSize('xl', 32)

    addComponents({
      '.container': {
        maxWidth: zeroSize,
        '@screen sm': {
          maxWidth: minSize,
        },
        '@screen md': {
          maxWidth: midSize,
        },
        '@screen lg': {
          maxWidth: maxSize,
        },
        '@screen xl': {
          maxWidth: maxmaxSize,
        },
      },
    })
  })
}

export default {
  content: ['./src/**/*.{,js,jsx,mdx,tsx}', './blog/**/*.md?'],
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
        background: 'hsl(from rgb(var(--primary)) h calc(s / 5) 4)',
        text: 'hsl(from rgb(var(--primary)) h calc(s / 4) 85)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
      },
      fontFamily: {
        normal: ['"Noto Sans"', 'sans-serif'],
        mono: ['"Jetbrains Mono"', 'sans-serif'],
        title: ['"Exo 2"', 'sans-serif'],
      },
      zIndex: {
        menu: 2,
        topbar: 1,
        content: 0,
        background: -1,
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    containerPlugin(),
    iconPlugin('mask', '/', { filesystemPath: 'public' }),
    iconPlugin('material', '@mdi/svg', {
      webpackModule: true,
    }),
    iconPlugin('logos', 'simple-icons', {
      webpackModule: true,
    }),
    iconPlugin('vscode', 'vscode-icons', {
      property: 'backgroundImage',
      webpackModule: true,
    }),
    iconPlugin('emoji', '@twemoji/svg', {
      property: 'backgroundImage',
      webpackModule: true,
    }),
    iconPlugin('lines', 'line-md', {
      webpackModule: true,
    }),
    iconPlugin('spinners', 'svg-spinners', {
      webpackModule: true,
    }),
    formsPlugin,
    typographyPlugin,
    scrollerPlugin,
  ],
}
