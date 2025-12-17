const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gmqfjtgbjprhxbxbhhms.supabase.co', 'uxtlcbcnwmxeyszhlewf.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hangikredi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          '__dirname': JSON.stringify(process.cwd()),
        })
      );
    }
    return config;
  },
}

module.exports = nextConfig