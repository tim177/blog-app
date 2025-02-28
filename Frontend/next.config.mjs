/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  output: "standalone", // Use standalone mode for Web Services
};

export default nextConfig;
