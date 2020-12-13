const mdx = require('@mdx-js/mdx')
const requireFromString = require('require-from-string')
const { transform: babelTransform } = require('@babel/core')
const visit = require('unist-util-visit')
const fs = require('fs').promises
const { resolve, join } = require('path')
const sourcePath = resolve(__dirname, '../source')

const metaPlugin = () => (tree) => {
  visit(tree, 'export', (node) => {
    const commonjsCode = babelTransform(node.value, {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }).code
    const { meta = {} } = requireFromString(commonjsCode)
  })
}

async function main() {
  const mdxFiles = await fs.readdir(sourcePath)
  await promisifyForEach(mdxFiles, async (mdxFile, index) => {
    if (index !== 0) {
      return
    }
    const file = (await fs.readFile(join(sourcePath, mdxFile))).toString()
    await mdx(file, {
      remarkPlugins: [metaPlugin]
    })
  })
}

async function promisifyForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    await callback(item, i, arr)
  }
}
main()
