const remove = require('unist-util-remove')
const createMdifyPlugin = (treeRef) => () => (tree) => {
  remove(tree, 'export')
  remove(tree, 'import')
  remove(tree, 'jsx')
  treeRef.current = tree
}
module.exports = createMdifyPlugin
