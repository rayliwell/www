/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack(config) {
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
