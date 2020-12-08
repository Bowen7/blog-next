import Head from 'next/head'
import Test from '../source/test.mdx'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Test></Test>
    </div>
  )
}
