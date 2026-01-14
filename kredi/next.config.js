/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { cheerio: 'commonjs cheerio' }];
    return config;
  },
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

}

module.exports = nextConfig