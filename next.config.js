const withSass = require('@zeit/next-sass')

const assetPrefix = process.env.NODE_ENV === 'production' ? '/2048' : ''

module.exports = withSass({
  cssModules: true,
  exportPathMap: () => ({
    '/': { page: '/' }
  }),
  assetPrefix
})
