const withPlugins = require('next-compose-plugins')
const rehypePrism = require('@mapbox/rehype-prism')
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const refractor = require('refractor/core')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withTM = require('next-transpile-modules')(['@geist-ui/react'])
const beautifyPlugin = require('./pack/beautify')
refractor.register(require('refractor/lang/jsx'))

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeKatex, beautifyPlugin, rehypePrism],
    remarkPlugins: [remarkMath]
  }
})

const plugins = [
  [
    withMDX,
    {
      pageExtensions: ['js', 'mdx']
      // todo
      // webpack(config, options) {
      //   console.log(config.module.rules)
      //   return config
      // }
    }
  ],
  [withTM]
]
if (process.env.NODE_ENV === 'production') {
  plugins.push([
    withPWA,
    {
      pwa: {
        dest: 'public',
        runtimeCaching
      }
    }
  ])
}
module.exports = withPlugins(plugins)
