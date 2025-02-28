/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  output: "export", // Ensures Next.js generates static files
  distDir: "out", // Render expects static output here
  trailingSlash: true, // Ensures proper linking for static exports
};

export default nextConfig;
