import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import './globals.css'
import './prism.css'

const Wrapper = styled.div`
  max-width: 60ch;
  margin: 0 auto 5rem auto;
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
function App({ Component, pageProps }) {
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

export default App
