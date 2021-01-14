// 多面写法
// 为了同时生成在 mdx 和 md 适配的代码
// 形如：
// ```dual
// <img src=""/>
// :
// [img](https://...)
// ```
// 在 mdx 中保留 img 标签，在 md 在保留 []()
const dualRegex = /```dual\n(.*)\n:\n(.*)\n```/g

function dual(input, mdx = true) {
  const matches = [...input.matchAll(dualRegex)]
  let output = input
  matches.forEach(match => {
    const dualStr = match[0]
    const mdxStr = match[1]
    const mdStr = match[2]
    if (mdx) {
      output = output.replace(dualStr, mdxStr)
    } else {
      output = output.replace(dualStr, mdStr)
    }
  })
  return output
}

module.exports = dual
