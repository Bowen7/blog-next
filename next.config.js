const visit = require('unist-util-visit')
const pangu = require('pangu')

//
const panguPlugin = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = pangu.spacing(node.value)
    console.log(node.value)
  })
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [panguPlugin]
  }
})

module.exports = withMDX({ pageExtensions: ['js', 'mdx'] })
