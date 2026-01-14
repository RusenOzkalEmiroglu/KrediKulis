/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'global.GENTLY': 'false',
        __dirname: '""',
        __filename: '""',
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
