const fs = require('fs').promises
const path = require('path')

const requiredConfigs = ['entryDir', 'destDir']
function validateConfigs(configs) {
  return requiredConfigs.every(configKey => {
    if (!configs[configKey]) {
      console.error('Invalid configs,', configKey, 'is required')
      return false
    }
    return true
  })
}

async function getIndexMd(dirname) {
  const filenames = await fs.readdir(dirname)
  let md = ''
  filenames.forEach(filename => {
    if (filename === 'index.md') {
      md = path.join(__dirname, filename)
    }
  })
  return md
}

async function getInnerDirectories(dirname) {
  const directories = []
  const filenames = await fs.readdir(dirname)
  await promisifyForEach(filenames, async filename => {
    filename = path.join(dirname, filename)
    const stat = await fs.lstat(filename)
    if (stat.isDirectory()) {
      directories.push(filename)
    }
  })
  return directories
}

async function promisifyForEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    await fn(arr[i], i, arr)
  }
}

module.exports = {
  validateConfigs,
  getIndexMd,
  getInnerDirectories,
  promisifyForEach,
}
