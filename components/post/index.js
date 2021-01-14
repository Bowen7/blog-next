import Link from 'next/link'
import styled from 'styled-components'
import { timeFormat } from '../../utils'

const StyledPost = styled.div`
  margin-left: 0.5rem;
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

const Post = ({ time, title, name, tags = [] }) => (
  <StyledPost>
    <TitleWrap>
      <Link key={title} href={'/post/' + name} passHref>
        <Title>{title}</Title>
      </Link>
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
)

export default Post
