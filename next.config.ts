/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      // Point this specifically to your project directory
      root: './', 
    },
  },
};

export default nextConfig;