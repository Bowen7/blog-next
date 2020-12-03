// const fs = require('fs')
const { validateConfigs } = require('./utils')
function pack(configs) {
  if (!validateConfigs(configs)) {
    return
  }
  const { entry, destDir } = configs
  console.log(entry, destDir)
}
module.exports = pack
