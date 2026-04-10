import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default withPayload(nextConfig);
