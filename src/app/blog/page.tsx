import { getAllPosts } from '@/lib/blog'
import { BlogClient } from './blog-client'

export default async function Blog() {
  const posts = await getAllPosts()

  return <BlogClient posts={posts} />
}