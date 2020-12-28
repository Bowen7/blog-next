import { useRouter } from 'next/router'
import { basename } from 'path'
export async function getStaticProps() {
  const sourceContext = require.context('../post', false, /\.mdx$/)
  const id2Name = {}
  sourceContext.keys().forEach((key) => {
    const meta = sourceContext(key).meta
    if (meta.oldId) {
      id2Name[meta.oldId] = basename(key, '.mdx')
    }
  })
  return {
    props: { id2Name }
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '*' } }],
    fallback: true
  }
}

export default function Post({ id2Name }) {
  const router = useRouter()
  const { id } = router.query
  if (id && typeof window !== 'undefined') {
    const name = id2Name[id]
    if (name) {
      router.replace(`/post/${name}`)
    } else {
      router.replace('/404')
    }
  }
  return <></>
}
