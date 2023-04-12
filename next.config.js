/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(ttf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            limit: 8192, // in bytes
            name: "[name].[hash].[ext]",
            publicPath: "/_next/static/fonts/",
            outputPath: `${isServer ? "../" : ""}static/fonts/`,
          },
        },
      ],
    });

    return config;
  },
};
