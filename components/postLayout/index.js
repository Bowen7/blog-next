import Link from 'next/link'
import { MDXProvider } from '@mdx-js/react'
import styled from 'styled-components'
import CodePre from '../CodePre'
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
