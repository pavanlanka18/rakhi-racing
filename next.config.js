/** @type {import('next').NextConfig} */

// When building for GitHub Pages, the site is served from a sub-path:
// https://<user>.github.io/rakhi-racing/
// We only want to apply this sub-path if we are actually building on GitHub Actions.
// Vercel sets process.env.VERCEL, so it will ignore this and use the root domain.
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoName = 'rakhi-racing';

// Dynamically get repo name from GITHUB_REPOSITORY (e.g., "pavanlanka18/rakhi-racing")
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
}

const basePath = isGithubActions ? `/${repoName}` : '';

const nextConfig = {
  reactStrictMode: true,

  // Static export — required for GitHub Pages (no Node.js server available)
  output: 'export',

  // Sub-path where GitHub Pages hosts the site. Empty on Vercel.
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',

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
