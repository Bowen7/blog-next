const { genBoxesForGaussian } = require('./utils')
const { hMotionBlur, vMotionBlur } = require('./motion')
function fastBlur (src, dest, width, height, sigma) {
  const boxes = genBoxesForGaussian(sigma, 3)
  _fastBlur(src, dest, width, height, (boxes[0] - 1) / 2)
  _fastBlur(src, dest, width, height, (boxes[1] - 1) / 2)
  _fastBlur(src, dest, width, height, (boxes[2] - 1) / 2)
}

function _fastBlur (src, dest, width, height, radius) {
  hMotionBlur(src, dest, width, height, radius)
  vMotionBlur(dest, src, width, height, radius)
}
export default fastBlur
