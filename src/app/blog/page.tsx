import Title from '@components/BlogTitle'
import posts from '../../blog'
import { getBlogPosts } from '@lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog posts — Rayliwell',
}

export default async function BlogPage() {
  let blogPosts = await getBlogPosts(posts)

  return (
    <div className='flex flex-col gap-8 container mx-auto p-4'>
      {Object.values(blogPosts).map(({ metadata }) => {
        let { date, href } = metadata

        return (
          <Link className='block' key={date} href={href}>
            <Title metadata={metadata} />
          </Link>
        )
      })}
    </div>
  )
}
