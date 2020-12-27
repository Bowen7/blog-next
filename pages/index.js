import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { basename } from 'path'
import { timeFormat } from '../utils'

const Year = styled.p`
  color: #434343;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`

const Post = styled.div`
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
const Title = styled.p`
  margin: 0 1rem 0 0;
`
export async function getStaticProps() {
  const sourceContext = require.context('./post', false, /\.mdx$/)
  let metas = sourceContext.keys().map((key) => {
    return { name: basename(key, '.mdx'), ...sourceContext(key).meta }
  })
  metas = metas.filter(({ ready }) => !(ready === false))
  metas.sort(({ time: time1 }, { time: time2 }) => {
    return time2 - time1
  })
  const postYears = []
  let curYear = ''
  metas.forEach((meta) => {
    const { time } = meta
    const year = time.slice(0, 4)
    if (year !== curYear) {
      curYear = year
      postYears.push({
        year,
        posts: []
      })
    }
    postYears[postYears.length - 1].posts.push(meta)
  })
  return {
    props: { postYears }
  }
}
export default function Home({ postYears }) {
  return (
    <>
      <Head>
        <title>Bowen Codes</title>
      </Head>
      {postYears.map(({ year, posts }) => (
        <React.Fragment key={year}>
          <Year>{year}</Year>
          <hr />
          {posts.map(({ title, time, name, tags = [] }) => (
            <Link key={title} href={'/post/' + name}>
              <Post>
                <TitleWrap>
                  <Title>{title}</Title>
                  {tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </TitleWrap>
                <time>{timeFormat(time)}</time>
              </Post>
            </Link>
          ))}
        </React.Fragment>
      ))}
    </>
  )
}
