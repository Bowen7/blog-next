import Head from 'next/head'
import Test, { meta } from '../source/test.mdx'
console.log(meta)
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
