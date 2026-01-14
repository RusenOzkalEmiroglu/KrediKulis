/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __dirname: JSON.stringify('.'),
        __filename: JSON.stringify(config.output.filename),
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