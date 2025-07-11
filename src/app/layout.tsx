import '@fontsource/exo-2/latin-900.css' // black
import '@fontsource/noto-sans/latin-500.css' // medium
import '@fontsource/noto-sans/latin-700.css' // extra-bold

import type { Metadata } from 'next'

import '@style/index.scss'
import '@style/theme.scss'

export const metadata: Metadata = {
  title: 'Rayliwell',
  description: 'My personal website',
}

import Topbar from '@components/Topbar'
import Sidebar from '@components/Sidebar'
import ColorMenu from '@components/ColorMenu'
import { Html, Favicon, ThemeColor, ThemeProvider } from '@components/ThemeManger'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <Html
        lang='en'
        className='antialiased font-medium font-normal text-[80%] sm:text-[90%] md:text-[100%] selection:bg-secondary selection:bg-opacity-50 bg-background'
      >
        <head>
          <Favicon />
          <ThemeColor />
          <meta name='robots' content='noindex' />
        </head>
        <body className='w-full h-dvh overflow-y-hidden text-text'>
          <Sidebar />
          <ColorMenu />
          <div id='scrollArea' className='flex flex-col overflow-y-auto w-full h-full'>
            <Topbar />
            <main className='w-full h-[calc(100%-4.5rem)] z-content' children={children} />
          </div>
        </body>
      </Html>
    </ThemeProvider>
  )
}
