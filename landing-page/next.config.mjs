/** @type {import('next').NextConfig} */
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const nextConfig = {
  reactStrictMode: true,
  //distDir: 'dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        port: '',
      },
      {
        protocol: 'https',
        hostname: "s3-figma-videos-production-sig.figma.com",
        port: '',
      }
    ],
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve('node_modules/leaflet/dist/images'),
            to: path.resolve('public', 'leaflet', 'images')
          },
        ],
      }),
    )
    return config
  }
};

export default nextConfig;
