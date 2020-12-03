const {
  validateConfigs,
  getInnerDirectories,
  getIndexMd,
  promisifyForEach,
} = require('./utils')
const mdLoader = require('./loaders/md')
async function pack(configs) {
  if (!validateConfigs(configs)) {
    return
  }
  const { entryDir } = configs

  const mds = await getMds(entryDir)
  await promisifyForEach(mds, async md => {
    await mdLoader(md)
  })
}

async function getMds(entryDir) {
  const mds = []
  const directories = await getInnerDirectories(entryDir)
  await promisifyForEach(directories, async directory => {
    const indexMd = await getIndexMd(directory)
    if (indexMd) {
      mds.push(indexMd)
    }
  })
  return mds
}

module.exports = pack
