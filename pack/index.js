const mdx = require('@mdx-js/mdx')
const toMarkdown = require('mdast-util-to-markdown')
const strikethrough = require('mdast-util-gfm-strikethrough')
const fs = require('fs').promises
const { resolve, join, basename } = require('path')
const createMdifyPlugin = require('./mdify')
const createMetaPlugin = require('./meta')
const sourcePath = resolve(process.cwd(), './source')
// const distPath = resolve(process.cwd(), './destt')

const metasRef = { current: [] }

const produceJson = async () => {
  const { current: metas } = metasRef
  // try {
  //   await fs.stat(distPath)
  // } catch (error) {
  //   await fs.mkdir(distPath)
  // }
  metas.sort(({ time: time1 }, { time: time2 }) => {
    return time2 - time1
  })
  const postList = []
  let curYear = ''
  metas.forEach((meta) => {
    const { time } = meta
    const year = time.slice(0, 4)
    if (year !== curYear) {
      curYear = year
      postList.push({
        year,
        posts: []
      })
    }
    postList[postList.length - 1].posts.push(meta)
  })
  await fs.writeFile(
    resolve(sourcePath, './index.json'),
    JSON.stringify(postList)
  )
}

async function main() {
  const mdxFiles = await fs.readdir(sourcePath)
  await promisifyForEach(mdxFiles, async (mdxFile, index) => {
    const file = (await fs.readFile(join(sourcePath, mdxFile))).toString()
    const treeRef = { current: {} }
    await mdx(file, {
      remarkPlugins: [
        createMetaPlugin(basename(mdxFile, '.mdx'), metasRef),
        createMdifyPlugin(treeRef)
      ]
    })
    const md = toMarkdown(treeRef.current, {
      extensions: [strikethrough.toMarkdown]
    })
    await fs.writeFile(
      resolve(sourcePath, './' + basename(mdxFile, '.mdx') + '.md'),
      md
    )
  })
  await produceJson()
}

async function promisifyForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    await callback(item, i, arr)
  }
}
main()
