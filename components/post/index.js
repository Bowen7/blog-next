import React from 'react'
import styled from 'styled-components'
import { timeFormat } from '../../utils'

const StyledPost = styled.div`
  margin-left: 0.5rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
`
const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.a`
  margin: 0 1rem 0 0;
  text-decoration: none;
`

// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component
const Post = React.forwardRef(({ time, title, tags, href }, ref) => (
  <StyledPost ref={ref}>
    <TitleWrap>
      <Title href={href}>{title}</Title>
      <div>
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </TitleWrap>
    <time>{timeFormat(time)}</time>
  </StyledPost>
))
Post.displayName = 'Post'

export default Post
