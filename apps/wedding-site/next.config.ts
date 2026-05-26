import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@workspace/ui', '@workspace/animations'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

export default config;
