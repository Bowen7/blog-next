// import styled from 'styled-components'
import path from 'path'
import Head from 'next/head'
import PostLayout from '../../components/postLayout'

const sourceContext = require.context('../../source', false, /\.mdx$/)
const sourceMap = {}
sourceContext.keys().forEach((key) => {
  if (path.extname(key) === '.mdx') {
    const id = path.basename(key, '.mdx')
    sourceMap[id] = sourceContext(key)
  }
})

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params
  return {
    props: { id }
  }
}
export async function getStaticPaths() {
  const paths = sourceContext.keys().map((item) => ({
    params: {
      id: path.basename(item, '.mdx')
    }
  }))
  return {
    paths,
    fallback: false
  }
}
function Post({ id }) {
  const source = sourceMap[id]
  const { default: MDX, meta } = source

  return (
    <>
      <Head>
        <base target="_blank" />
      </Head>
      <PostLayout meta={meta}>
        <MDX />
      </PostLayout>
    </>
  )
}
export default Post
