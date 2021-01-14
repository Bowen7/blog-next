const mdx = require('@mdx-js/mdx')
const toMarkdown = require('mdast-util-to-markdown')
const strikethrough = require('mdast-util-gfm-strikethrough')
const { resolve, join, basename } = require('path')
const fs = require('fs').promises
const createMdifyPlugin = require('./mdify')
const { beautifyPlugin } = require('./beautify')
const dual = require('./dual')
const PATH = '../pages/post/fast-blur.mdx'
async function main() {
  let content = (await fs.readFile(join(__dirname, PATH))).toString()
  content = dual(content, false)
  const treeRef = { current: {} }
  await mdx(content, {
    remarkPlugins: [beautifyPlugin, createMdifyPlugin(treeRef)]
  })
  let md = toMarkdown(treeRef.current, {
    extensions: [strikethrough.toMarkdown]
  })
  md = `访问我的 [个人博客网站](https://bowencodes.com/post/${basename(PATH, '.mdx')}) ，获取更好的阅读体验\n\n` + md
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
