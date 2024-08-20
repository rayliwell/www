import { defaultColor, isColor, type ColorTheme } from '@lib/colors'

let html: HTMLElement
let icon: HTMLLinkElement
let data: string | undefined

if (typeof window !== 'undefined') {
  html = document.documentElement
  icon = document.getElementById('themed-icon') as HTMLLinkElement

  addEventListener(
    'storage',
    ({ newValue }) => newValue && updateColorTheme(newValue as ColorTheme)
  )

  setColorTheme(localStorage.getItem('color'))
}

async function faviconData() {
  if (!data) {
    data = 'data:image/svg+xml,' + encodeURIComponent(await (await fetch('/icon.svg')).text())
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
  html.dataset.colorTheme = color
  updateFavicon()
}

export async function setColorTheme(color: any) {
  const currColor = isColor(color) ? color : defaultColor

  localStorage.setItem('color', currColor)
  updateColorTheme(currColor)
}
