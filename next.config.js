const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true,
  exportPathMap: () => ({
    '/': { page: '/' }
  }) ,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/{reponame}' : '',
})
