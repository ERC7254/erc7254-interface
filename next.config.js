const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

const needPrefix =
  process.env.NEXT_PUBLIC_APP_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'develop';

/** @type {import("next").NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  sassOptions: {
    additionalData: `
          @import "@Styles/_tool.scss";
          @import "@Styles/_variable.scss";
          @import "@Styles/_type.scss";
      `,
  },
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'plus.unsplash.com'],
  },
  experimental: {
    scrollRestoration: 'manual',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              'prefixIds',
            ],
          },
        },
      },
    });
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
