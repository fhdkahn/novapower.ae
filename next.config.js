/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "framerusercontent.com",
      // add other domains if needed
    ],
  },
}

module.exports = nextConfig 