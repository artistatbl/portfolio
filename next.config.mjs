/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    swcMinify: true,
  },
  compiler: {
    transform: {
      react: {
        throwIfNamespace: false,
      },
    },
  },
};

export default nextConfig;
