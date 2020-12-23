const withPlugins = require('next-compose-plugins')
const rehypePrism = require('@mapbox/rehype-prism')
const refractor = require('refractor/core')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withTM = require('next-transpile-modules')(['@geist-ui/react'])
const beautifyPlugin = require('./pack/beautify')
refractor.register(require('refractor/lang/jsx'))

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [beautifyPlugin, rehypePrism]
  }
})

const plugins = [[withMDX, { pageExtensions: ['js', 'mdx'] }], [withTM]]
if (process.env.NODE_ENV === 'production') {
  plugins.push([
    withPWA,
    {
      pwa: {
        dest: 'public',
        runtimeCaching
      }
    }
  ])
}
module.exports = withPlugins(plugins)
