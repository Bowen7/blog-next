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
  flex-direction: column;
  margin-bottom: 1rem;
`
const Brand = styled.p`
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 0;
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
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="欢迎来访，这是Bowen的个人技术博客，持续保持更新。联系方式：zwxdyx@foxmail.com"
        />
        <meta name="keywords" content="前端,JS,JavaScript,计算机" />
        <meta name="author" content="Bowen,张文翔" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6KLLQLJ9LT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-6KLLQLJ9LT');`
          }}
        />
      </Head>
      <Header>
        <Link href="/">
          <Logo src="/logo.svg" />
        </Link>
        <Link href="/">
          <Brand>Bowen Codes</Brand>
        </Link>
      </Header>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default App
