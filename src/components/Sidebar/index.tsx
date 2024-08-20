import classes from './index.module.scss'

import IconButton from '@components/IconButton'
import CloseIcon from '~icons/mdi/close'

export const id = 'sidebarMenu'

export default function Sidebar() {
  const links = [
    { displayName: 'Home', href: '/' },
    { displayName: 'About me', href: '/about' },
    { displayName: 'Blog posts', href: '/blog' },
    { displayName: 'Projects', href: '/projects' },
  ] as const

  return (
    <div
      id={id}
      className={`fixed ${classes.menu} m-0 h-screen w-full sm:w-[24rem] flex-col items-stretch sm:border-r border-secondary border-opacity-25 bg-black p-0 text-neutral-100 [&::backdrop]:select-none [&::backdrop]:bg-secondary [&::backdrop]:bg-opacity-10 [&::backdrop]:backdrop-blur-sm [&:popover-open]:flex z-menu`}
      popover='auto'
    >
      <div className={`${classes.background} absolute h-full w-full`}></div>
      <div className='z-40 flex flex-col p-5'>
        <div className='flex select-none items-center'>
          <div className='mask-[icon] aspect-square w-10 bg-gradient-to-r from-primary to-secondary'></div>
          <div className='ml-5 flex grow flex-col justify-between'>
            <div className='text-xl font-bold'>Ryan Halliwell</div>
            <div className='text-xs'>he/him • programmer • rayliwell.com</div>
          </div>
          <IconButton icon={CloseIcon} popoverTarget='sidebarMenu' />
        </div>
        <div className='mt-8 flex flex-col gap-4 text-2xl font-bold *:select-none hover:*:bg-gradient-to-r hover:*:from-primary hover:*:to-secondary hover:*:bg-clip-text hover:*:text-transparent'>
          {links.map(({ displayName, href }) => (
            <a key={displayName} href={href}>
              {displayName}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
