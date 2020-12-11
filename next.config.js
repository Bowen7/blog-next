const visit = require('unist-util-visit')
const rehypePrism = require('@mapbox/rehype-prism')
const pangu = require('pangu')
const refractor = require('refractor/core')

refractor.register(require('refractor/lang/jsx'))

// 自定义插件，美化
const beautifyPlugin = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = pangu.spacing(node.value)
  })
  visit(tree, 'element', (node, index, parent) => {
    if (node.tagName !== 'a') {
      return
    }
    // Todo: 有些情况没考虑到
    if (index !== 0) {
      const prevNode = parent.children[index - 1]
      let text
      visit(prevNode, 'text', (node) => {
        text = node
      })
      if (text) {
        console.log(text)
        const { value } = text
        if (value[value.length - 1] !== ' ') {
          text.value = value + ' '
        }
      }
    }
    if (index !== parent.children.length - 1) {
      const nextNode = parent.children[index + 1]
      let text
      visit(nextNode, 'text', (node) => {
        text = node
      })
      if (text) {
        console.log(text)
        const { value } = text
        if (value[0] !== '') {
          text.value = ' ' + value
        }
      }
    }
  })
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [beautifyPlugin, rehypePrism]
  }
})

module.exports = withMDX({ pageExtensions: ['js', 'mdx'] })
