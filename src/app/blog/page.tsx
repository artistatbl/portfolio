import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { BlogClient } from './blog-client'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata('blog')

export default async function Blog() {
  const posts = await getAllPosts()

  return <BlogClient posts={posts} />
}