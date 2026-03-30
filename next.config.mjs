/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/elos-success-week',
  assetPrefix: '/elos-success-week',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
