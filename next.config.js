const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

const assetPrefix = process.env.NODE_ENV === 'production' ? '/2048' : '';

module.exports = withSass({
  cssModules: true,
  exportPathMap: () => ({
    '/': { page: '/' }
  }),
  assetPrefix,
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix)
      })
    );

    return config;
  }
});
