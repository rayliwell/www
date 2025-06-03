import { BlogPost, getBlogPosts } from '@lib/blog'
import posts from '@blog'
import classes from './index.module.scss'

import IconButton from '@components/IconButton'
import BlogTitle from '@components/BlogTitle'

export const id = 'sidebarMenu'

const links = [
  { displayName: 'Home', href: '/' },
  { displayName: 'Blog posts', href: '/blog' },
  { displayName: 'My skills', href: '/skills' },
  { displayName: 'About me', href: '/about' },
  { displayName: 'Projects', href: '/projects' },
] as const

export default async function Sidebar() {
  let [latestBlogPost] = await getBlogPosts(posts)

  return (
    <div
      id={id}
      className={`fixed ${classes.menu} m-0 h-full w-full sm:w-[24rem] flex-col items-stretch sm:border-r border-secondary border-opacity-25 bg-background p-0 text-text [&::backdrop]:select-none [&::backdrop]:bg-secondary [&::backdrop]:bg-opacity-10 [&::backdrop]:backdrop-blur-sm [&:popover-open]:flex z-menu`}
      popover='auto'
    >
      <div className={`${classes.background} absolute h-full w-full`}></div>
      <div className='z-40 flex flex-grow flex-col p-5'>
        <div className='flex select-none items-center'>
          <div className='mask-icon aspect-square w-10 bg-gradient-to-r from-primary to-secondary'></div>
          <a href='/' className='ml-5 flex grow flex-col justify-between'>
            <div className='text-xl font-bold'>Ryan Halliwell</div>
            <div className='text-xs'>he/him • programmer • rayliwell.com</div>
          </a>
          <IconButton icon='material-close' popoverTarget='sidebarMenu' />
        </div>
        <div className='mt-8 flex flex-grow flex-col gap-4 text-2xl font-bold *:select-none hover:*:bg-gradient-to-r hover:*:from-primary hover:*:to-secondary hover:*:bg-clip-text hover:*:text-transparent'>
          {links.map(({ displayName, href }) => (
            <a key={displayName} href={href}>
              {displayName}
            </a>
          ))}
        </div>
        <div>
          <a
            className='basis-0 grow text-xs p-4 flex rounded-lg border border-secondary border-opacity-15 leading-normal bg-secondary bg-opacity-10'
            href={latestBlogPost.metadata.href}
            key={latestBlogPost.metadata.date}
          >
            <BlogTitle size='small' metadata={latestBlogPost.metadata} />
          </a>
        </div>
      </div>
    </div>
  )
}
