const remove = require('unist-util-remove')
const visit = require('unist-util-visit')
const baseUrl = 'https://bowencodes.com'

function prefixUrl(node) {
  const { url } = node
  if (url.indexOf('http') !== 0) {
    node.url = baseUrl + url
  }
}
const createMdifyPlugin = (treeRef) => () => (tree) => {
  remove(tree, 'export')
  remove(tree, 'import')
  remove(tree, 'jsx')
  visit(tree, 'image', prefixUrl)
  visit(tree, 'link', prefixUrl)
  treeRef.current = tree
}
module.exports = createMdifyPlugin
