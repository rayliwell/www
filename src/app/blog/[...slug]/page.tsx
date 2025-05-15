import '@fontsource/jetbrains-mono/latin-500.css'

import { notFound, permanentRedirect } from 'next/navigation'

import { getBlogPosts, generateBlogPostUrl } from '@lib/blog'
import posts from '@blog'

import BlogTitle from '@components/BlogTitle'

interface BlogPostProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params
  const blogPosts = await getBlogPosts(posts)
  const blogPost = blogPosts.find((post) => post.metadata.date === slug.at(0))
  if (!blogPost) return {}
  const { metadata } = blogPost

  return { title: metadata.plainTitle }
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts(posts)

  return blogPosts.map((post) => ({
    slug: [post.metadata.date, generateBlogPostUrl(post.metadata.plainTitle)],
  }))
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  let blogPosts = await getBlogPosts(posts)

  let { slug } = await params
  let dateParam = slug.at(0)
  let titleParam = slug.at(1)

  if (!dateParam || slug.length > 2) {
    return notFound()
  }

  let blogPost = blogPosts.find((post) => post.metadata.date === dateParam)

  if (!blogPost) {
    return notFound()
  }

  let { metadata, component: Post } = blogPost
  let blogTitle = generateBlogPostUrl(metadata.plainTitle)

  if (!titleParam || titleParam !== blogTitle) {
    return permanentRedirect(metadata.href)
  }

  return (
    <div className='container flex flex-col mx-auto gap-8 p-4'>
      <BlogTitle showImage={true} metadata={metadata} />
      <div className='text-lg leading-loose flex flex-col gap-8 mb-16'>
        <Post />
      </div>
    </div>
  )
}
