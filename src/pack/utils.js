const requiredConfigs = ['entry', 'destDir']
function validateConfigs(configs) {
  return requiredConfigs.every(configKey => {
    if (!configs[configKey]) {
      console.error('Invalid configs,', configKey, 'is required')
      return false
    }
    return true
  })
}
module.exports = {
  validateConfigs,
}
