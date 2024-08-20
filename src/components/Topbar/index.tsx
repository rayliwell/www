import classes from './index.module.scss'

import IconButton from '@components/IconButton'
import MenuIcon from '~icons/material-symbols/menu-rounded'
import ColorIcon from '~icons/material-symbols/colors-rounded'

import { id as sidebarId } from '@components/Sidebar'
import { id as colorMenuId } from '@components/ColorMenu'

function Logo() {
  return (
    <a
      href='/'
      className={`mask-[icon] ${classes.spin} from-primary to-secondary aspect-square w-10 bg-gradient-to-r`}
    />
  )
}

function NoscriptHideColorMenuToggle() {
  return (
    <noscript>
      <style
        dangerouslySetInnerHTML={{
          __html: "button[popovertarget='colorMenu'] { display: none; }",
        }}
      />
    </noscript>
  )
}

export default function Topbar() {
  return (
    <nav className='sticky h-[4.5rem] bg-black top-0 text-neutral-300 flex w-full flex-row items-center justify-between px-5 py-4 z-topbar print:hidden'>
      <IconButton icon={MenuIcon} popoverTarget={sidebarId}></IconButton>
      <Logo />
      <IconButton icon={ColorIcon} popoverTarget={colorMenuId} />
      <NoscriptHideColorMenuToggle />
    </nav>
  )
}
