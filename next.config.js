/** @type {import('next').NextConfig} */

// When building for GitHub Pages, the site is served from a sub-path:
// https://<user>.github.io/rakhi-racing/
// Set NEXT_PUBLIC_BASE_PATH in your CI environment, or hardcode it here.
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'rakhi-racing'; // ← your GitHub repo name

const nextConfig = {
  reactStrictMode: true,

  // Static export — required for GitHub Pages (no Node.js server available)
  output: 'export',

  // Sub-path where GitHub Pages hosts the site
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // next/image optimization requires a server; disable for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Trailing slashes so GitHub Pages can serve index.html correctly
  trailingSlash: true,
};

module.exports = nextConfig;
