const colors = ['blue', 'pink', 'green', 'orange', 'purple', 'red'] as const

export function isColor(color: any): color is ColorTheme {
  return typeof color === 'string' && colors.includes(color as ColorTheme)
}

export type ColorTheme = (typeof colors)[number]

export const defaultColor: ColorTheme = 'blue'
export default colors
