import iconsPlugin from 'unplugin-icons/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      iconsPlugin({
        compiler: 'jsx',
        jsx: 'react',
        extension: 'jsx',
      })
    )

    return config
  },
}

export default nextConfig
