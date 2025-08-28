// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other configurations ...
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:3000/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;