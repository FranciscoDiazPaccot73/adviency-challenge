/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unavatar.io'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
