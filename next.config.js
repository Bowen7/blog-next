const withPlugins = require('next-compose-plugins')
const rehypePrism = require('@mapbox/rehype-prism')
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const refractor = require('refractor/core')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withTM = require('next-transpile-modules')(['@geist-ui/react'])
const { resolve } = require('path')
const { beautifyPlugin } = require('./customs/beautify')
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
      pageExtensions: ['js', 'mdx'],
      webpack(config, { isServer }) {
        if (isServer && process.env.NODE_ENV === 'production') {
          require('./customs/sitemap')
        }

        config.module.rules.forEach((rule) => {
          if (rule.test && rule.test.test('test.mdx')) {
            rule.use.push(resolve(__dirname, './customs/loader'))
          }
        })
        return config
      }
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
