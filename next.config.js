/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  images: {
    domains: [
      'vpot.image-gmkt.com',
      'gd.image-gmkt.com',
      'dp.image-gmkt.com',
      'youtu.be',
    ],
  },
}

module.exports = nextConfig
