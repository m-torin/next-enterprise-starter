// import { env } from '@repo/env';
// import { config, withAnalyzer, withSentry } from '@repo/next-config';
// import type { NextConfig } from 'next';

// let nextConfig: NextConfig = { ...config };

// if (env.VERCEL) {
//   nextConfig = withSentry(nextConfig);
// }

// if (env.ANALYZE === 'true') {
//   nextConfig = withAnalyzer(nextConfig);
// }

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
