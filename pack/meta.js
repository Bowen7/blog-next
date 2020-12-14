const visit = require('unist-util-visit')
const requireFromString = require('require-from-string')
const { transform: babelTransform } = require('@babel/core')

const createMetaPlugin = (name, metasRef) => () => (tree) => {
  const { current: metas } = metasRef
  visit(tree, 'export', (node) => {
    const commonjsCode = babelTransform(node.value, {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }).code
    const { meta = {} } = requireFromString(commonjsCode)
    metas.push({ ...meta, name })
  })
}
module.exports = createMetaPlugin
