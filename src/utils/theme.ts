import favicon from '@assets/favicon.svg?url'

export const colors = ['blue', 'pink', 'green', 'orange', 'purple', 'red'] as const
export type ColorTheme = (typeof colors)[number]

const html = document.documentElement
const icon = document.getElementById('themed-icon') as HTMLLinkElement
let data: string | undefined

async function faviconData() {
  if (!data) {
    data = 'data:image/svg+xml,' + encodeURIComponent(await (await fetch(favicon)).text())
  }

  return data
}

export async function updateFavicon() {
  const style = window.getComputedStyle(document.documentElement)
  icon.href = (await faviconData())
    .replace('%2338bdf8', encodeURIComponent('rgb(' + style.getPropertyValue('--primary') + ')'))
    .replace('%232563eb', encodeURIComponent('rgb(' + style.getPropertyValue('--secondary') + ')'))
}

export async function updateColorTheme(color: ColorTheme) {
  html.className = color
  updateFavicon()
}

export async function setColorTheme(color: ColorTheme) {
  localStorage.setItem('color', color)
  updateColorTheme(color)
}

window.setColorTheme = setColorTheme
addEventListener('storage', ({ newValue }) => newValue && updateColorTheme(newValue as ColorTheme))
setColorTheme((localStorage.getItem('color') as ColorTheme | undefined) ?? 'blue')
