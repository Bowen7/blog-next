import { useRouter } from 'next/router'
// export async function getStaticProps(context) {
//   console.log(context)
//   return {
//     props: {}
//   }
// }
function Post() {
  const router = useRouter()
  const { id } = router.query
  return <div>post: {id}</div>
}
export default Post
