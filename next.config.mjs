/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["recharts"],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      module: false,
    };
    return config;
  },
};

export default nextConfig;
