const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/2048' : '',
  exportPathMap: () => ({
    '/': { page: '/' }
  })
})
