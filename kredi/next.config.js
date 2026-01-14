/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
  webpack: (config) => {
    config.plugins.push(
      new config.webpack.DefinePlugin({
        'global.GENTLY': 'false',
        __dirname: '""',
      })
    );
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
