import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import _fs from 'fs'
import os from 'os'
import { resolve } from 'path'
import { timeFormat } from '../utils'
const fs = _fs.promises

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
  const jsonPath = resolve(os.tmpdir(), './index.json')
  const postList = JSON.parse((await fs.readFile(jsonPath)).toString())
  return {
    props: { postList }
  }
}
export default function Home({ postList }) {
  return (
    <>
      <Head>
        <title>Bowen&apos;s Blog</title>
      </Head>
      {postList.map(({ year, posts }) => (
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
