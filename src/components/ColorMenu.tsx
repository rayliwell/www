'use client'

import colors from '@lib/theme'

import { useColorTheme } from './ThemeManger'

export const id = 'colorMenu'

export default function ColorMenu() {
  let { setTheme } = useColorTheme()

  return (
    <div
      id={id}
      className='border-1 fixed inset-[unset] right-4 top-16 z-menu m-0 grid-cols-3 gap-5 rounded-md border-solid border-primary border-opacity-20 bg-primary bg-opacity-20 p-2 backdrop-blur-sm *:aspect-square *:w-7 *:bg-gradient-to-r *:from-primary *:to-secondary *:[clip-path:circle()] [&:popover-open]:grid'
      popover='auto'
    >
      {colors.map((color) => (
        <button
          key={color}
          aria-label={color}
          data-color-theme={color}
          onClick={() => setTheme(color)}
        />
      ))}
    </div>
  )
}
