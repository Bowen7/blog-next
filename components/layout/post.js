import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import styled from 'styled-components'
import CodePre from '../codePre'
import { timeFormat } from '../../utils'
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  a {
    font-size: 0.875rem;
    color: #696969;
  }
`
const components = {
  pre: CodePre
}
function PostLayout({ children, meta = {} }) {
  const { title, time } = meta
  return (
    <article>
      <Head>
        <base target="_blank" rel="noopener noreferrer" />
        <title>{title} - Bowen Codes</title>
      </Head>
      <h1>{title}</h1>
      <Info>
        <time>{timeFormat(time)}</time>
        <Link href="/">首页</Link>
      </Info>
      <hr />
      <MDXProvider components={components}>{children}</MDXProvider>
    </article>
  )
}
export default PostLayout
