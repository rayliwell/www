import { cache } from 'react'

import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'

type ImportedBlogPost = typeof import('*.mdx')

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'Europe/London',
})

export interface BlogPost {
  metadata: BlogPostMetadata
  component: (props: any) => JSX.Element
}

export interface BlogPostMetadata {
  title: string
  date: string
  href: string
  dateString: string
  readingTime: string
  plainTitle: string
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export const generateBlogPostUrl = cache((blogName: string) => {
  return blogName
    .toLowerCase()
    .replaceAll(/\W+/g, '-') // Replace special characters with dash
    .replaceAll(/--+/g, '-') // Trim multiple dashes to just one
    .replace(/^-/, '') // Remove any dash at beginning
    .replace(/-$/, '') // Remove any dash at end
})

export const getBlogPosts = cache(async (posts: ImportedBlogPost[]): Promise<BlogPost[]> => {
  return (
    await Promise.all(
      posts.map(async (post) => {
        if (!post.metadata.title || !post.metadata.date) {
          throw new Error('Blog posts require a title and date')
        }

        let { default: component, metadata } = post
        let { title, date, image } = metadata

        let plainTitle = await generatePlainTitle(title)
        let href = `/blog/${post.metadata.date}/${generateBlogPostUrl(plainTitle)}`
        let dateString = dateFormat.format(new Date(date))

        return {
          metadata: {
            href,
            readingTime: post.readingTime.text,
            plainTitle,
            dateString,
            date,
            title,
            image,
          },
          component,
        }
      })
    )
  ).sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
})

async function generatePlainTitle(title: string) {
  const { value: plainTitle } = await remark().use(stripMarkdown).process(title)

  return (plainTitle as string).replace('\n', '')
}
