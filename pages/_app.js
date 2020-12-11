import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import './globals.css'
import './prism.css'

const Wrapper = styled.div`
  max-width: 70ch;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Logo = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
`
function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Head>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header>
        <Link href="/">
          <Logo src="/logo.svg" />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp
