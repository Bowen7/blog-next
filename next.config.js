const withPlugins = require('next-compose-plugins')
const rehypePrism = require('@mapbox/rehype-prism')
const refractor = require('refractor/core')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const beautifyPlugin = require('./pack/beautify')
refractor.register(require('refractor/lang/jsx'))

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [beautifyPlugin, rehypePrism]
  }
})

module.exports = withPlugins([
  [withMDX, { pageExtensions: ['js', 'mdx'] }],
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        runtimeCaching
      }
    }
  ]
])
