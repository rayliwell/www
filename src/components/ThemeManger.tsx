'use client'

import {
  type ComponentProps,
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useSWR from 'swr'
import { isColor, defaultColor, type ColorTheme } from '@lib/theme'

interface ThemeContextType {
  theme: ColorTheme
  setTheme: Dispatch<SetStateAction<ColorTheme>>
  color: { primary: string; secondary: string } | null
  setColor: Dispatch<SetStateAction<{ primary: string; secondary: string } | null>>
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useColorTheme() {
  let theme = useContext(ThemeContext)

  if (theme === null) {
    throw new Error('Hook useColorTheme() was called outside of a <ThemeProvider /> context')
  }

  return theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<ColorTheme>(defaultColor)
  let [color, setColor] = useState<{ primary: string; secondary: string } | null>(null)

  useEffect(() => {
    let storedTheme = localStorage.getItem('theme')
    if (isColor(storedTheme) && storedTheme !== theme) {
      setTheme(storedTheme)
    }

    let updateTheme = ({ newValue }: StorageEvent) => setTheme(isColor(newValue) ? newValue : theme)
    addEventListener('storage', updateTheme)
    return () => removeEventListener('storage', updateTheme)
  }, [])

  useEffect(() => {
    if (localStorage.getItem('theme') !== theme) {
      localStorage.setItem('theme', theme)
    }

    let style = window.getComputedStyle(document.documentElement)

    // NOTE: When moving to a non-RGB color-space, this will need to be updated
    setColor({
      primary: `rgb(${style.getPropertyValue('--primary')})`,
      secondary: `rgb(${style.getPropertyValue('--secondary')})`,
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function Html(props: ComponentProps<'html'>) {
  let { theme } = useColorTheme()

  return (
    <html data-color-theme={theme} {...props}>
      {props.children}
    </html>
  )
}

export function Favicon() {
  let { color } = useColorTheme()
  let { data: iconData } = useSWR('/icon.svg', (url) =>
    fetch(url)
      .then((i) => i.text())
      .then((i) => 'data:image/svg+xml,' + encodeURIComponent(i))
  )

  let favicon = useMemo(() => {
    if (!iconData || !color) {
      return '/icon.svg'
    }

    return iconData
      .replace('%2338bdf8', encodeURIComponent(color.primary))
      .replace('%232563eb', encodeURIComponent(color.secondary))
      .replace('\n', '')
  }, [iconData, color])

  return <link id='themed-icon' rel='icon' href={favicon} />
}

export function ThemeColor() {
  let { color } = useColorTheme()

  return <meta name='theme-color' content={color?.secondary || '#2563eb'} />
}
