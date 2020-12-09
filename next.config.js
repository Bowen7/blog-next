const visit = require('unist-util-visit')
const rehypePrism = require('@mapbox/rehype-prism')
const pangu = require('pangu')
const refractor = require('refractor/core')

refractor.register(require('refractor/lang/jsx'))

const panguPlugin = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = pangu.spacing(node.value)
  })
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [panguPlugin, rehypePrism]
  }
})

module.exports = withMDX({ pageExtensions: ['js', 'mdx'] })
