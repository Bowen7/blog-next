// import styled from 'styled-components'
import path from 'path'
import Head from 'next/head'

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
  const MDX = sourceMap[id].default
  const { title } = sourceMap[id].meta

  return (
    <>
      <Head>
        <base target="_blank" />
      </Head>
      <article>
        <h1>{title}</h1>
        <MDX />
      </article>
    </>
  )
}
export default Post
