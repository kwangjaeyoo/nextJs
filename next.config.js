/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
}

module.exports = nextConfig
