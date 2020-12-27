const mdx = require('@mdx-js/mdx')
const { resolve, join, basename } = require('path')
const os = require('os')
const createMetaPlugin = require('./meta')
const fs = require('fs').promises
const sourcePath = resolve(process.cwd(), './source')

const metasRef = { current: [] }

const produceJson = async () => {
  const { current: metas } = metasRef
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
    resolve(os.tmpdir(), './index.json'),
    JSON.stringify(postList)
  )
}

async function main() {
  const mdxFiles = await fs.readdir(sourcePath)
  await promisifyForEach(mdxFiles, async (mdxFile, index) => {
    const file = (await fs.readFile(join(sourcePath, mdxFile))).toString()
    await mdx(file, {
      remarkPlugins: [createMetaPlugin(basename(mdxFile, '.mdx'), metasRef)]
    })
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
