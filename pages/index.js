import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
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
  margin-bottom: 1rem;
`
const Title = styled.p`
  margin: 0;
`
export async function getStaticProps() {
  const sourceContext = require.context('../source', false, /\.mdx$/)
  const metas = sourceContext.keys().map((key) => {
    return { name: key, ...sourceContext(key).meta }
  })
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
          {posts.map(({ title, time, name }) => (
            <Link key={title} href={'/post/' + name}>
              <Post>
                <Title>{title}</Title>
                <time>{timeFormat(time)}</time>
              </Post>
            </Link>
          ))}
        </React.Fragment>
      ))}
    </>
  )
}
