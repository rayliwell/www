import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'
import { compile, run } from '@mdx-js/mdx'
import { useMDXComponents } from '@mdx-components'

import { type BlogPostMetadata } from '../lib/blog'

interface BlogTitleProps {
  metadata: BlogPostMetadata
  size?: 'large' | 'medium' | 'small'
  showImage?: boolean
}

const blogTitleComponents = useMDXComponents({
  p: ({ children }) => <h1 className='leading-tight font-title font-bold'>{children}</h1>,

  strong: ({ children }) => (
    <strong className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
      {children}
    </strong>
  ),
})

export default async function BlogTitle({ metadata, showImage, size = 'large' }: BlogTitleProps) {
  let { title, dateString, readingTime, image } = metadata

  let titleSizeMap = {
    large: 'text-5xl',
    medium: 'text-4xl',
    small: 'text-2xl',
  }

  let textSizeMap = {
    large: 'text-md',
    medium: 'text-xs',
    small: 'text-xs',
  }

  const code = String(
    await compile(title, {
      outputFormat: 'function-body',
    })
  )

  const { default: TitleComponent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  } as any)

  return (
    <div className={`flex flex-col items-stretch justify-between gap-4 ${textSizeMap[size]}`}>
      <div className={titleSizeMap[size]}>
        <TitleComponent components={blogTitleComponents} />
      </div>
      <div className='flex flex-row justify-between'>
        <div className='flex gap-2'>
          <div className='material-calendar bg-current w-[1.5em] h-[1.5em]' />
          {dateString}
        </div>
        <div className='flex gap-2'>
          <div className='material-clock bg-current w-[1.5em] h-[1.5em]' />
          {readingTime}
        </div>
      </div>
      {showImage && image && <Image {...image} className='rounded-xl' />}
    </div>
  )
}
