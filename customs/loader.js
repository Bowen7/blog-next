const { resolve, relative, dirname } = require('path')
const dual = require('./dual')
module.exports = function (source) {
  const { resourcePath } = this
  const postLayoutPath = resolve(__dirname, '../components/layout/post.js')
  const path = relative(dirname(resourcePath), postLayoutPath)
  return (
    `import PostLayout from '${path}'\n` +
    dual(source) +
    '\nexport default ({ children }) => <PostLayout meta={meta}>{children}</PostLayout>'
  )
}
