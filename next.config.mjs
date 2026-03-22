import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReadingTime from 'remark-reading-time'
import readingMdxTime from 'remark-reading-time/mdx.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack(config) {
    // Required for css url tilde handling
    config.resolve.modules.push('node_modules')

    return config
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'metadata' }],
      remarkDirective,
      remarkDirectiveRehype,
      remarkReadingTime,
      readingMdxTime,
    ],
  },
})

export default withMDX(nextConfig)
