const visit = require('unist-util-visit')
const pangu = require('pangu')
// 自定义插件，美化
const spacingLink = (node, index, parent) => {
  // Todo: 有些情况没考虑到
  if (index !== 0) {
    const prevNode = parent.children[index - 1]
    let text
    visit(prevNode, 'text', (node) => {
      text = node
    })
    if (text) {
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
      const { value } = text
      if (value[0] !== '') {
        text.value = ' ' + value
      }
    }
  }
}

const handlePre = (node) => {
  if (node.children.length === 1 && node.children[0].tagName === 'code') {
    const codeNode = node.children[0]
    const code = codeNode.children[0].value
    node.properties.code = code
  }
}

const beautifyPlugin = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = pangu.spacing(node.value)
  })
  visit(tree, 'element', (node, index, parent) => {
    switch (node.tagName) {
      case 'a':
        spacingLink(node, index, parent)
        break
      case 'pre':
        handlePre(node)
        break
      default:
        break
    }
  })
}

module.exports = beautifyPlugin
