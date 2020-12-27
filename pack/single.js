const mdx = require('@mdx-js/mdx')
const toMarkdown = require('mdast-util-to-markdown')
const strikethrough = require('mdast-util-gfm-strikethrough')
const { resolve, join, basename } = require('path')
const fs = require('fs').promises
const createMdifyPlugin = require('./mdify')
const PATH = '../source/fast-blur.mdx'
async function main() {
  const file = (await fs.readFile(join(__dirname, PATH))).toString()
  const treeRef = { current: {} }
  await mdx(file, {
    remarkPlugins: [createMdifyPlugin(treeRef)]
  })
  const md = toMarkdown(treeRef.current, {
    extensions: [strikethrough.toMarkdown]
  })
  try {
    await fs.access(resolve(__dirname, '../dist'))
  } catch (err) {
    await fs.mkdir(resolve(__dirname, '../dist'))
  }
  await fs.writeFile(
    resolve(__dirname, '../dist/' + basename(PATH, '.mdx') + '.md'),
    md
  )
}
main()
