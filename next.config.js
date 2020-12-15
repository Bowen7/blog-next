const rehypePrism = require('@mapbox/rehype-prism')
const refractor = require('refractor/core')
const beautifyPlugin = require('./pack/beautify')
refractor.register(require('refractor/lang/jsx'))

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [beautifyPlugin, rehypePrism]
  }
})

module.exports = withMDX({ pageExtensions: ['js', 'mdx'] })
